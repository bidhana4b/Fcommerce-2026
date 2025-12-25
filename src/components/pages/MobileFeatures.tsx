import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Smartphone, QrCode, MessageSquare, Wifi, WifiOff, Image, 
  Zap, Download, Check, Settings, Globe, Languages, TrendingUp,
  Package, DollarSign, ShoppingCart, Search, Bot, Sparkles,
  RefreshCw, AlertCircle, CheckCircle
} from "lucide-react";

export default function MobileFeatures() {
  const [pwaInstalled, setPwaInstalled] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);
  const [imageCompression, setImageCompression] = useState(true);
  const [smsConfirmation, setSmsConfirmation] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(false);

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <div>
        <h1 className="text-header">মোবাইল ও AI ফিচার</h1>
        <p className="text-muted-foreground mt-2">মোবাইল-ফার্স্ট এবং AI-পাওয়ারড ফিচার</p>
      </div>

      <Tabs defaultValue="mobile">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mobile">মোবাইল ফিচার</TabsTrigger>
          <TabsTrigger value="ai">AI অটোমেশন</TabsTrigger>
          <TabsTrigger value="customization">কাস্টমাইজেশন</TabsTrigger>
        </TabsList>

        {/* Mobile Features Tab */}
        <TabsContent value="mobile" className="space-y-6">
          {/* Mobile Payment QR Codes */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-primary" />
                মোবাইল পেমেন্ট QR কোড
              </CardTitle>
              <CardDescription>bKash, Nagad, Rocket এর জন্য QR কোড জেনারেট করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-2 border-pink-200 dark:border-pink-900">
                  <CardContent className="p-6 text-center">
                    <div className="h-48 w-48 mx-auto bg-white rounded-lg flex items-center justify-center mb-4 border-2">
                      <QrCode className="h-32 w-32 text-pink-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">bKash QR</h3>
                    <p className="text-sm text-muted-foreground mb-4">০১৭১২৩৪৫৬৭৮</p>
                    <Button variant="outline" className="w-full gap-2">
                      <Download className="h-4 w-4" />
                      ডাউনলোড করুন
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-200 dark:border-orange-900">
                  <CardContent className="p-6 text-center">
                    <div className="h-48 w-48 mx-auto bg-white rounded-lg flex items-center justify-center mb-4 border-2">
                      <QrCode className="h-32 w-32 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Nagad QR</h3>
                    <p className="text-sm text-muted-foreground mb-4">০১৮১২৩৪৫৬৭৮</p>
                    <Button variant="outline" className="w-full gap-2">
                      <Download className="h-4 w-4" />
                      ডাউনলোড করুন
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 dark:border-purple-900">
                  <CardContent className="p-6 text-center">
                    <div className="h-48 w-48 mx-auto bg-white rounded-lg flex items-center justify-center mb-4 border-2">
                      <QrCode className="h-32 w-32 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Rocket QR</h3>
                    <p className="text-sm text-muted-foreground mb-4">০১৯১২৩৪৫৬৭৮</p>
                    <Button variant="outline" className="w-full gap-2">
                      <Download className="h-4 w-4" />
                      ডাউনলোড করুন
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* SMS Order Confirmation */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                SMS অর্ডার কনফার্মেশন
              </CardTitle>
              <CardDescription>স্বয়ংক্রিয় SMS পাঠান অর্ডার কনফার্মেশনের জন্য</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">SMS কনফার্মেশন চালু করুন</p>
                  <p className="text-sm text-muted-foreground">অর্ডার হলে কাস্টমারকে SMS পাঠান</p>
                </div>
                <Switch checked={smsConfirmation} onCheckedChange={setSmsConfirmation} />
              </div>

              {smsConfirmation && (
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                  <div className="space-y-2">
                    <Label>SMS টেমপ্লেট</Label>
                    <textarea
                      className="w-full p-3 border rounded-lg text-sm"
                      rows={4}
                      defaultValue="আপনার অর্ডার #{ORDER_ID} কনফার্ম হয়েছে। মোট: ৳{AMOUNT}। ডেলিভারি: {DELIVERY_DATE}। ধন্যবাদ!"
                    />
                    <p className="text-xs text-muted-foreground">
                      ভেরিয়েবল: {"{ORDER_ID}"}, {"{AMOUNT}"}, {"{DELIVERY_DATE}"}, {"{CUSTOMER_NAME}"}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>SMS প্রোভাইডার</Label>
                      <select className="w-full p-2 border rounded-lg">
                        <option>SSL Wireless</option>
                        <option>Banglalink</option>
                        <option>Grameenphone</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>API Key</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                  </div>

                  <Button className="w-full">সংরক্ষণ করুন</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* PWA Experience */}
          <Card className="shadow-soft border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                PWA (Progressive Web App)
              </CardTitle>
              <CardDescription>অ্যাপের মতো অভিজ্ঞতা ব্রাউজারে</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">PWA সক্রিয়</p>
                    <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                      <li>✓ হোম স্ক্রিনে ইনস্টল করা যায়</li>
                      <li>✓ অফলাইন মোডে কাজ করে</li>
                      <li>✓ দ্রুত লোডিং</li>
                      <li>✓ পুশ নোটিফিকেশন সাপোর্ট</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">অ্যাপ আইকন</p>
                  <div className="h-20 w-20 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Smartphone className="h-10 w-10 text-primary" />
                  </div>
                  <Button variant="outline" size="sm">আপলোড করুন</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">স্প্ল্যাশ স্ক্রিন</p>
                  <div className="h-20 w-full rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 mb-3" />
                  <Button variant="outline" size="sm">কাস্টমাইজ করুন</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Offline Mode */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WifiOff className="h-5 w-5 text-primary" />
                অফলাইন মোড
              </CardTitle>
              <CardDescription>ধীর ইন্টারনেটে কাজ করার জন্য</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">অফলাইন মোড সক্রিয় করুন</p>
                  <p className="text-sm text-muted-foreground">ইন্টারনেট ছাড়াই বেসিক ফিচার ব্যবহার করুন</p>
                </div>
                <Switch checked={offlineMode} onCheckedChange={setOfflineMode} />
              </div>

              {offlineMode && (
                <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium">অফলাইনে উপলব্ধ:</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>পণ্য তালিকা দেখা</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>অর্ডার ড্রাফট সংরক্ষণ</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>কাস্টমার তথ্য দেখা</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>রিপোর্ট দেখা</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Image Compression */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" />
                ইমেজ কম্প্রেশন
              </CardTitle>
              <CardDescription>দ্রুত লোডিংয়ের জন্য ইমেজ অপটিমাইজ করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">স্বয়ংক্রিয় কম্প্রেশন</p>
                  <p className="text-sm text-muted-foreground">আপলোড করার সময় ইমেজ কম্প্রেস করুন</p>
                </div>
                <Switch checked={imageCompression} onCheckedChange={setImageCompression} />
              </div>

              {imageCompression && (
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                  <div className="space-y-2">
                    <Label>কম্প্রেশন কোয়ালিটি</Label>
                    <div className="flex items-center gap-4">
                      <input type="range" min="50" max="100" defaultValue="80" className="flex-1" />
                      <span className="text-sm font-medium w-12">80%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">কম = ছোট ফাইল, বেশি = ভালো কোয়ালিটি</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-background rounded-lg border">
                      <p className="text-xs text-muted-foreground mb-1">সর্বোচ্চ প্রস্থ</p>
                      <Input type="number" defaultValue="1200" placeholder="1200px" />
                    </div>
                    <div className="p-3 bg-background rounded-lg border">
                      <p className="text-xs text-muted-foreground mb-1">সর্বোচ্চ উচ্চতা</p>
                      <Input type="number" defaultValue="1200" placeholder="1200px" />
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                    <p className="text-sm text-green-900 dark:text-green-100">
                      💡 গড়ে ৭০% ফাইল সাইজ কমবে
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Automation Tab */}
        <TabsContent value="ai" className="space-y-6">
          {/* Smart Product Search */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                স্মার্ট প্রোডাক্ট সার্চ
              </CardTitle>
              <CardDescription>টাইপো সংশোধন এবং স্মার্ট সাজেশন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <p className="font-semibold text-blue-900 dark:text-blue-100 mb-3">ফিচার:</p>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    টাইপো অটো-সংশোধন (যেমন: "মোবাইল" → "মোবাইল")
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    বাংলা-ইংরেজি মিক্স সার্চ
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    সিনোনিম সাপোর্ট (যেমন: "জামা" = "টি-শার্ট")
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    স্মার্ট সাজেশন
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <Label>সার্চ সাজেশন</Label>
                <div className="p-3 border rounded-lg space-y-2">
                  <p className="text-sm font-medium">জনপ্রিয় সার্চ:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">মোবাইল কেস</Badge>
                    <Badge variant="secondary">টি-শার্ট</Badge>
                    <Badge variant="secondary">হ্যান্ডব্যাগ</Badge>
                    <Badge variant="secondary">কসমেটিক্স</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auto-Translate */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-primary" />
                অটো-ট্রান্সলেট (বাংলা ↔ ইংরেজি)
              </CardTitle>
              <CardDescription>স্বয়ংক্রিয় ভাষা অনুবাদ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">অটো-ট্রান্সলেট সক্রিয় করুন</p>
                  <p className="text-sm text-muted-foreground">পণ্যের নাম ও বিবরণ স্বয়ংক্রিয়ভাবে অনুবাদ করুন</p>
                </div>
                <Switch checked={autoTranslate} onCheckedChange={setAutoTranslate} />
              </div>

              {autoTranslate && (
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg bg-background">
                      <p className="text-xs text-muted-foreground mb-2">বাংলা</p>
                      <p className="font-medium">স্মার্টফোন কেস</p>
                    </div>
                    <div className="p-3 border rounded-lg bg-background">
                      <p className="text-xs text-muted-foreground mb-2">English</p>
                      <p className="font-medium">Smartphone Case</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      💡 নতুন পণ্য যোগ করলে স্বয়ংক্রিয়ভাবে অনুবাদ হবে
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Price Suggestions */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                AI প্রাইস সাজেশন
              </CardTitle>
              <CardDescription>মার্কেট ডেটা অনুযায়ী দাম সাজেশন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                <p className="font-semibold text-purple-900 dark:text-purple-100 mb-3">কিভাবে কাজ করে:</p>
                <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                  <li>• প্রতিযোগীদের দাম বিশ্লেষণ</li>
                  <li>• আপনার বিক্রয় ডেটা দেখে</li>
                  <li>• মার্কেট ট্রেন্ড অনুসরণ</li>
                  <li>• সর্বোত্তম দাম সাজেস্ট করে</li>
                </ul>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium">সাম্প্রতিক সাজেশন:</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">স্মার্টফোন কেস</p>
                      <p className="text-sm text-muted-foreground">বর্তমান: ৳৩৫০</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">সাজেস্টেড</p>
                      <p className="font-bold text-green-600">৳৩৮০</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">হ্যান্ডব্যাগ</p>
                      <p className="text-sm text-muted-foreground">বর্তমান: ৳১২০০</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">সাজেস্টেড</p>
                      <p className="font-bold text-orange-600">৳১১৫০</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demand Forecasting */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                ডিমান্ড ফোরকাস্টিং
              </CardTitle>
              <CardDescription>ভবিষ্যতের চাহিদা পূর্বাভাস</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium">স্মার্টফোন কেস</p>
                      <p className="text-sm text-muted-foreground">পরবর্তী ৩০ দিন</p>
                    </div>
                    <Badge variant="default" className="bg-green-600">উচ্চ চাহিদা</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>প্রত্যাশিত বিক্রয়</span>
                      <span className="font-bold">১২০-১৫০ পিস</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>সাজেস্টেড স্টক</span>
                      <span className="font-bold text-primary">১৮০ পিস</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium">টি-শার্ট</p>
                      <p className="text-sm text-muted-foreground">পরবর্তী ৩০ দিন</p>
                    </div>
                    <Badge variant="secondary">মাঝারি চাহিদা</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>প্রত্যাশিত বিক্রয়</span>
                      <span className="font-bold">৬০-৮০ পিস</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>সাজেস্টেড স্টক</span>
                      <span className="font-bold text-primary">১০০ পিস</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auto-Reorder */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-primary" />
                অটো-রিঅর্ডার
              </CardTitle>
              <CardDescription>স্টক কম হলে স্বয়ংক্রিয়ভাবে অর্ডার করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">অটো-রিঅর্ডার সক্রিয় করুন</p>
                  <p className="text-sm text-muted-foreground">স্টক লেভেল কম হলে সাপ্লায়ারকে অটো অর্ডার পাঠান</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                <div className="space-y-2">
                  <Label>মিনিমাম স্টক লেভেল</Label>
                  <Input type="number" defaultValue="10" placeholder="10" />
                  <p className="text-xs text-muted-foreground">এর নিচে গেলে অটো অর্ডার হবে</p>
                </div>

                <div className="space-y-2">
                  <Label>রিঅর্ডার পরিমাণ</Label>
                  <Input type="number" defaultValue="50" placeholder="50" />
                  <p className="text-xs text-muted-foreground">কতটি অর্ডার করবে</p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    💡 সাপ্লায়ারকে ইমেইল/SMS পাঠানো হবে
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customization Tab */}
        <TabsContent value="customization" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>স্টোরফ্রন্ট কাস্টমাইজেশন</CardTitle>
              <CardDescription>আপনার স্টোরের ডিজাইন পরিবর্তন করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                  💡 স্টোরফ্রন্ট কাস্টমাইজেশন ফিচার শীঘ্রই আসছে:
                </p>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <li>• ড্র্যাগ-এন্ড-ড্রপ পেজ বিল্ডার</li>
                  <li>• কাস্টম সেকশন (টেস্টিমোনিয়াল, FAQ)</li>
                  <li>• মেগা মেনু ক্যাটাগরির জন্য</li>
                  <li>• অ্যানাউন্সমেন্ট বার অফারের জন্য</li>
                  <li>• ফুটার কাস্টমাইজেশন</li>
                  <li>• কাস্টম CSS অপশন</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
