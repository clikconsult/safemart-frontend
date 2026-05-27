import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { ProtectedRoute, AdminRoute, GuestRoute } from "./routes/guards"
import MainLayout from "./components/layout/MainLayout"
import { LoadingPage } from "./components/ui"

const Home = lazy(() => import("./pages/Home"))
const ProductsPage = lazy(() => import("./pages/Products"))
const ProductDetail = lazy(() => import("./pages/Products/Detail"))
const Login = lazy(() => import("./pages/Auth/Login"))
const Register = lazy(() => import("./pages/Auth/Register"))
const Cart = lazy(() => import("./pages/Cart"))
const Checkout = lazy(() => import("./pages/Checkout"))
const PaymentCallback = lazy(() => import("./pages/Checkout/PaymentCallback"))
const Orders = lazy(() => import("./pages/Orders"))
const OrderDetail = lazy(() => import("./pages/Orders/Detail"))
const Wishlist = lazy(() => import("./pages/Wishlist"))
const Profile = lazy(() => import("./pages/Profile"))
const AdminDashboard = lazy(() => import("./pages/Admin/Dashboard"))
const AdminOrders = lazy(() => import("./pages/Admin/Orders"))
const AdminUsers = lazy(() => import("./pages/Admin/Users"))
const AdminProducts = lazy(() => import("./pages/Admin/Products"))
const AdminOrderDetail = lazy(() => import("./pages/Admin/OrderDetail"))
const About = lazy(() => import("./pages/Legal/About"))
const Contact = lazy(() => import("./pages/Legal/Contact"))
const PrivacyPolicy = lazy(() => import("./pages/Legal/PrivacyPolicy"))
const TermsAndConditions = lazy(() => import("./pages/Legal/TermsAndConditions"))
const ReturnPolicy = lazy(() => import("./pages/Legal/ReturnPolicy"))
const ShippingPolicy = lazy(() => import("./pages/Legal/ShippingPolicy"))
const NotFound = lazy(() => import("./pages/NotFound"))

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/payment/callback" element={<PaymentCallback />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/returns" element={<ReturnPolicy />} />
              <Route path="/shipping" element={<ShippingPolicy />} />

              <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:id" element={<OrderDetail />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/products" element={<AdminProducts />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </CartProvider>
    </AuthProvider>
  )
}
