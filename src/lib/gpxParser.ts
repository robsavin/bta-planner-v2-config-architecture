// GPX Parser utility for extracting trail coordinates

export interface TrailPoint {
  lat: number;
  lng: number;
  elevation?: number;
}

export async function parseGPX(gpxContent: string): Promise<TrailPoint[]> {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(gpxContent, "text/xml");
  
  const points: TrailPoint[] = [];
  
  // Try to find track points first (most common for trail GPX files)
  const trkpts = xmlDoc.getElementsByTagName("trkpt");
  if (trkpts.length > 0) {
    for (let i = 0; i < trkpts.length; i++) {
      const pt = trkpts[i];
      const lat = parseFloat(pt.getAttribute("lat") || "0");
      const lng = parseFloat(pt.getAttribute("lon") || "0");
      const eleNode = pt.getElementsByTagName("ele")[0];
      const elevation = eleNode ? parseFloat(eleNode.textContent || "0") : undefined;
      
      points.push({ lat, lng, elevation });
    }
    return points;
  }
  
  // Fall back to route points
  const rtepts = xmlDoc.getElementsByTagName("rtept");
  if (rtepts.length > 0) {
    for (let i = 0; i < rtepts.length; i++) {
      const pt = rtepts[i];
      const lat = parseFloat(pt.getAttribute("lat") || "0");
      const lng = parseFloat(pt.getAttribute("lon") || "0");
      const eleNode = pt.getElementsByTagName("ele")[0];
      const elevation = eleNode ? parseFloat(eleNode.textContent || "0") : undefined;
      
      points.push({ lat, lng, elevation });
    }
    return points;
  }
  
  // Try waypoints as last resort
  const wpts = xmlDoc.getElementsByTagName("wpt");
  for (let i = 0; i < wpts.length; i++) {
    const pt = wpts[i];
    const lat = parseFloat(pt.getAttribute("lat") || "0");
    const lng = parseFloat(pt.getAttribute("lon") || "0");
    const eleNode = pt.getElementsByTagName("ele")[0];
    const elevation = eleNode ? parseFloat(eleNode.textContent || "0") : undefined;
    
    points.push({ lat, lng, elevation });
  }
  
  return points;
}

// Load and parse GPX from a URL (handles both .gpx and .zip files)
export async function loadGPXFromUrl(url: string): Promise<TrailPoint[]> {
  const response = await fetch(url);
  
  if (url.endsWith('.zip')) {
    // For zip files, we need to use JSZip or similar
    // For now, assume unzipped GPX file
    throw new Error('ZIP files need to be unzipped first');
  }
  
  const gpxContent = await response.text();
  return parseGPX(gpxContent);
}
