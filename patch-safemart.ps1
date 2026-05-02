# Safemart full src patch — run from safemart-frontend folder
$base = "src"

# ── App.jsx ──
Set-Content -Path "$base\App.jsx" -Encoding UTF8 -Value @'
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

'@

# ── index.css ──
Set-Content -Path "$base\index.css" -Encoding UTF8 -Value @'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
  body {
    background-color: #f9f9fb;
    color: #1a1c1d;
    font-family: "Inter", sans-serif;
    min-height: 100vh;
    font-size: 15px;
    line-height: 1.6;
  }
  ::selection { background-color: #3b3b3b; color: #ffffff; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #c6c6c6; }
}

@layer components {

  /* ── Floating pill navbar ── */
  .glass-nav {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background-color: rgba(249,249,251,0.85);
    box-shadow: 0 8px 30px rgba(0,0,0,0.04);
  }

  /* ── Ghost border (felt not seen) ── */
  .ghost-border {
    outline: 1px solid rgba(198,198,198,0.15);
  }

  /* ── Buttons ── */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #000000 0%, #3b3b3b 100%);
    color: #e2e2e2;
    font-family: "Manrope", sans-serif;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 1rem 2.5rem;
    border-radius: 0.125rem;
    transition: opacity 0.2s ease, transform 0.15s ease;
    text-decoration: none;
    cursor: pointer;
    border: none;
  }
  .btn-primary:hover { opacity: 0.88; }
  .btn-primary:active { transform: scale(0.97); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: #e2e2e4;
    color: #1a1c1d;
    font-family: "Manrope", sans-serif;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 1rem 2.5rem;
    border-radius: 0.125rem;
    transition: background-color 0.2s ease, transform 0.15s ease;
    text-decoration: none;
    cursor: pointer;
    border: none;
  }
  .btn-secondary:hover { background-color: #d9dadc; }
  .btn-secondary:active { transform: scale(0.97); }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: transparent;
    color: #1a1c1d;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.875rem 2rem;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    transition: border-color 0.2s ease;
    text-decoration: none;
    cursor: pointer;
    border-top: none;
    border-left: none;
    border-right: none;
  }
  .btn-ghost:hover { border-bottom-color: #000000; }

  /* ── Inputs ── */
  .input-field {
    width: 100%;
    padding: 0.875rem 1.25rem;
    font-size: 0.875rem;
    font-family: "Inter", sans-serif;
    background-color: #e8e8ea;
    color: #1a1c1d;
    border: none;
    border-radius: 0.125rem;
    outline: none;
    transition: background-color 0.2s ease, outline 0.2s ease;
    display: block;
  }
  .input-field::placeholder { color: #777777; }
  .input-field:focus {
    background-color: #ffffff;
    outline: 1px solid rgba(198,198,198,0.3);
  }

  /* ── Typography ── */
  .label-overline {
    font-family: "Inter", sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #474747;
  }

  .headline-display {
    font-family: "Manrope", sans-serif;
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -0.03em;
  }

  .headline-lg {
    font-family: "Manrope", sans-serif;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  .headline-md {
    font-family: "Manrope", sans-serif;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.2;
  }

  /* ── Asymmetric grid ── */
  .asymmetric-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1.5rem;
  }

  /* ── Product card ── */
  .product-card {
    background-color: #ffffff;
    border-radius: 0.375rem;
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease;
  }
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px -8px rgba(26,28,29,0.1);
  }

  /* ── Surface layers ── */
  .surface-base     { background-color: #f9f9fb; }
  .surface-low      { background-color: #f3f3f5; }
  .surface-mid      { background-color: #eeeef0; }
  .surface-high     { background-color: #e8e8ea; }
  .surface-highest  { background-color: #e2e2e4; }
  .surface-white    { background-color: #ffffff; }

  /* ── Price ── */
  .price-text {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  /* ── Badge ── */
  .status-badge {
    display: inline-flex;
    align-items: center;
    font-size: 9px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.25rem 0.6rem;
    border-radius: 0.125rem;
  }

  /* ── Section spacing ── */
  .section-xl { padding-top: 6rem; padding-bottom: 6rem; }
  .section-lg { padding-top: 4rem; padding-bottom: 4rem; }
  .container-main {
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: 768px) {
    .container-main { padding-left: 2.5rem; padding-right: 2.5rem; }
  }
}

@layer utilities {
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .tracking-editorial { letter-spacing: 0.35em; }
  .tracking-wide-xl   { letter-spacing: 0.25em; }
}

/* ── Animations ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes slideInLeft {
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.anim-fade-up     { animation: fadeUp 0.6s cubic-bezier(0.25,0.46,0.45,0.94) both; }
.anim-fade-in     { animation: fadeIn 0.4s ease both; }
.anim-slide-left  { animation: slideInLeft 0.4s cubic-bezier(0.25,0.46,0.45,0.94) both; }
.anim-shimmer     { background: linear-gradient(90deg,#eeeef0 25%,#f3f3f5 50%,#eeeef0 75%); background-size: 200% 100%; animation: shimmer 2s infinite; }

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
.delay-5 { animation-delay: 0.5s; }

'@

# ── main.jsx ──
Set-Content -Path "$base\main.jsx" -Encoding UTF8 -Value @'
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import App from "./App.jsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            background: "#1a1c1d",
            color: "#f0f0f2",
            borderRadius: "0.125rem",
            padding: "12px 16px",
            boxShadow: "0 8px 40px -5px rgba(26,28,29,0.20)",
          },
          success: { iconTheme: { primary: "#857159", secondary: "#f0f0f2" } },
          error:   { iconTheme: { primary: "#ba1a1a", secondary: "#f0f0f2" } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)

'@

# ── api/client.js ──
Set-Content -Path "$base\api\client.js" -Encoding UTF8 -Value @'
import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
})

// Attach token from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = ``Bearer ${token}``
  return config
})

// Handle 401 globally — redirect to login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

'@

# ── api/services.js ──
Set-Content -Path "$base\api\services.js" -Encoding UTF8 -Value @'
import api from './client'

// ── Auth ──────────────────────────────────────────────
export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login:    (data) => api.post('/auth/login', data),
  logout:   ()     => api.post('/auth/logout'),
  me:       ()     => api.get('/auth/me'),
}

// ── Products ──────────────────────────────────────────
export const productsApi = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id)    => api.get(``/products/${id}``),
  getFeatured: ()  => api.get('/products/featured'),
  addReview: (id, data) => api.post(``/products/${id}/reviews``, data),
  // Admin
  create: (data)      => api.post('/products', data),
  update: (id, data)  => api.put(``/products/${id}``, data),
  remove: (id)        => api.delete(``/products/${id}``),
}

// ── Cart ──────────────────────────────────────────────
export const cartApi = {
  get:        ()               => api.get('/cart'),
  add:        (data)           => api.post('/cart', data),
  update:     (productId, qty) => api.put(``/cart/${productId}``, { quantity: qty }),
  remove:     (productId)      => api.delete(``/cart/${productId}``),
  clear:      ()               => api.delete('/cart/clear'),
}

// ── Orders ────────────────────────────────────────────
export const ordersApi = {
  create:     (data)   => api.post('/orders', data),
  getMyOrders: ()      => api.get('/orders/my-orders'),
  getById:    (id)     => api.get(``/orders/${id}``),
  cancel:     (id, reason) => api.put(``/orders/${id}/cancel``, { reason }),
  // Admin
  getAll:     (params) => api.get('/orders', { params }),
  updateStatus: (id, data) => api.put(``/orders/${id}/status``, data),
}

// ── Payment ───────────────────────────────────────────
export const paymentApi = {
  initialize: (orderId) => api.post('/payment/initialize', { orderId }),
  verify:     (reference) => api.get(``/payment/verify/${reference}``),
}

// ── Upload ────────────────────────────────────────────
export const uploadApi = {
  productImages: (formData) =>
    api.post('/upload/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteImage: (publicId) => api.delete('/upload/products', { data: { publicId } }),
  avatar: (formData) =>
    api.post('/upload/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
}

// ── Admin ─────────────────────────────────────────────
export const adminApi = {
  getUsers:      (params) => api.get('/admin/users', { params }),
  getUserById:   (id)     => api.get(``/admin/users/${id}``),
  toggleStatus:  (id)     => api.put(``/admin/users/${id}/toggle-status``),
  changeRole:    (id, role) => api.put(``/admin/users/${id}/role``, { role }),
  getAnalytics:  ()       => api.get('/admin/analytics'),
}

'@

# ── components/layout/Footer.jsx ──
Set-Content -Path "$base\components\layout\Footer.jsx" -Encoding UTF8 -Value @'
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-surface-container-low py-20 px-6 md:px-10">
      <div className="container-main">
        <div className="flex flex-col md:flex-row justify-between items-start gap-14 mb-16">

          {/* Brand */}
          <div className="max-w-xs space-y-5">
            <h4 className="font-headline font-black text-lg tracking-[0.2em] uppercase text-on-surface">SAFEMART</h4>
            <p className="font-body text-secondary text-sm leading-relaxed">
              A curated collection of premium electronic security systems. We believe protection should be as refined as the spaces it guards.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-16">
            <div className="space-y-4">
              <h5 className="font-label font-bold text-[10px] uppercase tracking-[0.3em] text-on-surface">Shop</h5>
              <ul className="space-y-3">
                {[["All Products","/products"],["Collections","/products?isFeatured=true"],["New Arrivals","/products?sort=-createdAt"],["CCTV","/products?category=CCTV"],["Alarms","/products?category=Alarms"]].map(([l,to]) => (
                  <li key={to}><Link to={to} className="font-body text-sm text-secondary hover:text-on-surface underline underline-offset-2 decoration-outline-variant hover:decoration-on-surface transition-colors opacity-80 hover:opacity-100">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-label font-bold text-[10px] uppercase tracking-[0.3em] text-on-surface">Account</h5>
              <ul className="space-y-3">
                {[["Sign In","/login"],["Register","/register"],["Orders","/orders"],["Wishlist","/wishlist"],["Profile","/profile"]].map(([l,to]) => (
                  <li key={to}><Link to={to} className="font-body text-sm text-secondary hover:text-on-surface underline underline-offset-2 decoration-outline-variant hover:decoration-on-surface transition-colors opacity-80 hover:opacity-100">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-label font-bold text-[10px] uppercase tracking-[0.3em] text-on-surface">Support</h5>
              <ul className="space-y-3">
                {[["Contact Us","#"],["Installation Guide","#"],["Warranty","#"],["Returns","#"]].map(([l,to]) => (
                  <li key={l}><a href={to} className="font-body text-sm text-secondary hover:text-on-surface underline underline-offset-2 decoration-outline-variant hover:decoration-on-surface transition-colors opacity-80 hover:opacity-100">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-label text-[11px] text-secondary uppercase tracking-wider">© {new Date().getFullYear()} SAFEMART. ALL RIGHTS RESERVED.</p>
          <p className="font-body text-[11px] text-secondary italic">Designed with intentionality.</p>
        </div>
      </div>
    </footer>
  )
}

'@

# ── components/layout/MainLayout.jsx ──
Set-Content -Path "$base\components\layout\MainLayout.jsx" -Encoding UTF8 -Value @'
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface font-body">
      <Navbar />
      <main className="flex-1 pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

'@

# ── components/layout/Navbar.jsx ──
Set-Content -Path "$base\components\layout\Navbar.jsx" -Encoding UTF8 -Value @'
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useCart } from "../../context/CartContext"
import { useWishlist } from "../../hooks/useWishlist"
import { productsApi } from "../../api/services"
import toast from "react-hot-toast"

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth()
  const { cart } = useCart()
  const { count: wishCount } = useWishlist()
  const navigate = useNavigate()

  const [drawerOpen, setDrawerOpen]   = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults]         = useState([])
  const [searching, setSearching]     = useState(false)
  const searchRef    = useRef(null)
  const searchTimer  = useRef(null)

  useEffect(() => { if (searchOpen) searchRef.current?.focus() }, [searchOpen])

  const handleSearch = (val) => {
    setSearchQuery(val)
    clearTimeout(searchTimer.current)
    if (!val.trim()) { setResults([]); return }
    setSearching(true)
    searchTimer.current = setTimeout(async () => {
      try {
        const res = await productsApi.getAll({ search: val, limit: 5 })
        setResults(res.data.data)
      } catch {}
      finally { setSearching(false) }
    }, 300)
  }

  const closeSearch = () => { setSearchOpen(false); setSearchQuery(""); setResults([]) }

  const handleLogout = async () => {
    await logout()
    toast.success("Signed out")
    navigate("/")
    setDrawerOpen(false)
  }

  const itemCount = cart?.totalItems || 0

  const drawerLinks = [
    { to: "/products", label: "All Products", icon: "M4 6h16M4 12h16M4 18h16" },
    { to: "/products?isFeatured=true", label: "Collections", icon: "M5 3l14 9-14 9V3z" },
    { to: "/products?sort=-createdAt", label: "New Arrivals", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
    ...(user ? [
      { to: "/orders",  label: "My Orders",  icon: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" },
      { to: "/wishlist", label: "Wishlist",   icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" },
      { to: "/profile",  label: "Profile",    icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
    ] : []),
    ...(isAdmin ? [{ to: "/admin", label: "Admin Panel", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }] : []),
  ]

  return (
    <>
      {/* ── Floating pill navbar ── */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-full glass-nav flex justify-between items-center px-6 md:px-8 py-3.5">

        {/* Left: hamburger + nav */}
        <div className="flex items-center gap-6">
          <button onClick={() => setDrawerOpen(true)} className="w-8 h-8 flex items-center justify-center text-on-surface hover:opacity-60 transition-opacity" aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <nav className="hidden md:flex items-center gap-7">
            <NavLink to="/products" className={({ isActive }) =>
              ``font-headline font-bold text-sm tracking-tight transition-colors ${isActive ? "text-on-surface border-b-2 border-on-surface pb-0.5" : "text-secondary hover:text-on-surface"}``
            }>Products</NavLink>
            <NavLink to="/products?isFeatured=true" className={({ isActive }) =>
              ``font-headline font-bold text-sm tracking-tight transition-colors ${isActive ? "text-on-surface border-b-2 border-on-surface pb-0.5" : "text-secondary hover:text-on-surface"}``
            }>Collections</NavLink>
            {isAdmin && (
              <NavLink to="/admin" className={({ isActive }) =>
                ``font-label text-[10px] tracking-editorial uppercase transition-colors ${isActive ? "text-tertiary" : "text-tertiary/50 hover:text-tertiary"}``
              }>Admin</NavLink>
            )}
          </nav>
        </div>

        {/* Center: wordmark */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="font-headline font-black tracking-[0.2em] text-lg md:text-xl text-on-surface uppercase whitespace-nowrap">SAFEMART</span>
        </Link>

        {/* Right: icons */}
        <div className="flex items-center gap-2 md:gap-3">
          <button onClick={() => setSearchOpen(true)} className="w-8 h-8 flex items-center justify-center text-secondary hover:text-on-surface transition-colors" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <Link to="/wishlist" className="relative w-8 h-8 flex items-center justify-center text-secondary hover:text-on-surface transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            {wishCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-primary text-on-primary text-[8px] font-bold rounded-full flex items-center justify-center">{wishCount}</span>}
          </Link>
          <Link to="/cart" className="relative w-8 h-8 flex items-center justify-center text-secondary hover:text-on-surface transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {itemCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-primary text-on-primary text-[8px] font-bold rounded-full flex items-center justify-center">{itemCount > 9 ? "9+" : itemCount}</span>}
          </Link>
          {user ? (
            <Link to="/profile" className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary text-xs font-headline font-bold ml-1">
              {user.fullName?.[0]?.toUpperCase()}
            </Link>
          ) : (
            <Link to="/login" className="hidden md:flex items-center font-label text-[10px] tracking-editorial uppercase text-secondary hover:text-on-surface transition-colors ml-2">
              Sign in
            </Link>
          )}
        </div>
      </header>

      {/* ── Side drawer ── */}
      <>
        {/* Overlay */}
        {drawerOpen && (
          <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-[60] anim-fade-in" onClick={() => setDrawerOpen(false)} />
        )}
        {/* Drawer panel */}
        <aside className={``fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-[70] flex flex-col shadow-drawer transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${drawerOpen ? "translate-x-0" : "-translate-x-full"}``}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-outline-variant/20">
            <span className="font-headline font-black tracking-[0.2em] text-base uppercase">SAFEMART</span>
            <button onClick={() => setDrawerOpen(false)} className="w-8 h-8 flex items-center justify-center text-secondary hover:text-on-surface transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {/* User info */}
          {user && (
            <div className="px-6 py-4 surface-low mx-4 mt-4 rounded-md">
              <p className="font-headline font-semibold text-sm text-on-surface">{user.fullName}</p>
              <p className="font-label text-[11px] text-secondary mt-0.5">{user.email}</p>
            </div>
          )}

          {/* Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {drawerLinks.map(({ to, label, icon }) => (
              <Link key={to} to={to} onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-sm text-secondary hover:bg-surface-container hover:text-on-surface transition-all duration-200 group">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 group-hover:text-tertiary transition-colors">
                  <path d={icon}/>
                </svg>
                <span className="font-headline font-semibold text-sm uppercase tracking-wider">{label}</span>
              </Link>
            ))}
          </nav>

          {/* Bottom */}
          <div className="px-4 pb-6 pt-2 border-t border-outline-variant/20 mt-auto space-y-2">
            {user ? (
              <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-sm text-error/70 hover:bg-error/5 hover:text-error transition-all duration-200">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                <span className="font-headline font-semibold text-sm uppercase tracking-wider">Sign Out</span>
              </button>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={() => setDrawerOpen(false)} className="btn-primary w-full text-center block">Sign In</Link>
                <Link to="/register" onClick={() => setDrawerOpen(false)} className="btn-secondary w-full text-center block">Create Account</Link>
              </div>
            )}
          </div>
        </aside>
      </>

      {/* ── Search overlay ── */}
      {searchOpen && (
        <div className="fixed inset-0 z-[80]">
          <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={closeSearch} />
          <div className="relative surface-base shadow-ambient-lg anim-fade-up">
            <div className="container-main py-6">
              <div className="flex items-center gap-4 border-b border-outline-variant/30 pb-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-secondary shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input ref={searchRef} type="text" value={searchQuery} onChange={e => handleSearch(e.target.value)}
                  placeholder="Search security systems, cameras, alarms..."
                  className="flex-1 text-base font-body bg-transparent border-none outline-none text-on-surface placeholder:text-secondary/50" />
                <button onClick={closeSearch} className="label-overline hover:text-on-surface transition-colors">Close</button>
              </div>

              {searchQuery && (
                <div className="pt-4 space-y-1">
                  {searching && <p className="font-label text-xs text-secondary py-2">Searching...</p>}
                  {!searching && results.length === 0 && <p className="font-label text-xs text-secondary py-2">No results for "{searchQuery}"</p>}
                  {results.map(p => (
                    <Link key={p._id} to={``/products/${p._id}``} onClick={closeSearch}
                      className="flex items-center gap-4 py-3 px-2 -mx-2 hover:bg-surface-container-low rounded-sm transition-colors group">
                      <div className="w-12 h-12 surface-mid rounded-md overflow-hidden shrink-0">
                        {p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-headline font-semibold text-sm text-on-surface truncate">{p.name}</p>
                        <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-0.5">{p.category}</p>
                      </div>
                      <p className="price-text text-sm text-on-surface shrink-0">₦{Number(p.discountPrice || p.price).toLocaleString()}</p>
                    </Link>
                  ))}
                  {results.length > 0 && (
                    <Link to={``/products?search=${searchQuery}``} onClick={closeSearch}
                      className="block pt-3 label-overline text-tertiary hover:text-on-surface transition-colors">
                      View all results →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

'@

# ── components/ui/ProductCard.jsx ──
Set-Content -Path "$base\components\ui\ProductCard.jsx" -Encoding UTF8 -Value @'
import { Link } from "react-router-dom"
import { useState } from "react"
import { Price, Stars } from "./index"
import { useCart } from "../../context/CartContext"
import { useAuth } from "../../context/AuthContext"
import { useWishlist } from "../../hooks/useWishlist"
import toast from "react-hot-toast"

export default function ProductCard({ product, index = 0 }) {
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const [adding, setAdding] = useState(false)
  const wishlisted = isWishlisted(product._id)

  const handleAdd = async (e) => {
    e.preventDefault(); e.stopPropagation()
    if (!user) { toast.error("Sign in to add to cart"); return }
    try {
      setAdding(true)
      await addToCart(product._id, 1)
      toast.success("Added to cart")
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add")
    } finally { setAdding(false) }
  }

  const handleWishlist = (e) => {
    e.preventDefault(); e.stopPropagation()
    toggle(product)
    toast.success(wishlisted ? "Removed from wishlist" : "Saved to wishlist")
  }

  const hasDiscount  = product.discountPrice > 0
  const displayPrice = hasDiscount ? product.discountPrice : product.price
  const discPct      = hasDiscount ? Math.round((1 - product.discountPrice / product.price) * 100) : 0

  return (
    <Link to={``/products/${product._id}``}
      className="group block anim-fade-up"
      style={{ animationDelay: ``${index * 0.07}s`` }}>

      {/* Image container — tonal surface, no border */}
      <div className="relative aspect-[3/4] bg-surface-container-low rounded-md overflow-hidden mb-4">
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-outline-variant">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        )}

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.stock === 0 && (
            <span className="status-badge bg-on-surface text-inverse-on-surface">Sold Out</span>
          )}
          {hasDiscount && (
            <span className="status-badge bg-tertiary-container text-on-tertiary-container">-{discPct}%</span>
          )}
        </div>

        {/* Hover actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={handleWishlist}
            className={``w-9 h-9 flex items-center justify-center rounded-sm backdrop-blur-sm transition-all ${
              wishlisted ? "bg-tertiary text-on-tertiary" : "bg-white/90 text-on-surface hover:bg-tertiary hover:text-on-tertiary"
            }``}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        {/* Quick add — slides up from bottom */}
        {product.stock > 0 && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button onClick={handleAdd} disabled={adding}
              className="w-full bg-primary/90 backdrop-blur-sm text-on-primary font-headline font-bold text-[10px] tracking-[0.2em] uppercase py-3.5 hover:bg-primary transition-colors">
              {adding ? "Adding..." : "Quick Add"}
            </button>
          </div>
        )}

        {/* Subtle image overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
      </div>

      {/* Info — no borders, clean spacing */}
      <div className="px-1">
        <p className="label-overline text-tertiary mb-1.5">{product.category}</p>
        <h3 className="font-headline font-bold text-base text-on-surface leading-snug line-clamp-2 mb-2.5 group-hover:text-primary-fixed transition-colors duration-200">
          {product.name}
        </h3>
        {product.numReviews > 0 && (
          <div className="mb-2.5"><Stars rating={product.ratings} count={product.numReviews} /></div>
        )}
        <div className="flex items-center gap-2.5">
          <Price amount={displayPrice} className="text-sm text-on-surface" />
          {hasDiscount && (
            <span className="price-text text-xs text-secondary line-through opacity-60">₦{Number(product.price).toLocaleString()}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

'@

# ── components/ui/index.jsx ──
Set-Content -Path "$base\components\ui\index.jsx" -Encoding UTF8 -Value @'
// Spinner
export function Spinner({ size = "md", className = "" }) {
  const s = { sm: "w-4 h-4 border", md: "w-5 h-5 border-2", lg: "w-7 h-7 border-2" }
  return <div className={``${s[size]} border-surface-container-high border-t-on-surface rounded-full animate-spin ${className}``} />
}

export function LoadingPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}

// Skeleton
export function Skeleton({ className = "" }) {
  return <div className={``anim-shimmer rounded-md ${className}``} />
}

// Empty state
export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {icon && <div className="text-outline-variant mb-6">{icon}</div>}
      <h3 className="headline-md text-xl text-on-surface mb-2">{title}</h3>
      {description && <p className="font-body text-sm text-secondary max-w-xs mb-8 leading-relaxed">{description}</p>}
      {action}
    </div>
  )
}

// Status badge
const BADGE = {
  pending:    "bg-surface-container-high text-on-surface-variant",
  processing: "bg-tertiary-container/20 text-tertiary",
  shipped:    "bg-surface-container-highest text-on-surface-variant",
  delivered:  "bg-surface-container-high text-on-surface",
  cancelled:  "bg-error-container text-error",
  paid:       "bg-surface-container-high text-on-surface",
  failed:     "bg-error-container text-error",
  refunded:   "bg-surface-container-highest text-secondary",
}
export function Badge({ status }) {
  return <span className={``status-badge ${BADGE[status] || "bg-surface-container-high text-secondary"}``}>{status}</span>
}

// Price
export function Price({ amount, className = "" }) {
  return <span className={``price-text ${className}``}>₦{Number(amount).toLocaleString("en-NG")}</span>
}

// Stars
export function Stars({ rating, count, size = 11 }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(i => (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24"
            fill={i <= Math.round(rating) ? "currentColor" : "none"}
            stroke="currentColor" strokeWidth="1.5"
            className={i <= Math.round(rating) ? "text-tertiary" : "text-outline-variant"}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
      </div>
      {count !== undefined && <span className="font-label text-[10px] text-secondary">({count})</span>}
    </div>
  )
}

// Pagination
export function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}
        className="w-9 h-9 flex items-center justify-center font-label text-sm text-secondary hover:text-on-surface hover:bg-surface-container rounded-sm disabled:opacity-30 transition-colors">←</button>
      {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
        <button key={p} onClick={() => onPageChange(p)}
          className={``w-9 h-9 flex items-center justify-center font-label text-sm rounded-sm transition-colors ${
            p === page ? "bg-primary text-on-primary font-bold" : "text-secondary hover:bg-surface-container hover:text-on-surface"
          }``}>{p}</button>
      ))}
      <button onClick={() => onPageChange(page + 1)} disabled={page >= pages}
        className="w-9 h-9 flex items-center justify-center font-label text-sm text-secondary hover:text-on-surface hover:bg-surface-container rounded-sm disabled:opacity-30 transition-colors">→</button>
    </div>
  )
}

'@

# ── context/AuthContext.jsx ──
Set-Content -Path "$base\context\AuthContext.jsx" -Encoding UTF8 -Value @'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authApi } from '../api/services'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  // On mount: restore session from token
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) { setLoading(false); return }
    authApi.me()
      .then(res => setUser(res.data.data))
      .catch(() => localStorage.removeItem('accessToken'))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const res = await authApi.login({ email, password })
    localStorage.setItem('accessToken', res.data.accessToken)
    setUser(res.data.data)
    return res.data
  }, [])

  const register = useCallback(async (data) => {
    const res = await authApi.register(data)
    localStorage.setItem('accessToken', res.data.accessToken)
    setUser(res.data.data)
    return res.data
  }, [])

  const logout = useCallback(async () => {
    try { await authApi.logout() } catch {}
    localStorage.removeItem('accessToken')
    setUser(null)
  }, [])

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

'@

# ── context/CartContext.jsx ──
Set-Content -Path "$base\context\CartContext.jsx" -Encoding UTF8 -Value @'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { cartApi } from '../api/services'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart]       = useState({ items: [], totalItems: 0, totalPrice: 0 })
  const [loading, setLoading] = useState(false)

  const fetchCart = useCallback(async () => {
    if (!user) { setCart({ items: [], totalItems: 0, totalPrice: 0 }); return }
    try {
      setLoading(true)
      const res = await cartApi.get()
      setCart(res.data.data)
    } catch {}
    finally { setLoading(false) }
  }, [user])

  useEffect(() => { fetchCart() }, [fetchCart])

  const addToCart = async (productId, quantity = 1) => {
    const res = await cartApi.add({ productId, quantity })
    setCart(res.data.data)
  }

  const updateItem = async (productId, quantity) => {
    const res = await cartApi.update(productId, quantity)
    setCart(res.data.data)
  }

  const removeItem = async (productId) => {
    const res = await cartApi.remove(productId)
    setCart(res.data.data)
  }

  const clearCart = async () => {
    const res = await cartApi.clear()
    setCart(res.data.data)
  }

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateItem, removeItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

'@

# ── context/DarkModeContext.jsx ──
Set-Content -Path "$base\context\DarkModeContext.jsx" -Encoding UTF8 -Value @'
import { createContext, useContext, useState, useEffect } from "react"

const DarkModeContext = createContext(null)

export function DarkModeProvider({ children }) {
  const [dark, setDark] = useState(false) // default LIGHT mode

  useEffect(() => {
    // Remove dark class on mount to ensure light mode is default
    document.documentElement.classList.remove("dark")
  }, [])

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [dark])

  return (
    <DarkModeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  return useContext(DarkModeContext)
}

'@

# ── hooks/useRecentlyViewed.js ──
Set-Content -Path "$base\hooks\useRecentlyViewed.js" -Encoding UTF8 -Value @'
import { useState, useCallback } from "react"

const KEY = "safemart_recently_viewed"
const MAX = 8

export function useRecentlyViewed() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || [] }
    catch { return [] }
  })

  const add = useCallback((product) => {
    setItems(prev => {
      const filtered = prev.filter(p => p._id !== product._id)
      const next = [product, ...filtered].slice(0, MAX)
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return { items, add }
}

'@

# ── hooks/useWishlist.js ──
Set-Content -Path "$base\hooks\useWishlist.js" -Encoding UTF8 -Value @'
import { useState, useEffect, useCallback } from "react"

const KEY = "safemart_wishlist"

export function useWishlist() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items))
  }, [items])

  const toggle = useCallback((product) => {
    setItems(prev => {
      const exists = prev.find(p => p._id === product._id)
      if (exists) return prev.filter(p => p._id !== product._id)
      return [...prev, product]
    })
  }, [])

  const isWishlisted = useCallback((id) => items.some(p => p._id === id), [items])
  const clear = useCallback(() => setItems([]), [])

  return { items, toggle, isWishlisted, clear, count: items.length }
}

'@

# ── pages/NotFound.jsx ──
Set-Content -Path "$base\pages\NotFound.jsx" -Encoding UTF8 -Value @'
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="bg-surface min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-headline font-black text-[10rem] leading-none text-surface-container-highest select-none mb-4">404</p>
      <span className="label-overline text-tertiary block mb-3">Not Found</span>
      <h1 className="headline-lg text-3xl text-on-surface mb-3">Page not found</h1>
      <p className="font-body text-sm text-secondary mb-10 max-w-xs leading-relaxed">The page you're looking for doesn't exist or may have been moved.</p>
      <Link to="/" className="btn-primary">Return Home</Link>
    </div>
  )
}

'@

# ── pages/Admin/Dashboard.jsx ──
Set-Content -Path "$base\pages\Admin\Dashboard.jsx" -Encoding UTF8 -Value @'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { adminApi, ordersApi } from "../../api/services"
import { LoadingPage, Price, Badge } from "../../components/ui"

export default function AdminDashboard() {
  const [analytics, setAnalytics]       = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    Promise.all([adminApi.getAnalytics(), ordersApi.getAll({ limit: 6, sort: "-createdAt" })])
      .then(([aRes, oRes]) => { setAnalytics(aRes.data.data); setRecentOrders(oRes.data.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingPage />

  const stats = [
    { label: "Total Revenue",  value: <Price amount={analytics?.totalRevenue || 0} className="text-3xl text-on-surface" />, sub: "All time" },
    { label: "Total Orders",   value: <span className="font-headline font-black text-3xl text-on-surface">{analytics?.totalOrders || 0}</span>, sub: "Orders placed" },
    { label: "Total Users",    value: <span className="font-headline font-black text-3xl text-on-surface">{analytics?.totalUsers || 0}</span>, sub: "Registered" },
    { label: "Total Products", value: <span className="font-headline font-black text-3xl text-on-surface">{analytics?.totalProducts || 0}</span>, sub: "In catalogue" },
  ]

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-10">
          <span className="label-overline text-tertiary mb-3 block">Admin</span>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h1 className="headline-lg text-4xl text-on-surface">Dashboard</h1>
            <div className="flex flex-wrap gap-3">
              {[["Products", "/admin/products"], ["Orders", "/admin/orders"], ["Users", "/admin/users"]].map(([l, to]) => (
                <Link key={to} to={to} className="btn-secondary py-2 text-xs">{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(s => (
            <div key={s.label} className="bg-surface-container-low rounded-md p-6 ghost-border">
              {s.value}
              <p className="font-headline font-bold text-sm text-on-surface mt-1">{s.label}</p>
              <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Monthly revenue bars */}
        {analytics?.monthlyRevenue?.length > 0 && (
          <div className="bg-surface-container-low rounded-md p-7 ghost-border mb-8">
            <p className="label-overline mb-6">Monthly Revenue</p>
            <div className="flex items-end gap-2 h-28">
              {analytics.monthlyRevenue.map((m, i) => {
                const max = Math.max(...analytics.monthlyRevenue.map(r => r.revenue), 1)
                const h   = Math.max(2, (m.revenue / max) * 100)
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full bg-on-surface rounded-sm transition-all duration-700" style={{ height: ``${h}%`` }} />
                    <span className="font-label text-[9px] text-secondary uppercase">{m._id?.month}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Recent orders */}
        <div className="bg-surface-container-low rounded-md ghost-border">
          <div className="flex items-center justify-between p-6 border-b border-outline-variant/20">
            <p className="label-overline">Recent Orders</p>
            <Link to="/admin/orders" className="label-overline text-secondary hover:text-on-surface transition-colors">View all →</Link>
          </div>
          <div className="divide-y divide-outline-variant/10">
            {recentOrders.length === 0 && <p className="font-body text-sm text-secondary p-6">No orders yet.</p>}
            {recentOrders.map(order => (
              <div key={order._id} className="flex items-center gap-4 px-6 py-4 hover:bg-surface-container transition-colors flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="font-headline font-bold text-xs text-on-surface">#{order._id.slice(-8).toUpperCase()}</p>
                  <p className="font-label text-[10px] text-secondary uppercase tracking-wider">{order.user?.fullName || "Unknown"}</p>
                </div>
                <Badge status={order.orderStatus} />
                <Price amount={order.totalAmount} className="text-sm text-on-surface" />
                <Link to={``/orders/${order._id}``} className="label-overline text-secondary hover:text-on-surface transition-colors">View →</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

'@

# ── pages/Admin/Orders.jsx ──
Set-Content -Path "$base\pages\Admin\Orders.jsx" -Encoding UTF8 -Value @'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ordersApi } from "../../api/services"
import { LoadingPage, Badge, Price, Pagination } from "../../components/ui"
import toast from "react-hot-toast"

const STATUS_OPTIONS = ["pending","processing","shipped","delivered","cancelled"]

export default function AdminOrders() {
  const [orders, setOrders]           = useState([])
  const [pages, setPages]             = useState(1)
  const [page, setPage]               = useState(1)
  const [loading, setLoading]         = useState(true)
  const [statusFilter, setStatusFilter] = useState("")

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await ordersApi.getAll({ page, limit: 15, ...(statusFilter && { orderStatus: statusFilter }) })
      setOrders(res.data.data); setPages(res.data.pages)
    } catch {}
    finally { setLoading(false) }
  }

  useEffect(() => { fetchOrders() }, [page, statusFilter])

  const updateStatus = async (orderId, status) => {
    try { await ordersApi.updateStatus(orderId, { orderStatus: status }); toast.success("Updated"); fetchOrders() }
    catch { toast.error("Failed") }
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-10">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/admin" className="label-overline text-secondary hover:text-on-surface transition-colors">← Dashboard</Link>
          </div>
          <h1 className="headline-lg text-4xl text-on-surface">Orders</h1>
        </div>
      </div>

      <div className="container-main py-10">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["", ...STATUS_OPTIONS].map(s => (
            <button key={s || "all"} onClick={() => { setStatusFilter(s); setPage(1) }}
              className={``font-label text-[10px] uppercase tracking-wider px-4 py-2 rounded-sm transition-colors ${
                s === statusFilter ? "bg-on-surface text-inverse-on-surface" : "bg-surface-container-low text-secondary hover:bg-surface-container hover:text-on-surface"
              }``}>
              {s || "All"}
            </button>
          ))}
        </div>

        {loading ? <LoadingPage /> : (
          <>
            <div className="bg-surface-container-low rounded-md ghost-border divide-y divide-outline-variant/10 mb-8">
              {orders.length === 0 && <p className="font-body text-sm text-secondary p-6">No orders found.</p>}
              {orders.map(order => (
                <div key={order._id} className="flex items-center gap-4 px-6 py-4 flex-wrap hover:bg-surface-container transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-headline font-bold text-xs text-on-surface">#{order._id.slice(-8).toUpperCase()}</p>
                    <p className="font-label text-[10px] text-secondary uppercase tracking-wider">{order.user?.fullName} · {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Badge status={order.paymentStatus} />
                  <select value={order.orderStatus} onChange={e => updateStatus(order._id, e.target.value)}
                    className="input-field w-auto py-1.5 text-xs font-label uppercase tracking-wider">
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <Price amount={order.totalAmount} className="text-sm text-on-surface" />
                  <Link to={``/orders/${order._id}``} className="label-overline text-secondary hover:text-on-surface transition-colors">View →</Link>
                </div>
              ))}
            </div>
            <div className="flex justify-center"><Pagination page={page} pages={pages} onPageChange={setPage} /></div>
          </>
        )}
      </div>
    </div>
  )
}

'@

# ── pages/Admin/Products.jsx ──
Set-Content -Path "$base\pages\Admin\Products.jsx" -Encoding UTF8 -Value @'
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { productsApi, uploadApi } from "../../api/services"
import { LoadingPage, Price, Pagination } from "../../components/ui"
import toast from "react-hot-toast"

const CATEGORIES = ["CCTV", "Alarms", "Access Control", "Intercom", "Networking", "Other"]
const BLANK = { name: "", description: "", price: "", discountPrice: "", category: "CCTV", brand: "", stock: "", isFeatured: false }

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [pages, setPages]       = useState(1)
  const [page, setPage]         = useState(1)
  const [loading, setLoading]   = useState(true)
  const [modal, setModal]       = useState(null)
  const [form, setForm]         = useState(BLANK)
  const [saving, setSaving]     = useState(false)

  // Image state
  const [existingImages, setExistingImages] = useState([])
  const [newFiles, setNewFiles]             = useState([])
  const [previews, setPreviews]             = useState([])
  const [uploading, setUploading]           = useState(false)
  const fileInputRef = useRef(null)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await productsApi.getAll({ page, limit: 15 })
      setProducts(res.data.data)
      setPages(res.data.pages)
    } catch {}
    finally { setLoading(false) }
  }

  useEffect(() => { fetchProducts() }, [page])

  const openCreate = () => {
    setForm(BLANK)
    setExistingImages([])
    setNewFiles([])
    setPreviews([])
    setModal("create")
  }

  const openEdit = (p) => {
    setForm({
      name: p.name, description: p.description, price: p.price,
      discountPrice: p.discountPrice || "", category: p.category,
      brand: p.brand || "", stock: p.stock, isFeatured: p.isFeatured,
    })
    setExistingImages(p.images || [])
    setNewFiles([])
    setPreviews([])
    setModal(p)
  }

  const closeModal = () => {
    previews.forEach(url => URL.revokeObjectURL(url))
    setNewFiles([])
    setPreviews([])
    setExistingImages([])
    setModal(null)
  }

  const set = (key) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setForm(f => ({ ...f, [key]: val }))
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return

    const totalAfter = existingImages.length + newFiles.length + files.length
    if (totalAfter > 5) {
      toast.error(``Can only add ${5 - existingImages.length - newFiles.length} more image(s)``)
      return
    }

    const invalid = files.filter(f => !f.type.startsWith("image/"))
    if (invalid.length) { toast.error("Only image files are allowed"); return }

    setNewFiles(prev => [...prev, ...files])
    setPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))])
    e.target.value = ""
  }

  const removeExisting = (i) => setExistingImages(prev => prev.filter((_, idx) => idx !== i))

  const removeNew = (i) => {
    URL.revokeObjectURL(previews[i])
    setNewFiles(prev => prev.filter((_, idx) => idx !== i))
    setPreviews(prev => prev.filter((_, idx) => idx !== i))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      let uploadedUrls = []

      if (newFiles.length > 0) {
        setUploading(true)
        const fd = new FormData()
        newFiles.forEach(f => fd.append("images", f))
        const res = await uploadApi.productImages(fd)
        uploadedUrls = res.data.data.urls
        setUploading(false)
      }

      const payload = { ...form, images: [...existingImages, ...uploadedUrls] }

      if (modal === "create") {
        await productsApi.create(payload)
        toast.success("Product created")
      } else {
        await productsApi.update(modal._id, payload)
        toast.success("Product updated")
      }

      closeModal()
      fetchProducts()
    } catch (err) {
      setUploading(false)
      toast.error(err.response?.data?.message || "Save failed")
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return
    try { await productsApi.remove(id); toast.success("Product deleted"); fetchProducts() }
    catch { toast.error("Failed to delete") }
  }

  const totalImages = existingImages.length + newFiles.length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-xs text-ink-400 hover:text-ink">← Dashboard</Link>
          <h1 className="page-title">Products</h1>
        </div>
        <button onClick={openCreate} className="btn-primary text-xs py-2">+ New Product</button>
      </div>

      {loading ? <LoadingPage /> : (
        <>
          <div className="card divide-y divide-ink-50 mb-6">
            {products.length === 0 && <p className="text-sm text-ink-400 p-5">No products yet.</p>}
            {products.map(p => (
              <div key={p._id} className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 bg-ink-50 rounded-sm overflow-hidden shrink-0">
                  {p.images?.[0]
                    ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-ink-100 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-300"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      </div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{p.name}</p>
                  <p className="text-xs text-ink-400">{p.category} · Stock: {p.stock} · {p.images?.length || 0} image{p.images?.length !== 1 ? "s" : ""}</p>
                </div>
                {p.isFeatured && <span className="tag bg-sage-100 text-sage-dark text-[10px]">Featured</span>}
                <Price amount={p.price} className="text-sm" />
                <button onClick={() => openEdit(p)} className="text-xs text-ink-400 hover:text-ink transition-colors">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="text-xs text-red-400 hover:text-red-600 transition-colors">Delete</button>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Pagination page={page} pages={pages} onPageChange={setPage} />
          </div>
        </>
      )}

      {/* Modal */}
      {modal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-sm shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between p-5 border-b border-ink-100 sticky top-0 bg-white z-10">
              <h2 className="font-display font-semibold text-base">
                {modal === "create" ? "New Product" : "Edit Product"}
              </h2>
              <button onClick={closeModal} className="text-ink-400 hover:text-ink transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-5">

              {/* Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="section-label">Product Images</label>
                  <span className="text-xs text-ink-400">{totalImages}/5</span>
                </div>

                {totalImages > 0 && (
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {existingImages.map((url, i) => (
                      <div key={``e-${i}``} className="relative group aspect-square">
                        <img src={url} alt="" className="w-full h-full object-cover rounded-sm border border-ink-100" />
                        <button type="button" onClick={() => removeExisting(i)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full items-center justify-center hidden group-hover:flex shadow-sm">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                        {i === 0 && <span className="absolute bottom-0 left-0 right-0 text-[9px] text-center bg-black/50 text-white py-0.5 rounded-b-sm">Main</span>}
                      </div>
                    ))}
                    {previews.map((url, i) => (
                      <div key={``n-${i}``} className="relative group aspect-square">
                        <img src={url} alt="" className="w-full h-full object-cover rounded-sm border border-sage/40 ring-1 ring-sage/20" />
                        <button type="button" onClick={() => removeNew(i)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full items-center justify-center hidden group-hover:flex shadow-sm">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                        <span className="absolute bottom-0 left-0 right-0 text-[9px] text-center bg-sage/70 text-white py-0.5 rounded-b-sm">New</span>
                      </div>
                    ))}
                  </div>
                )}

                {totalImages < 5 && (
                  <>
                    <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" multiple className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-ink-200 rounded-sm py-5 flex flex-col items-center gap-1.5 text-ink-400 hover:border-ink hover:text-ink transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <span className="text-xs font-medium">Click to upload images</span>
                      <span className="text-[11px] text-ink-300">PNG, JPG, WEBP · Up to {5 - totalImages} more · First image = main photo</span>
                    </button>
                  </>
                )}

                {uploading && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-sage">
                    <div className="w-3 h-3 border border-sage/30 border-t-sage rounded-full animate-spin" />
                    Uploading to Cloudinary...
                  </div>
                )}
              </div>

              {/* Fields */}
              <div>
                <label className="section-label mb-2 block">Name</label>
                <input required type="text" value={form.name} onChange={set("name")} className="input-field" placeholder="4MP IP Dome Camera" />
              </div>

              <div>
                <label className="section-label mb-2 block">Description</label>
                <textarea rows={3} required value={form.description} onChange={set("description")} className="input-field resize-none" placeholder="Full HD resolution with night vision..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="section-label mb-2 block">Price (₦)</label>
                  <input required type="number" min="0" value={form.price} onChange={set("price")} className="input-field" placeholder="45000" />
                </div>
                <div>
                  <label className="section-label mb-2 block">Discount Price (₦)</label>
                  <input type="number" min="0" value={form.discountPrice} onChange={set("discountPrice")} className="input-field" placeholder="0" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="section-label mb-2 block">Category</label>
                  <select value={form.category} onChange={set("category")} className="input-field">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="section-label mb-2 block">Stock</label>
                  <input required type="number" min="0" value={form.stock} onChange={set("stock")} className="input-field" placeholder="10" />
                </div>
              </div>

              <div>
                <label className="section-label mb-2 block">Brand</label>
                <input type="text" value={form.brand} onChange={set("brand")} className="input-field" placeholder="Hikvision" />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isFeatured} onChange={set("isFeatured")} className="w-4 h-4" />
                <span className="text-sm font-medium text-ink">Feature this product on the homepage</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" disabled={saving || uploading} className="btn-primary flex-1 justify-center">
                  {uploading ? "Uploading..." : saving ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

'@

# ── pages/Admin/Users.jsx ──
Set-Content -Path "$base\pages\Admin\Users.jsx" -Encoding UTF8 -Value @'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { adminApi } from "../../api/services"
import { LoadingPage, Pagination } from "../../components/ui"
import toast from "react-hot-toast"

export default function AdminUsers() {
  const [users, setUsers]     = useState([])
  const [pages, setPages]     = useState(1)
  const [page, setPage]       = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await adminApi.getUsers({ page, limit: 20 })
      setUsers(res.data.data); setPages(res.data.pages)
    } catch {}
    finally { setLoading(false) }
  }

  useEffect(() => { fetchUsers() }, [page])

  const toggleStatus = async (id) => {
    try { await adminApi.toggleStatus(id); toast.success("Updated"); fetchUsers() }
    catch { toast.error("Failed") }
  }
  const changeRole = async (id, role) => {
    try { await adminApi.changeRole(id, role); toast.success("Updated"); fetchUsers() }
    catch { toast.error("Failed") }
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-10">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/admin" className="label-overline text-secondary hover:text-on-surface transition-colors">← Dashboard</Link>
          </div>
          <h1 className="headline-lg text-4xl text-on-surface">Users</h1>
        </div>
      </div>

      <div className="container-main py-10">
        {loading ? <LoadingPage /> : (
          <>
            <div className="bg-surface-container-low rounded-md ghost-border divide-y divide-outline-variant/10 mb-8">
              {users.length === 0 && <p className="font-body text-sm text-secondary p-6">No users found.</p>}
              {users.map(user => (
                <div key={user._id} className="flex items-center gap-4 px-6 py-4 flex-wrap hover:bg-surface-container transition-colors">
                  <div className="w-9 h-9 rounded-full bg-on-surface flex items-center justify-center text-inverse-on-surface font-headline font-black text-sm shrink-0">
                    {user.fullName?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-headline font-bold text-sm text-on-surface">{user.fullName}</p>
                    <p className="font-label text-[10px] text-secondary uppercase tracking-wider">{user.email}</p>
                  </div>
                  <span className={``status-badge ${user.isActive ? "bg-surface-container-high text-on-surface" : "bg-error-container text-error"}``}>
                    {user.isActive ? "Active" : "Suspended"}
                  </span>
                  <select value={user.role} onChange={e => changeRole(user._id, e.target.value)}
                    className="input-field w-auto py-1.5 text-xs font-label uppercase tracking-wider">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button onClick={() => toggleStatus(user._id)}
                    className={``label-overline transition-colors ${user.isActive ? "text-error hover:text-on-surface" : "text-tertiary hover:text-on-surface"}``}>
                    {user.isActive ? "Suspend" : "Activate"}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center"><Pagination page={page} pages={pages} onPageChange={setPage} /></div>
          </>
        )}
      </div>
    </div>
  )
}

'@

# ── pages/Auth/Login.jsx ──
Set-Content -Path "$base\pages\Auth\Login.jsx" -Encoding UTF8 -Value @'
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import toast from "react-hot-toast"

export default function Login() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from      = location.state?.from?.pathname || "/"
  const [form, setForm]       = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [show, setShow]       = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await login(form.email, form.password)
      toast.success("Welcome back")
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials")
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[90vh] flex bg-surface">
      {/* Left editorial panel */}
      <div className="hidden lg:flex lg:flex-1 bg-on-surface flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-tertiary/10 rounded-full blur-3xl" />
        <Link to="/" className="relative z-10">
          <span className="font-headline font-black text-lg tracking-[0.2em] uppercase text-inverse-on-surface">SAFEMART</span>
        </Link>
        <div className="relative z-10 max-w-sm">
          <h2 className="headline-display text-5xl text-inverse-on-surface leading-none mb-6">
            SECURE<br />ACCESS<br /><span className="text-on-tertiary">AWAITS.</span>
          </h2>
          <p className="font-body text-sm text-inverse-on-surface/50 leading-relaxed">
            Premium security systems for those who demand the absolute best in protection and design.
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Link to="/" className="font-headline font-black text-base tracking-[0.2em] uppercase text-on-surface block mb-12 lg:hidden">SAFEMART</Link>
          <span className="label-overline text-tertiary block mb-4">Account</span>
          <h1 className="headline-lg text-3xl text-on-surface mb-2">Welcome back</h1>
          <p className="font-body text-sm text-secondary mb-10">Sign in to continue your session.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-overline mb-2 block">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="input-field" placeholder="you@example.com" autoComplete="email" />
            </div>
            <div>
              <label className="label-overline mb-2 block">Password</label>
              <div className="relative">
                <input type={show ? "text" : "password"} required value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="input-field pr-10" placeholder="••••••••" autoComplete="current-password" />
                <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors">
                  {show
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="font-body text-sm text-secondary text-center mt-8">
            No account?{" "}
            <Link to="/register" className="text-on-surface font-medium underline underline-offset-2 hover:text-tertiary transition-colors">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

'@

# ── pages/Auth/Register.jsx ──
Set-Content -Path "$base\pages\Auth\Register.jsx" -Encoding UTF8 -Value @'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import toast from "react-hot-toast"

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm]       = useState({ fullName: "", email: "", password: "", phone: "" })
  const [loading, setLoading] = useState(false)
  const [show, setShow]       = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 6) { toast.error("Password min 6 characters"); return }
    try {
      setLoading(true)
      await register(form)
      toast.success("Account created")
      navigate("/")
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed")
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[90vh] flex bg-surface">
      {/* Left panel */}
      <div className="hidden lg:flex lg:flex-1 bg-on-surface flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <Link to="/"><span className="font-headline font-black text-lg tracking-[0.2em] uppercase text-inverse-on-surface relative z-10">SAFEMART</span></Link>
        <div className="relative z-10 max-w-sm">
          <h2 className="headline-display text-5xl text-inverse-on-surface leading-none mb-6">JOIN THE<br />CIRCLE.</h2>
          <div className="space-y-3 mt-8">
            {["Premium product access","Member-only pricing","Expert installation support","Priority customer service"].map(item => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0" />
                <span className="font-body text-sm text-inverse-on-surface/60">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Link to="/" className="font-headline font-black text-base tracking-[0.2em] uppercase text-on-surface block mb-12 lg:hidden">SAFEMART</Link>
          <span className="label-overline text-tertiary block mb-4">New Account</span>
          <h1 className="headline-lg text-3xl text-on-surface mb-2">Create account</h1>
          <p className="font-body text-sm text-secondary mb-10">Join Safemart to protect what matters most.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-overline mb-2 block">Full Name</label>
              <input type="text" required value={form.fullName} onChange={set("fullName")} className="input-field" placeholder="John Doe" autoComplete="name" />
            </div>
            <div>
              <label className="label-overline mb-2 block">Email</label>
              <input type="email" required value={form.email} onChange={set("email")} className="input-field" placeholder="you@example.com" autoComplete="email" />
            </div>
            <div>
              <label className="label-overline mb-2 block">Phone <span className="text-outline normal-case font-normal">(optional)</span></label>
              <input type="tel" value={form.phone} onChange={set("phone")} className="input-field" placeholder="+234 800 000 0000" />
            </div>
            <div>
              <label className="label-overline mb-2 block">Password</label>
              <div className="relative">
                <input type={show ? "text" : "password"} required minLength={6} value={form.password} onChange={set("password")}
                  className="input-field pr-10" placeholder="At least 6 characters" autoComplete="new-password" />
                <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors">
                  {show
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="font-body text-sm text-secondary text-center mt-8">
            Have an account?{" "}
            <Link to="/login" className="text-on-surface font-medium underline underline-offset-2 hover:text-tertiary transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

'@

# ── pages/Cart/index.jsx ──
Set-Content -Path "$base\pages\Cart\index.jsx" -Encoding UTF8 -Value @'
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useCart } from "../../context/CartContext"
import { Price, EmptyState } from "../../components/ui"
import toast from "react-hot-toast"

export default function Cart() {
  const { cart, updateItem, removeItem, clearCart } = useCart()
  const navigate = useNavigate()
  const [clearing, setClearing] = useState(false)

  const subtotal = cart?.totalPrice || 0
  const shipping = subtotal >= 50000 ? 0 : 2500
  const total    = subtotal + shipping
  const progress = Math.min(100, (subtotal / 50000) * 100)

  const handleUpdate = async (id, qty) => {
    try { await updateItem(id, qty) }
    catch (err) { toast.error(err.response?.data?.message || "Failed to update") }
  }
  const handleRemove = async (id) => {
    try { await removeItem(id) } catch { toast.error("Failed to remove") }
  }
  const handleClear = async () => {
    try { setClearing(true); await clearCart() } catch { toast.error("Failed") } finally { setClearing(false) }
  }

  if (!cart?.items?.length) return (
    <div className="bg-surface min-h-screen">
      <div className="container-main py-20">
        <EmptyState
          icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>}
          title="Your cart is empty"
          description="Browse our security systems and add items to your cart."
          action={<Link to="/products" className="btn-primary mt-2">Browse Products</Link>}
        />
      </div>
    </div>
  )

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">Your</span>
          <div className="flex items-end justify-between">
            <h1 className="headline-lg text-4xl text-on-surface">Cart <span className="font-body font-normal text-lg text-secondary">({cart.totalItems})</span></h1>
            <button onClick={handleClear} disabled={clearing} className="label-overline text-secondary hover:text-error transition-colors">
              {clearing ? "Clearing..." : "Clear all"}
            </button>
          </div>
        </div>
      </div>

      <div className="container-main py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Items */}
          <div className="lg:col-span-2 divide-y divide-outline-variant/15">
            {cart.items.map(item => (
              <div key={item._id} className="flex gap-5 py-7">
                <Link to={``/products/${item.product?._id}``}
                  className="w-24 h-24 bg-surface-container-low rounded-md overflow-hidden shrink-0 ghost-border">
                  {item.product?.images?.[0]
                    ? <img src={item.product.images[0]} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    : <div className="w-full h-full" />
                  }
                </Link>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <span className="label-overline text-tertiary block mb-1">{item.product?.category}</span>
                    <Link to={``/products/${item.product?._id}``} className="font-headline font-bold text-base text-on-surface hover:text-primary-fixed transition-colors line-clamp-2 leading-snug">
                      {item.product?.name}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center bg-surface-container-high rounded-sm">
                      <button onClick={() => item.quantity > 1 ? handleUpdate(item.product?._id, item.quantity - 1) : handleRemove(item.product?._id)}
                        className="w-8 h-9 flex items-center justify-center text-secondary hover:text-on-surface transition-colors text-sm">−</button>
                      <span className="w-7 text-center font-label font-bold text-xs">{item.quantity}</span>
                      <button onClick={() => handleUpdate(item.product?._id, item.quantity + 1)}
                        className="w-8 h-9 flex items-center justify-center text-secondary hover:text-on-surface transition-colors text-sm">+</button>
                    </div>
                    <div className="flex items-center gap-4">
                      <Price amount={item.totalPrice} className="text-sm text-on-surface" />
                      <button onClick={() => handleRemove(item.product?._id)} className="text-outline-variant hover:text-error transition-colors">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-surface-container-low rounded-md p-6 ghost-border sticky top-28">
              <h2 className="headline-md text-lg text-on-surface mb-6">Summary</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="font-body text-secondary">Subtotal</span>
                  <Price amount={subtotal} className="text-sm text-on-surface" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-body text-secondary">Shipping</span>
                  {shipping === 0
                    ? <span className="font-label font-semibold text-xs text-on-surface uppercase tracking-wider">Free</span>
                    : <Price amount={shipping} className="text-sm text-on-surface" />
                  }
                </div>
              </div>

              {/* Free shipping progress */}
              {subtotal < 50000 && (
                <div className="mb-5">
                  <p className="font-label text-[10px] text-secondary uppercase tracking-wider mb-2">
                    Add <span className="text-on-surface font-bold">₦{(50000 - subtotal).toLocaleString()}</span> for free shipping
                  </p>
                  <div className="h-0.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-on-surface rounded-full transition-all duration-500" style={{ width: ``${progress}%`` }} />
                  </div>
                </div>
              )}

              <div className="border-t border-outline-variant/20 pt-4 mb-6 flex justify-between">
                <span className="font-headline font-bold text-sm text-on-surface">Total</span>
                <Price amount={total} className="text-base text-on-surface" />
              </div>

              <button onClick={() => navigate("/checkout")} className="btn-primary w-full mb-3">
                Proceed to Checkout
              </button>
              <Link to="/products" className="block text-center label-overline text-secondary hover:text-on-surface transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'@

# ── pages/Checkout/PaymentCallback.jsx ──
Set-Content -Path "$base\pages\Checkout\PaymentCallback.jsx" -Encoding UTF8 -Value @'
import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { paymentApi } from "../../api/services"
import { useCart } from "../../context/CartContext"
import { Spinner } from "../../components/ui"

export default function PaymentCallback() {
  const [searchParams] = useSearchParams()
  const { fetchCart }  = useCart()
  const reference      = searchParams.get("reference") || searchParams.get("trxref")
  const [status, setStatus] = useState("verifying")

  useEffect(() => {
    if (!reference) { setStatus("failed"); return }
    paymentApi.verify(reference)
      .then(() => { setStatus("success"); fetchCart() })
      .catch(() => setStatus("failed"))
  }, [reference])

  return (
    <div className="bg-surface min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        {status === "verifying" && (
          <>
            <Spinner size="lg" className="mx-auto mb-8" />
            <h1 className="headline-lg text-2xl text-on-surface mb-2">Verifying payment</h1>
            <p className="font-body text-sm text-secondary">Please wait while we confirm your transaction...</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-8 ghost-border">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-on-surface"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span className="label-overline text-tertiary block mb-3">Confirmed</span>
            <h1 className="headline-lg text-3xl text-on-surface mb-3">Payment successful</h1>
            <p className="font-body text-sm text-secondary mb-10 leading-relaxed">Your order has been placed and is being processed. You will receive a confirmation shortly.</p>
            <div className="flex gap-3 justify-center">
              <Link to="/orders" className="btn-primary">View Orders</Link>
              <Link to="/products" className="btn-secondary">Continue Shopping</Link>
            </div>
          </>
        )}
        {status === "failed" && (
          <>
            <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center mx-auto mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-error"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </div>
            <span className="label-overline text-error block mb-3">Failed</span>
            <h1 className="headline-lg text-3xl text-on-surface mb-3">Payment failed</h1>
            <p className="font-body text-sm text-secondary mb-10 leading-relaxed">We could not verify your payment. Please try again or contact our support team.</p>
            <div className="flex gap-3 justify-center">
              <Link to="/cart" className="btn-primary">Return to Cart</Link>
              <Link to="/orders" className="btn-secondary">My Orders</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

'@

# ── pages/Checkout/index.jsx ──
Set-Content -Path "$base\pages\Checkout\index.jsx" -Encoding UTF8 -Value @'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { ordersApi, paymentApi } from "../../api/services"
import { Price } from "../../components/ui"
import toast from "react-hot-toast"

const STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"]
const STEPS = ["Address", "Payment", "Review"]

export default function Checkout() {
  const { cart, fetchCart } = useCart()
  const navigate = useNavigate()

  const [step, setStep]           = useState(0)
  const [address, setAddress]     = useState({ street: "", city: "", state: "Rivers", country: "Nigeria" })
  const [payment, setPayment]     = useState("paystack")
  const [loading, setLoading]     = useState(false)

  const subtotal = cart?.totalPrice || 0
  const shipping = subtotal >= 50000 ? 0 : 2500
  const total    = subtotal + shipping

  const setAddr = k => e => setAddress(a => ({ ...a, [k]: e.target.value }))

  const handlePlaceOrder = async () => {
    try {
      setLoading(true)
      const orderRes = await ordersApi.create({ shippingAddress: address, paymentMethod: payment })
      const order = orderRes.data.data
      if (payment === "paystack") {
        const payRes = await paymentApi.initialize(order._id)
        window.location.href = payRes.data.data.authorizationUrl
      } else {
        toast.success("Order placed!")
        await fetchCart()
        navigate(``/orders/${order._id}``)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order")
    } finally { setLoading(false) }
  }

  return (
    <div className="bg-surface min-h-screen">

      {/* Header */}
      <div className="bg-surface-container-low">
        <div className="container-main py-10">
          <span className="label-overline text-tertiary mb-3 block">Secure</span>
          <h1 className="headline-lg text-4xl text-on-surface mb-8">Checkout</h1>

          {/* Step tracker */}
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={``flex items-center gap-2 ${i <= step ? "opacity-100" : "opacity-40"}``}>
                  <div className={``w-6 h-6 flex items-center justify-center text-[10px] font-headline font-bold rounded-sm transition-colors ${
                    i < step ? "bg-on-surface text-inverse-on-surface" : i === step ? "bg-tertiary-container text-on-tertiary-container" : "bg-surface-container-high text-secondary"
                  }``}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className={``font-label text-[10px] uppercase tracking-wider ${i === step ? "text-on-surface" : "text-secondary"}``}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className="w-8 h-px bg-outline-variant/30 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-main py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left — steps */}
          <div className="lg:col-span-3">

            {/* Step 0: Address */}
            {step === 0 && (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border anim-fade-up">
                <h2 className="headline-md text-xl text-on-surface mb-7">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="label-overline mb-2 block">Street Address</label>
                    <input type="text" required value={address.street} onChange={setAddr("street")} className="input-field" placeholder="12 Aba Road" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label-overline mb-2 block">City</label>
                      <input type="text" required value={address.city} onChange={setAddr("city")} className="input-field" placeholder="Port Harcourt" />
                    </div>
                    <div>
                      <label className="label-overline mb-2 block">State</label>
                      <select value={address.state} onChange={setAddr("state")} className="input-field">
                        {STATES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <button onClick={() => { if (!address.street || !address.city) { toast.error("Fill in address"); return } setStep(1) }}
                  className="btn-primary mt-7">Continue to Payment →</button>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border anim-fade-up">
                <div className="flex items-center gap-4 mb-7">
                  <button onClick={() => setStep(0)} className="label-overline text-secondary hover:text-on-surface transition-colors">← Back</button>
                  <h2 className="headline-md text-xl text-on-surface">Payment Method</h2>
                </div>
                <div className="space-y-3 mb-7">
                  {[
                    { value: "paystack",      label: "Pay with Paystack",    desc: "Cards, bank transfer, USSD — instant & secure" },
                    { value: "bank_transfer", label: "Direct Bank Transfer", desc: "Pay directly to our account" },
                  ].map(opt => (
                    <label key={opt.value}
                      className={``flex items-start gap-4 p-5 rounded-sm cursor-pointer transition-all ${
                        payment === opt.value ? "bg-on-surface text-inverse-on-surface" : "bg-surface-container hover:bg-surface-container-high"
                      }``}>
                      <input type="radio" name="payment" value={opt.value} checked={payment === opt.value} onChange={() => setPayment(opt.value)} className="mt-1 shrink-0" />
                      <div>
                        <p className={``font-headline font-bold text-sm mb-0.5 ${payment === opt.value ? "text-inverse-on-surface" : "text-on-surface"}``}>{opt.label}</p>
                        <p className={``font-body text-xs ${payment === opt.value ? "text-inverse-on-surface/60" : "text-secondary"}``}>{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="btn-primary">Review Order →</button>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border anim-fade-up">
                <div className="flex items-center gap-4 mb-7">
                  <button onClick={() => setStep(1)} className="label-overline text-secondary hover:text-on-surface transition-colors">← Back</button>
                  <h2 className="headline-md text-xl text-on-surface">Review & Place Order</h2>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="bg-surface-container rounded-sm p-4">
                    <p className="label-overline mb-1.5">Shipping To</p>
                    <p className="font-body text-sm text-on-surface">{address.street}, {address.city}, {address.state}, Nigeria</p>
                  </div>
                  <div className="bg-surface-container rounded-sm p-4">
                    <p className="label-overline mb-1.5">Payment</p>
                    <p className="font-body text-sm text-on-surface capitalize">{payment.replace("_", " ")}</p>
                  </div>
                </div>

                <button onClick={handlePlaceOrder} disabled={loading} className="btn-primary w-full">
                  {loading ? "Processing..." : payment === "paystack" ? ``Pay ₦${total.toLocaleString()}`` : "Place Order"}
                </button>

                <p className="font-label text-[10px] text-secondary text-center mt-4 flex items-center justify-center gap-1.5 uppercase tracking-wider">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Secured by SSL encryption
                </p>
              </div>
            )}
          </div>

          {/* Right — order summary */}
          <div className="lg:col-span-2">
            <div className="bg-surface-container-low rounded-md p-6 ghost-border sticky top-28">
              <h2 className="headline-md text-base text-on-surface mb-5">Order Summary</h2>

              <div className="space-y-3 mb-5 max-h-52 overflow-y-auto scrollbar-hide divide-y divide-outline-variant/10">
                {cart?.items?.map(item => (
                  <div key={item._id} className="flex items-center gap-3 pt-3 first:pt-0">
                    <div className="w-11 h-11 bg-surface-container rounded-sm overflow-hidden shrink-0">
                      {item.product?.images?.[0] && <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <p className="font-body text-xs text-on-surface flex-1 line-clamp-2">{item.product?.name}</p>
                    <span className="font-label text-[10px] text-secondary shrink-0">×{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-outline-variant/20 pt-4 space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="font-body text-secondary">Subtotal</span>
                  <Price amount={subtotal} className="text-sm text-on-surface" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-body text-secondary">Shipping</span>
                  {shipping === 0
                    ? <span className="font-label text-[10px] uppercase tracking-wider text-on-surface font-bold">Free</span>
                    : <Price amount={shipping} className="text-sm text-on-surface" />
                  }
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-outline-variant/20">
                  <span className="font-headline text-sm text-on-surface">Total</span>
                  <Price amount={total} className="text-base text-on-surface" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'@

# ── pages/Home/index.jsx ──
Set-Content -Path "$base\pages\Home\index.jsx" -Encoding UTF8 -Value @'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { productsApi } from "../../api/services"
import ProductCard from "../../components/ui/ProductCard"
import { Skeleton } from "../../components/ui"

const COLLECTIONS = [
  { num: "01", label: "Surveillance", name: "CCTV Systems", desc: "Cinematic clarity, 24/7 watch.", cat: "CCTV", col: "col-span-12 md:col-span-7", aspect: "aspect-[4/3]" },
  { num: "02", label: "Perimeter", name: "Alarm Systems", desc: "Instant alert, total peace.", cat: "Alarms", col: "col-span-12 md:col-span-5", aspect: "aspect-[4/3]" },
  { num: "03", label: "Access", name: "Control Systems", desc: "Who enters. You decide.", cat: "Access Control", col: "col-span-12 md:col-span-5", aspect: "aspect-[4/3]" },
  { num: "04", label: "Connected", name: "Networking", desc: "Infrastructure for the future.", cat: "Networking", col: "col-span-12 md:col-span-7", aspect: "aspect-[4/3]" },
]

const SPECS_SPOTLIGHT = [
  "4K Ultra HD Resolution",
  "AI-Powered Motion Detection",
  "Remote Monitoring — Anywhere",
  "5-Year Warranty Included",
]

export default function Home() {
  const [featured, setFeatured]   = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    productsApi.getFeatured()
      .then(res => setFeatured(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-surface text-on-surface">

      {/* ── Hero — full bleed cinematic ── */}
      <section className="relative h-[88vh] min-h-[600px] px-4 md:px-6 mb-24">
        <div className="w-full h-full rounded-md overflow-hidden relative ghost-border">
          {/* Dark editorial gradient bg (no image dependency) */}
          <div className="absolute inset-0 bg-gradient-to-br from-on-surface via-primary-container to-primary" />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />

          {/* Content */}
          <div className="absolute bottom-14 left-10 md:left-14 max-w-2xl">
            <span className="label-overline text-white/70 mb-5 block anim-fade-up">Premium Electronic Security — Nigeria</span>
            <h1 className="headline-display text-5xl md:text-8xl text-white leading-none tracking-tighter mb-8 anim-fade-up delay-1">
              SAFE.<br />SECURE.<br />CERTAIN.
            </h1>
            <div className="flex flex-wrap gap-4 anim-fade-up delay-2">
              <Link to="/products" className="bg-white text-primary px-10 py-5 rounded-sm font-headline font-bold text-xs tracking-[0.2em] uppercase hover:bg-on-primary-fixed-variant transition-all active:scale-95">
                Explore Collection
              </Link>
              <Link to="/products?isFeatured=true" className="border border-white/30 text-white px-10 py-5 rounded-sm font-headline font-bold text-xs tracking-[0.2em] uppercase hover:border-white/60 transition-all">
                View Featured
              </Link>
            </div>
          </div>

          {/* Corner stat */}
          <div className="absolute top-10 right-10 text-right hidden md:block anim-fade-up delay-3">
            <p className="font-headline font-black text-5xl text-white/20 leading-none">500+</p>
            <p className="label-overline text-white/40 mt-1">Products</p>
          </div>
        </div>
      </section>

      {/* ── Curated Collections — asymmetric grid ── */}
      <section className="container-main mb-32">
        <div className="flex justify-between items-end mb-16">
          <div className="max-w-md">
            <h2 className="headline-lg text-4xl text-on-surface mb-4 tracking-tight">CURATED SELECTIONS</h2>
            <p className="font-body text-secondary text-sm leading-relaxed">
              Professional-grade systems selected for architectural integrity and technical excellence.
            </p>
          </div>
          <Link to="/products" className="label-overline text-on-surface/60 border-b border-primary/20 pb-1 hover:border-primary hover:text-on-surface transition-colors hidden md:block">
            View All Products
          </Link>
        </div>

        <div className="asymmetric-grid">
          {COLLECTIONS.map((col, i) => (
            <Link key={col.cat} to={``/products?category=${encodeURIComponent(col.cat)}``}
              className={``${col.col} ${col.aspect} bg-surface-container-low rounded-md overflow-hidden group ghost-border anim-fade-up``}
              style={{ animationDelay: ``${i * 0.1}s`` }}>
              <div className="relative h-full w-full">
                {/* Tonal bg */}
                <div className={``absolute inset-0 ${i % 2 === 0 ? "bg-gradient-to-br from-inverse-surface/80 to-primary-container" : "bg-gradient-to-br from-primary to-primary-fixed-dim"}``} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="label-overline text-white/60 mb-2">{col.num}. {col.label}</p>
                  <h4 className="headline-lg text-2xl md:text-3xl font-bold text-white">{col.name}</h4>
                  <p className="font-body text-sm text-white/60 mt-1">{col.desc}</p>
                </div>

                {/* Arrow */}
                <div className="absolute top-8 right-8 w-9 h-9 border border-white/20 rounded-sm flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/50 transition-all duration-300">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Spotlight product — editorial feature ── */}
      <section className="bg-surface-container-low section-xl mb-20 overflow-hidden">
        <div className="container-main grid grid-cols-1 md:grid-cols-2 items-center gap-20 md:gap-28">

          {/* Image with floating accent */}
          <div className="relative">
            <div className="w-full aspect-[3/4] surface-white rounded-md p-5 ghost-border">
              <div className="w-full h-full bg-surface-container rounded-sm overflow-hidden flex items-center justify-center">
                <div className="text-center p-10">
                  <div className="w-24 h-24 bg-inverse-surface rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <p className="font-headline font-bold text-on-surface/20 text-sm tracking-widest uppercase">Product Image</p>
                </div>
              </div>
            </div>
            {/* Floating accent block */}
            <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-tertiary-container rounded-md flex items-center justify-center p-7 hidden md:flex">
              <p className="font-headline font-bold text-center text-on-tertiary-container leading-tight text-sm uppercase tracking-wide">
                PROFESSIONAL<br />GRADE
              </p>
            </div>
          </div>

          {/* Copy */}
          <div>
            <span className="label-overline text-tertiary block mb-6">Spotlight System</span>
            <h2 className="headline-lg text-4xl md:text-5xl text-on-surface mb-6 leading-tight">
              The Sentinel<br />Pro Series
            </h2>
            <p className="font-body text-secondary text-base leading-relaxed mb-10 opacity-80">
              Our flagship security ecosystem. Engineered for commercial precision, refined for residential elegance. Every component speaks the language of absolute protection.
            </p>
            <div className="space-y-4 mb-12">
              {SPECS_SPOTLIGHT.map(spec => (
                <div key={spec} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <p className="font-label text-sm uppercase tracking-wider text-on-surface-variant">{spec}</p>
                </div>
              ))}
            </div>
            <Link to="/products?category=CCTV" className="btn-primary inline-flex">
              Explore Systems
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="container-main section-xl">
        <div className="text-center mb-16">
          <h3 className="label-overline text-secondary mb-4">Handpicked</h3>
          <h2 className="headline-lg text-4xl text-on-surface">Featured Products</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-[3/4] mb-4" />
                <Skeleton className="h-3 w-1/3 mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body text-secondary mb-6">No featured products yet.</p>
            <Link to="/products" className="btn-primary inline-flex">Browse All Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {featured.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </div>
        )}
      </section>

      {/* ── Join — editorial CTA block ── */}
      <section className="container-main section-xl">
        <div className="bg-primary text-on-primary p-16 md:p-20 rounded-md text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at center, white, transparent 70%)" }} />
          <h3 className="headline-lg text-4xl md:text-5xl font-bold mb-5 relative z-10">PROTECT YOUR WORLD</h3>
          <p className="font-body text-on-primary/60 mb-10 max-w-lg mx-auto relative z-10 leading-relaxed">
            Receive exclusive access to new arrivals, security advisory content, and member-only offers.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
            <input type="email" placeholder="Email address"
              className="bg-white/10 border-0 rounded-sm px-6 py-4 flex-grow text-white placeholder:text-white/40 font-body text-sm outline-none focus:ring-1 focus:ring-white/30" />
            <button className="bg-white text-primary px-8 py-4 rounded-sm font-headline font-bold text-xs tracking-[0.2em] uppercase hover:bg-surface-variant transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

'@

# ── pages/Orders/Detail.jsx ──
Set-Content -Path "$base\pages\Orders\Detail.jsx" -Encoding UTF8 -Value @'
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ordersApi } from "../../api/services"
import { LoadingPage, Badge, Price } from "../../components/ui"
import toast from "react-hot-toast"

const STATUS_STEPS = ["pending", "processing", "shipped", "delivered"]

export default function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder]           = useState(null)
  const [loading, setLoading]       = useState(true)
  const [cancelling, setCancelling] = useState(false)

  useEffect(() => {
    ordersApi.getById(id)
      .then(res => setOrder(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const handleCancel = async () => {
    if (!confirm("Cancel this order?")) return
    try {
      setCancelling(true)
      const res = await ordersApi.cancel(id, "Customer requested cancellation")
      setOrder(res.data.data)
      toast.success("Order cancelled")
    } catch (err) { toast.error(err.response?.data?.message || "Failed to cancel") }
    finally { setCancelling(false) }
  }

  if (loading) return <LoadingPage />
  if (!order) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <p className="font-body text-secondary">Order not found.</p>
      <Link to="/orders" className="btn-primary">Back to Orders</Link>
    </div>
  )

  const stepIndex   = STATUS_STEPS.indexOf(order.orderStatus)
  const isCancelled = order.orderStatus === "cancelled"
  const canCancel   = ["pending", "processing"].includes(order.orderStatus)

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <div className="bg-surface-container-low">
        <div className="container-main py-10">
          <Link to="/orders" className="label-overline text-secondary hover:text-on-surface transition-colors block mb-4">← Back to Orders</Link>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <span className="label-overline text-tertiary block mb-2">Order #{order._id.slice(-8).toUpperCase()}</span>
              <h1 className="headline-lg text-3xl text-on-surface">Order Details</h1>
              <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-1">
                {new Date(order.createdAt).toLocaleString("en-NG", { dateStyle: "long", timeStyle: "short" })}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge status={order.orderStatus} />
              <Badge status={order.paymentStatus} />
              {canCancel && (
                <button onClick={handleCancel} disabled={cancelling}
                  className="label-overline text-error hover:text-on-surface transition-colors">
                  {cancelling ? "Cancelling..." : "Cancel Order"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-10">

        {/* Progress tracker */}
        {!isCancelled && (
          <div className="bg-surface-container-low rounded-md p-6 ghost-border mb-8">
            <p className="label-overline mb-7">Order Progress</p>
            <div className="flex items-center">
              {STATUS_STEPS.map((s, i) => (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={``w-7 h-7 flex items-center justify-center text-[10px] font-headline font-bold rounded-sm transition-all ${
                      i < stepIndex ? "bg-on-surface text-inverse-on-surface"
                      : i === stepIndex ? "bg-tertiary-container text-on-tertiary-container"
                      : "bg-surface-container-high text-secondary"
                    }``}>
                      {i < stepIndex ? "✓" : i + 1}
                    </div>
                    <span className={``font-label text-[9px] mt-2 capitalize uppercase tracking-wider ${i <= stepIndex ? "text-on-surface" : "text-secondary/50"}``}>{s}</span>
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div className={``flex-1 h-px mx-3 mb-4 transition-colors ${i < stepIndex ? "bg-on-surface" : "bg-outline-variant/30"}``} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Items */}
          <div className="md:col-span-2">
            <div className="bg-surface-container-low rounded-md ghost-border divide-y divide-outline-variant/10">
              {order.items?.map((item, i) => (
                <div key={i} className="flex gap-4 p-5">
                  <Link to={``/products/${item.product?._id}``} className="w-16 h-16 bg-surface-container rounded-md overflow-hidden shrink-0 hover:opacity-80 transition-opacity">
                    {item.product?.images?.[0] && <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="font-headline font-bold text-sm text-on-surface line-clamp-1">{item.product?.name || item.name}</p>
                    <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <Price amount={item.price * item.quantity} className="text-sm text-on-surface shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-surface-container-low rounded-md p-5 ghost-border">
              <p className="label-overline mb-4">Summary</p>
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="font-body text-secondary">Subtotal</span>
                  <Price amount={order.subtotalAmount} className="text-sm text-on-surface" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-body text-secondary">Shipping</span>
                  {order.shippingCost === 0
                    ? <span className="font-label text-[10px] uppercase tracking-wider text-on-surface font-bold">Free</span>
                    : <Price amount={order.shippingCost} className="text-sm text-on-surface" />
                  }
                </div>
                <div className="flex justify-between font-bold pt-2.5 border-t border-outline-variant/20">
                  <span className="font-headline text-sm text-on-surface">Total</span>
                  <Price amount={order.totalAmount} className="text-sm text-on-surface" />
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-md p-5 ghost-border">
              <p className="label-overline mb-3">Shipping To</p>
              <div className="font-body text-sm text-secondary space-y-0.5">
                <p>{order.shippingAddress?.street}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                <p>{order.shippingAddress?.country}</p>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-md p-5 ghost-border">
              <p className="label-overline mb-3">Payment</p>
              <p className="font-body text-sm text-on-surface capitalize">{order.paymentMethod?.replace("_", " ")}</p>
              {order.paymentReference && (
                <p className="font-label text-[9px] text-secondary mt-1.5 break-all uppercase tracking-wider">{order.paymentReference}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'@

# ── pages/Orders/index.jsx ──
Set-Content -Path "$base\pages\Orders\index.jsx" -Encoding UTF8 -Value @'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ordersApi } from "../../api/services"
import { LoadingPage, EmptyState, Badge, Price } from "../../components/ui"

export default function Orders() {
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ordersApi.getMyOrders()
      .then(res => setOrders(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingPage />

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">Account</span>
          <h1 className="headline-lg text-4xl text-on-surface">My Orders</h1>
        </div>
      </div>

      <div className="container-main py-10">
        {orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            description="Your order history will appear here once you make a purchase."
            action={<Link to="/products" className="btn-primary mt-2">Start Shopping</Link>}
          />
        ) : (
          <div className="space-y-3">
            {orders.map(order => (
              <Link key={order._id} to={``/orders/${order._id}``}
                className="block bg-surface-container-low rounded-md p-6 ghost-border hover:bg-surface-container transition-colors duration-200 group">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
                  <div>
                    <span className="label-overline text-secondary block mb-1">Order #{order._id.slice(-8).toUpperCase()}</span>
                    <p className="font-body text-xs text-secondary">
                      {new Date(order.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge status={order.orderStatus} />
                    <Badge status={order.paymentStatus} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {order.items?.slice(0, 5).map((item, i) => (
                      <div key={i} className="w-10 h-10 rounded-sm border-2 border-surface bg-surface-container overflow-hidden">
                        {item.product?.images?.[0] && <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />}
                      </div>
                    ))}
                    {order.items?.length > 5 && (
                      <div className="w-10 h-10 rounded-sm border-2 border-surface bg-surface-container-high flex items-center justify-center">
                        <span className="font-label text-[9px] text-secondary">+{order.items.length - 5}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <Price amount={order.totalAmount} className="text-sm text-on-surface" />
                    <span className="label-overline text-outline group-hover:text-tertiary transition-colors">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

'@

# ── pages/Products/Detail.jsx ──
Set-Content -Path "$base\pages\Products\Detail.jsx" -Encoding UTF8 -Value @'
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { productsApi } from "../../api/services"
import { useCart } from "../../context/CartContext"
import { useAuth } from "../../context/AuthContext"
import { useWishlist } from "../../hooks/useWishlist"
import { useRecentlyViewed } from "../../hooks/useRecentlyViewed"
import { LoadingPage, Stars, Price, Spinner } from "../../components/ui"
import ProductCard from "../../components/ui/ProductCard"
import toast from "react-hot-toast"

export default function ProductDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const { add: addRecent } = useRecentlyViewed()

  const [product, setProduct]       = useState(null)
  const [related, setRelated]       = useState([])
  const [loading, setLoading]       = useState(true)
  const [qty, setQty]               = useState(1)
  const [adding, setAdding]         = useState(false)
  const [activeImg, setActiveImg]   = useState(0)
  const [zoomPos, setZoomPos]       = useState(null)
  const [reviewRating, setReviewRating]   = useState(5)
  const [reviewComment, setReviewComment] = useState("")
  const [submitting, setSubmitting]       = useState(false)

  useEffect(() => {
    setLoading(true)
    productsApi.getById(id)
      .then(res => {
        const p = res.data.data
        setProduct(p); setActiveImg(0); addRecent(p)
        return productsApi.getAll({ category: p.category, limit: 5 })
      })
      .then(res => setRelated(res.data.data.filter(p => p._id !== id).slice(0, 4)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const handleAdd = async () => {
    if (!user) { toast.error("Sign in to add to cart"); return }
    try { setAdding(true); await addToCart(product._id, qty); toast.success("Added to cart") }
    catch (err) { toast.error(err.response?.data?.message || "Failed") }
    finally { setAdding(false) }
  }

  const handleWishlist = () => {
    toggle(product)
    toast.success(wishlisted ? "Removed from wishlist" : "Saved to wishlist")
  }

  const handleZoom = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

  const handleReview = async (e) => {
    e.preventDefault()
    if (!user) { toast.error("Sign in to leave a review"); return }
    try {
      setSubmitting(true)
      await productsApi.addReview(id, { rating: reviewRating, comment: reviewComment })
      toast.success("Review submitted")
      setReviewComment("")
      const res = await productsApi.getById(id); setProduct(res.data.data)
    } catch (err) { toast.error(err.response?.data?.message || "Failed") }
    finally { setSubmitting(false) }
  }

  if (loading) return <LoadingPage />
  if (!product) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <p className="font-body text-secondary">Product not found.</p>
      <Link to="/products" className="btn-primary">Browse Products</Link>
    </div>
  )

  const wishlisted   = isWishlisted(product._id)
  const hasDiscount  = product.discountPrice > 0
  const displayPrice = hasDiscount ? product.discountPrice : product.price
  const discount     = hasDiscount ? Math.round((1 - product.discountPrice / product.price) * 100) : 0
  const mainImage    = product.images?.[activeImg]

  return (
    <div className="bg-surface">

      {/* Breadcrumb */}
      <div className="bg-surface-container-low">
        <div className="container-main py-3 flex items-center gap-2 font-label text-[11px] text-secondary uppercase tracking-wider">
          <Link to="/" className="hover:text-on-surface transition-colors">Home</Link>
          <span className="text-outline-variant">/</span>
          <Link to="/products" className="hover:text-on-surface transition-colors">Products</Link>
          <span className="text-outline-variant">/</span>
          <Link to={``/products?category=${encodeURIComponent(product.category)}``} className="hover:text-on-surface transition-colors">{product.category}</Link>
          <span className="text-outline-variant">/</span>
          <span className="text-on-surface truncate max-w-[150px]">{product.name}</span>
        </div>
      </div>

      <div className="container-main py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24">

          {/* Images */}
          <div className="space-y-3">
            {/* Main with zoom */}
            <div
              className="relative aspect-square bg-surface-container-low rounded-md overflow-hidden cursor-crosshair group ghost-border"
              onMouseMove={handleZoom}
              onMouseLeave={() => setZoomPos(null)}
            >
              {mainImage ? (
                <>
                  <img src={mainImage} alt={product.name}
                    className={``w-full h-full object-cover transition-opacity duration-200 ${zoomPos ? "opacity-0" : "opacity-100"}``} />
                  {zoomPos && (
                    <div className="absolute inset-0"
                      style={{ backgroundImage: ``url(${mainImage})``, backgroundSize: "220%", backgroundRepeat: "no-repeat", backgroundPosition: ``${zoomPos.x}% ${zoomPos.y}%`` }} />
                  )}
                  <div className="absolute bottom-3 right-3 bg-surface-container-lowest/80 px-2.5 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-label text-[9px] uppercase tracking-wider text-secondary">Hover to zoom</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-outline-variant"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={``w-16 h-16 rounded-md overflow-hidden ghost-border transition-all duration-200 ${i === activeImg ? "ring-2 ring-on-surface" : "opacity-50 hover:opacity-80"}``}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="label-overline text-tertiary mb-4">{product.category}</span>
            <h1 className="headline-lg text-3xl md:text-4xl text-on-surface mb-5 leading-tight">{product.name}</h1>

            {product.numReviews > 0 && <div className="mb-6"><Stars rating={product.ratings} count={product.numReviews} size={13} /></div>}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-outline-variant/20">
              <Price amount={displayPrice} className="text-3xl text-on-surface" />
              {hasDiscount && (
                <div className="flex items-center gap-2">
                  <span className="price-text text-sm text-secondary line-through opacity-60">₦{Number(product.price).toLocaleString()}</span>
                  <span className="status-badge bg-tertiary-container text-on-tertiary-container">-{discount}%</span>
                </div>
              )}
            </div>

            <p className="font-body text-secondary text-sm leading-relaxed mb-8">{product.description}</p>

            {/* Meta */}
            <div className="space-y-2 mb-10 text-sm">
              {product.brand && (
                <div className="flex gap-4">
                  <span className="font-label text-secondary w-16 shrink-0 uppercase text-[11px] tracking-wider">Brand</span>
                  <span className="font-body font-medium text-on-surface">{product.brand}</span>
                </div>
              )}
              <div className="flex gap-4">
                <span className="font-label text-secondary w-16 shrink-0 uppercase text-[11px] tracking-wider">Stock</span>
                <span className={``font-body font-medium ${product.stock > 0 ? "text-on-surface" : "text-error"}``}>
                  {product.stock > 0 ? ``${product.stock} available`` : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Actions */}
            {product.stock > 0 && (
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center bg-surface-container-high rounded-sm">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-12 flex items-center justify-center text-secondary hover:text-on-surface transition-colors">−</button>
                  <span className="w-10 text-center font-label font-bold text-sm">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-10 h-12 flex items-center justify-center text-secondary hover:text-on-surface transition-colors">+</button>
                </div>
                <button onClick={handleAdd} disabled={adding} className="btn-primary flex-1">
                  {adding ? <><Spinner size="sm" className="border-on-primary/30 border-t-on-primary" /> Adding...</> : "Add to Cart"}
                </button>
                <button onClick={handleWishlist}
                  className={``w-12 h-12 flex items-center justify-center rounded-sm transition-all ${
                    wishlisted ? "bg-tertiary text-on-tertiary" : "bg-surface-container-high text-secondary hover:bg-tertiary hover:text-on-tertiary"
                  }``}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
            )}

            {/* Trust signals */}
            <div className="grid grid-cols-2 gap-3 mt-auto pt-8 border-t border-outline-variant/20">
              {[["🔒","Genuine Product"],["🚚","Fast Delivery"],["↩️","Easy Returns"],["⚙️","Pro Support"]].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className="text-base">{icon}</span>
                  <span className="font-label text-[10px] uppercase tracking-wider text-secondary">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      {product.stock > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-sm border-t border-outline-variant/20 md:hidden">
          <div className="container-main py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-label text-[10px] uppercase tracking-wider text-secondary truncate">{product.name}</p>
              <Price amount={displayPrice} className="text-sm text-on-surface" />
            </div>
            <button onClick={handleAdd} disabled={adding} className="btn-primary py-2.5 px-6 text-xs shrink-0">
              {adding ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="bg-surface-container-low">
        <div className="container-main py-16">
          <h2 className="headline-lg text-3xl text-on-surface mb-12">
            Reviews {product.numReviews > 0 && <span className="font-body font-normal text-lg text-secondary ml-2">({product.numReviews})</span>}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <div className="space-y-8">
              {product.reviews?.length === 0 && <p className="font-body text-sm text-secondary">No reviews yet. Be the first!</p>}
              {product.reviews?.map((r, i) => (
                <div key={i} className="pb-8 border-b border-outline-variant/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-headline font-semibold text-sm text-on-surface">{r.user?.fullName || "Anonymous"}</p>
                    <Stars rating={r.rating} />
                  </div>
                  <p className="font-body text-sm text-secondary leading-relaxed">{r.comment}</p>
                  <p className="font-label text-[10px] text-secondary/60 mt-2 uppercase tracking-wider">
                    {new Date(r.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              ))}
            </div>
            {user && (
              <div>
                <h3 className="headline-md text-lg text-on-surface mb-6">Write a Review</h3>
                <form onSubmit={handleReview} className="space-y-5">
                  <div>
                    <p className="label-overline mb-3">Rating</p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(n => (
                        <button type="button" key={n} onClick={() => setReviewRating(n)} className="transition-transform hover:scale-110">
                          <svg width="24" height="24" viewBox="0 0 24 24"
                            fill={n <= reviewRating ? "currentColor" : "none"}
                            stroke="currentColor" strokeWidth="1.5"
                            className={n <= reviewRating ? "text-tertiary" : "text-outline-variant"}>
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="label-overline mb-2">Comment</p>
                    <textarea value={reviewComment} onChange={e => setReviewComment(e.target.value)}
                      rows={4} required className="input-field resize-none" placeholder="Share your experience..." />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary">
                    {submitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="container-main py-16">
          <div className="flex items-end justify-between mb-10">
            <h2 className="headline-lg text-2xl text-on-surface">Related Products</h2>
            <Link to={``/products?category=${encodeURIComponent(product.category)}``} className="label-overline text-secondary hover:text-on-surface transition-colors">View all →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {related.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </div>
        </div>
      )}
    </div>
  )
}

'@

# ── pages/Products/index.jsx ──
Set-Content -Path "$base\pages\Products\index.jsx" -Encoding UTF8 -Value @'
import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import { productsApi } from "../../api/services"
import ProductCard from "../../components/ui/ProductCard"
import { LoadingPage, EmptyState, Pagination, Skeleton } from "../../components/ui"

const CATEGORIES  = ["CCTV", "Alarms", "Access Control", "Intercom", "Networking", "Other"]
const SORT_OPTIONS = [
  { label: "Newest",       value: "-createdAt" },
  { label: "Price: Low",   value: "price" },
  { label: "Price: High",  value: "-price" },
  { label: "Top Rated",    value: "-ratings" },
]
const PRICE_RANGES = [
  { label: "All Prices",    min: "", max: "" },
  { label: "Under ₦10k",    min: "", max: "10000" },
  { label: "₦10k – ₦50k",  min: "10000", max: "50000" },
  { label: "₦50k – ₦100k", min: "50000", max: "100000" },
  { label: "Over ₦100k",   min: "100000", max: "" },
]

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [total, setTotal]       = useState(0)
  const [pages, setPages]       = useState(1)
  const [loading, setLoading]   = useState(true)

  const page     = Number(searchParams.get("page")     || 1)
  const category = searchParams.get("category") || ""
  const sort     = searchParams.get("sort")     || "-createdAt"
  const search   = searchParams.get("search")   || ""
  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""
  const inStock  = searchParams.get("inStock")  || ""

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await productsApi.getAll({ page, limit: 12,
        ...(category && { category }), ...(sort && { sort }),
        ...(search && { search }), ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }), ...(inStock && { inStock: true }),
      })
      setProducts(res.data.data); setTotal(res.data.total || 0); setPages(res.data.pages || 1)
    } catch {}
    finally { setLoading(false) }
  }, [page, category, sort, search, minPrice, maxPrice, inStock])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const setParam = (key, val) => {
    const next = new URLSearchParams(searchParams)
    if (val) next.set(key, val); else next.delete(key)
    next.delete("page"); setSearchParams(next)
  }
  const setPriceRange = (min, max) => {
    const next = new URLSearchParams(searchParams)
    if (min) next.set("minPrice", min); else next.delete("minPrice")
    if (max) next.set("maxPrice", max); else next.delete("maxPrice")
    next.delete("page"); setSearchParams(next)
  }

  const activePriceLabel = PRICE_RANGES.find(r => r.min === minPrice && r.max === maxPrice)?.label || "All Prices"
  const hasFilters = category || minPrice || maxPrice || inStock || search

  return (
    <div className="bg-surface min-h-screen">

      {/* Page header — surface shift */}
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">Shop</span>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h1 className="headline-lg text-4xl text-on-surface">
              {category || "All Products"}
              {total > 0 && <span className="ml-3 font-body font-normal text-lg text-secondary">({total})</span>}
            </h1>
            <select value={sort} onChange={e => setParam("sort", e.target.value)}
              className="input-field w-auto py-2 text-xs font-label uppercase tracking-wider">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="container-main py-12">
        <div className="flex gap-12">

          {/* Sidebar — no border, tonal bg */}
          <aside className="hidden md:block w-52 shrink-0">
            <div className="space-y-10 sticky top-28">

              {/* Search */}
              <div>
                <p className="label-overline mb-3">Search</p>
                <div className="relative">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input type="text" placeholder="Search..." value={search} onChange={e => setParam("search", e.target.value)} className="input-field pl-8 py-2.5 text-xs" />
                </div>
              </div>

              {/* Category */}
              <div>
                <p className="label-overline mb-4">Category</p>
                <div className="space-y-1">
                  {["", ...CATEGORIES].map(c => (
                    <button key={c || "all"} onClick={() => setParam("category", c)}
                      className={``w-full text-left px-3 py-2 text-sm font-body rounded-sm transition-colors ${
                        c === category ? "bg-on-surface text-inverse-on-surface font-medium" : "text-secondary hover:bg-surface-container hover:text-on-surface"
                      }``}>
                      {c || "All Categories"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="label-overline mb-4">Price Range</p>
                <div className="space-y-1">
                  {PRICE_RANGES.map(r => (
                    <button key={r.label} onClick={() => setPriceRange(r.min, r.max)}
                      className={``w-full text-left px-3 py-2 text-sm font-body rounded-sm transition-colors ${
                        r.label === activePriceLabel ? "bg-on-surface text-inverse-on-surface font-medium" : "text-secondary hover:bg-surface-container hover:text-on-surface"
                      }``}>{r.label}</button>
                  ))}
                </div>
              </div>

              {/* Stock */}
              <div>
                <p className="label-overline mb-3">Availability</p>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={!!inStock} onChange={e => setParam("inStock", e.target.checked ? "true" : "")} className="w-3.5 h-3.5 accent-on-surface" />
                  <span className="font-body text-sm text-secondary">In stock only</span>
                </label>
              </div>

              {hasFilters && (
                <button onClick={() => setSearchParams({})} className="label-overline text-tertiary hover:text-on-surface transition-colors text-left">
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="aspect-[3/4] mb-4" />
                    <Skeleton className="h-2.5 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <EmptyState title="No products found" description="Try adjusting your filters or search terms."
                action={<button onClick={() => setSearchParams({})} className="btn-secondary mt-4">Clear Filters</button>} />
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-14">
                  {products.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
                </div>
                <div className="flex justify-center">
                  <Pagination page={page} pages={pages} onPageChange={p => setParam("page", p)} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

'@

# ── pages/Profile/index.jsx ──
Set-Content -Path "$base\pages\Profile\index.jsx" -Encoding UTF8 -Value @'
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { uploadApi } from "../../api/services"
import toast from "react-hot-toast"

const TABS = ["Profile", "Security"]

export default function Profile() {
  const { user } = useAuth()
  const [tab, setTab]           = useState("Profile")
  const [uploading, setUploading] = useState(false)

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploading(true)
      const fd = new FormData()
      fd.append("avatar", file)
      await uploadApi.avatar(fd)
      toast.success("Avatar updated")
    } catch { toast.error("Failed to upload") }
    finally { setUploading(false) }
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">Account</span>
          <h1 className="headline-lg text-4xl text-on-surface">My Profile</h1>
        </div>
      </div>

      <div className="container-main py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Sidebar */}
          <div className="md:col-span-1">
            {/* Avatar */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative group mb-4">
                <div className="w-20 h-20 bg-on-surface rounded-full flex items-center justify-center overflow-hidden">
                  {user?.avatar
                    ? <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                    : <span className="font-headline font-black text-2xl text-inverse-on-surface">{user?.fullName?.[0]?.toUpperCase()}</span>
                  }
                </div>
                <label className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>
              <p className="font-headline font-bold text-base text-on-surface">{user?.fullName}</p>
              <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-0.5">{user?.role}</p>
              {uploading && <p className="font-label text-[10px] text-tertiary mt-1 uppercase tracking-wider">Uploading...</p>}
            </div>

            {/* Tab nav */}
            <nav className="space-y-1">
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={``w-full text-left px-4 py-2.5 font-headline font-semibold text-sm uppercase tracking-wider rounded-sm transition-colors ${
                    tab === t ? "bg-on-surface text-inverse-on-surface" : "text-secondary hover:bg-surface-container hover:text-on-surface"
                  }``}>{t}</button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {tab === "Profile" && (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border">
                <h2 className="headline-md text-xl text-on-surface mb-7">Personal Information</h2>
                <div className="space-y-5 max-w-md">
                  <div>
                    <label className="label-overline mb-2 block">Full Name</label>
                    <input type="text" defaultValue={user?.fullName} className="input-field" />
                  </div>
                  <div>
                    <label className="label-overline mb-2 block">Email Address</label>
                    <input type="email" defaultValue={user?.email} className="input-field opacity-60" readOnly />
                  </div>
                  <div>
                    <label className="label-overline mb-2 block">Phone Number</label>
                    <input type="tel" defaultValue={user?.phone || ""} placeholder="+234 800 000 0000" className="input-field" />
                  </div>
                  <button onClick={() => toast.success("Profile updated")} className="btn-primary">Save Changes</button>
                </div>
              </div>
            )}

            {tab === "Security" && (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border">
                <h2 className="headline-md text-xl text-on-surface mb-7">Change Password</h2>
                <div className="space-y-5 max-w-md">
                  <div>
                    <label className="label-overline mb-2 block">Current Password</label>
                    <input type="password" className="input-field" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="label-overline mb-2 block">New Password</label>
                    <input type="password" className="input-field" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="label-overline mb-2 block">Confirm New Password</label>
                    <input type="password" className="input-field" placeholder="••••••••" />
                  </div>
                  <button onClick={() => toast.success("Password updated")} className="btn-primary">Update Password</button>
                </div>

                <div className="mt-10 pt-8 border-t border-outline-variant/20">
                  <p className="label-overline mb-3">Account Status</p>
                  <div className="flex items-center gap-2">
                    <span className={``status-badge ${user?.isActive ? "bg-surface-container-high text-on-surface" : "bg-error-container text-error"}``}>
                      {user?.isActive ? "Active" : "Suspended"}
                    </span>
                    <span className="status-badge bg-surface-container-high text-on-surface-variant capitalize">{user?.role}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

'@

# ── pages/Wishlist/index.jsx ──
Set-Content -Path "$base\pages\Wishlist\index.jsx" -Encoding UTF8 -Value @'
import { Link } from "react-router-dom"
import { useWishlist } from "../../hooks/useWishlist"
import { useCart } from "../../context/CartContext"
import { useAuth } from "../../context/AuthContext"
import { Price, Stars, EmptyState } from "../../components/ui"
import toast from "react-hot-toast"
import { useState } from "react"

export default function Wishlist() {
  const { items, toggle } = useWishlist()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [adding, setAdding] = useState(null)

  const handleAdd = async (product) => {
    if (!user) { toast.error("Sign in to add to cart"); return }
    try {
      setAdding(product._id)
      await addToCart(product._id, 1)
      toast.success("Added to cart")
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add")
    } finally { setAdding(null) }
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">Saved</span>
          <h1 className="headline-lg text-4xl text-on-surface">
            Wishlist {items.length > 0 && <span className="font-body font-normal text-lg text-secondary ml-2">({items.length})</span>}
          </h1>
        </div>
      </div>

      <div className="container-main py-10">
        {items.length === 0 ? (
          <EmptyState
            icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
            title="Your wishlist is empty"
            description="Save products you love and find them here later."
            action={<Link to="/products" className="btn-primary mt-2">Browse Products</Link>}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {items.map((product, idx) => {
              const hasDiscount  = product.discountPrice > 0
              const displayPrice = hasDiscount ? product.discountPrice : product.price

              return (
                <div key={product._id} className="group anim-fade-up" style={{ animationDelay: ``${idx * 0.07}s`` }}>
                  <div className="relative aspect-[3/4] bg-surface-container-low rounded-md overflow-hidden mb-4 ghost-border">
                    <Link to={``/products/${product._id}``}>
                      {product.images?.[0]
                        ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        : <div className="w-full h-full flex items-center justify-center"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-outline-variant"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
                      }
                    </Link>

                    {/* Remove */}
                    <button onClick={() => { toggle(product); toast.success("Removed from wishlist") }}
                      className="absolute top-3 right-3 w-8 h-8 bg-surface-container-lowest/90 backdrop-blur-sm text-tertiary flex items-center justify-center rounded-sm hover:bg-error-container hover:text-error transition-all opacity-0 group-hover:opacity-100">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>

                    {/* Quick add */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button onClick={() => handleAdd(product)} disabled={adding === product._id}
                        className="w-full bg-primary/90 backdrop-blur-sm text-on-primary font-headline font-bold text-[10px] tracking-[0.2em] uppercase py-3.5 hover:bg-primary transition-colors">
                        {adding === product._id ? "Adding..." : "Add to Cart"}
                      </button>
                    </div>
                  </div>

                  <div className="px-1">
                    <span className="label-overline text-tertiary block mb-1.5">{product.category}</span>
                    <Link to={``/products/${product._id}``} className="font-headline font-bold text-base text-on-surface leading-snug line-clamp-2 hover:text-primary-fixed transition-colors block mb-2.5">
                      {product.name}
                    </Link>
                    {product.numReviews > 0 && <div className="mb-2"><Stars rating={product.ratings} count={product.numReviews} /></div>}
                    <div className="flex items-center gap-2">
                      <Price amount={displayPrice} className="text-sm text-on-surface" />
                      {hasDiscount && <span className="price-text text-xs text-secondary line-through opacity-60">₦{Number(product.price).toLocaleString()}</span>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

'@

# ── routes/guards.jsx ──
Set-Content -Path "$base\routes\guards.jsx" -Encoding UTF8 -Value @'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Redirect to login if not authenticated
export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return <Outlet />
}

// Redirect to home if not admin
export function AdminRoute() {
  const { user, isAdmin, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>
  if (!user || !isAdmin) return <Navigate to="/" replace />
  return <Outlet />
}

// Redirect away if already logged in
export function GuestRoute() {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>
  if (user) return <Navigate to="/" replace />
  return <Outlet />
}

function Spinner() {
  return (
    <div className="w-6 h-6 border-2 border-ink-200 border-t-ink rounded-full animate-spin" />
  )
}

'@

Write-Host "All src files written!" -ForegroundColor Green