import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, Star, ShoppingCart, Heart, Share2, Package, 
  Truck, Shield, RotateCcw, ChevronRight, ThumbsUp, MessageSquare,
  Play, Ruler, Clock, MapPin, HelpCircle, Calendar, AlertCircle, Flame
} from "lucide-react";

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  verified: boolean;
}

interface Product {
  id: number;
  name: string;
  name_en: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  images?: string[];
  category: string;
  description?: string;
  specifications?: { label: string; value: string }[];
  features?: string[];
}

const mockReviews: Review[] = [
  { id: 1, author: "আহমেদ হোসেন", rating: 5, date: "২ দিন আগে", comment: "অসাধারণ পণ্য! মান খুবই ভালো এবং দাম অনুযায়ী পারফেক্ট। ডেলিভারিও দ্রুত হয়েছে।", helpful: 12, verified: true },
  { id: 2, author: "ফাতিমা খাতুন", rating: 4, date: "১ সপ্তাহ আগে", comment: "ভালো পণ্য, তবে প্যাকেজিং আরেকটু ভালো হতে পারত। সামগ্রিকভাবে সন্তুষ্ট।", helpful: 8, verified: true },
  { id: 3, author: "রফিক উদ্দিন", rating: 5, date: "২ সপ্তাহ আগে", comment: "দারুণ! ছবিতে যেমন দেখেছি ঠিক তেমনই পেয়েছি। সবাইকে রেকমেন্ড করব।", helpful: 15, verified: false },
];

export default function ProductDetails({ productId = "1" }: { productId?: string }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [viewersNow, setViewersNow] = useState(12);

  // Sticky Add to Cart on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock product data - would come from API
  const product: Product = {
    id: 1,
    name: "প্রিমিয়াম স্মার্টফোন কেস",
    name_en: "Premium Smartphone Case",
    price: 350,
    oldPrice: 450,
    rating: 4.5,
    reviews: 23,
    stock: 45,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80",
    ],
    description: "উচ্চমানের ম্যাটেরিয়াল দিয়ে তৈরি এই স্মার্টফোন কেসটি আপনার ফোনকে সম্পূর্ণ সুরক্ষা প্রদান করবে। শক-প্রুফ ডিজাইন এবং স্লিম ফিট আপনার ফোনকে স্টাইলিশ এবং নিরাপদ রাখবে।",
    specifications: [
      { label: "ম্যাটেরিয়াল", value: "প্রিমিয়াম সিলিকন" },
      { label: "রঙ", value: "কালো, নীল, লাল" },
      { label: "ওজন", value: "৫০ গ্রাম" },
      { label: "সামঞ্জস্যতা", value: "সব স্মার্টফোন মডেল" },
    ],
    features: [
      "শক-প্রুফ প্রোটেকশন",
      "স্লিম এবং লাইটওয়েট ডিজাইন",
      "সহজে পরিষ্কার করা যায়",
      "সব বাটন এবং পো��্টে সহজ এক্সেস",
      "প্রিমিয়াম ফিনিশিং",
    ],
  };

  // Related products from same category
  const relatedProducts: Product[] = [
    { id: 5, name: "ওয়াচ", name_en: "Watch", price: 1800, oldPrice: 2200, rating: 4.6, reviews: 56, stock: 15, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", category: "accessories" },
    { id: 6, name: "সানগ্লাস", name_en: "Sunglasses", price: 650, oldPrice: 850, rating: 4.4, reviews: 28, stock: 32, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80", category: "accessories" },
    { id: 7, name: "ওয়ালেট", name_en: "Wallet", price: 450, oldPrice: 600, rating: 4.7, reviews: 34, stock: 20, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80", category: "accessories" },
  ];

  const ratingDistribution = [
    { stars: 5, count: 15, percentage: 65 },
    { stars: 4, count: 5, percentage: 22 },
    { stars: 3, count: 2, percentage: 9 },
    { stars: 2, count: 1, percentage: 4 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  // Calculate estimated delivery date
  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today.setDate(today.getDate() + 3));
    return deliveryDate.toLocaleDateString("bn-BD", { 
      day: "numeric", 
      month: "long",
      weekday: "long"
    });
  };

  // Stock countdown timer
  const getStockUrgency = () => {
    if (product.stock <= 3) return { text: `মাত্র ${product.stock}টি বাকি!`, color: "text-red-600", urgent: true };
    if (product.stock <= 10) return { text: `স্টক সীমিত - ${product.stock}টি`, color: "text-orange-600", urgent: false };
    return null;
  };

  const stockUrgency = getStockUrgency();

  useEffect(() => {
    const interval = setInterval(() => {
      setViewersNow(Math.floor(Math.random() * 10) + 8);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleWishlist = () => {
    setIsWishlisted((prev) => {
      const next = !prev;
      try {
        const list = JSON.parse(localStorage.getItem("wishlist") || "[]");
        const productEntry = { id: product.id, name: product.name, price: product.price, image: product.image };
        let updated = [] as any[];
        if (next) {
          updated = Array.isArray(list) ? [...list.filter((i: any) => i.id !== product.id), productEntry] : [productEntry];
        } else {
          updated = Array.isArray(list) ? list.filter((i: any) => i.id !== product.id) : [];
        }
        localStorage.setItem("wishlist", JSON.stringify(updated));
      } catch {}
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => navigate("/store")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">পণ্যের বিস্তারিত</h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate("/store")}>
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Urgency strip */}
        <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200">
          <Flame className="h-5 w-5 text-orange-600" />
          <p className="text-sm font-medium">
            এখন {viewersNow} জন দেখছেন • শেষ ক্রয় ৫ মিনিট আগে • সীমিত স্টক চলছে
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Enhanced Product Images with Video Support */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted relative group">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              {product.oldPrice && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                  {Math.round((1 - product.price / product.oldPrice) * 100)}% ছাড়
                </Badge>
              )}
              
              {/* Video Play Button */}
              <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg"
                    className="absolute bottom-4 right-4 rounded-full gap-2 bg-black/70 hover:bg-black/90"
                  >
                    <Play className="h-5 w-5" />
                    ভিডিও দেখুন
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>পণ্যের ভিডিও</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <p className="text-white">ভিডিও প্লেয়ার (ডেমো)</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.name_en}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} রিভিউ)</span>
            </div>

            <Separator />

            {/* Enhanced Price with Stock Urgency */}
            <div className="space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">৳{product.price}</span>
                {product.oldPrice && (
                  <>
                    <span className="text-2xl text-muted-foreground line-through">৳{product.oldPrice}</span>
                    <Badge className="bg-red-500">
                      ৳{product.oldPrice - product.price} সাশ্রয়
                    </Badge>
                  </>
                )}
              </div>
              
              {/* Stock Countdown */}
              {stockUrgency && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${stockUrgency.urgent ? 'bg-red-50 dark:bg-red-950/20' : 'bg-orange-50 dark:bg-orange-950/20'}`}>
                  <AlertCircle className={`h-5 w-5 ${stockUrgency.color}`} />
                  <p className={`font-semibold ${stockUrgency.color}`}>
                    {stockUrgency.text}
                  </p>
                </div>
              )}

              {/* Estimated Delivery Date */}
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <Truck className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">
                    আনুমানিক ডেলিভারি
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {getEstimatedDelivery()}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Size Guide Button */}
            <Dialog open={showSizeGuide} onOpenChange={setShowSizeGuide}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full gap-2">
                  <Ruler className="h-4 w-4" />
                  সাইজ গাইড দেখুন
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>সাইজ গাইড</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border p-3 text-left">সাইজ</th>
                          <th className="border p-3 text-left">বুক (ইঞ্চি)</th>
                          <th className="border p-3 text-left">কোমর (ইঞ্চি)</th>
                          <th className="border p-3 text-left">দৈর্ঘ্য (ইঞ্চি)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-3 font-medium">S</td>
                          <td className="border p-3">36-38</td>
                          <td className="border p-3">30-32</td>
                          <td className="border p-3">27</td>
                        </tr>
                        <tr>
                          <td className="border p-3 font-medium">M</td>
                          <td className="border p-3">38-40</td>
                          <td className="border p-3">32-34</td>
                          <td className="border p-3">28</td>
                        </tr>
                        <tr>
                          <td className="border p-3 font-medium">L</td>
                          <td className="border p-3">40-42</td>
                          <td className="border p-3">34-36</td>
                          <td className="border p-3">29</td>
                        </tr>
                        <tr>
                          <td className="border p-3 font-medium">XL</td>
                          <td className="border p-3">42-44</td>
                          <td className="border p-3">36-38</td>
                          <td className="border p-3">30</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      💡 টিপ: সঠিক সাইজ নির্বাচনের জন্য আপনার বর্তমান পোশাকের মাপ নিন
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-base font-medium">পরিমাণ:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-16 text-center font-medium text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" size="lg">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  কার্টে যোগ করুন
                </Button>
                <Button
                  variant={isWishlisted ? "default" : "outline"}
                  size="lg"
                  onClick={toggleWishlist}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
              </div>

              <Button variant="secondary" size="lg" className="w-full">
                এখনই কিনুন
              </Button>
            </div>

            {/* Ask a Question Button */}
            <Dialog open={showAskQuestion} onOpenChange={setShowAskQuestion}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full gap-2">
                  <HelpCircle className="h-4 w-4" />
                  প্রশ্ন করুন
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>পণ্য সম্পর্কে প্রশ্ন করুন</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>আপনার নাম</Label>
                    <input type="text" className="w-full p-2 border rounded-lg" placeholder="নাম লিখুন" />
                  </div>
                  <div className="space-y-2">
                    <Label>ইমেইল/ফোন</Label>
                    <input type="text" className="w-full p-2 border rounded-lg" placeholder="যোগাযোগের তথ্য" />
                  </div>
                  <div className="space-y-2">
                    <Label>আপনার প্রশ্ন</Label>
                    <Textarea 
                      placeholder="পণ্য সম্পর্কে আপনার প্রশ্ন লিখুন..."
                      rows={4}
                    />
                  </div>
                  <Button className="w-full">প্রশ্ন জমা দিন</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Separator />

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">ফ্রি ডেলিভারি</p>
                  <p className="text-xs text-muted-foreground">৫০০+ টাকার অর্ডারে</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">১০০% অরিজিনাল</p>
                  <p className="text-xs text-muted-foreground">গ্যারান্টিসহ</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">৭ দিন রিটার্ন</p>
                  <p className="text-xs text-muted-foreground">সহজ রিটার্ন পলিসি</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Package className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">নিরাপদ প্যাকেজিং</p>
                  <p className="text-xs text-muted-foreground">ক্ষতি থেকে সুরক্ষা</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Add to Cart Bar */}
        {isSticky && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t shadow-lg z-50 animate-in slide-in-from-bottom">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{product.name}</p>
                    <p className="text-lg font-bold text-primary">৳{product.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
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
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >
                      +
                    </Button>
                  </div>
                  <Button size="lg" className="gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    কার্টে যোগ করুন
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Details Tabs */}
        <Card className="mb-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
              <TabsTrigger value="description" className="rounded-none border-b-2 data-[state=active]:border-primary">
                বিবরণ
              </TabsTrigger>
              <TabsTrigger value="specifications" className="rounded-none border-b-2 data-[state=active]:border-primary">
                স্পেসিফিকেশন
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 data-[state=active]:border-primary">
                রিভিউ ({product.reviews})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="p-6 space-y-4">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              {product.features && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">বৈশিষ্ট্য:</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>

            <TabsContent value="specifications" className="p-6">
              {product.specifications && (
                <div className="space-y-3">
                  {product.specifications.map((spec, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b last:border-0">
                      <span className="font-medium">{spec.label}</span>
                      <span className="text-muted-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="p-6 space-y-6">
              {/* Rating Summary */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center space-y-4">
                  <div>
                    <div className="text-5xl font-bold">{product.rating}</div>
                    <div className="flex items-center justify-center gap-1 my-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 ${
                            star <= product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{product.reviews} টি রিভিউ</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {ratingDistribution.map((dist) => (
                    <div key={dist.stars} className="flex items-center gap-3">
                      <span className="text-sm w-8">{dist.stars} ★</span>
                      <Progress value={dist.percentage} className="flex-1" />
                      <span className="text-sm text-muted-foreground w-12 text-right">{dist.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Reviews List */}
              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{review.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{review.author}</p>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  ভেরিফাইড ক্রেতা
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-muted-foreground">{review.comment}</p>

                      <div className="flex items-center gap-4 pt-2">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <ThumbsUp className="h-4 w-4" />
                          সহায়ক ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <MessageSquare className="h-4 w-4" />
                          উত্তর দিন
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Related Products */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">একই ক্যাটাগরির পণ্য</h2>
            <Button variant="ghost" className="gap-2">
              সব দেখুন
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                  {relatedProduct.oldPrice && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      {Math.round((1 - relatedProduct.price / relatedProduct.oldPrice) * 100)}% ছাড়
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{relatedProduct.rating}</span>
                    <span className="text-xs text-muted-foreground">({relatedProduct.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">৳{relatedProduct.price}</span>
                    {relatedProduct.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ৳{relatedProduct.oldPrice}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}