import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  Image as ImageIcon,
  TrendingUp,
  AlertCircle,
  Filter,
  Download,
  Upload,
  Facebook,
  Instagram,
  MessageCircle,
  Globe,
  Settings,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  status: "active" | "draft" | "out-of-stock";
  createdAt: string;
  channelStockBuffers?: {
    facebook: number;
    instagram: number;
    whatsapp: number;
    website: number;
  };
  lowStockThreshold?: number;
  reservedStock?: number;
}

export default function Products() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "স্মার্টফোন",
      description: "সর্বশেষ মডেল স্মার্টফোন",
      price: 25000,
      stock: 50,
      category: "ইলেকট্রনিক্স",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
      status: "active",
      createdAt: "2024-01-15",
      channelStockBuffers: {
        facebook: 15,
        instagram: 10,
        whatsapp: 8,
        website: 17,
      },
      lowStockThreshold: 10,
      reservedStock: 5,
    },
    {
      id: "2",
      name: "টি-শার্ট",
      description: "কটন টি-শার্ট",
      price: 500,
      stock: 100,
      category: "পোশাক",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      status: "active",
      createdAt: "2024-01-14",
      channelStockBuffers: {
        facebook: 30,
        instagram: 25,
        whatsapp: 20,
        website: 25,
      },
      lowStockThreshold: 20,
      reservedStock: 8,
    },
    {
      id: "3",
      name: "জুতা",
      description: "স্পোর্টস জুতা",
      price: 1500,
      stock: 0,
      category: "জুতা",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
      status: "out-of-stock",
      createdAt: "2024-01-13",
      channelStockBuffers: {
        facebook: 0,
        instagram: 0,
        whatsapp: 0,
        website: 0,
      },
      lowStockThreshold: 5,
      reservedStock: 0,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showStockBufferDialog, setShowStockBufferDialog] = useState(false);
  const [selectedProductForBuffer, setSelectedProductForBuffer] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const categories = ["ইলেকট্রনিক্স", "পোশাক", "জুতা", "খাবার", "বই", "অন্যান্য"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      toast({
        title: "ত্রুটি",
        description: "সব ফিল্ড পূরণ করুন",
        variant: "destructive",
      });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category: formData.category || "অন্যান্য",
      image: formData.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      status: parseInt(formData.stock) > 0 ? "active" : "out-of-stock",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setProducts([newProduct, ...products]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "সফল!",
      description: "পণ্য যোগ করা হয়েছে",
    });
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;

    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id
        ? {
            ...p,
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            category: formData.category,
            image: formData.image,
            status: parseInt(formData.stock) > 0 ? "active" : "out-of-stock",
          }
        : p
    );

    setProducts(updatedProducts);
    setEditingProduct(null);
    resetForm();
    toast({
      title: "সফল!",
      description: "পণ্য আপডেট করা হয়েছে",
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast({
      title: "মুছে ফেলা হয়েছে",
      description: "পণ্য মুছে ফেলা হয়েছে",
    });
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      image: product.image,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      image: "",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      active: { variant: "default", label: "সক্রিয়" },
      draft: { variant: "secondary", label: "খসড়া" },
      "out-of-stock": { variant: "destructive", label: "স্টক শেষ" },
    };
    const config = variants[status] || variants.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === "active").length,
    outOfStock: products.filter((p) => p.status === "out-of-stock").length,
    totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
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
              <Package className="h-6 w-6 text-white" />
            </div>
            পণ্য ম্যানেজমেন্ট
          </h1>
          <p className="text-muted-foreground mt-1">আপনার সব পণ্য এক জায়গায়</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            এক্সপোর্ট
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            ইমপোর্ট
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-purple-600 gap-2">
                <Plus className="h-4 w-4" />
                নতুন পণ্য
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>নতুন পণ্য যোগ করুন</DialogTitle>
                <DialogDescription>পণ্যের বিস্তারিত তথ্য দিন</DialogDescription>
              </DialogHeader>
              <ProductForm
                formData={formData}
                setFormData={setFormData}
                categories={categories}
                onSubmit={handleAddProduct}
                onCancel={() => {
                  setIsAddDialogOpen(false);
                  resetForm();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "মোট পণ্য",
            value: stats.total,
            icon: Package,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "সক্রিয় পণ্য",
            value: stats.active,
            icon: TrendingUp,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "স্টক শেষ",
            value: stats.outOfStock,
            icon: AlertCircle,
            color: "from-red-500 to-orange-500",
          },
          {
            label: "মোট মূল্য",
            value: `৳${stats.totalValue.toLocaleString()}`,
            icon: Package,
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
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
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
                  placeholder="পণ্য খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="ক্যাটাগরি" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>পণ্য তালিকা</CardTitle>
            <CardDescription>{filteredProducts.length} টি পণ্য পাওয়া গেছে</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>পণ্য</TableHead>
                    <TableHead>ক্যাটাগরি</TableHead>
                    <TableHead>মূল্য</TableHead>
                    <TableHead>স্টক</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredProducts.map((product, index) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="font-semibold">
                          ৳{product.price.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              product.stock < 10
                                ? "text-red-600 font-semibold"
                                : "text-green-600 font-semibold"
                            }
                          >
                            {product.stock}
                          </span>
                          {product.reservedStock && product.reservedStock > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              রিজার্ভড: {product.reservedStock}
                            </p>
                          )}
                          {product.stock > 0 && product.stock <= (product.lowStockThreshold || 10) && (
                            <Badge variant="destructive" className="mt-1 text-xs">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              কম স্টক
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(product.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedProductForBuffer(product);
                                setShowStockBufferDialog(true);
                              }}
                              title="চ্যানেল স্টক বাফার"
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditDialog(product)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>পণ্য সম্পাদনা করুন</DialogTitle>
                                  <DialogDescription>পণ্যের তথ্য আপডেট করুন</DialogDescription>
                                </DialogHeader>
                                <ProductForm
                                  formData={formData}
                                  setFormData={setFormData}
                                  categories={categories}
                                  onSubmit={handleEditProduct}
                                  onCancel={() => {
                                    setEditingProduct(null);
                                    resetForm();
                                  }}
                                  isEditing
                                />
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
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

      {/* Channel Stock Buffer Dialog */}
      <Dialog open={showStockBufferDialog} onOpenChange={setShowStockBufferDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>চ্যানেল স্টক বাফার সেটিংস</DialogTitle>
            <DialogDescription>
              প্রতিটি চ্যানেলের জন্য আলাদা স্টক বরাদ্দ করুন
            </DialogDescription>
          </DialogHeader>
          {selectedProductForBuffer && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
                <img
                  src={selectedProductForBuffer.image}
                  alt={selectedProductForBuffer.name}
                  className="h-16 w-16 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold">{selectedProductForBuffer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    মোট স্টক: {selectedProductForBuffer.stock} | 
                    রিজার্ভড: {selectedProductForBuffer.reservedStock || 0}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <Label className="text-base font-semibold">Facebook</Label>
                  </div>
                  <Input
                    type="number"
                    value={selectedProductForBuffer.channelStockBuffers?.facebook || 0}
                    onChange={(e) => {
                      const updated = { ...selectedProductForBuffer };
                      if (!updated.channelStockBuffers) {
                        updated.channelStockBuffers = { facebook: 0, instagram: 0, whatsapp: 0, website: 0 };
                      }
                      updated.channelStockBuffers.facebook = parseInt(e.target.value) || 0;
                      setSelectedProductForBuffer(updated);
                    }}
                    placeholder="Facebook এর জন্য স্টক"
                  />
                </div>

                <div className="p-4 bg-pink-50 dark:bg-pink-950/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <Label className="text-base font-semibold">Instagram</Label>
                  </div>
                  <Input
                    type="number"
                    value={selectedProductForBuffer.channelStockBuffers?.instagram || 0}
                    onChange={(e) => {
                      const updated = { ...selectedProductForBuffer };
                      if (!updated.channelStockBuffers) {
                        updated.channelStockBuffers = { facebook: 0, instagram: 0, whatsapp: 0, website: 0 };
                      }
                      updated.channelStockBuffers.instagram = parseInt(e.target.value) || 0;
                      setSelectedProductForBuffer(updated);
                    }}
                    placeholder="Instagram এর জন্য স্টক"
                  />
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    <Label className="text-base font-semibold">WhatsApp</Label>
                  </div>
                  <Input
                    type="number"
                    value={selectedProductForBuffer.channelStockBuffers?.whatsapp || 0}
                    onChange={(e) => {
                      const updated = { ...selectedProductForBuffer };
                      if (!updated.channelStockBuffers) {
                        updated.channelStockBuffers = { facebook: 0, instagram: 0, whatsapp: 0, website: 0 };
                      }
                      updated.channelStockBuffers.whatsapp = parseInt(e.target.value) || 0;
                      setSelectedProductForBuffer(updated);
                    }}
                    placeholder="WhatsApp এর জন্য স্টক"
                  />
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="h-5 w-5 text-purple-600" />
                    <Label className="text-base font-semibold">Website</Label>
                  </div>
                  <Input
                    type="number"
                    value={selectedProductForBuffer.channelStockBuffers?.website || 0}
                    onChange={(e) => {
                      const updated = { ...selectedProductForBuffer };
                      if (!updated.channelStockBuffers) {
                        updated.channelStockBuffers = { facebook: 0, instagram: 0, whatsapp: 0, website: 0 };
                      }
                      updated.channelStockBuffers.website = parseInt(e.target.value) || 0;
                      setSelectedProductForBuffer(updated);
                    }}
                    placeholder="Website এর জন্য স্টক"
                  />
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">মোট বরাদ্দকৃত স্টক</span>
                  <span className="text-lg font-bold text-primary">
                    {Object.values(selectedProductForBuffer.channelStockBuffers || {}).reduce((a, b) => a + b, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">উপলব্ধ স্টক</span>
                  <span className="text-sm font-semibold">
                    {selectedProductForBuffer.stock - Object.values(selectedProductForBuffer.channelStockBuffers || {}).reduce((a, b) => a + b, 0)}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowStockBufferDialog(false);
                    setSelectedProductForBuffer(null);
                  }}
                >
                  বাতিল
                </Button>
                <Button
                  onClick={() => {
                    if (selectedProductForBuffer) {
                      const updatedProducts = products.map((p) =>
                        p.id === selectedProductForBuffer.id ? selectedProductForBuffer : p
                      );
                      setProducts(updatedProducts);
                      toast({
                        title: "সফল!",
                        description: "চ্যানেল স্টক বাফার আপডেট করা হয়েছে",
                      });
                      setShowStockBufferDialog(false);
                      setSelectedProductForBuffer(null);
                    }
                  }}
                  className="bg-gradient-to-r from-primary to-purple-600"
                >
                  সংরক্ষণ করুন
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Product Form Component
function ProductForm({
  formData,
  setFormData,
  categories,
  onSubmit,
  onCancel,
  isEditing = false,
}: {
  formData: any;
  setFormData: any;
  categories: string[];
  onSubmit: () => void;
  onCancel: () => void;
  isEditing?: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">পণ্যের নাম *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="পণ্যের নাম লিখুন"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">বিবরণ</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="পণ্যের বিবরণ লিখুন"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">মূল্য (৳) *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">স্টক *</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">ক্যাটাগরি</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">ছবির URL</Label>
        <div className="flex gap-2">
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
          <Button variant="outline" size="icon">
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
        {formData.image && (
          <div className="mt-2 h-32 w-32 rounded-lg overflow-hidden border">
            <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          বাতিল
        </Button>
        <Button onClick={onSubmit} className="bg-gradient-to-r from-primary to-purple-600">
          {isEditing ? "আপডেট করুন" : "যোগ করুন"}
        </Button>
      </div>
    </div>
  );
}