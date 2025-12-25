import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Instagram,
  Image as ImageIcon,
  Calendar,
  Sparkles,
  Hash,
  Copy,
  Send,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  TrendingUp,
  Wand2,
  Layout,
  Download,
  Plus,
  MessageSquare,
  Bot,
  Zap,
  Settings,
  ChevronRight,
  Upload,
  Package,
  Check,
  X,
  Eraser,
  Crop,
  Palette,
  Video,
  Star,
  Target,
  CalendarDays,
  Gift,
  Users,
  Trophy,
  Play,
  Music,
  Type,
  Layers,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import DiscountCodeSystem from "@/components/DiscountCodeSystem";

const mockPosts = [
  {
    id: 1,
    platform: "facebook",
    content: "নতুন কালেকশন এসেছে! 🎉 এখনই অর্ডার করুন",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    date: "২ ঘন্টা আগে",
    likes: 245,
    comments: 32,
    shares: 18,
    reach: 1250,
  },
  {
    id: 2,
    platform: "instagram",
    content: "স্পেশাল অফার! ৩০% ছাড় 🔥",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
    date: "৫ ঘন্টা আগে",
    likes: 189,
    comments: 24,
    shares: 12,
    reach: 980,
  },
  {
    id: 3,
    platform: "facebook",
    content: "কাস্টমার রিভিউ ⭐⭐⭐⭐⭐",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    date: "১ দিন আগে",
    likes: 312,
    comments: 45,
    shares: 28,
    reach: 1850,
  },
];

const templates = [
  { id: 1, name: "সেল ব্যানার", category: "sale", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80" },
  { id: 2, name: "নতুন পণ্য", category: "product", image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&q=80" },
  { id: 3, name: "অফার পোস্ট", category: "offer", image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&q=80" },
  { id: 4, name: "স্টোরি টেমপ্লেট", category: "story", image: "https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=400&q=80" },
];

const chatbotKeywords = [
  { keyword: "দাম", response: "আমাদের প্রোডাক্ট ৫০০-২০০০ টাকার মধ্যে। কোন প্রোডাক্ট দেখতে চান?", active: true },
  { keyword: "অর্ডার", response: "অর্ডার করতে চাইলে আপনার নাম, ঠিকানা এবং ফোন নম্বর দিন।", active: true },
  { keyword: "ডেলিভারি", response: "ঢাকায় ২-৩ দিন, ঢাকার বাইরে ৩-৫ দিন সময় লাগে।", active: true },
  { keyword: "পেমেন্ট", response: "আমরা bKash, Nagad এবং ক্যাশ অন ডেলিভারি গ্রহণ করি।", active: false },
];

const mockProducts = [
  { id: 1, name: "স্মার্টফোন কেস", name_en: "Smartphone Case", price: 350, stock: 45, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80", description: "উচ্চমানের সিলিকন দিয়ে তৈরি" },
  { id: 2, name: "হ্যান্ডব্যাগ", name_en: "Handbag", price: 1200, stock: 3, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80", description: "স্টাইলিশ লেদার হ্যান্ডব্যাগ" },
  { id: 3, name: "টি-শার্ট", name_en: "T-Shirt", price: 450, stock: 8, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", description: "১০০% কটন টি-শার্ট" },
];

const postTemplates = [
  { id: 1, name: "নতুন পণ্য লঞ্চ", template: "🎉 নতুন {product_name} এসেছে!\n\n✨ বিশেষ ফিচার:\n• {feature_1}\n• {feature_2}\n\n💰 মাত্র ৳{price}\n\n📦 এখনই অর্ডার করুন!\n\n#NewArrival #Shopping" },
  { id: 2, name: "সেল অফার", template: "🔥 স্পেশাল অফার! 🔥\n\n{product_name}\n\n❌ আগের দাম: ৳{old_price}\n✅ এখন মাত্র: ৳{price}\n\n⏰ সীমিত সময়ের জন্য!\n\n#Sale #Discount #Offer" },
  { id: 3, name: "স্টক লিমিটেড", template: "⚠️ মাত্র {stock}টি বাকি!\n\n{product_name}\n\n🏃‍♂️ দেরি করবেন না!\n💰 ৳{price}\n\n📞 এখনই অর্ডার করুন\n\n#LimitedStock #HurryUp" },
  { id: 4, name: "কাস্টমার রিভিউ", template: "⭐⭐⭐⭐⭐ কাস্টমার রিভিউ\n\n\"{review_text}\"\n\n- {customer_name}\n\n{product_name}\n৳{price}\n\n#CustomerReview #Testimonial" },
];

const hashtagSuggestions = {
  fashion: ["#Fashion", "#Style", "#Trending", "#OOTD", "#FashionBD"],
  accessories: ["#Accessories", "#Jewelry", "#Bags", "#Watches", "#AccessoriesBD"],
  beauty: ["#Beauty", "#Makeup", "#Skincare", "#Cosmetics", "#BeautyBD"],
  sale: ["#Sale", "#Discount", "#Offer", "#Shopping", "#OnlineShopping"],
};

const scheduledPosts = [
  { id: 1, date: "২৫ ডিসেম্বর, ২:০০ PM", content: "নতুন কালেকশন লঞ্চ", platform: "facebook", status: "scheduled" },
  { id: 2, date: "২৬ ডিসেম্বর, ৪:০০ PM", content: "স্পেশাল অফার", platform: "instagram", status: "scheduled" },
  { id: 3, date: "২৭ ডিসেম্বর, ১০:০০ AM", content: "কাস্টমার রিভিউ", platform: "facebook", status: "scheduled" },
];

const customerReviews = [
  { id: 1, customer: "রহিম আহমেদ", rating: 5, review: "অসাধারণ প্রোডাক্ট! খুবই ভালো কোয়ালিটি।", product: "স্মার্টফোন কেস", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahim" },
  { id: 2, customer: "সালমা খাতুন", rating: 5, review: "দাম অনুযায়ী পারফেক্ট। সবাইকে রেকমেন্ড করব।", product: "হ্যান্ডব্যাগ", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=salma" },
  { id: 3, customer: "করিম মিয়া", rating: 4, review: "ভালো প্রোডাক্ট। ডেলিভারি ও দ্রুত ছিল।", product: "টি-শার্ট", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=karim" },
];

export default function Marketing() {
  const [selectedPlatform, setSelectedPlatform] = useState<string[]>(["facebook"]);
  const [postContent, setPostContent] = useState("");
  const [aiCaptions, setAiCaptions] = useState<string[]>([]);
  const [showAiCaptions, setShowAiCaptions] = useState(false);
  const [selectedTone, setSelectedTone] = useState("casual");
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [showHashtagDialog, setShowHashtagDialog] = useState(false);
  const [showImageEnhancer, setShowImageEnhancer] = useState(false);
  const [bestTimeToPost, setBestTimeToPost] = useState("২:০০ PM - ৪:০০ PM");
  const [showBulkScheduler, setShowBulkScheduler] = useState(false);
  const [showVideoMaker, setShowVideoMaker] = useState(false);
  const [showReviewPoster, setShowReviewPoster] = useState(false);
  const [showABTest, setShowABTest] = useState(false);
  const [showContest, setShowContest] = useState(false);
  const [selectedReview, setSelectedReview] = useState<typeof customerReviews[0] | null>(null);

  const togglePlatform = (platform: string) => {
    if (selectedPlatform.includes(platform)) {
      setSelectedPlatform(selectedPlatform.filter(p => p !== platform));
    } else {
      setSelectedPlatform([...selectedPlatform, platform]);
    }
  };

  const selectProduct = (product: typeof mockProducts[0]) => {
    setSelectedProduct(product);
    setShowProductSelector(false);
    
    // Auto-fill caption with product info
    const caption = `🎉 ${product.name}\n\n${product.description}\n\n💰 মাত্র ৳${product.price}\n📦 স্টক: ${product.stock}টি\n\nএখনই অর্ডার করুন! 🛍️`;
    setPostContent(caption);
  };

  const applyTemplate = (template: typeof postTemplates[0]) => {
    if (!selectedProduct) return;
    
    let filledTemplate = template.template
      .replace("{product_name}", selectedProduct.name)
      .replace("{price}", selectedProduct.price.toString())
      .replace("{stock}", selectedProduct.stock.toString())
      .replace("{old_price}", (selectedProduct.price * 1.3).toFixed(0));
    
    setPostContent(filledTemplate);
  };

  const generateAiCaptions = () => {
    const productInfo = selectedProduct ? `${selectedProduct.name} - ৳${selectedProduct.price}` : "পণ্য";
    const captions = [
      `🎉 নতুন কালেকশন এসেছে! ${productInfo}\n\nএখনই অর্ডার করুন এবং পান বিশেষ ছাড়! 🛍️\n\n#NewCollection #Shopping #Fashion`,
      `✨ স্পেশাল অফার চলছে! ${productInfo}\n\nমিস করবেন না 🔥\n\nএখনই অর্ডার করুন: [লিঙ্ক]\n\n#Sale #Offer #OnlineShopping`,
      `🌟 ${productInfo}\n\nআপনার পছন্দের পণ্য এখন আরও সাশ্রয়ী মূল্যে!\n\nদেরি না করে অর্ডার করুন 📦\n\n#BestPrice #QualityProducts`
    ];
    setAiCaptions(captions);
    setShowAiCaptions(true);
  };

  const addHashtags = (category: string) => {
    const tags = hashtagSuggestions[category as keyof typeof hashtagSuggestions] || [];
    setPostContent(postContent + "\n\n" + tags.join(" "));
    setShowHashtagDialog(false);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">মার্কেটিং ও অটোমেশন</h1>
        <p className="text-muted-foreground mt-2">সোশ্যাল মিডিয়া পোস্ট, AI টুলস এবং চ্যাটবট ম্যানেজমেন্ট</p>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">ক্যাম্পেইন</TabsTrigger>
          <TabsTrigger value="discounts">ডিসকাউন্ট কোড</TabsTrigger>
          <TabsTrigger value="analytics">অ্যানালিটিক্স</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Create Post */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  নতুন পোস্ট তৈরি করুন
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Platform Selection */}
                <div className="space-y-2">
                  <Label>প্ল্যাটফর্ম নির্বাচন করুন</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedPlatform.includes("facebook") ? "default" : "outline"}
                      className="flex-1 gap-2"
                      onClick={() => {
                        if (selectedPlatform.includes("facebook")) {
                          setSelectedPlatform(selectedPlatform.filter(p => p !== "facebook"));
                        } else {
                          setSelectedPlatform([...selectedPlatform, "facebook"]);
                        }
                      }}
                    >
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </Button>
                    <Button
                      variant={selectedPlatform.includes("instagram") ? "default" : "outline"}
                      className="flex-1 gap-2"
                      onClick={() => {
                        if (selectedPlatform.includes("instagram")) {
                          setSelectedPlatform(selectedPlatform.filter(p => p !== "instagram"));
                        } else {
                          setSelectedPlatform([...selectedPlatform, "instagram"]);
                        }
                      }}
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Button>
                  </div>
                </div>

                {/* SMART PRODUCT SELECTOR */}
                <div className="space-y-2">
                  <Label>প্রোডাক্ট সিলেক্ট করুন (ঐচ্ছিক)</Label>
                  <Dialog open={showProductSelector} onOpenChange={setShowProductSelector}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Package className="h-4 w-4" />
                        {selectedProduct ? selectedProduct.name : "প্রোডাক্ট সিলেক্ট করুন"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>প্রোডাক্ট সিলেক্ট করুন</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="grid gap-3">
                          {mockProducts.map((product) => (
                            <Card 
                              key={product.id} 
                              className="cursor-pointer hover:border-primary transition-colors"
                              onClick={() => selectProduct(product)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center gap-4">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-20 w-20 rounded-lg object-cover"
                                  />
                                  <div className="flex-1">
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <p className="text-sm text-muted-foreground">{product.description}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                      <Badge variant="secondary">৳{product.price}</Badge>
                                      <Badge variant="outline">স্টক: {product.stock}</Badge>
                                    </div>
                                  </div>
                                  <Check className="h-5 w-5 text-primary" />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  
                  {selectedProduct && (
                    <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50">
                      <img src={selectedProduct.image} alt="" className="h-12 w-12 rounded object-cover" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{selectedProduct.name}</p>
                        <p className="text-xs text-muted-foreground">৳{selectedProduct.price}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedProduct(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* POST TEMPLATES */}
                {selectedProduct && (
                  <div className="space-y-2">
                    <Label>টেমপ্লেট ব্যবহার করুন</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {postTemplates.map((template) => (
                        <Button
                          key={template.id}
                          variant="outline"
                          size="sm"
                          onClick={() => applyTemplate(template)}
                          className="justify-start"
                        >
                          <Layout className="h-3 w-3 mr-2" />
                          {template.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Upload with Enhancement */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>ছবি/ভিডিও আপলোড</Label>
                    {selectedProduct && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => setShowImageEnhancer(true)}
                      >
                        <Sparkles className="h-3 w-3" />
                        AI এনহান্স
                      </Button>
                    )}
                  </div>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer bg-muted/30">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">ক্লিক করুন বা ড্র্যাগ করুন</p>
                  </div>
                </div>

                {/* AI Image Enhancement Dialog */}
                <Dialog open={showImageEnhancer} onOpenChange={setShowImageEnhancer}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>AI ইমেজ এনহান্সমেন্ট</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="gap-2">
                          <Eraser className="h-4 w-4" />
                          ব্যাকগ্রাউন্ড রিমুভ
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Sparkles className="h-4 w-4" />
                          কোয়ালিটি বাড়ান
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Crop className="h-4 w-4" />
                          অটো ক্রপ
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Palette className="h-4 w-4" />
                          ফিল্টার যোগ করুন
                        </Button>
                      </div>
                      <Button className="w-full">প্রয়োগ করুন</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Caption with AI */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>ক্যাপশন লিখুন</Label>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={generateAiCaptions}
                      >
                        <Sparkles className="h-4 w-4" />
                        AI ক্যাপশন
                      </Button>
                      <Dialog open={showHashtagDialog} onOpenChange={setShowHashtagDialog}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Hash className="h-4 w-4" />
                            হ্যাশট্যাগ
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>হ্যাশট্যাগ সাজেশন</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3">
                            {Object.entries(hashtagSuggestions).map(([category, tags]) => (
                              <div key={category} className="space-y-2">
                                <Label className="capitalize">{category}</Label>
                                <div className="flex flex-wrap gap-2">
                                  {tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="cursor-pointer">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addHashtags(category)}
                                >
                                  এই ক্যাটাগরির হ্যাশট্যাগ যোগ করুন
                                </Button>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <Textarea
                    placeholder="আপনার পোস্টের ক্যাপশন লিখুন..."
                    rows={6}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{postContent.length} অক্ষর</span>
                  </div>
                </div>

                {/* AI Generated Captions */}
                {showAiCaptions && (
                  <div className="space-y-2">
                    <Label>AI জেনারেটেড ক্যাপশন</Label>
                    <ScrollArea className="h-48 rounded-lg border p-3">
                      <div className="space-y-3">
                        {aiCaptions.map((caption, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-muted hover:bg-accent transition-colors">
                            <p className="text-sm mb-2">{caption}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-2"
                              onClick={() => setPostContent(caption)}
                            >
                              <Copy className="h-3 w-3" />
                              ব্যবহার করুন
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                {/* Best Time to Post */}
                <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">বেস্ট টাইম টু পোস্ট</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    আপনার ফলোয়াররা সবচেয়ে বেশি অ্যাক্টিভ: <strong>{bestTimeToPost}</strong>
                  </p>
                </div>

                {/* Schedule */}
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">শিডিউল করুন</span>
                  </div>
                  <Switch />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button className="flex-1 gap-2">
                    <Send className="h-4 w-4" />
                    এখনই পোস্ট করুন
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Post History */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>পোস্ট হিস্টরি</CardTitle>
                  <Badge variant="secondary">{mockPosts.length} পোস্ট</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {mockPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden">
                        <div className="flex items-start gap-3 p-4">
                          <img
                            src={post.image}
                            alt="Post"
                            className="h-20 w-20 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              {post.platform === "facebook" ? (
                                <Facebook className="h-4 w-4 text-blue-600" />
                              ) : (
                                <Instagram className="h-4 w-4 text-pink-600" />
                              )}
                              <span className="text-xs text-muted-foreground">{post.date}</span>
                            </div>
                            <p className="text-sm mb-3 line-clamp-2">{post.content}</p>
                            <div className="grid grid-cols-4 gap-2 text-xs">
                              <div className="flex items-center gap-1">
                                <Heart className="h-3 w-3 text-red-500" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3 text-blue-500" />
                                <span>{post.comments}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Share2 className="h-3 w-3 text-green-500" />
                                <span>{post.shares}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3 text-purple-500" />
                                <span>{post.reach}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Post */}
          <Card className="border-green-200 dark:border-green-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <TrendingUp className="h-5 w-5" />
                সবচেয়ে সফল পোস্ট
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={mockPosts[2].image}
                  alt="Top Post"
                  className="h-32 w-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium mb-2">{mockPosts[2].content}</p>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-red-600">{mockPosts[2].likes}</p>
                      <p className="text-xs text-muted-foreground">লাইক</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{mockPosts[2].comments}</p>
                      <p className="text-xs text-muted-foreground">কমেন্ট</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{mockPosts[2].shares}</p>
                      <p className="text-xs text-muted-foreground">শেয়ার</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">{mockPosts[2].reach}</p>
                      <p className="text-xs text-muted-foreground">রিচ</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discounts">
          <DiscountCodeSystem />
        </TabsContent>

        <TabsContent value="analytics">
          {/* ... keep existing analytics content ... */}
        </TabsContent>
      </Tabs>
    </div>
  );
}