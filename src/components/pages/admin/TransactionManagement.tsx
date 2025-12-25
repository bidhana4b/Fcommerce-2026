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
import {
  CreditCard,
  Search,
  Eye,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

interface Transaction {
  id: string;
  storeName: string;
  customerName: string;
  amount: number;
  fee: number;
  netAmount: number;
  paymentMethod: string;
  status: "completed" | "pending" | "failed" | "refunded";
  type: "payment" | "refund" | "withdrawal";
  date: string;
  time: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-001",
    storeName: "করিম ট্রেডার্স",
    customerName: "রহিম মিয়া",
    amount: 2500,
    fee: 37.5,
    netAmount: 2462.5,
    paymentMethod: "bKash",
    status: "completed",
    type: "payment",
    date: "২০২৪-০১-২০",
    time: "১০:৩০ AM",
  },
  {
    id: "TXN-002",
    storeName: "রহিমা ফ্যাশন",
    customerName: "করিম হোসেন",
    amount: 3800,
    fee: 57,
    netAmount: 3743,
    paymentMethod: "Nagad",
    status: "completed",
    type: "payment",
    date: "২০২৪-০১-২০",
    time: "১১:১৫ AM",
  },
  {
    id: "TXN-003",
    storeName: "জামাল স্টোর",
    customerName: "সালমা বেগম",
    amount: 1500,
    fee: 22.5,
    netAmount: 1477.5,
    paymentMethod: "bKash",
    status: "pending",
    type: "payment",
    date: "২০২৪-০১-২০",
    time: "১২:০০ PM",
  },
  {
    id: "TXN-004",
    storeName: "সালমা এন্টারপ্রাইজ",
    customerName: "জামাল মিয়া",
    amount: 4200,
    fee: 63,
    netAmount: 4137,
    paymentMethod: "SSL Commerz",
    status: "failed",
    type: "payment",
    date: "২০২৪-০১-২০",
    time: "০১:৩০ PM",
  },
  {
    id: "TXN-005",
    storeName: "করিম ট্রেডার্স",
    customerName: "রহিমা খাতুন",
    amount: 1200,
    fee: 18,
    netAmount: 1182,
    paymentMethod: "Rocket",
    status: "refunded",
    type: "refund",
    date: "২০২৪-০১-১৯",
    time: "০৩:৪৫ PM",
  },
];

const stats = [
  {
    name: "মোট লেনদেন",
    value: "৮,৯৫৬",
    change: "+১৮%",
    trend: "up",
    icon: CreditCard,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "সফল লেনদেন",
    value: "৮,৭৫০",
    change: "+২০%",
    trend: "up",
    icon: CheckCircle2,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "মোট পরিমাণ",
    value: "৳৪৫,৬৭,০০০",
    change: "+২৫%",
    trend: "up",
    icon: DollarSign,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "মোট ফি",
    value: "৳৬৮,৫০৫",
    change: "+২২%",
    trend: "up",
    icon: TrendingUp,
    color: "from-orange-500 to-red-500",
  },
];

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const statusConfig = {
    completed: { label: "সম্পন্ন", color: "bg-green-500", icon: CheckCircle2 },
    pending: { label: "অপেক্ষমাণ", color: "bg-yellow-500", icon: Clock },
    failed: { label: "ব্যর্থ", color: "bg-red-500", icon: XCircle },
    refunded: { label: "ফেরত", color: "bg-blue-500", icon: ArrowDownRight },
  };

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || txn.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            লেনদেন ম্যানেজমেন্ট
          </h1>
          <p className="text-muted-foreground mt-2">
            সকল পেমেন্ট লেনদেন ট্র্যাক ও পরিচালনা করুন
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            তারিখ নির্বাচন
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Download className="h-4 w-4" />
            রিপোর্ট
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
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.name}
                    </p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          stat.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
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
                  placeholder="লেনদেন আইডি, স্টোর বা কাস্টমার খুঁজুন..."
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

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>লেনদেন তালিকা</CardTitle>
            <CardDescription>
              {filteredTransactions.length} টি লেনদেন পাওয়া গেছে
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>লেনদেন আইডি</TableHead>
                    <TableHead>স্টোর</TableHead>
                    <TableHead>কাস্টমার</TableHead>
                    <TableHead>পরিমাণ</TableHead>
                    <TableHead>ফি</TableHead>
                    <TableHead>নেট পরিমাণ</TableHead>
                    <TableHead>পেমেন্ট মেথড</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead>তারিখ</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredTransactions.map((txn, index) => (
                      <motion.tr
                        key={txn.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell className="font-mono font-semibold">
                          {txn.id}
                        </TableCell>
                        <TableCell className="font-medium">{txn.storeName}</TableCell>
                        <TableCell>{txn.customerName}</TableCell>
                        <TableCell className="font-semibold">
                          ৳{txn.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-red-600">
                          ৳{txn.fee.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-bold text-green-600">
                          ৳{txn.netAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{txn.paymentMethod}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${statusConfig[txn.status].color} text-white`}>
                            {statusConfig[txn.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{txn.date}</div>
                            <div className="text-muted-foreground">{txn.time}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedTransaction(txn)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>লেনদেন বিস্তারিত</DialogTitle>
                                <DialogDescription>
                                  লেনদেন আইডি: {txn.id}
                                </DialogDescription>
                              </DialogHeader>
                              {selectedTransaction && (
                                <TransactionDetails transaction={selectedTransaction} />
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

// Transaction Details Component
function TransactionDetails({ transaction }: { transaction: Transaction }) {
  const StatusIcon = statusConfig[transaction.status].icon;

  return (
    <div className="space-y-6">
      {/* Transaction Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{transaction.id}</h3>
              <p className="text-sm text-muted-foreground">
                {transaction.date} • {transaction.time}
              </p>
            </div>
            <Badge className={`${statusConfig[transaction.status].color} text-white`}>
              <StatusIcon className="h-4 w-4 mr-1" />
              {statusConfig[transaction.status].label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">স্টোর</p>
              <p className="font-semibold">{transaction.storeName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">কাস্টমার</p>
              <p className="font-semibold">{transaction.customerName}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">পেমেন্ট মেথড</p>
              <Badge variant="outline" className="mt-1">
                {transaction.paymentMethod}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">লেনদেন ধরন</p>
              <Badge variant="outline" className="mt-1">
                {transaction.type === "payment" && "পেমেন্ট"}
                {transaction.type === "refund" && "ফেরত"}
                {transaction.type === "withdrawal" && "উত্তোলন"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amount Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">পরিমাণ বিবরণ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <span className="font-medium">মূল পরিমাণ</span>
            <span className="text-xl font-bold">৳{transaction.amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <span className="font-medium text-red-600">প্ল্যাটফর্ম ফি</span>
            <span className="text-xl font-bold text-red-600">
              -৳{transaction.fee.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-500">
            <span className="font-bold text-green-600">নেট পরিমাণ</span>
            <span className="text-2xl font-bold text-green-600">
              ৳{transaction.netAmount.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const statusConfig = {
  completed: { label: "সম্পন্ন", color: "bg-green-500", icon: CheckCircle2 },
  pending: { label: "অপেক্ষমাণ", color: "bg-yellow-500", icon: Clock },
  failed: { label: "ব্যর্থ", color: "bg-red-500", icon: XCircle },
  refunded: { label: "ফেরত", color: "bg-blue-500", icon: ArrowDownRight },
};
