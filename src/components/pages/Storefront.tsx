import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, ShoppingCart, Heart, Star, Phone, MapPin, Facebook, Instagram, Menu, X, Filter, ChevronDown, Palette, Settings, Zap, TrendingUp, Eye, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useStoreTheme, StoreTheme } from "@/contexts/StoreThemeContext";
import SocialChannelBar from "@/components/SocialChannelBar";
import WhatsAppChatBubble from "@/components/WhatsAppChatBubble";
import SocialProofTicker from "@/components/SocialProofTicker";
import MobileQuickActions from "@/components/MobileQuickActions";
import AbandonedCartRecovery from "@/components/AbandonedCartRecovery";
import FlashSaleBanner from "@/components/FlashSaleBanner";
import LoyaltyPanel from "@/components/LoyaltyPanel";

// Mock data - এটা ইন্টারনাল সিস্টেম থেকে আসবে
const storeInfo = {
  name: "রহিম ট্রেডার্স",
  name_en: "Rahim Traders",
  logo: "https://api.dicebear.com/7.x/initials/svg?seed=RT&backgroundColor=0ea5e9",
  phone: "০১৭১২৩৪৫৬৭৮",
  address: "ধানমন্ডি, ঢাকা",
  facebook: "facebook.com/rahimtraders",
  instagram: "@rahimtraders",
  description: "আমরা সেরা মানের পণ্য সরবরাহ করি সাশ্রয়ী মূল্যে",
};

const products = [
  { 
    id: 1, 
    name: "স্মার্টফোন কেস", 
    name_en: "Smartphone Case", 
    price: 350, 
    oldPrice: 450, 
    rating: 4.5, 
    reviews: 23, 
    stock: 45, 
    images: [
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&q=80",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=80"
    ],
    category: "accessories",
    soldCount: 156,
    viewCount: 1240,
    trending: true,
    relatedProducts: [2, 5, 6],
    frequentlyBoughtWith: [5, 6]
  },
  { 
    id: 2, 
    name: "হ্যান্ডব্যাগ", 
    name_en: "Handbag", 
    price: 1200, 
    oldPrice: 1500, 
    rating: 4.8, 
    reviews: 45, 
    stock: 3, 
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80"
    ],
    category: "fashion",
    soldCount: 234,
    viewCount: 2100,
    trending: true,
    relatedProducts: [3, 4],
    frequentlyBoughtWith: [3]
  },
  { 
    id: 3, 
    name: "টি-শার্ট", 
    name_en: "T-Shirt", 
    price: 450, 
    oldPrice: 600, 
    rating: 4.3, 
    reviews: 67, 
    stock: 8, 
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80"
    ],
    category: "fashion",
    soldCount: 189,
    viewCount: 1560,
    relatedProducts: [2, 4],
    frequentlyBoughtWith: [2]
  },
  { 
    id: 4, 
    name: "কসমেটিক্স সেট", 
    name_en: "Cosmetics Set", 
    price: 800, 
    oldPrice: 1000, 
    rating: 4.7, 
    reviews: 34, 
    stock: 23, 
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&q=80"
    ],
    category: "beauty",
    soldCount: 98,
    viewCount: 890,
    relatedProducts: [2, 3],
    frequentlyBoughtWith: [2]
  },
  { 
    id: 5, 
    name: "ওয়াচ", 
    name_en: "Watch", 
    price: 1800, 
    oldPrice: 2200, 
    rating: 4.6, 
    reviews: 56, 
    stock: 15, 
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&q=80"
    ],
    category: "accessories",
    soldCount: 145,
    viewCount: 1340,
    trending: true,
    relatedProducts: [1, 6],
    frequentlyBoughtWith: [1, 6]
  },
  { 
    id: 6, 
    name: "সানগ্লাস", 
    name_en: "Sunglasses", 
    price: 650, 
    oldPrice: 850, 
    rating: 4.4, 
    reviews: 28, 
    stock: 32, 
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&q=80"
    ],
    category: "accessories",
    soldCount: 112,
    viewCount: 980,
    relatedProducts: [1, 5],
    frequentlyBoughtWith: [1, 5]
  },
];

const categories = [
  { id: "all", name: "সব পণ্য", name_en: "All Products" },
  { id: "fashion", name: "ফ্যাশন", name_en: "Fashion" },
  { id: "accessories", name: "এক্সেসরিজ", name_en: "Accessories" },
  { id: "beauty", name: "বিউটি", name_en: "Beauty" },
];

// Product Card Component with Auto-Rotating Images + Quick Buy
function ProductCard({ product, onAddToCart, onNavigate, onQuickBuy }: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering || product.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }, 800);

    return () => clearInterval(interval);
  }, [isHovering, product.images.length]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    setCurrentImageIndex(0);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCurrentImageIndex(0);
  };

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-square relative overflow-hidden bg-muted">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          onClick={() => onNavigate(`/store/product/${product.id}`)}
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.oldPrice && (
            <Badge className="bg-red-500">
              {Math.round((1 - product.price / product.oldPrice) * 100)}% ছাড়
            </Badge>
          )}
          {product.trending && (
            <Badge className="bg-orange-500 gap-1">
              <TrendingUp className="h-3 w-3" />
              ট্রেন্ডিং
            </Badge>
          )}
        </div>

        {product.stock < 10 && product.stock > 0 && (
          <Badge className="absolute top-2 right-2 bg-orange-500">
            মাত্র {product.stock}টি বাকি
          </Badge>
        )}
        
        {/* Image Indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {product.images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex 
                    ? 'w-4 bg-white' 
                    : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Quick Buy Button - Shows on Hover */}
        <Button
          size="sm"
          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity gap-1 bg-primary hover:bg-primary/90"
          onClick={(e) => {
            e.stopPropagation();
            onQuickBuy(product);
          }}
        >
          <Zap className="h-3 w-3" />
          দ্রুত কিনুন
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-3 md:p-4">
        <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-2" onClick={() => onNavigate(`/store/product/${product.id}`)}>{product.name}</h3>
        
        {/* Rating & Social Proof */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xs md:text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Social Proof Badge */}
        {product.soldCount > 50 && (
          <div className="flex items-center gap-1 mb-2 text-xs text-green-600">
            <Users className="h-3 w-3" />
            <span>{product.soldCount}+ জন কিনেছেন</span>
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg md:text-xl font-bold text-primary">৳{product.price}</span>
          {product.oldPrice && (
            <span className="text-xs md:text-sm text-muted-foreground line-through">৳{product.oldPrice}</span>
          )}
        </div>
        <Button
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product, 1);
          }}
        >
          কার্টে যোগ করুন
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Storefront() {
  const navigate = useNavigate();
  const { theme, setTheme, heroConfig, setHeroConfig } = useStoreTheme();
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [quantity, setQuantity] = useState(1);
  const [recentlyViewed, setRecentlyViewed] = useState<typeof products>([]);
  const [showQuickBuy, setShowQuickBuy] = useState(false);
  const [quickBuyProduct, setQuickBuyProduct] = useState<typeof products[0] | null>(null);

  // Theme configurations
  const themes: Record<StoreTheme, { name: string; colors: string; description: string }> = {
    modern: {
      name: "মডার্ন",
      colors: "bg-gradient-to-br from-blue-50 to-indigo-50",
      description: "পরিষ্কার এবং আধুনিক ডিজাইন"
    },
    minimal: {
      name: "মিনিমাল",
      colors: "bg-gradient-to-br from-gray-50 to-slate-50",
      description: "সরল এবং মার্জিত"
    },
    classic: {
      name: "ক্লাসিক",
      colors: "bg-gradient-to-br from-amber-50 to-orange-50",
      description: "ঐতিহ্যবাহী এবং উষ্ণ"
    },
    vibrant: {
      name: "প্রাণবন্ত",
      colors: "bg-gradient-to-br from-pink-50 to-purple-50",
      description: "রঙিন এবং আকর্ষণীয়"
    }
  };

  const currentThemeColors = themes[theme].colors;

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.name_en.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const addToCart = (product: typeof products[0], qty: number) => {
    setCart([...cart, { ...product, quantity: qty }]);
    setIsCartOpen(true);
  };

  const handleQuickBuy = (product: typeof products[0]) => {
    setQuickBuyProduct(product);
    setShowQuickBuy(true);
  };

  const handleQuickBuyConfirm = () => {
    if (quickBuyProduct) {
      addToCart(quickBuyProduct, 1);
      setShowQuickBuy(false);
      setQuickBuyProduct(null);
    }
  };

  // Track recently viewed products
  const handleProductView = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product && !recentlyViewed.find(p => p.id === productId)) {
      setRecentlyViewed([product, ...recentlyViewed].slice(0, 4));
    }
    navigate(`/store/product/${productId}`);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  // Get recommended products based on cart
  const getRecommendedProducts = () => {
    if (cart.length === 0) return [];
    const cartProductIds = cart.map((item: any) => item.id);
    const recommended = new Set<typeof products[0]>();
    
    cart.forEach((item: any) => {
      const product = products.find(p => p.id === item.id);
      if (product?.frequentlyBoughtWith) {
        product.frequentlyBoughtWith.forEach(id => {
          const relatedProduct = products.find(p => p.id === id);
          if (relatedProduct && !cartProductIds.includes(id)) {
            recommended.add(relatedProduct);
          }
        });
      }
    });
    
    return Array.from(recommended).slice(0, 3);
  };

  const recommendedProducts = getRecommendedProducts();

  // Detect channel from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const channel = urlParams.get('utm_source') || undefined;

  // Buy X Get Y (BOGO) simple offer config and calculator
  const bogoOffer = { buyQty: 2, getFree: 1 }; // Buy 2 Get 1 Free across identical items
  const calculateBogoDiscount = () => {
    let discount = 0;
    cart.forEach((item: any) => {
      const eligibleFree = Math.floor(item.quantity / (bogoOffer.buyQty + bogoOffer.getFree)) * bogoOffer.getFree;
      if (eligibleFree > 0) {
        discount += eligibleFree * item.price; // free items valued at item.price
      }
    });
    return discount;
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const bogoDiscount = calculateBogoDiscount();
  const deliveryFee = cart.length > 0 ? 60 : 0;
  const grandTotal = Math.max(0, cartSubtotal - bogoDiscount) + deliveryFee;

  return (
    <div className="min-h-screen bg-background">
      {/* Abandoned Cart Recovery Dialog */}
      <AbandonedCartRecovery />

      {/* Social Channel Announcement Bar */}
      <SocialChannelBar channel={channel} />

      {/* Flash Sale Banner */}
      <FlashSaleBanner
        title="ফ্ল্যাশ সেল: আজই ২০% ছাড় + Buy 2 Get 1 Free"
        itemsLeft={32}
        onShopNow={() => {
          const el = document.getElementById("products-grid");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Loyalty & Retention */}
      <div className="container mx-auto px-4 mt-6">
        <LoyaltyPanel userName={storeInfo.name_en} pointsBalance={980} nextTier="Gold" nextTierProgress={55} referralCode="REF-STORE-2024" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-4">
              <img src={storeInfo.logo} alt={storeInfo.name} className="h-10 w-10 rounded-full" />
              <div>
                <h1 className="font-bold text-xl">{storeInfo.name}</h1>
                <p className="text-xs text-muted-foreground">{storeInfo.description}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={() => setIsThemeSettingsOpen(true)}
              >
                <Palette className="h-4 w-4" />
                থিম পরিবর্তন
              </Button>
              <a href={`tel:${storeInfo.phone}`} className="flex items-center gap-2 text-sm hover:text-primary">
                <Phone className="h-4 w-4" />
                {storeInfo.phone}
              </a>
              <div className="flex items-center gap-2">
                <a href="#" className="hover:text-primary"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="hover:text-primary"><Instagram className="h-5 w-5" /></a>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Search & Cart */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="পণ্য খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              className="gap-2 relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">কার্ট</span>
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-b p-4 space-y-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2"
            onClick={() => {
              setIsThemeSettingsOpen(true);
              setIsMobileMenuOpen(false);
            }}
          >
            <Palette className="h-4 w-4" />
            থিম পরিবর্তন
          </Button>
          <a href={`tel:${storeInfo.phone}`} className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4" />
            {storeInfo.phone}
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{storeInfo.address}</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-sm hover:text-primary">Facebook</a>
            <a href="#" className="text-sm hover:text-primary">Instagram</a>
          </div>
        </div>
      )}

      {/* Hero Banner - Customizable */}
      {heroConfig.showBanner && (
        <div className="relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroConfig.bannerImage})` }}
          />
          <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{heroConfig.title}</h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">{heroConfig.subtitle}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="text-sm py-2 px-4">✓ ১০০% অরিজিনাল পণ্য</Badge>
                <Badge variant="secondary" className="text-sm py-2 px-4">✓ ক্যাশ অন ডেলিভারি</Badge>
                <Badge variant="secondary" className="text-sm py-2 px-4">✓ সারাদেশে ডেলিভারি</Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Categories & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1">
            <TabsList className="w-full justify-start overflow-x-auto">
              {categories.map(cat => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">ফিচারড</SelectItem>
              <SelectItem value="price-low">দাম (কম থেকে বেশি)</SelectItem>
              <SelectItem value="price-high">দাম (বেশি থেকে কম)</SelectItem>
              <SelectItem value="rating">রেটিং</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div id="products-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onNavigate={handleProductView}
              onQuickBuy={handleQuickBuy}
            />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">কোন পণ্য পাওয়া যায়নি</p>
          </div>
        )}

        {/* Recently Viewed Products */}
        {recentlyViewed.length > 0 && (
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">সম্প্রতি দেখা পণ্য</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentlyViewed.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onNavigate={handleProductView}
                  onQuickBuy={handleQuickBuy}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Buy Dialog */}
      <Dialog open={showQuickBuy} onOpenChange={setShowQuickBuy}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              দ্রুত কিনুন
            </DialogTitle>
          </DialogHeader>
          {quickBuyProduct && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <img 
                  src={quickBuyProduct.images[0]} 
                  alt={quickBuyProduct.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{quickBuyProduct.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-primary">৳{quickBuyProduct.price}</span>
                    {quickBuyProduct.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">৳{quickBuyProduct.oldPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{quickBuyProduct.rating}</span>
                    <span className="text-xs text-muted-foreground">({quickBuyProduct.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">✓ দ্রুত চেকআউট</p>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">✓ ক্যাশ অন ডেলিভারি</p>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">✓ সারাদেশে ডেলিভারি</p>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1" 
                  size="lg"
                  onClick={handleQuickBuyConfirm}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  কার্টে যোগ করুন
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    setShowQuickBuy(false);
                    handleProductView(quickBuyProduct.id);
                  }}
                >
                  বিস্তারিত দেখুন
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Product Details Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedProduct.name}</h2>
                  <p className="text-muted-foreground">{selectedProduct.name_en}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= selectedProduct.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{selectedProduct.rating}</span>
                  <span className="text-muted-foreground">({selectedProduct.reviews} রিভিউ)</span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-primary">৳{selectedProduct.price}</span>
                    {selectedProduct.oldPrice && (
                      <>
                        <span className="text-xl text-muted-foreground line-through">৳{selectedProduct.oldPrice}</span>
                        <Badge className="bg-red-500">
                          {Math.round((1 - selectedProduct.price / selectedProduct.oldPrice) * 100)}% ছাড়
                        </Badge>
                      </>
                    )}
                  </div>
                  {selectedProduct.stock < 10 && (
                    <p className="text-sm text-orange-600">⚠️ মাত্র {selectedProduct.stock}টি স্টকে আছে</p>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Label className="text-base">পরিমাণ:</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      className="flex-1"
                      size="lg"
                      onClick={() => {
                        addToCart(selectedProduct, quantity);
                        setSelectedProduct(null);
                        setQuantity(1);
                      }}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      কার্টে যোগ করুন
                    </Button>
                    <Button variant="outline" size="lg">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>

                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      window.open(`https://wa.me/${storeInfo.phone.replace(/\D/g, '')}?text=আমি ${selectedProduct.name} পণ্যটি কিনতে চাই`, '_blank');
                    }}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    সরাসরি অর্ডার করুন
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    ✓ <span>১০০% অরিজিনাল পণ্য</span>
                  </p>
                  <p className="flex items-center gap-2">
                    ✓ <span>ক্যাশ অন ডেলিভারি সুবিধা</span>
                  </p>
                  <p className="flex items-center gap-2">
                    ✓ <span>সারাদেশে হোম ডেলিভারি</span>
                  </p>
                  <p className="flex items-center gap-2">
                    ✓ <span>৭ দিনের রিটার্ন পলিসি</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cart Dialog */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              আপনার কার্ট ({cart.length}টি পণ্য)
            </DialogTitle>
          </DialogHeader>
          
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">আপনার কার্ট খালি</p>
              <p className="text-muted-foreground">পণ্য যোগ করে শপিং শুরু করুন</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <img src={item.images[0]} alt={item.name} className="h-16 w-16 rounded object-cover" />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">পরিমাণ: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">৳{item.price * item.quantity}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCart(cart.filter((_, i) => i !== index))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Frequently Bought Together Recommendations */}
              {recommendedProducts.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    একসাথে কেনা হয় যেগুলো
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {recommendedProducts.map((product) => (
                      <Card key={product.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="aspect-square object-cover"
                        />
                        <CardContent className="p-2">
                          <p className="text-xs font-medium line-clamp-1">{product.name}</p>
                          <p className="text-sm font-bold text-primary">৳{product.price}</p>
                          <Button 
                            size="sm" 
                            className="w-full mt-2 h-7 text-xs"
                            onClick={() => addToCart(product, 1)}
                          >
                            যোগ করুন
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-lg">
                  <span>সাবটোটাল:</span>
                  <span className="font-semibold">৳{cartSubtotal}</span>
                </div>
                {bogoDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-700 dark:text-green-300">
                    <span>BOGO অফার ডিসকাউন্ট:</span>
                    <span>-৳{bogoDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>ডেলিভারি চার্জ:</span>
                  <span>৳{deliveryFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>মোট:</span>
                  <span className="text-primary">৳{grandTotal}</span>
                </div>
              </div>

              <div className="rounded-lg p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200">
                <p className="text-sm font-medium">
                  আজকের অফার: ২টি কিনলে ১টি ফ্রি (একই পণ্য) — কার্টে স্বয়ংক্রিয়ভাবে প্রযোজ্য
                </p>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  চেকআউট করুন
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    const message = `আমি নিম্নলিখিত পণ্যগুলো অর্ডার করতে চাই:\n\n${cart
                      .map((item) => `${item.name} - ${item.quantity}টি - ৳${item.price * item.quantity}`)
                      .join("\n")}\n\nসাবটোটাল: ৳${cartSubtotal}\nBOGO ডিসকাউন্ট: ৳${bogoDiscount}\nডেলিভারি: ৳${deliveryFee}\nমোট: ৳${grandTotal}`;
                    window.open(
                      `https://wa.me/${storeInfo.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
                      "_blank"
                    );
                  }}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  WhatsApp এ অর্ডার করুন
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Theme Settings Dialog */}
      <Dialog open={isThemeSettingsOpen} onOpenChange={setIsThemeSettingsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              স্টোর ডিজাইন কাস্টমাইজ করুন
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <h3 className="font-semibold text-lg mb-4">থিম নির্বাচন করুন</h3>
              <div className="grid grid-cols-2 gap-4">
                {(Object.keys(themes) as StoreTheme[]).map((themeKey) => (
                  <Card
                    key={themeKey}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      theme === themeKey ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setTheme(themeKey)}
                  >
                    <CardContent className="p-4">
                      <div className={`h-24 rounded-lg mb-3 ${themes[themeKey].colors}`} />
                      <h4 className="font-semibold mb-1">{themes[themeKey].name}</h4>
                      <p className="text-sm text-muted-foreground">{themes[themeKey].description}</p>
                      {theme === themeKey && (
                        <Badge className="mt-2">নির্বাচিত</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Hero Section Customization */}
            <div>
              <h3 className="font-semibold text-lg mb-4">হিরো সেকশন কাস্টমাইজ করুন</h3>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">শিরোনাম</Label>
                  <Input
                    value={heroConfig.title}
                    onChange={(e) => setHeroConfig({ title: e.target.value })}
                    placeholder="আপনার স্টোরের শিরোনাম লিখুন"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">সাবটাইটেল</Label>
                  <Input
                    value={heroConfig.subtitle}
                    onChange={(e) => setHeroConfig({ subtitle: e.target.value })}
                    placeholder="সাবটাইটেল লিখুন"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">ব্যানার ইমেজ URL</Label>
                  <Input
                    value={heroConfig.bannerImage}
                    onChange={(e) => setHeroConfig({ bannerImage: e.target.value })}
                    placeholder="https://example.com/banner.jpg"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showBanner"
                    checked={heroConfig.showBanner}
                    onChange={(e) => setHeroConfig({ showBanner: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="showBanner">হিরো ব্যানার দেখান</Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Preview */}
            <div>
              <h3 className="font-semibold text-lg mb-4">প্রিভিউ</h3>
              <div className={`rounded-lg overflow-hidden border ${themes[theme].colors}`}>
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold mb-2">{heroConfig.title}</h2>
                  <p className="text-muted-foreground">{heroConfig.subtitle}</p>
                </div>
              </div>
            </div>

            <Button className="w-full" onClick={() => setIsThemeSettingsOpen(false)}>
              সংরক্ষণ করুন
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* WhatsApp Chat Bubble */}
      <WhatsAppChatBubble />

      {/* Social Proof Ticker */}
      <SocialProofTicker />

      {/* Mobile Quick Actions Bar */}
      <MobileQuickActions />

      {/* Footer */}
      <footer className="bg-muted mt-16 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{storeInfo.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{storeInfo.description}</p>
              <div className="flex gap-3">
                <a href="#" className="hover:text-primary"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="hover:text-primary"><Instagram className="h-5 w-5" /></a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">যোগাযোগ</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {storeInfo.phone}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {storeInfo.address}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">গুরুত্বপূর্ণ লিংক</h3>
              <div className="space-y-2 text-sm">
                <p><a href="#" className="hover:text-primary">ডেলিভারি পলিসি</a></p>
                <p><a href="#" className="hover:text-primary">রিটার্ন পলিসি</a></p>
                <p><a href="#" className="hover:text-primary">প্রাইভেসি পলিসি</a></p>
                <p><a href="#" className="hover:text-primary">শর্তাবলী</a></p>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-center text-sm text-muted-foreground">
            © 2024 {storeInfo.name}. সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </footer>
    </div>
  );
}