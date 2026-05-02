import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { ProtectedRoute, AdminRoute, GuestRoute } from "./routes/guards"
import MainLayout from "./components/layout/MainLayout"

import Home            from "./pages/Home"
import ProductsPage    from "./pages/Products"
import ProductDetail   from "./pages/Products/Detail"
import Login           from "./pages/Auth/Login"
import Register        from "./pages/Auth/Register"
import Cart            from "./pages/Cart"
import Checkout        from "./pages/Checkout"
import PaymentCallback from "./pages/Checkout/PaymentCallback"
import Orders          from "./pages/Orders"
import OrderDetail     from "./pages/Orders/Detail"
import Wishlist        from "./pages/Wishlist"
import Profile         from "./pages/Profile"
import AdminDashboard  from "./pages/Admin/Dashboard"
import AdminOrders     from "./pages/Admin/Orders"
import AdminUsers      from "./pages/Admin/Users"
import AdminProducts   from "./pages/Admin/Products"
import AdminOrderDetail from "./pages/Admin/OrderDetail"
import About           from "./pages/Legal/About"
import Contact         from "./pages/Legal/Contact"
import PrivacyPolicy   from "./pages/Legal/PrivacyPolicy"
import TermsAndConditions from "./pages/Legal/TermsAndConditions"
import ReturnPolicy    from "./pages/Legal/ReturnPolicy"
import ShippingPolicy  from "./pages/Legal/ShippingPolicy"
import NotFound        from "./pages/NotFound"

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Public */}
            <Route path="/"                 element={<Home />} />
            <Route path="/products"         element={<ProductsPage />} />
            <Route path="/products/:id"     element={<ProductDetail />} />
            <Route path="/wishlist"         element={<Wishlist />} />
            <Route path="/payment/callback" element={<PaymentCallback />} />
            <Route path="/about"            element={<About />} />
            <Route path="/contact"          element={<Contact />} />
            <Route path="/privacy-policy"   element={<PrivacyPolicy />} />
            <Route path="/terms"            element={<TermsAndConditions />} />
            <Route path="/returns"          element={<ReturnPolicy />} />
            <Route path="/shipping"         element={<ShippingPolicy />} />

            {/* Guest only */}
            <Route element={<GuestRoute />}>
              <Route path="/login"    element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Authenticated */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cart"       element={<Cart />} />
              <Route path="/checkout"   element={<Checkout />} />
              <Route path="/orders"     element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/profile"    element={<Profile />} />
            </Route>

            {/* Admin */}
            <Route element={<AdminRoute />}>
              <Route path="/admin"          element={<AdminDashboard />} />
              <Route path="/admin/orders"   element={<AdminOrders />} />
              <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />
              <Route path="/admin/users"    element={<AdminUsers />} />
              <Route path="/admin/products" element={<AdminProducts />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}

