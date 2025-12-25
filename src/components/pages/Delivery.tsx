import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Search,
  Settings,
  Printer,
  Download,
  Send,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Calendar,
  Filter,
  Plus,
  Check,
  X,
  Eye,
  Link,
  Zap,
  BarChart3,
  Users,
} from "lucide-react";

const mockShipments = [
  { 
    id: "SHIP-001", 
    orderId: "#1234", 
    customer: "রহিম আহমেদ", 
    phone: "০১৭১২৩৪৫৬৭৮",
    address: "মিরপুর ১০, ঢাকা", 
    district: "ঢাকা",
    courier: "Pathao", 
    trackingId: "PTH123456789",
    status: "in_transit", 
    date: "১৭ অক্টোবর ২০২৫",
    estimatedDelivery: "১৮ অক্টোবর ২০২৫",
    deliveryCharge: 60,
    weight: "0.5 kg",
    timeline: [
      { status: "booked", time: "১৭ অক্ট, ১০:০০ AM", completed: true },
      { status: "picked", time: "১৭ অক্ট, ২:৩০ PM", completed: true },
      { status: "in_transit", time: "১৭ অক্ট, ৬:০০ PM", completed: true },
      { status: "out_for_delivery", time: "", completed: false },
      { status: "delivered", time: "", completed: false },
    ]
  },
  { 
    id: "SHIP-002", 
    orderId: "#1235", 
    customer: "সালমা খাতুন", 
    phone: "০��৮১২৩৪৫৬৭৮",
    address: "ধানমন্ডি ৫, ঢাকা", 
    district: "ঢাকা",
    courier: "Steadfast", 
    trackingId: "STF987654321",
    status: "delivered", 
    date: "১৬ অক্টোবর ২০২৫",
    estimatedDelivery: "১৭ অক্টোবর ২০২৫",
    deliveryCharge: 60,
    weight: "1.2 kg",
    timeline: [
      { status: "booked", time: "১৬ অক্ট, ৯:০০ AM", completed: true },
      { status: "picked", time: "১৬ অক্ট, ১১:৩০ AM", completed: true },
      { status: "in_transit", time: "১৬ অক্ট, ৩:০০ PM", completed: true },
      { status: "out_for_delivery", time: "১৭ অক্ট, ৯:০০ AM", completed: true },
      { status: "delivered", time: "১৭ অক্ট, ২:৩০ PM", completed: true },
    ]
  },
  { 
    id: "SHIP-003", 
    orderId: "#1236", 
    customer: "করিম মিয়া", 
    phone: "০১৯১২৩৪৫৬৭৮",
    address: "চট্টগ্রাম", 
    district: "চট্টগ্রাম",
    courier: "Redx", 
    trackingId: "",
    status: "pending", 
    date: "১৭ অক্টোবর ২০২৫",
    estimatedDelivery: "২০ অক্টোবর ২০২৫",
    deliveryCharge: 120,
    weight: "2.0 kg",
    timeline: [
      { status: "booked", time: "১৭ অক্ট, ৩:০০ PM", completed: true },
      { status: "picked", time: "", completed: false },
      { status: "in_transit", time: "", completed: false },
      { status: "out_for_delivery", time: "", completed: false },
      { status: "delivered", time: "", completed: false },
    ]
  },
];

const courierPartners = [
  { 
    id: 1, 
    name: "Pathao", 
    logo: "🚚", 
    connected: true, 
    apiKey: "pk_live_********", 
    activeShipments: 2,
    areas: ["ঢাকা"],
    charge: 60,
    color: "red"
  },
  { 
    id: 2, 
    name: "Steadfast", 
    logo: "📦", 
    connected: true, 
    apiKey: "sf_live_********", 
    activeShipments: 1,
    areas: ["সারাদেশ"],
    charge: 120,
    color: "green"
  },
  { 
    id: 3, 
    name: "Redx", 
    logo: "🚛", 
    connected: false, 
    apiKey: "", 
    activeShipments: 0,
    areas: ["সারাদেশ"],
    charge: 100,
    color: "blue"
  },
  { 
    id: 4, 
    name: "Paperfly", 
    logo: "✈️", 
    connected: false, 
    apiKey: "", 
    activeShipments: 0,
    areas: ["সারাদেশ"],
    charge: 110,
    color: "purple"
  },
];

const getStatusBadge = (status: string) => {
  const variants = {
    pending: { variant: "outline" as const, label: "অপেক্ষমাণ", color: "text-orange-600", icon: Clock },
    booked: { variant: "secondary" as const, label: "বুক করা হয়েছে", color: "text-blue-600", icon: Package },
    picked: { variant: "secondary" as const, label: "পিকআপ হয়েছে", color: "text-purple-600", icon: Package },
    in_transit: { variant: "secondary" as const, label: "পথে আছে", color: "text-blue-600", icon: Truck },
    out_for_delivery: { variant: "secondary" as const, label: "ডেলিভারি হচ্ছে", color: "text-orange-600", icon: Truck },
    delivered: { variant: "default" as const, label: "ডেলিভার হয়েছে", color: "text-green-600", icon: CheckCircle },
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

export default function Delivery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedShipments, setSelectedShipments] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [districtFilter, setDistrictFilter] = useState("all");
  const [courierFilter, setCourierFilter] = useState("all");
  const [selectedShipment, setSelectedShipment] = useState<typeof mockShipments[0] | null>(null);

  const filteredShipments = mockShipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.trackingId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === "all" || shipment.status === selectedTab;
    const matchesDistrict = districtFilter === "all" || shipment.district === districtFilter;
    const matchesCourier = courierFilter === "all" || shipment.courier === courierFilter;
    return matchesSearch && matchesTab && matchesDistrict && matchesCourier;
  });

  const stats = {
    total: mockShipments.length,
    pending: mockShipments.filter(s => s.status === "pending").length,
    inTransit: mockShipments.filter(s => s.status === "in_transit" || s.status === "out_for_delivery").length,
    delivered: mockShipments.filter(s => s.status === "delivered").length,
    totalRevenue: mockShipments.reduce((sum, s) => sum + s.deliveryCharge, 0),
  };

  const toggleShipmentSelection = (shipmentId: string) => {
    if (selectedShipments.includes(shipmentId)) {
      setSelectedShipments(selectedShipments.filter(id => id !== shipmentId));
    } else {
      setSelectedShipments([...selectedShipments, shipmentId]);
    }
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-header">ডেলিভারি ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground mt-2">রিয়েল-টাইম শিপমেন্ট ট্র্যাকিং এবং কুরিয়ার ম্যানেজমেন্ট</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                সেটিংস
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>ডেলিভারি সেটিংস</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  {/* Delivery Charges */}
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-base">ডেলিভারি চার্জ সেটিংস</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>ঢাকার ভিতরে</Label>
                          <Input type="number" defaultValue="60" />
                        </div>
                        <div className="space-y-2">
                          <Label>ঢাকার বাইরে</Label>
                          <Input type="number" defaultValue="120" />
                        </div>
                        <div className="space-y-2">
                          <Label>সাবআর্বান</Label>
                          <Input type="number" defaultValue="80" />
                        </div>
                        <div className="space-y-2">
                          <Label>ফ্রি ডেলিভারি (মিনিমাম অর্ডার)</Label>
                          <Input type="number" defaultValue="1000" />
                        </div>
                      </div>
                      <Button className="w-full">সংরক্ষণ করুন</Button>
                    </CardContent>
                  </Card>

                  {/* Courier Partners */}
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-base">কুরিয়ার পার্টনার</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {courierPartners.map((courier) => (
                        <div key={courier.id} className="border rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`h-12 w-12 rounded-lg bg-${courier.color}-100 dark:bg-${courier.color}-900 flex items-center justify-center text-2xl`}>
                                {courier.logo}
                              </div>
                              <div>
                                <h3 className="font-semibold">{courier.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {courier.areas.join(", ")} • ৳{courier.charge}
                                </p>
                              </div>
                            </div>
                            <Badge variant={courier.connected ? "default" : "outline"}>
                              {courier.connected ? "সংযুক্ত" : "সংযুক্ত নয়"}
                            </Badge>
                          </div>
                          {courier.connected ? (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">API Key</span>
                                <span className="font-mono">{courier.apiKey}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">অ্যাক্���িভ শিপমেন্ট</span>
                                <span className="font-semibold">{courier.activeShipments}</span>
                              </div>
                              <Button variant="outline" size="sm" className="w-full gap-2">
                                <Settings className="h-4 w-4" />
                                সেটিংস
                              </Button>
                            </div>
                          ) : (
                            <Button variant="outline" className="w-full gap-2">
                              <Link className="h-4 w-4" />
                              সংযুক্ত করুন
                            </Button>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            নতুন শিপমেন্ট
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="shadow-soft hover:shadow-hover transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Package className="h-4 w-4" />
              মোট শিপমেন্ট
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +১৮% এই মাসে
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-hover transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              অপেক্ষমাণ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">বুক করুন</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-hover transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Truck className="h-4 w-4" />
              পথে আছে
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inTransit}</div>
            <p className="text-xs text-muted-foreground mt-1">ট্রানজিটে</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-hover transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              ডেলিভারড
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
            <p className="text-xs text-muted-foreground mt-1">সম্পন্ন</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-hover transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              ডেলিভারি চার্জ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent-teal">৳{stats.totalRevenue}</div>
            <p className="text-xs text-muted-foreground mt-1">এই মাসে</p>
          </CardContent>
        </Card>
      </div>

      {/* Courier Partners Quick View */}
      <div className="grid md:grid-cols-4 gap-4">
        {courierPartners.map((courier) => (
          <Card key={courier.id} className="shadow-soft hover:shadow-hover transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{courier.logo}</div>
                  <div>
                    <h3 className="font-semibold">{courier.name}</h3>
                    <p className="text-xs text-muted-foreground">৳{courier.charge}</p>
                  </div>
                </div>
                {courier.connected && (
                  <Badge variant="outline" className="gap-1">
                    <Check className="h-3 w-3" />
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">অ্যাক্টিভ</span>
                <span className="font-bold text-lg">{courier.activeShipments}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Search */}
      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="শিপমেন্ট ID, কাস্টমার বা ট্র্যাকিং নম্বর..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4" />
                ফিল্টার
              </Button>
            </div>

            {showFilters && (
              <div className="grid gap-4 md:grid-cols-3 p-4 border rounded-xl bg-muted/30">
                <div className="space-y-2">
                  <Label>জেলা</Label>
                  <Select value={districtFilter} onValueChange={setDistrictFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব জেলা</SelectItem>
                      <SelectItem value="ঢাকা">ঢাকা</SelectItem>
                      <SelectItem value="চট্টগ্রাম">চট্টগ্রাম</SelectItem>
                      <SelectItem value="সিলেট">সিলেট</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>কুরিয়ার</Label>
                  <Select value={courierFilter} onValueChange={setCourierFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব কুরিয়ার</SelectItem>
                      <SelectItem value="Pathao">Pathao</SelectItem>
                      <SelectItem value="Steadfast">Steadfast</SelectItem>
                      <SelectItem value="Redx">Redx</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>তারিখ রেঞ্জ</Label>
                  <Input type="date" />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedShipments.length > 0 && (
        <Card className="border-primary shadow-soft">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{selectedShipments.length} টি সিলেক্টেড</Badge>
                <Button variant="outline" size="sm" className="gap-2">
                  <Send className="h-4 w-4" />
                  পিকআপ রিকোয়েস্ট
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Printer className="h-4 w-4" />
                  লেবেল প্রিন্ট
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  এক্সপোর্ট
                </Button>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedShipments([])}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Shipments List */}
      <Card className="shadow-soft">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <CardHeader>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">সব ({stats.total})</TabsTrigger>
              <TabsTrigger value="pending">অপেক্ষমাণ ({stats.pending})</TabsTrigger>
              <TabsTrigger value="in_transit">পথে আছে ({stats.inTransit})</TabsTrigger>
              <TabsTrigger value="delivered">ডেলিভারড ({stats.delivered})</TabsTrigger>
              <TabsTrigger value="cancelled">ক্যান্সেল (0)</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value={selectedTab} className="mt-0">
              <div className="space-y-3">
                {filteredShipments.map((shipment) => (
                  <div key={shipment.id} className="border rounded-xl p-4 hover:bg-accent hover:text-accent-foreground transition-all shadow-soft hover:shadow-hover">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={selectedShipments.includes(shipment.id)}
                        onCheckedChange={() => toggleShipmentSelection(shipment.id)}
                      />
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="font-bold text-lg">{shipment.id}</span>
                              {getStatusBadge(shipment.status)}
                              <Badge variant="outline">{shipment.courier}</Badge>
                              {shipment.trackingId && (
                                <Badge variant="secondary" className="gap-1 font-mono text-xs">
                                  <Truck className="h-3 w-3" />
                                  {shipment.trackingId}
                                </Badge>
                              )}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <div>
                                <p className="text-muted-foreground text-xs">কাস্টমার</p>
                                <p className="font-medium">{shipment.customer}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">ঠিকানা</p>
                                <p className="font-medium">{shipment.address}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">ডেলিভারি চার্জ</p>
                                <p className="font-medium text-accent-teal">৳{shipment.deliveryCharge}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">আনুমানিক ডেলিভারি</p>
                                <p className="font-medium">{shipment.estimatedDelivery}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-accent-teal rounded-full h-2 transition-all"
                                  style={{
                                    width: shipment.status === "delivered" ? "100%" :
                                           shipment.status === "out_for_delivery" ? "80%" :
                                           shipment.status === "in_transit" ? "60%" :
                                           shipment.status === "picked" ? "40%" :
                                           shipment.status === "booked" ? "20%" : "10%"
                                  }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {shipment.status === "delivered" ? "100%" :
                                 shipment.status === "out_for_delivery" ? "80%" :
                                 shipment.status === "in_transit" ? "60%" :
                                 shipment.status === "picked" ? "40%" :
                                 shipment.status === "booked" ? "20%" : "10%"}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2" onClick={() => setSelectedShipment(shipment)}>
                                  <Eye className="h-4 w-4" />
                                  বিস্তারিত
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh]">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    শিপমেন্ট বিস্তারিত - {shipment.id}
                                    {getStatusBadge(shipment.status)}
                                  </DialogTitle>
                                </DialogHeader>
                                {selectedShipment && (
                                  <ScrollArea className="h-[600px] pr-4">
                                    <div className="grid gap-6 lg:grid-cols-2">
                                      {/* Left: Shipment Info */}
                                      <Card className="shadow-soft">
                                        <CardHeader>
                                          <CardTitle className="text-base">শিপমেন্ট তথ্য</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                          <div className="grid grid-cols-2 gap-4">
                                            <div>
                                              <p className="text-sm text-muted-foreground">শিপমেন্ট ID</p>
                                              <p className="font-semibold">{selectedShipment.id}</p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-muted-foreground">অর্ডার ID</p>
                                              <p className="font-semibold">{selectedShipment.orderId}</p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-muted-foreground">কুরিয়ার</p>
                                              <p className="font-semibold">{selectedShipment.courier}</p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-muted-foreground">ওজন</p>
                                              <p className="font-semibold">{selectedShipment.weight}</p>
                                            </div>
                                          </div>
                                          <Separator />
                                          <div>
                                            <p className="text-sm text-muted-foreground mb-2">কাস্টমার</p>
                                            <div className="space-y-1">
                                              <p className="font-semibold">{selectedShipment.customer}</p>
                                              <p className="text-sm">{selectedShipment.phone}</p>
                                              <p className="text-sm">{selectedShipment.address}</p>
                                            </div>
                                          </div>
                                          <Separator />
                                          <div className="grid grid-cols-2 gap-4">
                                            <div>
                                              <p className="text-sm text-muted-foreground">ডেলিভারি চার্জ</p>
                                              <p className="text-xl font-bold text-accent-teal">৳{selectedShipment.deliveryCharge}</p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-muted-foreground">আনুমানিক ডেলিভারি</p>
                                              <p className="font-semibold">{selectedShipment.estimatedDelivery}</p>
                                            </div>
                                          </div>
                                          {selectedShipment.trackingId && (
                                            <>
                                              <Separator />
                                              <div>
                                                <p className="text-sm text-muted-foreground mb-2">ট্র্যাকিং নম্বর</p>
                                                <div className="p-3 border rounded-lg bg-muted/30 font-mono">
                                                  {selectedShipment.trackingId}
                                                </div>
                                              </div>
                                            </>
                                          )}
                                          <Separator />
                                          <div className="space-y-2">
                                            <Button className="w-full gap-2">
                                              <Printer className="h-4 w-4" />
                                              শিপিং লেবেল প্রিন্ট
                                            </Button>
                                            <Button variant="outline" className="w-full gap-2">
                                              <Send className="h-4 w-4" />
                                              পিকআপ রিকোয়েস্ট
                                            </Button>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      {/* Right: Tracking Timeline */}
                                      <Card className="shadow-soft">
                                        <CardHeader>
                                          <CardTitle className="text-base flex items-center gap-2">
                                            <Package className="h-4 w-4" />
                                            ট্র্যাকিং টাইমলাইন
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                          <div className="space-y-4">
                                            {selectedShipment.timeline.map((step, idx) => (
                                              <div key={idx} className="flex gap-3">
                                                <div className="flex flex-col items-center">
                                                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                                    step.completed ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                                                  }`}>
                                                    {step.completed ? (
                                                      <Check className="h-5 w-5" />
                                                    ) : (
                                                      <Clock className="h-5 w-5" />
                                                    )}
                                                  </div>
                                                  {idx < selectedShipment.timeline.length - 1 && (
                                                    <div className={`w-0.5 h-12 ${
                                                      step.completed ? "bg-green-500" : "bg-muted"
                                                    }`} />
                                                  )}
                                                </div>
                                                <div className="flex-1 pb-4">
                                                  <p className="font-medium">
                                                    {step.status === "booked" && "বুক করা হয়েছে"}
                                                    {step.status === "picked" && "পিকআপ হয়েছে"}
                                                    {step.status === "in_transit" && "পথে আছে"}
                                                    {step.status === "out_for_delivery" && "ডেলিভারি হচ্ছে"}
                                                    {step.status === "delivered" && "ডেলিভার হয়েছে"}
                                                  </p>
                                                  {step.time && (
                                                    <p className="text-sm text-muted-foreground">{step.time}</p>
                                                  )}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>
                                  </ScrollArea>
                                )}
                              </DialogContent>
                            </Dialog>
                            {shipment.status === "pending" && (
                              <Button size="sm" className="gap-2">
                                <Zap className="h-4 w-4" />
                                বুক করুন
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" className="gap-2">
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}