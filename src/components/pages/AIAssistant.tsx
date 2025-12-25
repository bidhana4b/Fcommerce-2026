import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Sparkles,
  Zap,
  MessageSquare,
  TrendingUp,
  Package,
  Users,
  DollarSign,
  Image as ImageIcon,
  FileText,
  BarChart3,
  Target,
  Lightbulb,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Wand2,
  Bot,
  Send,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Settings,
  Play,
  Pause,
  Calendar,
  ShoppingBag,
  Star,
  TrendingDown,
  Activity,
  Globe,
  Languages,
  Mic,
  Camera,
  Search,
} from "lucide-react";

export default function AIAssistant() {
  const [chatMessage, setChatMessage] = useState("");
  const [aiEnabled, setAiEnabled] = useState(true);
  const [autoMode, setAutoMode] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const aiFeatures = [
    {
      id: "smart-pricing",
      title: "স্মার্ট প্রাইসিং",
      description: "AI দিয়ে সঠিক দাম নির্ধারণ করুন",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      status: "active",
      accuracy: 94,
      savings: "১৫% বেশি লাভ",
    },
    {
      id: "demand-forecast",
      title: "ডিমান্ড ফোরকাস্ট",
      description: "ভবিষ্যতের চাহিদা পূর্বাভাস",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      status: "active",
      accuracy: 89,
      savings: "২০% কম স্টক আউট",
    },
    {
      id: "auto-reply",
      title: "অটো রিপ্লাই",
      description: "স্বয়ংক্রিয় কাস্টমার রিপ্লাই",
      icon: MessageSquare,
      color: "from-purple-500 to-pink-500",
      status: "active",
      accuracy: 92,
      savings: "৮০% দ্রুত রেসপন্স",
    },
    {
      id: "product-description",
      title: "প্রোডাক্ট ডেসক্রিপশন",
      description: "AI দিয়ে পণ্যের বিবরণ তৈরি",
      icon: FileText,
      color: "from-orange-500 to-red-500",
      status: "active",
      accuracy: 96,
      savings: "৯০% সময় বাঁচান",
    },
    {
      id: "image-enhance",
      title: "ইমেজ এনহান্সমেন্ট",
      description: "ছবির কোয়ালিটি উন্নত করুন",
      icon: ImageIcon,
      color: "from-pink-500 to-rose-500",
      status: "active",
      accuracy: 91,
      savings: "প্রফেশনাল লুক",
    },
    {
      id: "sales-insights",
      title: "সেলস ইনসাইট",
      description: "বিক্রয় বিশ্লেষণ ও পরামর্শ",
      icon: BarChart3,
      color: "from-indigo-500 to-purple-500",
      status: "active",
      accuracy: 88,
      savings: "২৫% বেশি বিক্রয়",
    },
    {
      id: "customer-segment",
      title: "কাস্টমার সেগমেন্টেশন",
      description: "স্মার্ট কাস্টমার গ্রুপিং",
      icon: Users,
      color: "from-teal-500 to-green-500",
      status: "active",
      accuracy: 93,
      savings: "৩০% বেশি কনভার্সন",
    },
    {
      id: "inventory-optimize",
      title: "ইনভেন্টরি অপটিমাইজ",
      description: "স্টক ম্যানেজমেন্ট সহজ করুন",
      icon: Package,
      color: "from-yellow-500 to-orange-500",
      status: "active",
      accuracy: 90,
      savings: "১৮% কম খরচ",
    },
    {
      id: "voice-to-text",
      title: "ভয়েস টু টেক্সট",
      description: "কথা বলে অর্ডার নিন",
      icon: Mic,
      color: "from-red-500 to-pink-500",
      status: "beta",
      accuracy: 87,
      savings: "৫০% দ্রুত",
    },
    {
      id: "visual-search",
      title: "ভিজুয়াল সার্চ",
      description: "ছবি দিয়ে পণ্য খুঁজুন",
      icon: Camera,
      color: "from-violet-500 to-purple-500",
      status: "beta",
      accuracy: 85,
      savings: "সহজ খোঁজা",
    },
    {
      id: "translation",
      title: "অটো ট্রান্সলেশন",
      description: "বহুভাষিক সাপোর্ট",
      icon: Languages,
      color: "from-cyan-500 to-blue-500",
      status: "active",
      accuracy: 95,
      savings: "গ্লোবাল রিচ",
    },
    {
      id: "fraud-detection",
      title: "ফ্রড ডিটেকশন",
      description: "জালিয়াতি শনাক্ত করুন",
      icon: AlertCircle,
      color: "from-red-500 to-orange-500",
      status: "active",
      accuracy: 97,
      savings: "১০০% নিরাপদ",
    },
  ];

  const aiInsights = [
    {
      type: "success",
      icon: TrendingUp,
      title: "বিক্রয় বৃদ্ধি",
      message: "গত সপ্তাহের তুলনায় ২৮% বেশি বিক্রয় হয়েছে",
      action: "বিস্তারিত দেখুন",
    },
    {
      type: "warning",
      icon: Package,
      title: "স্টক সতর্কতা",
      message: "৫টি পণ্যের স্টক কম। এখনই অর্ডার করুন",
      action: "পণ্য দেখুন",
    },
    {
      type: "info",
      icon: Users,
      title: "নতুন কাস্টমার",
      message: "১২ জন নতুন কাস্টমার যুক্ত হয়েছে আজ",
      action: "কাস্টমার দেখুন",
    },
    {
      type: "success",
      icon: DollarSign,
      title: "রেভিনিউ টার্গেট",
      message: "মাসিক টার্গেটের ৮৫% অর্জিত হয়েছে",
      action: "রিপোর্ট দেখুন",
    },
  ];

  const aiRecommendations = [
    {
      title: "প্রাইস অপটিমাইজেশন",
      description: "স্মার্টফোন কেসের দাম ৩৫০ টাকা থেকে ৩৮০ টাকা করলে ১২% বেশি লাভ হবে",
      impact: "high",
      category: "pricing",
    },
    {
      title: "স্টক রিঅর্ডার",
      description: "টি-শার্টের চাহিদা বাড়ছে। আগামী সপ্তাহে ৫০টি অর্ডার করুন",
      impact: "medium",
      category: "inventory",
    },
    {
      title: "মার্কেটিং ক্যাম্পেইন",
      description: "শুক্রবার বিকেল ৪টায় Facebook পোস্ট করলে ৩৫% বেশি রিচ পাবেন",
      impact: "high",
      category: "marketing",
    },
    {
      title: "কাস্টমার রিটেনশন",
      description: "৮ জন VIP কাস্টমার ৩০ দিন অর্ডার করেননি। তাদের বিশেষ অফার পাঠান",
      impact: "medium",
      category: "customer",
    },
  ];

  const chatHistory = [
    { role: "user", message: "আজকের বিক্রয় কেমন?" },
    { role: "ai", message: "আজ পর্যন্ত ১৫টি অর্ডার হয়েছে, মোট ৳১২,৫০০। গতকালের তুলনায় ২০% বেশি! 🎉" },
    { role: "user", message: "কোন পণ্য সবচেয়ে বেশি বিক্রি হচ্ছে?" },
    { role: "ai", message: "স্মার্টফোন কেস সবচেয়ে বেশি বিক্রি হচ্ছে (৮টি)। এর পরে টি-শার্ট (৪টি) এবং হ্যান্ডব্যাগ (৩টি)।" },
  ];

  const quickActions = [
    { label: "আজকের সেলস রিপোর্ট", icon: BarChart3 },
    { label: "স্টক আপডেট", icon: Package },
    { label: "নতুন পণ্য যোগ করুন", icon: Sparkles },
    { label: "কাস্টমার মেসেজ", icon: MessageSquare },
    { label: "প্রাইস অপটিমাইজ", icon: DollarSign },
    { label: "মার্কেটিং আইডিয়া", icon: Lightbulb },
  ];

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            AI অ্যাসিস্ট্যান্ট
          </h1>
          <p className="text-muted-foreground mt-2">আপনার ব্যবসায়ের স্মার্ট সহায়ক</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} id="ai-enabled" />
            <Label htmlFor="ai-enabled" className="flex items-center gap-2 cursor-pointer">
              <Zap className="h-4 w-4" />
              AI সক্রিয়
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={autoMode} onCheckedChange={setAutoMode} id="auto-mode" />
            <Label htmlFor="auto-mode" className="flex items-center gap-2 cursor-pointer">
              <Bot className="h-4 w-4" />
              অটো মোড
            </Label>
          </div>
        </div>
      </div>

      {/* AI Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI অ্যাকুরেসি</p>
                <p className="text-2xl font-bold mt-1">৯২%</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">সময় সাশ্রয়</p>
                <p className="text-2xl font-bold mt-1">৮৫%</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">অটো টাস্ক</p>
                <p className="text-2xl font-bold mt-1">১,২৪৫</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">লাভ বৃদ্ধি</p>
                <p className="text-2xl font-bold mt-1">+২৮%</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">AI ফিচার</TabsTrigger>
          <TabsTrigger value="chat">AI চ্যাট</TabsTrigger>
          <TabsTrigger value="insights">ইনসাইট</TabsTrigger>
          <TabsTrigger value="recommendations">সুপারিশ</TabsTrigger>
        </TabsList>

        {/* AI Features Tab */}
        <TabsContent value="features" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.id} className="hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant={feature.status === "active" ? "default" : "secondary"}>
                        {feature.status === "active" ? "সক্রিয়" : "বিটা"}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">অ্যাকুরেসি</span>
                        <span className="font-semibold">{feature.accuracy}%</span>
                      </div>
                      <Progress value={feature.accuracy} className="h-2" />
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        {feature.savings}
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      সেটিংস
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* AI Chat Tab */}
        <TabsContent value="chat" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI চ্যাট অ্যাসিস্ট্যান্ট
                </CardTitle>
                <CardDescription>যেকোনো প্রশ্ন করুন, AI সাহায্য করবে</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4 mb-4">
                  <div className="space-y-4">
                    {chatHistory.map((chat, idx) => (
                      <div key={idx} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] rounded-lg p-4 ${
                          chat.role === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}>
                          <p className="text-sm">{chat.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex gap-2">
                  <Input
                    placeholder="আপনার প্রশ্ন লিখুন..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                  />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">কুইক অ্যাকশন</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickActions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                      <Button key={idx} variant="outline" className="w-full justify-start gap-2">
                        <Icon className="h-4 w-4" />
                        {action.label}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {aiInsights.map((insight, idx) => {
              const Icon = insight.icon;
              const colorMap = {
                success: "from-green-500 to-emerald-500",
                warning: "from-yellow-500 to-orange-500",
                info: "from-blue-500 to-cyan-500",
              };
              return (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colorMap[insight.type as keyof typeof colorMap]} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{insight.message}</p>
                        <Button variant="outline" size="sm" className="gap-2">
                          {insight.action}
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>AI পারফরম্যান্স ট্রেন্ড</CardTitle>
              <CardDescription>গত ৭ দিনের AI অ্যাক্টিভিটি</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center">
                  <Activity className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">চার্ট ডেটা লোড হচ্ছে...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                AI সুপারিশ
              </CardTitle>
              <CardDescription>আপনার ব্যবসায়ের জন্য স্মার্ট পরামর্শ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiRecommendations.map((rec, idx) => {
                  const impactColors = {
                    high: "from-red-500 to-orange-500",
                    medium: "from-yellow-500 to-orange-500",
                    low: "from-blue-500 to-cyan-500",
                  };
                  return (
                    <Card key={idx} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{rec.title}</h3>
                              <Badge variant={rec.impact === "high" ? "destructive" : "secondary"}>
                                {rec.impact === "high" ? "উচ্চ প্রভাব" : "মাঝারি প্রভাব"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                            <div className="flex gap-2">
                              <Button size="sm" className="gap-2">
                                <CheckCircle2 className="h-3 w-3" />
                                প্রয়োগ করুন
                              </Button>
                              <Button size="sm" variant="outline">
                                বিস্তারিত
                              </Button>
                            </div>
                          </div>
                          <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${impactColors[rec.impact as keyof typeof impactColors]} flex items-center justify-center flex-shrink-0`}>
                            <Sparkles className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* AI Learning Progress */}
          <Card>
            <CardHeader>
              <CardTitle>AI লার্নিং প্রগ্রেস</CardTitle>
              <CardDescription>AI আপনার ব্যবসায় থেকে শিখছে</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "কাস্টমার প্যাটার্ন", progress: 87 },
                  { label: "প্রোডাক্ট ট্রেন্ড", progress: 92 },
                  { label: "প্রাইসিং স্ট্র্যাটেজি", progress: 78 },
                  { label: "মার্কেটিং অপটিমাইজেশন", progress: 85 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-muted-foreground">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
