import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Award,
  Clock,
  Percent,
  CreditCard,
  Truck,
  Star,
  RefreshCw,
} from "lucide-react";

interface SalesData {
  period: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
  growth: number;
}

interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
  growth: number;
}

interface TopCustomer {
  name: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
}

const salesData: SalesData[] = [
  { period: "আজ", revenue: 15600, orders: 12, avgOrderValue: 1300, growth: 15 },
  { period: "গতকাল", revenue: 12400, orders: 10, avgOrderValue: 1240, growth: -5 },
  { period: "এই সপ্তাহ", revenue: 85000, orders: 68, avgOrderValue: 1250, growth: 22 },
  { period: "গত সপ্তাহ", revenue: 72000, orders: 58, avgOrderValue: 1241, growth: 8 },
  { period: "এই মাস", revenue: 320000, orders: 245, avgOrderValue: 1306, growth: 18 },
  { period: "গত মাস", revenue: 285000, orders: 220, avgOrderValue: 1295, growth: 12 },
];

const topProducts: TopProduct[] = [
  { name: "ওয়্যারলেস ইয়ারবাড প্রো", sales: 45, revenue: 112500, growth: 25 },
  { name: "স্মার্ট ওয়াচ", sales: 32, revenue: 144000, growth: 18 },
  { name: "কটন টি-শার্ট", sales: 120, revenue: 54000, growth: 35 },
  { name: "ফেস ময়েশ্চারাইজার", sales: 65, revenue: 55250, growth: 12 },
  { name: "ডেনিম জিন্স", sales: 48, revenue: 57600, growth: -5 },
];

const topCustomers: TopCustomer[] = [
  { name: "করিম সাহেব", orders: 15, totalSpent: 45000, lastOrder: "আজ" },
  { name: "রহিম উদ্দিন", orders: 12, totalSpent: 38000, lastOrder: "গতকাল" },
  { name: "ফাতেমা বেগম", orders: 10, totalSpent: 32000, lastOrder: "২ দিন আগে" },
  { name: "আলী হোসেন", orders: 8, totalSpent: 28000, lastOrder: "৩ দিন আগে" },
  { name: "সালমা আক্তার", orders: 7, totalSpent: 24500, lastOrder: "১ সপ্তাহ আগে" },
];

const weeklyData = [
  { day: "শনি", sales: 4500 },
  { day: "রবি", sales: 6200 },
  { day: "সোম", sales: 5800 },
  { day: "মঙ্গল", sales: 7100 },
  { day: "বুধ", sales: 6500 },
  { day: "বৃহঃ", sales: 8200 },
  { day: "শুক্র", sales: 9500 },
];

const paymentMethods = [
  { method: "নগদ", amount: 125000, percentage: 45, color: "bg-green-500" },
  { method: "বিকাশ", amount: 85000, percentage: 30, color: "bg-pink-500" },
  { method: "নগদ (মোবাইল)", amount: 42000, percentage: 15, color: "bg-orange-500" },
  { method: "কার্ড", amount: 28000, percentage: 10, color: "bg-blue-500" },
];

const channelPerformance = [
  { channel: "দোকান (POS)", orders: 150, revenue: 180000, percentage: 55 },
  { channel: "Facebook", orders: 65, revenue: 78000, percentage: 24 },
  { channel: "WhatsApp", orders: 45, revenue: 52000, percentage: 16 },
  { channel: "Instagram", orders: 15, revenue: 18000, percentage: 5 },
];

export default function Reports() {
  const [dateRange, setDateRange] = useState("this-month");
  const maxSales = Math.max(...weeklyData.map((d) => d.sales));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">রিপোর্ট ও বিশ্লেষণ</h1>
          <p className="text-muted-foreground mt-1">আপনার ব্যবসার সম্পূর্ণ বিশ্লেষণ</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">আজ</SelectItem>
              <SelectItem value="yesterday">গতকাল</SelectItem>
              <SelectItem value="this-week">এই সপ্তাহ</SelectItem>
              <SelectItem value="last-week">গত সপ্তাহ</SelectItem>
              <SelectItem value="this-month">এই মাস</SelectItem>
              <SelectItem value="last-month">গত মাস</SelectItem>
              <SelectItem value="this-year">এই বছর</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            রিফ্রেশ
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            এক্সপোর্ট
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট বিক্রয়</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                  ৳{(320000).toLocaleString("bn-BD")}
                </p>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+18% গত মাসের তুলনায়</span>
                </div>
              </div>
              <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <DollarSign className="h-7 w-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট অর্ডার</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">২৪৫</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+11% গত মাসের তুলনায়</span>
                </div>
              </div>
              <div className="h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <ShoppingCart className="h-7 w-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">গড় অর্ডার মূল্য</p>
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-400">
                  ৳{(1306).toLocaleString("bn-BD")}
                </p>
                <div className="flex items-center gap-1 mt-2 text-sm text-purple-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+5% গত মাসের তুলনায়</span>
                </div>
              </div>
              <div className="h-14 w-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Target className="h-7 w-7 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">নতুন কাস্টমার</p>
                <p className="text-3xl font-bold text-orange-700 dark:text-orange-400">৪৮</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-orange-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+22% গত মাসের তুলনায়</span>
                </div>
              </div>
              <div className="h-14 w-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Users className="h-7 w-7 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">বিক্রয় বিশ্লেষণ</TabsTrigger>
          <TabsTrigger value="products">পণ্য পারফরম্যান্স</TabsTrigger>
          <TabsTrigger value="customers">কাস্টমার বিশ্লেষণ</TabsTrigger>
          <TabsTrigger value="channels">চ্যানেল পারফরম্যান্স</TabsTrigger>
          <TabsTrigger value="export">রিপোর্ট এক্সপোর্ট</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Weekly Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  সাপ্তাহিক বিক্রয়
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyData.map((data, index) => (
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
                            ৳{data.sales.toLocaleString("bn-BD")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">সপ্তাহের মোট</span>
                    <span className="text-xl font-bold">
                      ৳{weeklyData.reduce((sum, d) => sum + d.sales, 0).toLocaleString("bn-BD")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  পেমেন্ট মেথড
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{method.method}</span>
                        <span className="text-sm text-muted-foreground">
                          ৳{method.amount.toLocaleString("bn-BD")} ({method.percentage}%)
                        </span>
                      </div>
                      <Progress value={method.percentage} className={`h-2 [&>div]:${method.color}`} />
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">মোট সংগ্রহ</span>
                    <span className="text-xl font-bold">
                      ৳{paymentMethods.reduce((sum, m) => sum + m.amount, 0).toLocaleString("bn-BD")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sales Summary Table */}
          <Card>
            <CardHeader>
              <CardTitle>বিক্রয় সারসংক্ষেপ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                {salesData.map((data, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">{data.period}</p>
                    <p className="text-xl font-bold">৳{data.revenue.toLocaleString("bn-BD")}</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {data.growth >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm ${data.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {data.growth >= 0 ? "+" : ""}{data.growth}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{data.orders} অর্ডার</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Top Selling Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  সেরা বিক্রিত পণ্য
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-amber-600" : "bg-muted-foreground"
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} বিক্রয়</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">৳{product.revenue.toLocaleString("bn-BD")}</p>
                        <div className={`flex items-center gap-1 text-xs ${product.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {product.growth >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {product.growth >= 0 ? "+" : ""}{product.growth}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Performance Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  পণ্য পরিসংখ্যান
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">মোট পণ্য</p>
                    <p className="text-2xl font-bold text-green-600">১২৫</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">সক্রিয় পণ্য</p>
                    <p className="text-2xl font-bold text-blue-600">১১৮</p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">কম স্টক</p>
                    <p className="text-2xl font-bold text-yellow-600">১২</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">স্টক নেই</p>
                    <p className="text-2xl font-bold text-red-600">৫</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">ইনভেন্টরি মূল্য</span>
                    <span className="font-bold">৳৮,৫০,০০০</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">গড় মার্জিন</span>
                    <span className="font-bold text-green-600">৩২%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Top Customers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  সেরা কাস্টমার
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCustomers.map((customer, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.orders} অর্ডার • {customer.lastOrder}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">৳{customer.totalSpent.toLocaleString("bn-BD")}</p>
                        <Badge variant="secondary" className="text-xs">VIP</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  কাস্টমার পরিসংখ্যান
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">মোট কাস্টমার</p>
                    <p className="text-2xl font-bold text-blue-600">৫৮৫</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">নতুন (এই মাস)</p>
                    <p className="text-2xl font-bold text-green-600">৪৮</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">রিপিট কাস্টমার</p>
                    <p className="text-2xl font-bold text-purple-600">৬৫%</p>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">গড় LTV</p>
                    <p className="text-2xl font-bold text-orange-600">৳৮,৫০০</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">কাস্টমার সন্তুষ্টি</span>
                    <span className="font-bold text-green-600">৪.৫/৫.০</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>চ্যানেল পারফরম্যান্স</CardTitle>
              <CardDescription>বিভিন্ন বিক্রয় চ্যানেলের তুলনামূলক বিশ্লেষণ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {channelPerformance.map((channel, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          index === 0 ? "bg-purple-100 text-purple-600" :
                          index === 1 ? "bg-blue-100 text-blue-600" :
                          index === 2 ? "bg-green-100 text-green-600" :
                          "bg-pink-100 text-pink-600"
                        }`}>
                          {index === 0 ? <ShoppingCart className="h-5 w-5" /> :
                           index === 1 ? <Users className="h-5 w-5" /> :
                           index === 2 ? <Truck className="h-5 w-5" /> :
                           <Star className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-medium">{channel.channel}</p>
                          <p className="text-sm text-muted-foreground">{channel.orders} অর্ডার</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">৳{channel.revenue.toLocaleString("bn-BD")}</p>
                        <p className="text-sm text-muted-foreground">{channel.percentage}%</p>
                      </div>
                    </div>
                    <Progress value={channel.percentage} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <FileSpreadsheet className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <h3 className="font-semibold mb-2">বিক্রয় রিপোর্ট</h3>
                <p className="text-sm text-muted-foreground mb-4">সম্পূর্ণ বিক্রয় ডেটা Excel ফরম্যাটে</p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  ডাউনলোড Excel
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 mx-auto text-red-600 mb-4" />
                <h3 className="font-semibold mb-2">ইনভয়েস রিপোর্ট</h3>
                <p className="text-sm text-muted-foreground mb-4">সব ইনভয়েস PDF ফরম্যাটে</p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  ডাউনলোড PDF
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <Package className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">ইনভেন্টরি রিপোর্ট</h3>
                <p className="text-sm text-muted-foreground mb-4">স্টক ও ইনভেন্টরি ডেটা</p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  ডাউনলোড Excel
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <h3 className="font-semibold mb-2">কাস্টমার রিপোর্ট</h3>
                <p className="text-sm text-muted-foreground mb-4">কাস্টমার ডেটা ও বিশ্লেষণ</p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  ডাউনলোড Excel
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <CreditCard className="h-12 w-12 mx-auto text-orange-600 mb-4" />
                <h3 className="font-semibold mb-2">পেমেন্ট রিপোর্ট</h3>
                <p className="text-sm text-muted-foreground mb-4">পেমেন্ট ট্রানজেকশন ডেটা</p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  ডাউনলোড Excel
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <Printer className="h-12 w-12 mx-auto text-gray-600 mb-4" />
                <h3 className="font-semibold mb-2">প্রিন্ট রিপোর্ট</h3>
                <p className="text-sm text-muted-foreground mb-4">সরাসরি প্রিন্ট করুন</p>
                <Button variant="outline" className="w-full">
                  <Printer className="h-4 w-4 mr-2" />
                  প্রিন্ট
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
