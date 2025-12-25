import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Facebook, 
  Instagram, 
  MessageSquare, 
  Bell, 
  Settings, 
  RefreshCw, 
  Copy, 
  Check, 
  AlertCircle,
  Link as LinkIcon,
  Key,
  ShieldCheck,
  Eye,
  EyeOff,
  Send
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  generateTestWebhookEvent, 
  storeWebhookEvent, 
  getRecentWebhookEvents,
  WebhookEvent
} from "@/utils/webhookHandler";

// Mock data for connected accounts
const mockFacebookPages = [
  { id: "123456789", name: "My Fashion Store", connected: true, accessToken: "EAABc..." },
  { id: "987654321", name: "Dhaka Trends", connected: false, accessToken: "" },
];

const mockInstagramAccounts = [
  { id: "111222333", name: "fashion_trends_bd", connected: true, accessToken: "IGQVJ..." },
  { id: "444555666", name: "dhaka_styles", connected: false, accessToken: "" },
];

export default function SocialIntegration() {
  const [webhookUrl, setWebhookUrl] = useState("https://webhook.site/123456-7890-1234-5678-1234567890ab");
  const [webhookSecret, setWebhookSecret] = useState("whsec_123456789abcdef");
  const [showSecret, setShowSecret] = useState(false);
  const [webhookUrlCopied, setWebhookUrlCopied] = useState(false);
  const [webhookSecretCopied, setWebhookSecretCopied] = useState(false);
  const [selectedFacebookPage, setSelectedFacebookPage] = useState(mockFacebookPages[0].id);
  const [selectedInstagramAccount, setSelectedInstagramAccount] = useState(mockInstagramAccounts[0].id);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [webhookTestResult, setWebhookTestResult] = useState<null | "success" | "error">(null);
  const [recentEvents, setRecentEvents] = useState<WebhookEvent[]>([]);
  const [showTestEventDialog, setShowTestEventDialog] = useState(false);
  const [selectedTestEventType, setSelectedTestEventType] = useState("facebook_message");

  // Mock webhook events
  const facebookEvents = [
    { id: "messages", label: "Messages", enabled: true },
    { id: "feed_post", label: "Feed Posts", enabled: true },
    { id: "comments", label: "Comments", enabled: true },
    { id: "reactions", label: "Reactions", enabled: false },
  ];

  const instagramEvents = [
    { id: "comments", label: "Comments", enabled: true },
    { id: "mentions", label: "Mentions", enabled: true },
    { id: "messages", label: "Direct Messages", enabled: true },
    { id: "story_mentions", label: "Story Mentions", enabled: false },
  ];

  const [fbEvents, setFbEvents] = useState(facebookEvents);
  const [igEvents, setIgEvents] = useState(instagramEvents);

  // Load recent events on component mount
  useEffect(() => {
    setRecentEvents(getRecentWebhookEvents(10));
  }, []);

  const copyToClipboard = (text: string, type: 'url' | 'secret') => {
    navigator.clipboard.writeText(text);
    if (type === 'url') {
      setWebhookUrlCopied(true);
      setTimeout(() => setWebhookUrlCopied(false), 2000);
    } else {
      setWebhookSecretCopied(true);
      setTimeout(() => setWebhookSecretCopied(false), 2000);
    }
  };

  const toggleFbEvent = (eventId: string) => {
    setFbEvents(fbEvents.map(event => 
      event.id === eventId ? { ...event, enabled: !event.enabled } : event
    ));
  };

  const toggleIgEvent = (eventId: string) => {
    setIgEvents(igEvents.map(event => 
      event.id === eventId ? { ...event, enabled: !event.enabled } : event
    ));
  };

  const testWebhook = () => {
    setIsTestingWebhook(true);
    // Simulate webhook test
    setTimeout(() => {
      setIsTestingWebhook(false);
      setWebhookTestResult(Math.random() > 0.2 ? "success" : "error");
      
      // Clear test result after 5 seconds
      setTimeout(() => {
        setWebhookTestResult(null);
      }, 5000);
    }, 2000);
  };

  const generateTestEvent = (type: string) => {
    const event = generateTestWebhookEvent(type);
    storeWebhookEvent(event);
    setRecentEvents(getRecentWebhookEvents(10));
    setShowTestEventDialog(false);
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) {
      return 'এখনই';
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)} মিনিট আগে`;
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)} ঘন্টা আগে`;
    } else {
      return `${Math.floor(diff / 86400000)} দিন আগে`;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-blue-500" />
            ওয়েবহুক কনফিগারেশন
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>ওয়েবহুক URL</Label>
              <div className="flex gap-2">
                <Input 
                  value={webhookUrl} 
                  onChange={(e) => setWebhookUrl(e.target.value)} 
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(webhookUrl, 'url')}
                >
                  {webhookUrlCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                এই URL-এ সমস্ত ওয়েবহুক ইভেন্ট পাঠানো হবে
              </p>
            </div>

            <div className="space-y-2">
              <Label>ওয়েবহুক সিক্রেট</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input 
                    type={showSecret ? "text" : "password"} 
                    value={webhookSecret} 
                    onChange={(e) => setWebhookSecret(e.target.value)} 
                    className="font-mono text-sm pr-10"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showSecret ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </button>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(webhookSecret, 'secret')}
                >
                  {webhookSecretCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                ওয়েবহুক সিক্রেট ব্যবহার করে পেলোড ভেরিফাই করুন
              </p>
            </div>

            <div className="pt-2">
              <Button 
                onClick={testWebhook} 
                disabled={isTestingWebhook}
                className="gap-2"
              >
                {isTestingWebhook ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    টেস্টিং...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    ওয়েবহুক টেস্ট করুন
                  </>
                )}
              </Button>

              {webhookTestResult && (
                <Alert className={`mt-4 ${webhookTestResult === "success" ? "border-green-500" : "border-red-500"}`}>
                  {webhookTestResult === "success" ? (
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  <AlertTitle>
                    {webhookTestResult === "success" ? "টেস্ট সফল হয়েছে!" : "টেস্ট ব্যর্থ হয়েছে!"}
                  </AlertTitle>
                  <AlertDescription>
                    {webhookTestResult === "success" 
                      ? "ওয়েবহুক সঠিকভাবে কনফিগার করা হয়েছে।" 
                      : "ওয়েবহুক কনফিগারেশন চেক করুন এবং আবার চেষ্টা করুন।"}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="facebook" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="facebook" className="gap-2">
            <Facebook className="h-4 w-4 text-blue-600" />
            Facebook
          </TabsTrigger>
          <TabsTrigger value="instagram" className="gap-2">
            <Instagram className="h-4 w-4 text-pink-600" />
            Instagram
          </TabsTrigger>
        </TabsList>

        {/* Facebook Tab */}
        <TabsContent value="facebook">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Facebook className="h-5 w-5 text-blue-600" />
                Facebook পেজ কানেকশন
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Facebook পেজ নির্বাচন করুন</Label>
                  <Select value={selectedFacebookPage} onValueChange={setSelectedFacebookPage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockFacebookPages.map(page => (
                        <SelectItem key={page.id} value={page.id}>
                          {page.name} {page.connected && "(কানেক্টেড)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Facebook পেজ অ্যাকসেস টোকেন</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="password" 
                      value={mockFacebookPages.find(p => p.id === selectedFacebookPage)?.accessToken || ""} 
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Key className="h-4 w-4 mr-2" />
                          টোকেন আপডেট
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Facebook অ্যাকসেস টোকেন আপডেট</DialogTitle>
                          <DialogDescription>
                            Facebook Developer Dashboard থেকে নতুন অ্যাকসেস টোকেন পেস্ট করুন
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>নতুন অ্যাকসেস টোকেন</Label>
                            <Textarea 
                              placeholder="EAABc..." 
                              className="font-mono text-sm"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">সংরক্ষণ করুন</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="pt-4">
                  <Label className="mb-3 block">ওয়েবহুক ইভেন্টস</Label>
                  <div className="space-y-3">
                    {fbEvents.map(event => (
                      <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{event.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {event.id === "messages" && "মেসেঞ্জার মেসেজ ইভেন্টস"}
                            {event.id === "feed_post" && "পেজে নতুন পোস্ট"}
                            {event.id === "comments" && "পোস্টে নতুন কমেন্ট"}
                            {event.id === "reactions" && "পোস্টে রিয়্যাকশন"}
                          </p>
                        </div>
                        <Switch 
                          checked={event.enabled} 
                          onCheckedChange={() => toggleFbEvent(event.id)} 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full">
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook ওয়েবহুক সেটআপ করুন
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Instagram Tab */}
        <TabsContent value="instagram">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Instagram className="h-5 w-5 text-pink-600" />
                Instagram অ্যাকাউন্ট কানেকশন
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Instagram অ্যাকাউন্ট নির্বাচন করুন</Label>
                  <Select value={selectedInstagramAccount} onValueChange={setSelectedInstagramAccount}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockInstagramAccounts.map(account => (
                        <SelectItem key={account.id} value={account.id}>
                          @{account.name} {account.connected && "(কানেক্টেড)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Instagram অ্যাকসেস টোকেন</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="password" 
                      value={mockInstagramAccounts.find(a => a.id === selectedInstagramAccount)?.accessToken || ""} 
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Key className="h-4 w-4 mr-2" />
                          টোকেন আপডেট
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Instagram অ্যাকসেস টোকেন আপডেট</DialogTitle>
                          <DialogDescription>
                            Instagram Graph API থেকে নতুন অ্যাকসেস টোকেন পেস্ট করুন
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>নতুন অ্যাকসেস টোকেন</Label>
                            <Textarea 
                              placeholder="IGQVJ..." 
                              className="font-mono text-sm"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">সংরক্ষণ করুন</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="pt-4">
                  <Label className="mb-3 block">ওয়েবহুক ইভেন্টস</Label>
                  <div className="space-y-3">
                    {igEvents.map(event => (
                      <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{event.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {event.id === "comments" && "পোস্টে নতুন কমেন্ট"}
                            {event.id === "mentions" && "@মেনশন নোটিফিকেশন"}
                            {event.id === "messages" && "ডাইরেক্ট মেসেজ"}
                            {event.id === "story_mentions" && "স্টোরিতে মেনশন"}
                          </p>
                        </div>
                        <Switch 
                          checked={event.enabled} 
                          onCheckedChange={() => toggleIgEvent(event.id)} 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full">
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram ওয়েবহুক সেটআপ করুন
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-green-600" />
            টেস্ট ডাটা জেনারেটর
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle>টেস্টিং মোড</AlertTitle>
              <AlertDescription>
                টেস্টিং মোড সক্রিয় থাকলে, আপনি নকল ডাটা জেনারেট করতে পারবেন ডেভেলপমেন্টের জন্য
              </AlertDescription>
            </Alert>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">টেস্টিং মোড</p>
                <p className="text-xs text-muted-foreground">
                  টেস্টিং মোড সক্রিয় করুন
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Dialog open={showTestEventDialog} onOpenChange={setShowTestEventDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>টেস্ট ইভেন্ট জেনারেট করুন</DialogTitle>
                  <DialogDescription>
                    ডেভেলপমেন্টের জন্য টেস্ট ইভেন্ট তৈরি করুন
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>ইভেন্ট টাইপ</Label>
                    <Select value={selectedTestEventType} onValueChange={setSelectedTestEventType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facebook_message">Facebook Message</SelectItem>
                        <SelectItem value="facebook_comment">Facebook Comment</SelectItem>
                        <SelectItem value="instagram_comment">Instagram Comment</SelectItem>
                        <SelectItem value="instagram_message">Instagram Direct Message</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    onClick={() => generateTestEvent(selectedTestEventType)}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    ইভেন্ট জেনারেট করুন
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => {
                  setSelectedTestEventType("facebook_message");
                  setShowTestEventDialog(true);
                }}
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                Facebook মেসেজ জেনারেট করুন
              </Button>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => {
                  setSelectedTestEventType("facebook_comment");
                  setShowTestEventDialog(true);
                }}
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                Facebook কমেন্ট জেনারেট করুন
              </Button>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => {
                  setSelectedTestEventType("instagram_comment");
                  setShowTestEventDialog(true);
                }}
              >
                <Instagram className="h-4 w-4 text-pink-600" />
                Instagram কমেন্ট জেনারেট করুন
              </Button>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => {
                  setSelectedTestEventType("instagram_message");
                  setShowTestEventDialog(true);
                }}
              >
                <Instagram className="h-4 w-4 text-pink-600" />
                Instagram DM জেনারেট করুন
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-amber-600" />
            ওয়েবহুক ইভেন্ট লগ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-3 border-b flex items-center justify-between">
                <h3 className="font-medium">সাম্প্রতিক ইভেন্টস</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setRecentEvents(getRecentWebhookEvents(10))}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <div className="divide-y">
                {recentEvents.length > 0 ? (
                  recentEvents.map((event) => (
                    <div key={event.id} className="p-3 hover:bg-muted/50">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {event.source === 'facebook' ? (
                            <Facebook className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Instagram className="h-4 w-4 text-pink-600" />
                          )}
                          <span className="font-medium">
                            {event.type === 'facebook_message' && 'Facebook Message'}
                            {event.type === 'facebook_comment' && 'Facebook Comment'}
                            {event.type === 'instagram_comment' && 'Instagram Comment'}
                            {event.type === 'instagram_message' && 'Instagram DM'}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">{formatTime(event.time)}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "{event.data.text}" - 
                        {event.source === 'facebook' ? (
                          event.data.userName || 'User'
                        ) : (
                          '@' + event.data.username
                        )}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <p>কোন ইভেন্ট নেই</p>
                    <p className="text-sm mt-2">টেস্ট ইভেন্ট জেনারেট করুন</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}