import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle, Copy, Phone, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;
  const [transactionId, setTransactionId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!orderData) {
    navigate("/store");
    return null;
  }

  const paymentMethod = orderData.paymentMethod;
  const total = orderData.total;

  const paymentNumbers = {
    bkash: "01712345678",
    nagad: "01812345678",
    rocket: "01912345678",
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      navigate("/order-confirmation", { state: { orderData: { ...orderData, transactionId } } });
    }, 2000);
  };

  // COD Flow
  if (paymentMethod === "cod") {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-white dark:bg-gray-950 border-b shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/checkout")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">অর্ডার কনফার্মেশন</h1>
                <p className="text-sm text-muted-foreground">ক্যাশ অন ডেলিভারি</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="border-green-200 dark:border-green-900">
            <CardContent className="p-8 text-center space-y-6">
              <div className="h-20 w-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-2">অর্ডার সফল হয়েছে!</h2>
                <p className="text-muted-foreground">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে</p>
              </div>

              <Card className="bg-muted">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">অর্ডার নম্বর</span>
                    <span className="font-bold">#ORD{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">মোট পরিমাণ</span>
                    <span className="font-bold text-primary">৳{total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">পেমেন্ট পদ্ধতি</span>
                    <Badge variant="secondary">ক্যাশ অন ডেলিভারি</Badge>
                  </div>
                </CardContent>
              </Card>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  পণ্য ডেলিভারি হওয়ার সময় ডেলিভারি ম্যানকে <strong>৳{total}</strong> টাকা প্রদান করুন।
                </AlertDescription>
              </Alert>

              <div className="space-y-3 text-left">
                <h3 className="font-semibold">পরবর্তী ধাপ:</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-primary">১.</span>
                    <span>আমরা শীঘ্রই আপনার সাথে ফোনে যোগাযোগ করে অর্ডার কনফার্ম করব</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-primary">২.</span>
                    <span>অর্ডার কনফার্ম হওয়ার পর পণ্য প্যাকেজিং করা হবে</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-primary">৩.</span>
                    <span>কুরিয়ার সার্ভিসের মাধ্যমে পণ্য পাঠানো হবে</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-primary">৪.</span>
                    <span>পণ্য পাওয়ার পর পেমেন্ট করুন</span>
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => navigate("/store")}>
                  আরও কেনাকাটা করুন
                </Button>
                <Button className="flex-1 gap-2">
                  <Phone className="h-4 w-4" />
                  সাপোর্ট কল করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Mobile Banking Flow
  const paymentNumber = paymentNumbers[paymentMethod as keyof typeof paymentNumbers];
  const paymentName = paymentMethod === "bkash" ? "bKash" : paymentMethod === "nagad" ? "Nagad" : "Rocket";
  const paymentColor = paymentMethod === "bkash" ? "pink" : paymentMethod === "nagad" ? "orange" : "purple";

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white dark:bg-gray-950 border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/checkout")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">পেমেন্ট করুন</h1>
              <p className="text-sm text-muted-foreground">{paymentName} পেমেন্ট</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          {/* Payment Instructions */}
          <Card className={`border-${paymentColor}-200 dark:border-${paymentColor}-900`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`h-12 w-12 bg-${paymentColor}-600 rounded-lg flex items-center justify-center text-white font-bold`}>
                  {paymentName}
                </div>
                <div>
                  <p>পেমেন্ট নির্দেশনা</p>
                  <p className="text-sm font-normal text-muted-foreground">নিচের ধাপগুলো অনুসরণ করুন</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount to Pay */}
              <Card className="bg-muted">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">পেমেন্ট করতে হবে</p>
                  <p className="text-4xl font-bold text-primary">৳{total}</p>
                </CardContent>
              </Card>

              {/* Payment Number */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">পেমেন্ট নম্বর</Label>
                <div className="flex gap-2">
                  <Input value={paymentNumber} readOnly className="text-lg font-mono" />
                  <Button variant="outline" size="icon" onClick={() => handleCopy(paymentNumber)}>
                    {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">পেমেন্ট প্রক্রিয়া</Label>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3 p-3 bg-muted rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      1
                    </div>
                    <p>আপনার {paymentName} অ্যাপ খুলুন</p>
                  </div>
                  <div className="flex gap-3 p-3 bg-muted rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      2
                    </div>
                    <p>"Send Money" অপশনে যান</p>
                  </div>
                  <div className="flex gap-3 p-3 bg-muted rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      3
                    </div>
                    <p>উপরের নম্বরে <strong>৳{total}</strong> টাকা পাঠান</p>
                  </div>
                  <div className="flex gap-3 p-3 bg-muted rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      4
                    </div>
                    <p>ট্রানজেকশন সফল হলে ট্রানজেকশন আইডি কপি করুন</p>
                  </div>
                  <div className="flex gap-3 p-3 bg-muted rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      5
                    </div>
                    <p>নিচের বক্সে ট্রানজেকশন আইডি লিখুন</p>
                  </div>
                </div>
              </div>

              <Alert className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                  <strong>গুরুত্বপূর্ণ:</strong> পেমেন্ট করার পর অবশ্যই ট্রানজেকশন আইডি প্রদান করুন। এটি ছাড়া আপনার অর্ডার প্রসেস করা সম্ভব হবে না।
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Transaction ID Input */}
          <Card>
            <CardHeader>
              <CardTitle>ট্রানজেকশন আইডি প্রদান করুন</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transactionId">ট্রানজেকশন আইডি / TrxID *</Label>
                <Input
                  id="transactionId"
                  placeholder="উদাহরণ: 9A1B2C3D4E"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="text-lg font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  পেমেন্ট সফল হওয়ার পর আপনি একটি ট্রানজেকশন আইডি পাবেন (যেমন: 9A1B2C3D4E)
                </p>
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={!transactionId || isProcessing}
                onClick={handleConfirmPayment}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    প্রসেস হচ্ছে...
                  </>
                ) : (
                  "পেমেন্ট কনফার্ম করুন"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                পেমেন্ট কনফার্ম করার মাধ্যমে আপনি আমাদের শর্তাবলী মেনে নিচ্ছেন
              </p>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-blue-900 dark:text-blue-100">সাহায্য প্রয়োজন?</p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    পেমেন্ট সংক্রান্ত কোন সমস্যা হলে আমাদের সাথে যোগাযোগ করুন: <strong>০১৭১২৩৪৫৬৭৮</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
