import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Settings,
  Search,
  Phone,
  Package,
  CreditCard,
  FileText,
  Paperclip,
  Smile,
  MoreVertical,
  Archive,
  Star,
  Clock,
  ShoppingBag,
  DollarSign,
  StickyNote,
  Plus,
  Copy,
  Check,
  Image as ImageIcon,
  Link,
  Mic,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Languages,
  TrendingUp,
  Brain,
} from "lucide-react";

// Intent types for message categorization
type MessageIntent = "order_inquiry" | "complaint" | "product_question" | "payment" | "delivery" | "general";
type SentimentType = "positive" | "neutral" | "negative" | "urgent";

const mockChats = [
  { 
    id: 1, 
    customer: "রহিম খান", 
    phone: "০১৭১২৩৪৫৬৭৮",
    lastMessage: "পণ্যটি আছে?", 
    time: "এখনই", 
    unread: 3, 
    status: "online",
    totalOrders: 5,
    totalSpent: 4500,
    lastOrder: "স্মার্টফোন কেস - ৳৩৫০",
    intent: "product_question" as MessageIntent,
    sentiment: "neutral" as SentimentType,
  },
  { 
    id: 2, 
    customer: "সালমা বেগম", 
    phone: "০১৮১২৩৪৫৬৭৮",
    lastMessage: "আমার অর্ডার কোথায়? ৩ দিন হয়ে গেছে!", 
    time: "৫ মিনিট", 
    unread: 1, 
    status: "online",
    totalOrders: 2,
    totalSpent: 1800,
    lastOrder: "হ্যান্ডব্যাগ - ৳১২০০",
    intent: "complaint" as MessageIntent,
    sentiment: "negative" as SentimentType,
  },
  { 
    id: 3, 
    customer: "করিম উদ্দিন", 
    phone: "০১৯১২৩৪৫৬৭৮",
    lastMessage: "ধন্যবাদ", 
    time: "২ ঘন্টা", 
    unread: 0, 
    status: "offline",
    totalOrders: 8,
    totalSpent: 6200,
    lastOrder: "টি-শার্ট - ৳৪৫০",
    intent: "general" as MessageIntent,
    sentiment: "positive" as SentimentType,
  },
  { 
    id: 4, 
    customer: "ফাতেমা আক্তার", 
    phone: "০১৬১২৩৪৫৬৭৮",
    lastMessage: "পেমেন্ট কিভাবে করব?", 
    time: "১ দিন", 
    unread: 0, 
    status: "offline",
    totalOrders: 3,
    totalSpent: 2400,
    lastOrder: "সানগ্লাস - ৳৬৫০",
    intent: "payment" as MessageIntent,
    sentiment: "neutral" as SentimentType,
  },
];

const mockMessages = [
  { id: 1, sender: "customer", text: "পণ্যটি আছে?", time: "১০:৩০ AM", isAI: false, intent: "product_question", sentiment: "neutral" },
  { id: 2, sender: "bot", text: "হ্যাঁ, স্টকে আছে।", time: "১০:৩১ AM", isAI: true, intent: "product_question", sentiment: "neutral" },
  { id: 3, sender: "customer", text: "দাম কত?", time: "১০:৩২ AM", isAI: false, intent: "product_question", sentiment: "neutral" },
  { id: 4, sender: "seller", text: "৳৩৫০। ডেলিভারি চার্জ ঢাকায় ৬০ টাকা।", time: "১০:৩৩ AM", isAI: false, intent: "product_question", sentiment: "neutral" },
];

const mockProducts = [
  { id: 1, name: "স্মার্টফোন কেস", price: 350, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&q=80" },
  { id: 2, name: "হ্যান্ডব্যাগ", price: 1200, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&q=80" },
  { id: 3, name: "টি-শার্ট", price: 450, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80" },
];

const messageTemplates = [
  { id: 1, title: "ধন্যবাদ মেসেজ", content: "ধন্যবাদ আপনার অর্ডারের জন্য! 🙏 আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।" },
  { id: 2, title: "প্যাকিং মেসেজ", content: "আপনার অর্ডার প্যাক করা হচ্ছে 📦 শীঘ্রই ডেলিভারি দেওয়া হবে।" },
  { id: 3, title: "ডেলিভারি মেসেজ", content: "ডেলিভারি ম্যান আপনার ঠিকানায় যাচ্ছে 🚚 অনুগ্রহ করে ফোন রিসিভ করুন।" },
  { id: 4, title: "পেমেন্ট রিমাইন্ডার", content: "আপনার পেমেন্ট পেন্ডিং আছে। অনুগ্রহ করে পেমেন্ট সম্পন্ন করুন। 💰" },
  { id: 5, title: "স্টক আউট", content: "দুঃখিত, এই পণ্যটি বর্তমানে স্টকে নেই। 😔 নতুন স্টক আসলে জানাব।" },
];

// AI-powered response suggestions based on intent
const getAISuggestions = (intent: MessageIntent, sentiment: SentimentType) => {
  const suggestions: Record<MessageIntent, string[]> = {
    order_inquiry: [
      "আপনার অর্ডার #১২৩৪ প্রসেসিং এ আছে। ২-৩ দিনে ডেলিভারি হবে। 📦",
      "অর্ডার ট্র্যাকিং নম্বর: TRK১২৩৪৫। এখানে ট্র্যাক করুন: [লিংক]",
      "আপনার অর্ডার কুরিয়ারে দেওয়া হয়েছে। শীঘ্রই পৌঁছাবে। 🚚"
    ],
    complaint: [
      "আপনার সমস্যার জন্য আমরা দুঃখিত। 🙏 আমরা এখনই সমাধান করছি।",
      "আমরা বুঝতে পারছি আপনি হতাশ। আমাদের ম্যানেজার আপনার সাথে যোগাযোগ করবে।",
      "আপনার অভিযোগ গুরুত্বের সাথে নেওয়া হয়েছে। ২৪ ঘন্টায় সমাধান হবে। ✅"
    ],
    product_question: [
      "হ্যাঁ, এই পণ্যটি স্টকে আছে। দাম ৳৩৫০। অর্ডার করতে চান? 🛍️",
      "এই পণ্যের বিস্তারিত: [বর্ণনা]। আরও জানতে চান?",
      "আমাদের কাছে ৩টি রঙ আছে: লাল, নীল, সবুজ। কোনটি পছন্দ? 🎨"
    ],
    payment: [
      "পেমেন্ট করতে এই নম্বরে bKash করুন: ০১৭১২৩৪৫৬৭৮ 💰",
      "আমরা bKash, Nagad, Rocket সব গ্রহণ করি। কোনটি সুবিধাজনক?",
      "পেমেন্ট লিংক: [লিংক]। এখানে ক্লিক করে পেমেন্ট করুন। 🔗"
    ],
    delivery: [
      "ঢাকার ভিতরে ১-২ দিন, বাইরে ৩-৫ দিন লাগে। 🚚",
      "ডেলিভারি চার্জ: ঢাকা ৬০ টাকা, বাইরে ১২০ টাকা। 📦",
      "আপনার পণ্য কুরিয়ারে দেওয়া হয়েছে। ট্র্যাকিং: TRK১২৩৪৫"
    ],
    general: [
      "ধন্যবাদ! আর কিছু জানতে চান? 😊",
      "আমরা সবসময় আপনার সেবায় আছি। 🙏",
      "আপনার সন্তুষ্টি আমাদের লক্ষ্য। ❤️"
    ]
  };

  return suggestions[intent] || suggestions.general;
};

// Intent detection keywords
const detectIntent = (message: string): MessageIntent => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes("অর্ডার") && (lowerMsg.includes("কোথায়") || lowerMsg.includes("কবে") || lowerMsg.includes("ট্র্যাক"))) {
    return "order_inquiry";
  }
  if (lowerMsg.includes("সমস্যা") || lowerMsg.includes("খারাপ") || lowerMsg.includes("ভুল") || lowerMsg.includes("রাগ")) {
    return "complaint";
  }
  if (lowerMsg.includes("দাম") || lowerMsg.includes("পণ্য") || lowerMsg.includes("আছে") || lowerMsg.includes("স্টক")) {
    return "product_question";
  }
  if (lowerMsg.includes("পেমেন্ট") || lowerMsg.includes("টাকা") || lowerMsg.includes("bkash") || lowerMsg.includes("nagad")) {
    return "payment";
  }
  if (lowerMsg.includes("ডেলিভারি") || lowerMsg.includes("পৌঁছাবে") || lowerMsg.includes("কুরিয়ার")) {
    return "delivery";
  }
  
  return "general";
};

// Sentiment detection
const detectSentiment = (message: string): SentimentType => {
  const lowerMsg = message.toLowerCase();
  
  // Urgent/Negative indicators
  if (lowerMsg.includes("জরুরি") || lowerMsg.includes("দ্রুত") || lowerMsg.includes("এখনই")) {
    return "urgent";
  }
  if (lowerMsg.includes("রাগ") || lowerMsg.includes("খারাপ") || lowerMsg.includes("সমস্যা") || lowerMsg.includes("!")) {
    return "negative";
  }
  
  // Positive indicators
  if (lowerMsg.includes("ধন্যবাদ") || lowerMsg.includes("ভালো") || lowerMsg.includes("পছন্দ") || lowerMsg.includes("❤️")) {
    return "positive";
  }
  
  return "neutral";
};

const getIntentBadge = (intent: MessageIntent) => {
  const config = {
    order_inquiry: { label: "অর্ডার", color: "bg-blue-500" },
    complaint: { label: "অভিযোগ", color: "bg-red-500" },
    product_question: { label: "পণ্য", color: "bg-green-500" },
    payment: { label: "পেমেন্ট", color: "bg-yellow-500" },
    delivery: { label: "ডেলিভারি", color: "bg-purple-500" },
    general: { label: "সাধারণ", color: "bg-gray-500" },
  };
  
  return config[intent];
};

const getSentimentIcon = (sentiment: SentimentType) => {
  switch (sentiment) {
    case "positive": return <ThumbsUp className="h-3 w-3 text-green-500" />;
    case "negative": return <ThumbsDown className="h-3 w-3 text-red-500" />;
    case "urgent": return <AlertCircle className="h-3 w-3 text-orange-500" />;
    default: return null;
  }
};

export default function ChatAutomation() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [message, setMessage] = useState("");
  const [aiEnabled, setAiEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showCustomerInfo, setShowCustomerInfo] = useState(true);
  const [customerNote, setCustomerNote] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [detectedIntent, setDetectedIntent] = useState<MessageIntent>("general");
  const [detectedSentiment, setDetectedSentiment] = useState<SentimentType>("neutral");

  // Voice recording simulation
  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice-to-text after 2 seconds
      setTimeout(() => {
        setMessage("আমার বাচ্চার জন্য জামা দেখতে চাই");
        setIsRecording(false);
        handleMessageChange("আমার বাচ্চার জন্য জামা দেখতে চাই");
      }, 2000);
    }
  };

  // Handle message input and detect intent/sentiment
  const handleMessageChange = (text: string) => {
    setMessage(text);
    if (text.length > 3) {
      const intent = detectIntent(text);
      const sentiment = detectSentiment(text);
      setDetectedIntent(intent);
      setDetectedSentiment(sentiment);
      setShowAISuggestions(true);
    } else {
      setShowAISuggestions(false);
    }
  };

  const filteredChats = mockChats.filter(chat => {
    const matchesSearch = chat.customer.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "unread") return matchesSearch && chat.unread > 0;
    if (activeTab === "urgent") return matchesSearch && chat.sentiment === "urgent";
    if (activeTab === "complaints") return matchesSearch && chat.intent === "complaint";
    return matchesSearch;
  });

  const sendTemplate = (template: typeof messageTemplates[0]) => {
    setMessage(template.content);
    setShowTemplateDialog(false);
  };

  const aiSuggestions = getAISuggestions(detectedIntent, detectedSentiment);

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI-পাওয়ার্ড চ্যাট সিস্টেম</h1>
          <p className="text-muted-foreground mt-2">স্মার্ট ইনটেন্ট ডিটেকশন ও সেন্টিমেন্ট এনালাইসিস</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} id="ai-mode" />
            <Label htmlFor="ai-mode" className="flex items-center gap-2 cursor-pointer">
              <Bot className="h-4 w-4" />
              AI অটো-রিপ্লাই
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={autoTranslate} onCheckedChange={setAutoTranslate} id="translate" />
            <Label htmlFor="translate" className="flex items-center gap-2 cursor-pointer">
              <Languages className="h-4 w-4" />
              অটো-ট্রান্সলেট
            </Label>
          </div>
        </div>
      </div>

      {/* Enhanced Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">মোট চ্যাট</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockChats.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">অনলাইন</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockChats.filter(c => c.status === "online").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">জরুরি</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {mockChats.filter(c => c.sentiment === "urgent" || c.sentiment === "negative").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI রেসপন্স</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">৮৫%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Brain className="h-4 w-4" />
              AI অ্যাকুরেসি
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">৯২%</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Interface */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left: Chat List */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="কাস্টমার খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">সব</TabsTrigger>
                  <TabsTrigger value="unread">অপঠিত</TabsTrigger>
                  <TabsTrigger value="urgent">জরুরি</TabsTrigger>
                  <TabsTrigger value="complaints">অভিযোগ</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="space-y-1 p-2">
                {filteredChats.map((chat) => {
                  const intentBadge = getIntentBadge(chat.intent);
                  return (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChat.id === chat.id 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarFallback>{chat.customer.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                            chat.status === "online" ? "bg-green-500" : "bg-gray-400"
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium truncate">{chat.customer}</p>
                            <div className="flex items-center gap-1">
                              {getSentimentIcon(chat.sentiment)}
                              {chat.unread > 0 && (
                                <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                                  {chat.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className={`text-sm truncate ${
                            selectedChat.id === chat.id ? "opacity-90" : "text-muted-foreground"
                          }`}>
                            {chat.lastMessage}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`${intentBadge.color} text-white text-xs`}>
                              {intentBadge.label}
                            </Badge>
                            <p className={`text-xs ${
                              selectedChat.id === chat.id ? "opacity-75" : "text-muted-foreground"
                            }`}>
                              {chat.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Center: Chat Window */}
        <Card className={showCustomerInfo ? "lg:col-span-5" : "lg:col-span-8"}>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>{selectedChat.customer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                    selectedChat.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{selectedChat.customer}</CardTitle>
                    {getSentimentIcon(selectedChat.sentiment)}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {selectedChat.phone}
                    </p>
                    <Badge className={`${getIntentBadge(selectedChat.intent).color} text-white text-xs`}>
                      {getIntentBadge(selectedChat.intent).label}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowCustomerInfo(!showCustomerInfo)}
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[480px] p-4">
              <div className="space-y-4">
                {mockMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === "customer" ? "justify-start" : "justify-end"}`}
                  >
                    <div className={`flex gap-2 max-w-[80%] ${
                      msg.sender === "customer" ? "flex-row" : "flex-row-reverse"
                    }`}>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={
                          msg.sender === "customer" 
                            ? "bg-secondary" 
                            : msg.sender === "bot"
                            ? "bg-blue-500 text-white"
                            : "bg-primary text-primary-foreground"
                        }>
                          {msg.sender === "customer" ? (
                            <User className="h-4 w-4" />
                          ) : msg.sender === "bot" ? (
                            <Bot className="h-4 w-4" />
                          ) : (
                            "S"
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className={`rounded-lg p-3 ${
                          msg.sender === "customer" 
                            ? "bg-secondary text-secondary-foreground" 
                            : "bg-primary text-primary-foreground"
                        }`}>
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 px-1">
                          <p className="text-xs text-muted-foreground">{msg.time}</p>
                          {msg.isAI && <Badge variant="outline" className="text-xs">AI</Badge>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* AI Suggestions Panel */}
            {showAISuggestions && aiEnabled && (
              <div className="border-t border-b p-3 bg-blue-50 dark:bg-blue-950">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-semibold text-blue-600">AI সাজেশন</p>
                  <Badge className={`${getIntentBadge(detectedIntent).color} text-white text-xs`}>
                    {getIntentBadge(detectedIntent).label}
                  </Badge>
                </div>
                <ScrollArea className="max-h-32">
                  <div className="space-y-2">
                    {aiSuggestions.map((suggestion, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto py-2 px-3"
                        onClick={() => setMessage(suggestion)}
                      >
                        <span className="text-xs">{suggestion}</span>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Quick Actions */}
            <div className="border-t p-3 bg-muted/30">
              <div className="flex gap-2 mb-3 flex-wrap">
                <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Package className="h-4 w-4" />
                      প্রোডাক্ট
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>প্রোডাক্ট শেয়ার করুন</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-3">
                        {mockProducts.map((product) => (
                          <Card key={product.id} className="cursor-pointer hover:border-primary transition-colors">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <img src={product.image} alt="" className="h-16 w-16 rounded object-cover" />
                                <div className="flex-1">
                                  <p className="font-semibold">{product.name}</p>
                                  <p className="text-sm text-muted-foreground">৳{product.price}</p>
                                </div>
                                <Button size="sm">পাঠান</Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="sm" className="gap-2">
                  <FileText className="h-4 w-4" />
                  অর্ডার
                </Button>

                <Button variant="outline" size="sm" className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  পেমেন্ট
                </Button>

                <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileText className="h-4 w-4" />
                      টেমপ্লেট
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>টেমপ্লেট মেসেজ</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-3">
                        {messageTemplates.map((template) => (
                          <Card 
                            key={template.id} 
                            className="cursor-pointer hover:border-primary transition-colors"
                            onClick={() => sendTemplate(template)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <p className="font-semibold mb-2">{template.title}</p>
                                  <p className="text-sm text-muted-foreground">{template.content}</p>
                                </div>
                                <Copy className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Message Input with Voice */}
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Textarea
                  placeholder="মেসেজ লিখুন বা ভয়েস রেকর্ড করুন..."
                  value={message}
                  onChange={(e) => handleMessageChange(e.target.value)}
                  className="min-h-[60px] flex-1"
                />
                <Button 
                  variant={isRecording ? "destructive" : "ghost"} 
                  size="icon"
                  onClick={toggleVoiceRecording}
                  className={isRecording ? "animate-pulse" : ""}
                >
                  <Mic className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button size="icon" className="h-[60px] w-[60px]">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              
              {isRecording && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                  <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                  রেকর্ডিং চলছে...
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right: Customer Info Sidebar */}
        {showCustomerInfo && (
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">কাস্টমার ইনফো</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-3">
                  <AvatarFallback className="text-2xl">{selectedChat.customer.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{selectedChat.customer}</h3>
                <p className="text-sm text-muted-foreground">{selectedChat.phone}</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">মোট অর্ডার</span>
                  </div>
                  <span className="font-bold">{selectedChat.totalOrders}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">মোট খরচ</span>
                  </div>
                  <span className="font-bold">৳{selectedChat.totalSpent}</span>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">শেষ অর্ডার</Label>
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-sm">{selectedChat.lastOrder}</p>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-xs text-muted-foreground mb-2 block flex items-center gap-2">
                  <StickyNote className="h-3 w-3" />
                  নোট যোগ করুন
                </Label>
                <Textarea
                  placeholder="এই কাস্টমার সম্পর্কে নোট লিখুন..."
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  rows={4}
                  className="text-sm"
                />
                <Button size="sm" className="w-full mt-2">সংরক্ষণ করুন</Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Star className="h-4 w-4" />
                  ফেভারিট যোগ করুন
                </Button>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Archive className="h-4 w-4" />
                  আর্কাইভ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}