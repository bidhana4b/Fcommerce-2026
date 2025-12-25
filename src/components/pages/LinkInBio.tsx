import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Facebook, Instagram, MessageCircle, Globe, 
  ShoppingBag, Star, MapPin, Phone, Mail
} from "lucide-react";

export default function LinkInBio() {
  const featuredProducts = [
    {
      id: 1,
      name: "স্মার্টফোন কেস",
      price: 350,
      oldPrice: 500,
      image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80",
      rating: 4.8,
    },
    {
      id: 2,
      name: "হ্যান্ডব্যাগ",
      price: 1200,
      oldPrice: 1500,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
      rating: 4.9,
    },
    {
      id: 3,
      name: "টি-শার্ট",
      price: 450,
      oldPrice: 600,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      rating: 4.7,
    },
    {
      id: 4,
      name: "কসমেটিক্স সেট",
      price: 850,
      oldPrice: 1100,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
      rating: 4.9,
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", url: "#", color: "bg-blue-600" },
    { icon: Instagram, label: "Instagram", url: "#", color: "bg-gradient-to-br from-purple-600 to-pink-600" },
    { icon: MessageCircle, label: "WhatsApp", url: "#", color: "bg-green-600" },
    { icon: Globe, label: "Website", url: "#", color: "bg-gray-800" },
  ];

  const quickLinks = [
    { label: "🎁 নতুন কালেকশন", url: "#" },
    { label: "🔥 বেস্ট সেলার", url: "#" },
    { label: "💰 অফার", url: "#" },
    { label: "📦 অর্ডার ট্র্যাক করুন", url: "#" },
  ];

  const openWhatsApp = (product?: any) => {
    const message = product 
      ? `হ্যালো! আমি "${product.name}" সম্পর্কে জানতে চাই। দাম: ৳${product.price}`
      : "হ্যালো! আমি আপনার পণ্য সম্পর্কে জানতে চাই।";
    window.open(`https://wa.me/8801712345678?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary shadow-lg">
            <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
              S
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold mb-2">আমাদের স্টোর</h1>
          <p className="text-muted-foreground mb-3">
            🛍️ বাংলাদেশের সেরা অনলাইন শপ
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>ঢাকা, বাংলাদেশ</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">4.8</span>
            </div>
          </div>
          <Badge className="mb-4">✓ ভেরিফাইড সেলার</Badge>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {socialLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <a
                key={idx}
                href={link.url}
                className={`${link.color} text-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-medium">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickLinks.map((link, idx) => (
            <Button
              key={idx}
              variant="outline"
              className="h-auto py-3 text-sm font-medium"
              asChild
            >
              <a href={link.url}>{link.label}</a>
            </Button>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <Button
          size="lg"
          className="w-full mb-8 bg-green-600 hover:bg-green-700 text-lg gap-2"
          onClick={() => openWhatsApp()}
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp এ অর্ডার করুন
        </Button>

        {/* Featured Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            ফিচারড পণ্য
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                  {product.oldPrice && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      {Math.round((1 - product.price / product.oldPrice) * 100)}% ছাড়
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-lg font-bold text-primary">৳{product.price}</span>
                    {product.oldPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ৳{product.oldPrice}
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-700 gap-1"
                    onClick={() => openWhatsApp(product)}
                  >
                    <MessageCircle className="h-3 w-3" />
                    অর্ডার করুন
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4">যোগাযোগ করুন</h3>
            <div className="space-y-3">
              <a href="tel:+8801712345678" className="flex items-center gap-3 text-sm hover:text-primary">
                <Phone className="h-4 w-4" />
                <span>+880 1712-345678</span>
              </a>
              <a href="mailto:info@store.com" className="flex items-center gap-3 text-sm hover:text-primary">
                <Mail className="h-4 w-4" />
                <span>info@store.com</span>
              </a>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4" />
                <span>মিরপুর ১০, ঢাকা ১২১৬</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© ২০২৫ আমাদের স্টোর। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </div>
  );
}
