import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function AbandonedCartRecovery() {
  const [showDialog, setShowDialog] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    // Check if user has items in cart and hasn't checked out
    const savedCart = localStorage.getItem("cart");
    const lastActivity = localStorage.getItem("lastCartActivity");
    
    if (savedCart && lastActivity) {
      const items = JSON.parse(savedCart);
      const lastTime = parseInt(lastActivity);
      const now = Date.now();
      const timePassed = (now - lastTime) / 1000; // seconds

      // Show dialog if cart has items and user was inactive for 5 minutes
      if (items.length > 0 && timePassed > 300 && timePassed < 3600) {
        setCartItems(items);
        setTimeLeft(Math.max(0, 600 - Math.floor(timePassed)));
        setShowDialog(true);
      }
    }
  }, []);

  useEffect(() => {
    if (showDialog && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showDialog, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleContinueShopping = () => {
    setShowDialog(false);
    localStorage.setItem("lastCartActivity", Date.now().toString());
  };

  const handleCheckout = () => {
    setShowDialog(false);
    window.location.href = "/checkout";
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="h-6 w-6 text-primary" />
            আপনার কার্টে পণ্য রয়েছে!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Timer */}
          <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span className="font-semibold text-orange-900 dark:text-orange-100">
                    বিশেষ অফার শেষ হচ্ছে
                  </span>
                </div>
                <span className="text-2xl font-bold text-orange-600">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Cart Items */}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 border rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="h-12 w-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ৳{item.price} × {item.quantity}
                  </p>
                </div>
                <p className="font-bold text-sm">৳{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <span className="font-semibold">মোট</span>
            <span className="text-xl font-bold text-primary">৳{total}</span>
          </div>

          {/* Special Offer */}
          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
            <CardContent className="p-3">
              <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                🎉 এখনই অর্ডার করুন এবং পান:
              </p>
              <ul className="text-sm text-green-800 dark:text-green-200 mt-2 space-y-1">
                <li>✓ ১০% অতিরিক্ত ছাড়</li>
                <li>✓ ফ্রি ডেলিভারি</li>
                <li>✓ দ্রুত প্রসেসিং</li>
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleContinueShopping}
              className="flex-1"
            >
              পরে দেখব
            </Button>
            <Button 
              onClick={handleCheckout}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
            >
              চেকআউট করুন
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
