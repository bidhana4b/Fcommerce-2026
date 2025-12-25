import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Globe, CreditCard, Shield, Smartphone, Download, ExternalLink, Copy, Check, Palette, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useStoreTheme, StoreTheme } from "@/contexts/StoreThemeContext";
import SocialIntegration from "@/components/SocialIntegration";
import { PWAInstallButton, PWAStatusCard } from "@/components/PWAInstallPrompt";

export default function Settings() {
  const [storeLinkCopied, setStoreLinkCopied] = useState(false);
  const storeUrl = "https://9a6d8916-933c-4562-bcdd-b19b29b6b53f.canvases.tempo.build/store";
  const { theme, setTheme, heroConfig, setHeroConfig } = useStoreTheme();

  const copyStoreLink = () => {
    navigator.clipboard.writeText(storeUrl);
    setStoreLinkCopied(true);
    setTimeout(() => setStoreLinkCopied(false), 2000);
  };

  // Theme configurations
  const themes: Record<StoreTheme, { name: string; colors: string; description: string }> = {
    modern: {
      name: "মডার্ন",
      colors: "bg-gradient-to-br from-blue-50 to-indigo-50",
      description: "পরিষ্কার এবং আধুনিক ডিজাইন"
    },
    minimal: {
      name: "মিনিমাল",
      colors: "bg-gradient-to-br from-gray-50 to-slate-50",
      description: "সরল এবং মার্জিত"
    },
    classic: {
      name: "ক্লাসিক",
      colors: "bg-gradient-to-br from-amber-50 to-orange-50",
      description: "ঐতিহ্যবাহী এবং উষ্ণ"
    },
    vibrant: {
      name: "প্রাণবন্ত",
      colors: "bg-gradient-to-br from-pink-50 to-purple-50",
      description: "রঙিন এবং আকর্ষণীয়"
    }
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <div>
        <h1 className="text-header">সেটিংস</h1>
        <p className="text-muted-foreground mt-2">আপনার অ্যাকাউন্ট এবং প্রেফারেন্স পরিচালনা করুন</p>
      </div>

      <Tabs defaultValue="integrations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-8">
          <TabsTrigger value="account">অ্যাকাউন্ট</TabsTrigger>
          <TabsTrigger value="storefront">স্টোরফ্রন্ট</TabsTrigger>
          <TabsTrigger value="pwa">PWA অ্যাপ</TabsTrigger>
          <TabsTrigger value="notifications">নোটিফিকেশন</TabsTrigger>
          <TabsTrigger value="language">ভাষা</TabsTrigger>
          <TabsTrigger value="payment">পেমেন্ট</TabsTrigger>
          <TabsTrigger value="security">নিরাপত্তা</TabsTrigger>
          <TabsTrigger value="integrations">ইন্টিগ্রেশন</TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                অ্যাকাউন্ট তথ্য
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>নাম</Label>
                  <Input placeholder="আপনার নাম" defaultValue="মোহাম্মদ রহিম" />
                </div>
                <div className="space-y-2">
                  <Label>ইমেইল</Label>
                  <Input type="email" placeholder="email@example.com" defaultValue="rahim@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>ফোন নাম্বার</Label>
                  <Input placeholder="০১৭১২৩৪৫৬৭৮" defaultValue="০১৭১২৩৪৫৬৭৮" />
                </div>
                <div className="space-y-2">
                  <Label>ব্যবসার নাম</Label>
                  <Input placeholder="আপনার ব্যবসার নাম" defaultValue="রহিম ট্রেডার্স" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>ঠিকানা</Label>
                <Input placeholder="আপনার ব্যবসার ঠিকানা" defaultValue="ধানমন্ডি, ঢাকা" />
              </div>
              <Button>পরিবর্তন সংরক্ষণ করুন</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PWA Settings Tab */}
        <TabsContent value="pwa">
          <div className="space-y-6">
            {/* Enhanced PWA Status Card */}
            <PWAStatusCard />

            {/* Cache Management */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  ক্যাশ ম্যানেজমেন্ট
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">ক্যাশ ক্লিয়ার করুন</p>
                    <p className="text-sm text-muted-foreground">
                      সব ক্যাশ ডেটা মুছে ফেলুন এবং নতুন করে লোড করুন
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if ('caches' in window) {
                        caches.keys().then((names) => {
                          names.forEach((name) => {
                            caches.delete(name);
                          });
                        });
                        window.location.reload();
                      }
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    ক্লিয়ার
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">ইনস্টল ব্যানার রিসেট</p>
                    <p className="text-sm text-muted-foreground">
                      ইনস্টল প্রম্পট আবার দেখতে চাইলে রিসেট করুন
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      localStorage.removeItem("pwa-banner-dismissed");
                      localStorage.removeItem("pwa-installed");
                      window.location.reload();
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    রিসেট
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">আপডেট চেক করুন</p>
                    <p className="text-sm text-muted-foreground">
                      নতুন ভার্সন আছে কিনা দেখুন
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if ('serviceWorker' in navigator) {
                        navigator.serviceWorker.getRegistration().then((reg) => {
                          if (reg) {
                            reg.update();
                          }
                        });
                      }
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    চেক করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Storefront Settings */}
        <TabsContent value="storefront">
          <div className="space-y-6">
            <Card className="shadow-soft border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  আপনার অনলাইন স্টোর
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-2">আপনার স্টোর লিংক:</p>
                  <div className="flex gap-2">
                    <Input value={storeUrl} readOnly className="font-mono text-sm" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyStoreLink}
                    >
                      {storeLinkCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button
                      onClick={() => window.open(storeUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      দেখুন
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  এই লিংকটি আপনার কাস্টমারদের সাথে শেয়ার করুন। তারা এখানে আপনার সব পণ্য দেখতে এবং অর্ডার করতে পারবে।
                </p>
              </CardContent>
            </Card>

            {/* NEW: Theme Selection Card */}
            <Card className="shadow-soft border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  স্টোর থিম নির্বাচন করুন
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base mb-4 block">থিম ডিজাইন</Label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {(Object.keys(themes) as StoreTheme[]).map((themeKey) => (
                      <Card
                        key={themeKey}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          theme === themeKey ? 'ring-2 ring-primary shadow-lg' : ''
                        }`}
                        onClick={() => setTheme(themeKey)}
                      >
                        <CardContent className="p-4">
                          <div className={`h-24 rounded-lg mb-3 ${themes[themeKey].colors} border`} />
                          <h4 className="font-semibold mb-1">{themes[themeKey].name}</h4>
                          <p className="text-xs text-muted-foreground">{themes[themeKey].description}</p>
                          {theme === themeKey && (
                            <div className="mt-2 flex items-center gap-1 text-primary text-sm font-medium">
                              <Check className="h-4 w-4" />
                              নির্বাচিত
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Label className="text-base mb-4 block">হিরো সেকশন কাস্টমাইজ করুন</Label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Switch
                        id="showBanner"
                        checked={heroConfig.showBanner}
                        onCheckedChange={(checked) => setHeroConfig({ showBanner: checked })}
                      />
                      <Label htmlFor="showBanner" className="cursor-pointer">হিরো ব্যানার দেখান</Label>
                    </div>

                    {heroConfig.showBanner && (
                      <>
                        <div className="space-y-2">
                          <Label>শিরোনাম</Label>
                          <Input
                            value={heroConfig.title}
                            onChange={(e) => setHeroConfig({ title: e.target.value })}
                            placeholder="আপনার স্টোরের শিরোনাম লিখুন"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>সাবটাইটেল</Label>
                          <Input
                            value={heroConfig.subtitle}
                            onChange={(e) => setHeroConfig({ subtitle: e.target.value })}
                            placeholder="সাবটাইটেল লিখুন"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>ব্যানার ইমেজ URL</Label>
                          <Input
                            value={heroConfig.bannerImage}
                            onChange={(e) => setHeroConfig({ bannerImage: e.target.value })}
                            placeholder="https://example.com/banner.jpg"
                          />
                        </div>

                        {/* Preview */}
                        <div className="mt-6">
                          <Label className="mb-3 block">প্রিভিউ</Label>
                          <div className={`rounded-lg overflow-hidden border-2 ${themes[theme].colors}`}>
                            <div className="p-8 text-center">
                              <h2 className="text-2xl font-bold mb-2">{heroConfig.title}</h2>
                              <p className="text-muted-foreground">{heroConfig.subtitle}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <Check className="h-4 w-4 mr-2" />
                  থিম সংরক্ষণ করুন
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  স্টোর তথ্য
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>স্টোরের নাম (বাংলা)</Label>
                    <Input placeholder="রহিম ট্রেডার্স" defaultValue="রহিম ট্রেডার্স" />
                  </div>
                  <div className="space-y-2">
                    <Label>স্টোরের নাম (ইংরেজি)</Label>
                    <Input placeholder="Rahim Traders" defaultValue="Rahim Traders" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>স্টোর বিবরণ</Label>
                  <Textarea 
                    placeholder="আপনার স্টোর সম্পর্কে লিখুন..." 
                    defaultValue="আমরা সেরা মানের পণ্য সরবরাহ করি সাশ্রয়ী মূল্যে"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>স্টোর লোগো</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">RT</span>
                    </div>
                    <Button variant="outline">লোগো আপলোড করুন</Button>
                  </div>
                </div>
                <Button>পরিবর্তন সংরক্ষণ করুন</Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>স্টোর কাস্টমাইজেশন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>প্রাইমারি কালার</Label>
                  <div className="flex gap-2">
                    <Input type="color" defaultValue="#0ea5e9" className="w-20 h-10" />
                    <Input value="#0ea5e9" readOnly />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">হোয়াটসঅ্যাপ অর্ডার বাটন দেখান</p>
                    <p className="text-sm text-muted-foreground">কাস্টমাররা সরাসরি হোয়াটসঅ্যাপে অর্ডার করতে পারবে</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">পণ্যের রেটিং দেখান</p>
                    <p className="text-sm text-muted-foreground">পণ্যের স্টার রেটিং এবং রিভিউ সংখ্যা</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">স্টক কাউন্ট দেখান</p>
                    <p className="text-sm text-muted-foreground">কাস্টমাররা দেখতে পারবে কতটি স্টকে আছে</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button>সংরক্ষণ করুন</Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>ডেলিভারি সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>ঢাকার ভিতরে ডেলিভারি চার্জ (৳)</Label>
                    <Input type="number" placeholder="৬০" defaultValue="60" />
                  </div>
                  <div className="space-y-2">
                    <Label>ঢাকার বাইরে ডেলিভারি চার্জ (৳)</Label>
                    <Input type="number" placeholder="১২০" defaultValue="120" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>ফ্রি ডেলিভারি মিনিমাম অর্ডার (৳)</Label>
                  <Input type="number" placeholder="১০০০" defaultValue="1000" />
                  <p className="text-xs text-muted-foreground">এই পরিমাণের বেশি অর্ডারে ডেলিভারি ফ্রি হবে</p>
                </div>
                <div className="space-y-2">
                  <Label>ডেলিভারি সময়</Label>
                  <Input placeholder="২-৩ কার্যদিবস" defaultValue="২-৩ কার্যদিবস" />
                </div>
                <Button>সংরক্ষণ করুন</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                নোটিফিকেশন সেটিংস
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>নতুন অর্ডার</Label>
                  <p className="text-sm text-muted-foreground">নতুন অর্ডার আসলে নোটিফিকেশন পান</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>পেমেন্ট আপডেট</Label>
                  <p className="text-sm text-muted-foreground">পেমেন্ট সম্পন্ন হলে নোটিফিকেশন পান</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>নতুন মেসেজ</Label>
                  <p className="text-sm text-muted-foreground">কাস্টমার মেসেজ পাঠালে নোটিফিকেশন পান</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>ডেলিভারি আপডেট</Label>
                  <p className="text-sm text-muted-foreground">ডেলিভারি স্ট্যাটাস পরিবর্তন হলে নোটিফিকেশন পান</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>স্টক সতর্কতা</Label>
                  <p className="text-sm text-muted-foreground">পণ্য স্টক কম হলে নোটিফিকেশন পান</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>সংরক্ষণ করুন</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language Settings */}
        <TabsContent value="language">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                ভাষা এবং অঞ্চল
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>ভাষা</Label>
                <Select defaultValue="bn">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bn">বাংলা</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>টাইম জোন</Label>
                <Select defaultValue="dhaka">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dhaka">ঢাকা (GMT+6)</SelectItem>
                    <SelectItem value="kolkata">কলকাতা (GMT+5:30)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>মুদ্রা</Label>
                <Select defaultValue="bdt">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bdt">BDT (৳)</SelectItem>
                    <SelectItem value="usd">USD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>সংরক্ষণ করুন</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  পেমেন্ট মেথড
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>bKash মার্চেন্ট নাম্বার</Label>
                  <Input placeholder="০১৭১২৩৪৫৬৭৮" defaultValue="০১৭১২৩৪৫৬৭৮" />
                </div>
                <div className="space-y-2">
                  <Label>bKash API Key</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label>Nagad মার্চেন্ট নাম্বার</Label>
                  <Input placeholder="০১৮১২৩৪৫৬৭৮" defaultValue="০১৮১২৩৪৫৬৭৮" />
                </div>
                <div className="space-y-2">
                  <Label>Nagad API Key</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <Button>সংরক্ষণ করুন</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                নিরাপত্তা
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>বর্তমান পাসওয়ার্ড</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>নতুন পাসওয়ার্ড</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-0.5">
                  <Label>টু-ফ্যাক্টর অথেন্টিকেশন</Label>
                  <p className="text-sm text-muted-foreground">অতিরিক্ত নিরাপত্তার জন্য 2FA সক্রিয় করুন</p>
                </div>
                <Switch />
              </div>
              <Button>পাসওয়ার্ড পরিবর্তন করুন</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Settings */}
        <TabsContent value="integrations">
          <div className="space-y-6">
            {/* Social Media Integration - Now using our new component */}
            <SocialIntegration />

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>কুরিয়ার সার্ভিস ইন্টিগ্রেশন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <p className="font-medium">Pathao</p>
                    <p className="text-sm text-muted-foreground">সংযুক্ত</p>
                  </div>
                  <Button variant="outline">সেটিংস</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <p className="font-medium">Steadfast</p>
                    <p className="text-sm text-muted-foreground">সংযুক্ত</p>
                  </div>
                  <Button variant="outline">সেটিংস</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <p className="font-medium">Redx</p>
                    <p className="text-sm text-muted-foreground">সংযুক্ত নয়</p>
                  </div>
                  <Button>কানেক্ট করুন</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}