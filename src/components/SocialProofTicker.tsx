import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Eye } from "lucide-react";

const recentOrders = [
  { name: "রহিম আহমেদ", location: "ঢাকা", product: "স্মার্টফোন কেস", time: "২ মিনিট আগে" },
  { name: "সালমা খাতুন", location: "চট্টগ্রাম", product: "হ্যান্ডব্যাগ", time: "৫ মিনিট আগে" },
  { name: "করিম মিয়া", location: "সিলেট", product: "টি-শার্ট", time: "৮ মিনিট আগে" },
  { name: "ফাতেমা আক্তার", location: "রাজশাহী", product: "কসমেটিক্স", time: "১২ মিনিট আগে" },
];

export default function SocialProofTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewingCount, setViewingCount] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recentOrders.length);
      setViewingCount(Math.floor(Math.random() * 10) + 8);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const order = recentOrders[currentIndex];

  return (
    <div className="fixed bottom-24 left-6 z-40 space-y-3 max-w-xs">
      {/* Recent Order Notification */}
      <div className="bg-white dark:bg-gray-950 border shadow-lg rounded-lg p-3 animate-in slide-in-from-left">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-primary/10">
            <AvatarFallback className="text-primary font-semibold">
              {order.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{order.name}</p>
            <p className="text-xs text-muted-foreground">{order.location}</p>
          </div>
          <ShoppingBag className="h-5 w-5 text-green-600 flex-shrink-0" />
        </div>
        <div className="mt-2 pt-2 border-t">
          <p className="text-xs font-medium">{order.product} কিনেছেন</p>
          <p className="text-xs text-muted-foreground">{order.time}</p>
        </div>
      </div>

      {/* Live Viewing Count */}
      <div className="bg-white dark:bg-gray-950 border shadow-lg rounded-lg p-3 animate-in slide-in-from-left">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Eye className="h-5 w-5 text-blue-600" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div>
            <p className="text-sm font-semibold">{viewingCount} জন দেখছেন</p>
            <p className="text-xs text-muted-foreground">এখন অনলাইনে</p>
          </div>
        </div>
      </div>
    </div>
  );
}
