import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Video,
  ShoppingBag,
  Share2,
  Tag,
  Link as LinkIcon,
  QrCode,
  Copy,
  Check,
  Play,
  Users,
  TrendingUp,
  Package,
  Send,
  Phone,
  Image as ImageIcon,
  Zap,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageSquare,
  ExternalLink,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Sparkles,
  Gift,
  Star
} from "lucide-react";

export default function SocialCommerce() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showWhatsAppTemplate, setShowWhatsAppTemplate] = useState(false);
  const [showPaymentLink, setShowPaymentLink] = useState(false);
  const [showLiveShop, setShowLiveShop] = useState(false);
  const [showInstagramShop, setShowInstagramShop] = useState(false);
  const [showFacebookShop, setShowFacebookShop] = useState(false);

  // Mock products for social commerce
  const products = [
    { id: 1, name: "স্মার্টফোন কেস", price: 350, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80", stock: 45 },
    { id: 2, name: "হ্যান্ডব্যাগ", price: 1200, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80", stock: 3 },
    { id: 3, name: "টি-শার্ট", price: 450, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", stock: 8 },
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const generateWhatsAppLink = (product: any) => {
    const message = `আমি ${product.name} কিনতে চাই।\n\nদাম: ৳${product.price}\n\nঅর্ডার কনফার্ম করুন।`;
    return `https://wa.me/8801712345678?text=${encodeURIComponent(message)}`;
  };

  const generatePaymentLink = (product: any) => {
    return `https://pay.example.com/product/${product.id}`;
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      <div>
        <h1 className="text-3xl font-bold">সোশ্যাল কমার্স ইন্টিগ্রেশন</h1>
        <p className="text-muted-foreground mt-2">Instagram, Facebook, WhatsApp এর মাধ্যমে সরাসরি বিক্রয়</p>
      </div>

      <Tabs defaultValue="instagram" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="instagram" className="gap-2">
            <Instagram className="h-4 w-4" />
            Instagram
          </TabsTrigger>
          <TabsTrigger value="facebook" className="gap-2">
            <Facebook className="h-4 w-4" />
            Facebook
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="live" className="gap-2">
            <Video className="h-4 w-4" />
            Live Shopping
          </TabsTrigger>
        </TabsList>

        {/* Instagram Shopping Tab */}
        <TabsContent value="instagram" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Instagram Shop Setup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Instagram className="h-5 w-5 text-pink-600" />
                  Instagram Shopping সেটআপ
                </CardTitle>
                <CardDescription>
                  Instagram-এ সরাসরি পণ্য বিক্রয় করুন
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center">
                        <Instagram className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="font-medium">Instagram অ্যাকাউন্ট</p>
                        <p className="text-sm text-muted-foreground">@rahimtraders</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">কানেক্টেড</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">প্রোডাক্ট ক্যাটালগ সিঙ্ক</p>
                      <p className="text-sm text-muted-foreground">{products.length} পণ্য সিঙ্ক করা হয়েছে</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                      সিঙ্ক করুন
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Shoppable Posts</p>
                      <p className="text-sm text-muted-foreground">পোস্টে প্রোডাক্ট ট্যাগ করুন</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Instagram Stories</p>
                      <p className="text-sm text-muted-foreground">স্টোরিতে প্রোডাক্ট লিঙ্ক</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <Button className="w-full gap-2" onClick={() => setShowInstagramShop(true)}>
                  <ShoppingBag className="h-4 w-4" />
                  Instagram Shop ম্যানেজ করুন
                </Button>
              </CardContent>
            </Card>

            {/* Instagram Product Tagging */}
            <Card>
              <CardHeader>
                <CardTitle>প্রোডাক্ট ট্যাগিং</CardTitle>
                <CardDescription>পোস্ট ও স্টোরিতে প্রোডাক্ট ট্যাগ করুন</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {products.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <div className="flex items-center gap-3 p-3">
                          <img src={product.image} alt={product.name} className="h-16 w-16 rounded object-cover" />
                          <div className="flex-1">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">৳{product.price}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button size="sm" variant="outline" className="gap-2">
                              <Tag className="h-3 w-3" />
                              পোস্টে ট্যাগ
                            </Button>
                            <Button size="sm" variant="outline" className="gap-2">
                              <ImageIcon className="h-3 w-3" />
                              স্টোরিতে শেয়ার
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Instagram Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Instagram Shopping Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-blue-600" />
                    <p className="text-sm text-muted-foreground">প্রোডাক্ট ভিউ</p>
                  </div>
                  <p className="text-2xl font-bold">2,450</p>
                  <p className="text-xs text-green-600">+12% এই সপ্তাহে</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingBag className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-muted-foreground">ক্লিক</p>
                  </div>
                  <p className="text-2xl font-bold">456</p>
                  <p className="text-xs text-green-600">+8% এই সপ্তাহে</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-red-600" />
                    <p className="text-sm text-muted-foreground">সেভ</p>
                  </div>
                  <p className="text-2xl font-bold">189</p>
                  <p className="text-xs text-green-600">+15% এই সপ্তাহে</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-purple-600" />
                    <p className="text-sm text-muted-foreground">মেসেজ</p>
                  </div>
                  <p className="text-2xl font-bold">67</p>
                  <p className="text-xs text-green-600">+20% এই সপ্তাহে</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Facebook Shop Tab */}
        <TabsContent value="facebook" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Facebook className="h-5 w-5 text-blue-600" />
                  Facebook Shop সেটআপ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                        <Facebook className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Facebook পেজ</p>
                        <p className="text-sm text-muted-foreground">Rahim Traders</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">কানেক্টেড</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Facebook Shop</p>
                      <p className="text-sm text-muted-foreground">অটো-সিঙ্ক সক্রিয়</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Messenger অর্ডার</p>
                      <p className="text-sm text-muted-foreground">মেসেঞ্জারে অর্ডার নিন</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Facebook Pixel</p>
                      <p className="text-sm text-muted-foreground">ট্র্যাকিং সক্রিয়</p>
                    </div>
                    <Badge variant="secondary">সক্রিয়</Badge>
                  </div>
                </div>

                <Separator />

                <Button className="w-full gap-2" onClick={() => setShowFacebookShop(true)}>
                  <ShoppingBag className="h-4 w-4" />
                  Facebook Shop ম্যানেজ করুন
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Facebook Marketplace</CardTitle>
                <CardDescription>Marketplace-এ পণ্য লিস্ট করুন</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {products.map((product) => (
                      <Card key={product.id}>
                        <div className="flex items-center gap-3 p-3">
                          <img src={product.image} alt={product.name} className="h-16 w-16 rounded object-cover" />
                          <div className="flex-1">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">৳{product.price}</p>
                            <Badge variant="outline" className="mt-1">Marketplace-এ লিস্টেড</Badge>
                          </div>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* WhatsApp Commerce Tab */}
        <TabsContent value="whatsapp" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  WhatsApp Commerce
                </CardTitle>
                <CardDescription>WhatsApp-এ সরাসরি বিক্রয় করুন</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    <p className="font-medium">WhatsApp Business API</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    নম্বর: +880 1712-345678
                  </p>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">সক্রিয়</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">প্রোডাক্ট ক্যাটালগ</p>
                      <p className="text-sm text-muted-foreground">WhatsApp-এ শেয়ার করুন</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">অটো-রিপ্লাই</p>
                      <p className="text-sm text-muted-foreground">স্বয়ংক্রিয় উত্তর</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">অর্ডার স্ট্যাটাস আপডেট</p>
                      <p className="text-sm text-muted-foreground">WhatsApp নোটিফিকেশন</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <Button className="w-full gap-2" onClick={() => setShowWhatsAppTemplate(true)}>
                  <MessageCircle className="h-4 w-4" />
                  মেসেজ টেমপ্লেট দেখুন
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>প্রোডাক্ট শেয়ার লিঙ্ক</CardTitle>
                <CardDescription>WhatsApp-এ সরাসরি শেয়ার করুন</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {products.map((product) => (
                      <Card key={product.id}>
                        <div className="p-3 space-y-3">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="h-16 w-16 rounded object-cover" />
                            <div className="flex-1">
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">৳{product.price}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1 gap-2"
                              onClick={() => {
                                const link = generateWhatsAppLink(product);
                                copyToClipboard(link, `wa-${product.id}`);
                              }}
                            >
                              {copiedLink === `wa-${product.id}` ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                              লিঙ্ক কপি
                            </Button>
                            <Button 
                              size="sm" 
                              className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                              onClick={() => window.open(generateWhatsAppLink(product), '_blank')}
                            >
                              <Send className="h-3 w-3" />
                              শেয়ার করুন
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Payment Link Generator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                পেমেন্ট লিঙ্ক ও QR কোড
              </CardTitle>
              <CardDescription>bKash, Nagad, Rocket পেমেন্ট লিঙ্ক তৈরি করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4 space-y-3">
                      <img src={product.image} alt={product.name} className="w-full aspect-square rounded object-cover" />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-lg font-bold text-primary">৳{product.price}</p>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full gap-2"
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowPaymentLink(true);
                        }}
                      >
                        <QrCode className="h-4 w-4" />
                        পেমেন্ট লিঙ্ক তৈরি
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Shopping Tab */}
        <TabsContent value="live" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-red-600" />
                Live Shopping Feature
              </CardTitle>
              <CardDescription>Facebook/Instagram Live-এ সরাসরি বিক্রয় করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Video className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-lg font-medium mb-2">লাইভ শুরু করুন</p>
                      <p className="text-sm text-muted-foreground mb-4">Facebook বা Instagram-এ লাইভ যান</p>
                      <div className="flex gap-2 justify-center">
                        <Button className="gap-2">
                          <Facebook className="h-4 w-4" />
                          Facebook Live
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Instagram className="h-4 w-4" />
                          Instagram Live
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">প্রোডাক্ট পিন করুন</p>
                        <p className="text-sm text-muted-foreground">লাইভে প্রোডাক্ট দেখান</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">রিয়েল-টাইম অর্ডার</p>
                        <p className="text-sm text-muted-foreground">লাইভে অর্ডার নিন</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">লাইভ চ্যাট</p>
                        <p className="text-sm text-muted-foreground">দর্শকদের সাথে কথা বলুন</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">লাইভে দেখানোর জন্য প্রোডাক্ট</Label>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-3">
                      {products.map((product) => (
                        <Card key={product.id}>
                          <div className="flex items-center gap-3 p-3">
                            <img src={product.image} alt={product.name} className="h-16 w-16 rounded object-cover" />
                            <div className="flex-1">
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">৳{product.price}</p>
                            </div>
                            <Button size="sm" variant="outline" className="gap-2">
                              <Tag className="h-3 w-3" />
                              পিন করুন
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>

              <Separator />

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <Users className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">বর্তমান দর্শক</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <ShoppingBag className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">লাইভ অর্ডার</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <MessageSquare className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">চ্যাট মেসেজ</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Past Live Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>পূর্ববর্তী লাইভ সেশন</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Card>
                  <div className="flex items-center gap-4 p-4">
                    <div className="h-20 w-32 bg-muted rounded flex items-center justify-center">
                      <Play className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">নতুন কালেকশন লঞ্চ</p>
                      <p className="text-sm text-muted-foreground">২৩ ডিসেম্বর, ২০২৪</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> 1,234 ভিউ
                        </span>
                        <span className="flex items-center gap-1">
                          <ShoppingBag className="h-3 w-3" /> 45 অর্ডার
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      রিপ্লে দেখুন
                    </Button>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* WhatsApp Template Dialog */}
      <Dialog open={showWhatsAppTemplate} onOpenChange={setShowWhatsAppTemplate}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>WhatsApp মেসেজ টেমপ্লেট</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">প্রোডাক্ট ইনকোয়ারি টেমপ্লেট</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <p className="text-sm whitespace-pre-line">
                    আসসালামু আলাইকুম! 👋\n\nআমি [প্রোডাক্ট নাম] সম্পর্কে জানতে চাই।\n\nদাম: ৳[মূল্য]\nস্টক: [স্টক সংখ্যা]\n\nঅর্ডার কনফার্ম করতে আপনার নাম, ঠিকানা এবং ফোন নম্বর দিন।\n\nধন্যবাদ! 🛍️
                  </p>
                </div>
                <Button size="sm" variant="outline" className="w-full gap-2">
                  <Copy className="h-3 w-3" />
                  টেমপ্লেট কপি করুন
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">অর্ডার কনফার্মেশন টেমপ্লেট</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <p className="text-sm whitespace-pre-line">
                    ধন্যবাদ! ✅\n\nআপনার অর্ডার কনফার্ম হয়েছে।\n\nঅর্ডার নম্বর: #[অর্ডার আইডি]\nপ্রোডাক্ট: [প্রোডাক্ট নাম]\nমোট: ৳[মূল্য]\n\nডেলিভারি: ২-৩ দিন\n\nট্র্যাক করুন: [লিঙ্ক]
                  </p>
                </div>
                <Button size="sm" variant="outline" className="w-full gap-2">
                  <Copy className="h-3 w-3" />
                  টেমপ্লেট কপি করুন
                </Button>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Link Dialog */}
      <Dialog open={showPaymentLink} onOpenChange={setShowPaymentLink}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>পেমেন্ট লিঙ্ক ও QR কোড</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="h-16 w-16 rounded object-cover" />
                <div>
                  <p className="font-medium">{selectedProduct.name}</p>
                  <p className="text-lg font-bold text-primary">৳{selectedProduct.price}</p>
                </div>
              </div>

              <Tabs defaultValue="bkash">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="bkash">bKash</TabsTrigger>
                  <TabsTrigger value="nagad">Nagad</TabsTrigger>
                  <TabsTrigger value="rocket">Rocket</TabsTrigger>
                </TabsList>

                <TabsContent value="bkash" className="space-y-4">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <QrCode className="h-32 w-32 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label>পেমেন্ট লিঙ্ক</Label>
                    <div className="flex gap-2">
                      <Input value={generatePaymentLink(selectedProduct)} readOnly />
                      <Button variant="outline" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    QR কোড ডাউনলোড করুন
                  </Button>
                </TabsContent>

                <TabsContent value="nagad" className="space-y-4">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <QrCode className="h-32 w-32 text-muted-foreground" />
                  </div>
                  <Button className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    QR কোড ডাউনলোড করুন
                  </Button>
                </TabsContent>

                <TabsContent value="rocket" className="space-y-4">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <QrCode className="h-32 w-32 text-muted-foreground" />
                  </div>
                  <Button className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    QR কোড ডাউনলোড করুন
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}