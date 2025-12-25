import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Package, Truck, MapPin, Phone, Mail, Download, Share2, Home } from "lucide-react";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;

  if (!orderData) {
    navigate("/store");
    return null;
  }

  const orderId = `#ORD${Date.now().toString().slice(-6)}`;
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">অর্ডার কনফার্মেশন</h1>
            <Button variant="ghost" onClick={() => navigate("/store")}>
              <Home className="h-5 w-5 mr-2" />
              হোমে ফিরুন
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Success Message */}
          <Card className="border-green-200 dark:border-green-900 bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-background">
            <CardContent className="p-8 text-center space-y-4">
              <div className="h-20 w-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-2">অর্ডার সফল হয়েছে!</h2>
                <p className="text-lg text-muted-foreground">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে</p>
              </div>

              <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 px-6 py-3 rounded-full border-2 border-green-200">
                <span className="text-sm text-muted-foreground">অর্ডার নম্বর</span>
                <span className="text-xl font-bold text-primary">{orderId}</span>
              </div>

              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                আমরা শীঘ্রই আপনার সাথে ফোনে যোগাযোগ করে অর্ডার কনফার্ম করব। একটি কনফার্মেশন SMS আপনার মোবাইলে পাঠানো হয়েছে।
              </p>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-6">অর্ডার ট্র্যাকিং</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="w-0.5 h-16 bg-green-200 dark:bg-green-900/40" />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="font-semibold">অর্ডার প্লেসড</p>
                    <p className="text-sm text-muted-foreground">আপনার অর্ডার গ্রহণ করা হয়েছে</p>
                    <p className="text-xs text-muted-foreground mt-1">এখনই</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Phone className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="w-0.5 h-16 bg-muted" />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="font-semibold text-muted-foreground">কনফার্মেশন কল</p>
                    <p className="text-sm text-muted-foreground">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="w-0.5 h-16 bg-muted" />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="font-semibold text-muted-foreground">প্যাকেজিং</p>
                    <p className="text-sm text-muted-foreground">পণ্য প্যাকেজিং করা হবে</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Truck className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="font-semibold text-muted-foreground">ডেলিভারি</p>
                    <p className="text-sm text-muted-foreground">আনুমানিক ডেলিভারি: {estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Order Details */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  অর্ডার বিস্তারিত
                </h3>
                <Separator />
                <div className="space-y-3">
                  {orderData.cart.map((item: any) => (
                    <div key={item.id} className="flex gap-3">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ৳{item.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold">৳{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>সাবটোটাল</span>
                    <span>৳{orderData.total - (orderData.deliveryMethod === "express" ? 120 : 60)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ডেলিভারি চার্জ</span>
                    <span>৳{orderData.deliveryMethod === "express" ? 120 : 60}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>মোট</span>
                    <span className="text-primary">৳{orderData.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery & Payment Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    ডেলিভারি ঠিকানা
                  </h3>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{orderData.name}</p>
                    <p className="text-muted-foreground">{orderData.phone}</p>
                    {orderData.email && <p className="text-muted-foreground">{orderData.email}</p>}
                    <p className="text-muted-foreground">{orderData.address}</p>
                    <p className="text-muted-foreground">
                      {orderData.area}, {orderData.city}
                      {orderData.postalCode && ` - ${orderData.postalCode}`}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg">পেমেন্ট তথ্য</h3>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">পেমেন্ট পদ্ধতি</span>
                      <Badge variant="secondary">
                        {orderData.paymentMethod === "cod" && "ক্যাশ অন ডেলিভারি"}
                        {orderData.paymentMethod === "bkash" && "bKash"}
                        {orderData.paymentMethod === "nagad" && "Nagad"}
                        {orderData.paymentMethod === "rocket" && "Rocket"}
                      </Badge>
                    </div>
                    {orderData.transactionId && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">ট্রানজেকশন আইডি</span>
                        <span className="font-mono font-medium">{orderData.transactionId}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">ডেলিভারি পদ্ধতি</span>
                      <Badge variant="outline">
                        {orderData.deliveryMethod === "express" ? "এক্সপ্রেস" : "স্ট্যান্ডার্ড"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  ইনভয়েস ডাউনলোড করুন
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Share2 className="h-4 w-4" />
                  শেয়ার করুন
                </Button>
                <Button className="flex-1 gap-2" onClick={() => navigate("/store")}>
                  <Home className="h-4 w-4" />
                  আরও কেনাকাটা করুন
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    সাহায্য প্রয়োজন?
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    অর্ডার সংক্রান্ত কোন প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" />
                    কল করুন
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" />
                    ইমেইল করুন
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
