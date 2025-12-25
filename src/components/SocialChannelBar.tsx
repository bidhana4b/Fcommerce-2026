import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AnnouncementBarProps {
  channel?: string;
}

export default function SocialChannelBar({ channel }: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Channel-specific promos
  const channelPromos = {
    facebook: {
      text: "🎉 Facebook থেকে এসেছেন? কোড FB15 দিয়ে ১৫% ছাড় পান!",
      code: "FB15",
      color: "bg-blue-600",
    },
    instagram: {
      text: "✨ Instagram থেকে এসেছেন? কোড INSTA20 দিয়ে ২০% ছাড় পান!",
      code: "INSTA20",
      color: "bg-gradient-to-r from-purple-600 to-pink-600",
    },
    whatsapp: {
      text: "💚 WhatsApp থেকে এসেছেন? কোড WA10 দিয়ে ১০% ছাড় + ফ্রি ডেলিভারি!",
      code: "WA10",
      color: "bg-green-600",
    },
    google: {
      text: "🔍 Google থেকে এসেছেন? কোড GOOGLE12 দিয়ে ১২% ছাড় পান!",
      code: "GOOGLE12",
      color: "bg-red-600",
    },
    default: {
      text: "🎁 প্রথম অর্ডারে ১০% ছাড়! কোড: FIRST10",
      code: "FIRST10",
      color: "bg-primary",
    },
  };

  const promo = channelPromos[channel as keyof typeof channelPromos] || channelPromos.default;

  if (!isVisible) return null;

  return (
    <div className={`${promo.color} text-white py-3 px-4 relative animate-in slide-in-from-top`}>
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 text-center">
          <p className="text-sm md:text-base font-medium">{promo.text}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-white hover:bg-white/20"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
