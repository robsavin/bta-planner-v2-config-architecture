import { useState } from "react";
import { FileText } from "lucide-react";
import { format } from "date-fns";
import jsPDF from "jspdf";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTrailConfig } from "@/config";
import type { DayPlan, SpeedProfile } from "@/lib/trailData";
import type { TrailDirection } from "@/components/DirectionSelector";

interface QuoteRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itinerary: DayPlan[];
  speedProfile: SpeedProfile;
  direction: TrailDirection;
  hoursPerDay: number;
  startDate: Date;
  partySize: number;
  totalPrice: number;
  pricePerPerson: number;
  deposit: number;
  depositPerPerson: number;
}

const formatGBP = (amount: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const QuoteRequestForm = ({
  open,
  onOpenChange,
  itinerary,
  speedProfile,
  direction,
  hoursPerDay,
  startDate,
  partySize,
  totalPrice,
  pricePerPerson,
  deposit,
  depositPerPerson,
}: QuoteRequestFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const config = getTrailConfig();
  const activeDays = itinerary.filter((d) => !d.isRestDay).length;
  const nights = Math.max(0, activeDays - 1);
  const totalDistance = itinerary.reduce((sum, d) => sum + d.distance, 0);
  const totalAscent = itinerary.reduce((sum, d) => sum + d.ascent, 0);

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // Logo — use text fallback (addImage with imported asset can fail in jsPDF)
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Big Trail Adventures", 14, y);
    y += 10;

    // Title
    doc.setFontSize(20);
    doc.text(config.name, 14, y);
    y += 8;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Quote prepared for ${name}`, 14, y);
    y += 5;
    doc.text(`Generated ${format(new Date(), "d MMMM yyyy")}`, 14, y);
    y += 10;

    // Trip configuration
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Trip Configuration", 14, y);
    y += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const dirLabel =
      config.directions.labels[direction]?.name ?? direction;
    const configLines = [
      `Direction: ${dirLabel}`,
      `Pace: ${speedProfile.name} (${speedProfile.flatSpeed} km/h flat)`,
      `Walking hours per day: ${hoursPerDay}`,
      `Start date: ${format(startDate, "d MMMM yyyy")}`,
      `Party size: ${partySize}`,
      `Duration: ${itinerary.length} days (${nights} nights)`,
    ];
    configLines.forEach((line) => {
      doc.text(line, 14, y);
      y += 5;
    });
    y += 5;

    // Itinerary table
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Day-by-Day Itinerary", 14, y);
    y += 7;

    // Table header
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    const cols = [14, 28, 62, 100, 130, 152, 172];
    const headers = ["Day", "From", "To", "Distance", "Time", "Ascent", "Descent"];
    headers.forEach((h, i) => doc.text(h, cols[i], y));
    y += 2;
    doc.setDrawColor(200);
    doc.line(14, y, pageWidth - 14, y);
    y += 4;

    doc.setFont("helvetica", "normal");
    itinerary.forEach((day) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      if (day.isRestDay) {
        doc.text(`${day.day}`, cols[0], y);
        doc.text("Rest Day", cols[1], y);
        doc.text(`at ${day.startNode.name}`, cols[2], y);
      } else {
        doc.text(`${day.day}`, cols[0], y);
        doc.text(day.startNode.name.substring(0, 18), cols[1], y);
        doc.text(day.endNode.name.substring(0, 20), cols[2], y);
        doc.text(`${day.distance.toFixed(1)} km`, cols[3], y);
        const hrs = Math.floor(day.walkingTime);
        const mins = Math.round((day.walkingTime - hrs) * 60);
        doc.text(`${hrs}h ${mins}m`, cols[4], y);
        doc.text(`${day.ascent} m`, cols[5], y);
        doc.text(`${day.descent} m`, cols[6], y);
      }
      y += 5;
    });
    y += 5;

    // Journey summary
    if (y > 240) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Journey Summary", 14, y);
    y += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Total distance: ${totalDistance.toFixed(1)} km`, 14, y);
    y += 5;
    doc.text(`Total ascent: ${totalAscent.toLocaleString()} m`, 14, y);
    y += 5;
    doc.text(`Walking days: ${activeDays}`, 14, y);
    y += 5;
    doc.text(`Total days: ${itinerary.length}`, 14, y);
    y += 10;

    // Pricing
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Trip Pricing", 14, y);
    y += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Total price: ${formatGBP(totalPrice)}`, 14, y);
    y += 5;
    doc.text(`Price per person: ${formatGBP(pricePerPerson)}`, 14, y);
    y += 5;
    doc.text(
      `Deposit: ${formatGBP(deposit)} (${formatGBP(depositPerPerson)} per person)`,
      14,
      y
    );
    y += 15;

    // Footer
    doc.setDrawColor(200);
    doc.line(14, y, pageWidth - 14, y);
    y += 7;
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    const validUntil = format(
      new Date(Date.now() + 21 * 86400000),
      "d MMMM yyyy"
    );
    doc.text(
      `This quote is valid for 21 days from ${format(new Date(), "d MMMM yyyy")} (until ${validUntil})`,
      14,
      y
    );
    y += 5;
    doc.text(
      "To book contact hello@bigtrailadventures.com or visit bigtrailadventures.com",
      14,
      y
    );

    return doc;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const doc = generatePDF();
      doc.save(
        `${config.name.replace(/\s+/g, "-").toLowerCase()}-quote.pdf`
      );
      // TODO: Add server-side lead capture via Zapier
      setIsDownloaded(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after close animation
    setTimeout(() => {
      setIsDownloaded(false);
      setName("");
      setEmail("");
      setPhone("");
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {!isDownloaded ? (
          <>
            <DialogHeader>
              <DialogTitle>Save Your Quote</DialogTitle>
              <DialogDescription>
                We'll generate a PDF of your personalised itinerary and pricing.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quote-name">Name *</Label>
                <Input
                  id="quote-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-email">Email *</Label>
                <Input
                  id="quote-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-phone">Phone (optional)</Label>
                <Input
                  id="quote-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 7..."
                />
              </div>
              <Button type="submit" className="w-full" disabled={isGenerating}>
                {isGenerating ? "Generating…" : "Download Quote PDF"}
              </Button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Your quote has been downloaded.</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Check your downloads folder for the PDF.
              </p>
            </div>
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestForm;
