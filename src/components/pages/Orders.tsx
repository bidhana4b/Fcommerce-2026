import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  ShoppingBag,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Package,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Filter,
  Download,
  TrendingUp,
} from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    stockReserved?: boolean;
  }[];
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  paymentStatus: "pending" | "paid" | "refunded";
  paymentMethod: string;
  orderDate: string;
  channel: "facebook" | "instagram" | "whatsapp" | "website";
  reservationTimer?: number;
  reservationExpiry?: string;
  channelStockBuffer?: number;
}

export default function Orders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "করিম মিয়া",
      customerPhone: "০১৭১২৩৪৫৬৭৮",
      customerAddress: "ঢাকা, বাংলাদেশ",
      items: [
        { name: "স্মার্টফোন", quantity: 1, price: 25000, stockReserved: true },
        { name: "ফোন কেস", quantity: 2, price: 300, stockReserved: true },
      ],
      total: 25600,
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "bKash",
      orderDate: "2024-01-20",
      channel: "facebook",
      reservationTimer: 15,
      reservationExpiry: "2024-01-20T15:30:00",
      channelStockBuffer: 5,
    },
    {
      id: "ORD-002",
      customerName: "রহিমা বেগম",
      customerPhone: "০১৮১২৩৪৫৬৭৮",
      customerAddress: "চট্টগ্রাম, বাংলাদেশ",
      items: [
        { name: "টি-শার্ট", quantity: 3, price: 500, stockReserved: false },
      ],
      total: 1500,
      status: "confirmed",
      paymentStatus: "paid",
      paymentMethod: "Nagad",
      orderDate: "2024-01-19",
      channel: "instagram",
      channelStockBuffer: 10,
    },
    {
      id: "ORD-003",
      customerName: "জামাল হোসেন",
      customerPhone: "০১৯১২৩৪৫৬৭৮",
      customerAddress: "সিলেট, বাংলাদেশ",
      items: [{ name: "জুতা", quantity: 1, price: 1500, stockReserved: false }],
      total: 1500,
      status: "delivered",
      paymentStatus: "paid",
      paymentMethod: "COD",
      orderDate: "2024-01-18",
      channel: "whatsapp",
      channelStockBuffer: 3,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statusConfig = {
    pending: {
      label: "অপেক্ষমাণ",
      variant: "secondary" as const,
      icon: Clock,
      color: "text-yellow-600",
    },
    confirmed: {
      label: "নিশ্চিত",
      variant: "default" as const,
      icon: CheckCircle,
      color: "text-blue-600",
    },
    processing: {
      label: "প্রক্রিয়াধীন",
      variant: "default" as const,
      icon: Package,
      color: "text-purple-600",
    },
    shipped: {
      label: "পাঠানো হয়েছে",
      variant: "default" as const,
      icon: Truck,
      color: "text-indigo-600",
    },
    delivered: {
      label: "ডেলিভার হয়েছে",
      variant: "default" as const,
      icon: CheckCircle,
      color: "text-green-600",
    },
    cancelled: {
      label: "বাতিল",
      variant: "destructive" as const,
      icon: XCircle,
      color: "text-red-600",
    },
  };

  const channelConfig = {
    facebook: { label: "Facebook", color: "bg-blue-500" },
    instagram: { label: "Instagram", color: "bg-pink-500" },
    whatsapp: { label: "WhatsApp", color: "bg-green-500" },
    website: { label: "Website", color: "bg-purple-500" },
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    revenue: orders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, o) => sum + o.total, 0),
  };

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
    toast({
      title: "আপডেট সফল",
      description: "অর্ডার স্ট্যাটাস আপডেট করা হয়েছে",
    });
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
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            অর্ডার ম্যানেজমেন্ট
          </h1>
          <p className="text-muted-foreground mt-1">সব অর্ডার ট্র্যাক করুন</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            রিপোর্ট
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            label: "মোট অর্ডার",
            value: stats.total,
            icon: ShoppingBag,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "অপেক্ষমাণ",
            value: stats.pending,
            icon: Clock,
            color: "from-yellow-500 to-orange-500",
          },
          {
            label: "নিশ্চিত",
            value: stats.confirmed,
            icon: CheckCircle,
            color: "from-blue-500 to-indigo-500",
          },
          {
            label: "ডেলিভার",
            value: stats.delivered,
            icon: CheckCircle,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "মোট আয়",
            value: `৳${stats.revenue.toLocaleString()}`,
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
                  placeholder="অর্ডার আইডি বা কাস্টমার নাম খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="স্ট্যাটাস" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                  {Object.entries(statusConfig).map(([key, config]) => (
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

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>অর্ডার তালিকা</CardTitle>
            <CardDescription>
              {filteredOrders.length} টি অর্ডার পাওয়া গেছে
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>অর্ডার আইডি</TableHead>
                    <TableHead>কাস্টমার</TableHead>
                    <TableHead>চ্যানেল</TableHead>
                    <TableHead>মোট</TableHead>
                    <TableHead>পেমেন্ট</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead>তারিখ</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredOrders.map((order, index) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell className="font-mono font-semibold">
                          {order.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customerName}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.customerPhone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${channelConfig[order.channel].color} text-white`}
                          >
                            {channelConfig[order.channel].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          ৳{order.total.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.paymentStatus === "paid"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {order.paymentStatus === "paid"
                              ? "পরিশোধিত"
                              : "অপরিশোধিত"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value) =>
                              updateOrderStatus(
                                order.id,
                                value as Order["status"],
                              )
                            }
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(statusConfig).map(
                                ([key, config]) => (
                                  <SelectItem key={key} value={key}>
                                    <div className="flex items-center gap-2">
                                      <config.icon
                                        className={`h-4 w-4 ${config.color}`}
                                      />
                                      {config.label}
                                    </div>
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{order.orderDate}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>অর্ডার বিস্তারিত</DialogTitle>
                                <DialogDescription>
                                  অর্ডার আইডি: {order.id}
                                </DialogDescription>
                              </DialogHeader>
                              {selectedOrder && (
                                <OrderDetails order={selectedOrder} />
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </motion.tr>
                    ))}
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

// Order Details Component
function OrderDetails({ order }: { order: Order }) {
  return (
    <div className="space-y-6">
      {/* Customer Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">কাস্টমার তথ্য</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">নাম</p>
              <p className="font-medium">{order.customerName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ফোন</p>
              <p className="font-medium">{order.customerPhone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ঠিকানা</p>
              <p className="font-medium">{order.customerAddress}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">অর্ডার আইটেম</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{item.name}</p>
                    {item.stockReserved && (
                      <Badge variant="secondary" className="text-xs">
                        <Package className="h-3 w-3 mr-1" />
                        রিজার্ভড
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    পরিমাণ: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  ৳{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3 border-t">
              <p className="font-bold text-lg">মোট</p>
              <p className="font-bold text-lg text-primary">
                ৳{order.total.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Controls */}
      {(order.reservationTimer || order.channelStockBuffer) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ইনভেন্টরি কন্ট্রোল</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.reservationTimer && order.reservationExpiry && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <p className="font-semibold text-yellow-900 dark:text-yellow-100">
                    রিজার্ভেশন টাইমার
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      সময় বাকি
                    </span>
                    <span className="font-bold text-yellow-600">
                      {order.reservationTimer} মিনিট
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      মেয়াদ শেষ
                    </span>
                    <span className="text-sm font-medium">
                      {new Date(order.reservationExpiry).toLocaleString(
                        "bn-BD",
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-yellow-200 dark:bg-yellow-900 rounded-full h-2 mt-2">
                    <div
                      className="bg-yellow-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${(order.reservationTimer / 30) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    টাইমার শেষ হলে স্টক স্বয়ংক্রিয়ভাবে মুক্ত হবে
                  </p>
                </div>
              </div>
            )}
            {order.channelStockBuffer && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  <p className="font-semibold text-blue-900 dark:text-blue-100">
                    চ্যানেল স্টক বাফার
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    বাফার পরিমাণ
                  </span>
                  <span className="font-bold text-blue-600">
                    {order.channelStockBuffer} ইউনিট
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  এই চ্যানেলের জন্য সংরক্ষিত স্টক
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Payment Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">পেমেন্ট তথ্য</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">পেমেন্ট মেথড</span>
            <span className="font-medium">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">পেমেন্ট স্ট্যাটাস</span>
            <Badge
              variant={order.paymentStatus === "paid" ? "default" : "secondary"}
            >
              {order.paymentStatus === "paid" ? "পরিশোধিত" : "অপরিশোধিত"}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">অর্ডার তারিখ</span>
            <span className="font-medium">{order.orderDate}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
