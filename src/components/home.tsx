import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  MessageSquare,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Globe,
  Smartphone,
  BarChart3,
  CreditCard,
  Package,
  Truck,
  Star,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Rocket,
  Heart,
  Clock,
  DollarSign,
  Facebook,
  Instagram,
  Send,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const features = [
    {
      icon: ShoppingBag,
      title: "স্মার্ট স্টোরফ্রন্ট",
      description: "সুন্দর, কাস্টমাইজেবল অনলাইন স্টোর তৈরি করুন মিনিটেই",
      color: "from-blue-500 to-cyan-500",
      benefits: ["মোবাইল-ফ্রেন্ডলি", "দ্রুত লোডিং", "SEO অপটিমাইজড"],
    },
    {
      icon: MessageSquare,
      title: "সোশ্যাল ইন্টিগ্রেশন",
      description: "Facebook, Instagram, WhatsApp থেকে সরাসরি বিক্রয় করুন",
      color: "from-pink-500 to-rose-500",
      benefits: ["অটো-মেসেজিং", "চ্যাট বট", "মাল্টি-চ্যানেল"],
    },
    {
      icon: CreditCard,
      title: "সহজ পেমেন্ট",
      description: "bKash, Nagad, Rocket সহ সব পেমেন্ট মেথড সাপোর্ট",
      color: "from-green-500 to-emerald-500",
      benefits: ["নিরাপদ", "দ্রুত", "কম ফি"],
    },
    {
      icon: BarChart3,
      title: "পাওয়ারফুল অ্যানালিটিক্স",
      description: "রিয়েল-টাইম ডেটা দিয়ে ব্যবসা বৃদ্ধি করুন",
      color: "from-purple-500 to-indigo-500",
      benefits: ["বিক্রয় রিপোর্ট", "কাস্টমার ইনসাইট", "ট্রেন্ড বিশ্লেষণ"],
    },
    {
      icon: Package,
      title: "ইনভেন্টরি ম্যানেজমেন্ট",
      description: "স্টক ট্র্যাকিং এবং পণ্য ম্যানেজমেন্ট সহজ করুন",
      color: "from-orange-500 to-red-500",
      benefits: ["স্টক অ্যালার্ট", "বাল্ক আপলোড", "��্যারিয়েন্ট সাপোর্ট"],
    },
    {
      icon: Truck,
      title: "ডেলিভারি ট্র্যাকিং",
      description: "অর্ডার থেকে ডেলিভারি পর্যন্ত সম্পূর্ণ ট্র্যাকিং",
      color: "from-yellow-500 to-orange-500",
      benefits: ["রিয়েল-টাইম আপডেট", "SMS নোটিফিকেশন", "মাল্টি-কুরিয়ার"],
    },
  ];

  const stats = [
    { value: "১০,০০০+", label: "সক্রিয় বিক্রেতা", icon: Users },
    { value: "৫ লক্ষ+", label: "মাসিক অর্ডার", icon: ShoppingBag },
    { value: "৯৮%", label: "সন্তুষ্ট গ্রাহক", icon: Star },
    { value: "২৪/৭", label: "সাপোর্ট", icon: MessageSquare },
  ];

  const testimonials = [
    {
      name: "করিম মিয়া",
      role: "ফ্যাশন স্টোর মালিক",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=karim",
      content: "এই প্ল্যাটফর্ম ব্যবহার করে আমার বিক্রয় ৩ গুণ বেড়েছে। সত্যিই অসাধারণ!",
      rating: 5,
    },
    {
      name: "রহিম�� বেগম",
      role: "হস্তশিল্প ব্যবসায়ী",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahima",
      content: "খুব সহজ এবং ব্যবহার করা সুবিধাজনক। কাস্টমার সাপোর্ট দুর্দান্ত!",
      rating: 5,
    },
    {
      name: "জামাল হোসেন",
      role: "ইলেকট্রনিক্স বিক্রেতা",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=jamal",
      content: "পেমেন্ট সিস্টেম অনেক নিরাপদ এবং দ্রুত। আমি সন্তুষ্ট!",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "ফ্রি",
      price: "০",
      period: "চিরকাল",
      description: "শুরু করার জন্য পারফেক্ট",
      features: [
        "৫০টি পণ্য",
        "বেসিক স্টোরফ্রন্ট",
        "সোশ্যাল মিডিয়া ইন্টিগ্রেশন",
        "বেসিক অ্যানালিটিক্স",
        "ইমেইল সাপোর্ট",
      ],
      popular: false,
      color: "from-slate-500 to-slate-600",
    },
    {
      name: "বেসিক",
      price: "৯৯৯",
      period: "মাসে",
      description: "ছোট ব্যবসার জন্য",
      features: [
        "৫০০টি পণ্য",
        "কাস্টম ডোমেইন",
        "সব পেমেন্ট গেটওয়ে",
        "অ্যাডভান্সড অ্যানালিটিক্স",
        "প্রায়োরিটি সাপোর্ট",
        "চ্যাট অটোমেশন",
      ],
      popular: true,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "প্রিমিয়াম",
      price: "১,৯৯৯",
      period: "মাসে",
      description: "বড় ব্যবসার জন্য",
      features: [
        "আনলিমিটেড পণ্য",
        "মাল্টি-স্টোর",
        "API অ্যাক্সেস",
        "কাস্টম ব্র্যান্ডিং",
        "ডেডিকেটেড সাপোর্ট",
        "অ্যাডভান্সড অটোমেশন",
        "হোয়াইট লেবেল",
      ],
      popular: false,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const socialChannels = [
    { icon: Facebook, name: "Facebook", color: "text-blue-600" },
    { icon: Instagram, name: "Instagram", color: "text-pink-600" },
    { icon: Send, name: "WhatsApp", color: "text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                সোশ্যাল কমার্স
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                ফিচার
              </a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                প্রাইসিং
              </a>
              <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
                রিভিউ
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="hidden md:inline-flex"
              >
                লগইন
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
              >
                শুরু করুন
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="relative py-20 md:py-32 overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                বাংলাদেশের #১ সোশ্যাল কমার্স প্ল্যাটফর্ম
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  সোশ্যাল মিডিয়ায়
                </span>
                <br />
                <span className="text-slate-900 dark:text-white">
                  বিক্রয় করুন সহজে
                </span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Facebook, Instagram, WhatsApp থেকে সরাসরি বিক্রয় করুন।
                পেমেন্ট, ডেলিভারি, কাস্টমার ম্যানেজমেন্ট - সব এক জায়গায়।
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/register")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 h-14 gap-2 shadow-xl hover:shadow-2xl transition-all"
                >
                  <Rocket className="h-5 w-5" />
                  ফ্রি শুরু করুন
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 h-14 gap-2"
                >
                  <Target className="h-5 w-5" />
                  ডেমো দেখুন
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                {socialChannels.map((channel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className={`h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${channel.color}`}>
                      <channel.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">{channel.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse" />
                <Card className="relative overflow-hidden border-2 shadow-2xl">
                  <CardContent className="p-0">
                    <img
                      src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                      alt="Dashboard Preview"
                      className="w-full h-auto rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Floating Stats */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -left-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-4 border"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">+৩২৫%</p>
                    <p className="text-xs text-muted-foreground">বিক্রয় বৃদ্ধি</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-4 border"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">১০,০০০+</p>
                    <p className="text-xs text-muted-foreground">সক্রিয় বিক্রেতা</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
                <p className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</p>
                <p className="text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
              <Zap className="h-3 w-3 mr-1" />
              পাওয়ারফুল ফিচার
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              সব কিছু যা আপনার{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ব্যবসার জন্য প্রয়োজন
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              আধুনিক টুলস এবং ফিচার দিয়ে আপনার ব্যবসা নিয়ে যান নতুন উচ্চতায়
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl group">
                  <CardContent className="p-8">
                    <div className={`h-16 w-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
              <Clock className="h-3 w-3 mr-1" />
              সহজ প্রক্রিয়া
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              মাত্র ৩ ধাপে{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                শুরু করুন
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "১",
                title: "রেজিস্টার করুন",
                description: "ফ্রি অ্যাকাউন্ট তৈরি করুন মাত্র ২ মিনিটে",
                icon: Users,
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "২",
                title: "স্টোর সেটআপ",
                description: "পণ্য যুক্ত করুন এবং স্টোর কাস্টমাইজ করুন",
                icon: ShoppingBag,
                color: "from-purple-500 to-pink-500",
              },
              {
                step: "৩",
                title: "বিক্রয় শুরু",
                description: "সোশ্যাল মিডিয়ায় শেয়ার করুন এবং বিক্রয় করুন",
                icon: Rocket,
                color: "from-green-500 to-emerald-500",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className={`h-20 w-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute top-4 right-4 text-6xl font-bold text-slate-100 dark:text-slate-800">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
              <DollarSign className="h-3 w-3 mr-1" />
              সাশ্রয়ী মূল্য
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              আপনার ব্যবসার জন্য{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                সঠিক প্ল্যান
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              যেকোনো সময় আপগ্রেড বা ডাউনগ্রেড করুন
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card className={`relative h-full border-2 ${plan.popular ? "border-primary shadow-2xl scale-105" : ""} hover:shadow-xl transition-all`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        জনপ্রিয়
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className={`h-16 w-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <ShoppingBag className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-5xl font-bold">৳{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <Button
                      className={`w-full mb-6 ${plan.popular ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      শুরু করুন
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                    <div className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0">
              <Heart className="h-3 w-3 mr-1" />
              কাস্টমার রিভিউ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              আমাদের বিক্রেতারা{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                কী বলছেন
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-lg mb-6 leading-relaxed">"{testimonial.content}"</p>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 ring-2 ring-primary">
                        <AvatarImage src={testimonial.image} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              আজই শুরু করুন আপনার
              <br />
              সফল ব্যবসার যাত্রা
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              হাজারো বিক্রেতা ইতিমধ্যে তাদের ব্যবসা বৃদ্ধি করছেন আমাদের সাথে
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-8 h-14 gap-2 shadow-xl"
              >
                <Rocket className="h-5 w-5" />
                ফ্রি শুরু করুন
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 h-14 gap-2 border-white text-white hover:bg-white/10"
              >
                আরও জানুন
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">সোশ্যাল কমার্স</span>
              </div>
              <p className="text-slate-400">
                বাংলাদেশের সবচেয়ে বিশ্বস্ত সোশ্যাল কমার্স প্ল্যাটফর্ম
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">প্রোডাক্ট</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">ফিচার</a></li>
                <li><a href="#" className="hover:text-white transition-colors">প্রাইসিং</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ইন্টিগ্রেশন</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">কোম্পানি</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">আমাদের সম্পর্কে</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ব্লগ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ক্যারিয়ার</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">সাপোর্ট</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">হেল্প সেন্টার</a></li>
                <li><a href="#" className="hover:text-white transition-colors">যোগাযোগ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">প্রাইভেসি পলিসি</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>© 2024 সোশ্যাল কমার্স। সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}