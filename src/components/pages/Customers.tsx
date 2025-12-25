import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Users,
  Search,
  Eye,
  MessageSquare,
  ShoppingBag,
  TrendingUp,
  Star,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Filter,
  Download,
  UserPlus,
  Facebook,
  Instagram,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  avatar?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  channel: "facebook" | "instagram" | "whatsapp" | "website";
  segment: "vip" | "regular" | "new";
  tags: string[];
  firstTouchChannel: "facebook" | "instagram" | "whatsapp" | "website";
  lastTouchChannel: "facebook" | "instagram" | "whatsapp" | "website";
  channelAffinityScore: number;
  channelInteractions: {
    facebook: number;
    instagram: number;
    whatsapp: number;
    website: number;
  };
}

export default function Customers() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "CUST-001",
      name: "করিম মিয়া",
      phone: "০১৭১২৩৪৫৬৭৮",
      email: "karim@example.com",
      address: "ঢাকা, বাংলাদেশ",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karim",
      totalOrders: 15,
      totalSpent: 45000,
      lastOrderDate: "2024-01-20",
      channel: "facebook",
      segment: "vip",
      tags: ["নিয়মিত", "উচ্চ মূল্য"],
      firstTouchChannel: "facebook",
      lastTouchChannel: "whatsapp",
      channelAffinityScore: 92,
      channelInteractions: {
        facebook: 45,
        instagram: 12,
        whatsapp: 38,
        website: 5,
      },
    },
    {
      id: "CUST-002",
      name: "রহিমা বেগম",
      phone: "০১৮১২৩৪৫৬৭৮",
      email: "rahima@example.com",
      address: "চট্টগ্রাম, বাংলাদেশ",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahima",
      totalOrders: 8,
      totalSpent: 12000,
      lastOrderDate: "2024-01-19",
      channel: "instagram",
      segment: "regular",
      tags: ["নিয়মিত"],
      firstTouchChannel: "instagram",
      lastTouchChannel: "instagram",
      channelAffinityScore: 78,
      channelInteractions: {
        facebook: 5,
        instagram: 28,
        whatsapp: 10,
        website: 2,
      },
    },
    {
      id: "CUST-003",
      name: "জামাল হোসেন",
      phone: "০১৯১২৩৪৫৬৭৮",
      address: "সিলেট, বাংলাদেশ",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jamal",
      totalOrders: 2,
      totalSpent: 3000,
      lastOrderDate: "2024-01-18",
      channel: "whatsapp",
      segment: "new",
      tags: ["নতুন"],
      firstTouchChannel: "whatsapp",
      lastTouchChannel: "whatsapp",
      channelAffinityScore: 65,
      channelInteractions: {
        facebook: 0,
        instagram: 0,
        whatsapp: 8,
        website: 1,
      },
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const segmentConfig = {
    vip: {
      label: "VIP",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
      textColor: "text-yellow-600",
    },
    regular: {
      label: "নিয়মিত",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      textColor: "text-blue-600",
    },
    new: {
      label: "নতুন",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      textColor: "text-green-600",
    },
  };

  const channelConfig = {
    facebook: { label: "Facebook", icon: Facebook, color: "text-blue-600" },
    instagram: { label: "Instagram", icon: Instagram, color: "text-pink-600" },
    whatsapp: {
      label: "WhatsApp",
      icon: MessageSquare,
      color: "text-green-600",
    },
    website: { label: "Website", icon: ShoppingBag, color: "text-purple-600" },
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    const matchesSegment =
      selectedSegment === "all" || customer.segment === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  const stats = {
    total: customers.length,
    vip: customers.filter((c) => c.segment === "vip").length,
    regular: customers.filter((c) => c.segment === "regular").length,
    new: customers.filter((c) => c.segment === "new").length,
    avgSpent: Math.round(
      customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length,
    ),
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="h-12 w-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            কাস্টমার ম্যানেজমেন্ট
          </h1>
          <p className="text-muted-foreground mt-1">
            আপনার সব কাস্টমার এক জায়গায়
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            এক্সপোর্ট
          </Button>
          <Button className="bg-gradient-to-r from-primary to-purple-600 gap-2">
            <UserPlus className="h-4 w-4" />
            নতুন কাস্টমার
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            label: "মোট কাস্টমার",
            value: stats.total,
            icon: Users,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "VIP কাস্টমার",
            value: stats.vip,
            icon: Star,
            color: "from-yellow-500 to-orange-500",
          },
          {
            label: "নিয়মিত",
            value: stats.regular,
            icon: Users,
            color: "from-blue-500 to-indigo-500",
          },
          {
            label: "নতুন",
            value: stats.new,
            icon: UserPlus,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "গড় খরচ",
            value: `৳${stats.avgSpent.toLocaleString()}`,
            icon: TrendingUp,
            color: "from-purple-500 to-pink-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="নাম বা ফোন নম্বর খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedSegment}
                onValueChange={setSelectedSegment}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="সেগমেন্ট" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব সেগমেন্ট</SelectItem>
                  {Object.entries(segmentConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Customers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>কাস্টমার তালিকা</CardTitle>
            <CardDescription>
              {filteredCustomers.length} জন কাস্টমার পাওয়া গেছে
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>কাস্টমার</TableHead>
                    <TableHead>যোগাযোগ</TableHead>
                    <TableHead>চ্যানেল</TableHead>
                    <TableHead>অর্ডার</TableHead>
                    <TableHead>মোট খরচ</TableHead>
                    <TableHead>সেগমেন্ট</TableHead>
                    <TableHead>শেষ অর্ডার</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredCustomers.map((customer, index) => {
                      const ChannelIcon = channelConfig[customer.channel].icon;
                      return (
                        <motion.tr
                          key={customer.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-muted/50 transition-colors"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={customer.avatar} />
                                <AvatarFallback>
                                  {customer.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{customer.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {customer.id}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                {customer.phone}
                              </div>
                              {customer.email && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Mail className="h-3 w-3" />
                                  {customer.email}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <ChannelIcon
                                  className={`h-4 w-4 ${channelConfig[customer.channel].color}`}
                                />
                                <span className="text-sm font-medium">
                                  {channelConfig[customer.channel].label}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <TrendingUp className="h-3 w-3" />
                                <span>
                                  {customer.channelAffinityScore}% affinity
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                              <span className="font-semibold">
                                {customer.totalOrders}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">
                            ৳{customer.totalSpent.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${segmentConfig[customer.segment].color} text-white`}
                            >
                              {segmentConfig[customer.segment].label}
                            </Badge>
                          </TableCell>
                          <TableCell>{customer.lastOrderDate}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      setSelectedCustomer(customer)
                                    }
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      কাস্টমার বিস্তারিত
                                    </DialogTitle>
                                    <DialogDescription>
                                      {customer.name} এর সম্পূর্ণ তথ্য
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedCustomer && (
                                    <CustomerDetails
                                      customer={selectedCustomer}
                                    />
                                  )}
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// Customer Details Component
function CustomerDetails({ customer }: { customer: Customer }) {
  const ChannelIcon = {
    facebook: Facebook,
    instagram: Instagram,
    whatsapp: MessageSquare,
    website: ShoppingBag,
  }[customer.channel];

  return (
    <div className="space-y-6">
      {/* Customer Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={customer.avatar} />
              <AvatarFallback className="text-2xl">
                {customer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">{customer.name}</h3>
              <p className="text-sm text-muted-foreground">{customer.id}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ফোন</p>
                <p className="font-medium">{customer.phone}</p>
              </div>
            </div>
            {customer.email && (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ইমেইল</p>
                  <p className="font-medium">{customer.email}</p>
                </div>
              </div>
            )}
          </div>
          {customer.address && (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ঠিকানা</p>
                <p className="font-medium">{customer.address}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ChannelIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">চ্যানেল</p>
              <p className="font-medium">
                {
                  {
                    facebook: "Facebook",
                    instagram: "Instagram",
                    whatsapp: "WhatsApp",
                    website: "Website",
                  }[customer.channel]
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{customer.totalOrders}</p>
            <p className="text-sm text-muted-foreground">মোট অর্ডার</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">
              ৳{customer.totalSpent.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">মোট খরচ</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-sm font-bold">{customer.lastOrderDate}</p>
            <p className="text-sm text-muted-foreground">শেষ অর্ডার</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer 360 - Channel Journey */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">চ্যানেল জার্নি</CardTitle>
          <CardDescription>কাস্টমার টাচপয়েন্ট ট্র্যাকিং</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">প্রথম টাচ</p>
              <div className="flex items-center gap-2">
                {(() => {
                  const FirstIcon =
                    channelConfig[customer.firstTouchChannel].icon;
                  return (
                    <>
                      <FirstIcon
                        className={`h-5 w-5 ${channelConfig[customer.firstTouchChannel].color}`}
                      />
                      <span className="font-semibold">
                        {channelConfig[customer.firstTouchChannel].label}
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">শেষ টাচ</p>
              <div className="flex items-center gap-2">
                {(() => {
                  const LastIcon =
                    channelConfig[customer.lastTouchChannel].icon;
                  return (
                    <>
                      <LastIcon
                        className={`h-5 w-5 ${channelConfig[customer.lastTouchChannel].color}`}
                      />
                      <span className="font-semibold">
                        {channelConfig[customer.lastTouchChannel].label}
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">চ্যানেল অ্যাফিনিটি স্কোর</p>
              <p className="text-lg font-bold text-primary">
                {customer.channelAffinityScore}%
              </p>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${customer.channelAffinityScore}%` }}
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">চ্যানেল ইন্টারঅ্যাকশন</p>
            <div className="space-y-2">
              {Object.entries(customer.channelInteractions).map(
                ([channel, count]) => {
                  const ChannelIcon =
                    channelConfig[channel as keyof typeof channelConfig].icon;
                  const total = Object.values(
                    customer.channelInteractions,
                  ).reduce((a, b) => a + b, 0);
                  const percentage =
                    total > 0 ? Math.round((count / total) * 100) : 0;
                  return (
                    <div key={channel} className="flex items-center gap-3">
                      <ChannelIcon
                        className={`h-4 w-4 ${channelConfig[channel as keyof typeof channelConfig].color}`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">
                            {
                              channelConfig[
                                channel as keyof typeof channelConfig
                              ].label
                            }
                          </span>
                          <span className="text-sm font-semibold">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className="bg-primary h-1.5 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      {customer.tags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ট্যাগ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {customer.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
