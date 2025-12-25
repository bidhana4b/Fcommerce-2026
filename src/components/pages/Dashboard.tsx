import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, TrendingUp, MessageSquare, DollarSign, AlertCircle, Clock, CheckCircle2, XCircle, Plus, FileText, Phone, BarChart, Wifi, WifiOff, RefreshCw, Server, CloudOff, Cloud, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

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
  return (
    <div className="space-y-6 bg-background">
      {/* Network & Sync Status */}
      <NetworkSyncStatus />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ড্যাশবোর্ড</h1>
        <p className="text-muted-foreground mt-2">আপনার ব্যবসার সম্পূর্ণ তথ্য এক নজরে</p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name_en} className="hover:shadow-lg transition-shadow overflow-hidden">
            <CardContent className="p-0">
              <div className={`${stat.bgColor} p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.name}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold">{stat.value}</h3>
                    </div>
                    <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${stat.urgent ? 'text-orange-600' : 'text-green-600'}`}>
                      {stat.urgent ? (
                        <AlertCircle className="h-3 w-3" />
                      ) : (
                        <TrendingUp className="h-3 w-3" />
                      )}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className={`${stat.color} opacity-80`}>
                    <stat.icon className="h-12 w-12" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>সেলস গ্রাফ</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">শেষ ৭ দিনের বিক্রয়</p>
            </div>
            <Tabs defaultValue="week" className="w-auto">
              <TabsList>
                <TabsTrigger value="today">আজ</TabsTrigger>
                <TabsTrigger value="week">সপ্তাহ</TabsTrigger>
                <TabsTrigger value="month">মাস</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesData.map((data, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-muted-foreground">
                  {data.day}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(data.sales / maxSales) * 100} 
                      className="h-8"
                    />
                    <span className="text-sm font-semibold min-w-[80px] text-right">
                      ৳{data.sales.toLocaleString('bn-BD')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">সপ্তাহের মোট বিক্রয়</span>
              <span className="text-xl font-bold">৳৪১,১০০</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>সাম্প্রতিক অর্ডার</CardTitle>
              <Button variant="ghost" size="sm">সব দেখুন</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <div key={order.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <div className={`p-2 rounded-lg ${statusInfo.color} bg-opacity-10`}>
                      <statusInfo.icon className={`h-5 w-5 ${statusInfo.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm">{order.id}</p>
                        <Badge variant={statusInfo.variant} className="text-xs">
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{order.customer} • {order.product}</p>
                      <p className="text-xs text-muted-foreground mt-1">{order.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">{order.amount}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pending Messages */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                নতুন মেসেজ
              </CardTitle>
              <Badge variant="destructive">{pendingMessages.filter(m => m.unread).length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingMessages.map((msg, idx) => (
                <div key={idx} className={`p-3 rounded-lg border hover:bg-accent transition-colors ${msg.unread ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {msg.customer.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm">{msg.customer}</p>
                        {msg.unread && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{msg.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                সব মেসেজ দেখুন
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      <Card className="border-orange-200 dark:border-orange-900">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-orange-600">লো স্টক সতর্কতা</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lowStockProducts.map((product, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-lg border bg-orange-50 dark:bg-orange-950/20">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{product.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress 
                      value={(product.stock / product.minStock) * 100} 
                      className="h-2 flex-1"
                    />
                    <span className="text-xs text-muted-foreground">
                      {product.stock}/{product.minStock}
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  স্টক যোগ করুন
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>দ্রুত অ্যাকশন</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <Button className="h-auto flex flex-col gap-2 py-6 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" onClick={() => window.location.href = '/dashboard/pos'}>
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <span className="font-semibold">POS সিস্টেম</span>
              <Badge variant="secondary" className="text-xs">নতুন</Badge>
            </Button>
            <Button className="h-auto flex flex-col gap-2 py-6" variant="outline">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-semibold">নতুন পণ্য যোগ করুন</span>
            </Button>
            <Button className="h-auto flex flex-col gap-2 py-6" variant="outline">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <span className="font-semibold">নতুন পোস্ট তৈরি করুন</span>
            </Button>
            <Button className="h-auto flex flex-col gap-2 py-6" variant="outline">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <span className="font-semibold">কাস্টমার সাপোর্ট</span>
            </Button>
            <Button className="h-auto flex flex-col gap-2 py-6" variant="outline">
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-orange-600" />
              </div>
              <span className="font-semibold">সম্পূর্ণ রিপোর্ট দেখুন</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}