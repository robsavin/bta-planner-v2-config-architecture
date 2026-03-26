import { useState } from "react";
import { MessageCircle } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface EnquiryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trailName: string;
  days: number;
  nights: number;
  partySize: number;
  travelerType: string;
  estimatedTotalGBP: number;
  displayCurrency: string;
  displayTotal: number;
}

const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/23441129/ufwmgx1/";

const EnquiryForm = ({
  open,
  onOpenChange,
  trailName,
  days,
  nights,
  partySize,
  travelerType,
  estimatedTotalGBP,
  displayCurrency,
  displayTotal,
}: EnquiryFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          name: name || undefined,
          email,
          phone: phone || undefined,
          preferred_contact_method: contactMethod,
          preferred_start_date: preferredDate || undefined,
          message: message || undefined,
          trail_name: trailName,
          days,
          nights,
          party_size: partySize,
          traveller_type: travelerType,
          estimated_total_gbp: Math.round(estimatedTotalGBP),
          display_currency: displayCurrency,
          display_total: displayTotal,
          timestamp: new Date().toISOString(),
          source: window.location.origin,
        }),
      });

      setIsSent(true);
      toast({
        title: "Enquiry sent",
        description: "We'll be in touch shortly.",
      });
    } catch (error) {
      console.error("Enquiry send failed:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us on 0131 560 2740.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      window.parent.postMessage({ type: 'QUOTE_MODAL_OPEN' }, '*');
      onOpenChange(true);
    } else {
      window.parent.postMessage({ type: 'QUOTE_MODAL_CLOSED' }, '*');
      onOpenChange(false);
      setTimeout(() => {
        setIsSent(false);
        setName("");
        setEmail("");
        setPhone("");
        setContactMethod("email");
        setPreferredDate("");
        setMessage("");
      }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[85dvh] flex flex-col p-0 overflow-hidden">
        <div
          className="overflow-y-auto overscroll-contain p-6 flex flex-col gap-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
        {!isSent ? (
          <>
            <DialogHeader>
              <DialogTitle>Get Expert Advice</DialogTitle>
              <DialogDescription>
                Have questions about your trip? Our team will get back to you with personalised guidance.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="enq-name">Name (optional)</Label>
                <Input
                  id="enq-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="enq-email">Email *</Label>
                <Input
                  id="enq-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="enq-phone">Phone (optional)</Label>
                <Input
                  id="enq-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 7..."
                />
              </div>
              <div className="space-y-2">
                <Label>Preferred contact method</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="contact-method"
                      checked={contactMethod === "email"}
                      onChange={() => setContactMethod("email")}
                      className="accent-[hsl(var(--primary))]"
                    />
                    <span className="text-sm">Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="contact-method"
                      checked={contactMethod === "phone"}
                      onChange={() => setContactMethod("phone")}
                      className="accent-[hsl(var(--primary))]"
                    />
                    <span className="text-sm">Phone</span>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="enq-date">Preferred start date (optional)</Label>
                <Input
                  id="enq-date"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="enq-message">Message (optional)</Label>
                <Textarea
                  id="enq-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                  placeholder="Tell us about your plans, questions, or requirements..."
                  maxLength={500}
                  className="resize-none"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground text-right">{message.length}/500</p>
              </div>
              <Button type="submit" className="w-full" disabled={isSending}>
                {isSending ? "Sending…" : "Send Enquiry"}
              </Button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Enquiry sent!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We'll be in touch shortly — usually within a few hours.
              </p>
            </div>
            <Button variant="outline" onClick={handleClose}>Close</Button>
          </div>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryForm;
