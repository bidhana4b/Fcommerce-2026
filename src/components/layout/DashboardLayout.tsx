import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Outlet, Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  CreditCard,
  Truck,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronLeft,
  Bell,
  Search,
  Megaphone,
  Calculator,
  Warehouse,
  Building2,
  FileBarChart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigation = [
  { name: "হোম", name_en: "Dashboard", href: "/dashboard", icon: Home },
  {
    name: "POS",
    name_en: "POS System",
    href: "/dashboard/pos",
    icon: Calculator,
    badge: "নতুন",
  },
  {
    name: "পণ্য",
    name_en: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    name: "ইনভেন্টরি",
    name_en: "Inventory",
    href: "/dashboard/inventory",
    icon: Warehouse,
  },
  {
    name: "সাপ্লায়ার",
    name_en: "Suppliers",
    href: "/dashboard/suppliers",
    icon: Building2,
  },
  {
    name: "অর্ডার",
    name_en: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
    badge: 8,
  },
  {
    name: "কাস্টমার",
    name_en: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    name: "মার্কেটিং",
    name_en: "Marketing",
    href: "/dashboard/marketing",
    icon: Megaphone,
  },
  {
    name: "চ্যাট",
    name_en: "Chat",
    href: "/dashboard/chat",
    icon: MessageSquare,
    badge: 15,
  },
  {
    name: "পেমেন্ট",
    name_en: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    name: "ডেলিভারি",
    name_en: "Delivery",
    href: "/dashboard/delivery",
    icon: Truck,
  },
  {
    name: "রিপোর্ট",
    name_en: "Reports",
    href: "/dashboard/reports",
    icon: FileBarChart,
  },
  {
    name: "এনালিটিক্স",
    name_en: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "সেটিংস",
    name_en: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

// Mobile bottom nav items (3-5 most important)
const mobileNavigation = [
  { name: "হোম", href: "/dashboard", icon: Home },
  { name: "POS", href: "/dashboard/pos", icon: Calculator },
  { name: "অর্ডার", href: "/dashboard/orders", icon: ShoppingCart, badge: 8 },
  { name: "চ্যাট", href: "/dashboard/chat", icon: MessageSquare, badge: 15 },
  { name: "পণ্য", href: "/dashboard/products", icon: Package },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex h-full flex-col bg-card">
      {/* Logo & Brand */}
      <div
        className={cn(
          "flex h-16 items-center border-b px-4",
          sidebarCollapsed && !mobile ? "justify-center" : "justify-between",
        )}
      >
        {(!sidebarCollapsed || mobile) && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold">সোশ্যাল কমার্স</h2>
              <p className="text-xs text-muted-foreground">
                ব্যবসা ম্যানেজমেন্ট
              </p>
            </div>
          </div>
        )}
        {!mobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-8 w-8"
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                sidebarCollapsed && "rotate-180",
              )}
            />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => mobile && setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  sidebarCollapsed && !mobile && "justify-center",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {(!sidebarCollapsed || mobile) && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge
                        variant={active ? "secondary" : "default"}
                        className="h-5 min-w-5 px-1.5"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User Profile */}
      <div
        className={cn(
          "border-t p-4",
          sidebarCollapsed && !mobile ? "flex justify-center" : "",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3",
            sidebarCollapsed && !mobile && "flex-col",
          )}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={
                user?.avatar ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=seller"
              }
            />
            <AvatarFallback>{user?.name?.charAt(0) || "S"}</AvatarFallback>
          </Avatar>
          {(!sidebarCollapsed || mobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.name || "সেলার অ্যাকাউন্ট"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || "seller@example.com"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r transition-all duration-300",
          sidebarCollapsed ? "w-[60px]" : "w-[280px]",
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SidebarContent mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="পণ্য, অর্ডার বা কাস্টমার খুঁজুন..."
                className="pl-8 w-full"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
            </Button>
            <Avatar className="h-8 w-8 lg:hidden">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=seller" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4 lg:p-6 pb-20 lg:pb-6">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-card">
          <div className="flex h-16 items-center justify-around px-2">
            {mobileNavigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 min-w-[64px] relative transition-colors",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <div className="relative">
                    <item.icon className="h-6 w-6" />
                    {item.badge && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-4 min-w-4 px-1 text-[10px] flex items-center justify-center"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
