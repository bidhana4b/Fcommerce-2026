import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Store,
  DollarSign,
  TrendingUp,
  Activity,
  ShoppingBag,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  {
    name: "মোট ব্যবহারকারী",
    value: "১,২৫৪",
    change: "+১২%",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    name: "সক্রিয় স্টোর",
    value: "৮৯৫",
    change: "+৮%",
    icon: Store,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    name: "মোট রাজস্ব",
    value: "৳১২,৪৫,০০০",
    change: "+২৫%",
    icon: DollarSign,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
  {
    name: "আজকের অর্ডার",
    value: "৩৫৬",
    change: "+১৮%",
    icon: ShoppingBag,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
  },
];

const recentActivities = [
  {
    user: "করিম মিয়া",
    action: "নতুন স্টোর তৈরি করেছেন",
    time: "৫ মিনিট আগে",
    type: "store",
  },
  {
    user: "রহিমা বেগম",
    action: "প্রিমিয়াম প্ল্যানে আপগ্রেড করেছেন",
    time: "১৫ মিনিট আগে",
    type: "upgrade",
  },
  {
    user: "জামাল হোসেন",
    action: "সাপোর্ট টিকেট খুলেছেন",
    time: "৩০ মিনিট আগে",
    type: "support",
  },
  {
    user: "সালমা খাতুন",
    action: "নতুন রেজিস্ট্রেশন সম্পন্ন করেছেন",
    time: "১ ঘন্টা আগে",
    type: "registration",
  },
];

const topStores = [
  { name: "রহিম ট্রেডার্স", revenue: "৳৮৫,০০০", orders: 245, growth: "+৩২%" },
  {
    name: "করিম এন্টারপ্রাইজ",
    revenue: "৳৭২,০০০",
    orders: 198,
    growth: "+২৮%",
  },
  { name: "সালমা ফ্যাশন", revenue: "৳৬৫,০০০", orders: 176, growth: "+২৪%" },
  { name: "জামাল স্টোর", revenue: "৳৫৮,০০০", orders: 154, growth: "+২০%" },
];

export default function AdminDashboard() {
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
            <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            অ্যাডমিন ড্যাশবোর্ড
          </h1>
          <p className="text-muted-foreground mt-2">
            প্ল্যাটফর্মের সম্পূর্ণ তথ্য এক নজরে
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Activity className="h-4 w-4" />
            রিপোর্ট দেখুন
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
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-bold">{stat.value}</h3>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs font-medium text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        <span>{stat.change}</span>
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
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                সাম্প্রতিক কার্যক্রম
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`
                        ${activity.type === "store" ? "border-green-500 text-green-600" : ""}
                        ${activity.type === "upgrade" ? "border-purple-500 text-purple-600" : ""}
                        ${activity.type === "support" ? "border-orange-500 text-orange-600" : ""}
                        ${activity.type === "registration" ? "border-blue-500 text-blue-600" : ""}
                      `}
                    >
                      {activity.type === "store" && "স্টোর"}
                      {activity.type === "upgrade" && "আপগ্রেড"}
                      {activity.type === "support" && "সাপোর্ট"}
                      {activity.type === "registration" && "নতুন"}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Stores */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                শীর্ষ স্টোর
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topStores.map((store, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{store.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {store.orders} অর্ডার
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{store.revenue}</p>
                        <Badge
                          variant="outline"
                          className="border-green-500 text-green-600"
                        >
                          {store.growth}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={85 - index * 10} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Platform Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              প্ল্যাটফর্ম স্বাস্থ্য
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">সার্ভার আপটাইম</span>
                  <span className="text-sm font-bold text-green-600">
                    ৯৯.৯%
                  </span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    ব্যবহারকারী সন্তুষ্টি
                  </span>
                  <span className="text-sm font-bold text-blue-600">৯৫%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    সিস্টেম পারফরম্যান্স
                  </span>
                  <span className="text-sm font-bold text-purple-600">৯৭%</span>
                </div>
                <Progress value={97} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
