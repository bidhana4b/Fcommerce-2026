import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Phone, User, Mail, Home, Building2, CreditCard, Wallet, Truck, ShoppingBag } from "lucide-react";

// Mock cart data - would come from context/state management
const mockCart = [
  { id: 1, name: "স্মার্টফোন কেস", price: 350, quantity: 2, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80" },
  { id: 2, name: "হ্যান্ডব্যাগ", price: 1200, quantity: 1, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80" },
];

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    area: "",
    postalCode: "",
    deliveryMethod: "standard",
    paymentMethod: "cod",
    notes: "",
  });

  const subtotal = mockCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = formData.deliveryMethod === "express" ? 120 : 60;
  const total = subtotal + deliveryCharge;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (step === 1) {
      setStep(2);
    } else {
      navigate("/payment", { state: { orderData: { ...formData, cart: mockCart, total } } });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => step === 1 ? navigate("/store") : setStep(1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">চেকআউট</h1>
              <p className="text-sm text-muted-foreground">
                {step === 1 ? "ডেলিভারি তথ্য" : "পেমেন্ট পদ্ধতি"}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-muted'}`}>
                  1
                </div>
                <span className="hidden sm:inline font-medium">ডেলিভারি</span>
              </div>
              <div className={`h-1 w-16 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
              <div className="flex items-center gap-2">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-muted'}`}>
                  2
                </div>
                <span className="hidden sm:inline font-medium">পেমেন্ট</span>
              </div>
              <div className={`h-1 w-16 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
              <div className="flex items-center gap-2">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-primary text-white' : 'bg-muted'}`}>
                  3
                </div>
                <span className="hidden sm:inline font-medium">কনফার্ম</span>
              </div>
            </div>

            {/* Step 1: Delivery Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    ডেলিভারি তথ্য
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        <User className="h-4 w-4 inline mr-2" />
                        পূর্ণ নাম *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="আপনার নাম লিখুন"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        <Phone className="h-4 w-4 inline mr-2" />
                        মোবাইল নম্বর *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="০১৭xxxxxxxx"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="h-4 w-4 inline mr-2" />
                      ইমেইল (ঐচ্ছিক)
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">
                      <Home className="h-4 w-4 inline mr-2" />
                      সম্পূর্ণ ঠিকানা *
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="বাড়ি/ফ্ল্যাট নম্বর, রোড নম্বর, এলাকা"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        <Building2 className="h-4 w-4 inline mr-2" />
                        শহর *
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="ঢাকা"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">এলাকা *</Label>
                      <Input
                        id="area"
                        name="area"
                        placeholder="ধানমন্ডি"
                        value={formData.area}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">পোস্টাল কোড</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        placeholder="১২০৫"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label className="text-base font-semibold">
                      <Truck className="h-5 w-5 inline mr-2" />
                      ডেলিভারি পদ্ধতি
                    </Label>
                    <RadioGroup value={formData.deliveryMethod} onValueChange={(value) => setFormData({ ...formData, deliveryMethod: value })}>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">স্ট্যান্ডার্ড ডেলিভারি</p>
                              <p className="text-sm text-muted-foreground">৩-৫ কার্যদিবস</p>
                            </div>
                            <span className="font-bold">৳৬০</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">এক্সপ্রেস ডেলিভারি</p>
                              <p className="text-sm text-muted-foreground">১-২ কার্যদিবস</p>
                            </div>
                            <span className="font-bold">৳১২০</span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">অতিরিক্ত নোট (ঐচ্ছিক)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="ডেলিভারি সম্পর্কে কোন বিশেষ নির্দেশনা..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    পেমেন্ট পদ্ধতি নির্বাচন করুন
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Wallet className="h-8 w-8 text-green-600" />
                            <div>
                              <p className="font-semibold">ক্যাশ অন ডেলিভারি (COD)</p>
                              <p className="text-sm text-muted-foreground">পণ্য পাওয়ার পর পেমেন্ট করুন</p>
                            </div>
                          </div>
                          <Badge variant="secondary">প্রস্তাবিত</Badge>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="bkash" id="bkash" />
                      <Label htmlFor="bkash" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-pink-600 rounded flex items-center justify-center text-white font-bold text-xs">
                            bKash
                          </div>
                          <div>
                            <p className="font-semibold">bKash</p>
                            <p className="text-sm text-muted-foreground">মোবাইল ব্যাংকিং</p>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="nagad" id="nagad" />
                      <Label htmlFor="nagad" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-orange-600 rounded flex items-center justify-center text-white font-bold text-xs">
                            Nagad
                          </div>
                          <div>
                            <p className="font-semibold">Nagad</p>
                            <p className="text-sm text-muted-foreground">মোবাইল ব্যাংকিং</p>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="rocket" id="rocket" />
                      <Label htmlFor="rocket" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-purple-600 rounded flex items-center justify-center text-white font-bold text-xs">
                            Rocket
                          </div>
                          <div>
                            <p className="font-semibold">Rocket</p>
                            <p className="text-sm text-muted-foreground">মোবাইল ব্যাংকিং</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.paymentMethod !== "cod" && (
                    <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                      <CardContent className="p-4">
                        <p className="text-sm">
                          <strong>নোট:</strong> পেমেন্ট করার পর পরবর্তী পেজে ট্রানজেকশন আইডি প্রদান করতে হবে।
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              {step === 2 && (
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  পূর্ববর্তী
                </Button>
              )}
              <Button onClick={handleSubmit} className="flex-1" size="lg">
                {step === 1 ? "পরবর্তী" : "অর্ডার কনফার্ম করুন"}
              </Button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  অর্ডার সামারি
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {mockCart.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover" />
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-muted-foreground">৳{item.price} × {item.quantity}</p>
                      </div>
                      <p className="font-bold">৳{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>সাবটোটাল</span>
                    <span>৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ডেলিভারি চার্জ</span>
                    <span>৳{deliveryCharge}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>মোট</span>
                    <span className="text-primary">৳{total}</span>
                  </div>
                </div>

                <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
                  <CardContent className="p-3">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      ✓ ১০০% নিরাপদ পেমেন্ট
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      ✓ ৭ দিনের রিটার্ন পলিসি
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
