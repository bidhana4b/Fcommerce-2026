import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Settings,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface PaymentGateway {
  id: string;
  name: string;
  type: string;
  status: "active" | "inactive" | "pending";
  transactionFee: string;
  monthlyVolume: string;
  totalTransactions: number;
  successRate: number;
  logo: string;
  apiKey?: string;
  secretKey?: string;
}

const mockGateways: PaymentGateway[] = [
  {
    id: "1",
    name: "bKash",
    type: "মোবাইল ব্যাংকিং",
    status: "active",
    transactionFee: "১.৫%",
    monthlyVolume: "৳৮,৫০,০০০",
    totalTransactions: 1245,
    successRate: 98.5,
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&q=80",
    apiKey: "bkash_api_key_xxxxx",
    secretKey: "bkash_secret_xxxxx",
  },
  {
    id: "2",
    name: "Nagad",
    type: "মোবাইল ব্যাংকিং",
    status: "active",
    transactionFee: "১.২%",
    monthlyVolume: "৳৬,২০,০০০",
    totalTransactions: 892,
    successRate: 97.8,
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&q=80",
    apiKey: "nagad_api_key_xxxxx",
    secretKey: "nagad_secret_xxxxx",
  },
  {
    id: "3",
    name: "Rocket",
    type: "মোবাইল ব্যাংকিং",
    status: "inactive",
    transactionFee: "১.৮%",
    monthlyVolume: "৳৩,৫০,০০০",
    totalTransactions: 456,
    successRate: 96.2,
    logo: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=100&q=80",
  },
  {
    id: "4",
    name: "SSL Commerz",
    type: "পেমেন্ট গেটওয়ে",
    status: "active",
    transactionFee: "২.৫%",
    monthlyVolume: "৳৪,৮০,০০০",
    totalTransactions: 678,
    successRate: 99.1,
    logo: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=100&q=80",
    apiKey: "ssl_api_key_xxxxx",
    secretKey: "ssl_secret_xxxxx",
  },
];

const stats = [
  {
    name: "মোট লেনদেন",
    value: "৩,২৭১",
    change: "+১৮%",
    icon: CreditCard,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "মাসিক ভলিউম",
    value: "৳২৩,০০,০০০",
    change: "+২৫%",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "সফলতার হার",
    value: "৯৮.২%",
    change: "+২.৫%",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "সক্রিয় গেটওয়ে",
    value: "৩",
    change: "+১",
    icon: CheckCircle2,
    color: "from-orange-500 to-red-500",
  },
];

export default function PaymentGatewayManagement() {
  const [gateways, setGateways] = useState<PaymentGateway[]>(mockGateways);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(
    null,
  );
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  const toggleGatewayStatus = (id: string) => {
    setGateways(
      gateways.map((gateway) =>
        gateway.id === id
          ? {
              ...gateway,
              status: gateway.status === "active" ? "inactive" : "active",
            }
          : gateway,
      ),
    );
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            পেমেন্ট গেটওয়ে ম্যানেজমেন্ট
          </h1>
          <p className="text-muted-foreground mt-2">
            সকল পেমেন্ট গেটওয়ে পরিচালনা ও মনিটর করুন
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
              <Plus className="h-4 w-4" />
              নতুন গেটওয়ে যুক্ত করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>নতুন পেমেন্ট গেটওয়ে যুক্ত করুন</DialogTitle>
              <DialogDescription>
                নতুন পেমেন্ট গেটওয়ে কনফিগার করুন
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>গেটওয়ে নাম</Label>
                <Input placeholder="যেমন: bKash, Nagad" />
              </div>
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input placeholder="API Key লিখুন" />
              </div>
              <div className="space-y-2">
                <Label>Secret Key</Label>
                <Input type="password" placeholder="Secret Key লিখুন" />
              </div>
              <div className="space-y-2">
                <Label>লেনদেন ফি (%)</Label>
                <Input type="number" placeholder="যেমন: 1.5" />
              </div>
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
                গেটওয়ে যুক্ত করুন
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.name}
                    </p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className="text-xs text-green-600 font-medium mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Payment Gateways */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>পেমেন্ট গেটওয়ে তালিকা</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {gateways.map((gateway, index) => (
                <motion.div
                  key={gateway.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border-2">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg overflow-hidden bg-slate-100">
                            <img
                              src={gateway.logo}
                              alt={gateway.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">
                              {gateway.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {gateway.type}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            gateway.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className={`
                            ${gateway.status === "active" ? "bg-green-500" : ""}
                            ${gateway.status === "inactive" ? "bg-slate-400" : ""}
                            ${gateway.status === "pending" ? "bg-orange-500" : ""}
                          `}
                        >
                          {gateway.status === "active" && "সক্রিয়"}
                          {gateway.status === "inactive" && "নিষ্ক্রিয়"}
                          {gateway.status === "pending" && "অপেক্ষমাণ"}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            লেনদেন ফি
                          </span>
                          <span className="font-semibold">
                            {gateway.transactionFee}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            মাসিক ভলিউম
                          </span>
                          <span className="font-semibold">
                            {gateway.monthlyVolume}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            মোট লেনদেন
                          </span>
                          <span className="font-semibold">
                            {gateway.totalTransactions}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              সফলতার হার
                            </span>
                            <span className="font-semibold">
                              {gateway.successRate}%
                            </span>
                          </div>
                          <Progress
                            value={gateway.successRate}
                            className="h-2"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => setSelectedGateway(gateway)}
                            >
                              <Settings className="h-4 w-4 mr-1" />
                              সেটিংস
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{gateway.name} সেটিংস</DialogTitle>
                              <DialogDescription>
                                গেটওয়ে কনফিগারেশন পরিবর্তন করুন
                              </DialogDescription>
                            </DialogHeader>
                            <Tabs defaultValue="general" className="w-full">
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="general">
                                  সাধারণ
                                </TabsTrigger>
                                <TabsTrigger value="api">API কনফিগ</TabsTrigger>
                              </TabsList>
                              <TabsContent
                                value="general"
                                className="space-y-4"
                              >
                                <div className="space-y-2">
                                  <Label>গেটওয়ে নাম</Label>
                                  <Input defaultValue={gateway.name} />
                                </div>
                                <div className="space-y-2">
                                  <Label>লেনদেন ফি (%)</Label>
                                  <Input
                                    defaultValue={gateway.transactionFee}
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <Label>স্ট্যাটাস</Label>
                                  <Switch
                                    checked={gateway.status === "active"}
                                    onCheckedChange={() =>
                                      toggleGatewayStatus(gateway.id)
                                    }
                                  />
                                </div>
                              </TabsContent>
                              <TabsContent value="api" className="space-y-4">
                                <div className="space-y-2">
                                  <Label>API Key</Label>
                                  <div className="relative">
                                    <Input
                                      type={showApiKey ? "text" : "password"}
                                      defaultValue={gateway.apiKey}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="absolute right-0 top-0"
                                      onClick={() => setShowApiKey(!showApiKey)}
                                    >
                                      {showApiKey ? (
                                        <EyeOff className="h-4 w-4" />
                                      ) : (
                                        <Eye className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Secret Key</Label>
                                  <div className="relative">
                                    <Input
                                      type={showSecretKey ? "text" : "password"}
                                      defaultValue={gateway.secretKey}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="absolute right-0 top-0"
                                      onClick={() =>
                                        setShowSecretKey(!showSecretKey)
                                      }
                                    >
                                      {showSecretKey ? (
                                        <EyeOff className="h-4 w-4" />
                                      ) : (
                                        <Eye className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                                <Button className="w-full">
                                  পরিবর্তন সংরক্ষণ করুন
                                </Button>
                              </TabsContent>
                            </Tabs>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant={
                            gateway.status === "active"
                              ? "destructive"
                              : "default"
                          }
                          size="sm"
                          className="flex-1"
                          onClick={() => toggleGatewayStatus(gateway.id)}
                        >
                          {gateway.status === "active" ? (
                            <>
                              <XCircle className="h-4 w-4 mr-1" />
                              নিষ্ক্রিয়
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              সক্রিয়
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
