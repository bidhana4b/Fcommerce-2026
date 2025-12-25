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
import { useToast } from "@/components/ui/use-toast";
import {
  Store,
  Search,
  Eye,
  Ban,
  CheckCircle,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Package,
  Filter,
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StoreData {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "suspended" | "pending";
  plan: "free" | "basic" | "premium";
  totalProducts: number;
  totalOrders: number;
  monthlyRevenue: number;
  rating: number;
  joinDate: string;
  avatar: string;
}

export default function StoreManagement() {
  const { toast } = useToast();
  const [stores, setStores] = useState<StoreData[]>([
    {
      id: "STORE-001",
      name: "করিম ট্রেডার্স",
      owner: "করিম মিয়া",
      email: "karim@example.com",
      phone: "০১৭১২৩৪৫৬৭৮",
      address: "ঢাকা, বাংলাদেশ",
      status: "active",
      plan: "premium",
      totalProducts: 156,
      totalOrders: 245,
      monthlyRevenue: 85000,
      rating: 4.8,
      joinDate: "২০২৪-০১-১৫",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karim",
    },
    {
      id: "STORE-002",
      name: "রহিমা ফ্যাশন",
      owner: "রহিমা বেগম",
      email: "rahima@example.com",
      phone: "০১৮১২৩৪৫৬৭৮",
      address: "চট্টগ্রাম, বাংলাদেশ",
      status: "active",
      plan: "basic",
      totalProducts: 89,
      totalOrders: 198,
      monthlyRevenue: 72000,
      rating: 4.6,
      joinDate: "২০২৪-০১-১০",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahima",
    },
    {
      id: "STORE-003",
      name: "জামাল স্টোর",
      owner: "জামাল হোসেন",
      email: "jamal@example.com",
      phone: "০১৯১২৩৪৫৬৭৮",
      address: "সিলেট, বাংলাদেশ",
      status: "pending",
      plan: "free",
      totalProducts: 23,
      totalOrders: 12,
      monthlyRevenue: 8500,
      rating: 4.2,
      joinDate: "২০২৪-০১-২০",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jamal",
    },
    {
      id: "STORE-004",
      name: "সালমা এন্টারপ্রাইজ",
      owner: "সালমা খাতুন",
      email: "salma@example.com",
      phone: "০১৬১২৩৪৫৬৭৮",
      address: "রাজশাহী, বাংলাদেশ",
      status: "suspended",
      plan: "basic",
      totalProducts: 67,
      totalOrders: 156,
      monthlyRevenue: 45000,
      rating: 4.4,
      joinDate: "২০২৩-১২-০৫",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=salma",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);

  const statusConfig = {
    active: { label: "সক্রিয়", color: "bg-green-500", textColor: "text-green-600" },
    suspended: { label: "স্থগিত", color: "bg-red-500", textColor: "text-red-600" },
    pending: { label: "অপেক্ষমাণ", color: "bg-yellow-500", textColor: "text-yellow-600" },
  };

  const planConfig = {
    free: { label: "ফ্রি", color: "bg-slate-500" },
    basic: { label: "বেসিক", color: "bg-blue-500" },
    premium: { label: "প্রিমিয়াম", color: "bg-purple-500" },
  };

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || store.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: stores.length,
    active: stores.filter((s) => s.status === "active").length,
    suspended: stores.filter((s) => s.status === "suspended").length,
    pending: stores.filter((s) => s.status === "pending").length,
    totalRevenue: stores.reduce((sum, s) => sum + s.monthlyRevenue, 0),
  };

  const handleStatusChange = (storeId: string, newStatus: "active" | "suspended") => {
    setStores(
      stores.map((store) =>
        store.id === storeId ? { ...store, status: newStatus } : store
      )
    );
    toast({
      title: "স্ট্যাটাস আপডেট হয়েছে",
      description: `স্টোরের স্ট্যাটাস ${statusConfig[newStatus].label} এ পরিবর্তন করা হয়েছে`,
    });
  };

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
            <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <Store className="h-6 w-6 text-white" />
            </div>
            স্টোর ম্যানেজমেন্ট
          </h1>
          <p className="text-muted-foreground mt-2">
            সব স্টোর এবং তাদের কার্যক্রম পরিচালনা করুন
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            এক্সপোর্ট
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          {
            label: "মোট স্টোর",
            value: stats.total,
            icon: Store,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "সক্রিয়",
            value: stats.active,
            icon: CheckCircle,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "অপেক্ষমাণ",
            value: stats.pending,
            icon: TrendingUp,
            color: "from-yellow-500 to-orange-500",
          },
          {
            label: "স্থগিত",
            value: stats.suspended,
            icon: Ban,
            color: "from-red-500 to-pink-500",
          },
          {
            label: "মোট রাজস্ব",
            value: `৳${stats.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
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
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-xl md:text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div
                    className={`h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  >
                    <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
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
                  placeholder="স্টোর নাম, মালিক বা ইমেইল খুঁজুন..."
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

      {/* Stores Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>স্টোর তালিকা</CardTitle>
            <CardDescription>
              {filteredStores.length} টি স্টোর পাওয়া গেছে
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>স্টোর</TableHead>
                    <TableHead>মালিক</TableHead>
                    <TableHead>প্ল্যান</TableHead>
                    <TableHead>পণ্য</TableHead>
                    <TableHead>অর্ডার</TableHead>
                    <TableHead>রাজস্ব</TableHead>
                    <TableHead>রেটিং</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredStores.map((store, index) => (
                      <motion.tr
                        key={store.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={store.avatar} />
                              <AvatarFallback>
                                {store.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{store.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {store.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-sm">{store.owner}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {store.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${planConfig[store.plan].color} text-white`}>
                            {planConfig[store.plan].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">
                              {store.totalProducts}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">
                              {store.totalOrders}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">
                          ৳{store.monthlyRevenue.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span className="font-semibold">{store.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${statusConfig[store.status].color} text-white`}
                          >
                            {statusConfig[store.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedStore(store)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>স্টোর বিস্তারিত</DialogTitle>
                                  <DialogDescription>
                                    {store.name} এর সম্পূর্ণ তথ্য
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedStore && (
                                  <StoreDetails
                                    store={selectedStore}
                                    onStatusChange={handleStatusChange}
                                  />
                                )}
                              </DialogContent>
                            </Dialog>
                            {store.status === "active" ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusChange(store.id, "suspended")}
                              >
                                <Ban className="h-4 w-4 text-red-600" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusChange(store.id, "active")}
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </Button>
                            )}
                          </div>
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

// Store Details Component
function StoreDetails({
  store,
  onStatusChange,
}: {
  store: StoreData;
  onStatusChange: (storeId: string, status: "active" | "suspended") => void;
}) {
  return (
    <div className="space-y-6">
      {/* Store Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={store.avatar} />
              <AvatarFallback className="text-2xl">
                {store.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">{store.name}</h3>
              <p className="text-sm text-muted-foreground">{store.id}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">মালিক</p>
                <p className="font-medium">{store.owner}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ফোন</p>
                <p className="font-medium">{store.phone}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ঠিকানা</p>
              <p className="font-medium">{store.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{store.totalProducts}</p>
            <p className="text-sm text-muted-foreground">মোট পণ্য</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{store.totalOrders}</p>
            <p className="text-sm text-muted-foreground">মোট অর্ডার</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-xl font-bold">
              ৳{store.monthlyRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">মাসিক রাজস্ব</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">পারফরম্যান্স</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>রেটিং</span>
              <span className="font-bold">{store.rating}/5.0</span>
            </div>
            <Progress value={store.rating * 20} className="h-2" />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">যোগদান তারিখ</span>
            <span className="font-medium">{store.joinDate}</span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        {store.status === "active" ? (
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => onStatusChange(store.id, "suspended")}
          >
            <Ban className="h-4 w-4 mr-2" />
            স্থগিত করুন
          </Button>
        ) : (
          <Button
            variant="default"
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={() => onStatusChange(store.id, "active")}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            সক্রিয় করুন
          </Button>
        )}
      </div>
    </div>
  );
}
