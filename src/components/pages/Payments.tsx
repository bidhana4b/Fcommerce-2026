import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, CheckCircle, Clock, XCircle, Download, TrendingUp, DollarSign, Wallet, Building2, Bell, Calendar, Send, Settings, Plus, AlertCircle, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

// Payment Methods Configuration
const paymentMethods = [
  { id: "bkash", name: "bKash", icon: "💳", color: "pink", status: "active", balance: 45600, transactions: 234 },
  { id: "nagad", name: "Nagad", icon: "💰", color: "orange", status: "active", balance: 32400, transactions: 156 },
  { id: "rocket", name: "Rocket", icon: "🚀", color: "purple", status: "active", balance: 18900, transactions: 89 },
  { id: "bank", name: "Bank Transfer", icon: "🏦", color: "blue", status: "active", balance: 67800, transactions: 45 },
  { id: "cod", name: "Cash on Delivery", icon: "💵", color: "green", status: "active", balance: 0, transactions: 178 },
];

// Installment Plans
const installmentPlans = [
  { id: 1, orderId: "#1234", customer: "সালমা খাতুন", total: 12000, paid: 4000, remaining: 8000, installments: 3, nextDue: "২৫ অক্টোবর", status: "active" },
  { id: 2, orderId: "#1189", customer: "করিম মিয়া", total: 8500, paid: 8500, remaining: 0, installments: 2, nextDue: "-", status: "completed" },
  { id: 3, orderId: "#1156", customer: "নাজমা বেগম", total: 15600, paid: 5200, remaining: 10400, installments: 4, nextDue: "২০ অক্টোবর", status: "overdue" },
];

// Payment Reminders
const paymentReminders = [
  { id: 1, customer: "রহিম আহমেদ", orderId: "#1245", amount: 3500, dueDate: "১৮ অক্টোবর", status: "pending", lastReminder: "২ দিন আগে" },
  { id: 2, customer: "���াতেমা আক্তার", orderId: "#1198", amount: 2800, dueDate: "২০ অক্টোবর", status: "pending", lastReminder: "১ দিন আগে" },
  { id: 3, customer: "জাহিদ ইসলাম", orderId: "#1167", amount: 4200, dueDate: "১৫ অক্টোবর", status: "overdue", lastReminder: "আজ" },
];

const mockPayments = [
  { id: "PAY-001", orderId: "#ORD-001", customer: "রহিম আহমেদ", amount: 350, method: "bKash", status: "completed", date: "২০২৪-০১-১৫", time: "১০:৩০ AM", transactionId: "BKS123456789" },
  { id: "PAY-002", orderId: "#ORD-002", customer: "সালমা খাতুন", amount: 1200, method: "Nagad", status: "completed", date: "২০২৪-০১-১৫", time: "১১:১৫ AM", transactionId: "NGD987654321" },
  { id: "PAY-003", orderId: "#ORD-004", customer: "নাজমা বেগম", amount: 800, method: "bKash", status: "pending", date: "২০২৪-০১-১৪", time: "০৩:২০ PM", transactionId: "BKS456789123" },
  { id: "PAY-004", orderId: "#ORD-003", customer: "করিম মিয়া", amount: 450, method: "Nagad", status: "completed", date: "২০২৪-০১-১৪", time: "০২:৪৫ PM", transactionId: "NGD321654987" },
  { id: "PAY-005", orderId: "#ORD-006", customer: "ফাতেমা আক্তার", amount: 1800, method: "bKash", status: "failed", date: "২০২৪-০১-১৩", time: "০৫:১০ PM", transactionId: "BKS789123456" },
];

const getStatusBadge = (status: string) => {
  const variants = {
    completed: { variant: "default" as const, label: "সম্পন্ন", icon: CheckCircle, color: "text-green-600" },
    pending: { variant: "secondary" as const, label: "অপেক্ষমাণ", icon: Clock, color: "text-orange-600" },
    failed: { variant: "destructive" as const, label: "ব্যর্থ", icon: XCircle, color: "text-red-600" },
  };
  const config = variants[status as keyof typeof variants] || variants.pending;
  const Icon = config.icon;
  return (
    <Badge variant={config.variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

const getMethodBadge = (method: string) => {
  const colors = {
    bKash: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
    Nagad: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  };
  return (
    <Badge variant="outline" className={colors[method as keyof typeof colors]}>
      {method}
    </Badge>
  );
};

const getInstallmentStatusBadge = (status: string) => {
  const variants = {
    active: { variant: "default" as const, label: "চলমান", color: "text-blue-600" },
    completed: { variant: "default" as const, label: "সম্পন্ন", color: "text-green-600" },
    overdue: { variant: "destructive" as const, label: "বকেয়া", color: "text-red-600" },
  };
  const config = variants[status as keyof typeof variants] || variants.active;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default function Payments() {
  const [showMethodDialog, setShowMethodDialog] = useState(false);
  const [showInstallmentDialog, setShowInstallmentDialog] = useState(false);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<typeof paymentMethods[0] | null>(null);

  const stats = {
    total: mockPayments.reduce((sum, p) => sum + (p.status === "completed" ? p.amount : 0), 0),
    completed: mockPayments.filter(p => p.status === "completed").length,
    pending: mockPayments.filter(p => p.status === "pending").length,
    failed: mockPayments.filter(p => p.status === "failed").length,
  };

  const totalBalance = paymentMethods.reduce((sum, m) => sum + m.balance, 0);
  const totalTransactions = paymentMethods.reduce((sum, m) => sum + m.transactions, 0);

  return (
    <div className="space-y-6 bg-background">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-header">পেমেন্ট ব্যবস্থাপনা</h1>
          <p className="text-muted-foreground mt-2">সব পেমেন্ট মেথড এক জায়গায়</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            সিঙ্ক
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            রিপোর্ট
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">ওভারভিউ</TabsTrigger>
          <TabsTrigger value="methods">পেমেন্ট মেথড</TabsTrigger>
          <TabsTrigger value="installments">কিস্তি</TabsTrigger>
          <TabsTrigger value="reminders">রিমাইন্ডার</TabsTrigger>
          <TabsTrigger value="transactions">ট্রানজেকশন</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Enhanced Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="shadow-soft hover:shadow-hover transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">মোট ব্যালেন্স</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">৳{totalBalance.toLocaleString()}</div>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +২৮% এই মাসে
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-soft hover:shadow-hover transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">মোট ট্রানজেকশন</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTransactions}</div>
                <p className="text-xs text-muted-foreground mt-1">সব মেথড</p>
              </CardContent>
            </Card>
            <Card className="shadow-soft hover:shadow-hover transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">কিস্তি চলমান</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {installmentPlans.filter(p => p.status === "active").length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">অর্ডার</p>
              </CardContent>
            </Card>
            <Card className="shadow-soft hover:shadow-hover transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">বকেয়া পেমেন্ট</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {paymentReminders.filter(r => r.status === "pending" || r.status === "overdue").length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">রিমাইন্ডার পাঠান</p>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="shadow-soft hover:shadow-hover transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-14 w-14 rounded-full bg-${method.color}-100 dark:bg-${method.color}-900/20 flex items-center justify-center text-2xl`}>
                      {method.icon}
                    </div>
                    <Badge variant={method.status === "active" ? "default" : "secondary"}>
                      {method.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{method.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{method.transactions} ট্রানজেকশন</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                      <span className="text-sm text-muted-foreground">ব্যালেন্স</span>
                      <span className="font-bold text-primary">৳{method.balance.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4"
                    onClick={() => {
                      setSelectedMethod(method);
                      setShowMethodDialog(true);
                    }}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    সেটিংস
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payments Table */}
          <Card className="shadow-soft">
            <Tabs defaultValue="all">
              <CardHeader>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">সব</TabsTrigger>
                  <TabsTrigger value="completed">সম্পন্ন</TabsTrigger>
                  <TabsTrigger value="pending">অপেক্ষমাণ</TabsTrigger>
                  <TabsTrigger value="failed">ব্যর্থ</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent>
                <TabsContent value="all" className="mt-0">
                  <div className="space-y-4">
                    {mockPayments.map((payment) => (
                      <div key={payment.id} className="border rounded-xl p-4 hover:bg-accent hover:text-accent-foreground transition-colors shadow-soft">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="font-semibold">{payment.id}</span>
                              {getStatusBadge(payment.status)}
                              {getMethodBadge(payment.method)}
                            </div>
                            <div className="text-sm space-y-1">
                              <p><span className="text-muted-foreground">অর্ডার:</span> <span className="font-medium">{payment.orderId}</span></p>
                              <p><span className="text-muted-foreground">কাস্টমার:</span> {payment.customer}</p>
                              <p><span className="text-muted-foreground">ট্রানজেকশন আইডি:</span> {payment.transactionId}</p>
                              <p><span className="text-muted-foreground">তারিখ:</span> {payment.date} • {payment.time}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <div className="text-2xl font-bold text-primary">৳{payment.amount}</div>
                            <div className="flex gap-2">
                              {payment.status === "pending" && (
                                <>
                                  <Button size="sm" variant="default">ভেরিফাই করুন</Button>
                                  <Button size="sm" variant="outline">বাতিল</Button>
                                </>
                              )}
                              {payment.status === "completed" && (
                                <Button size="sm" variant="outline">রিসিট দেখুন</Button>
                              )}
                              {payment.status === "failed" && (
                                <Button size="sm" variant="outline">পুনরায় চেষ্টা</Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="completed" className="mt-0">
                  <div className="space-y-4">
                    {mockPayments.filter(p => p.status === "completed").map((payment) => (
                      <div key={payment.id} className="border rounded-xl p-4 shadow-soft">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{payment.id}</p>
                            <p className="text-sm text-muted-foreground">{payment.customer}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-primary">৳{payment.amount}</p>
                            {getMethodBadge(payment.method)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="pending" className="mt-0">
                  <div className="space-y-4">
                    {mockPayments.filter(p => p.status === "pending").map((payment) => (
                      <div key={payment.id} className="border rounded-xl p-4 shadow-soft">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{payment.id}</p>
                            <p className="text-sm text-muted-foreground">{payment.customer}</p>
                          </div>
                          <Button size="sm">ভেরিফাই করুন</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="failed" className="mt-0">
                  <div className="space-y-4">
                    {mockPayments.filter(p => p.status === "failed").map((payment) => (
                      <div key={payment.id} className="border rounded-xl p-4 shadow-soft">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{payment.id}</p>
                            <p className="text-sm text-muted-foreground">{payment.customer}</p>
                          </div>
                          <Button size="sm" variant="outline">পুনরায় চেষ্টা</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="methods" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">পেমেন্ট মেথড কনফিগারেশন</h2>
              <p className="text-muted-foreground">আপনার পেমেন্ট মেথড ম্যানেজ করুন</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  নতুন মেথড যোগ করুন
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>নতুন পেমেন্ট মেথড যোগ করুন</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>পেমেন্ট মেথড</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="সিলেক্ট করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bkash">bKash</SelectItem>
                        <SelectItem value="nagad">Nagad</SelectItem>
                        <SelectItem value="rocket">Rocket</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="upay">Upay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>অ্যাকাউন্ট নাম্বার</Label>
                    <Input placeholder="০১৭১২৩৪৫৬৭৮" />
                  </div>
                  <div className="space-y-2">
                    <Label>অ্যাকাউন্ট নাম</Label>
                    <Input placeholder="আপনার নাম" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">অটো ভেরিফিকেশন</p>
                      <p className="text-sm text-muted-foreground">পেমেন্ট স্বয়ংক্রিয়ভাবে ভেরিফাই করুন</p>
                    </div>
                    <Switch />
                  </div>
                  <Button className="w-full">মেথড যোগ করুন</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Payment Methods List */}
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`h-16 w-16 rounded-full bg-${method.color}-100 dark:bg-${method.color}-900/20 flex items-center justify-center text-3xl`}>
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{method.name}</h3>
                        <p className="text-sm text-muted-foreground">{method.transactions} ট্রানজেকশন</p>
                        <Badge variant={method.status === "active" ? "default" : "secondary"} className="mt-1">
                          {method.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 flex-1 max-w-md">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground">ব্যালেন্স</p>
                        <p className="text-xl font-bold text-primary">৳{method.balance.toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground">ট্রানজেকশন</p>
                        <p className="text-xl font-bold">{method.transactions}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        সেটিংস
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Installments Tab */}
        <TabsContent value="installments" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">কিস্তি পেমেন্ট</h2>
              <p className="text-muted-foreground">কিস্তিতে পেমেন্ট ট্র্যাক করুন</p>
            </div>
            <Dialog open={showInstallmentDialog} onOpenChange={setShowInstallmentDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  নতুন কিস্তি প্ল্যান
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>নতুন কিস্তি প্ল্যান তৈরি করুন</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>অর্ডার আইডি</Label>
                    <Input placeholder="#1234" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>মোট পরিমাণ (৳)</Label>
                      <Input type="number" placeholder="10000" />
                    </div>
                    <div className="space-y-2">
                      <Label>কিস্তির সংখ্যা</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="সিলেক্ট করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">২ কিস্তি</SelectItem>
                          <SelectItem value="3">৩ কিস্তি</SelectItem>
                          <SelectItem value="4">৪ কিস্তি</SelectItem>
                          <SelectItem value="6">৬ কিস্তি</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>প্রথম কিস্তির তারিখ</Label>
                    <Input type="date" />
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">প্রিভিউ</p>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      প্রতি কিস্তি: ৳৩,৩৩৩ × ৩ = ৳১০,০০০
                    </p>
                  </div>
                  <Button className="w-full">প্ল্যান তৈরি করুন</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Installment Plans List */}
          <div className="space-y-4">
            {installmentPlans.map((plan) => (
              <Card key={plan.id} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-bold text-lg">{plan.orderId}</span>
                        {getInstallmentStatusBadge(plan.status)}
                        <Badge variant="outline">{plan.installments} কিস্তি</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">কাস্টমার</p>
                          <p className="font-medium">{plan.customer}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">মোট</p>
                          <p className="font-bold">৳{plan.total.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">পরিশোধিত</p>
                          <p className="font-bold text-green-600">৳{plan.paid.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">বাকি</p>
                          <p className="font-bold text-orange-600">৳{plan.remaining.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">পেমেন্ট প্রগ্রেস</span>
                          <span className="font-medium">{Math.round((plan.paid / plan.total) * 100)}%</span>
                        </div>
                        <Progress value={(plan.paid / plan.total) * 100} className="h-2" />
                      </div>
                      {plan.status === "active" && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">পরবর্তী কিস্তি:</span>
                          <span className="font-medium">{plan.nextDue}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      {plan.status === "active" && (
                        <>
                          <Button size="sm">পেমেন্ট রেকর্ড করুন</Button>
                          <Button size="sm" variant="outline">রিমাইন্ডার পাঠান</Button>
                        </>
                      )}
                      {plan.status === "overdue" && (
                        <>
                          <Button size="sm" variant="destructive">বকেয়া পেমেন্ট</Button>
                          <Button size="sm" variant="outline">রিমাইন্ডার পাঠান</Button>
                        </>
                      )}
                      {plan.status === "completed" && (
                        <Button size="sm" variant="outline">বিস্তারিত দেখুন</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Payment Reminders Tab */}
        <TabsContent value="reminders" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">পেমেন্ট রিমাইন্ডার</h2>
              <p className="text-muted-foreground">স্বয়ংক্রিয় রিমাইন্ডার সেটআপ করুন</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Settings className="h-4 w-4" />
                  রিমাইন্ডার সেটিংস
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>অটো রিমাইন্ডার সেটিংস</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">অটো রিমাইন্ডার চালু করুন</p>
                      <p className="text-sm text-muted-foreground">বকেয়া পেমেন্টের জন্য স্বয়ংক্রিয় রিমাইন্ডার</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>রিমাইন্ডার পাঠানোর সময়</Label>
                    <Select defaultValue="3days">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1day">১ দিন আগে</SelectItem>
                        <SelectItem value="3days">৩ দিন আগে</SelectItem>
                        <SelectItem value="7days">৭ দিন আগে</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>রিমাইন্ডার মেসেজ টেমপ্লেট</Label>
                    <Textarea 
                      placeholder="আপনার পেমেন্ট বকেয়া আছে। দয়া করে শীঘ্রই পরিশোধ করুন।"
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>রিমাইন্ডার চ্যানেল</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="sms" defaultChecked />
                        <Label htmlFor="sms" className="cursor-pointer">SMS</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="whatsapp" defaultChecked />
                        <Label htmlFor="whatsapp" className="cursor-pointer">WhatsApp</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="call" />
                        <Label htmlFor="call" className="cursor-pointer">Phone Call</Label>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">সেটিংস সংরক্ষণ করুন</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Reminders List */}
          <div className="space-y-4">
            {paymentReminders.map((reminder) => (
              <Card key={reminder.id} className={`shadow-soft ${reminder.status === "overdue" ? "border-red-200 dark:border-red-900" : ""}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-bold text-lg">{reminder.orderId}</span>
                        <Badge variant={reminder.status === "overdue" ? "destructive" : "secondary"}>
                          {reminder.status === "overdue" ? "বকেয়া" : "পেন্ডিং"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">কাস্টমার</p>
                          <p className="font-medium">{reminder.customer}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">পরিমাণ</p>
                          <p className="font-bold text-primary">৳{reminder.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">ডিউ ডেট</p>
                          <p className="font-medium">{reminder.dueDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">শেষ রিমাইন্ডার</p>
                          <p className="font-medium">{reminder.lastReminder}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="gap-2">
                        <Send className="h-4 w-4" />
                        রিমাইন্ডার পাঠান
                      </Button>
                      <Button size="sm" variant="outline">পেমেন্ট রেকর্ড</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reminder Stats */}
          <Card className="shadow-soft bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">রিমাইন্ডার পরিসংখ্যান</p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-blue-800 dark:text-blue-200">এই মাসে পাঠানো</p>
                      <p className="text-2xl font-bold text-blue-600">৪৫</p>
                    </div>
                    <div>
                      <p className="text-blue-800 dark:text-blue-200">সফল রেট</p>
                      <p className="text-2xl font-bold text-green-600">৭৮%</p>
                    </div>
                    <div>
                      <p className="text-blue-800 dark:text-blue-200">গড় রেসপন্স টাইম</p>
                      <p className="text-2xl font-bold text-purple-600">২.৩ দিন</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card className="shadow-soft">
            <Tabs defaultValue="all">
              <CardHeader>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">সব</TabsTrigger>
                  <TabsTrigger value="completed">সম্পন্ন</TabsTrigger>
                  <TabsTrigger value="pending">অপেক্ষমাণ</TabsTrigger>
                  <TabsTrigger value="failed">ব্যর্থ</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent>
                <TabsContent value="all" className="mt-0">
                  <div className="space-y-4">
                    {mockPayments.map((payment) => (
                      <div key={payment.id} className="border rounded-xl p-4 hover:bg-accent hover:text-accent-foreground transition-colors shadow-soft">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="font-semibold">{payment.id}</span>
                              {getStatusBadge(payment.status)}
                              {getMethodBadge(payment.method)}
                            </div>
                            <div className="text-sm space-y-1">
                              <p><span className="text-muted-foreground">অর্ডার:</span> <span className="font-medium">{payment.orderId}</span></p>
                              <p><span className="text-muted-foreground">কাস্টমার:</span> {payment.customer}</p>
                              <p><span className="text-muted-foreground">ট্রানজেকশন আইডি:</span> {payment.transactionId}</p>
                              <p><span className="text-muted-foreground">তারিখ:</span> {payment.date} • {payment.time}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <div className="text-2xl font-bold text-primary">৳{payment.amount}</div>
                            <div className="flex gap-2">
                              {payment.status === "pending" && (
                                <>
                                  <Button size="sm" variant="default">ভেরিফাই করুন</Button>
                                  <Button size="sm" variant="outline">বাতিল</Button>
                                </>
                              )}
                              {payment.status === "completed" && (
                                <Button size="sm" variant="outline">রিসিট দেখুন</Button>
                              )}
                              {payment.status === "failed" && (
                                <Button size="sm" variant="outline">পুনরায় চেষ্টা</Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="completed" className="mt-0">
                  <div className="space-y-4">
                    {mockPayments.filter(p => p.status === "completed").map((payment) => (
                      <div key={payment.id} className="border rounded-xl p-4 shadow-soft">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{payment.id}</p>
                            <p className="text-sm text-muted-foreground">{payment.customer}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-primary">৳{payment.amount}</p>
                            {getMethodBadge(payment.method)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="pending" className="mt-0">
                  <div className="space-y-4">
                    {mockPayments.filter(p => p.status === "pending").map((payment) => (
                      <div key={payment.id} className="border rounded-xl p-4 shadow-soft">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{payment.id}</p>
                            <p className="text-sm text-muted-foreground">{payment.customer}</p>
                          </div>
                          <Button size="sm">ভেরিফাই করুন</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="failed" className="mt-0">
                  <div className="space-y-4">
                    {mockPayments.filter(p => p.status === "failed").map((payment) => (
                      <div key={payment.id} className="border rounded-xl p-4 shadow-soft">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{payment.id}</p>
                            <p className="text-sm text-muted-foreground">{payment.customer}</p>
                          </div>
                          <Button size="sm" variant="outline">পুনরায় চেষ্টা</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}