import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Send, Users, Bed, Briefcase, MessageSquare, User, Mail, Phone } from "lucide-react";
import type { DayPlan } from "@/lib/trailData";

interface QuoteRequestFormProps {
  itinerary: DayPlan[];
}

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  numberOfPeople: number;
  numberOfRooms: number;
  accommodationType: "standard" | "basic";
  kingshouseOption: "hotel" | "bunkhouse" | "glencoe" | "";
  bagTransfer: boolean;
  specialRequests: string;
}

const QuoteRequestForm = ({ itinerary }: QuoteRequestFormProps) => {
  const stopsAtKingshouse = itinerary.some(day => !day.isRestDay && (day.endNode.id === "kingshouse" || day.startNode.id === "kingshouse"));
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: 2,
    numberOfRooms: 1,
    accommodationType: "standard",
    kingshouseOption: "",
    bagTransfer: true,
    specialRequests: "",
  });

  const handleSubmit = () => {
    // Generate itinerary summary
    const itinerarySummary = itinerary
      .map(day => {
        const dateStr = day.date ? day.date.toLocaleDateString('en-GB', { 
          weekday: 'short', 
          day: 'numeric', 
          month: 'short',
          year: 'numeric'
        }) : '';
        if (day.isRestDay) {
          return `Day ${day.day} (${dateStr}): Rest day at ${day.startNode.name}`;
        }
        return `Day ${day.day} (${dateStr}): ${day.startNode.name} → ${day.endNode.name} (${day.distance}km)`;
      })
      .join("\n");

    const totalDays = itinerary.length;
    const activeDays = itinerary.filter(d => !d.isRestDay).length;
    const startDate = itinerary[0]?.date?.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    // Accommodation descriptions
    const accommodationDescription = formData.accommodationType === "standard"
      ? "Standard - Good-quality guesthouses, B&Bs, or small independent hotels. Rooms are private and usually en-suite."
      : "Basic - Simple lodging such as bunkhouses, hostels, guesthouses, or modest inns. May involve shared dormitory rooms and shared bathroom facilities.";

    // Create email body
    const emailBody = `
West Highland Way Quote Request

CONTACT DETAILS:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}

START DATE: ${startDate}
DURATION: ${totalDays} days (${activeDays} active days)

PARTY DETAILS:
- Number of people: ${formData.numberOfPeople}
- Rooms required: ${formData.numberOfRooms}
- Accommodation: ${accommodationDescription}
- Bag transfer: ${formData.bagTransfer ? "Yes" : "No"}${formData.kingshouseOption ? `\n- Kingshouse preference: ${formData.kingshouseOption === "hotel" ? "Kingshouse Hotel" : formData.kingshouseOption === "bunkhouse" ? "Kingshouse Bunkhouse (shared rooms)" : "Glencoe (via taxi or bus)"}` : ""}

ITINERARY:
${itinerarySummary}

${formData.specialRequests ? `SPECIAL REQUESTS:\n${formData.specialRequests}` : ""}
    `.trim();

    // Open email client
    const subject = encodeURIComponent(`West Highland Way Quote Request - ${startDate}`);
    const body = encodeURIComponent(emailBody);
    window.open(`mailto:hello@bigtrailadventures.com?subject=${subject}&body=${body}`, '_blank');
    
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setIsOpen(false);
  };

  return (
    <Card className="mt-8 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardHeader className="text-center">
        <CardTitle className="text-xl flex items-center justify-center gap-2">
          <Send className="h-5 w-5 text-primary" />
          Ready to Book?
        </CardTitle>
        <CardDescription>
          Export this itinerary to Big Trail Adventures for your personalised quotation. This will open your email with pre-filled information of your itinerary (which you can review before sending).
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Send className="h-4 w-4" />
              Get a Quote
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Request Your Quote</DialogTitle>
              <DialogDescription>
                Tell us about yourself and your preferences
              </DialogDescription>
            </DialogHeader>
            
            {!isSubmitted ? (
              <div className="space-y-6 py-4">
                {/* Contact Details Section */}
                <div className="space-y-4 pb-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Details</h3>
                  
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Your name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        name: e.target.value 
                      }))}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        email: e.target.value 
                      }))}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Mobile number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+44 7700 900000"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        phone: e.target.value 
                      }))}
                    />
                  </div>
                </div>

                {/* Trip Details Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Trip Details</h3>

                  {/* Number of people */}
                  <div className="space-y-2">
                    <Label htmlFor="people" className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      How many people on the trail?
                    </Label>
                    <Input
                      id="people"
                      type="number"
                      min={1}
                      max={20}
                      value={formData.numberOfPeople}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        numberOfPeople: parseInt(e.target.value) || 1 
                      }))}
                    />
                  </div>

                  {/* Number of rooms */}
                  <div className="space-y-2">
                    <Label htmlFor="rooms" className="flex items-center gap-2">
                      <Bed className="h-4 w-4 text-muted-foreground" />
                      How many rooms do you need?
                    </Label>
                    <Input
                      id="rooms"
                      type="number"
                      min={1}
                      max={10}
                      value={formData.numberOfRooms}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        numberOfRooms: parseInt(e.target.value) || 1 
                      }))}
                    />
                  </div>

                  {/* Accommodation type */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      Accommodation Type
                    </Label>
                    <RadioGroup
                      value={formData.accommodationType}
                      onValueChange={(value: "standard" | "basic") => 
                        setFormData(prev => ({ ...prev, accommodationType: value }))
                      }
                      className="space-y-3"
                    >
                      <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="standard" id="standard" className="mt-0.5" />
                        <div className="flex-1">
                          <Label htmlFor="standard" className="font-medium cursor-pointer">
                            Standard
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Good-quality guesthouses, B&Bs, or small independent hotels. Rooms are private and usually en-suite.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="basic" id="basic" className="mt-0.5" />
                        <div className="flex-1">
                          <Label htmlFor="basic" className="font-medium cursor-pointer">
                            Basic
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Simple lodging such as bunkhouses, hostels, guesthouses, or modest inns. May involve shared dormitory rooms and shared bathroom facilities.
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Kingshouse accommodation */}
                  {stopsAtKingshouse && (
                    <div className="space-y-3 p-4 rounded-lg border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30">
                      <p className="text-sm font-medium">
                        Kingshouse has very limited accommodation — a hotel where accommodation is very expensive, or a bunkhouse with shared rooms. Alternatively, accommodation is available in Glencoe via a taxi or bus. Please indicate which option you would like your quote based on:
                      </p>
                      <RadioGroup
                        value={formData.kingshouseOption}
                        onValueChange={(value: "hotel" | "bunkhouse" | "glencoe") => 
                          setFormData(prev => ({ ...prev, kingshouseOption: value }))
                        }
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-amber-100/50 dark:hover:bg-amber-900/20 transition-colors">
                          <RadioGroupItem value="hotel" id="kh-hotel" />
                          <Label htmlFor="kh-hotel" className="cursor-pointer">Kingshouse Hotel</Label>
                        </div>
                        <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-amber-100/50 dark:hover:bg-amber-900/20 transition-colors">
                          <RadioGroupItem value="bunkhouse" id="kh-bunkhouse" />
                          <Label htmlFor="kh-bunkhouse" className="cursor-pointer">Kingshouse Bunkhouse (shared rooms)</Label>
                        </div>
                        <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-amber-100/50 dark:hover:bg-amber-900/20 transition-colors">
                          <RadioGroupItem value="glencoe" id="kh-glencoe" />
                          <Label htmlFor="kh-glencoe" className="cursor-pointer">Glencoe (via taxi or bus)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <Label htmlFor="bagTransfer" className="flex items-center gap-2 cursor-pointer">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      Bag transfer between accommodations?
                    </Label>
                    <Switch
                      id="bagTransfer"
                      checked={formData.bagTransfer}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, bagTransfer: checked }))
                      }
                    />
                  </div>

                  {/* Special requests */}
                  <div className="space-y-2">
                    <Label htmlFor="requests" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      Any special requests?
                    </Label>
                    <Textarea
                      id="requests"
                      placeholder="Bag storage at the start or finish, extra nights accommodation at the beginning and end of the trail, transfer to or from trailhead, will the number of people in the group change during the trip..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        specialRequests: e.target.value 
                      }))}
                      className="resize-none"
                      rows={4}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit} 
                  className="w-full gap-2"
                  disabled={stopsAtKingshouse && !formData.kingshouseOption}
                >
                  <Send className="h-4 w-4" />
                  Send Quote Request
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  This will open your email client with a pre-filled message
                </p>
              </div>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                  <Send className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email Ready!</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your email client should have opened with your quote request. 
                    Just hit send!
                  </p>
                </div>
                <Button variant="outline" onClick={resetForm}>
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default QuoteRequestForm;
