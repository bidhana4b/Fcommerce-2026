import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Users, Package, Download, Calendar, Eye, MousePointerClick, Facebook, Instagram, Globe, ArrowUpRight, ArrowDownRight, Target, Zap, TrendingDown, Filter, RefreshCw, Clock, ThumbsUp, MessageCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const salesData = [
  { month: "জানুয়ারি", sales: 45600, orders: 124 },
  { month: "ফেব্রুয়ারি", sales: 52300, orders: 142 },
  { month: "মার্চ", sales: 48900, orders: 135 },
  { month: "এপ্রিল", sales: 61200, orders: 168 },
  { month: "মে", sales: 58700, orders: 159 },
  { month: "জুন", sales: 67400, orders: 184 },
];

const topProducts = [
  { name: "স্মার্টফোন কেস", sales: 145, revenue: 50750 },
  { name: "হ্যান্ডব্যাগ", sales: 98, revenue: 117600 },
  { name: "টি-শার্ট", sales: 234, revenue: 105300 },
  { name: "কসমেটিক্স সেট", sales: 76, revenue: 60800 },
  { name: "স্পোর্টস শুজ", sales: 45, revenue: 112500 },
];

const topCustomers = [
  { name: "সালমা খাতুন", orders: 12, spent: 15600 },
  { name: "জাহিদ ইসলাম", orders: 8, spent: 12400 },
  { name: "রহিম আহমেদ", orders: 5, spent: 4500 },
  { name: "করিম মিয়া", orders: 3, spent: 2100 },
];

// Traffic Sources Data
const trafficSources = [
  { source: "Facebook", visits: 2450, orders: 145, revenue: 87600, conversion: 5.9, color: "blue" },
  { source: "Instagram", visits: 1820, orders: 98, revenue: 62400, conversion: 5.4, color: "pink" },
  { source: "WhatsApp", visits: 980, orders: 67, revenue: 45200, conversion: 6.8, color: "green" },
  { source: "Direct", visits: 650, orders: 42, revenue: 28900, conversion: 6.5, color: "purple" },
  { source: "Google", visits: 420, orders: 18, revenue: 12300, conversion: 4.3, color: "orange" },
];

// Category Performance
const categoryPerformance = [
  { name: "ফ্যাশন", sales: 145600, orders: 342, growth: 18, trending: "up" },
  { name: "ইলেকট্রনিক্স", sales: 98400, orders: 156, growth: 12, trending: "up" },
  { name: "বিউটি", sales: 76200, orders: 234, growth: -5, trending: "down" },
  { name: "এক্সেসরিজ", sales: 54800, orders: 189, growth: 8, trending: "up" },
];

// Revenue Forecast
const revenueForecast = [
  { month: "জুলাই", actual: 67400, forecast: 72000 },
  { month: "আগস্ট", actual: null, forecast: 78500 },
  { month: "সেপ্টেম্বর", actual: null, forecast: 85200 },
  { month: "অক্টোবর", actual: null, forecast: 92800 },
];

// Customer Lifetime Value
const clvData = [
  { segment: "VIP", customers: 45, avgValue: 15600, totalValue: 702000 },
  { segment: "Regular", customers: 128, avgValue: 4500, totalValue: 576000 },
  { segment: "New", customers: 234, avgValue: 1200, totalValue: 280800 },
];

// Channel Funnel Data
const channelFunnelData = [
  {
    channel: "Facebook",
    impressions: 45000,
    clicks: 2450,
    chats: 456,
    orders: 145,
    revenue: 87600,
    icon: Facebook,
    color: "blue",
  },
  {
    channel: "Instagram", 
    impressions: 32000,
    clicks: 1820,
    chats: 312,
    orders: 98,
    revenue: 62400,
    icon: Instagram,
    color: "pink",
  },
  {
    channel: "WhatsApp",
    impressions: 15000,
    clicks: 980,
    chats: 234,
    orders: 67,
    revenue: 45200,
    icon: MessageCircle,
    color: "green",
  },
  {
    channel: "Website",
    impressions: 12000,
    clicks: 650,
    chats: 89,
    orders: 42,
    revenue: 28900,
    icon: Globe,
    color: "purple",
  },
];

// Response Time & CSAT by Channel
const channelPerformanceMetrics = [
  {
    channel: "Facebook",
    avgResponseTime: "2.5 মিনিট",
    responseTimeMinutes: 2.5,
    csat: 4.5,
    totalChats: 456,
    icon: Facebook,
    color: "blue",
  },
  {
    channel: "Instagram",
    avgResponseTime: "3.2 মিনিট",
    responseTimeMinutes: 3.2,
    csat: 4.3,
    totalChats: 312,
    icon: Instagram,
    color: "pink",
  },
  {
    channel: "WhatsApp",
    avgResponseTime: "1.8 মিনিট",
    responseTimeMinutes: 1.8,
    csat: 4.8,
    totalChats: 234,
    icon: MessageCircle,
    color: "green",
  },
  {
    channel: "Website",
    avgResponseTime: "4.5 মিনিট",
    responseTimeMinutes: 4.5,
    csat: 4.0,
    totalChats: 89,
    icon: Globe,
    color: "purple",
  },
];

export default function Analytics() {
  const [dateRange, setDateRange] = useState("30days");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = Math.round(totalSales / totalOrders);

  const totalTraffic = trafficSources.reduce((sum, s) => sum + s.visits, 0);
  const totalConversions = trafficSources.reduce((sum, s) => sum + s.orders, 0);
  const avgConversionRate = (totalConversions / totalTraffic * 100).toFixed(1);

  return (
    <div className="space-y-6 bg-background">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-header">অ্যানালিটিক্স ও রিপোর্ট</h1>
          <p className="text-muted-foreground mt-2">আপনার ব্যবসার পারফরম্যান্স বিশ্লেষণ করুন</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">শেষ ৭ দিন</SelectItem>
              <SelectItem value="30days">শেষ ৩০ দিন</SelectItem>
              <SelectItem value="90days">শেষ ৯০ দিন</SelectItem>
              <SelectItem value="year">এই বছর</SelectItem>
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

      {/* Main Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">ওভারভিউ</TabsTrigger>
          <TabsTrigger value="traffic">ট্রাফিক</TabsTrigger>
          <TabsTrigger value="funnel">চ্যানেল ফানেল</TabsTrigger>
          <TabsTrigger value="products">পণ্য</TabsTrigger>
          <TabsTrigger value="customers">কাস্টমার</TabsTrigger>
          <TabsTrigger value="forecast">ফোরকাস্ট</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-soft hover:shadow-hover transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">মোট বিক্রয়</CardTitle>
                <DollarSign className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৳{totalSales.toLocaleString()}</div>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +১৮% গত মাস থেকে
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-hover transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">মোট অর্ডার</CardTitle>
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +১২% গত মাস থেকে
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-hover transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">গড় অর্ডার মূল্য</CardTitle>
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৳{avgOrderValue}</div>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +৫% গত মাস থেকে
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-hover transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">কনভার্শন রেট</CardTitle>
                <Users className="h-5 w-5 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৩.৮%</div>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +০.৫% গত মাস থেকে
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sales Chart */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>বিক্রয় ট্রেন্ড</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesData.map((item, index) => {
                  const maxSales = Math.max(...salesData.map(d => d.sales));
                  const percentage = (item.sales / maxSales) * 100;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground">{item.orders} অর্ডার</span>
                          <span className="font-semibold text-primary">৳{item.sales.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-3">
                        <div 
                          className="bg-primary rounded-full h-3 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Category Performance */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                ক্যাটাগরি পারফরম্যান্স
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryPerformance.map((category, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{category.name}</span>
                        <Badge variant={category.trending === "up" ? "default" : "destructive"} className="gap-1">
                          {category.trending === "up" ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          {Math.abs(category.growth)}%
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">৳{category.sales.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{category.orders} অর্ডার</p>
                      </div>
                    </div>
                    <Progress value={(category.sales / 145600) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                সেরা বিক্রিত পণ্য
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} বিক্রয়</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">৳{product.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Customers */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                সেরা কাস্টমার
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">{customer.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.orders} অর্ডার</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">৳{customer.spent.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Traffic Sources Tab */}
        <TabsContent value="traffic" className="space-y-6">
          {/* Traffic Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">মোট ভিজিট</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTraffic.toLocaleString()}</div>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +২৪% গত মাস থেকে
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">কনভার্সন</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalConversions}</div>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +১৮% গত মাস থেকে
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">কনভার্সন রেট</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{avgConversionRate}%</div>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +০.৮% গত মাস থেকে
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">বাউন্স রেট</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">32.5%</div>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  -৩.২% গত মাস থেকে
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Traffic Sources Breakdown */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                ট্রাফিক সোর্স বিশ্লেষণ
              </CardTitle>
              <CardDescription>কোন চ্যানেল থেকে বেশি ট্রাফিক আসছে</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {trafficSources.map((source, idx) => {
                  const Icon = source.source === "Facebook" ? Facebook : 
                              source.source === "Instagram" ? Instagram :
                              source.source === "WhatsApp" ? MousePointerClick :
                              source.source === "Google" ? Globe : Eye;
                  
                  return (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-lg bg-${source.color}-100 dark:bg-${source.color}-900/20 flex items-center justify-center`}>
                            <Icon className={`h-5 w-5 text-${source.color}-600`} />
                          </div>
                          <div>
                            <p className="font-semibold">{source.source}</p>
                            <p className="text-sm text-muted-foreground">{source.visits.toLocaleString()} ভিজিট</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">৳{source.revenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{source.orders} অর্ডার</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="p-2 bg-muted rounded-lg">
                          <p className="text-xs text-muted-foreground">কনভার্সন রেট</p>
                          <p className="font-bold text-green-600">{source.conversion}%</p>
                        </div>
                        <div className="p-2 bg-muted rounded-lg">
                          <p className="text-xs text-muted-foreground">গড় অর্ডার</p>
                          <p className="font-bold">৳{Math.round(source.revenue / source.orders)}</p>
                        </div>
                        <div className="p-2 bg-muted rounded-lg">
                          <p className="text-xs text-muted-foreground">ROI</p>
                          <p className="font-bold text-purple-600">3.2x</p>
                        </div>
                      </div>
                      <Progress value={(source.visits / totalTraffic) * 100} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Channel Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-base">সেরা পারফরমিং চ্যানেল</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <Facebook className="h-8 w-8 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-semibold">Facebook</p>
                      <p className="text-sm text-muted-foreground">সবচেয়ে বেশি ট্রাফিক</p>
                    </div>
                    <Badge variant="default">২৪৫০</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <MousePointerClick className="h-8 w-8 text-green-600" />
                    <div className="flex-1">
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">সেরা কনভার্সন রেট</p>
                    </div>
                    <Badge variant="default">৬.৮%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-base">উন্নতির সুযোগ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <Globe className="h-8 w-8 text-orange-600" />
                    <div className="flex-1">
                      <p className="font-semibold">Google</p>
                      <p className="text-sm text-muted-foreground">কম কনভার্সন রেট</p>
                    </div>
                    <Badge variant="outline">৪.৩%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    💡 SEO অপটিমাইজেশন করে Google ট্রাফিক বাড়ান
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Channel Funnel Tab */}
        <TabsContent value="funnel" className="space-y-6">
          {/* Funnel Overview Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">মোট ইম্প্রেশন</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {channelFunnelData.reduce((sum, c) => sum + c.impressions, 0).toLocaleString()}
                </div>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +২৮% গত মাস থেকে
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">মোট ক্লিক</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {channelFunnelData.reduce((sum, c) => sum + c.clicks, 0).toLocaleString()}
                </div>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +২২% গত মাস থেকে
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">মোট চ্যাট</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {channelFunnelData.reduce((sum, c) => sum + c.chats, 0).toLocaleString()}
                </div>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +১৮% গত মাস থেকে
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">মোট অর্ডার</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {channelFunnelData.reduce((sum, c) => sum + c.orders, 0)}
                </div>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +১৫% গত মাস থেকে
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Channel Funnel Breakdown */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                চ্যানেল ফানেল বিশ্লেষণ
              </CardTitle>
              <CardDescription>
                ইম্প্রেশন → ক্লিক → চ্যাট → অর্ডার → রেভিনিউ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {channelFunnelData.map((channel, idx) => {
                  const Icon = channel.icon;
                  const clickRate = ((channel.clicks / channel.impressions) * 100).toFixed(2);
                  const chatRate = ((channel.chats / channel.clicks) * 100).toFixed(2);
                  const orderRate = ((channel.orders / channel.chats) * 100).toFixed(2);
                  const avgOrderValue = Math.round(channel.revenue / channel.orders);

                  return (
                    <div key={idx} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-12 w-12 rounded-lg bg-${channel.color}-100 dark:bg-${channel.color}-900/20 flex items-center justify-center`}>
                            <Icon className={`h-6 w-6 text-${channel.color}-600`} />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">{channel.channel}</p>
                            <p className="text-sm text-muted-foreground">
                              মোট রেভিনিউ: ৳{channel.revenue.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="default" className="text-base px-3 py-1">
                          {channel.orders} অর্ডার
                        </Badge>
                      </div>

                      {/* Funnel Visualization */}
                      <div className="grid grid-cols-5 gap-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">ইম্প্রেশন</span>
                            <Eye className="h-3 w-3 text-muted-foreground" />
                          </div>
                          <div className="p-3 bg-muted rounded-lg text-center">
                            <p className="text-lg font-bold">{channel.impressions.toLocaleString()}</p>
                          </div>
                          <div className="h-1 w-full bg-primary rounded" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">ক্লিক</span>
                            <MousePointerClick className="h-3 w-3 text-muted-foreground" />
                          </div>
                          <div className="p-3 bg-muted rounded-lg text-center">
                            <p className="text-lg font-bold">{channel.clicks.toLocaleString()}</p>
                            <p className="text-xs text-green-600">{clickRate}%</p>
                          </div>
                          <div className="h-1 w-4/5 bg-primary rounded mx-auto" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">চ্যাট</span>
                            <MessageCircle className="h-3 w-3 text-muted-foreground" />
                          </div>
                          <div className="p-3 bg-muted rounded-lg text-center">
                            <p className="text-lg font-bold">{channel.chats}</p>
                            <p className="text-xs text-green-600">{chatRate}%</p>
                          </div>
                          <div className="h-1 w-3/5 bg-primary rounded mx-auto" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">অর্ডার</span>
                            <ShoppingCart className="h-3 w-3 text-muted-foreground" />
                          </div>
                          <div className="p-3 bg-muted rounded-lg text-center">
                            <p className="text-lg font-bold">{channel.orders}</p>
                            <p className="text-xs text-green-600">{orderRate}%</p>
                          </div>
                          <div className="h-1 w-2/5 bg-primary rounded mx-auto" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">রেভিনিউ</span>
                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                          </div>
                          <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg text-center border border-green-200 dark:border-green-800">
                            <p className="text-lg font-bold text-green-600">
                              ৳{(channel.revenue / 1000).toFixed(1)}k
                            </p>
                            <p className="text-xs text-muted-foreground">৳{avgOrderValue} AOV</p>
                          </div>
                        </div>
                      </div>

                      {idx < channelFunnelData.length - 1 && <Separator />}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Response Time & CSAT */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  চ্যানেল ভিত্তিক রেসপন্স টাইম
                </CardTitle>
                <CardDescription>গড় প্রতিক্রিয়া সময়</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channelPerformanceMetrics.map((channel, idx) => {
                    const Icon = channel.icon;
                    const maxTime = Math.max(...channelPerformanceMetrics.map(c => c.responseTimeMinutes));
                    const percentage = (channel.responseTimeMinutes / maxTime) * 100;
                    
                    return (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 text-${channel.color}-600`} />
                            <span className="font-medium">{channel.channel}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">{channel.avgResponseTime}</p>
                            <p className="text-xs text-muted-foreground">{channel.totalChats} চ্যাট</p>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`bg-${channel.color}-600 h-2 rounded-full transition-all`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator className="my-4" />

                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <p className="font-semibold text-green-900 dark:text-green-100">
                      সেরা পারফরমার
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    WhatsApp সবচেয়ে দ্রুত রেসপন্স দিচ্ছে (১.৮ মিনিট)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-primary" />
                  চ্যানেল ভিত্তিক CSAT স্কোর
                </CardTitle>
                <CardDescription>কাস্টমার স্যাটিসফ্যাকশন (৫ এর মধ্যে)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channelPerformanceMetrics.map((channel, idx) => {
                    const Icon = channel.icon;
                    const percentage = (channel.csat / 5) * 100;
                    
                    return (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 text-${channel.color}-600`} />
                            <span className="font-medium">{channel.channel}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  className={`text-lg ${
                                    star <= channel.csat
                                      ? "text-yellow-500"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <p className="font-bold text-primary">{channel.csat}</p>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg text-center">
                    <p className="text-2xl font-bold text-yellow-600">
                      {(channelPerformanceMetrics.reduce((sum, c) => sum + c.csat, 0) / channelPerformanceMetrics.length).toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">গড় CSAT</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">৪.৮</p>
                    <p className="text-xs text-muted-foreground mt-1">সর্বোচ্চ (WhatsApp)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Funnel Optimization Insights */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                ফানেল অপটিমাইজেশন সুপারিশ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <Facebook className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Facebook: ক্লিক রেট বাড়ান</p>
                    <p className="text-sm text-muted-foreground">
                      বর্তমান CTR {((channelFunnelData[0].clicks / channelFunnelData[0].impressions) * 100).toFixed(2)}% - 
                      আরও আকর্ষণীয় পোস্ট ক্রিয়েটিভ ব্যবহার করুন
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">WhatsApp: সেরা কনভার্সন</p>
                    <p className="text-sm text-muted-foreground">
                      {((channelFunnelData[2].orders / channelFunnelData[2].chats) * 100).toFixed(2)}% চ্যাট-টু-অর্ডার রেট - 
                      এই চ্যানেলে আরও ফোকাস করুন
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <Globe className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Website: রেসপন্স টাইম কমান</p>
                    <p className="text-sm text-muted-foreground">
                      ৪.৫ মিনিট গড় রেসপন্স - চ্যাটবট বা দ্রুত রিপ্লাই সেটআপ করুন
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  সেরা বিক্রিত পণ্য
                </CardTitle>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                    <SelectItem value="fashion">ফ্যাশন</SelectItem>
                    <SelectItem value="electronics">ইলেকট্রনিক্স</SelectItem>
                    <SelectItem value="beauty">বিউটি</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} বিক্রয়</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">৳{product.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          {/* Customer Lifetime Value */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                কাস্টমার লাইফটাইম ভ্যালু (CLV)
              </CardTitle>
              <CardDescription>সেগমেন্ট ভিত্তিক কাস্টমার ভ্যালু</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clvData.map((segment, idx) => (
                  <div key={idx} className="p-4 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-lg">{segment.segment} কাস্টমার</p>
                        <p className="text-sm text-muted-foreground">{segment.customers} জন</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">৳{segment.totalValue.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">মোট ভ্যালু</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-2 bg-muted rounded">
                        <p className="text-xs text-muted-foreground">গড় ভ্যালু</p>
                        <p className="font-bold">৳{segment.avgValue.toLocaleString()}</p>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <p className="text-xs text-muted-foreground">প্রতি কাস্টমার</p>
                        <p className="font-bold">৳{Math.round(segment.totalValue / segment.customers)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Customers */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                সেরা কাস্টমার
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">{customer.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.orders} অর্ডার</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">৳{customer.spent.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Forecast Tab */}
        <TabsContent value="forecast" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                রেভিনিউ ফোরকাস্ট
              </CardTitle>
              <CardDescription>AI-ভিত্তিক বিক্রয় পূর্বাভাস</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueForecast.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.month}</span>
                      <div className="flex items-center gap-4">
                        {item.actual && (
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">প্রকৃত</p>
                            <p className="font-semibold text-green-600">৳{item.actual.toLocaleString()}</p>
                          </div>
                        )}
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">পূর্বাভাস</p>
                          <p className="font-semibold text-primary">৳{item.forecast.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={(item.forecast / 92800) * 100} className="h-3" />
                      {item.actual && (
                        <div 
                          className="absolute top-0 h-3 bg-green-600 rounded-full"
                          style={{ width: `${(item.actual / 92800) * 100}%` }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-blue-50 dark:bg-blue-950/20">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-2">পরবর্তী মাস</p>
                    <p className="text-2xl font-bold text-blue-600">৳৭৮,৫০০</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +১৬% বৃদ্ধি
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 dark:bg-purple-950/20">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-2">পরবর্তী ৩ মাস</p>
                    <p className="text-2xl font-bold text-purple-600">৳২,৫৬,৫০০</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +২১% বৃদ্ধি
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 dark:bg-green-950/20">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-2">বার্ষিক লক্ষ্য</p>
                    <p className="text-2xl font-bold text-green-600">৳১০,০০,০০০</p>
                    <p className="text-xs text-muted-foreground mt-1">৬৮% সম্পন্ন</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Growth Insights */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>বৃদ্ধির সুপারিশ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Facebook মার্কেটিং বাড়ান</p>
                    <p className="text-sm text-muted-foreground">সবচেয়ে বেশি ROI দিচ্ছে (3.2x)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">VIP কাস্টমার ফোকাস করুন</p>
                    <p className="text-sm text-muted-foreground">সর্বোচ্চ CLV (৳১৫,৬০০)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <Package className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium">বিউটি ক্যাটাগরি উন্নত করুন</p>
                    <p className="text-sm text-muted-foreground">-৫% কমেছে, নতুন পণ্য যোগ করুন</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reports */}
      <Card className="shadow-soft">
        <Tabs defaultValue="daily">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>রিপোর্ট জেনারেট করুন</CardTitle>
              <TabsList>
                <TabsTrigger value="daily">দৈনিক</TabsTrigger>
                <TabsTrigger value="weekly">সাপ্তাহিক</TabsTrigger>
                <TabsTrigger value="monthly">মাসিক</TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>
          <CardContent>
            <TabsContent value="daily" className="mt-0">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-2">আজকের বিক্রয়</p>
                    <p className="text-2xl font-bold">৳২,৩৫০</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-2">আজকের অর্ডার</p>
                    <p className="text-2xl font-bold">৮</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-2">নতুন কাস্টমার</p>
                    <p className="text-2xl font-bold">৩</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="weekly" className="mt-0">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-2">এই সপ্তাহের বিক্রয়</p>
                    <p className="text-2xl font-bold">৳১৫,৬০০</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-2">এই সপ্তাহের অর্ডার</p>
                    <p className="text-2xl font-bold">৪২</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-2">নতুন কাস্টমার</p>
                    <p className="text-2xl font-bold">১২</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="monthly" className="mt-0">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-2">এই মাসের বিক্রয়</p>
                    <p className="text-2xl font-bold">৳৬৭,৪০০</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-2">এই মাসের অর্ডার</p>
                    <p className="text-2xl font-bold">১৮৪</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-2">নতুন কাস্টমার</p>
                    <p className="text-2xl font-bold">৩৮</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}