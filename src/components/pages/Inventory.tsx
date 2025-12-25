import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
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
  Package,
  Plus,
  Minus,
  Search,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Barcode,
  History,
  AlertCircle,
  CheckCircle2,
  Clock,
  Warehouse,
  Truck,
  ShoppingCart,
  Filter,
  FileSpreadsheet,
  Printer,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface InventoryItem {
  id: string;
  name: string;
  nameBn: string;
  sku: string;
  barcode: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  supplier: string;
  location: string;
  lastRestocked: string;
  status: "in-stock" | "low-stock" | "out-of-stock" | "overstock";
}

interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: "in" | "out" | "adjustment" | "return";
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  reference: string;
  date: string;
  user: string;
}

const sampleInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Wireless Earbuds Pro",
    nameBn: "ওয়্যারলেস ইয়ারবাড প্রো",
    sku: "WEP-001",
    barcode: "8801234567890",
    category: "ইলেকট্রনিক্স",
    currentStock: 45,
    minStock: 10,
    maxStock: 100,
    reorderPoint: 20,
    unit: "পিস",
    costPrice: 1800,
    sellingPrice: 2500,
    supplier: "Tech Suppliers Ltd",
    location: "Shelf A-1",
    lastRestocked: "২ দিন আগে",
    status: "in-stock",
  },
  {
    id: "2",
    name: "Cotton T-Shirt",
    nameBn: "কটন টি-শার্ট",
    sku: "CTS-001",
    barcode: "8801234567891",
    category: "পোশাক",
    currentStock: 8,
    minStock: 20,
    maxStock: 150,
    reorderPoint: 30,
    unit: "পিস",
    costPrice: 280,
    sellingPrice: 450,
    supplier: "Garments Hub",
    location: "Shelf B-3",
    lastRestocked: "১ সপ্তাহ আগে",
    status: "low-stock",
  },
  {
    id: "3",
    name: "Organic Green Tea",
    nameBn: "অর্গানিক গ্রিন টি",
    sku: "OGT-001",
    barcode: "8801234567892",
    category: "খাবার",
    currentStock: 0,
    minStock: 15,
    maxStock: 80,
    reorderPoint: 25,
    unit: "প্যাকেট",
    costPrice: 220,
    sellingPrice: 350,
    supplier: "Tea Gardens Co",
    location: "Shelf C-2",
    lastRestocked: "২ সপ্তাহ আগে",
    status: "out-of-stock",
  },
  {
    id: "4",
    name: "Face Moisturizer",
    nameBn: "ফেস ময়েশ্চারাইজার",
    sku: "FM-001",
    barcode: "8801234567893",
    category: "সৌন্দর্য",
    currentStock: 120,
    minStock: 10,
    maxStock: 50,
    reorderPoint: 15,
    unit: "পিস",
    costPrice: 550,
    sellingPrice: 850,
    supplier: "Beauty Imports",
    location: "Shelf D-1",
    lastRestocked: "আজ",
    status: "overstock",
  },
];

const sampleMovements: StockMovement[] = [
  {
    id: "1",
    productId: "1",
    productName: "ওয়্যারলেস ইয়ারবাড প্রো",
    type: "in",
    quantity: 50,
    previousStock: 20,
    newStock: 70,
    reason: "নতুন স্টক",
    reference: "PO-2024-001",
    date: "আজ ১০:৩০",
    user: "Admin",
  },
  {
    id: "2",
    productId: "2",
    productName: "কটন টি-শার্ট",
    type: "out",
    quantity: 5,
    previousStock: 13,
    newStock: 8,
    reason: "বিক্রয়",
    reference: "INV-2024-156",
    date: "আজ ০৯:১৫",
    user: "Cashier",
  },
  {
    id: "3",
    productId: "4",
    productName: "ফেস ময়েশ্চারাইজার",
    type: "adjustment",
    quantity: -2,
    previousStock: 122,
    newStock: 120,
    reason: "ক্ষতিগ্রস্ত পণ্য",
    reference: "ADJ-2024-012",
    date: "গতকাল",
    user: "Manager",
  },
  {
    id: "4",
    productId: "1",
    productName: "ওয়্যারলেস ইয়ারবাড প্রো",
    type: "return",
    quantity: 2,
    previousStock: 68,
    newStock: 70,
    reason: "কাস্টমার রিটার্ন",
    reference: "RET-2024-008",
    date: "গতকাল",
    user: "Cashier",
  },
];

export default function Inventory() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showStockDialog, setShowStockDialog] = useState(false);
  const [showAdjustmentDialog, setShowAdjustmentDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [stockAction, setStockAction] = useState<"add" | "remove">("add");
  const [stockQuantity, setStockQuantity] = useState("");
  const [stockReason, setStockReason] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-stock":
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">স্টকে আছে</Badge>;
      case "low-stock":
        return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">কম স্টক</Badge>;
      case "out-of-stock":
        return <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">স্টক নেই</Badge>;
      case "overstock":
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">অতিরিক্ত স্টক</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "in":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "out":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "adjustment":
        return <RefreshCw className="h-4 w-4 text-yellow-600" />;
      case "return":
        return <ArrowUpDown className="h-4 w-4 text-blue-600" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const filteredInventory = sampleInventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameBn.includes(searchQuery) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.barcode.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleStockUpdate = () => {
    if (!selectedItem || !stockQuantity) return;
    
    const qty = parseInt(stockQuantity);
    const action = stockAction === "add" ? "যোগ" : "বাদ";
    
    toast({
      title: "স্টক আপডেট হয়েছে",
      description: `${selectedItem.nameBn} - ${qty} ${selectedItem.unit} ${action} করা হয়েছে`,
    });
    
    setShowStockDialog(false);
    setSelectedItem(null);
    setStockQuantity("");
    setStockReason("");
  };

  // Stats
  const totalProducts = sampleInventory.length;
  const lowStockCount = sampleInventory.filter((i) => i.status === "low-stock").length;
  const outOfStockCount = sampleInventory.filter((i) => i.status === "out-of-stock").length;
  const totalValue = sampleInventory.reduce((sum, i) => sum + i.currentStock * i.costPrice, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ইনভেন্টরি ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground mt-1">স্টক ও ইনভেন্টরি নিয়ন্ত্রণ করুন</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            এক্সপোর্ট
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            ইমপোর্ট
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            নতুন পণ্য
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">মোট পণ্য</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">কম স্টক</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">স্টক নেই</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Warehouse className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">মোট মূল্য</p>
                <p className="text-2xl font-bold">৳{totalValue.toLocaleString("bn-BD")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">ইনভেন্টরি</TabsTrigger>
          <TabsTrigger value="movements">স্টক মুভমেন্ট</TabsTrigger>
          <TabsTrigger value="alerts">সতর্কতা</TabsTrigger>
          <TabsTrigger value="reports">রিপোর্ট</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="পণ্য খুঁজুন (নাম, SKU, বারকোড)..."
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
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="স্ট্যাটাস" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                    <SelectItem value="in-stock">স্টকে আছে</SelectItem>
                    <SelectItem value="low-stock">কম স্টক</SelectItem>
                    <SelectItem value="out-of-stock">স্টক নেই</SelectItem>
                    <SelectItem value="overstock">অতিরিক্ত স্টক</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Barcode className="h-4 w-4" />
                  স্ক্যান
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>পণ্য</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>ক্যাটাগরি</TableHead>
                    <TableHead className="text-center">স্টক</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead className="text-right">মূল্য</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.nameBn}</p>
                          <p className="text-sm text-muted-foreground">{item.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-sm bg-muted px-2 py-1 rounded">{item.sku}</code>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <div className="text-center">
                          <p className="font-bold">{item.currentStock} {item.unit}</p>
                          <Progress
                            value={(item.currentStock / item.maxStock) * 100}
                            className={`h-1.5 mt-1 ${
                              item.status === "out-of-stock"
                                ? "[&>div]:bg-red-500"
                                : item.status === "low-stock"
                                ? "[&>div]:bg-yellow-500"
                                : item.status === "overstock"
                                ? "[&>div]:bg-blue-500"
                                : ""
                            }`}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Min: {item.minStock} | Max: {item.maxStock}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-right">
                        <div>
                          <p className="font-medium">৳{item.sellingPrice.toLocaleString("bn-BD")}</p>
                          <p className="text-xs text-muted-foreground">
                            খরচ: ৳{item.costPrice.toLocaleString("bn-BD")}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>অ্যাকশন</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedItem(item);
                                setStockAction("add");
                                setShowStockDialog(true);
                              }}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              স্টক যোগ করুন
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedItem(item);
                                setStockAction("remove");
                                setShowStockDialog(true);
                              }}
                            >
                              <Minus className="h-4 w-4 mr-2" />
                              স্টক বাদ দিন
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              এডিট করুন
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <History className="h-4 w-4 mr-2" />
                              হিস্ট্রি দেখুন
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              ডিলিট করুন
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>স্টক মুভমেন্ট হিস্ট্রি</CardTitle>
              <CardDescription>সাম্প্রতিক স্টক পরিবর্তনসমূহ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleMovements.map((movement) => (
                  <div
                    key={movement.id}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className={`p-2 rounded-full ${
                      movement.type === "in"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : movement.type === "out"
                        ? "bg-red-100 dark:bg-red-900/30"
                        : movement.type === "adjustment"
                        ? "bg-yellow-100 dark:bg-yellow-900/30"
                        : "bg-blue-100 dark:bg-blue-900/30"
                    }`}>
                      {getMovementIcon(movement.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{movement.productName}</p>
                      <p className="text-sm text-muted-foreground">{movement.reason}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{movement.reference}</Badge>
                        <span className="text-xs text-muted-foreground">{movement.date}</span>
                        <span className="text-xs text-muted-foreground">• {movement.user}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        movement.type === "in" || movement.type === "return"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}>
                        {movement.type === "in" || movement.type === "return" ? "+" : "-"}
                        {Math.abs(movement.quantity)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {movement.previousStock} → {movement.newStock}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Low Stock Alerts */}
            <Card className="border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="h-5 w-5" />
                  কম স্টক সতর্কতা
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleInventory
                    .filter((i) => i.status === "low-stock")
                    .map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div>
                          <p className="font-medium">{item.nameBn}</p>
                          <p className="text-sm text-muted-foreground">
                            বর্তমান: {item.currentStock} | ন্যূনতম: {item.minStock}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          অর্ডার করুন
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Out of Stock Alerts */}
            <Card className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  স্টক শেষ সতর্কতা
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleInventory
                    .filter((i) => i.status === "out-of-stock")
                    .map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div>
                          <p className="font-medium">{item.nameBn}</p>
                          <p className="text-sm text-muted-foreground">
                            সাপ্লায়ার: {item.supplier}
                          </p>
                        </div>
                        <Button size="sm" variant="destructive">
                          জরুরি অর্ডার
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <FileSpreadsheet className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">স্টক রিপোর্ট</h3>
                <p className="text-sm text-muted-foreground mb-4">সম্পূর্ণ স্টক তালিকা</p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  ডাউনলোড
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <h3 className="font-semibold mb-2">মুভমেন্ট রিপোর্ট</h3>
                <p className="text-sm text-muted-foreground mb-4">স্টক ইন/আউট বিশ্লেষণ</p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  ডাউনলোড
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <Printer className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">বারকোড প্রিন্ট</h3>
                <p className="text-sm text-muted-foreground mb-4">পণ্যের বারকোড প্রিন্ট</p>
                <Button variant="outline" className="w-full">
                  <Printer className="h-4 w-4 mr-2" />
                  প্রিন্ট
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Stock Update Dialog */}
      <Dialog open={showStockDialog} onOpenChange={setShowStockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {stockAction === "add" ? "স্টক যোগ করুন" : "স্টক বাদ দিন"}
            </DialogTitle>
            <DialogDescription>
              {selectedItem?.nameBn} - বর্তমান স্টক: {selectedItem?.currentStock} {selectedItem?.unit}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>পরিমাণ</Label>
              <Input
                type="number"
                placeholder="পরিমাণ লিখুন"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>কারণ</Label>
              <Select value={stockReason} onValueChange={setStockReason}>
                <SelectTrigger>
                  <SelectValue placeholder="কারণ নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {stockAction === "add" ? (
                    <>
                      <SelectItem value="purchase">নতুন ক্রয়</SelectItem>
                      <SelectItem value="return">কাস্টমার রিটার্ন</SelectItem>
                      <SelectItem value="transfer">ট্রান্সফার</SelectItem>
                      <SelectItem value="adjustment">অ্যাডজাস্টমেন্ট</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="sale">বিক্রয়</SelectItem>
                      <SelectItem value="damage">ক্ষতিগ্রস্ত</SelectItem>
                      <SelectItem value="expired">মেয়াদ উত্তীর্ণ</SelectItem>
                      <SelectItem value="transfer">ট্রান্সফার</SelectItem>
                      <SelectItem value="adjustment">অ্যাডজাস্টমেন্ট</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>নোট (ঐচ্ছিক)</Label>
              <Textarea placeholder="অতিরিক্ত তথ্য..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStockDialog(false)}>
              বাতিল
            </Button>
            <Button onClick={handleStockUpdate}>
              {stockAction === "add" ? (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  যোগ করুন
                </>
              ) : (
                <>
                  <Minus className="h-4 w-4 mr-2" />
                  বাদ দিন
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
