import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, TrendingUp, MessageSquare, DollarSign, AlertCircle, Clock, CheckCircle2, XCircle, Plus, FileText, Phone, BarChart, Wifi, WifiOff, RefreshCw, Server, CloudOff, Cloud, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { 
  AnimatedCounter, 
  AnimatedProgress,
  AnimatedList,
  staggerContainer,
  staggerItem
} from "@/components/animations/AnimatedComponents";

const stats = [
  { 
    name: "আজকের অর্ডার", 
    name_en: "Today's Orders", 
    value: "২৫", 
    change: "+২০%", 
    icon: ShoppingCart, 
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20"
  },
  { 
    name: "মোট বিক্রয়", 
    name_en: "Total Sales", 
    value: "৳১২,৫০০", 
    change: "+১৫%", 
    icon: DollarSign, 
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20"
  },
  { 
    name: "পেন্ডিং অর্ডার", 
    name_en: "Pending Orders", 
    value: "৮", 
    change: "জরুরি", 
    icon: Clock, 
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    urgent: true
  },
  { 
    name: "নতুন মেসেজ", 
    name_en: "New Messages", 
    value: "১৫", 
    change: "রিপ্লাই করুন", 
    icon: MessageSquare, 
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    urgent: true
  },
];

const salesData = [
  { day: "শনি", sales: 4500 },
  { day: "রবি", sales: 5200 },
  { day: "সোম", sales: 3800 },
  { day: "মঙ্গল", sales: 6100 },
  { day: "বুধ", sales: 7200 },
  { day: "বৃহঃ", sales: 5800 },
  { day: "শুক্র", sales: 8500 },
];

const maxSales = Math.max(...salesData.map(d => d.sales));

const recentOrders = [
  { id: "#ORD-001", customer: "রহিম আহমেদ", product: "স্মার্টফোন কেস", amount: "৳৩৫০", status: "pending", time: "৫ মিনিট আগে" },
  { id: "#ORD-002", customer: "সালমা খাতুন", product: "হ্যান্ডব্যাগ", amount: "৳১,২০০", status: "confirmed", time: "১৫ মিনিট আগে" },
  { id: "#ORD-003", customer: "করিম মিয়া", product: "টি-শার্ট", amount: "৳৪৫০", status: "shipped", time: "১ ঘন্টা আগে" },
  { id: "#ORD-004", customer: "নাজমা বেগম", product: "কসমেটিক্স সেট", amount: "৳৮০০", status: "delivered", time: "২ ঘন্টা আগে" },
  { id: "#ORD-005", customer: "জাহিদ ইসলাম", product: "জুতা", amount: "৳১,৫০০", status: "pending", time: "৩ ঘন্টা আগে" },
];

const pendingMessages = [
  { customer: "আলী হোসেন", message: "এই পণ্যটি কি স্টকে আছে?", time: "এখনই", unread: true },
  { customer: "ফাতেমা আক্তার", message: "ডেলিভারি চার্জ কত?", time: "১০ মিনিট", unread: true },
  { customer: "জাহিদ ইসলাম", message: "অর্ডার ট্র্যাকিং নাম্বার দিন", time: "৩০ মিনিট", unread: false },
  { customer: "রুমানা পারভীন", message: "রিটার্ন পলিসি কি?", time: "১ ঘন্টা", unread: true },
];

const lowStockProducts = [
  { name: "স্মার্টফোন কেস", stock: 5, minStock: 20, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=100&q=80" },
  { name: "হ্যান্ডব্যাগ", stock: 3, minStock: 15, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&q=80" },
  { name: "টি-শার্ট", stock: 8, minStock: 25, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80" },
];

const getStatusInfo = (status: string) => {
  switch (status) {
    case "pending":
      return { label: "অপেক্ষমাণ", variant: "outline" as const, icon: Clock, color: "text-orange-600" };
    case "confirmed":
      return { label: "নিশ্চিত", variant: "default" as const, icon: CheckCircle2, color: "text-blue-600" };
    case "shipped":
      return { label: "পাঠানো হয়েছে", variant: "secondary" as const, icon: Package, color: "text-purple-600" };
    case "delivered":
      return { label: "ডেলিভার হয়েছে", variant: "default" as const, icon: CheckCircle2, color: "text-green-600" };
    default:
      return { label: status, variant: "outline" as const, icon: AlertCircle, color: "text-gray-600" };
  }
};

// Network & Sync Status Component
function NetworkSyncStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [pendingData, setPendingData] = useState(0);
  const [syncedData, setSyncedData] = useState(0);
  const [totalDataSent, setTotalDataSent] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Simulate auto-sync when coming back online
      simulateSync();
    };
    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus('error');
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial sync simulation
    if (navigator.onLine) {
      simulateSync();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const simulateSync = () => {
    setSyncStatus('syncing');
    setPendingData(Math.floor(Math.random() * 10) + 5);
    setSyncedData(0);

    // Simulate syncing data
    let synced = 0;
    const pending = Math.floor(Math.random() * 10) + 5;
    setPendingData(pending);

    const interval = setInterval(() => {
      synced++;
      setSyncedData(synced);
      setTotalDataSent(prev => prev + Math.floor(Math.random() * 50) + 10);
      
      if (synced >= pending) {
        clearInterval(interval);
        setSyncStatus('success');
        setLastSyncTime(new Date());
        setPendingData(0);
      }
    }, 300);
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <Card className={`border-2 transition-all duration-300 ${
      !isOnline 
        ? 'border-red-500 bg-red-50 dark:bg-red-950/20' 
        : syncStatus === 'syncing' 
          ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
          : syncStatus === 'success'
            ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
            : 'border-border'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          {/* Connection Status */}
          <div className="flex items-center gap-4">
            <div className={`relative p-3 rounded-full ${
              !isOnline 
                ? 'bg-red-100 dark:bg-red-900/30' 
                : 'bg-green-100 dark:bg-green-900/30'
            }`}>
              {isOnline ? (
                <Wifi className="h-6 w-6 text-green-600" />
              ) : (
                <WifiOff className="h-6 w-6 text-red-600 animate-pulse" />
              )}
              {/* Blinking indicator */}
              <span className={`absolute top-1 right-1 h-3 w-3 rounded-full ${
                !isOnline 
                  ? 'bg-red-500 animate-ping' 
                  : syncStatus === 'syncing'
                    ? 'bg-yellow-500 animate-pulse'
                    : 'bg-green-500'
              }`} />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-semibold ${
                  !isOnline ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'
                }`}>
                  {isOnline ? 'অনলাইন' : 'অফলাইন'}
                </h3>
                <Badge variant={isOnline ? "default" : "destructive"} className="text-xs">
                  {isOnline ? 'সংযুক্ত' : 'বিচ্ছিন্ন'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {!isOnline 
                  ? 'ইন্টারনেট সংযোগ নেই - ডেটা লোকালি সেভ হচ্ছে'
                  : lastSyncTime 
                    ? `শেষ সিঙ্ক: ${lastSyncTime.toLocaleTimeString('bn-BD')}`
                    : 'সার্ভারের সাথে সংযুক্ত'
                }
              </p>
            </div>
          </div>

          {/* Server Sync Status */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                {syncStatus === 'syncing' ? (
                  <>
                    <RefreshCw className="h-4 w-4 text-yellow-600 animate-spin" />
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">সিঙ্ক হচ্ছে...</span>
                  </>
                ) : syncStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">সিঙ্ক সফল</span>
                  </>
                ) : syncStatus === 'error' || !isOnline ? (
                  <>
                    <CloudOff className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-700 dark:text-red-400">সিঙ্ক বন্ধ</span>
                  </>
                ) : (
                  <>
                    <Cloud className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">প্রস্তুত</span>
                  </>
                )}
              </div>
              {syncStatus === 'syncing' && pendingData > 0 && (
                <div className="mt-1">
                  <Progress value={(syncedData / pendingData) * 100} className="h-1.5 w-24" />
                  <p className="text-xs text-muted-foreground mt-0.5">{syncedData}/{pendingData} আইটেম</p>
                </div>
              )}
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowDetails(!showDetails)}
              className="gap-1"
            >
              <Database className="h-4 w-4" />
              বিস্তারিত
            </Button>

            <Button 
              variant={isOnline ? "default" : "secondary"}
              size="sm" 
              onClick={simulateSync}
              disabled={!isOnline || syncStatus === 'syncing'}
              className="gap-1"
            >
              <RefreshCw className={`h-4 w-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
              সিঙ্ক করুন
            </Button>
          </div>
        </div>

        {/* Expanded Details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-background rounded-lg border">
              <div className="flex items-center gap-2 mb-1">
                <Server className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">সার্ভার স্ট্যাটাস</span>
              </div>
              <p className={`font-semibold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                {isOnline ? 'সক্রিয়' : 'অফলাইন'}
              </p>
            </div>
            <div className="p-3 bg-background rounded-lg border">
              <div className="flex items-center gap-2 mb-1">
                <Database className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">মোট ডেটা পাঠানো</span>
              </div>
              <p className="font-semibold">{formatBytes(totalDataSent * 1024)}</p>
            </div>
            <div className="p-3 bg-background rounded-lg border">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">পেন্ডিং আইটেম</span>
              </div>
              <p className={`font-semibold ${pendingData > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                {pendingData} টি
              </p>
            </div>
            <div className="p-3 bg-background rounded-lg border">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">সিঙ্ক সম্পন্ন</span>
              </div>
              <p className="font-semibold text-green-600">{syncedData} টি</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate header
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <motion.div 
      className="space-y-6 bg-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Network & Sync Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <NetworkSyncStatus />
      </motion.div>

      {/* Header */}
      <div ref={headerRef}>
        <motion.h1 
          className="text-3xl font-bold tracking-tight"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ড্যাশবোর্ড
        </motion.h1>
        <motion.p 
          className="text-muted-foreground mt-2"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          আপনার ব্যবসার সম্পূর্ণ তথ্য এক নজরে
        </motion.p>
      </div>

      {/* Quick Stats Cards */}
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name_en}
            variants={staggerItem}
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border-2 hover:border-primary/20">
              <CardContent className="p-0">
                <motion.div 
                  className={`${stat.bgColor} p-4`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {stat.name}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-bold">{stat.value}</h3>
                      </div>
                      <motion.div 
                        className={`flex items-center gap-1 mt-2 text-xs font-medium ${stat.urgent ? 'text-orange-600' : 'text-green-600'}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        {stat.urgent ? (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <AlertCircle className="h-3 w-3" />
                          </motion.div>
                        ) : (
                          <TrendingUp className="h-3 w-3" />
                        )}
                        <span>{stat.change}</span>
                      </motion.div>
                    </div>
                    <motion.div 
                      className={`${stat.color} opacity-80`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 0.3 + index * 0.1, 
                        duration: 0.6,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <stat.icon className="h-12 w-12" />
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Sales Chart */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <CardTitle>সেলস গ্রাফ</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">শেষ ৭ দিনের বিক্রয়</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Tabs defaultValue="week" className="w-auto">
                  <TabsList>
                    <TabsTrigger value="today">আজ</TabsTrigger>
                    <TabsTrigger value="week">সপ্তাহ</TabsTrigger>
                    <TabsTrigger value="month">মাস</TabsTrigger>
                  </TabsList>
                </Tabs>
              </motion.div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.08 }}
                >
                  <div className="w-12 text-sm font-medium text-muted-foreground">
                    {data.day}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <AnimatedProgress 
                        value={(data.sales / maxSales) * 100} 
                        className="h-8"
                        barClassName="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                      />
                      <motion.span 
                        className="text-sm font-semibold min-w-[80px] text-right"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.08 }}
                      >
                        ৳{data.sales.toLocaleString('bn-BD')}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="mt-6 pt-4 border-t"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">সপ্তাহের মোট বিক্রয়</span>
                <motion.span 
                  className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
                >
                  ৳৪১,১০০
                </motion.span>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>সাম্প্রতিক অর্ডার</CardTitle>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm">সব দেখুন</Button>
                </motion.div>
              </div>
            </CardHeader>
            <CardContent>
              <AnimatedList className="space-y-3">
                {recentOrders.map((order, idx) => {
                  const statusInfo = getStatusInfo(order.status);
                  return (
                    <motion.div 
                      key={order.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      whileHover={{ 
                        x: 5, 
                        backgroundColor: 'rgba(59, 130, 246, 0.05)',
                        transition: { duration: 0.2 }
                      }}
                      className="flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer"
                    >
                      <motion.div 
                        className={`p-2 rounded-lg ${statusInfo.color} bg-opacity-10`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <statusInfo.icon className={`h-5 w-5 ${statusInfo.color}`} />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm">{order.id}</p>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8 + idx * 0.1, type: "spring" }}
                          >
                            <Badge variant={statusInfo.variant} className="text-xs">
                              {statusInfo.label}
                            </Badge>
                          </motion.div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{order.customer} • {order.product}</p>
                        <p className="text-xs text-muted-foreground mt-1">{order.time}</p>
                      </div>
                      <motion.div 
                        className="text-right"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 + idx * 0.1 }}
                      >
                        <p className="font-bold text-sm">{order.amount}</p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatedList>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pending Messages */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <MessageSquare className="h-5 w-5" />
                  </motion.div>
                  নতুন মেসেজ
                </CardTitle>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
                >
                  <Badge variant="destructive" className="animate-pulse">
                    {pendingMessages.filter(m => m.unread).length}
                  </Badge>
                </motion.div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingMessages.map((msg, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${msg.unread ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <motion.div 
                        className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 + idx * 0.1, type: "spring" }}
                      >
                        {msg.customer.charAt(0)}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm">{msg.customer}</p>
                          {msg.unread && (
                            <motion.div 
                              className="h-2 w-2 rounded-full bg-blue-600"
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{msg.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="w-full" variant="outline">
                    সব মেসেজ দেখুন
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Low Stock Alert */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Card className="border-orange-200 dark:border-orange-900 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </motion.div>
              <CardTitle className="text-orange-600">লো স্টক সতর্কতা</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {lowStockProducts.map((product, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: 'rgba(251, 146, 60, 0.1)',
                    transition: { duration: 0.2 }
                  }}
                  className="flex items-center gap-4 p-3 rounded-lg border bg-orange-50 dark:bg-orange-950/20 cursor-pointer"
                >
                  <motion.img 
                    src={product.image} 
                    alt={product.name}
                    className="h-12 w-12 rounded-lg object-cover"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 + idx * 0.1, type: "spring" }}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{product.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <AnimatedProgress 
                        value={(product.stock / product.minStock) * 100} 
                        className="h-2 flex-1"
                        barClassName="bg-gradient-to-r from-orange-400 to-red-500"
                      />
                      <motion.span 
                        className="text-xs text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + idx * 0.1 }}
                      >
                        {product.stock}/{product.minStock}
                      </motion.span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="sm" variant="outline" className="hover:bg-orange-100 hover:border-orange-300">
                      স্টক যোগ করুন
                    </Button>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950/50 dark:to-slate-950/50">
            <CardTitle>দ্রুত অ্যাকশন</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <motion.div 
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { 
                  icon: ShoppingCart, 
                  label: 'POS সিস্টেম', 
                  gradient: 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
                  iconBg: 'bg-white/20',
                  href: '/dashboard/pos',
                  isNew: true
                },
                { 
                  icon: Plus, 
                  label: 'নতুন পণ্য যোগ করুন', 
                  iconBg: 'bg-blue-100 dark:bg-blue-950',
                  iconColor: 'text-blue-600'
                },
                { 
                  icon: FileText, 
                  label: 'নতুন পোস্ট তৈরি করুন', 
                  iconBg: 'bg-green-100 dark:bg-green-950',
                  iconColor: 'text-green-600'
                },
                { 
                  icon: Phone, 
                  label: 'কাস্টমার সাপোর্ট', 
                  iconBg: 'bg-purple-100 dark:bg-purple-950',
                  iconColor: 'text-purple-600'
                },
                { 
                  icon: BarChart, 
                  label: 'সম্পূর্ণ রিপোর্ট দেখুন', 
                  iconBg: 'bg-orange-100 dark:bg-orange-950',
                  iconColor: 'text-orange-600'
                },
              ].map((action, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    className={`h-auto flex flex-col gap-2 py-6 w-full transition-all duration-300 ${
                      action.gradient 
                        ? `bg-gradient-to-br ${action.gradient} text-white shadow-lg hover:shadow-xl` 
                        : 'hover:shadow-lg hover:border-primary/30'
                    }`}
                    variant={action.gradient ? 'default' : 'outline'}
                    onClick={action.href ? () => window.location.href = action.href : undefined}
                  >
                    <motion.div 
                      className={`h-12 w-12 rounded-full ${action.iconBg} flex items-center justify-center`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 1 + idx * 0.1, type: "spring", stiffness: 200 }}
                    >
                      <action.icon className={`h-6 w-6 ${action.iconColor || ''}`} />
                    </motion.div>
                    <span className="font-semibold">{action.label}</span>
                    {action.isNew && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.3, type: "spring" }}
                      >
                        <Badge variant="secondary" className="text-xs animate-pulse">নতুন</Badge>
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}