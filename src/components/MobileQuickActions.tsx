import { Home, Search, ShoppingCart, MessageCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function MobileQuickActions() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = 3; // This would come from your cart state

  const actions = [
    { icon: Home, label: "হোম", path: "/", active: location.pathname === "/" },
    { icon: Search, label: "সার্চ", path: "/products", active: location.pathname === "/products" },
    { icon: ShoppingCart, label: "কার্ট", path: "/cart", badge: cartCount, active: false },
    { icon: MessageCircle, label: "চ্যাট", path: "/chat", active: location.pathname === "/chat" },
    { icon: User, label: "প্রোফাইল", path: "/profile", active: location.pathname === "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t shadow-lg z-50 md:hidden">
      <div className="grid grid-cols-5 gap-1 p-2">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={() => navigate(action.path)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors ${
                action.active
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {action.badge && action.badge > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs">
                    {action.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
