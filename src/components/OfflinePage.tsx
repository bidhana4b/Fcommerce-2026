import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WifiOff, RefreshCw, Home, ShoppingBag, MessageSquare } from "lucide-react";

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  const cachedPages = [
    { name: "হোম", path: "/", icon: Home },
    { name: "অর্ডার", path: "/dashboard/orders", icon: ShoppingBag },
    { name: "মেসেজ", path: "/dashboard/chat", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-2xl">
        <CardContent className="p-8 text-center">
          {/* Offline Icon */}
          <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
            <WifiOff className="h-12 w-12 text-yellow-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-2">অফলাইন মোড</h1>
          <p className="text-muted-foreground mb-6">
            আপনি বর্তমানে ইন্টারনেট সংযোগ ছাড়া আছেন। কিছু ফিচার সীমিত থাকতে পারে।
          </p>

          {/* Refresh Button */}
          <Button onClick={handleRefresh} className="gap-2 mb-6 w-full">
            <RefreshCw className="h-4 w-4" />
            পুনরায় চেষ্টা করুন
          </Button>

          {/* Cached Pages */}
          <div className="border-t pt-6">
            <p className="text-sm text-muted-foreground mb-4">
              ক্যাশ করা পেজগুলো দেখতে পারেন:
            </p>
            <div className="space-y-2">
              {cachedPages.map((page) => {
                const Icon = page.icon;
                return (
                  <Button
                    key={page.path}
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => (window.location.href = page.path)}
                  >
                    <Icon className="h-4 w-4" />
                    {page.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg text-left">
            <p className="text-sm font-medium mb-2">💡 টিপস:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• অফলাইনে নেওয়া অর্ডার অনলাইন হলে সিঙ্ক হবে</li>
              <li>• ক্যাশ করা পণ্য তথ্য দেখতে পারবেন</li>
              <li>• নতুন ডেটা লোড করতে ইন্টারনেট প্রয়োজন</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
