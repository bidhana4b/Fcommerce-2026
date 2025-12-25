import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Flame } from "lucide-react";

interface Props {
  title?: string;
  saleEndsAt?: string; // ISO string
  itemsLeft?: number;
  onShopNow?: () => void;
}

export default function FlashSaleBanner({
  title = "আজকের ফ্ল্যাশ সেল: ২০% ছাড়",
  saleEndsAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  itemsLeft = 50,
  onShopNow,
}: Props) {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const diff = new Date(saleEndsAt).getTime() - Date.now();
    return Math.max(0, Math.floor(diff / 1000));
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  if (timeLeft === 0) return null;

  return (
    <div className="bg-orange-50 dark:bg-orange-950/20 border-y border-orange-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
              <Flame className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-orange-900 dark:text-orange-100">{title}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-red-500">মজুদ {itemsLeft}টি</Badge>
                <span className="flex items-center gap-2 text-sm font-semibold text-orange-700 dark:text-orange-200">
                  <Clock className="h-4 w-4" />
                  শেষ হচ্ছে: {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>

          <Button
            className="gap-2 bg-gradient-to-r from-orange-600 to-red-600"
            onClick={onShopNow}
          >
            এখনই কিনুন
          </Button>
        </div>
      </div>
    </div>
  );
}
