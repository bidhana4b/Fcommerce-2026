import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, X } from "lucide-react";

interface WhatsAppChatBubbleProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppChatBubble({ 
  phoneNumber = "8801712345678",
  message = "হ্যালো! আমি আপনার পণ্য সম্পর্কে জানতে চাই।"
}: WhatsAppChatBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const openWhatsApp = (customMessage?: string) => {
    const msg = encodeURIComponent(customMessage || message);
    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, "_blank");
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isExpanded && (
          <Card className="w-80 shadow-2xl animate-in slide-in-from-bottom-5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">WhatsApp সাপোর্ট</p>
                    <p className="text-xs text-green-600">● অনলাইন</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setIsExpanded(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">হ্যালো! 👋</p>
                  <p className="text-sm mt-1">কিভাবে সাহায্য করতে পারি?</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  className="w-full justify-start gap-2 bg-green-600 hover:bg-green-700"
                  onClick={() => openWhatsApp("হ্যালো! আমি পণ্য সম্পর্কে জানতে চাই।")}
                >
                  💬 পণ্য সম্পর্কে জিজ্ঞাসা করুন
                </Button>
                <Button 
                  className="w-full justify-start gap-2 bg-green-600 hover:bg-green-700"
                  onClick={() => openWhatsApp("আমার অর্ডার ট্র্যাক করতে চাই।")}
                >
                  📦 অর্ডার ট্র্যাক করুন
                </Button>
                <Button 
                  className="w-full justify-start gap-2 bg-green-600 hover:bg-green-700"
                  onClick={() => openWhatsApp("আমি সাহায্য চাই।")}
                >
                  🆘 সাহায্য চান
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Button
          size="lg"
          className="h-16 w-16 rounded-full shadow-2xl bg-green-600 hover:bg-green-700 animate-bounce"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>
    </>
  );
}
