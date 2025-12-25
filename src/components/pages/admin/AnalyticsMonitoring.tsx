import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Activity,
  ArrowUp,
  ArrowDown,
  Download,
  Calendar,
  Eye,
  MousePointer,
  Clock,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stats = [
  {
    name: "মোট ব্যবহারকারী",
    value: "১,২৫৪",
    change: "+১২%",
    trend: "up",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    name: "মোট অর্ডার",
    value: "৮,৯৫৬",
    change: "+১৮%",
    trend: "up",
    icon: ShoppingBag,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    name: "মোট রাজস্ব",
    value: "৳৪৫,৬৭,০০০",
    change: "+২৫%",
    trend: "up",
    icon: DollarSign,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
  {
    name: "সক্রিয় স্টোর",
    value: "৮৯৫",
    change: "+৮%",
    trend: "up",
    icon: Activity,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
  },
];

const trafficSources = [
  { name: "Facebook", visitors: "৩,৫৬৮", percentage: 45, color: "bg-blue-500" },
  {
    name: "Instagram",
    visitors: "২,৮৯০",
    percentage: 35,
    color: "bg-pink-500",
  },
  {
    name: "WhatsApp",
    visitors: "১,২৩৪",
    percentage: 15,
    color: "bg-green-500",
  },
  { name: "Direct", visitors: "৪৫৬", percentage: 5, color: "bg-slate-500" },
];

const topProducts = [
  {
    name: "স্মার্টফোন",
    sales: "৫৬৮",
    revenue: "৳১২,৫০,০০০",
    growth: "+৩২%",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80",
  },
  {
    name: "ল্যাপটপ",
    sales: "৩৪২",
    revenue: "৳৮,৭৫,০০০",
    growth: "+২৮%",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&q=80",
  },
  {
    name: "হেডফোন",
    sales: "৭৮৯",
    revenue: "৳৬,৫০,০০০",
    growth: "+২৪%",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80",
  },
  {
    name: "স্মার্টওয়াচ",
    sales: "৪৫৬",
    revenue: "৳৫,২০,০০০",
    growth: "+২০%",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80",
  },
];

const recentActivities = [
  {
    action: "নতুন অর্ডার",
    user: "করিম মিয়া",
    amount: "৳২,৫০০",
    time: "২ মিনিট আগে",
    type: "order",
  },
  {
    action: "নতুন রেজিস্ট্রেশন",
    user: "রহিমা বেগম",
    amount: "-",
    time: "৫ মিনিট আগে",
    type: "user",
  },
  {
    action: "পেমেন্ট সম্পন্ন",
    user: "জামাল হোসেন",
    amount: "৳৩,৮০০",
    time: "১০ মিনিট আগে",
    type: "payment",
  },
  {
    action: "স্টোর তৈরি",
    user: "সালমা খাতুন",
    amount: "-",
    time: "১৫ মিনিট আগে",
    type: "store",
  },
];

const performanceMetrics = [
  { name: "পেজ লোড টাইম", value: "১.২ সেকেন্ড", status: "good", progress: 85 },
  {
    name: "সার্ভার রেসপন্স",
    value: "০.৮ সেকেন্ড",
    status: "good",
    progress: 90,
  },
  { name: "API কল সাকসেস", value: "৯৮.৫%", status: "good", progress: 98.5 },
  {
    name: "ডাটাবেস কুয়েরি",
    value: "০.৩ সেকেন্ড",
    status: "good",
    progress: 95,
  },
];

export default function AnalyticsMonitoring() {
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
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            অ্যানালিটিক্স ও মনিটরিং
          </h1>
          <p className="text-muted-foreground mt-2">
            প্ল্যাটফর্মের সম্পূর্ণ পারফরম্যান্স ও ডেটা বিশ্লেষণ
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            তারিখ নির্বাচন
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
            <Download className="h-4 w-4" />
            রিপোর্ট ডাউনলোড
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className={`${stat.bgColor} p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {stat.name}
                      </p>
                      <h3 className="text-3xl font-bold">{stat.value}</h3>
                      <div className="flex items-center gap-1 mt-2">
                        {stat.trend === "up" ? (
                          <ArrowUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-600" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            stat.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                    >
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="h-5 w-5" />
                ট্রাফিক সোর্স
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <motion.div
                    key={source.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-3 w-3 rounded-full ${source.color}`}
                        />
                        <span className="font-medium">{source.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          {source.visitors} ভিজিটর
                        </span>
                        <span className="font-bold">{source.percentage}%</span>
                      </div>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                শীর্ষ পণ্য
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.sales} বিক্রয়
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{product.revenue}</p>
                      <Badge
                        variant="outline"
                        className="border-green-500 text-green-600"
                      >
                        {product.growth}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activities & Performance */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                সাম্প্রতিক কার্যক্রম
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        activity.type === "order"
                          ? "bg-blue-100 text-blue-600"
                          : activity.type === "user"
                            ? "bg-green-100 text-green-600"
                            : activity.type === "payment"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {activity.type === "order" && (
                        <ShoppingBag className="h-5 w-5" />
                      )}
                      {activity.type === "user" && (
                        <Users className="h-5 w-5" />
                      )}
                      {activity.type === "payment" && (
                        <DollarSign className="h-5 w-5" />
                      )}
                      {activity.type === "store" && (
                        <Activity className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.user}
                      </p>
                    </div>
                    <div className="text-right">
                      {activity.amount !== "-" && (
                        <p className="font-bold text-sm">{activity.amount}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                পারফরম্যান্স মেট্রিক্স
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">
                          {metric.value}
                        </span>
                        <Badge
                          variant="outline"
                          className="border-green-500 text-green-600"
                        >
                          ভালো
                        </Badge>
                      </div>
                    </div>
                    <Progress value={metric.progress} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
