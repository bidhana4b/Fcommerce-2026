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
  Users,
  Search,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  UserPlus,
  Store,
  ShoppingBag,
  DollarSign,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  storeName?: string;
  role: "trader" | "admin";
  status: "active" | "suspended" | "pending";
  joinDate: string;
  totalOrders: number;
  totalRevenue: number;
  avatar?: string;
}

export default function AdminUsers() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    {
      id: "USER-001",
      name: "করিম মিয়া",
      email: "karim@example.com",
      phone: "০১৭১২৩৪৫৬৭৮",
      storeName: "করিম ট্রেডার্স",
      role: "trader",
      status: "active",
      joinDate: "২০২৪-০১-১৫",
      totalOrders: 245,
      totalRevenue: 85000,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karim",
    },
    {
      id: "USER-002",
      name: "রহিমা বেগম",
      email: "rahima@example.com",
      phone: "০১৮১২৩৪৫৬৭৮",
      storeName: "রহিমা ফ্যাশন",
      role: "trader",
      status: "active",
      joinDate: "২০২৪-০১-১০",
      totalOrders: 198,
      totalRevenue: 72000,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahima",
    },
    {
      id: "USER-003",
      name: "জামাল হোসেন",
      email: "jamal@example.com",
      phone: "০১৯১২৩৪৫৬৭৮",
      storeName: "জামাল স্টোর",
      role: "trader",
      status: "pending",
      joinDate: "২০২৪-০১-২০",
      totalOrders: 12,
      totalRevenue: 8500,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jamal",
    },
    {
      id: "USER-004",
      name: "সালমা খাতুন",
      email: "salma@example.com",
      phone: "০১৬১২৩৪৫৬৭৮",
      storeName: "সালমা এন্টারপ্রাইজ",
      role: "trader",
      status: "suspended",
      joinDate: "২০২৩-১২-০৫",
      totalOrders: 156,
      totalRevenue: 45000,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=salma",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const statusConfig = {
    active: {
      label: "সক্রিয়",
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    suspended: {
      label: "স্থগিত",
      color: "bg-red-500",
      textColor: "text-red-600",
    },
    pending: {
      label: "অপেক্ষমাণ",
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
    },
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    suspended: users.filter((u) => u.status === "suspended").length,
    pending: users.filter((u) => u.status === "pending").length,
  };

  const handleStatusChange = (
    userId: string,
    newStatus: "active" | "suspended",
  ) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user,
      ),
    );
    toast({
      title: "স্ট্যাটাস আপডেট হয়েছে",
      description: `ব্যবহারকারীর স্ট্যাটাস ${statusConfig[newStatus].label} এ পরিবর্তন করা হয়েছে`,
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
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            ব্যবহারকারী ম্যানেজমেন্ট
          </h1>
          <p className="text-muted-foreground mt-2">
            সব ব্যবহারকারী এবং তাদের কার্যক্রম পরিচালনা করুন
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            এক্সপোর্ট
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 gap-2">
            <UserPlus className="h-4 w-4" />
            নতুন ব্যবহারকারী
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "মোট",
            value: stats.total,
            icon: Users,
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
            icon: XCircle,
            color: "from-yellow-500 to-orange-500",
          },
          {
            label: "স্থগিত",
            value: stats.suspended,
            icon: Ban,
            color: "from-red-500 to-pink-500",
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
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
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
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="নাম, ইমেইল বা ফোন নম্বর খুঁজুন..."
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

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>ব্যবহারকারী তালিকা</CardTitle>
            <CardDescription>
              {filteredUsers.length} জন ব্যবহারকারী পাওয়া গেছে
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ব্যবহারকারী</TableHead>
                    <TableHead>যোগাযোগ</TableHead>
                    <TableHead>স্টোর</TableHead>
                    <TableHead>অর্ডার</TableHead>
                    <TableHead>রাজস্ব</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead>যোগদান</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {user.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              {user.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {user.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Store className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{user.storeName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">
                              {user.totalOrders}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">
                          ৳{user.totalRevenue.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${statusConfig[user.status].color} text-white`}
                          >
                            {statusConfig[user.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {user.joinDate}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedUser(user)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>
                                    ব্যবহারকারী বিস্তারিত
                                  </DialogTitle>
                                  <DialogDescription>
                                    {user.name} এর সম্পূর্ণ তথ্য
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedUser && (
                                  <UserDetails
                                    user={selectedUser}
                                    onStatusChange={handleStatusChange}
                                  />
                                )}
                              </DialogContent>
                            </Dialog>
                            {user.status === "active" ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleStatusChange(user.id, "suspended")
                                }
                              >
                                <Ban className="h-4 w-4 text-red-600" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleStatusChange(user.id, "active")
                                }
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

// User Details Component
function UserDetails({
  user,
  onStatusChange,
}: {
  user: User;
  onStatusChange: (userId: string, status: "active" | "suspended") => void;
}) {
  return (
    <div className="space-y-6">
      {/* User Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.id}</p>
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
                <p className="text-sm text-muted-foreground">ইমেইল</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ফোন</p>
                <p className="font-medium">{user.phone}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">স্টোর</p>
              <p className="font-medium">{user.storeName}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{user.totalOrders}</p>
            <p className="text-sm text-muted-foreground">মোট অর্ডার</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">
              ৳{user.totalRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">মোট রাজস্ব</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-sm font-bold">{user.joinDate}</p>
            <p className="text-sm text-muted-foreground">যোগদান</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {user.status === "active" ? (
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => onStatusChange(user.id, "suspended")}
          >
            <Ban className="h-4 w-4 mr-2" />
            স্থগিত করুন
          </Button>
        ) : (
          <Button
            variant="default"
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={() => onStatusChange(user.id, "active")}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            সক্রিয় করুন
          </Button>
        )}
      </div>
    </div>
  );
}
