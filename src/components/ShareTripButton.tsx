import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { buildShareUrl } from "@/hooks/useUrlParams";

interface ShareTripButtonProps {
  trail: string;
  pace: string;
  direction: string;
  days: number;
  partySize: number;
  startDate: Date;
  dailyHours: number;
}

const ShareTripButton = (props: ShareTripButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = buildShareUrl(props);
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 text-xs text-teal-600 hover:text-teal-700 transition-colors"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Link copied!
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5" />
          Share this trip
        </>
      )}
    </button>
  );
};

export default ShareTripButton;
