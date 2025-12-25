import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Search,
  Barcode,
  CreditCard,
  Banknote,
  Smartphone,
  QrCode,
  User,
  UserPlus,
  Package,
  Tag,
  Percent,
  Receipt,
  Printer,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Wifi,
  WifiOff,
  RefreshCw,
  Settings,
  Grid3X3,
  List,
  Calculator,
  Gift,
  Truck,
  Calendar,
  Phone,
  Mail,
  MapPin,
  History,
  Star,
  TrendingUp,
  DollarSign,
  MoreVertical,
  Edit,
  Eye,
  Download,
  Upload,
  Pause,
  Play,
  X,
  ChevronRight,
  ChevronDown,
  FolderOpen,
  Layers,
  Zap,
  Target,
  Award,
  Heart,
  MessageSquare,
  Share2,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Types
interface Product {
  id: string;
  name: string;
  nameBn: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: string;
  image: string;
  barcode: string;
  sku: string;
  unit: string;
  lowStockThreshold: number;
}

interface CartItem extends Product {
  quantity: number;
  discount: number;
  discountType: "percent" | "fixed";
  note?: string;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  totalPurchases: number;
  loyaltyPoints: number;
  lastVisit: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  nameBn: string;
  icon: string;
  color: string;
  productCount: number;
}

interface HeldOrder {
  id: string;
  items: CartItem[];
  customer: Customer | null;
  createdAt: Date;
  note?: string;
}

// Sample Data
const sampleCategories: Category[] = [
  { id: "all", name: "All", nameBn: "সব", icon: "📦", color: "bg-gray-100", productCount: 50 },
  { id: "electronics", name: "Electronics", nameBn: "ইলেকট্রনিক্স", icon: "📱", color: "bg-blue-100", productCount: 15 },
  { id: "clothing", name: "Clothing", nameBn: "পোশাক", icon: "👕", color: "bg-pink-100", productCount: 20 },
  { id: "food", name: "Food & Beverage", nameBn: "খাবার", icon: "🍔", color: "bg-orange-100", productCount: 8 },
  { id: "beauty", name: "Beauty", nameBn: "সৌন্দর্য", icon: "💄", color: "bg-purple-100", productCount: 12 },
  { id: "home", name: "Home & Living", nameBn: "গৃহস্থালি", icon: "🏠", color: "bg-green-100", productCount: 10 },
];

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Earbuds Pro",
    nameBn: "ওয়্যারলেস ইয়ারবাড প্রো",
    price: 2500,
    originalPrice: 3000,
    stock: 45,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&q=80",
    barcode: "8801234567890",
    sku: "WEP-001",
    unit: "পিস",
    lowStockThreshold: 10,
  },
  {
    id: "2",
    name: "Cotton T-Shirt",
    nameBn: "কটন টি-শার্ট",
    price: 450,
    stock: 120,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
    barcode: "8801234567891",
    sku: "CTS-001",
    unit: "পিস",
    lowStockThreshold: 20,
  },
  {
    id: "3",
    name: "Organic Green Tea",
    nameBn: "অর্গানিক গ্রিন টি",
    price: 350,
    stock: 80,
    category: "food",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&q=80",
    barcode: "8801234567892",
    sku: "OGT-001",
    unit: "প্যাকেট",
    lowStockThreshold: 15,
  },
  {
    id: "4",
    name: "Face Moisturizer",
    nameBn: "ফেস ময়েশ্চারাইজার",
    price: 850,
    originalPrice: 1000,
    stock: 35,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&q=80",
    barcode: "8801234567893",
    sku: "FM-001",
    unit: "পিস",
    lowStockThreshold: 10,
  },
  {
    id: "5",
    name: "Smart Watch",
    nameBn: "স্মার্ট ওয়াচ",
    price: 4500,
    originalPrice: 5500,
    stock: 25,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
    barcode: "8801234567894",
    sku: "SW-001",
    unit: "পিস",
    lowStockThreshold: 5,
  },
  {
    id: "6",
    name: "Denim Jeans",
    nameBn: "ডেনিম জিন্স",
    price: 1200,
    stock: 60,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80",
    barcode: "8801234567895",
    sku: "DJ-001",
    unit: "পিস",
    lowStockThreshold: 15,
  },
  {
    id: "7",
    name: "Ceramic Mug Set",
    nameBn: "সিরামিক মগ সেট",
    price: 650,
    stock: 40,
    category: "home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200&q=80",
    barcode: "8801234567896",
    sku: "CMS-001",
    unit: "সেট",
    lowStockThreshold: 10,
  },
  {
    id: "8",
    name: "Lipstick Collection",
    nameBn: "লিপস্টিক কালেকশন",
    price: 550,
    stock: 90,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&q=80",
    barcode: "8801234567897",
    sku: "LC-001",
    unit: "পিস",
    lowStockThreshold: 20,
  },
];

const sampleCustomers: Customer[] = [
  {
    id: "1",
    name: "রহিম উদ্দিন",
    phone: "01712345678",
    email: "rahim@email.com",
    address: "ধানমন্ডি, ঢাকা",
    totalPurchases: 15600,
    loyaltyPoints: 156,
    lastVisit: "২ দিন আগে",
    tags: ["VIP", "Regular"],
  },
  {
    id: "2",
    name: "করিম সাহেব",
    phone: "01812345678",
    email: "karim@email.com",
    address: "গুলশান, ঢাকা",
    totalPurchases: 45000,
    loyaltyPoints: 450,
    lastVisit: "আজ",
    tags: ["VIP", "Wholesale"],
  },
  {
    id: "3",
    name: "ফাতেমা বেগম",
    phone: "01912345678",
    address: "মিরপুর, ঢাকা",
    totalPurchases: 8500,
    loyaltyPoints: 85,
    lastVisit: "১ সপ্তাহ আগে",
    tags: ["Regular"],
  },
];

// Network Status Component
function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing" | "pending">("synced");
  const [pendingTransactions, setPendingTransactions] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (pendingTransactions > 0) {
        setSyncStatus("syncing");
        setTimeout(() => {
          setSyncStatus("synced");
          setPendingTransactions(0);
        }, 2000);
      }
    };
    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus("pending");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [pendingTransactions]);

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
      !isOnline 
        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" 
        : syncStatus === "syncing"
          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
    }`}>
      {!isOnline ? (
        <>
          <WifiOff className="h-4 w-4 animate-pulse" />
          <span>অফলাইন</span>
          {pendingTransactions > 0 && (
            <Badge variant="destructive" className="ml-1 text-xs">{pendingTransactions}</Badge>
          )}
        </>
      ) : syncStatus === "syncing" ? (
        <>
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>সিঙ্ক হচ্ছে...</span>
        </>
      ) : (
        <>
          <Wifi className="h-4 w-4" />
          <span>অনলাইন</span>
          <CheckCircle2 className="h-3 w-3" />
        </>
      )}
    </div>
  );
}

// Quick Calculator Component
function QuickCalculator({ onResult }: { onResult: (value: number) => void }) {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const handleNumber = (num: string) => {
    setDisplay(display === "0" ? num : display + num);
  };

  const handleOperation = (op: string) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setDisplay("0");
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      let result = 0;
      switch (operation) {
        case "+": result = previousValue + current; break;
        case "-": result = previousValue - current; break;
        case "*": result = previousValue * current; break;
        case "/": result = previousValue / current; break;
      }
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
  };

  return (
    <div className="p-4 bg-muted/50 rounded-lg">
      <div className="bg-background p-3 rounded-lg mb-3 text-right">
        <p className="text-2xl font-mono font-bold">{display}</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((btn) => (
          <Button
            key={btn}
            variant={["/", "*", "-", "+", "="].includes(btn) ? "default" : "outline"}
            className="h-12 text-lg font-semibold"
            onClick={() => {
              if (btn === "=") handleEquals();
              else if (["/", "*", "-", "+"].includes(btn)) handleOperation(btn);
              else handleNumber(btn);
            }}
          >
            {btn}
          </Button>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <Button variant="destructive" className="flex-1" onClick={handleClear}>C</Button>
        <Button variant="secondary" className="flex-1" onClick={() => onResult(parseFloat(display))}>
          ব্যবহার করুন
        </Button>
      </div>
    </div>
  );
}

export default function POS() {
  const { toast } = useToast();
  const barcodeInputRef = useRef<HTMLInputElement>(null);
  
  // State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCalculator, setShowCalculator] = useState(false);
  const [heldOrders, setHeldOrders] = useState<HeldOrder[]>([]);
  const [globalDiscount, setGlobalDiscount] = useState(0);
  const [globalDiscountType, setGlobalDiscountType] = useState<"percent" | "fixed">("percent");
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [amountReceived, setAmountReceived] = useState("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [showNewCustomerDialog, setShowNewCustomerDialog] = useState(false);
  const [showNewProductDialog, setShowNewProductDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showHeldOrdersSheet, setShowHeldOrdersSheet] = useState(false);
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");
  const [isDeliveryOrder, setIsDeliveryOrder] = useState(false);
  
  // New Customer Form
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // New Product Form
  const [newProduct, setNewProduct] = useState({
    name: "",
    nameBn: "",
    price: "",
    stock: "",
    category: "",
    barcode: "",
    sku: "",
    unit: "পিস",
  });

  // New Category Form
  const [newCategory, setNewCategory] = useState({
    name: "",
    nameBn: "",
    icon: "📦",
    color: "bg-gray-100",
  });

  // Filter products
  const filteredProducts = sampleProducts.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameBn.includes(searchQuery) ||
      product.barcode.includes(searchQuery) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    const discount = item.discountType === "percent" 
      ? itemTotal * (item.discount / 100) 
      : item.discount;
    return sum + (itemTotal - discount);
  }, 0);

  const globalDiscountAmount = globalDiscountType === "percent" 
    ? subtotal * (globalDiscount / 100) 
    : globalDiscount;

  const total = subtotal - globalDiscountAmount;
  const change = parseFloat(amountReceived) - total;

  // Cart functions
  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast({
        title: "স্টক নেই",
        description: `${product.nameBn} এর স্টক শেষ`,
        variant: "destructive",
      });
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast({
          title: "স্টক সীমিত",
          description: `${product.nameBn} এর স্টক ${product.stock} টি`,
          variant: "destructive",
        });
        return;
      }
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, discount: 0, discountType: "percent" }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedCustomer(null);
    setGlobalDiscount(0);
    setAmountReceived("");
    setIsDeliveryOrder(false);
    setDeliveryAddress("");
    setDeliveryDate("");
    setDeliveryNote("");
  };

  const holdOrder = () => {
    if (cart.length === 0) return;
    const newHeldOrder: HeldOrder = {
      id: `HOLD-${Date.now()}`,
      items: [...cart],
      customer: selectedCustomer,
      createdAt: new Date(),
    };
    setHeldOrders([...heldOrders, newHeldOrder]);
    clearCart();
    toast({
      title: "অর্ডার হোল্ড করা হয়েছে",
      description: `অর্ডার ${newHeldOrder.id} সেভ করা হয়েছে`,
    });
  };

  const recallOrder = (order: HeldOrder) => {
    setCart(order.items);
    setSelectedCustomer(order.customer);
    setHeldOrders(heldOrders.filter((o) => o.id !== order.id));
    setShowHeldOrdersSheet(false);
  };

  const processPayment = () => {
    // Simulate payment processing
    toast({
      title: "পেমেন্ট সফল!",
      description: `৳${total.toLocaleString("bn-BD")} পেমেন্ট সম্পন্ন হয়েছে`,
    });
    setShowPaymentDialog(false);
    clearCart();
  };

  const handleBarcodeInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const barcode = (e.target as HTMLInputElement).value;
      const product = sampleProducts.find((p) => p.barcode === barcode);
      if (product) {
        addToCart(product);
        (e.target as HTMLInputElement).value = "";
      } else {
        toast({
          title: "পণ্য পাওয়া যায়নি",
          description: `বারকোড: ${barcode}`,
          variant: "destructive",
        });
      }
    }
  };

  const addNewCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) {
      toast({
        title: "তথ্য অসম্পূর্ণ",
        description: "নাম এবং ফোন নম্বর আবশ্যক",
        variant: "destructive",
      });
      return;
    }
    const customer: Customer = {
      id: `CUST-${Date.now()}`,
      ...newCustomer,
      totalPurchases: 0,
      loyaltyPoints: 0,
      lastVisit: "এখন",
      tags: ["New"],
    };
    setSelectedCustomer(customer);
    setShowNewCustomerDialog(false);
    setNewCustomer({ name: "", phone: "", email: "", address: "" });
    toast({
      title: "কাস্টমার যোগ হয়েছে",
      description: `${customer.name} সফলভাবে যোগ করা হয়েছে`,
    });
  };

  const addNewProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast({
        title: "তথ্য অসম্পূর্ণ",
        description: "নাম, দাম এবং ক্যাটাগরি আবশ্যক",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "পণ্য যোগ হয়েছে",
      description: `${newProduct.name} সফলভাবে যোগ করা হয়েছে`,
    });
    setShowNewProductDialog(false);
    setNewProduct({ name: "", nameBn: "", price: "", stock: "", category: "", barcode: "", sku: "", unit: "পিস" });
  };

  const addNewCategory = () => {
    if (!newCategory.name || !newCategory.nameBn) {
      toast({
        title: "তথ্য অসম্পূর্ণ",
        description: "নাম আবশ্যক",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "ক্যাটাগরি যোগ হয়েছে",
      description: `${newCategory.nameBn} সফলভাবে যোগ করা হয়েছে`,
    });
    setShowCategoryDialog(false);
    setNewCategory({ name: "", nameBn: "", icon: "📦", color: "bg-gray-100" });
  };

  // Focus barcode input on mount
  useEffect(() => {
    barcodeInputRef.current?.focus();
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row gap-4 p-4 bg-background">
      {/* Left Panel - Products */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">POS সিস্টেম</h1>
              <p className="text-xs text-muted-foreground">দ্রুত বিক্রয় করুন</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NetworkStatus />
            <Button variant="outline" size="icon" onClick={() => setShowCalculator(!showCalculator)}>
              <Calculator className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setShowHeldOrdersSheet(true)}>
              <Pause className="h-4 w-4" />
              {heldOrders.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {heldOrders.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Search & Barcode */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="পণ্য খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative w-48">
            <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={barcodeInputRef}
              placeholder="বারকোড স্ক্যান..."
              className="pl-10"
              onKeyDown={handleBarcodeInput}
            />
          </div>
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {sampleCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="flex-shrink-0 gap-2"
              onClick={() => setSelectedCategory(category.id)}
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
              <Badge variant="secondary" className="ml-1">{category.productCount}</Badge>
            </Button>
          ))}
          <Button variant="ghost" size="icon" onClick={() => setShowCategoryDialog(true)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Calculator Popup */}
        {showCalculator && (
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">ক্যালকুলেটর</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowCalculator(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <QuickCalculator onResult={(value) => {
                setAmountReceived(value.toString());
                setShowCalculator(false);
              }} />
            </CardContent>
          </Card>
        )}

        {/* Products Grid/List */}
        <ScrollArea className="flex-1">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {/* Add New Product Card */}
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all border-dashed border-2 flex items-center justify-center min-h-[200px]"
                onClick={() => setShowNewProductDialog(true)}
              >
                <div className="text-center p-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-medium text-sm">নতুন পণ্য যোগ করুন</p>
                </div>
              </Card>

              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`cursor-pointer hover:shadow-lg transition-all ${
                    product.stock <= 0 ? "opacity-50" : ""
                  } ${product.stock <= product.lowStockThreshold ? "border-orange-300" : ""}`}
                  onClick={() => addToCart(product)}
                >
                  <CardContent className="p-3">
                    <div className="relative mb-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      {product.originalPrice && (
                        <Badge className="absolute top-1 left-1 bg-red-500 text-xs">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% ছাড়
                        </Badge>
                      )}
                      {product.stock <= product.lowStockThreshold && product.stock > 0 && (
                        <Badge variant="outline" className="absolute top-1 right-1 bg-orange-100 text-orange-700 text-xs">
                          কম স্টক
                        </Badge>
                      )}
                      {product.stock <= 0 && (
                        <Badge variant="destructive" className="absolute top-1 right-1 text-xs">
                          স্টক নেই
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-medium text-sm truncate">{product.nameBn}</h3>
                    <p className="text-xs text-muted-foreground truncate">{product.name}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <p className="font-bold text-primary">৳{product.price.toLocaleString("bn-BD")}</p>
                        {product.originalPrice && (
                          <p className="text-xs text-muted-foreground line-through">
                            ৳{product.originalPrice.toLocaleString("bn-BD")}
                          </p>
                        )}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {product.stock} {product.unit}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`cursor-pointer hover:shadow-md transition-all ${
                    product.stock <= 0 ? "opacity-50" : ""
                  }`}
                  onClick={() => addToCart(product)}
                >
                  <CardContent className="p-3 flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{product.nameBn}</h3>
                      <p className="text-sm text-muted-foreground">{product.sku}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{product.stock} {product.unit}</Badge>
                        {product.stock <= product.lowStockThreshold && (
                          <Badge variant="outline" className="text-orange-600">কম স্টক</Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-primary">৳{product.price.toLocaleString("bn-BD")}</p>
                      {product.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          ৳{product.originalPrice.toLocaleString("bn-BD")}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Right Panel - Cart */}
      <Card className="w-full lg:w-[420px] flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              কার্ট
              {cart.length > 0 && (
                <Badge>{cart.reduce((sum, item) => sum + item.quantity, 0)}</Badge>
              )}
            </CardTitle>
            <div className="flex gap-1">
              {cart.length > 0 && (
                <>
                  <Button variant="ghost" size="sm" onClick={holdOrder}>
                    <Pause className="h-4 w-4 mr-1" />
                    হোল্ড
                  </Button>
                  <Button variant="ghost" size="sm" onClick={clearCart}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Customer Selection */}
          <div className="flex gap-2 mt-2">
            {selectedCustomer ? (
              <div className="flex-1 p-2 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{selectedCustomer.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedCustomer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge variant="secondary" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      {selectedCustomer.loyaltyPoints}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedCustomer(null)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Button variant="outline" className="flex-1" onClick={() => setShowCustomerDialog(true)}>
                  <User className="h-4 w-4 mr-2" />
                  কাস্টমার নির্বাচন
                </Button>
                <Button variant="outline" size="icon" onClick={() => setShowNewCustomerDialog(true)}>
                  <UserPlus className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </CardHeader>

        <Separator />

        {/* Cart Items */}
        <ScrollArea className="flex-1 p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">কার্ট খালি</p>
              <p className="text-sm text-muted-foreground mt-1">পণ্য যোগ করতে ক্লিক করুন</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.nameBn}</h4>
                      <p className="text-xs text-muted-foreground">৳{item.price.toLocaleString("bn-BD")} × {item.quantity}</p>
                      {item.discount > 0 && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          -{item.discountType === "percent" ? `${item.discount}%` : `৳${item.discount}`}
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">
                        ৳{((item.price * item.quantity) - (item.discountType === "percent" 
                          ? (item.price * item.quantity * item.discount / 100) 
                          : item.discount)).toLocaleString("bn-BD")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        className="w-12 h-7 text-center text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex gap-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Percent className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>আইটেম ডিসকাউন্ট</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {[5, 10, 15, 20, 25].map((d) => (
                            <DropdownMenuItem
                              key={d}
                              onClick={() => setCart(cart.map((c) =>
                                c.id === item.id ? { ...c, discount: d, discountType: "percent" } : c
                              ))}
                            >
                              {d}% ছাড়
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <>
            <Separator />
            <div className="p-4 space-y-3">
              {/* Delivery Toggle */}
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">ডেলিভারি অর্ডার</span>
                </div>
                <Switch
                  checked={isDeliveryOrder}
                  onCheckedChange={(checked) => {
                    setIsDeliveryOrder(checked);
                    if (checked) setShowDeliveryDialog(true);
                  }}
                />
              </div>

              {/* Global Discount */}
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="ডিসকাউন্ট"
                    value={globalDiscount || ""}
                    onChange={(e) => setGlobalDiscount(parseFloat(e.target.value) || 0)}
                    className="h-8 border-0 bg-transparent"
                  />
                </div>
                <Select value={globalDiscountType} onValueChange={(v: "percent" | "fixed") => setGlobalDiscountType(v)}>
                  <SelectTrigger className="w-20 h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percent">%</SelectItem>
                    <SelectItem value="fixed">৳</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">সাবটোটাল</span>
                  <span>৳{subtotal.toLocaleString("bn-BD")}</span>
                </div>
                {globalDiscountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>ডিসকাউন্ট</span>
                    <span>-৳{globalDiscountAmount.toLocaleString("bn-BD")}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>মোট</span>
                  <span className="text-primary">৳{total.toLocaleString("bn-BD")}</span>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                className="w-full h-14 text-lg gap-2"
                onClick={() => setShowPaymentDialog(true)}
              >
                <CreditCard className="h-5 w-5" />
                পেমেন্ট করুন
              </Button>
            </div>
          </>
        )}
      </Card>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>পেমেন্ট</DialogTitle>
            <DialogDescription>পেমেন্ট মেথড নির্বাচন করুন</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Payment Methods */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "cash", label: "নগদ", icon: Banknote, color: "bg-green-100 text-green-700" },
                { id: "bkash", label: "বিকাশ", icon: Smartphone, color: "bg-pink-100 text-pink-700" },
                { id: "nagad", label: "নগদ", icon: Smartphone, color: "bg-orange-100 text-orange-700" },
                { id: "card", label: "কার্ড", icon: CreditCard, color: "bg-blue-100 text-blue-700" },
              ].map((method) => (
                <Button
                  key={method.id}
                  variant={paymentMethod === method.id ? "default" : "outline"}
                  className={`h-16 flex-col gap-1 ${paymentMethod === method.id ? "" : method.color}`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <method.icon className="h-5 w-5" />
                  <span>{method.label}</span>
                </Button>
              ))}
            </div>

            {/* Amount */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">মোট পরিমাণ</span>
                <span className="text-2xl font-bold text-primary">৳{total.toLocaleString("bn-BD")}</span>
              </div>
              {paymentMethod === "cash" && (
                <>
                  <Label>প্রাপ্ত টাকা</Label>
                  <Input
                    type="number"
                    placeholder="প্রাপ্ত টাকা লিখুন"
                    value={amountReceived}
                    onChange={(e) => setAmountReceived(e.target.value)}
                    className="mt-1 text-lg"
                  />
                  {parseFloat(amountReceived) >= total && (
                    <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-green-700 dark:text-green-400">ফেরত</span>
                        <span className="font-bold text-green-700 dark:text-green-400">
                          ৳{change.toLocaleString("bn-BD")}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Quick Amount Buttons */}
            {paymentMethod === "cash" && (
              <div className="grid grid-cols-4 gap-2">
                {[100, 500, 1000, 2000].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    onClick={() => setAmountReceived((parseFloat(amountReceived) || 0 + amount).toString())}
                  >
                    +৳{amount}
                  </Button>
                ))}
              </div>
            )}

            {/* QR Code for Mobile Payment */}
            {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <QrCode className="h-32 w-32 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">QR কোড স্ক্যান করুন</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              বাতিল
            </Button>
            <Button onClick={processPayment} disabled={paymentMethod === "cash" && parseFloat(amountReceived) < total}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              পেমেন্ট সম্পন্ন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Customer Selection Dialog */}
      <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>কাস্টমার নির্বাচন</DialogTitle>
            <DialogDescription>বিদ্যমান কাস্টমার খুঁজুন</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="নাম বা ফোন দিয়ে খুঁজুন..." className="pl-10" />
            </div>
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {sampleCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setShowCustomerDialog(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.phone}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">
                          <Star className="h-3 w-3 mr-1" />
                          {customer.loyaltyPoints}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{customer.lastVisit}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {customer.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Customer Dialog */}
      <Dialog open={showNewCustomerDialog} onOpenChange={setShowNewCustomerDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>নতুন কাস্টমার</DialogTitle>
            <DialogDescription>কাস্টমারের তথ্য দিন</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>নাম *</Label>
                <Input
                  placeholder="কাস্টমারের নাম"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>ফোন *</Label>
                <Input
                  placeholder="01XXXXXXXXX"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>ইমেইল</Label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>ঠিকানা</Label>
              <Textarea
                placeholder="সম্পূর্ণ ঠিকানা"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCustomerDialog(false)}>
              বাতিল
            </Button>
            <Button onClick={addNewCustomer}>
              <UserPlus className="h-4 w-4 mr-2" />
              যোগ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Product Dialog */}
      <Dialog open={showNewProductDialog} onOpenChange={setShowNewProductDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>নতুন পণ্য যোগ করুন</DialogTitle>
            <DialogDescription>পণ্যের বিস্তারিত তথ্য দিন</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>পণ্যের নাম (ইংরেজি) *</Label>
                <Input
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>পণ্যের নাম (বাংলা)</Label>
                <Input
                  placeholder="পণ্যের নাম"
                  value={newProduct.nameBn}
                  onChange={(e) => setNewProduct({ ...newProduct, nameBn: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>দাম *</Label>
                <Input
                  type="number"
                  placeholder="০"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>স্টক</Label>
                <Input
                  type="number"
                  placeholder="০"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>একক</Label>
                <Select value={newProduct.unit} onValueChange={(v) => setNewProduct({ ...newProduct, unit: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="পিস">পিস</SelectItem>
                    <SelectItem value="কেজি">কেজি</SelectItem>
                    <SelectItem value="লিটার">লিটার</SelectItem>
                    <SelectItem value="সেট">সেট</SelectItem>
                    <SelectItem value="প্যাকেট">প্যাকেট</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ক্যাটাগরি *</Label>
                <Select value={newProduct.category} onValueChange={(v) => setNewProduct({ ...newProduct, category: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleCategories.filter(c => c.id !== "all").map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.icon} {cat.nameBn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>বারকোড</Label>
                <Input
                  placeholder="বারকোড নম্বর"
                  value={newProduct.barcode}
                  onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>SKU</Label>
              <Input
                placeholder="SKU-001"
                value={newProduct.sku}
                onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewProductDialog(false)}>
              বাতিল
            </Button>
            <Button onClick={addNewProduct}>
              <Package className="h-4 w-4 mr-2" />
              পণ্য যোগ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Category Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>নতুন ক্যাটাগরি</DialogTitle>
            <DialogDescription>ক্যাটাগরির তথ্য দিন</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>নাম (ইংরেজি) *</Label>
                <Input
                  placeholder="Category Name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>নাম (বাংলা) *</Label>
                <Input
                  placeholder="ক্যাটাগরির নাম"
                  value={newCategory.nameBn}
                  onChange={(e) => setNewCategory({ ...newCategory, nameBn: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>আইকন</Label>
                <div className="flex gap-2 flex-wrap">
                  {["📦", "📱", "👕", "🍔", "💄", "🏠", "🎮", "📚", "🎁", "⚽"].map((icon) => (
                    <Button
                      key={icon}
                      variant={newCategory.icon === icon ? "default" : "outline"}
                      size="icon"
                      onClick={() => setNewCategory({ ...newCategory, icon })}
                    >
                      {icon}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>রঙ</Label>
                <div className="flex gap-2 flex-wrap">
                  {["bg-gray-100", "bg-blue-100", "bg-pink-100", "bg-orange-100", "bg-purple-100", "bg-green-100"].map((color) => (
                    <Button
                      key={color}
                      variant="outline"
                      size="icon"
                      className={`${color} ${newCategory.color === color ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setNewCategory({ ...newCategory, color })}
                    >
                      {newCategory.color === color && <CheckCircle2 className="h-4 w-4" />}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCategoryDialog(false)}>
              বাতিল
            </Button>
            <Button onClick={addNewCategory}>
              <FolderOpen className="h-4 w-4 mr-2" />
              ক্যাটাগরি যোগ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delivery Dialog */}
      <Dialog open={showDeliveryDialog} onOpenChange={setShowDeliveryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ডেলিভারি তথ্য</DialogTitle>
            <DialogDescription>ডেলিভারির বিস্তারিত দিন</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>ডেলিভারি তারিখ</Label>
              <Input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>ডেলিভারি ঠিকানা</Label>
              <Textarea
                placeholder="সম্পূর্ণ ঠিকানা লিখুন"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>নোট</Label>
              <Textarea
                placeholder="অতিরিক্ত নির্দেশনা"
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowDeliveryDialog(false);
              setIsDeliveryOrder(false);
            }}>
              বাতিল
            </Button>
            <Button onClick={() => setShowDeliveryDialog(false)}>
              <Truck className="h-4 w-4 mr-2" />
              সেভ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Held Orders Sheet */}
      <Sheet open={showHeldOrdersSheet} onOpenChange={setShowHeldOrdersSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>হোল্ড করা অর্ডার</SheetTitle>
            <SheetDescription>পরে প্রসেস করার জন্য সেভ করা অর্ডার</SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-10rem)] mt-4">
            {heldOrders.length === 0 ? (
              <div className="text-center py-12">
                <Pause className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">কোনো হোল্ড অর্ডার নেই</p>
              </div>
            ) : (
              <div className="space-y-3">
                {heldOrders.map((order) => (
                  <Card key={order.id} className="cursor-pointer hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{order.id}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {order.createdAt.toLocaleTimeString("bn-BD")}
                        </span>
                      </div>
                      {order.customer && (
                        <p className="text-sm font-medium mb-2">{order.customer.name}</p>
                      )}
                      <p className="text-sm text-muted-foreground mb-2">
                        {order.items.length} আইটেম • ৳{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString("bn-BD")}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" onClick={() => recallOrder(order)}>
                          <Play className="h-4 w-4 mr-1" />
                          রিকল
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setHeldOrders(heldOrders.filter((o) => o.id !== order.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
