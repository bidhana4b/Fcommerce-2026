import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  MoreVertical,
  Edit,
  Trash2,
  FileText,
  Package,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  TrendingUp,
  ShoppingCart,
  Calendar,
  Send,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  category: string;
  totalOrders: number;
  totalAmount: number;
  pendingPayment: number;
  rating: number;
  status: "active" | "inactive";
  lastOrder: string;
}

interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  items: number;
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  expectedDelivery: string;
}

const sampleSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Tech Suppliers Ltd",
    contactPerson: "মোঃ করিম",
    phone: "01712345678",
    email: "karim@techsuppliers.com",
    address: "গুলশান-২, ঢাকা",
    category: "ইলেকট্রনিক্স",
    totalOrders: 45,
    totalAmount: 850000,
    pendingPayment: 25000,
    rating: 4.8,
    status: "active",
    lastOrder: "২ দিন আগে",
  },
  {
    id: "2",
    name: "Garments Hub",
    contactPerson: "ফাতেমা বেগম",
    phone: "01812345678",
    email: "fatema@garmentshub.com",
    address: "মিরপুর-১০, ঢাকা",
    category: "পোশাক",
    totalOrders: 32,
    totalAmount: 420000,
    pendingPayment: 0,
    rating: 4.5,
    status: "active",
    lastOrder: "১ সপ্তাহ আগে",
  },
  {
    id: "3",
    name: "Beauty Imports",
    contactPerson: "রহিম উদ্দিন",
    phone: "01912345678",
    email: "rahim@beautyimports.com",
    address: "বনানী, ঢাকা",
    category: "সৌন্দর্য",
    totalOrders: 18,
    totalAmount: 180000,
    pendingPayment: 15000,
    rating: 4.2,
    status: "active",
    lastOrder: "৩ দিন আগে",
  },
  {
    id: "4",
    name: "Food Distributors",
    contactPerson: "আলী হোসেন",
    phone: "01612345678",
    email: "ali@fooddist.com",
    address: "মতিঝিল, ঢাকা",
    category: "খাবার",
    totalOrders: 8,
    totalAmount: 95000,
    pendingPayment: 0,
    rating: 3.8,
    status: "inactive",
    lastOrder: "১ মাস আগে",
  },
];

const samplePurchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-2024-001",
    supplierId: "1",
    supplierName: "Tech Suppliers Ltd",
    items: 5,
    totalAmount: 45000,
    status: "shipped",
    orderDate: "১৫ জানুয়ারি",
    expectedDelivery: "২০ জানুয়ারি",
  },
  {
    id: "PO-2024-002",
    supplierId: "2",
    supplierName: "Garments Hub",
    items: 12,
    totalAmount: 28000,
    status: "confirmed",
    orderDate: "১৮ জানুয়ারি",
    expectedDelivery: "২৫ জানুয়ারি",
  },
  {
    id: "PO-2024-003",
    supplierId: "3",
    supplierName: "Beauty Imports",
    items: 8,
    totalAmount: 15000,
    status: "pending",
    orderDate: "২০ জানুয়ারি",
    expectedDelivery: "২৮ জানুয়ারি",
  },
];

export default function Suppliers() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddSupplierDialog, setShowAddSupplierDialog] = useState(false);
  const [showPurchaseOrderDialog, setShowPurchaseOrderDialog] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    category: "",
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">সক্রিয়</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-700">নিষ্ক্রিয়</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">পেন্ডিং</Badge>;
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-700">কনফার্মড</Badge>;
      case "shipped":
        return <Badge className="bg-purple-100 text-purple-700">শিপড</Badge>;
      case "delivered":
        return <Badge className="bg-green-100 text-green-700">ডেলিভার্ড</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700">বাতিল</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredSuppliers = sampleSuppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactPerson.includes(searchQuery) ||
      supplier.phone.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || supplier.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddSupplier = () => {
    if (!newSupplier.name || !newSupplier.phone) {
      toast({
        title: "তথ্য অসম্পূর্ণ",
        description: "নাম এবং ফোন নম্বর আবশ্যক",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "সাপ্লায়ার যোগ হয়েছে",
      description: `${newSupplier.name} সফলভাবে যোগ করা হয়েছে`,
    });
    setShowAddSupplierDialog(false);
    setNewSupplier({ name: "", contactPerson: "", phone: "", email: "", address: "", category: "" });
  };

  // Stats
  const totalSuppliers = sampleSuppliers.length;
  const activeSuppliers = sampleSuppliers.filter((s) => s.status === "active").length;
  const totalPendingPayment = sampleSuppliers.reduce((sum, s) => sum + s.pendingPayment, 0);
  const pendingOrders = samplePurchaseOrders.filter((o) => o.status === "pending" || o.status === "confirmed").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">সাপ্লায়ার ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground mt-1">সাপ্লায়ার ও পার্চেজ অর্ডার পরিচালনা করুন</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setShowPurchaseOrderDialog(true)}>
            <ShoppingCart className="h-4 w-4" />
            নতুন অর্ডার
          </Button>
          <Button className="gap-2" onClick={() => setShowAddSupplierDialog(true)}>
            <Plus className="h-4 w-4" />
            নতুন সাপ্লায়ার
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">মোট সাপ্লায়ার</p>
                <p className="text-2xl font-bold">{totalSuppliers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">সক্রিয় সাপ্লায়ার</p>
                <p className="text-2xl font-bold text-green-600">{activeSuppliers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">বকেয়া পেমেন্ট</p>
                <p className="text-2xl font-bold text-yellow-600">৳{totalPendingPayment.toLocaleString("bn-BD")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">পেন্ডিং অর্ডার</p>
                <p className="text-2xl font-bold">{pendingOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="suppliers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suppliers">সাপ্লায়ার তালিকা</TabsTrigger>
          <TabsTrigger value="orders">পার্চেজ অর্ডার</TabsTrigger>
          <TabsTrigger value="payments">পেমেন্ট</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="সাপ্লায়ার খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="ক্যাটাগরি" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                    <SelectItem value="ইলেকট্রনিক্স">ইলেকট্রনিক্স</SelectItem>
                    <SelectItem value="পোশাক">পোশাক</SelectItem>
                    <SelectItem value="খাবার">খাবার</SelectItem>
                    <SelectItem value="সৌন্দর্য">সৌন্দর্য</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Suppliers Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSuppliers.map((supplier) => (
              <Card key={supplier.id} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{supplier.name}</h3>
                        <p className="text-sm text-muted-foreground">{supplier.category}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          এডিট করুন
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          অর্ডার করুন
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          হিস্ট্রি দেখুন
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          ডিলিট করুন
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{supplier.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{supplier.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{supplier.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{supplier.rating}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">মোট অর্ডার</p>
                      <p className="font-semibold">{supplier.totalOrders}</p>
                    </div>
                    {getStatusBadge(supplier.status)}
                  </div>

                  {supplier.pendingPayment > 0 && (
                    <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        বকেয়া: ৳{supplier.pendingPayment.toLocaleString("bn-BD")}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>পার্চেজ অর্ডার</CardTitle>
              <CardDescription>সাম্প্রতিক পার্চেজ অর্ডারসমূহ</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>অর্ডার ID</TableHead>
                    <TableHead>সাপ্লায়ার</TableHead>
                    <TableHead className="text-center">আইটেম</TableHead>
                    <TableHead className="text-right">মোট</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead>ডেলিভারি</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {samplePurchaseOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <code className="text-sm bg-muted px-2 py-1 rounded">{order.id}</code>
                      </TableCell>
                      <TableCell>{order.supplierName}</TableCell>
                      <TableCell className="text-center">{order.items}</TableCell>
                      <TableCell className="text-right font-medium">
                        ৳{order.totalAmount.toLocaleString("bn-BD")}
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {order.expectedDelivery}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          বিস্তারিত
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>পেমেন্ট সামারি</CardTitle>
              <CardDescription>সাপ্লায়ার পেমেন্ট ট্র্যাকিং</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleSuppliers
                  .filter((s) => s.pendingPayment > 0)
                  .map((supplier) => (
                    <div key={supplier.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{supplier.name}</p>
                          <p className="text-sm text-muted-foreground">শেষ অর্ডার: {supplier.lastOrder}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-yellow-600">
                          ৳{supplier.pendingPayment.toLocaleString("bn-BD")}
                        </p>
                        <Button size="sm" variant="outline" className="mt-2">
                          পেমেন্ট করুন
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Supplier Dialog */}
      <Dialog open={showAddSupplierDialog} onOpenChange={setShowAddSupplierDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>নতুন সাপ্লায়ার যোগ করুন</DialogTitle>
            <DialogDescription>সাপ্লায়ারের বিস্তারিত তথ্য দিন</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>কোম্পানির নাম *</Label>
                <Input
                  placeholder="কোম্পানির নাম"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>যোগাযোগকারী</Label>
                <Input
                  placeholder="ব্যক্তির নাম"
                  value={newSupplier.contactPerson}
                  onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ফোন *</Label>
                <Input
                  placeholder="01XXXXXXXXX"
                  value={newSupplier.phone}
                  onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>ইমেইল</Label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={newSupplier.email}
                  onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>ক্যাটাগরি</Label>
              <Select
                value={newSupplier.category}
                onValueChange={(v) => setNewSupplier({ ...newSupplier, category: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ইলেকট্রনিক্স">ইলেকট্রনিক্স</SelectItem>
                  <SelectItem value="পোশাক">পোশাক</SelectItem>
                  <SelectItem value="খাবার">খাবার</SelectItem>
                  <SelectItem value="সৌন্দর্য">সৌন্দর্য</SelectItem>
                  <SelectItem value="গৃহস্থালি">গৃহস্থালি</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>ঠিকানা</Label>
              <Textarea
                placeholder="সম্পূর্ণ ঠিকানা"
                value={newSupplier.address}
                onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddSupplierDialog(false)}>
              বাতিল
            </Button>
            <Button onClick={handleAddSupplier}>
              <Plus className="h-4 w-4 mr-2" />
              যোগ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Purchase Order Dialog */}
      <Dialog open={showPurchaseOrderDialog} onOpenChange={setShowPurchaseOrderDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>নতুন পার্চেজ অর্ডার</DialogTitle>
            <DialogDescription>সাপ্লায়ারের কাছে অর্ডার দিন</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>সাপ্লায়ার নির্বাচন করুন</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="সাপ্লায়ার নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {sampleSuppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>প্রত্যাশিত ডেলিভারি তারিখ</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>নোট</Label>
              <Textarea placeholder="অতিরিক্ত নির্দেশনা..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPurchaseOrderDialog(false)}>
              বাতিল
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              অর্ডার পাঠান
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
