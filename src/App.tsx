import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import { StoreThemeProvider } from "./contexts/StoreThemeContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/Products";
import Orders from "./components/pages/Orders";
import Customers from "./components/pages/Customers";
import Marketing from "./components/pages/Marketing";
import ChatAutomation from "./components/pages/ChatAutomation";
import Payments from "./components/pages/Payments";
import Delivery from "./components/pages/Delivery";
import Analytics from "./components/pages/Analytics";
import Settings from "./components/pages/Settings";
import Storefront from "./components/pages/Storefront";
import ProductDetails from "./components/pages/ProductDetails";
import Payment from "./components/pages/Payment";
import OrderConfirmation from "./components/pages/OrderConfirmation";
import LinkInBio from "./components/pages/LinkInBio";
import Home from "./components/home";
import PreviewTest from "./components/pages/PreviewTest";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import AdminUsers from "./components/pages/admin/AdminUsers";
import PaymentGatewayManagement from "./components/pages/admin/PaymentGatewayManagement";
import SupportSystem from "./components/pages/admin/SupportSystem";
import AnalyticsMonitoring from "./components/pages/admin/AnalyticsMonitoring";
import StoreManagement from "./components/pages/admin/StoreManagement";
import TransactionManagement from "./components/pages/admin/TransactionManagement";
import PlatformSettings from "./components/pages/admin/PlatformSettings";
import SocialCommerce from "./components/pages/SocialCommerce";
import AIAssistant from "./components/pages/AIAssistant";
import MobileFeatures from "./components/pages/MobileFeatures";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import OfflinePage from "./components/OfflinePage";
import POS from "./components/pages/POS";
import Inventory from "./components/pages/Inventory";
import Suppliers from "./components/pages/Suppliers";
import Reports from "./components/pages/Reports";
import AIModeratorCRM from "./components/pages/AIModeratorCRM";

// Lazy load storyboards
const ProductDetailsStoryboard = lazy(
  () =>
    import(
      "./tempobook/storyboards/912b88f6-9ce5-4522-b4f3-7e69c91c4d30/index"
    ),
);

function App() {
  return (
    <AuthProvider>
      <StoreThemeProvider>
        <Routes>
          {/* Preview Test Route */}
          <Route path="/preview-test" element={<PreviewTest />} />

          {/* Storyboard Routes */}
          <Route
            path="/tempobook/storyboards/912b88f6-9ce5-4522-b4f3-7e69c91c4d30"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProductDetailsStoryboard />
              </Suspense>
            }
          />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/storefront" element={<Storefront />} />
          <Route path="/link-in-bio" element={<LinkInBio />} />
          <Route path="/store" element={<Storefront />} />
          <Route path="/store/product/:id" element={<ProductDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="marketing" element={<Marketing />} />
            <Route path="chat" element={<ChatAutomation />} />
            <Route path="payments" element={<Payments />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="social-commerce" element={<SocialCommerce />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="mobile-features" element={<MobileFeatures />} />
            <Route path="pos" element={<POS />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="reports" element={<Reports />} />
            <Route path="ai-moderator" element={<AIModeratorCRM />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="payment-gateway" element={<PaymentGatewayManagement />} />
            <Route path="support" element={<SupportSystem />} />
            <Route path="analytics" element={<AnalyticsMonitoring />} />
            <Route path="stores" element={<StoreManagement />} />
            <Route path="transactions" element={<TransactionManagement />} />
            <Route path="settings" element={<PlatformSettings />} />
          </Route>

          {/* Offline Route */}
          <Route path="/offline" element={<OfflinePage />} />
        </Routes>
        <Toaster />
        <PWAInstallPrompt />
      </StoreThemeProvider>
    </AuthProvider>
  );
}

export default App;