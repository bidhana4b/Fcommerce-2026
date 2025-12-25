import { useState, useEffect, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Download,
  Smartphone,
  Monitor,
  Wifi,
  WifiOff,
  Zap,
  Bell,
  X,
  CheckCircle2,
  Rocket,
  Shield,
  Clock,
  Chrome,
  Apple,
  Share2,
  MoreVertical,
} from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Create a context to share PWA state across components
interface PWAContextType {
  deferredPrompt: BeforeInstallPromptEvent | null;
  isInstalled: boolean;
  isOnline: boolean;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browserType: 'chrome' | 'safari' | 'firefox' | 'edge' | 'other';
  canInstall: boolean;
  triggerInstall: () => Promise<void>;
  showInstallDialog: boolean;
  setShowInstallDialog: (show: boolean) => void;
}

const PWAContext = createContext<PWAContextType | null>(null);

export const usePWA = () => {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error("usePWA must be used within PWAProvider");
  }
  return context;
};

// Detect device type
const getDeviceType = (): 'desktop' | 'mobile' | 'tablet' => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

// Detect browser type
const getBrowserType = (): 'chrome' | 'safari' | 'firefox' | 'edge' | 'other' => {
  const ua = navigator.userAgent;
  if (ua.includes('Edg/')) return 'edge';
  if (ua.includes('Chrome') && !ua.includes('Edg/')) return 'chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'safari';
  if (ua.includes('Firefox')) return 'firefox';
  return 'other';
};

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallDialog, setShowInstallDialog] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installOutcome, setInstallOutcome] = useState<"accepted" | "dismissed" | null>(null);
  const [deviceType] = useState(getDeviceType());
  const [browserType] = useState(getBrowserType());

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      localStorage.setItem("pwa-installed", "true");
      return;
    }

    // Check localStorage for installation status
    const wasInstalled = localStorage.getItem("pwa-installed");
    if (wasInstalled === "true") {
      // User might have uninstalled, reset
      localStorage.removeItem("pwa-installed");
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show banner after 3 seconds if not dismissed before
      const dismissed = localStorage.getItem("pwa-banner-dismissed");
      if (!dismissed) {
        setTimeout(() => setShowBanner(true), 3000);
      }
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowBanner(false);
      setShowInstallDialog(false);
      localStorage.setItem("pwa-installed", "true");
    };

    // Listen for online/offline
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Show banner after 3 seconds even without beforeinstallprompt event
    // This ensures users always see the install option
    const dismissed = localStorage.getItem("pwa-banner-dismissed");
    if (!dismissed) {
      setTimeout(() => setShowBanner(true), 3000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setInstallOutcome(outcome);
      
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setShowBanner(false);
        localStorage.setItem("pwa-installed", "true");
      }
    } catch (error) {
      console.error("Install error:", error);
    }
  };

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem("pwa-banner-dismissed", "true");
  };

  const features = [
    {
      icon: Zap,
      title: "দ্রুত লোডিং",
      description: "ক্যাশড অ্যাসেট দিয়ে তাৎক্ষণিক স্টার্টআপ",
    },
    {
      icon: WifiOff,
      title: "অফলাইন মোড",
      description: "ইন্টারনেট ছাড়াও অর্ডার নিন",
    },
    {
      icon: Bell,
      title: "পুশ নোটিফিকেশন",
      description: "অর্ডার ও স্টক আপডেট পান",
    },
    {
      icon: Shield,
      title: "নিরাপদ",
      description: "HTTPS এনক্রিপ্টেড সংযোগ",
    },
  ];

  // Get manual install instructions based on browser/device
  const getManualInstallInstructions = () => {
    if (browserType === 'safari' && (deviceType === 'mobile' || deviceType === 'tablet')) {
      return {
        icon: Share2,
        title: "iOS Safari এ ইনস্টল করুন",
        steps: [
          "নিচের Share বাটনে ট্যাপ করুন",
          "'Add to Home Screen' সিলেক্ট করুন",
          "'Add' বাটনে ট্যাপ করুন"
        ]
      };
    }
    if (browserType === 'chrome') {
      return {
        icon: Chrome,
        title: "Chrome এ ইনস্টল করুন",
        steps: [
          "অ্যাড্রেস বারের ডানে ইনস্টল আইকনে ক্লিক করুন",
          "অথবা মেনু (⋮) থেকে 'Install app' সিলেক্ট করুন",
          "'Install' বাটনে ক্লিক করুন"
        ]
      };
    }
    if (browserType === 'edge') {
      return {
        icon: Monitor,
        title: "Edge এ ইনস্টল করুন",
        steps: [
          "অ্যাড্রেস বারের ডানে ইনস্টল আইকনে ক্লিক করুন",
          "অথবা মেনু (⋯) থেকে 'Apps' > 'Install this site as an app'",
          "'Install' বাটনে ক্লিক করুন"
        ]
      };
    }
    return {
      icon: MoreVertical,
      title: "ম্যানুয়ালি ইনস্টল করুন",
      steps: [
        "ব্রাউজার মেনু খুলুন",
        "'Install' বা 'Add to Home Screen' অপশন খুঁজুন",
        "ইনস্টল কনফার্ম করুন"
      ]
    };
  };

  const manualInstructions = getManualInstallInstructions();

  // Don't show anything if already installed
  if (isInstalled) return null;

  return (
    <>
      {/* Floating Install Banner - shows even without native prompt */}
      {showBanner && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <Card className="shadow-2xl border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Download className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">OpenPOS ইনস্টল করুন</h3>
                    <Badge variant="secondary" className="text-xs">নতুন</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    ডেস্কটপ অ্যাপের মতো ব্যবহার করুন - দ্রুত, অফলাইন সাপোর্ট সহ
                  </p>
                  <div className="flex gap-2">
                    {deferredPrompt ? (
                      <Button size="sm" onClick={handleInstall} className="gap-1.5">
                        <Download className="h-3.5 w-3.5" />
                        ইনস্টল
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => setShowInstallDialog(true)} className="gap-1.5">
                        <Download className="h-3.5 w-3.5" />
                        ইনস্টল করুন
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => setShowInstallDialog(true)}>
                      বিস্তারিত
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 flex-shrink-0"
                  onClick={dismissBanner}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Online/Offline Indicator */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-yellow-950 py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-2">
          <WifiOff className="h-4 w-4" />
          অফলাইন মোডে আছেন - কিছু ফিচার সীমিত থাকতে পারে
        </div>
      )}

      {/* Install Dialog */}
      <Dialog open={showInstallDialog} onOpenChange={setShowInstallDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="block">OpenPOS ইনস্টল করুন</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Progressive Web App
                </span>
              </div>
            </DialogTitle>
            <DialogDescription>
              আপনার ডেস্কটপে নেটিভ অ্যাপের মতো অভিজ্ঞতা পান
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-muted/50 border border-border/50"
                  >
                    <Icon className="h-5 w-5 text-primary mb-2" />
                    <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Device Support */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                সমর্থিত ডিভাইস
              </h4>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                  <span>ডেস্কটপ</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <span>মোবাইল</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">কেন ইনস্টল করবেন?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  ব্রাউজার ছাড়াই সরাসরি অ্যাক্সেস
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  ইন্টারনেট ছাড়াও কাজ করে
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  দ্রুত লোডিং ও স্মুথ পারফরম্যান্স
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  রিয়েল-টাইম নোটিফিকেশন
                </li>
              </ul>
            </div>

            {/* Install Button */}
            <div className="flex gap-3">
              {deferredPrompt ? (
                <Button
                  className="flex-1 gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={handleInstall}
                >
                  <Download className="h-4 w-4" />
                  এখনই ইনস্টল করুন
                </Button>
              ) : (
                <div className="flex-1 p-4 bg-muted/50 rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <manualInstructions.icon className="h-5 w-5 text-primary" />
                    <span className="font-medium text-sm">{manualInstructions.title}</span>
                  </div>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    {manualInstructions.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              <Button variant="outline" onClick={() => setShowInstallDialog(false)}>
                পরে
              </Button>
            </div>

            {installOutcome === "dismissed" && (
              <p className="text-xs text-center text-muted-foreground">
                আপনি যেকোনো সময় সেটিংস থেকে ইনস্টল করতে পারবেন
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Download Button - Always visible when not installed */}
      {!showBanner && (
        <div className="fixed bottom-20 right-4 z-40">
          <Button
            onClick={() => setShowInstallDialog(true)}
            className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-0"
          >
            <Download className="h-6 w-6" />
          </Button>
        </div>
      )}
    </>
  );
}

// Export a button component for use in settings/header
export function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showManualDialog, setShowManualDialog] = useState(false);
  const [deviceType] = useState(getDeviceType());
  const [browserType] = useState(getBrowserType());

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else {
      // Show manual instructions dialog
      setShowManualDialog(true);
    }
  };

  // Get manual install instructions based on browser/device
  const getManualInstallInstructions = () => {
    if (browserType === 'safari' && (deviceType === 'mobile' || deviceType === 'tablet')) {
      return {
        icon: Share2,
        title: "iOS Safari এ ইনস্টল করুন",
        steps: [
          "নিচের Share বাটনে ট্যাপ করুন",
          "'Add to Home Screen' সিলেক্ট করুন",
          "'Add' বাটনে ট্যাপ করুন"
        ]
      };
    }
    if (browserType === 'chrome') {
      return {
        icon: Chrome,
        title: "Chrome এ ইনস্টল করুন",
        steps: [
          "অ্যাড্রেস বারের ডানে ইনস্টল আইকনে ক্লিক করুন",
          "অথবা মেনু (⋮) থেকে 'Install app' সিলেক্ট করুন",
          "'Install' বাটনে ক্লিক করুন"
        ]
      };
    }
    if (browserType === 'edge') {
      return {
        icon: Monitor,
        title: "Edge এ ইনস্টল করুন",
        steps: [
          "অ্যাড্রেস বারের ডানে ইনস্টল আইকনে ক্লিক করুন",
          "অথবা মেনু (⋯) থেকে 'Apps' > 'Install this site as an app'",
          "'Install' বাটনে ক্লিক করুন"
        ]
      };
    }
    return {
      icon: MoreVertical,
      title: "ম্যানুয়ালি ইনস্টল করুন",
      steps: [
        "ব্রাউজার মেনু খুলুন",
        "'Install' বা 'Add to Home Screen' অপশন খুঁজুন",
        "ইনস্টল কনফার্ম করুন"
      ]
    };
  };

  const manualInstructions = getManualInstallInstructions();

  if (isInstalled) {
    return (
      <Button variant="outline" disabled className="gap-2">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        ইনস্টল করা আছে
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={handleInstall}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        অ্যাপ ইনস্টল করুন
      </Button>

      {/* Manual Install Dialog */}
      <Dialog open={showManualDialog} onOpenChange={setShowManualDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <manualInstructions.icon className="h-5 w-5 text-primary" />
              {manualInstructions.title}
            </DialogTitle>
            <DialogDescription>
              নিচের ধাপগুলো অনুসরণ করুন
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <ol className="space-y-4">
              {manualInstructions.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 h-7 w-7 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">
                    {idx + 1}
                  </span>
                  <span className="text-sm pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <Button onClick={() => setShowManualDialog(false)} className="w-full">
            বুঝেছি
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Enhanced PWA Status Component for Settings page
export function PWAStatusCard() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deviceType] = useState(getDeviceType());
  const [browserType] = useState(getBrowserType());
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showManualDialog, setShowManualDialog] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setIsInstalled(true);
      }
    } else {
      setShowManualDialog(true);
    }
  };

  const getDeviceIcon = () => {
    if (deviceType === 'mobile') return Smartphone;
    if (deviceType === 'tablet') return Smartphone;
    return Monitor;
  };

  const getBrowserIcon = () => {
    if (browserType === 'chrome') return Chrome;
    if (browserType === 'safari') return Apple;
    return Monitor;
  };

  const DeviceIcon = getDeviceIcon();
  const BrowserIcon = getBrowserIcon();

  // Get manual install instructions
  const getManualInstallInstructions = () => {
    if (browserType === 'safari' && (deviceType === 'mobile' || deviceType === 'tablet')) {
      return {
        icon: Share2,
        title: "iOS Safari এ ইনস্টল করুন",
        steps: [
          "নিচের Share বাটনে ট্যাপ করুন",
          "'Add to Home Screen' সিলেক্ট করুন",
          "'Add' বাটনে ট্যাপ করুন"
        ]
      };
    }
    if (browserType === 'chrome') {
      return {
        icon: Chrome,
        title: "Chrome এ ইনস্টল করুন",
        steps: [
          "অ্যাড্রেস বারের ডানে ইনস্টল আইকনে ক্লিক করুন",
          "অথবা মেনু (⋮) থেকে 'Install app' সিলেক্ট করুন",
          "'Install' বাটনে ক্লিক করুন"
        ]
      };
    }
    if (browserType === 'edge') {
      return {
        icon: Monitor,
        title: "Edge এ ইনস্টল করুন",
        steps: [
          "অ্যাড্রেস বারের ডানে ইনস্টল আইকনে ক্লিক করুন",
          "অথবা মেনু (⋯) থেকে 'Apps' > 'Install this site as an app'",
          "'Install' বাটনে ক্লিক করুন"
        ]
      };
    }
    return {
      icon: MoreVertical,
      title: "ম্যানুয়ালি ইনস্টল করুন",
      steps: [
        "ব্রাউজার মেনু খুলুন",
        "'Install' বা 'Add to Home Screen' অপশন খুঁজুন",
        "ইনস্টল কনফার্ম করুন"
      ]
    };
  };

  const manualInstructions = getManualInstallInstructions();

  return (
    <>
      <Card className="shadow-soft border-primary/20">
        <CardContent className="p-6 space-y-6">
          {/* Device & Browser Info */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <DeviceIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">
                  {deviceType === 'desktop' ? 'ডেস্কটপ' : deviceType === 'mobile' ? 'মোবাইল' : 'ট্যাবলেট'}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <BrowserIcon className="h-3 w-3" />
                  {browserType === 'chrome' ? 'Chrome' : browserType === 'safari' ? 'Safari' : browserType === 'edge' ? 'Edge' : browserType === 'firefox' ? 'Firefox' : 'Browser'}
                </p>
              </div>
            </div>
            <Badge variant={isOnline ? "default" : "destructive"}>
              {isOnline ? (
                <><Wifi className="h-3 w-3 mr-1" /> অনলাইন</>
              ) : (
                <><WifiOff className="h-3 w-3 mr-1" /> অফলাইন</>
              )}
            </Badge>
          </div>

          {/* Installation Status */}
          <div className={`p-4 rounded-lg border-2 ${
            isInstalled 
              ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
              : 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              {isInstalled ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-100">অ্যাপ ইনস্টল করা আছে ✓</p>
                    <p className="text-sm text-muted-foreground">
                      আপনি {deviceType === 'desktop' ? 'ডেস্কটপ' : 'মোবাইল'} অ্যাপ ব্যবহার করছেন
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Download className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-yellow-900 dark:text-yellow-100">অ্যাপ ইনস্টল করুন</p>
                    <p className="text-sm text-muted-foreground">
                      {deviceType === 'desktop' ? 'ডেস্কটপে' : 'মোবাইলে'} নেটিভ অ্যাপের মতো ব্যবহার করুন
                    </p>
                  </div>
                </>
              )}
            </div>
            
            {!isInstalled && (
              <Button 
                onClick={handleInstall}
                className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Download className="h-4 w-4" />
                {deferredPrompt ? 'এখনই ইনস্টল করুন' : 'ইনস্টল নির্দেশনা দেখুন'}
              </Button>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <Zap className="h-4 w-4 text-primary mb-2" />
              <p className="text-sm font-medium">দ্রুত লোডিং</p>
              <p className="text-xs text-muted-foreground">তাৎক্ষণিক স্টার্টআপ</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <WifiOff className="h-4 w-4 text-primary mb-2" />
              <p className="text-sm font-medium">অফলাইন মোড</p>
              <p className="text-xs text-muted-foreground">নেট ছাড়াও কাজ করে</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <Bell className="h-4 w-4 text-primary mb-2" />
              <p className="text-sm font-medium">নোটিফিকেশন</p>
              <p className="text-xs text-muted-foreground">রিয়েল-টাইম আপডেট</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <Shield className="h-4 w-4 text-primary mb-2" />
              <p className="text-sm font-medium">নিরাপদ</p>
              <p className="text-xs text-muted-foreground">এনক্রিপ্টেড সংযোগ</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manual Install Dialog */}
      <Dialog open={showManualDialog} onOpenChange={setShowManualDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <manualInstructions.icon className="h-5 w-5 text-primary" />
              {manualInstructions.title}
            </DialogTitle>
            <DialogDescription>
              নিচের ধাপগুলো অনুসরণ করুন
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <ol className="space-y-4">
              {manualInstructions.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 h-7 w-7 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">
                    {idx + 1}
                  </span>
                  <span className="text-sm pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <Button onClick={() => setShowManualDialog(false)} className="w-full">
            বুঝেছি
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
