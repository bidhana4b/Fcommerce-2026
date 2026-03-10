import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
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
  Eye,
  EyeOff,
  RefreshCw,
  Facebook,
  Instagram,
  MessageCircle,
  QrCode,
  Timer,
  Bell,
  UserPlus,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Filter,
  Download,
  Upload,
  Camera,
  Video,
  Headphones,
  Mail,
  Globe,
  Shield,
  Activity,
  BarChart3,
  PieChart,
  Target,
  Heart,
  Gift,
  Percent,
  Calendar,
  MapPin,
  Truck,
} from "lucide-react";

// Types
type MessageType = "text" | "image" | "voice" | "multiple_images";
type ChannelType = "facebook" | "instagram" | "whatsapp" | "messenger";
type SentimentType = "positive" | "neutral" | "negative" | "urgent";
type IntentType = "order" | "inquiry" | "complaint" | "feedback" | "payment" | "general";
type ConversationStatus = "open" | "pending" | "resolved" | "escalated";

interface CustomerMessage {
  id: string;
  type: MessageType;
  content: string;
  images?: string[];
  voiceUrl?: string;
  timestamp: Date;
  isCustomer: boolean;
  isAI: boolean;
  seen: boolean;
  sentiment?: SentimentType;
  intent?: IntentType;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  channel: ChannelType;
  avatar?: string;
  status: "online" | "offline" | "typing";
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: Date;
  sentiment: SentimentType;
  intent: IntentType;
  totalOrders: number;
  totalSpent: number;
  tags: string[];
  notes: string;
  conversationStatus: ConversationStatus;
  slaTimer?: number; // minutes until SLA breach
  duplicatePhone?: boolean;
}

interface Order {
  id: string;
  customerId: string;
  products: { name: string; price: number; quantity: number; image: string }[];
  total: number;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered";
  paymentStatus: "pending" | "partial" | "paid";
  createdAt: Date;
}

interface Feedback {
  id: string;
  customerId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface Complaint {
  id: string;
  customerId: string;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: Date;
}

// Mock Data
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "রহিম খান",
    phone: "01712345678",
    channel: "facebook",
    status: "typing",
    unreadCount: 3,
    lastMessage: "এই প্রোডাক্টটা কি স্টকে আছে?",
    lastMessageTime: new Date(),
    sentiment: "neutral",
    intent: "inquiry",
    totalOrders: 5,
    totalSpent: 12500,
    tags: ["VIP", "Repeat Customer"],
    notes: "পছন্দের রঙ: লাল",
    conversationStatus: "open",
    slaTimer: 15,
  },
  {
    id: "2",
    name: "সালমা বেগম",
    phone: "01812345678",
    channel: "whatsapp",
    status: "online",
    unreadCount: 1,
    lastMessage: "আমার অর্ডার কবে পৌঁছাবে? ৫ দিন হয়ে গেছে! 😡",
    lastMessageTime: new Date(Date.now() - 300000),
    sentiment: "negative",
    intent: "complaint",
    totalOrders: 2,
    totalSpent: 3200,
    tags: ["Complaint"],
    notes: "",
    conversationStatus: "escalated",
    slaTimer: 5,
  },
  {
    id: "3",
    name: "করিম উদ্দিন",
    phone: "01912345678",
    channel: "instagram",
    status: "offline",
    unreadCount: 0,
    lastMessage: "ধন্যবাদ, অনেক সুন্দর প্রোডাক্ট! 💕",
    lastMessageTime: new Date(Date.now() - 7200000),
    sentiment: "positive",
    intent: "feedback",
    totalOrders: 8,
    totalSpent: 25600,
    tags: ["VIP", "Brand Ambassador"],
    notes: "ফলো-আপ করা হয়েছে",
    conversationStatus: "resolved",
  },
  {
    id: "4",
    name: "ফাতেমা আক্তার",
    phone: "01612345678",
    channel: "messenger",
    status: "online",
    unreadCount: 2,
    lastMessage: "bKash করলাম, চেক করুন প্লিজ",
    lastMessageTime: new Date(Date.now() - 1800000),
    sentiment: "neutral",
    intent: "payment",
    totalOrders: 3,
    totalSpent: 5800,
    tags: [],
    notes: "",
    conversationStatus: "pending",
    slaTimer: 30,
  },
  {
    id: "5",
    name: "আবদুল হক",
    phone: "01712345678", // Duplicate phone
    channel: "facebook",
    status: "offline",
    unreadCount: 0,
    lastMessage: "অর্ডার করতে চাই",
    lastMessageTime: new Date(Date.now() - 86400000),
    sentiment: "neutral",
    intent: "order",
    totalOrders: 1,
    totalSpent: 950,
    tags: [],
    notes: "",
    conversationStatus: "open",
    duplicatePhone: true,
  },
];

const mockMessages: CustomerMessage[] = [
  {
    id: "1",
    type: "text",
    content: "হ্যালো, এই প্রোডাক্টটা কি স্টকে আছে?",
    timestamp: new Date(Date.now() - 600000),
    isCustomer: true,
    isAI: false,
    seen: true,
    sentiment: "neutral",
    intent: "inquiry",
  },
  {
    id: "2",
    type: "image",
    content: "এই ছবিটা দেখুন",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"],
    timestamp: new Date(Date.now() - 540000),
    isCustomer: true,
    isAI: false,
    seen: true,
    sentiment: "neutral",
    intent: "inquiry",
  },
  {
    id: "3",
    type: "text",
    content: "জি, এই প্রোডাক্টটি স্টকে আছে। 🎉 এটি আমাদের বেস্ট সেলার প্রোডাক্ট! দাম মাত্র ৳৪৫০। অর্ডার করতে চান?",
    timestamp: new Date(Date.now() - 480000),
    isCustomer: false,
    isAI: true,
    seen: true,
  },
  {
    id: "4",
    type: "voice",
    content: "Voice message",
    voiceUrl: "#",
    timestamp: new Date(Date.now() - 420000),
    isCustomer: true,
    isAI: false,
    seen: true,
    sentiment: "positive",
    intent: "order",
  },
  {
    id: "5",
    type: "text",
    content: "আপনার ভয়েস মেসেজ শুনলাম। আপনি সাইজ M চাইছেন, ঠিক আছে তো? 👕",
    timestamp: new Date(Date.now() - 360000),
    isCustomer: false,
    isAI: true,
    seen: true,
  },
];

const mockProducts = [
  { id: "1", name: "স্মার্ট ওয়াচ", price: 2500, stock: 15, images: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&q=80",
    "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&q=80",
  ]},
  { id: "2", name: "ওয়্যারলেস ইয়ারবাড", price: 1800, stock: 23, images: [
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&q=80",
    "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&q=80",
  ]},
  { id: "3", name: "ফোন কেস", price: 350, stock: 50, images: [
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&q=80",
  ]},
];

const cannedReplies = [
  { id: "1", title: "স্বাগতম", content: "আসসালামু আলাইকুম! 🙏 আপনাকে স্বাগতম। কিভাবে সাহায্য করতে পারি?" },
  { id: "2", title: "স্টক আছে", content: "জি, এই প্রোডাক্টটি স্টকে আছে। 🎉 অর্ডার করতে চান?" },
  { id: "3", title: "স্টক নেই", content: "দুঃখিত, এই মুহূর্তে স্টকে নেই। 😔 নতুন স্টক আসলে জানাব।" },
  { id: "4", title: "ডেলিভারি", content: "ঢাকার ভিতরে ১-২ দিন, বাইরে ৩-৫ দিন। 🚚 ডেলিভারি চার্জ: ঢাকা ৬০৳, বাইরে ১২০৳।" },
  { id: "5", title: "পেমেন্ট", content: "পেমেন্ট করতে পারেন:\n💰 bKash: 01712345678\n💰 Nagad: 01812345678\n💰 Rocket: 01912345678" },
  { id: "6", title: "ধন্যবাদ", content: "ধন্যবাদ আপনার অর্ডারের জন্য! 🙏❤️ শীঘ্রই ডেলিভারি দেওয়া হবে।" },
  { id: "7", title: "ট্র্যাকিং", content: "আপনার অর্ডার প্রসেসিং এ আছে। ট্র্যাকিং নম্বর শীঘ্রই পাঠাচ্ছি। 📦" },
  { id: "8", title: "সমস্যার জন্য দুঃখিত", content: "আপনার অসুবিধার জন্য আমরা আন্তরিকভাবে দুঃখিত। 🙏 সমস্যা সমাধানে কাজ করছি।" },
];

const whatsappTemplates = [
  {
    id: "1",
    name: "প্রোডাক্ট শেয়ার",
    template: "🛍️ *{product_name}*\n\n💰 মূল্য: ৳{price}\n📦 স্টক: {stock} পিস\n\n✅ অর্ডার করতে রিপ্লাই দিন!\n\n🔗 পেমেন্ট লিংক: {payment_link}",
  },
  {
    id: "2",
    name: "অর্ডার কনফার্ম",
    template: "✅ *অর্ডার কনফার্ম হয়েছে!*\n\n📋 অর্ডার নং: #{order_id}\n💰 মোট: ৳{total}\n📍 ঠিকানা: {address}\n\n🚚 ডেলিভারি: ২-৩ দিনের মধ্যে\n\n🙏 ধন্যবাদ!",
  },
  {
    id: "3",
    name: "পেমেন্ট রিমাইন্ডার",
    template: "💰 *পেমেন্ট রিমাইন্ডার*\n\nঅর্ডার #{order_id} এর ৳{amount} বকেয়া আছে।\n\n📱 bKash/Nagad: 01712345678\n\n⏰ আজকের মধ্যে পেমেন্ট করুন।",
  },
];

export default function AIModeratorCRM() {
  const getChannelIcon = (channel: ChannelType) => {
    switch (channel) {
      case "facebook": return <Facebook className="h-4 w-4 text-blue-600" />;
      case "instagram": return <Instagram className="h-4 w-4 text-pink-600" />;
      case "whatsapp": return <MessageCircle className="h-4 w-4 text-green-600" />;
      case "messenger": return <MessageSquare className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSentimentColor = (sentiment: SentimentType) => {
    switch (sentiment) {
      case "positive": return "bg-green-500";
      case "negative": return "bg-red-500";
      case "urgent": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const getIntentLabel = (intent: IntentType) => {
    const labels: Record<IntentType, string> = {
      order: "অর্ডার",
      inquiry: "জিজ্ঞাসা",
      complaint: "অভিযোগ",
      feedback: "ফিডব্যাক",
      payment: "পেমেন্ট",
      general: "সাধারণ",
    };
    return labels[intent];
  };
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(mockCustomers[0]);
  const [messages, setMessages] = useState<CustomerMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [channelFilter, setChannelFilter] = useState<ChannelType | "all">("all");
  const [isRecording, setIsRecording] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [showComplaintDialog, setShowComplaintDialog] = useState(false);
  const [showFollowUpDialog, setShowFollowUpDialog] = useState(false);
  const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showReportsDialog, setShowReportsDialog] = useState(false);
  const [aiAutoReply, setAiAutoReply] = useState(true);
  const [seenEnabled, setSeenEnabled] = useState(true);
  const [typingEnabled, setTypingEnabled] = useState(true);
  const [followUpEnabled, setFollowUpEnabled] = useState(true);
  const [customerNote, setCustomerNote] = useState("");
  const [mainView, setMainView] = useState<"chat" | "settings" | "reports">("chat");
  
  // Settings States
  const [aiSettings, setAiSettings] = useState({
    responseDelay: 2, // seconds
    maxImagesPerMessage: 30,
    autoGreeting: true,
    greetingMessage: "আসসালামু আলাইকুম! 🙏 আপনাকে স্বাগতম। কিভাবে সাহায্য করতে পারি?",
    autoFollowUpHours: 24,
    sentimentAnalysis: true,
    intentDetection: true,
    voiceToText: true,
    imageAnalysis: true,
    multiLanguage: true,
    defaultLanguage: "bengali",
    slaWarningMinutes: 15,
    slaCriticalMinutes: 5,
    workingHoursStart: "09:00",
    workingHoursEnd: "21:00",
    workingDays: [1, 2, 3, 4, 5, 6], // Mon-Sat
    notificationSound: true,
    emailNotifications: true,
    emailAddress: "",
    autoTagging: true,
    duplicateDetection: true,
    spamFilter: true,
    blockKeywords: ["spam", "promo", "offer"],
    priorityKeywords: ["urgent", "জরুরি", "এখনই"],
  });

  // Report Data
  const reportData = {
    today: {
      totalConversations: 156,
      resolvedConversations: 142,
      pendingConversations: 14,
      aiHandledPercent: 87,
      avgResponseTime: "1.5 মিনিট",
      totalOrders: 34,
      totalRevenue: 125600,
      complaints: 5,
      feedbackScore: 4.7,
    },
    weekly: {
      totalConversations: 892,
      resolvedConversations: 856,
      pendingConversations: 36,
      aiHandledPercent: 85,
      avgResponseTime: "2.1 মিনিট",
      totalOrders: 198,
      totalRevenue: 756800,
      complaints: 23,
      feedbackScore: 4.6,
    },
    monthly: {
      totalConversations: 3456,
      resolvedConversations: 3298,
      pendingConversations: 158,
      aiHandledPercent: 83,
      avgResponseTime: "2.4 মিনিট",
      totalOrders: 756,
      totalRevenue: 2856000,
      complaints: 89,
      feedbackScore: 4.5,
    },
    channelBreakdown: [
      { channel: "Facebook", conversations: 1456, orders: 312, revenue: 1180000 },
      { channel: "WhatsApp", conversations: 1234, orders: 278, revenue: 1050000 },
      { channel: "Instagram", conversations: 567, orders: 134, revenue: 506000 },
      { channel: "Messenger", conversations: 199, orders: 32, revenue: 120000 },
    ],
    hourlyDistribution: [
      { hour: "6-9", count: 45 },
      { hour: "9-12", count: 234 },
      { hour: "12-15", count: 312 },
      { hour: "15-18", count: 378 },
      { hour: "18-21", count: 456 },
      { hour: "21-24", count: 189 },
    ],
    topIntents: [
      { intent: "অর্ডার", count: 1234, percent: 36 },
      { intent: "জিজ্ঞাসা", count: 987, percent: 29 },
      { intent: "পেমেন্ট", count: 567, percent: 16 },
      { intent: "অভিযোগ", count: 312, percent: 9 },
      { intent: "ফিডব্যাক", count: 234, percent: 7 },
      { intent: "সাধারণ", count: 122, percent: 3 },
    ],
  };

  const [selectedReportPeriod, setSelectedReportPeriod] = useState<"today" | "weekly" | "monthly">("today");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Follow-up timer mock
  const [followUpTimers, setFollowUpTimers] = useState<{customerId: string; time: number}[]>([
    { customerId: "1", time: 1440 }, // 24 hours
    { customerId: "4", time: 720 }, // 12 hours
  ]);

  // Stats
  const stats = {
    totalChats: mockCustomers.length,
    onlineChats: mockCustomers.filter(c => c.status === "online" || c.status === "typing").length,
    urgentChats: mockCustomers.filter(c => c.sentiment === "negative" || c.sentiment === "urgent").length,
    pendingOrders: 12,
    aiResponseRate: 85,
    avgResponseTime: "২ মিনিট",
    csat: 4.6,
    resolvedToday: 28,
  };

  // Filter customers
  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery);
    const matchesChannel = channelFilter === "all" || customer.channel === channelFilter;
    
    if (activeTab === "all") return matchesSearch && matchesChannel;
    if (activeTab === "unread") return matchesSearch && matchesChannel && customer.unreadCount > 0;
    if (activeTab === "urgent") return matchesSearch && matchesChannel && (customer.sentiment === "negative" || customer.sentiment === "urgent");
    if (activeTab === "complaints") return matchesSearch && matchesChannel && customer.intent === "complaint";
    if (activeTab === "orders") return matchesSearch && matchesChannel && customer.intent === "order";
    
    return matchesSearch && matchesChannel;
  });

  // Scroll to bottom when new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate typing indicator
  const simulateTyping = () => {
    if (typingEnabled) {
      setShowTypingIndicator(true);
      setTimeout(() => setShowTypingIndicator(false), 2000);
    }
  };

  // Send message
  const handleSendMessage = () => {
    if (!newMessage.trim() && selectedImages.length === 0) return;

    const messageType: MessageType = selectedImages.length > 1 ? "multiple_images" : 
                                     selectedImages.length === 1 ? "image" : "text";

    const newMsg: CustomerMessage = {
      id: Date.now().toString(),
      type: messageType,
      content: newMessage,
      images: selectedImages.length > 0 ? selectedImages : undefined,
      timestamp: new Date(),
      isCustomer: false,
      isAI: false,
      seen: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    setSelectedImages([]);

    // Simulate seen
    if (seenEnabled) {
      setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, seen: true } : m));
      }, 1000);
    }
  };

  // Send product with multiple images
  const handleSendProduct = (product: typeof mockProducts[0]) => {
    const msgContent = `🛍️ *${product.name}*\n💰 মূল্য: ৳${product.price}\n📦 স্টক: ${product.stock} পিস\n\n✅ অর্ডার করতে চাইলে জানান!`;
    
    const newMsg: CustomerMessage = {
      id: Date.now().toString(),
      type: product.images.length > 1 ? "multiple_images" : "image",
      content: msgContent,
      images: product.images,
      timestamp: new Date(),
      isCustomer: false,
      isAI: false,
      seen: false,
    };

    setMessages([...messages, newMsg]);
    setShowProductDialog(false);
  };

  // Generate payment QR
  const handleSendPayment = (amount: number) => {
    const paymentLink = `https://pay.example.com/bkash?amount=${amount}&ref=${Date.now()}`;
    const msgContent = `💰 *পেমেন্ট করুন*\n\nমোট: ৳${amount}\n\n📱 bKash: 01712345678\n📱 Nagad: 01812345678\n📱 Rocket: 01912345678\n\n🔗 পেমেন্ট লিংক: ${paymentLink}\n\n⬇️ QR কোড স্ক্যান করুন`;

    const newMsg: CustomerMessage = {
      id: Date.now().toString(),
      type: "text",
      content: msgContent,
      timestamp: new Date(),
      isCustomer: false,
      isAI: false,
      seen: false,
    };

    setMessages([...messages, newMsg]);
    setShowPaymentDialog(false);
  };

  // Voice recording simulation
  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setNewMessage("ভয়েস থেকে টেক্সট: হ্যাঁ, আমি অর্ডার করতে চাই");
        setIsRecording(false);
      }, 2000);
    }
  };

  // Use canned reply
  const useCannedReply = (reply: typeof cannedReplies[0]) => {
    setNewMessage(reply.content);
  };

  // Create order
  const handleCreateOrder = () => {
    // Order creation logic
    setShowOrderDialog(false);
    const orderMsg: CustomerMessage = {
      id: Date.now().toString(),
      type: "text",
      content: "✅ আপনার অর্ডার #ORD" + Date.now().toString().slice(-6) + " সফলভাবে তৈরি হয়েছে!\n\n📦 শীঘ্রই ডেলিভারি দেওয়া হবে।\n🙏 ধন্যবাদ!",
      timestamp: new Date(),
      isCustomer: false,
      isAI: false,
      seen: false,
    };
    setMessages([...messages, orderMsg]);
  };

  // Save feedback
  const handleSaveFeedback = (rating: number, comment: string) => {
    // Save feedback logic
    setShowFeedbackDialog(false);
  };

  // Create complaint
  const handleCreateComplaint = (subject: string, description: string, priority: string) => {
    // Create complaint logic
    setShowComplaintDialog(false);
  };

  return (
    <div className="space-y-4 bg-background">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bot className="h-8 w-8 text-blue-600" />
            AI Moderator + CRM
          </h1>
          <p className="text-muted-foreground mt-1">২৪/৭ অটোমেটেড কাস্টমার সাপোর্ট ও অর্ডার ম্যানেজমেন্ট</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">AI Active</span>
          </div>
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            ২৪/৭
          </Badge>
          
          {/* View Toggle Buttons */}
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={mainView === "chat" ? "default" : "ghost"}
              size="sm"
              className="gap-1 h-8"
              onClick={() => setMainView("chat")}
            >
              <MessageSquare className="h-4 w-4" />
              চ্যাট
            </Button>
            <Button
              variant={mainView === "reports" ? "default" : "ghost"}
              size="sm"
              className="gap-1 h-8"
              onClick={() => setMainView("reports")}
            >
              <BarChart3 className="h-4 w-4" />
              রিপোর্ট
            </Button>
            <Button
              variant={mainView === "settings" ? "default" : "ghost"}
              size="sm"
              className="gap-1 h-8"
              onClick={() => setMainView("settings")}
            >
              <Settings className="h-4 w-4" />
              সেটিংস
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
        <Card className="col-span-1">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-muted-foreground">মোট চ্যাট</span>
            </div>
            <p className="text-xl font-bold mt-1">{stats.totalChats}</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-600" />
              <span className="text-xs text-muted-foreground">অনলাইন</span>
            </div>
            <p className="text-xl font-bold mt-1 text-green-600">{stats.onlineChats}</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span className="text-xs text-muted-foreground">জরুরি</span>
            </div>
            <p className="text-xl font-bold mt-1 text-orange-600">{stats.urgentChats}</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-purple-600" />
              <span className="text-xs text-muted-foreground">পেন্ডিং অর্ডার</span>
            </div>
            <p className="text-xl font-bold mt-1 text-purple-600">{stats.pendingOrders}</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-muted-foreground">AI রেসপন্স</span>
            </div>
            <p className="text-xl font-bold mt-1">{stats.aiResponseRate}%</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-cyan-600" />
              <span className="text-xs text-muted-foreground">গড় রেসপন্স</span>
            </div>
            <p className="text-xl font-bold mt-1">{stats.avgResponseTime}</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-600" />
              <span className="text-xs text-muted-foreground">CSAT</span>
            </div>
            <p className="text-xl font-bold mt-1 text-yellow-600">{stats.csat}/5</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-xs text-muted-foreground">আজ সমাধান</span>
            </div>
            <p className="text-xl font-bold mt-1 text-green-600">{stats.resolvedToday}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick AI Settings Toggle - Show only in chat view */}
      {mainView === "chat" && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={aiAutoReply} onCheckedChange={setAiAutoReply} id="ai-auto" />
                <Label htmlFor="ai-auto" className="flex items-center gap-2 cursor-pointer text-sm">
                  <Bot className="h-4 w-4" />
                  AI অটো-রিপ্লাই
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={seenEnabled} onCheckedChange={setSeenEnabled} id="seen" />
                <Label htmlFor="seen" className="flex items-center gap-2 cursor-pointer text-sm">
                  <Eye className="h-4 w-4" />
                  Seen দেখান
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={typingEnabled} onCheckedChange={setTypingEnabled} id="typing" />
                <Label htmlFor="typing" className="flex items-center gap-2 cursor-pointer text-sm">
                  <MessageSquare className="h-4 w-4" />
                  Typing Indicator
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={followUpEnabled} onCheckedChange={setFollowUpEnabled} id="followup" />
                <Label htmlFor="followup" className="flex items-center gap-2 cursor-pointer text-sm">
                  <Bell className="h-4 w-4" />
                  ২৪ ঘণ্টা Follow-up
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings View */}
      {mainView === "settings" && (
        <div className="grid gap-4 lg:grid-cols-2">
          {/* AI Response Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                AI রেসপন্স সেটিংস
              </CardTitle>
              <CardDescription>AI এর অটো-রিপ্লাই ও আচরণ কনফিগার করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  AI অটো-রিপ্লাই
                </Label>
                <Switch
                  checked={aiSettings.autoGreeting}
                  onCheckedChange={(v) => setAiSettings({...aiSettings, autoGreeting: v})}
                />
              </div>
              <div className="space-y-2">
                <Label>রেসপন্স ডিলে (সেকেন্ড)</Label>
                <Input
                  type="number"
                  value={aiSettings.responseDelay}
                  onChange={(e) => setAiSettings({...aiSettings, responseDelay: parseInt(e.target.value)})}
                  min={0}
                  max={30}
                />
                <p className="text-xs text-muted-foreground">AI রিপ্লাই করার আগে কত সেকেন্ড অপেক্ষা করবে</p>
              </div>
              <div className="space-y-2">
                <Label>স্বাগতম মেসেজ</Label>
                <Textarea
                  value={aiSettings.greetingMessage}
                  onChange={(e) => setAiSettings({...aiSettings, greetingMessage: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Sentiment Analysis
                </Label>
                <Switch
                  checked={aiSettings.sentimentAnalysis}
                  onCheckedChange={(v) => setAiSettings({...aiSettings, sentimentAnalysis: v})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Intent Detection
                </Label>
                <Switch
                  checked={aiSettings.intentDetection}
                  onCheckedChange={(v) => setAiSettings({...aiSettings, intentDetection: v})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Mic className="h-4 w-4" />
                  Voice to Text
                </Label>
                <Switch
                  checked={aiSettings.voiceToText}
                  onCheckedChange={(v) => setAiSettings({...aiSettings, voiceToText: v})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Image Analysis
                </Label>
                <Switch
                  checked={aiSettings.imageAnalysis}
                  onCheckedChange={(v) => setAiSettings({...aiSettings, imageAnalysis: v})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Messaging Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                মেসেজিং সেটিংস
              </CardTitle>
              <CardDescription>মেসেজ পাঠানোর নিয়ম কনফিগার করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>প্রতি মেসেজে সর্বোচ্চ ছবি</Label>
                <Input
                  type="number"
                  value={aiSettings.maxImagesPerMessage}
                  onChange={(e) => setAiSettings({...aiSettings, maxImagesPerMessage: parseInt(e.target.value)})}
                  min={1}
                  max={50}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Seen দেখান
                </Label>
                <Switch checked={seenEnabled} onCheckedChange={setSeenEnabled} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Typing Indicator
                </Label>
                <Switch checked={typingEnabled} onCheckedChange={setTypingEnabled} />
              </div>
              <div className="space-y-2">
                <Label>Follow-up সময় (ঘণ্টা)</Label>
                <Input
                  type="number"
                  value={aiSettings.autoFollowUpHours}
                  onChange={(e) => setAiSettings({...aiSettings, autoFollowUpHours: parseInt(e.target.value)})}
                  min={1}
                  max={72}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Auto Follow-up
                </Label>
                <Switch checked={followUpEnabled} onCheckedChange={setFollowUpEnabled} />
              </div>
            </CardContent>
          </Card>

          {/* SLA Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Timer className="h-5 w-5 text-orange-600" />
                SLA সেটিংস
              </CardTitle>
              <CardDescription>Service Level Agreement কনফিগার করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>SLA Warning (মিনিট)</Label>
                <Input
                  type="number"
                  value={aiSettings.slaWarningMinutes}
                  onChange={(e) => setAiSettings({...aiSettings, slaWarningMinutes: parseInt(e.target.value)})}
                  min={1}
                  max={60}
                />
                <p className="text-xs text-muted-foreground">হলুদ সতর্কতা দেখাবে</p>
              </div>
              <div className="space-y-2">
                <Label>SLA Critical (মিনিট)</Label>
                <Input
                  type="number"
                  value={aiSettings.slaCriticalMinutes}
                  onChange={(e) => setAiSettings({...aiSettings, slaCriticalMinutes: parseInt(e.target.value)})}
                  min={1}
                  max={30}
                />
                <p className="text-xs text-muted-foreground">লাল সতর্কতা দেখাবে</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>কর্মসময় শুরু</Label>
                <Input
                  type="time"
                  value={aiSettings.workingHoursStart}
                  onChange={(e) => setAiSettings({...aiSettings, workingHoursStart: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>কর্মসময় শেষ</Label>
                <Input
                  type="time"
                  value={aiSettings.workingHoursEnd}
                  onChange={(e) => setAiSettings({...aiSettings, workingHoursEnd: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-purple-600" />
                নোটিফিকেশন সেটিংস
              </CardTitle>
              <CardDescription>অ্যালার্ট ও নোটিফিকেশন কনফিগার করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  সাউন্ড নোটিফিকেশন
                </Label>
                <Switch
                  checked={aiSettings.notificationSound}
                  onCheckedChange={(v) => setAiSettings({...aiSettings, notificationSound: v})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  ইমেইল নোটিফিকেশন
                </Label>
                <Switch
                  checked={aiSettings.emailNotifications}
                  onCheckedChange={(v) => setAiSettings({...aiSettings, emailNotifications: v})}
                />
              </div>
              {aiSettings.emailNotifications && (
                <div className="space-y-2">
                  <Label>ইমেইল ঠিকানা</Label>
                  <Input
                    type="email"
                    value={aiSettings.emailAddress}
                    onChange={(e) => setAiSettings({...aiSettings, emailAddress: e.target.value})}
                    placeholder="your@email.com"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Automation Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                অটোমেশন সেটিংস
              </CardTitle>
              <CardDescription>স্বয়ংক্রিয় ফিচার কনফিগার করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Auto Tagging
                </Label>
                <Switch
                  checked={aiSettings.autoTagging}
                  onCheckedChange={(v) => setAiSettings({...aiSettings, autoTagging: v})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Duplicate Detection
                </Label>
                <Switch
                  checked={aiSettings.duplicateDetection}
                  onCheckedChange={(v) => setAiSettings({...aiSettings, duplicateDetection: v})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Spam Filter
                </Label>
                <Switch
                  checked={aiSettings.spamFilter}
                  onCheckedChange={(v) => setAiSettings({...aiSettings, spamFilter: v})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Languages className="h-5 w-5 text-cyan-600" />
                ভাষা সেটিংস
              </CardTitle>
              <CardDescription>ভাষা ও অনুবাদ কনফিগার করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Multi-Language Support
                </Label>
                <Switch
                  checked={aiSettings.multiLanguage}
                  onCheckedChange={(v) => setAiSettings({...aiSettings, multiLanguage: v})}
                />
              </div>
              <div className="space-y-2">
                <Label>Default Language</Label>
                <Select
                  value={aiSettings.defaultLanguage}
                  onValueChange={(v) => setAiSettings({...aiSettings, defaultLanguage: v})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bengali">বাংলা</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="auto">Auto-detect</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Card className="lg:col-span-2">
            <CardContent className="p-4 flex justify-end gap-3">
              <Button variant="outline">রিসেট করুন</Button>
              <Button className="gap-2">
                <Check className="h-4 w-4" />
                সেটিংস সংরক্ষণ করুন
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reports View */}
      {mainView === "reports" && (
        <div className="space-y-4">
          {/* Report Period Selector */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                  <Button
                    variant={selectedReportPeriod === "today" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedReportPeriod("today")}
                  >
                    আজ
                  </Button>
                  <Button
                    variant={selectedReportPeriod === "weekly" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedReportPeriod("weekly")}
                  >
                    সাপ্তাহিক
                  </Button>
                  <Button
                    variant={selectedReportPeriod === "monthly" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedReportPeriod("monthly")}
                  >
                    মাসিক
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    এক্সপোর্ট PDF
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    এক্সপোর্ট Excel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overview Stats */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">মোট কথোপকথন</span>
                </div>
                <p className="text-2xl font-bold">{reportData[selectedReportPeriod].totalConversations}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% আগের চেয়ে
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">সমাধান হয়েছে</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{reportData[selectedReportPeriod].resolvedConversations}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((reportData[selectedReportPeriod].resolvedConversations / reportData[selectedReportPeriod].totalConversations) * 100)}% সমাধান হার
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Bot className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">AI হ্যান্ডেল</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{reportData[selectedReportPeriod].aiHandledPercent}%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  স্বয়ংক্রিয় রেসপন্স
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <ShoppingBag className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">মোট অর্ডার</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">{reportData[selectedReportPeriod].totalOrders}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% আগের চেয়ে
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm">মোট রেভিনিউ</span>
                </div>
                <p className="text-2xl font-bold">৳{reportData[selectedReportPeriod].totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +15% আগের চেয়ে
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Reports */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Channel Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-600" />
                  চ্যানেল ব্রেকডাউন
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.channelBreakdown.map((channel, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {channel.channel === "Facebook" && <Facebook className="h-4 w-4 text-blue-600" />}
                          {channel.channel === "WhatsApp" && <MessageCircle className="h-4 w-4 text-green-600" />}
                          {channel.channel === "Instagram" && <Instagram className="h-4 w-4 text-pink-600" />}
                          {channel.channel === "Messenger" && <MessageSquare className="h-4 w-4 text-blue-500" />}
                          <span className="font-medium">{channel.channel}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{channel.conversations} চ্যাট</span>
                      </div>
                      <Progress 
                        value={(channel.conversations / reportData.channelBreakdown.reduce((a, b) => a + b.conversations, 0)) * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{channel.orders} অর্ডার</span>
                        <span>৳{channel.revenue.toLocaleString()} রেভিনিউ</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Intent Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Intent Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportData.topIntents.map((intent, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-24 text-sm font-medium">{intent.intent}</div>
                      <div className="flex-1">
                        <Progress value={intent.percent} className="h-4" />
                      </div>
                      <div className="w-16 text-right text-sm text-muted-foreground">{intent.count}</div>
                      <div className="w-12 text-right text-sm font-medium">{intent.percent}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hourly Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  সময়ভিত্তিক বিতরণ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-40 gap-2">
                  {reportData.hourlyDistribution.map((hour, idx) => {
                    const maxCount = Math.max(...reportData.hourlyDistribution.map(h => h.count));
                    const height = (hour.count / maxCount) * 100;
                    return (
                      <div key={idx} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                          style={{ height: `${height}%`, minHeight: "10px" }}
                        />
                        <span className="text-[10px] text-muted-foreground mt-1">{hour.hour}</span>
                        <span className="text-xs font-medium">{hour.count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  পারফরম্যান্স মেট্রিক্স
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <Timer className="h-5 w-5 mx-auto mb-1 text-cyan-600" />
                    <p className="text-lg font-bold">{reportData[selectedReportPeriod].avgResponseTime}</p>
                    <p className="text-xs text-muted-foreground">গড় রেসপন্স টাইম</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <Star className="h-5 w-5 mx-auto mb-1 text-yellow-600" />
                    <p className="text-lg font-bold">{reportData[selectedReportPeriod].feedbackScore}/5</p>
                    <p className="text-xs text-muted-foreground">ফিডব্যাক স্কোর</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-red-600" />
                    <p className="text-lg font-bold text-red-600">{reportData[selectedReportPeriod].complaints}</p>
                    <p className="text-xs text-muted-foreground">অভিযোগ</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-orange-600" />
                    <p className="text-lg font-bold">{reportData[selectedReportPeriod].pendingConversations}</p>
                    <p className="text-xs text-muted-foreground">পেন্ডিং</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  রিফ্রেশ ডেটা
                </Button>
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  কাস্টম তারিখ
                </Button>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  ফিল্টার
                </Button>
                <Button variant="outline" className="gap-2">
                  <Mail className="h-4 w-4" />
                  রিপোর্ট ইমেইল করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Chat Interface - Show only when in chat view */}
      {mainView === "chat" && (
      <>
      <div className="grid lg:grid-cols-12 gap-4">
        {/* Left: Customer List */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="নাম বা ফোন খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Channel Filter */}
            <div className="flex gap-1 flex-wrap">
              <Button
                variant={channelFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setChannelFilter("all")}
                className="h-7 text-xs"
              >
                সব
              </Button>
              <Button
                variant={channelFilter === "facebook" ? "default" : "outline"}
                size="sm"
                onClick={() => setChannelFilter("facebook")}
                className="h-7 text-xs gap-1"
              >
                <Facebook className="h-3 w-3" />
                FB
              </Button>
              <Button
                variant={channelFilter === "instagram" ? "default" : "outline"}
                size="sm"
                onClick={() => setChannelFilter("instagram")}
                className="h-7 text-xs gap-1"
              >
                <Instagram className="h-3 w-3" />
                IG
              </Button>
              <Button
                variant={channelFilter === "whatsapp" ? "default" : "outline"}
                size="sm"
                onClick={() => setChannelFilter("whatsapp")}
                className="h-7 text-xs gap-1"
              >
                <MessageCircle className="h-3 w-3" />
                WA
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 h-8">
                <TabsTrigger value="all" className="text-xs">সব</TabsTrigger>
                <TabsTrigger value="unread" className="text-xs">অপঠিত</TabsTrigger>
                <TabsTrigger value="urgent" className="text-xs">জরুরি</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="space-y-1 p-2">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      simulateTyping();
                    }}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedCustomer?.id === customer.id 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-accent"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background ${
                          customer.status === "online" ? "bg-green-500" : 
                          customer.status === "typing" ? "bg-blue-500 animate-pulse" : "bg-gray-400"
                        }`} />
                        <div className="absolute -top-1 -left-1">
                          {getChannelIcon(customer.channel)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1">
                            <p className="font-medium text-sm truncate">{customer.name}</p>
                            {customer.duplicatePhone && (
                              <Badge variant="outline" className="h-4 text-[10px] px-1 bg-yellow-100 text-yellow-700">
                                ডুপ্লিকেট
                              </Badge>
                            )}
                          </div>
                          {customer.unreadCount > 0 && (
                            <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                              {customer.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className={`text-xs truncate ${
                          selectedCustomer?.id === customer.id ? "opacity-80" : "text-muted-foreground"
                        }`}>
                          {customer.status === "typing" ? (
                            <span className="flex items-center gap-1">
                              <span className="flex gap-0.5">
                                <span className="h-1 w-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="h-1 w-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="h-1 w-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                              </span>
                              টাইপ করছে...
                            </span>
                          ) : customer.lastMessage}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Badge className={`${getSentimentColor(customer.sentiment)} text-white text-[10px] h-4 px-1.5`}>
                            {getIntentLabel(customer.intent)}
                          </Badge>
                          {customer.slaTimer && customer.slaTimer <= 15 && (
                            <Badge variant="outline" className="h-4 text-[10px] px-1 bg-red-50 text-red-600 border-red-200">
                              <Timer className="h-2.5 w-2.5 mr-0.5" />
                              {customer.slaTimer}m
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Center: Chat Window */}
        <Card className="lg:col-span-6">
          {selectedCustomer ? (
            <>
              <CardHeader className="border-b py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{selectedCustomer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${
                        selectedCustomer.status === "online" ? "bg-green-500" : 
                        selectedCustomer.status === "typing" ? "bg-blue-500 animate-pulse" : "bg-gray-400"
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{selectedCustomer.name}</CardTitle>
                        {getChannelIcon(selectedCustomer.channel)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {selectedCustomer.phone}
                        {selectedCustomer.status === "typing" && (
                          <span className="text-blue-600 flex items-center gap-1">
                            • টাইপ করছে
                            <span className="flex gap-0.5">
                              <span className="h-1 w-1 bg-blue-600 rounded-full animate-bounce" />
                              <span className="h-1 w-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                              <span className="h-1 w-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Messages */}
                <ScrollArea className="h-[350px] p-4">
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.isCustomer ? "justify-start" : "justify-end"}`}
                      >
                        <div className={`flex gap-2 max-w-[80%] ${
                          msg.isCustomer ? "flex-row" : "flex-row-reverse"
                        }`}>
                          <Avatar className="h-7 w-7 flex-shrink-0">
                            <AvatarFallback className={`text-xs ${
                              msg.isCustomer 
                                ? "bg-secondary" 
                                : msg.isAI 
                                ? "bg-blue-500 text-white"
                                : "bg-primary text-primary-foreground"
                            }`}>
                              {msg.isCustomer ? <User className="h-3 w-3" /> : msg.isAI ? <Bot className="h-3 w-3" /> : "S"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            {/* Image messages */}
                            {(msg.type === "image" || msg.type === "multiple_images") && msg.images && (
                              <div className={`grid gap-1 ${
                                msg.images.length > 1 ? "grid-cols-2" : "grid-cols-1"
                              } max-w-[250px]`}>
                                {msg.images.map((img, idx) => (
                                  <img 
                                    key={idx}
                                    src={img} 
                                    alt="" 
                                    className="rounded-lg object-cover w-full h-24"
                                  />
                                ))}
                              </div>
                            )}
                            {/* Voice message */}
                            {msg.type === "voice" && (
                              <div className={`rounded-lg p-2 ${
                                msg.isCustomer ? "bg-secondary" : "bg-primary text-primary-foreground"
                              }`}>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Headphones className="h-4 w-4" />
                                  </Button>
                                  <div className="flex-1 h-1 bg-current/20 rounded-full overflow-hidden">
                                    <div className="h-full w-1/2 bg-current rounded-full" />
                                  </div>
                                  <span className="text-xs">0:15</span>
                                </div>
                              </div>
                            )}
                            {/* Text message */}
                            {msg.content && (msg.type === "text" || msg.images) && (
                              <div className={`rounded-lg p-3 ${
                                msg.isCustomer 
                                  ? "bg-secondary text-secondary-foreground" 
                                  : "bg-primary text-primary-foreground"
                              }`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                              </div>
                            )}
                            <div className={`flex items-center gap-2 text-[10px] text-muted-foreground ${
                              msg.isCustomer ? "justify-start" : "justify-end"
                            }`}>
                              <span>{msg.timestamp.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}</span>
                              {msg.isAI && <Badge variant="outline" className="h-4 text-[9px] px-1">AI</Badge>}
                              {!msg.isCustomer && msg.seen && <Eye className="h-3 w-3 text-blue-500" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Typing indicator */}
                    {showTypingIndicator && (
                      <div className="flex justify-start">
                        <div className="flex items-center gap-2 bg-secondary rounded-lg p-3">
                          <span className="flex gap-1">
                            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
                            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Selected Images Preview */}
                {selectedImages.length > 0 && (
                  <div className="border-t p-2 bg-muted/30">
                    <div className="flex gap-2 flex-wrap">
                      {selectedImages.map((img, idx) => (
                        <div key={idx} className="relative">
                          <img src={img} alt="" className="h-16 w-16 rounded object-cover" />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-4 w-4 absolute -top-1 -right-1"
                            onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== idx))}
                          >
                            <XCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedImages.length} ছবি সিলেক্ট করা হয়েছে (সর্বোচ্চ ৩০টা)
                    </p>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="border-t p-2 bg-muted/30">
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex gap-2 pb-2">
                      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1 h-7 text-xs flex-shrink-0">
                            <Package className="h-3 w-3" />
                            প্রোডাক্ট
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>প্রোডাক্ট পাঠান (একাধিক ছবি সহ)</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="h-[350px] pr-4">
                            <div className="space-y-3">
                              {mockProducts.map((product) => (
                                <Card key={product.id} className="cursor-pointer hover:border-primary transition-colors">
                                  <CardContent className="p-3">
                                    <div className="flex gap-3">
                                      <div className="flex gap-1 flex-shrink-0">
                                        {product.images.slice(0, 2).map((img, idx) => (
                                          <img key={idx} src={img} alt="" className="h-14 w-14 rounded object-cover" />
                                        ))}
                                        {product.images.length > 2 && (
                                          <div className="h-14 w-14 rounded bg-muted flex items-center justify-center text-xs font-medium">
                                            +{product.images.length - 2}
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm">{product.name}</p>
                                        <p className="text-sm text-muted-foreground">৳{product.price}</p>
                                        <p className="text-xs text-muted-foreground">স্টক: {product.stock}</p>
                                      </div>
                                      <Button size="sm" onClick={() => handleSendProduct(product)}>
                                        পাঠান
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1 h-7 text-xs flex-shrink-0">
                            <CreditCard className="h-3 w-3" />
                            পেমেন্ট + QR
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm">
                          <DialogHeader>
                            <DialogTitle>পেমেন্ট লিংক ও QR কোড</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label>অ্যামাউন্ট (৳)</Label>
                              <Input type="number" placeholder="1000" id="payment-amount" />
                            </div>
                            <div className="p-4 bg-muted rounded-lg text-center">
                              <QrCode className="h-24 w-24 mx-auto text-muted-foreground" />
                              <p className="text-sm text-muted-foreground mt-2">QR কোড জেনারেট হবে</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="p-2 rounded-lg border text-center">
                                <img src="https://logo.clearbit.com/bkash.com" alt="bKash" className="h-8 w-8 mx-auto mb-1" />
                                <p className="text-xs">bKash</p>
                              </div>
                              <div className="p-2 rounded-lg border text-center">
                                <img src="https://logo.clearbit.com/nagad.com.bd" alt="Nagad" className="h-8 w-8 mx-auto mb-1" />
                                <p className="text-xs">Nagad</p>
                              </div>
                              <div className="p-2 rounded-lg border text-center">
                                <img src="https://logo.clearbit.com/rocket.com.bd" alt="Rocket" className="h-8 w-8 mx-auto mb-1" />
                                <p className="text-xs">Rocket</p>
                              </div>
                            </div>
                            <Button className="w-full" onClick={() => handleSendPayment(1000)}>
                              পেমেন্ট লিংক পাঠান
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1 h-7 text-xs flex-shrink-0">
                            <ShoppingBag className="h-3 w-3" />
                            অর্ডার নিন
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>নতুন অর্ডার তৈরি করুন</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label>কাস্টমার</Label>
                              <Input value={selectedCustomer?.name} disabled />
                            </div>
                            <div className="grid gap-2">
                              <Label>প্রোডাক্ট সিলেক্ট করুন</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="প্রোডাক্ট বাছুন" />
                                </SelectTrigger>
                                <SelectContent>
                                  {mockProducts.map(p => (
                                    <SelectItem key={p.id} value={p.id}>{p.name} - ৳{p.price}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label>ঠিকানা</Label>
                              <Textarea placeholder="ডেলিভারি ঠিকানা..." rows={2} />
                            </div>
                            <Button className="w-full" onClick={handleCreateOrder}>
                              অর্ডার তৈরি করুন
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1 h-7 text-xs flex-shrink-0">
                            <Star className="h-3 w-3" />
                            ফিডব্যাক
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>ফিডব্যাক সংগ্রহ করুন</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex justify-center gap-2">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <Button key={rating} variant="outline" size="icon" className="h-10 w-10">
                                  <Star className={`h-5 w-5 ${rating <= 4 ? "text-yellow-500 fill-yellow-500" : ""}`} />
                                </Button>
                              ))}
                            </div>
                            <Textarea placeholder="কাস্টমারের মন্তব্য..." rows={3} />
                            <Button className="w-full" onClick={() => handleSaveFeedback(4, "")}>
                              ফিডব্যাক সংরক্ষণ করুন
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={showComplaintDialog} onOpenChange={setShowComplaintDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1 h-7 text-xs flex-shrink-0 text-red-600 border-red-200 hover:bg-red-50">
                            <AlertTriangle className="h-3 w-3" />
                            অভিযোগ
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>অভিযোগ রেকর্ড করুন</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label>বিষয়</Label>
                              <Input placeholder="অভিযোগের বিষয়..." />
                            </div>
                            <div className="grid gap-2">
                              <Label>বিস্তারিত</Label>
                              <Textarea placeholder="অভিযোগের বিস্তারিত..." rows={3} />
                            </div>
                            <div className="grid gap-2">
                              <Label>প্রায়োরিটি</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="প্রায়োরিটি বাছুন" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="urgent">Urgent</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button className="w-full" variant="destructive" onClick={() => handleCreateComplaint("", "", "medium")}>
                              অভিযোগ সংরক্ষণ করুন
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={showWhatsAppDialog} onOpenChange={setShowWhatsAppDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1 h-7 text-xs flex-shrink-0 text-green-600 border-green-200 hover:bg-green-50">
                            <MessageCircle className="h-3 w-3" />
                            WhatsApp টেমপ্লেট
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>WhatsApp DM টেমপ্লেট</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="h-[350px] pr-4">
                            <div className="space-y-3">
                              {whatsappTemplates.map((template) => (
                                <Card key={template.id} className="cursor-pointer hover:border-green-500 transition-colors">
                                  <CardContent className="p-3">
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="flex-1">
                                        <p className="font-semibold text-sm mb-2">{template.name}</p>
                                        <p className="text-xs text-muted-foreground whitespace-pre-wrap">{template.template}</p>
                                      </div>
                                      <Button size="sm" variant="outline" onClick={() => {
                                        setNewMessage(template.template);
                                        setShowWhatsAppDialog(false);
                                      }}>
                                        ব্যবহার করুন
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </ScrollArea>
                </div>

                {/* Canned Replies */}
                <div className="border-t p-2 bg-blue-50/50 dark:bg-blue-950/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-3 w-3 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600">দ্রুত রিপ্লাই</span>
                  </div>
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex gap-2 pb-1">
                      {cannedReplies.map((reply) => (
                        <Button
                          key={reply.id}
                          variant="outline"
                          size="sm"
                          className="h-6 text-xs flex-shrink-0"
                          onClick={() => useCannedReply(reply)}
                        >
                          {reply.title}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Message Input */}
                <div className="border-t p-3">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 flex-shrink-0"
                      onClick={() => {
                        // Add sample image
                        if (selectedImages.length < 30) {
                          setSelectedImages([...selectedImages, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80"]);
                        }
                      }}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Textarea
                      placeholder="মেসেজ লিখুন..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[36px] max-h-[100px] flex-1 resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      variant={isRecording ? "destructive" : "ghost"} 
                      size="icon"
                      className={`h-9 w-9 flex-shrink-0 ${isRecording ? "animate-pulse" : ""}`}
                      onClick={toggleVoiceRecording}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="h-9 w-9 flex-shrink-0" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  {isRecording && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-red-600">
                      <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                      ভয়েস রেকর্ডিং চলছে...
                    </div>
                  )}
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-[600px]">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>একটি চ্যাট সিলেক্ট করুন</p>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Right: Customer Details & CRM */}
        <Card className="lg:col-span-3">
          {selectedCustomer ? (
            <>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customer 360
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-2">
                    <AvatarFallback className="text-xl">{selectedCustomer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{selectedCustomer.name}</h3>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    {getChannelIcon(selectedCustomer.channel)}
                    <span>{selectedCustomer.phone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 justify-center">
                  {selectedCustomer.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 rounded-lg bg-muted/50 text-center">
                    <ShoppingBag className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-lg font-bold">{selectedCustomer.totalOrders}</p>
                    <p className="text-xs text-muted-foreground">মোট অর্ডার</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 text-center">
                    <DollarSign className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-lg font-bold">৳{selectedCustomer.totalSpent.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">মোট খরচ</p>
                  </div>
                </div>

                <Separator />

                {/* SLA Timer */}
                {selectedCustomer.slaTimer && (
                  <div className={`p-3 rounded-lg ${
                    selectedCustomer.slaTimer <= 10 ? "bg-red-50 border border-red-200" : "bg-yellow-50 border border-yellow-200"
                  }`}>
                    <div className="flex items-center gap-2">
                      <Timer className={`h-4 w-4 ${selectedCustomer.slaTimer <= 10 ? "text-red-600" : "text-yellow-600"}`} />
                      <span className={`text-sm font-medium ${selectedCustomer.slaTimer <= 10 ? "text-red-600" : "text-yellow-600"}`}>
                        SLA: {selectedCustomer.slaTimer} মিনিট বাকি
                      </span>
                    </div>
                    <Progress 
                      value={(selectedCustomer.slaTimer / 60) * 100} 
                      className="h-1.5 mt-2"
                    />
                  </div>
                )}

                {/* Conversation Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">স্ট্যাটাস:</span>
                  <Select defaultValue={selectedCustomer.conversationStatus}>
                    <SelectTrigger className="w-32 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="escalated">Escalated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Duplicate Phone Warning */}
                {selectedCustomer.duplicatePhone && (
                  <div className="p-2 rounded-lg bg-yellow-50 border border-yellow-200">
                    <div className="flex items-center gap-2 text-yellow-700">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-xs font-medium">ডুপ্লিকেট ফোন নম্বর শনাক্ত হয়েছে</span>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Notes */}
                <div>
                  <Label className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                    <StickyNote className="h-3 w-3" />
                    নোট
                  </Label>
                  <Textarea
                    placeholder="কাস্টমার সম্পর্কে নোট..."
                    value={customerNote || selectedCustomer.notes}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    rows={3}
                    className="text-sm"
                  />
                  <Button size="sm" className="w-full mt-2">সংরক্ষণ করুন</Button>
                </div>

                <Separator />

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="gap-1 text-xs">
                    <Star className="h-3 w-3" />
                    VIP যোগ
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-xs">
                    <Archive className="h-3 w-3" />
                    আর্কাইভ
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-xs">
                    <Bell className="h-3 w-3" />
                    Follow-up
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-xs text-red-600 border-red-200 hover:bg-red-50">
                    <XCircle className="h-3 w-3" />
                    ব্লক
                  </Button>
                </div>

                {/* Comment Reply for FB */}
                {selectedCustomer.channel === "facebook" && (
                  <>
                    <Separator />
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Facebook className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">FB কমেন্ট রিপ্লাই</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        পোস্টের কমেন্টে রিপ্লাই দিন এবং ইনবক্সে মেসেজ পাঠান
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button size="sm" variant="outline" className="text-xs gap-1">
                          <MessageSquare className="h-3 w-3" />
                          কমেন্টে রিপ্লাই
                        </Button>
                        <Button size="sm" className="text-xs gap-1 bg-blue-600 hover:bg-blue-700">
                          <Send className="h-3 w-3" />
                          ইনবক্সে পাঠান
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-[600px]">
              <div className="text-center text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>কাস্টমার সিলেক্ট করুন</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Follow-up Timers */}
      {followUpEnabled && followUpTimers.length > 0 && (
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-orange-600" />
              ২৪ ঘণ্টা Follow-up Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {followUpTimers.map((timer, idx) => {
                const customer = mockCustomers.find(c => c.id === timer.customerId);
                if (!customer) return null;
                return (
                  <div key={idx} className="p-3 rounded-lg border bg-orange-50 dark:bg-orange-950/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.floor(timer.time / 60)}h {timer.time % 60}m পরে
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 text-xs h-7">
                        এখনই পাঠান
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <XCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
      </>
      )}
    </div>
  );
}
