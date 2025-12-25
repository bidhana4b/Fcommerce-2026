import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Percent, Tag, Calendar, Gift, Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DiscountCode {
  code: string;
  type: "percentage" | "fixed" | "free-shipping";
  value: number;
  minOrder?: number;
  expiresAt?: string;
  usageLimit?: number;
  usedCount: number;
  active: boolean;
}

export default function DiscountCodeSystem() {
  const { toast } = useToast();
  const [codes, setCodes] = useState<DiscountCode[]>([
    {
      code: "WELCOME10",
      type: "percentage",
      value: 10,
      minOrder: 500,
      expiresAt: "2024-12-31",
      usageLimit: 100,
      usedCount: 23,
      active: true,
    },
    {
      code: "FREESHIP",
      type: "free-shipping",
      value: 0,
      minOrder: 1000,
      usageLimit: 50,
      usedCount: 12,
      active: true,
    },
    {
      code: "SAVE200",
      type: "fixed",
      value: 200,
      minOrder: 2000,
      expiresAt: "2024-06-30",
      usedCount: 45,
      active: true,
    },
  ]);

  const [newCode, setNewCode] = useState({
    code: "",
    type: "percentage" as const,
    value: 0,
    minOrder: 0,
    expiresAt: "",
    usageLimit: 0,
  });

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({
      title: "কপি হয়েছে!",
      description: `কোড "${code}" কপি করা হয়েছে`,
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreateCode = () => {
    if (!newCode.code || newCode.value <= 0) {
      toast({
        title: "ত্রুটি",
        description: "সব ফিল্ড সঠিকভাবে পূরণ করুন",
        variant: "destructive",
      });
      return;
    }

    const code: DiscountCode = {
      ...newCode,
      usedCount: 0,
      active: true,
    };

    setCodes([code, ...codes]);
    setNewCode({
      code: "",
      type: "percentage",
      value: 0,
      minOrder: 0,
      expiresAt: "",
      usageLimit: 0,
    });

    toast({
      title: "সফল!",
      description: "নতুন ডিসকাউন্ট কোড তৈরি হয়েছে",
    });
  };

  const toggleCodeStatus = (code: string) => {
    setCodes(codes.map(c => 
      c.code === code ? { ...c, active: !c.active } : c
    ));
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "percentage": return "শতাংশ ছাড়";
      case "fixed": return "নির্দিষ্ট ছাড়";
      case "free-shipping": return "ফ্রি ডেলিভারি";
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "percentage": return <Percent className="h-4 w-4" />;
      case "fixed": return <Tag className="h-4 w-4" />;
      case "free-shipping": return <Gift className="h-4 w-4" />;
      default: return <Tag className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ডিসকাউন্ট কোড</h2>
          <p className="text-muted-foreground">প্রমো কোড তৈরি ও পরিচালনা করুন</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Tag className="h-4 w-4" />
              নতুন কোড তৈরি
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>নতুন ডিসকাউন্ট কোড</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>কোড</Label>
                <Input
                  placeholder="SUMMER2024"
                  value={newCode.code}
                  onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="space-y-2">
                <Label>ধরন</Label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={newCode.type}
                  onChange={(e) => setNewCode({ ...newCode, type: e.target.value as any })}
                >
                  <option value="percentage">শতাংশ ছাড়</option>
                  <option value="fixed">নির্দিষ্ট ছাড়</option>
                  <option value="free-shipping">ফ্রি ডেলিভারি</option>
                </select>
              </div>

              {newCode.type !== "free-shipping" && (
                <div className="space-y-2">
                  <Label>
                    {newCode.type === "percentage" ? "ছাড়ের শতাংশ" : "ছাড়ের পরিমাণ (৳)"}
                  </Label>
                  <Input
                    type="number"
                    placeholder="10"
                    value={newCode.value || ""}
                    onChange={(e) => setNewCode({ ...newCode, value: parseFloat(e.target.value) })}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>সর্বনিম্ন অর্ডার (৳)</Label>
                <Input
                  type="number"
                  placeholder="500"
                  value={newCode.minOrder || ""}
                  onChange={(e) => setNewCode({ ...newCode, minOrder: parseFloat(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label>মেয়াদ শেষ</Label>
                <Input
                  type="date"
                  value={newCode.expiresAt}
                  onChange={(e) => setNewCode({ ...newCode, expiresAt: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>ব্যবহারের সীমা</Label>
                <Input
                  type="number"
                  placeholder="100"
                  value={newCode.usageLimit || ""}
                  onChange={(e) => setNewCode({ ...newCode, usageLimit: parseInt(e.target.value) })}
                />
              </div>

              <Button onClick={handleCreateCode} className="w-full">
                কোড তৈরি করুন
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Codes List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {codes.map((code) => (
          <Card key={code.code} className={`${!code.active ? 'opacity-60' : ''}`}>
            <CardContent className="p-6 space-y-4">
              {/* Code Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    {getTypeIcon(code.type)}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{code.code}</p>
                    <p className="text-xs text-muted-foreground">{getTypeLabel(code.type)}</p>
                  </div>
                </div>
                <Badge variant={code.active ? "default" : "secondary"}>
                  {code.active ? "সক্রিয়" : "নিষ্ক্রিয়"}
                </Badge>
              </div>

              {/* Code Details */}
              <div className="space-y-2 text-sm">
                {code.type !== "free-shipping" && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ছাড়</span>
                    <span className="font-semibold">
                      {code.type === "percentage" ? `${code.value}%` : `৳${code.value}`}
                    </span>
                  </div>
                )}
                {code.minOrder && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">সর্বনিম্ন অর্ডার</span>
                    <span className="font-semibold">৳{code.minOrder}</span>
                  </div>
                )}
                {code.expiresAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">মেয়াদ শেষ</span>
                    <span className="font-semibold">{code.expiresAt}</span>
                  </div>
                )}
                {code.usageLimit && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ব্যবহার</span>
                    <span className="font-semibold">
                      {code.usedCount}/{code.usageLimit}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => handleCopyCode(code.code)}
                >
                  {copiedCode === code.code ? (
                    <>
                      <Check className="h-4 w-4" />
                      কপি হয়েছে
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      কপি
                    </>
                  )}
                </Button>
                <Button
                  variant={code.active ? "destructive" : "default"}
                  size="sm"
                  className="flex-1"
                  onClick={() => toggleCodeStatus(code.code)}
                >
                  {code.active ? "নিষ্ক্রিয়" : "সক্রিয়"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage Instructions */}
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Gift className="h-5 w-5 text-blue-600" />
            কিভাবে ব্যবহার করবেন
          </h3>
          <ul className="text-sm space-y-1 text-blue-900 dark:text-blue-100">
            <li>• গ্রাহকরা চেকআউট পেজে কোড প্রয়োগ করতে পারবেন</li>
            <li>• সোশ্যাল মিডিয়ায় কোড শেয়ার করুন</li>
            <li>• বিশেষ অফারের জন্য সীমিত সময়ের কোড তৈরি করুন</li>
            <li>• নতুন গ্রাহকদের জন্য স্বাগত কোড দিন</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
