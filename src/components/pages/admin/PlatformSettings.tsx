import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Bell,
  Shield,
  Mail,
  Globe,
  Database,
  Palette,
  Save,
  CheckCircle2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PlatformSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // General Settings
    platformName: "সোশ্যাল কমার্স",
    platformEmail: "admin@socialcommerce.com",
    supportEmail: "support@socialcommerce.com",
    platformUrl: "https://socialcommerce.com",
    language: "bn",
    timezone: "Asia/Dhaka",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    orderNotifications: true,
    paymentNotifications: true,
    systemAlerts: true,

    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",

    // Payment Settings
    defaultCurrency: "BDT",
    minOrderAmount: "100",
    maxOrderAmount: "100000",
    platformFee: "1.5",

    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "noreply@socialcommerce.com",
    smtpPassword: "••••••••",

    // Maintenance
    maintenanceMode: false,
    maintenanceMessage: "আমরা সিস্টেম আপগ্রেড করছি। শীঘ্রই ফিরে আসছি।",
  });

  const handleSave = () => {
    toast({
      title: "সেটিংস সংরক্ষিত হয়েছে",
      description: "আপনার পরিবর্তনগুলো সফলভাবে সংরক্ষণ করা হয়েছে",
    });
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="h-12 w-12 bg-gradient-to-br from-slate-500 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            প্ল্যাটফর্ম সেটিংস
          </h1>
          <p className="text-muted-foreground mt-2">
            প্ল্যাটফর্মের সকল কনফিগারেশন পরিচালনা করুন
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
        >
          <Save className="h-4 w-4" />
          সংরক্ষণ করুন
        </Button>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto">
            <TabsTrigger value="general" className="gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden md:inline">সাধারণ</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">নোটিফিকেশন</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">নিরাপত্তা</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden md:inline">পেমেন্ট</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden md:inline">ইমেইল</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden md:inline">চেহারা</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>সাধারণ সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>প্ল্যাটফর্ম নাম</Label>
                    <Input
                      value={settings.platformName}
                      onChange={(e) =>
                        setSettings({ ...settings, platformName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>প্ল্যাটফর্ম URL</Label>
                    <Input
                      value={settings.platformUrl}
                      onChange={(e) =>
                        setSettings({ ...settings, platformUrl: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>প্ল্যাটফর্ম ইমেইল</Label>
                    <Input
                      type="email"
                      value={settings.platformEmail}
                      onChange={(e) =>
                        setSettings({ ...settings, platformEmail: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>সাপোর্ট ইমেইল</Label>
                    <Input
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) =>
                        setSettings({ ...settings, supportEmail: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>ভাষা</Label>
                    <Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
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
                    <Label>টাইমজোন</Label>
                    <Select value={settings.timezone} onValueChange={(value) => setSettings({ ...settings, timezone: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Dhaka">Asia/Dhaka (GMT+6)</SelectItem>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>মেইনটেনেন্স মোড</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>মেইনটেনেন্স মোড সক্রিয় করুন</Label>
                    <p className="text-sm text-muted-foreground">
                      সাইট সাময়িকভাবে বন্ধ করুন
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, maintenanceMode: checked })
                    }
                  />
                </div>
                {settings.maintenanceMode && (
                  <div className="space-y-2">
                    <Label>মেইনটেনেন্স বার্তা</Label>
                    <Textarea
                      value={settings.maintenanceMessage}
                      onChange={(e) =>
                        setSettings({ ...settings, maintenanceMessage: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>নোটিফিকেশন সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "emailNotifications", label: "ইমেইল নোটিফিকেশন", desc: "ইমেইলের মাধ্যমে নোটিফিকেশন পান" },
                  { key: "smsNotifications", label: "SMS নোটিফিকেশন", desc: "SMS এর মাধ্যমে নোটিফিকেশন পান" },
                  { key: "pushNotifications", label: "পুশ নোটিফিকেশন", desc: "ব্রাউজার পুশ নোটিফিকেশন পান" },
                  { key: "orderNotifications", label: "অর্ডার নোটিফিকেশন", desc: "নতুন অর্ডারের জন্য নোটিফিকেশন" },
                  { key: "paymentNotifications", label: "পেমেন্ট নোটিফিকেশন", desc: "পেমেন্ট সংক্রান্ত নোটিফিকেশন" },
                  { key: "systemAlerts", label: "সিস্টেম অ্যালার্ট", desc: "সিস্টেম সমস্যার জন্য অ্যালার্ট" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label>{item.label}</Label>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={settings[item.key as keyof typeof settings] as boolean}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, [item.key]: checked })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>নিরাপত্তা সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label>টু-ফ্যাক্টর অথেন্টিকেশন</Label>
                    <p className="text-sm text-muted-foreground">
                      অতিরিক্ত নিরাপত্তা স্তর যুক্ত করুন
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, twoFactorAuth: checked })
                    }
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>সেশন টাইমআউট (মিনিট)</Label>
                    <Input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) =>
                        setSettings({ ...settings, sessionTimeout: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>পাসওয়ার্ড মেয়াদ (দিন)</Label>
                    <Input
                      type="number"
                      value={settings.passwordExpiry}
                      onChange={(e) =>
                        setSettings({ ...settings, passwordExpiry: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>সর্বোচ্চ লগইন চেষ্টা</Label>
                    <Input
                      type="number"
                      value={settings.loginAttempts}
                      onChange={(e) =>
                        setSettings({ ...settings, loginAttempts: e.target.value })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>পেমেন্ট সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>ডিফল্ট মুদ্রা</Label>
                    <Select value={settings.defaultCurrency} onValueChange={(value) => setSettings({ ...settings, defaultCurrency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BDT">BDT (৳)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>প্ল্যাটফর্ম ফি (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={settings.platformFee}
                      onChange={(e) =>
                        setSettings({ ...settings, platformFee: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>সর্বনিম্ন অর্ডার পরিমাণ (৳)</Label>
                    <Input
                      type="number"
                      value={settings.minOrderAmount}
                      onChange={(e) =>
                        setSettings({ ...settings, minOrderAmount: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>সর্বোচ্চ অর্ডার পরিমাণ (৳)</Label>
                    <Input
                      type="number"
                      value={settings.maxOrderAmount}
                      onChange={(e) =>
                        setSettings({ ...settings, maxOrderAmount: e.target.value })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>SMTP কনফিগারেশন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>SMTP হোস্ট</Label>
                    <Input
                      value={settings.smtpHost}
                      onChange={(e) =>
                        setSettings({ ...settings, smtpHost: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SMTP পোর্ট</Label>
                    <Input
                      value={settings.smtpPort}
                      onChange={(e) =>
                        setSettings({ ...settings, smtpPort: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>SMTP ইউজারনেম</Label>
                    <Input
                      value={settings.smtpUsername}
                      onChange={(e) =>
                        setSettings({ ...settings, smtpUsername: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SMTP পাসওয়ার্ড</Label>
                    <Input
                      type="password"
                      value={settings.smtpPassword}
                      onChange={(e) =>
                        setSettings({ ...settings, smtpPassword: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Mail className="h-4 w-4" />
                  টেস্ট ইমেইল পাঠান
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>চেহারা সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground text-center">
                    থিম কাস্টমাইজেশন শীঘ্রই আসছে...
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Save Button (Fixed at bottom on mobile) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:hidden z-50">
        <Button
          onClick={handleSave}
          className="w-full gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
        >
          <Save className="h-4 w-4" />
          সংরক্ষণ করুন
        </Button>
      </div>
    </div>
  );
}
