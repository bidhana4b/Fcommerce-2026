import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Gift, Crown, Star, Copy, Share2, Heart } from "lucide-react";

interface Props {
  userName?: string;
  pointsBalance?: number;
  pointsToEarnToday?: number;
  tier?: "Bronze" | "Silver" | "Gold" | "Platinum";
  nextTier?: "Silver" | "Gold" | "Platinum";
  nextTierProgress?: number; // 0-100
  referralCode?: string;
}

export default function LoyaltyPanel({
  userName = "Rahim",
  pointsBalance = 1200,
  pointsToEarnToday = 0,
  tier = "Silver",
  nextTier = "Gold",
  nextTierProgress = 40,
  referralCode = "REF-RAHIM-123",
}: Props) {
  const { toast } = useToast();
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(Array.isArray(list) ? list.length : 0);
    } catch {
      setWishlistCount(0);
    }
  }, []);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    toast({ title: "কপি হয়েছে", description: `রেফারেল কোড ${referralCode}` });
  };

  const handleShareWhatsApp = () => {
    const msg = `আমার স্টোরে কেনাকাটা করুন এবং পয়েন্ট পান! রেফারেল কোড: ${referralCode}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="bg-background">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            লয়্যালটি & রিটেনশন
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Points Balance */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">পয়েন্ট ব্যালান্স</p>
              </div>
              <p className="text-2xl font-bold mt-1">{pointsBalance} পয়েন্ট</p>
              {pointsToEarnToday > 0 && (
                <p className="text-xs text-green-700 mt-1">আজ {pointsToEarnToday} পয়েন্ট অর্জন করবেন</p>
              )}
              <Button size="sm" className="mt-3 w-full">রিডিম করুন</Button>
            </div>

            {/* VIP Tier */}
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <p className="text-sm text-muted-foreground">বর্তমান টিয়ার</p>
              </div>
              <p className="text-xl font-bold mt-1">{tier}</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>পরবর্তী: {nextTier}</span>
                  <span>{nextTierProgress}%</span>
                </div>
                <Progress value={nextTierProgress} />
              </div>
              <div className="mt-2 flex gap-2 flex-wrap">
                <Badge variant="secondary">ফ্রি শিপিং</Badge>
                <Badge variant="secondary">বিশেষ ছাড়</Badge>
                <Badge variant="secondary">আর্লি অ্যাক্সেস</Badge>
              </div>
            </div>

            {/* Referral & Wishlist */}
            <div className="p-4 rounded-lg border space-y-2">
              <p className="text-sm text-muted-foreground">রেফারেল</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{referralCode}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyReferral}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShareWhatsApp}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Heart className="h-4 w-4 text-pink-600" />
                <p className="text-sm">উইশলিস্ট আইটেম: <span className="font-semibold">{wishlistCount}</span></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
