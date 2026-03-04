import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Mail } from "lucide-react";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const subject = encodeURIComponent("Feedback on the West Highland Way Planner");
    const body = encodeURIComponent(
      `Name: ${name}\n\nMessage:\n${message}`
    );
    window.open(`mailto:feedback@bigtrailadventures.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
        <p className="text-primary font-semibold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
          <MessageSquare className="h-4 w-4" />
          We'd Love to Hear from You
        </p>
        <h2 className="text-3xl md:text-4xl font-black">Send Us Feedback</h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        <p className="text-muted-foreground">
          Have questions, suggestions, or feedback about the trail planner? Let us know!
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="feedback-name" className="font-semibold">Your Name</Label>
            <Input
              id="feedback-name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback-message" className="font-semibold">Your Message</Label>
            <Textarea
              id="feedback-message"
              placeholder="Tell us what you think..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full gap-2"
            size="lg"
            disabled={!name.trim() || !message.trim()}
          >
            <Send className="h-4 w-4" />
            Send Feedback
          </Button>

          <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            This will open your email app with your prefilled message
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;
