import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Check } from "lucide-react";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import type { DayPlan } from "@/lib/trailData";
import type { UnitSystem } from "@/lib/formatUtils";
import { kmToMiles, metersToFeet, formatTime } from "@/lib/formatUtils";
import { trackEvent } from "@/lib/analytics";
import btaLogoColor from "@/assets/bta-logo.gif";

interface ShareItineraryButtonProps {
  itinerary: DayPlan[];
  speedProfile: { name: string; description: string };
  units: UnitSystem;
}

// Format distance with fractions for imperial (½ for .5)
function formatPdfDistance(km: number, units: UnitSystem): string {
  if (units === "imperial") {
    const miles = kmToMiles(km);
    const rounded = Math.round(miles * 2) / 2;
    const whole = Math.floor(rounded);
    const fraction = rounded - whole;
    
    if (fraction === 0.5) {
      return whole === 0 ? "½ mi" : `${whole}½ mi`;
    }
    return `${whole} mi`;
  }
  return `${km.toFixed(1)} km`;
}

// Format elevation for PDF
function formatPdfElevation(meters: number, units: UnitSystem): string {
  if (units === "imperial") {
    return `${Math.round(metersToFeet(meters))} ft`;
  }
  return `${Math.round(meters)} m`;
}

// Convert image to base64 and get dimensions
async function imageToBase64WithDimensions(imageSrc: string): Promise<{ base64: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve({
          base64: canvas.toDataURL("image/png"),
          width: img.width,
          height: img.height,
        });
      } else {
        reject(new Error("Could not get canvas context"));
      }
    };
    img.onerror = reject;
    img.src = imageSrc;
  });
}

const ShareItineraryButton = ({ itinerary, speedProfile, units }: ShareItineraryButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let y = 20;

      // Colors
      const tealColor = { r: 56, g: 87, b: 105 }; // #385769
      const orangeColor = { r: 255, g: 150, b: 27 }; // #FF961B

      // Load logo with dimensions for proportional scaling
      let logoData: { base64: string; width: number; height: number } | null = null;
      try {
        logoData = await imageToBase64WithDimensions(btaLogoColor);
      } catch (e) {
        console.warn("Could not load logo for PDF");
      }

      // Calculate proportional logo sizes
      const logoAspectRatio = logoData ? logoData.width / logoData.height : 1;
      const headerLogoHeight = 30;
      const headerLogoWidth = headerLogoHeight * logoAspectRatio;
      const ctaLogoHeight = 24;
      const ctaLogoWidth = ctaLogoHeight * logoAspectRatio;
      const watermarkHeight = 140;
      const watermarkWidth = watermarkHeight * logoAspectRatio;

      // Calculate totals
      const walkingDays = itinerary.filter(d => !d.isRestDay);
      const totalDistance = walkingDays.reduce((sum, d) => sum + d.distance, 0);
      const totalAscent = walkingDays.reduce((sum, d) => sum + d.ascent, 0);

      // Helper to add watermark
      const addWatermark = () => {
        if (logoData) {
          // Large centered watermark logo - faded
          doc.saveGraphicsState();
          // @ts-ignore - setGState exists in jsPDF
          doc.setGState(new doc.GState({ opacity: 0.08 }));
          doc.addImage(
            logoData.base64,
            "PNG",
            (pageWidth - watermarkWidth) / 2,
            (pageHeight - watermarkHeight) / 2 + 20,
            watermarkWidth,
            watermarkHeight
          );
          doc.restoreGraphicsState();
        }
      };

      // Add watermark to first page
      addWatermark();

      // ===== HEADER SECTION =====
      // Logo - proportional
      if (logoData) {
        doc.addImage(logoData.base64, "PNG", margin, y, headerLogoWidth, headerLogoHeight);
      }

      // Title section (right of logo)
      const titleX = margin + headerLogoWidth + 10;
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text("My Big Trail Adventure Itinerary", titleX, y + 8);

      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(tealColor.r, tealColor.g, tealColor.b);
      doc.text("West Highland Way", titleX, y + 22);

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(60, 60, 60);
      doc.text(`${itinerary.length} days`, titleX, y + 32);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      const summaryText = `${formatPdfDistance(totalDistance, units)} • ${formatPdfElevation(totalAscent, units)} total ascent`;
      doc.text(summaryText, titleX, y + 40);

      y += 50;

      // Divider line
      doc.setDrawColor(tealColor.r, tealColor.g, tealColor.b);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;

      // ===== PACE SECTION =====
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(60, 60, 60);
      doc.text(`Pace: ${speedProfile.name}`, margin, y);
      y += 6;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(speedProfile.description, margin, y);
      y += 10;

      // Divider line
      doc.setDrawColor(tealColor.r, tealColor.g, tealColor.b);
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;

      // ===== DAYS SECTION =====
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(tealColor.r, tealColor.g, tealColor.b);
      doc.text("Days", margin, y);
      y += 10;

      // Day entries - matching the sample PDF size
      const dayEntryHeight = 28;

      const renderDayEntry = (day: DayPlan, yPos: number) => {
        // Day number circle - ORANGE color
        const circleX = margin + 6;
        const circleY = yPos + 8;
        const circleRadius = 6;
        doc.setFillColor(orangeColor.r, orangeColor.g, orangeColor.b);
        doc.circle(circleX, circleY, circleRadius, "F");

        // Center text in circle
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        const dayText = String(day.day);
        doc.text(dayText, circleX, circleY, { align: "center", baseline: "middle" } as any);

        const contentX = margin + 20;

        if (day.isRestDay) {
          // Rest day
          doc.setTextColor(60, 60, 60);
          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");
          const dateStr = day.date ? format(day.date, "EEE d MMM yyyy") : "";
          doc.text(dateStr, contentX, yPos + 5);

          doc.setFontSize(10);
          doc.setFont("helvetica", "italic");
          doc.setTextColor(100, 100, 100);
          doc.text(`Rest Day at ${day.startNode.name}`, contentX, yPos + 12);
        } else {
          // Walking day - Date
          doc.setTextColor(60, 60, 60);
          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");
          const dateStr = day.date ? format(day.date, "EEE d MMM yyyy") : "";
          doc.text(dateStr, contentX, yPos + 5);

          // Route
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(60, 60, 60);
          doc.text(`${day.startNode.name} to ${day.endNode.name}`, contentX, yPos + 12);

          // Stats line - time in orange
          doc.setTextColor(orangeColor.r, orangeColor.g, orangeColor.b);
          doc.setFontSize(10);
          doc.setFont("helvetica", "bold");
          const timeStr = formatTime(day.walkingTime);
          doc.text(timeStr, contentX, yPos + 19);

          const timeWidth = doc.getTextWidth(timeStr);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(100, 100, 100);
          const statsStr = `${formatPdfDistance(day.distance, units)}  |  ${formatPdfElevation(day.ascent, units)} up  ${formatPdfElevation(day.descent, units)} down`;
          doc.text(statsStr, contentX + timeWidth + 10, yPos + 19);
        }

        // Divider line under each day
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.2);
        doc.line(contentX, yPos + 24, pageWidth - margin, yPos + 24);
      };

      // Add continuation header for subsequent pages
      const addContinuationHeader = () => {
        doc.setFillColor(tealColor.r, tealColor.g, tealColor.b);
        doc.rect(0, 0, pageWidth, 18, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("WEST HIGHLAND WAY — ITINERARY (CONTINUED)", margin, 12);
        return 28;
      };

      // Render all days
      for (const day of itinerary) {
        // Check if we need a new page
        if (y + dayEntryHeight > pageHeight - 40) {
          addFooter(doc, pageWidth, pageHeight);
          doc.addPage();
          addWatermark();
          y = addContinuationHeader();
        }

        renderDayEntry(day, y);
        y += dayEntryHeight;
      }

      // ===== CTA SECTION =====
      y += 15;
      
      // Check if CTA fits on current page
      if (y + 50 > pageHeight - 30) {
        addFooter(doc, pageWidth, pageHeight);
        doc.addPage();
        addWatermark();
        y = addContinuationHeader();
        y += 10;
      }

      // Logo for CTA - proportional
      if (logoData) {
        doc.addImage(logoData.base64, "PNG", margin, y, ctaLogoWidth, ctaLogoHeight);
      }

      const ctaX = margin + ctaLogoWidth + 10;
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(60, 60, 60);
      doc.text("We can book your Adventure!", ctaX, y + 10);

      // Button - Orange, sized to fit text
      const buttonText = "Visit Big Trail Adventures";
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      const buttonTextWidth = doc.getTextWidth(buttonText);
      const buttonPadding = 16;
      const buttonWidth = buttonTextWidth + buttonPadding;
      const buttonHeight = 12;
      const buttonY = y + 15;

      doc.setFillColor(orangeColor.r, orangeColor.g, orangeColor.b);
      doc.roundedRect(ctaX, buttonY, buttonWidth, buttonHeight, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.text(buttonText, ctaX + buttonPadding / 2, buttonY + 8);

      // Make whole button clickable
      doc.link(ctaX, buttonY, buttonWidth, buttonHeight, {
        url: "https://bigtrailadventures.com/products/west-highland-way-adventure",
      });

      // URL under button
      doc.setTextColor(tealColor.r, tealColor.g, tealColor.b);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.textWithLink("www.bigtrailadventures.com", ctaX, y + 35, {
        url: "https://bigtrailadventures.com",
      });

      // Final footer
      addFooter(doc, pageWidth, pageHeight);

      // Save the PDF
      const fileName = `WHW-Itinerary-${format(new Date(), "yyyy-MM-dd")}.pdf`;
      doc.save(fileName);

      // Track download event
      trackEvent("custom", { event_name: "download_itinerary" });

      setIsGenerated(true);
      setTimeout(() => setIsGenerated(false), 2000);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      size="lg"
      onClick={generatePDF}
      disabled={isGenerating}
      className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md px-8 text-base font-semibold"
    >
      {isGenerated ? (
        <>
          <Check className="h-4 w-4" />
          Downloaded!
        </>
      ) : isGenerating ? (
        <>
          <Download className="h-4 w-4 animate-pulse" />
          Generating...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Download Itinerary PDF
        </>
      )}
    </Button>
  );
};

// Footer helper function
function addFooter(doc: jsPDF, pageWidth: number, pageHeight: number) {
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150, 150, 150);
  doc.text(
    "Big Trail Adventures (bigtrailadventures.com) Self-Guided Adventures, Built for You",
    pageWidth / 2,
    pageHeight - 10,
    { align: "center" }
  );
}

export default ShareItineraryButton;
