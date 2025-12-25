import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Users,
  Store,
  DollarSign,
  Settings,
  Menu,
  ChevronLeft,
  Bell,
  Search,
  Shield,
  BarChart3,
  FileText,
  Headphones,
  CreditCard,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const adminNavigation = [
  { name: "ড্যাশবোর্ড", name_en: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    name: "ব্যবহারকারী",
    name_en: "Users",
    href: "/admin/users",
    icon: Users,
    badge: 125,
  },
  {
    name: "স্টোর",
    name_en: "Stores",
    href: "/admin/stores",
    icon: Store,
  },
  {
    name: "লেনদেন",
    name_en: "Transactions",
    href: "/admin/transactions",
    icon: DollarSign,
  },
  {
    name: "পেমেন্ট গেটওয়ে",
    name_en: "Payment Gateway",
    href: "/admin/payment-gateway",
    icon: CreditCard,
  },
  {
    name: "সাপোর্ট",
    name_en: "Support",
    href: "/admin/support",
    icon: Headphones,
    badge: 8,
  },
  {
    name: "অ্যানালিটিক্স",
    name_en: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "সেটিংস",
    name_en: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

const mobileAdminNavigation = [
  { name: "হোম", href: "/admin", icon: LayoutDashboard },
  { name: "ব্যবহারকারী", href: "/admin/users", icon: Users, badge: 125 },
  { name: "স্টোর", href: "/admin/stores", icon: Store },
  { name: "লেনদেন", href: "/admin/transactions", icon: DollarSign },
  { name: "সাপোর্ট", href: "/admin/support", icon: Headphones, badge: 8 },
];

export default function AdminLayout() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Redirect if not admin
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  const isActive = (href: string) => {
    if (href === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(href);
  };

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex h-full flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Logo & Brand */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-slate-700 px-4",
          sidebarCollapsed && !mobile ? "justify-center" : "justify-between",
        )}
      >
        {(!sidebarCollapsed || mobile) && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">অ্যাডমিন প্যানেল</h2>
              <p className="text-xs text-slate-400">প্ল্যাটফর্ম ম্যানেজমেন্ট</p>
            </div>
          </motion.div>
        )}
        {!mobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-8 w-8 text-white hover:bg-slate-700"
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
          {adminNavigation.map((item, index) => {
            const active = isActive(item.href);
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.href}
                  onClick={() => mobile && setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    active
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white",
                    sidebarCollapsed && !mobile && "justify-center",
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {(!sidebarCollapsed || mobile) && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge
                          variant={active ? "secondary" : "outline"}
                          className={cn(
                            "h-5 min-w-5 px-1.5",
                            active
                              ? "bg-white text-purple-600"
                              : "bg-slate-700 text-white border-slate-600",
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Admin Profile */}
      <div
        className={cn(
          "border-t border-slate-700 p-4",
          sidebarCollapsed && !mobile ? "flex justify-center" : "",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3",
            sidebarCollapsed && !mobile && "flex-col",
          )}
        >
          <Avatar className="h-10 w-10 ring-2 ring-purple-500">
            <AvatarImage
              src={
                user?.avatar ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
              }
            />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500">
              {user?.name?.charAt(0) || "A"}
            </AvatarFallback>
          </Avatar>
          {(!sidebarCollapsed || mobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.name || "অ্যাডমিন"}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user?.email || "admin@example.com"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col transition-all duration-300 shadow-xl",
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
        <header className="flex h-16 items-center gap-4 border-b bg-white dark:bg-slate-900 px-4 lg:px-6 shadow-sm">
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
                placeholder="ব্যবহারকারী, স্টোর বা লেনদেন খুঁজুন..."
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
            <Avatar className="h-8 w-8 lg:hidden ring-2 ring-purple-500">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
          <div className="container mx-auto p-4 lg:p-6 pb-20 lg:pb-6">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-white dark:bg-slate-900 shadow-lg">
          <div className="flex h-16 items-center justify-around px-2">
            {mobileAdminNavigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 min-w-[64px] relative transition-colors",
                    active ? "text-purple-600" : "text-muted-foreground",
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