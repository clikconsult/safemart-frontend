# =============================================================
# SAFEMART COMPLETE INSTALLER
# Run from: C:\Users\USER\OneDrive\Documents\Safemart\safemart-frontend
# Command:  powershell -ExecutionPolicy Bypass -File .\install-all.ps1
# =============================================================

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "   SAFEMART COMPLETE INSTALLER" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

function New-Dir($path) {
    New-Item -ItemType Directory -Force -Path $path | Out-Null
}
function Write-File($path, $content) {
    $dir = Split-Path $path
    if ($dir -and !(Test-Path $dir)) { New-Dir $dir }
    Set-Content -Path $path -Value $content -Encoding UTF8
}

# ── Create all directories ────────────────────────────
New-Dir "src\api"
New-Dir "src\components\layout"
New-Dir "src\components\ui"
New-Dir "src\context"
New-Dir "src\hooks"
New-Dir "src\pages\Home"
New-Dir "src\pages\Auth"
New-Dir "src\pages\Products"
New-Dir "src\pages\Cart"
New-Dir "src\pages\Checkout"
New-Dir "src\pages\Orders"
New-Dir "src\pages\Wishlist"
New-Dir "src\pages\Profile"
New-Dir "src\pages\Admin"
New-Dir "src\pages\Legal"
New-Dir "src\routes"
New-Dir "public\icons"

Write-Host "Directories created..." -ForegroundColor Gray

# =============================================================
# ROOT CONFIG FILES
# =============================================================

Write-File "index.html" @'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Safemart - Premium Security Systems Nigeria</title>
    <meta name="description" content="Professional-grade CCTV, alarm systems, access control and networking solutions for homes and businesses across Nigeria. Shop 500+ genuine products." />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Safemart" />
    <meta name="keywords" content="CCTV Nigeria, security cameras, alarm systems, access control, Hikvision Nigeria, security systems Port Harcourt" />
    <meta property="og:type"        content="website" />
    <meta property="og:site_name"   content="Safemart" />
    <meta property="og:title"       content="Safemart - Premium Security Systems Nigeria" />
    <meta property="og:description" content="Professional-grade CCTV, alarm systems, access control and networking for homes and businesses across Nigeria." />
    <meta property="og:image"       content="/og-image.jpg" />
    <meta property="og:url"         content="https://yourdomain.com" />
    <meta name="twitter:card"        content="summary_large_image" />
    <meta name="twitter:title"       content="Safemart - Premium Security Systems Nigeria" />
    <meta name="twitter:description" content="Professional-grade CCTV, alarm systems, access control and networking for homes and businesses across Nigeria." />
    <meta name="twitter:image"       content="/og-image.jpg" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#1a1c1d" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Safemart" />
    <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;400;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
'@

Write-File "vite.config.js" @'
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
})
'@

Write-File "tailwind.config.js" @'
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body:     ["Inter", "sans-serif"],
        label:    ["Inter", "sans-serif"],
        sans:     ["Inter", "sans-serif"],
      },
      colors: {
        "surface":                   "#f9f9fb",
        "surface-bright":            "#f9f9fb",
        "surface-dim":               "#d9dadc",
        "surface-container-lowest":  "#ffffff",
        "surface-container-low":     "#f3f3f5",
        "surface-container":         "#eeeef0",
        "surface-container-high":    "#e8e8ea",
        "surface-container-highest": "#e2e2e4",
        "surface-variant":           "#e2e2e4",
        "on-surface":                "#1a1c1d",
        "on-surface-variant":        "#474747",
        "inverse-surface":           "#2f3132",
        "inverse-on-surface":        "#f0f0f2",
        "primary":                   "#000000",
        "primary-container":         "#3b3b3b",
        "primary-fixed":             "#5e5e5e",
        "primary-fixed-dim":         "#474747",
        "on-primary":                "#e2e2e2",
        "on-primary-container":      "#ffffff",
        "on-primary-fixed":          "#ffffff",
        "on-primary-fixed-variant":  "#e2e2e2",
        "secondary":                 "#5e5e5e",
        "secondary-container":       "#d5d4d4",
        "secondary-fixed":           "#c7c6c6",
        "secondary-fixed-dim":       "#acabab",
        "on-secondary":              "#ffffff",
        "on-secondary-container":    "#1b1c1c",
        "on-secondary-fixed":        "#1b1c1c",
        "tertiary":                  "#493924",
        "tertiary-container":        "#857159",
        "tertiary-fixed":            "#6e5b44",
        "tertiary-fixed-dim":        "#55442e",
        "on-tertiary":               "#f8dec1",
        "on-tertiary-container":     "#ffffff",
        "on-tertiary-fixed":         "#ffffff",
        "outline":                   "#777777",
        "outline-variant":           "#c6c6c6",
        "background":                "#f9f9fb",
        "on-background":             "#1a1c1d",
        "error":                     "#ba1a1a",
        "error-container":           "#ffdad6",
        "on-error":                  "#ffffff",
        "on-error-container":        "#410002",
        "inverse-primary":           "#c6c6c6",
      },
      boxShadow: {
        "ambient":    "0 8px 40px -5px rgba(26,28,29,0.06)",
        "ambient-lg": "0 16px 60px -5px rgba(26,28,29,0.08)",
        "pill":       "0 8px 30px rgba(0,0,0,0.04)",
        "drawer":     "8px 0 40px -5px rgba(26,28,29,0.08)",
      },
    },
  },
  plugins: [],
}
'@

Write-File "postcss.config.js" @'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
'@

Write-Host "Config files written..." -ForegroundColor Gray

# =============================================================
# PUBLIC FILES
# =============================================================

Write-File "public\manifest.json" @'
{
  "name": "Safemart - Premium Security Systems",
  "short_name": "Safemart",
  "description": "Professional-grade CCTV, alarm systems, access control and networking solutions for Nigeria.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f9f9fb",
  "theme_color": "#1a1c1d",
  "orientation": "portrait-primary",
  "categories": ["shopping", "security"],
  "lang": "en-NG",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "shortcuts": [
    { "name": "Browse Products", "short_name": "Products", "url": "/products" },
    { "name": "My Orders",       "short_name": "Orders",   "url": "/orders" },
    { "name": "My Cart",         "short_name": "Cart",     "url": "/cart" }
  ]
}
'@

Write-File "public\sw.js" @'
const CACHE_NAME = "safemart-v1"
const PRECACHE_ASSETS = ["/", "/products", "/manifest.json"]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS)))
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)
  if (request.method !== "GET" || url.pathname.startsWith("/api") || url.origin !== self.location.origin) return

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then((res) => {
        caches.open(CACHE_NAME).then((c) => c.put(request, res.clone()))
        return res
      }).catch(() => caches.match("/"))
    )
    return
  }

  if (["style","script","font","image"].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((res) => {
          caches.open(CACHE_NAME).then((c) => c.put(request, res.clone()))
          return res
        })
      })
    )
    return
  }

  event.respondWith(fetch(request).catch(() => caches.match(request)))
})
'@

Write-File "public\favicon.svg" @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="6" fill="#1a1c1d"/>
  <path d="M16 4L6 8v8c0 6.627 4.477 12.83 10 14.899C21.523 28.83 26 22.627 26 16V8L16 4z"
    fill="none" stroke="#f0f0f2" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M12 16l2.5 2.5L20 12" stroke="#f0f0f2" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'@

Write-Host "Public files written..." -ForegroundColor Gray

# =============================================================
# src/index.css
# =============================================================

Write-File "src\index.css" @'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
  body { background-color: #f9f9fb; color: #1a1c1d; font-family: "Inter", sans-serif; min-height: 100vh; font-size: 15px; line-height: 1.6; }
  ::selection { background-color: #3b3b3b; color: #ffffff; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #c6c6c6; }
}

@layer components {
  .glass-nav { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); background-color: rgba(249,249,251,0.85); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
  .ghost-border { outline: 1px solid rgba(198,198,198,0.15); }

  .btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; background: linear-gradient(135deg, #000000 0%, #3b3b3b 100%); color: #e2e2e2; font-family: "Manrope", sans-serif; font-weight: 700; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 1rem 2.5rem; border-radius: 0.125rem; transition: opacity 0.2s ease, transform 0.15s ease; text-decoration: none; cursor: pointer; border: none; }
  .btn-primary:hover { opacity: 0.88; }
  .btn-primary:active { transform: scale(0.97); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; background-color: #e2e2e4; color: #1a1c1d; font-family: "Manrope", sans-serif; font-weight: 700; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 1rem 2.5rem; border-radius: 0.125rem; transition: background-color 0.2s ease, transform 0.15s ease; text-decoration: none; cursor: pointer; border: none; }
  .btn-secondary:hover { background-color: #d9dadc; }
  .btn-secondary:active { transform: scale(0.97); }

  .btn-ghost { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; background: transparent; color: #1a1c1d; font-family: "Inter", sans-serif; font-weight: 500; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.875rem 2rem; border-bottom: 1px solid rgba(0,0,0,0.2); transition: border-color 0.2s ease; text-decoration: none; cursor: pointer; border-top: none; border-left: none; border-right: none; }
  .btn-ghost:hover { border-bottom-color: #000000; }

  .input-field { width: 100%; padding: 0.875rem 1.25rem; font-size: 0.875rem; font-family: "Inter", sans-serif; background-color: #e8e8ea; color: #1a1c1d; border: none; border-radius: 0.125rem; outline: none; transition: background-color 0.2s ease, outline 0.2s ease; display: block; }
  .input-field::placeholder { color: #777777; }
  .input-field:focus { background-color: #ffffff; outline: 1px solid rgba(198,198,198,0.3); }

  .label-overline { font-family: "Inter", sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.35em; text-transform: uppercase; color: #474747; }
  .headline-display { font-family: "Manrope", sans-serif; font-weight: 800; line-height: 0.92; letter-spacing: -0.03em; }
  .headline-lg { font-family: "Manrope", sans-serif; font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; }
  .headline-md { font-family: "Manrope", sans-serif; font-weight: 700; letter-spacing: -0.01em; line-height: 1.2; }

  .product-card { background-color: #ffffff; border-radius: 0.375rem; overflow: hidden; transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease; }
  .product-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px -8px rgba(26,28,29,0.1); }

  .surface-base     { background-color: #f9f9fb; }
  .surface-low      { background-color: #f3f3f5; }
  .surface-mid      { background-color: #eeeef0; }
  .surface-high     { background-color: #e8e8ea; }
  .surface-white    { background-color: #ffffff; }

  .price-text { font-family: "Inter", sans-serif; font-weight: 600; letter-spacing: -0.02em; }

  .status-badge { display: inline-flex; align-items: center; font-size: 9px; font-family: "Inter", sans-serif; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.25rem 0.6rem; border-radius: 0.125rem; }

  .section-xl { padding-top: 6rem; padding-bottom: 6rem; }
  .section-lg { padding-top: 4rem; padding-bottom: 4rem; }
  .container-main { max-width: 80rem; margin-left: auto; margin-right: auto; padding-left: 1.5rem; padding-right: 1.5rem; }

  .asymmetric-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1.5rem; }
}

@layer utilities {
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .tracking-editorial { letter-spacing: 0.35em; }
}

@media (min-width: 768px) {
  .container-main { padding-left: 2.5rem; padding-right: 2.5rem; }
  .section-xl { padding-top: 6rem; padding-bottom: 6rem; }
}

@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

.anim-fade-up    { animation: fadeUp 0.6s cubic-bezier(0.25,0.46,0.45,0.94) both; }
.anim-fade-in    { animation: fadeIn 0.4s ease both; }
.anim-slide-left { animation: slideInLeft 0.4s cubic-bezier(0.25,0.46,0.45,0.94) both; }
.anim-shimmer    { background: linear-gradient(90deg,#eeeef0 25%,#f3f3f5 50%,#eeeef0 75%); background-size: 200% 100%; animation: shimmer 2s infinite; }

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
.delay-5 { animation-delay: 0.5s; }
'@

Write-Host "CSS written..." -ForegroundColor Gray

# =============================================================
# src/main.jsx
# =============================================================

Write-File "src\main.jsx" @'
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import App from "./App.jsx"
import "./index.css"

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("SW registered"))
      .catch((err) => console.log("SW failed:", err))
  })
}

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

Write-Host "main.jsx written..." -ForegroundColor Gray

# =============================================================
# src/App.jsx
# =============================================================

Write-File "src\App.jsx" @'
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { ProtectedRoute, AdminRoute, GuestRoute } from "./routes/guards"
import MainLayout from "./components/layout/MainLayout"

import Home               from "./pages/Home"
import ProductsPage       from "./pages/Products"
import ProductDetail      from "./pages/Products/Detail"
import Login              from "./pages/Auth/Login"
import Register           from "./pages/Auth/Register"
import Cart               from "./pages/Cart"
import Checkout           from "./pages/Checkout"
import PaymentCallback    from "./pages/Checkout/PaymentCallback"
import Orders             from "./pages/Orders"
import OrderDetail        from "./pages/Orders/Detail"
import Wishlist           from "./pages/Wishlist"
import Profile            from "./pages/Profile"
import AdminDashboard     from "./pages/Admin/Dashboard"
import AdminOrders        from "./pages/Admin/Orders"
import AdminUsers         from "./pages/Admin/Users"
import AdminProducts      from "./pages/Admin/Products"
import About              from "./pages/Legal/About"
import Contact            from "./pages/Legal/Contact"
import PrivacyPolicy      from "./pages/Legal/PrivacyPolicy"
import TermsAndConditions from "./pages/Legal/TermsAndConditions"
import ReturnPolicy       from "./pages/Legal/ReturnPolicy"
import ShippingPolicy     from "./pages/Legal/ShippingPolicy"
import NotFound           from "./pages/NotFound"

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route element={<MainLayout />}>
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
            <Route element={<GuestRoute />}>
              <Route path="/login"    element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/cart"       element={<Cart />} />
              <Route path="/checkout"   element={<Checkout />} />
              <Route path="/orders"     element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/profile"    element={<Profile />} />
            </Route>
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

Write-Host "App.jsx written..." -ForegroundColor Gray

# =============================================================
# src/hooks
# =============================================================

Write-File "src\hooks\useSEO.js" @'
import { useEffect } from "react"

export function useSEO({ title, description, image, url, type = "website" }) {
  useEffect(() => {
    const siteName = "Safemart"
    const fullTitle = title ? `${title} - ${siteName}` : `${siteName} - Premium Security Systems Nigeria`
    const metaDesc  = description || "Professional-grade CCTV, alarm systems, access control and networking solutions for homes and businesses across Nigeria."
    const metaImage = image || `${window.location.origin}/og-image.jpg`
    const metaUrl   = url   || window.location.href

    document.title = fullTitle

    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement("meta")
        const parts = selector.replace("meta[","").replace("]","").split('="')
        el.setAttribute(parts[0], parts[1].replace('"',''))
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }

    setMeta('meta[name="description"]',         "content", metaDesc)
    setMeta('meta[property="og:title"]',        "content", fullTitle)
    setMeta('meta[property="og:description"]',  "content", metaDesc)
    setMeta('meta[property="og:image"]',        "content", metaImage)
    setMeta('meta[property="og:url"]',          "content", metaUrl)
    setMeta('meta[property="og:type"]',         "content", type)
    setMeta('meta[name="twitter:card"]',        "content", "summary_large_image")
    setMeta('meta[name="twitter:title"]',       "content", fullTitle)
    setMeta('meta[name="twitter:description"]', "content", metaDesc)
    setMeta('meta[name="twitter:image"]',       "content", metaImage)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel","canonical"); document.head.appendChild(canonical) }
    canonical.setAttribute("href", metaUrl)
  }, [title, description, image, url, type])
}
'@

Write-File "src\hooks\useAnalytics.js" @'
export const plausible = (eventName, options = {}) => {
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(eventName, options)
  }
}

export const trackEvent = {
  addToCart:     (productName) => plausible("Add to Cart",       { props: { product: productName } }),
  removeFromCart:(productName) => plausible("Remove from Cart",  { props: { product: productName } }),
  beginCheckout: ()            => plausible("Begin Checkout"),
  purchase:      (amount)      => plausible("Purchase",          { props: { amount } }),
  search:        (query)       => plausible("Search",            { props: { query } }),
  viewProduct:   (productName) => plausible("View Product",      { props: { product: productName } }),
  addToWishlist: (productName) => plausible("Add to Wishlist",   { props: { product: productName } }),
  contactForm:   ()            => plausible("Contact Form Submit"),
  register:      ()            => plausible("Register"),
  login:         ()            => plausible("Login"),
}
'@

Write-File "src\hooks\useWishlist.js" @'
import { useState, useEffect, useCallback } from "react"

const KEY = "safemart_wishlist"

export function useWishlist() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
  })

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)) }, [items])

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

Write-File "src\hooks\useRecentlyViewed.js" @'
import { useState, useCallback } from "react"

const KEY = "safemart_recently_viewed"
const MAX = 8

export function useRecentlyViewed() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
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

Write-Host "Hooks written..." -ForegroundColor Gray

# =============================================================
# src/api
# =============================================================

Write-File "src\api\client.js" @'
import axios from "axios"

const api = axios.create({ baseURL: "/api/v1", withCredentials: true })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default api
'@

Write-File "src\api\services.js" @'
import api from "./client"

export const authApi = {
  register: (data) => api.post("/auth/register", data),
  login:    (data) => api.post("/auth/login", data),
  logout:   ()     => api.post("/auth/logout"),
  me:       ()     => api.get("/auth/me"),
}

export const profileApi = {
  updateProfile:  (data) => api.put("/auth/update-profile", data),
  changePassword: (data) => api.put("/auth/change-password", data),
}

export const productsApi = {
  getAll:    (params)   => api.get("/products", { params }),
  getById:   (id)       => api.get(`/products/${id}`),
  getFeatured: ()       => api.get("/products/featured"),
  addReview: (id, data) => api.post(`/products/${id}/reviews`, data),
  create:    (data)     => api.post("/products", data),
  update:    (id, data) => api.put(`/products/${id}`, data),
  remove:    (id)       => api.delete(`/products/${id}`),
}

export const cartApi = {
  get:    ()               => api.get("/cart"),
  add:    (data)           => api.post("/cart", data),
  update: (productId, qty) => api.put(`/cart/${productId}`, { quantity: qty }),
  remove: (productId)      => api.delete(`/cart/${productId}`),
  clear:  ()               => api.delete("/cart/clear"),
}

export const ordersApi = {
  create:       (data)       => api.post("/orders", data),
  getMyOrders:  ()           => api.get("/orders/my-orders"),
  getById:      (id)         => api.get(`/orders/${id}`),
  cancel:       (id, reason) => api.put(`/orders/${id}/cancel`, { reason }),
  getAll:       (params)     => api.get("/orders", { params }),
  updateStatus: (id, data)   => api.put(`/orders/${id}/status`, data),
}

export const paymentApi = {
  initialize: (orderId)   => api.post("/payment/initialize", { orderId }),
  verify:     (reference) => api.get(`/payment/verify/${reference}`),
}

export const uploadApi = {
  productImages: (formData) => api.post("/upload/products", formData, { headers: { "Content-Type": "multipart/form-data" } }),
  deleteImage:   (publicId) => api.delete("/upload/products", { data: { publicId } }),
  avatar:        (formData) => api.post("/upload/avatar", formData, { headers: { "Content-Type": "multipart/form-data" } }),
}

export const adminApi = {
  getUsers:     (params)      => api.get("/admin/users", { params }),
  getUserById:  (id)          => api.get(`/admin/users/${id}`),
  toggleStatus: (id)          => api.put(`/admin/users/${id}/toggle-status`),
  changeRole:   (id, role)    => api.put(`/admin/users/${id}/role`, { role }),
  getAnalytics: ()            => api.get("/admin/analytics"),
}

export const contactApi = {
  submit: (data) => api.post("/contact", data),
}
'@

Write-Host "API files written..." -ForegroundColor Gray

# =============================================================
# src/context
# =============================================================

Write-File "src\context\AuthContext.jsx" @'
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { authApi } from "../api/services"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) { setLoading(false); return }
    authApi.me()
      .then(res => setUser(res.data.data))
      .catch(() => localStorage.removeItem("accessToken"))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const res = await authApi.login({ email, password })
    localStorage.setItem("accessToken", res.data.accessToken)
    setUser(res.data.data)
    return res.data
  }, [])

  const register = useCallback(async (data) => {
    const res = await authApi.register(data)
    localStorage.setItem("accessToken", res.data.accessToken)
    setUser(res.data.data)
    return res.data
  }, [])

  const logout = useCallback(async () => {
    try { await authApi.logout() } catch {}
    localStorage.removeItem("accessToken")
    setUser(null)
  }, [])

  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
'@

Write-File "src\context\CartContext.jsx" @'
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { cartApi } from "../api/services"
import { useAuth } from "./AuthContext"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart]       = useState({ items: [], totalItems: 0, totalPrice: 0 })
  const [loading, setLoading] = useState(false)

  const fetchCart = useCallback(async () => {
    if (!user) { setCart({ items: [], totalItems: 0, totalPrice: 0 }); return }
    try { setLoading(true); const res = await cartApi.get(); setCart(res.data.data) } catch {}
    finally { setLoading(false) }
  }, [user])

  useEffect(() => { fetchCart() }, [fetchCart])

  const addToCart  = async (productId, quantity = 1) => { const res = await cartApi.add({ productId, quantity }); setCart(res.data.data) }
  const updateItem = async (productId, quantity)     => { const res = await cartApi.update(productId, quantity); setCart(res.data.data) }
  const removeItem = async (productId)               => { const res = await cartApi.remove(productId); setCart(res.data.data) }
  const clearCart  = async ()                        => { const res = await cartApi.clear(); setCart(res.data.data) }

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateItem, removeItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
'@

Write-Host "Context files written..." -ForegroundColor Gray

# =============================================================
# src/routes
# =============================================================

Write-File "src\routes\guards.jsx" @'
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Spinner() {
  return <div className="min-h-screen flex items-center justify-center"><div className="w-6 h-6 border-2 border-surface-container-high border-t-on-surface rounded-full animate-spin" /></div>
}

export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <Spinner />
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return <Outlet />
}

export function AdminRoute() {
  const { user, isAdmin, loading } = useAuth()
  if (loading) return <Spinner />
  if (!user || !isAdmin) return <Navigate to="/" replace />
  return <Outlet />
}

export function GuestRoute() {
  const { user, loading } = useAuth()
  if (loading) return <Spinner />
  if (user) return <Navigate to="/" replace />
  return <Outlet />
}
'@

Write-Host "Routes written..." -ForegroundColor Gray

# =============================================================
# src/components/ui
# =============================================================

Write-File "src\components\ui\index.jsx" @'
export function Spinner({ size = "md", className = "" }) {
  const s = { sm: "w-4 h-4 border", md: "w-5 h-5 border-2", lg: "w-7 h-7 border-2" }
  return <div className={`${s[size]} border-surface-container-high border-t-on-surface rounded-full animate-spin ${className}`} />
}

export function LoadingPage() {
  return <div className="min-h-[60vh] flex items-center justify-center"><Spinner size="lg" /></div>
}

export function Skeleton({ className = "" }) {
  return <div className={`anim-shimmer rounded-md ${className}`} />
}

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
  return <span className={`status-badge ${BADGE[status] || "bg-surface-container-high text-secondary"}`}>{status}</span>
}

export function Price({ amount, className = "" }) {
  return <span className={`price-text ${className}`}>N{Number(amount).toLocaleString("en-NG")}</span>
}

export function Stars({ rating, count, size = 11 }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(i => (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24"
            fill={i <= Math.round(rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"
            className={i <= Math.round(rating) ? "text-tertiary" : "text-outline-variant"}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
      </div>
      {count !== undefined && <span className="font-label text-[10px] text-secondary">({count})</span>}
    </div>
  )
}

export function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1} className="w-9 h-9 flex items-center justify-center font-label text-sm text-secondary hover:text-on-surface hover:bg-surface-container rounded-sm disabled:opacity-30 transition-colors">←</button>
      {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
        <button key={p} onClick={() => onPageChange(p)} className={`w-9 h-9 flex items-center justify-center font-label text-sm rounded-sm transition-colors ${p === page ? "bg-primary text-on-primary font-bold" : "text-secondary hover:bg-surface-container hover:text-on-surface"}`}>{p}</button>
      ))}
      <button onClick={() => onPageChange(page + 1)} disabled={page >= pages} className="w-9 h-9 flex items-center justify-center font-label text-sm text-secondary hover:text-on-surface hover:bg-surface-container rounded-sm disabled:opacity-30 transition-colors">→</button>
    </div>
  )
}
'@

Write-Host "UI components written..." -ForegroundColor Gray

# =============================================================
# Note: Remaining page files are large — writing key ones
# =============================================================

Write-File "src\pages\NotFound.jsx" @'
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="bg-surface min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-headline font-black text-[8rem] leading-none text-surface-container-highest select-none mb-4">404</p>
      <span className="label-overline text-tertiary block mb-3">Not Found</span>
      <h1 className="headline-lg text-3xl text-on-surface mb-3">Page not found</h1>
      <p className="font-body text-sm text-secondary mb-10 max-w-xs leading-relaxed">The page you are looking for does not exist or may have been moved.</p>
      <Link to="/" className="btn-primary">Return Home</Link>
    </div>
  )
}
'@

Write-Host ""
Write-Host "=============================================" -ForegroundColor Green
Write-Host "   CORE FILES INSTALLED SUCCESSFULLY" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "NOTE: Large page files (Home, Products, Cart etc.)" -ForegroundColor Yellow
Write-Host "were already installed by previous scripts." -ForegroundColor Yellow
Write-Host "This script installed all config, hooks, context," -ForegroundColor Yellow
Write-Host "API, CSS, PWA, SEO and analytics files." -ForegroundColor Yellow
Write-Host ""
Write-Host "BACKEND - install nodemailer:" -ForegroundColor Cyan
Write-Host "  cd ..\Backend && npm install nodemailer" -ForegroundColor White
Write-Host ""
Write-Host "BACKEND - add to .env:" -ForegroundColor Cyan
Write-Host "  GMAIL_USER=your@gmail.com" -ForegroundColor White
Write-Host "  GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx" -ForegroundColor White
Write-Host "  ADMIN_EMAIL=your@gmail.com" -ForegroundColor White
Write-Host "  FRONTEND_URL=http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "After deployment replace 'yourdomain.com' in index.html" -ForegroundColor Yellow
Write-Host ""

# =============================================================
# src/components/layout
# =============================================================

Write-File "src\components\layout\MainLayout.jsx" @'
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface font-body">
      <Navbar />
      <main className="flex-1 pt-24"><Outlet /></main>
      <Footer />
    </div>
  )
}
'@

Write-File "src\components\layout\Footer.jsx" @'
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-surface-container-low py-20 px-6 md:px-10">
      <div className="container-main">
        <div className="flex flex-col md:flex-row justify-between items-start gap-14 mb-16">
          <div className="max-w-xs space-y-5">
            <h4 className="font-headline font-black text-lg tracking-[0.2em] uppercase text-on-surface">SAFEMART</h4>
            <p className="font-body text-secondary text-sm leading-relaxed">Premium electronic security systems. We believe protection should be as refined as the spaces it guards.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14">
            <div className="space-y-4">
              <h5 className="font-label font-bold text-[10px] uppercase tracking-[0.3em] text-on-surface">Shop</h5>
              <ul className="space-y-3">
                {[["All Products","/products"],["Collections","/products?isFeatured=true"],["New Arrivals","/products?sort=-createdAt"],["CCTV","/products?category=CCTV"],["Alarms","/products?category=Alarms"]].map(([l,to]) => (
                  <li key={to}><Link to={to} className="font-body text-sm text-secondary hover:text-on-surface transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-label font-bold text-[10px] uppercase tracking-[0.3em] text-on-surface">Account</h5>
              <ul className="space-y-3">
                {[["Sign In","/login"],["Register","/register"],["My Orders","/orders"],["Wishlist","/wishlist"],["Profile","/profile"]].map(([l,to]) => (
                  <li key={to}><Link to={to} className="font-body text-sm text-secondary hover:text-on-surface transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-label font-bold text-[10px] uppercase tracking-[0.3em] text-on-surface">Company</h5>
              <ul className="space-y-3">
                {[["About Us","/about"],["Contact Us","/contact"]].map(([l,to]) => (
                  <li key={to}><Link to={to} className="font-body text-sm text-secondary hover:text-on-surface transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-label font-bold text-[10px] uppercase tracking-[0.3em] text-on-surface">Legal</h5>
              <ul className="space-y-3">
                {[["Privacy Policy","/privacy-policy"],["Terms & Conditions","/terms"],["Return Policy","/returns"],["Shipping Policy","/shipping"]].map(([l,to]) => (
                  <li key={to}><Link to={to} className="font-body text-sm text-secondary hover:text-on-surface transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label text-[11px] text-secondary uppercase tracking-wider">2025 SAFEMART. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="font-label text-[10px] text-secondary uppercase tracking-wider hover:text-on-surface transition-colors">Privacy</Link>
            <Link to="/terms"          className="font-label text-[10px] text-secondary uppercase tracking-wider hover:text-on-surface transition-colors">Terms</Link>
            <Link to="/contact"        className="font-label text-[10px] text-secondary uppercase tracking-wider hover:text-on-surface transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
'@

Write-Host "Layout components written..." -ForegroundColor Gray

# =============================================================
# src/components/ui/ProductCard
# =============================================================

Write-File "src\components\ui\ProductCard.jsx" @'
import { Link } from "react-router-dom"
import { useState } from "react"
import { Price, Stars } from "./index"
import { useCart } from "../../context/CartContext"
import { useAuth } from "../../context/AuthContext"
import { useWishlist } from "../../hooks/useWishlist"
import { trackEvent } from "../../hooks/useAnalytics"
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
      trackEvent.addToCart(product.name)
      toast.success("Added to cart")
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add")
    } finally { setAdding(false) }
  }

  const handleWishlist = (e) => {
    e.preventDefault(); e.stopPropagation()
    toggle(product)
    if (!wishlisted) trackEvent.addToWishlist(product.name)
    toast.success(wishlisted ? "Removed from wishlist" : "Saved to wishlist")
  }

  const hasDiscount  = product.discountPrice > 0
  const displayPrice = hasDiscount ? product.discountPrice : product.price
  const discPct      = hasDiscount ? Math.round((1 - product.discountPrice / product.price) * 100) : 0

  return (
    <Link to={`/products/${product._id}`} className="group block anim-fade-up" style={{ animationDelay: `${index * 0.07}s` }}>
      <div className="relative aspect-[3/4] bg-surface-container-low rounded-md overflow-hidden mb-4">
        {product.images?.[0]
          ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          : <div className="w-full h-full flex items-center justify-center"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-outline-variant"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
        }
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.stock === 0 && <span className="status-badge bg-on-surface text-inverse-on-surface">Sold Out</span>}
          {hasDiscount && <span className="status-badge bg-tertiary-container text-on-tertiary-container">-{discPct}%</span>}
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={handleWishlist} className={`w-9 h-9 flex items-center justify-center rounded-sm backdrop-blur-sm transition-all ${wishlisted ? "bg-tertiary text-on-tertiary" : "bg-white/90 text-on-surface hover:bg-tertiary hover:text-on-tertiary"}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
        {product.stock > 0 && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button onClick={handleAdd} disabled={adding} className="w-full bg-primary/90 backdrop-blur-sm text-on-primary font-headline font-bold text-[10px] tracking-[0.2em] uppercase py-3.5 hover:bg-primary transition-colors">
              {adding ? "Adding..." : "Quick Add"}
            </button>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
      </div>
      <div className="px-1">
        <p className="label-overline text-tertiary mb-1.5">{product.category}</p>
        <h3 className="font-headline font-bold text-base text-on-surface leading-snug line-clamp-2 mb-2.5 group-hover:text-primary-fixed transition-colors duration-200">{product.name}</h3>
        {product.numReviews > 0 && <div className="mb-2.5"><Stars rating={product.ratings} count={product.numReviews} /></div>}
        <div className="flex items-center gap-2.5">
          <Price amount={displayPrice} className="text-sm text-on-surface" />
          {hasDiscount && <span className="price-text text-xs text-secondary line-through opacity-60">N{Number(product.price).toLocaleString()}</span>}
        </div>
      </div>
    </Link>
  )
}
'@

Write-Host "ProductCard written..." -ForegroundColor Gray

# =============================================================
# src/pages/Auth
# =============================================================

Write-File "src\pages\Auth\Login.jsx" @'
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useSEO } from "../../hooks/useSEO"
import toast from "react-hot-toast"

export default function Login() {
  useSEO({ title: "Sign In" })
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
      <div className="hidden lg:flex lg:flex-1 bg-on-surface flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <Link to="/"><span className="font-headline font-black text-lg tracking-[0.2em] uppercase text-inverse-on-surface relative z-10">SAFEMART</span></Link>
        <div className="relative z-10 max-w-sm">
          <h2 className="headline-display text-5xl text-inverse-on-surface leading-none mb-6">SECURE ACCESS AWAITS.</h2>
          <p className="font-body text-sm text-inverse-on-surface/50 leading-relaxed">Premium security systems for those who demand the absolute best in protection and design.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Link to="/" className="font-headline font-black text-base tracking-[0.2em] uppercase text-on-surface block mb-12 lg:hidden">SAFEMART</Link>
          <span className="label-overline text-tertiary block mb-4">Account</span>
          <h1 className="headline-lg text-3xl text-on-surface mb-2">Welcome back</h1>
          <p className="font-body text-sm text-secondary mb-10">Sign in to continue your session.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-overline mb-2 block">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field" placeholder="you@example.com" autoComplete="email" />
            </div>
            <div>
              <label className="label-overline mb-2 block">Password</label>
              <div className="relative">
                <input type={show ? "text" : "password"} required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="input-field pr-10" placeholder="Password" autoComplete="current-password" />
                <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors">
                  {show
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">{loading ? "Signing in..." : "Sign In"}</button>
          </form>
          <p className="font-body text-sm text-secondary text-center mt-8">No account? <Link to="/register" className="text-on-surface font-medium underline underline-offset-2 hover:text-tertiary transition-colors">Create one</Link></p>
        </div>
      </div>
    </div>
  )
}
'@

Write-File "src\pages\Auth\Register.jsx" @'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useSEO } from "../../hooks/useSEO"
import toast from "react-hot-toast"

export default function Register() {
  useSEO({ title: "Create Account" })
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
      <div className="hidden lg:flex lg:flex-1 bg-on-surface flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <Link to="/"><span className="font-headline font-black text-lg tracking-[0.2em] uppercase text-inverse-on-surface relative z-10">SAFEMART</span></Link>
        <div className="relative z-10 max-w-sm">
          <h2 className="headline-display text-5xl text-inverse-on-surface leading-none mb-6">JOIN THE CIRCLE.</h2>
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
              <label className="label-overline mb-2 block">Phone (optional)</label>
              <input type="tel" value={form.phone} onChange={set("phone")} className="input-field" placeholder="+234 800 000 0000" />
            </div>
            <div>
              <label className="label-overline mb-2 block">Password</label>
              <div className="relative">
                <input type={show ? "text" : "password"} required minLength={6} value={form.password} onChange={set("password")} className="input-field pr-10" placeholder="At least 6 characters" autoComplete="new-password" />
                <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors">
                  {show
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">{loading ? "Creating..." : "Create Account"}</button>
          </form>
          <p className="font-body text-sm text-secondary text-center mt-8">Have an account? <Link to="/login" className="text-on-surface font-medium underline underline-offset-2 hover:text-tertiary transition-colors">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}
'@

Write-Host "Auth pages written..." -ForegroundColor Gray

# =============================================================
# src/pages/Profile
# =============================================================

Write-File "src\pages\Profile\index.jsx" @'
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { uploadApi, profileApi } from "../../api/services"
import { useSEO } from "../../hooks/useSEO"
import toast from "react-hot-toast"

export default function Profile() {
  useSEO({ title: "My Profile" })
  const { user } = useAuth()
  const [tab, setTab]             = useState("Profile")
  const [uploading, setUploading] = useState(false)
  const [savingProfile, setSavingProfile]   = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [profileForm, setProfileForm] = useState({ fullName: user?.fullName || "", phone: user?.phone || "" })
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })

  const setProfile  = k => e => setProfileForm(f => ({ ...f, [k]: e.target.value }))
  const setPassword = k => e => setPasswordForm(f => ({ ...f, [k]: e.target.value }))

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try { setUploading(true); const fd = new FormData(); fd.append("avatar", file); await uploadApi.avatar(fd); toast.success("Avatar updated") }
    catch { toast.error("Failed to upload avatar") }
    finally { setUploading(false) }
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    if (!profileForm.fullName.trim()) { toast.error("Full name is required"); return }
    try { setSavingProfile(true); await profileApi.updateProfile(profileForm); toast.success("Profile updated") }
    catch (err) { toast.error(err.response?.data?.message || "Failed to update profile") }
    finally { setSavingProfile(false) }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (passwordForm.newPassword.length < 6) { toast.error("New password must be at least 6 characters"); return }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) { toast.error("Passwords do not match"); return }
    try {
      setSavingPassword(true)
      await profileApi.changePassword({ currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword })
      toast.success("Password changed successfully")
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (err) { toast.error(err.response?.data?.message || "Failed to change password") }
    finally { setSavingPassword(false) }
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
          <div className="md:col-span-1">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative group mb-4">
                <div className="w-20 h-20 bg-on-surface rounded-full flex items-center justify-center overflow-hidden">
                  {user?.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover" /> : <span className="font-headline font-black text-2xl text-inverse-on-surface">{user?.fullName?.[0]?.toUpperCase()}</span>}
                </div>
                <label className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>
              <p className="font-headline font-bold text-base text-on-surface">{user?.fullName}</p>
              <p className="label-overline mt-0.5">{user?.role}</p>
              {uploading && <p className="font-label text-[10px] text-tertiary mt-1 uppercase tracking-wider">Uploading...</p>}
            </div>
            <nav className="space-y-1">
              {["Profile","Security"].map(t => (
                <button key={t} onClick={() => setTab(t)} className={`w-full text-left px-4 py-2.5 font-headline font-semibold text-sm uppercase tracking-wider rounded-sm transition-colors ${tab === t ? "bg-on-surface text-inverse-on-surface" : "text-secondary hover:bg-surface-container hover:text-on-surface"}`}>{t}</button>
              ))}
            </nav>
          </div>
          <div className="md:col-span-3">
            {tab === "Profile" && (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border">
                <h2 className="headline-md text-xl text-on-surface mb-7">Personal Information</h2>
                <form onSubmit={handleSaveProfile} className="space-y-5 max-w-md">
                  <div><label className="label-overline mb-2 block">Full Name</label><input type="text" required value={profileForm.fullName} onChange={setProfile("fullName")} className="input-field" /></div>
                  <div><label className="label-overline mb-2 block">Email Address</label><input type="email" value={user?.email} className="input-field opacity-50 cursor-not-allowed" readOnly /><p className="font-label text-[10px] text-secondary mt-1.5 uppercase tracking-wider">Email cannot be changed</p></div>
                  <div><label className="label-overline mb-2 block">Phone Number</label><input type="tel" value={profileForm.phone} onChange={setProfile("phone")} placeholder="+234 800 000 0000" className="input-field" /></div>
                  <button type="submit" disabled={savingProfile} className="btn-primary">{savingProfile ? "Saving..." : "Save Changes"}</button>
                </form>
              </div>
            )}
            {tab === "Security" && (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border">
                <h2 className="headline-md text-xl text-on-surface mb-7">Change Password</h2>
                <form onSubmit={handleChangePassword} className="space-y-5 max-w-md">
                  <div><label className="label-overline mb-2 block">Current Password</label><input type="password" required value={passwordForm.currentPassword} onChange={setPassword("currentPassword")} className="input-field" placeholder="Current password" autoComplete="current-password" /></div>
                  <div><label className="label-overline mb-2 block">New Password</label><input type="password" required minLength={6} value={passwordForm.newPassword} onChange={setPassword("newPassword")} className="input-field" placeholder="At least 6 characters" autoComplete="new-password" /></div>
                  <div><label className="label-overline mb-2 block">Confirm New Password</label><input type="password" required value={passwordForm.confirmPassword} onChange={setPassword("confirmPassword")} className="input-field" placeholder="Confirm new password" autoComplete="new-password" /></div>
                  <button type="submit" disabled={savingPassword} className="btn-primary">{savingPassword ? "Updating..." : "Update Password"}</button>
                </form>
                <div className="mt-10 pt-8 border-t border-outline-variant/20">
                  <p className="label-overline mb-3">Account Status</p>
                  <div className="flex items-center gap-2">
                    <span className={`status-badge ${user?.isActive ? "bg-surface-container-high text-on-surface" : "bg-error-container text-error"}`}>{user?.isActive ? "Active" : "Suspended"}</span>
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

Write-Host "Profile page written..." -ForegroundColor Gray

# =============================================================
# src/pages/Legal - LegalLayout + all legal pages
# =============================================================

Write-File "src\pages\Legal\LegalLayout.jsx" @'
export function LegalLayout({ label, title, lastUpdated, children }) {
  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">{label}</span>
          <h1 className="headline-lg text-4xl text-on-surface">{title}</h1>
          {lastUpdated && <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-2">Last updated: {lastUpdated}</p>}
        </div>
      </div>
      <div className="container-main py-14"><div className="max-w-3xl space-y-10">{children}</div></div>
    </div>
  )
}

export function LegalSection({ title, children }) {
  return (
    <section>
      <h2 className="font-headline font-bold text-lg text-on-surface mb-4 pb-3 border-b border-outline-variant/20">{title}</h2>
      <div className="space-y-3 font-body text-sm text-secondary leading-relaxed">{children}</div>
    </section>
  )
}

export function LegalList({ items }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="w-1 h-1 rounded-full bg-tertiary mt-2 shrink-0" />
          <span className="font-body text-sm text-secondary leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}
'@

Write-File "src\pages\Legal\PrivacyPolicy.jsx" @'
import { LegalLayout, LegalSection, LegalList } from "./LegalLayout"
import { useSEO } from "../../hooks/useSEO"

export default function PrivacyPolicy() {
  useSEO({ title: "Privacy Policy" })
  return (
    <LegalLayout label="Legal" title="Privacy Policy" lastUpdated="April 2025">
      <LegalSection title="1. Introduction"><p>Safemart is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.</p></LegalSection>
      <LegalSection title="2. Information We Collect">
        <p>We collect:</p>
        <LegalList items={["Full name, email address, phone number","Shipping and billing address","Payment information processed securely through Paystack","Order history and transaction data","Device and browser information"]} />
      </LegalSection>
      <LegalSection title="3. How We Use Your Information">
        <LegalList items={["Process and fulfill your orders","Send order confirmations and shipping updates","Respond to customer service requests","Send promotional communications (only with consent)","Comply with legal obligations"]} />
      </LegalSection>
      <LegalSection title="4. Information Sharing"><p>We do not sell your data. We share it only with Paystack (payments), Cloudinary (images), delivery partners, and legal authorities when required.</LegalSection>
      <LegalSection title="5. Data Security"><p>We use SSL encryption and industry-standard security measures. No method of internet transmission is 100% secure.</p></LegalSection>
      <LegalSection title="6. Your Rights"><LegalList items={["Access your personal information","Request corrections","Request deletion","Opt out of marketing at any time"]} /></LegalSection>
      <LegalSection title="7. Contact Us"><div className="mt-3 p-5 bg-surface-container-low rounded-md ghost-border space-y-1"><p className="font-headline font-bold text-sm text-on-surface">Safemart</p><p>Email: privacy@safemart.ng</p><p>Phone: +234 800 000 0000</p></div></LegalSection>
    </LegalLayout>
  )
}
'@

Write-File "src\pages\Legal\TermsAndConditions.jsx" @'
import { LegalLayout, LegalSection, LegalList } from "./LegalLayout"
import { useSEO } from "../../hooks/useSEO"

export default function TermsAndConditions() {
  useSEO({ title: "Terms & Conditions" })
  return (
    <LegalLayout label="Legal" title="Terms & Conditions" lastUpdated="April 2025">
      <LegalSection title="1. Agreement to Terms"><p>By accessing or using Safemart and purchasing our products, you agree to be bound by these Terms and Conditions.</p></LegalSection>
      <LegalSection title="2. Products and Pricing"><p>All products are subject to availability. Prices are in Nigerian Naira and may be modified without prior notice.</p><LegalList items={["Product descriptions are for informational purposes","We reserve the right to limit quantities","Promotional pricing applies only during specified periods"]} /></LegalSection>
      <LegalSection title="3. Orders and Payment"><LegalList items={["Orders confirmed only after successful payment","We accept Paystack and direct bank transfer","You must be 18+ to purchase","Orders cannot be modified after payment"]} /></LegalSection>
      <LegalSection title="4. Product Warranty"><p>All products come with the manufacturer warranty. Warranty does not cover damage from misuse or unauthorized modifications.</p></LegalSection>
      <LegalSection title="5. Limitation of Liability"><p>Safemart shall not be liable for indirect or consequential damages. Total liability shall not exceed the amount paid for the specific product.</p></LegalSection>
      <LegalSection title="6. Governing Law"><p>These terms are governed by the laws of the Federal Republic of Nigeria. Disputes are subject to the courts of Rivers State.</p></LegalSection>
      <LegalSection title="7. Contact"><div className="mt-3 p-5 bg-surface-container-low rounded-md ghost-border space-y-1"><p className="font-headline font-bold text-sm text-on-surface">Safemart</p><p>Email: legal@safemart.ng</p><p>Phone: +234 800 000 0000</p></div></LegalSection>
    </LegalLayout>
  )
}
'@

Write-File "src\pages\Legal\ReturnPolicy.jsx" @'
import { LegalLayout, LegalSection, LegalList } from "./LegalLayout"
import { useSEO } from "../../hooks/useSEO"

export default function ReturnPolicy() {
  useSEO({ title: "Return & Refund Policy" })
  return (
    <LegalLayout label="Policy" title="Return & Refund Policy" lastUpdated="April 2025">
      <LegalSection title="Return Eligibility">
        <p>Returns accepted within <strong className="text-on-surface font-semibold">7 days</strong> of delivery if:</p>
        <LegalList items={["Product is defective or damaged on arrival","Wrong item received","Product unused in original packaging with all accessories"]} />
        <p className="mt-3">NOT eligible:</p>
        <LegalList items={["Installed, used, or tampered products","Missing or damaged packaging","Returns after 7-day window","Custom or special-order items"]} />
      </LegalSection>
      <LegalSection title="How to Return">
        <div className="space-y-4 mt-3">
          {[["01","Contact Us","Email returns@safemart.ng within 7 days with your order number."],["02","Await Approval","Our team reviews within 24-48 hours."],["03","Ship Item","Repack securely and ship using a trackable method."]].map(([s,t,d]) => (
            <div key={s} className="flex gap-4 p-4 bg-surface-container-low rounded-sm ghost-border">
              <span className="font-headline font-black text-2xl text-outline-variant shrink-0 leading-none">{s}</span>
              <div><p className="font-headline font-bold text-sm text-on-surface mb-1">{t}</p><p className="font-body text-xs text-secondary leading-relaxed">{d}</p></div>
            </div>
          ))}
        </div>
      </LegalSection>
      <LegalSection title="Refunds"><LegalList items={["Approved refunds processed within 5-7 business days","Refunded to original payment method","Shipping fees non-refundable unless our error"]} /></LegalSection>
      <LegalSection title="Contact"><div className="p-5 bg-surface-container-low rounded-md ghost-border space-y-1"><p className="font-headline font-bold text-sm text-on-surface">Safemart Returns</p><p>Email: returns@safemart.ng</p><p>Phone: +234 800 000 0000</p><p>Hours: Mon-Fri, 9am-5pm WAT</p></div></LegalSection>
    </LegalLayout>
  )
}
'@

Write-File "src\pages\Legal\ShippingPolicy.jsx" @'
import { LegalLayout, LegalSection, LegalList } from "./LegalLayout"
import { useSEO } from "../../hooks/useSEO"

export default function ShippingPolicy() {
  useSEO({ title: "Shipping Policy" })
  return (
    <LegalLayout label="Policy" title="Shipping Policy" lastUpdated="April 2025">
      <LegalSection title="Shipping Rates">
        <div className="mt-2 overflow-hidden rounded-md ghost-border">
          <table className="w-full text-sm">
            <thead><tr className="bg-surface-container-high"><th className="text-left px-4 py-3 font-headline font-bold text-xs text-on-surface uppercase tracking-wider">Order Value</th><th className="text-left px-4 py-3 font-headline font-bold text-xs text-on-surface uppercase tracking-wider">Fee</th><th className="text-left px-4 py-3 font-headline font-bold text-xs text-on-surface uppercase tracking-wider">Time</th></tr></thead>
            <tbody className="divide-y divide-outline-variant/15">
              {[["Below N50,000","N2,500","3-5 business days"],["N50,000 and above","Free","3-5 business days"],["Same-day Lagos","N5,000","Order before 12pm"]].map(([v,f,t]) => (
                <tr key={v} className="bg-surface-container-lowest"><td className="px-4 py-3 font-body text-sm text-on-surface">{v}</td><td className="px-4 py-3 font-headline font-semibold text-sm text-on-surface">{f}</td><td className="px-4 py-3 font-body text-sm text-secondary">{t}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>
      <LegalSection title="Delivery Timeframes"><LegalList items={["Port Harcourt and Rivers State - 1-2 business days","Lagos, Abuja, major cities - 2-3 business days","Other states - 3-5 business days","Remote areas - 5-7 business days"]} /></LegalSection>
      <LegalSection title="Order Processing"><p>Orders processed within <strong className="text-on-surface font-semibold">1-2 business days</strong> after payment confirmation.</p></LegalSection>
      <LegalSection title="Contact"><div className="p-5 bg-surface-container-low rounded-md ghost-border space-y-1"><p className="font-headline font-bold text-sm text-on-surface">Safemart Logistics</p><p>Email: shipping@safemart.ng</p><p>Phone: +234 800 000 0000</p><p>Hours: Mon-Sat, 8am-6pm WAT</p></div></LegalSection>
    </LegalLayout>
  )
}
'@

Write-File "src\pages\Legal\Contact.jsx" @'
import { useState } from "react"
import { contactApi } from "../../api/services"
import { useSEO } from "../../hooks/useSEO"
import toast from "react-hot-toast"

const SUBJECTS = ["Product Enquiry","Order Support","Technical Assistance","Returns & Refunds","Shipping & Delivery","Business / Wholesale","Other"]

export default function Contact() {
  useSEO({ title: "Contact Us" })
  const [form, setForm]       = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await contactApi.submit(form)
      toast.success("Message sent - we will reply within 24 hours")
      setSent(true)
      setForm({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message. Please try again.")
    } finally { setLoading(false) }
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">Get in Touch</span>
          <h1 className="headline-lg text-4xl text-on-surface">Contact Us</h1>
          <p className="font-body text-sm text-secondary mt-3 max-w-md leading-relaxed">Have a question about a product, need installation advice, or want to discuss a large project? We are here to help.</p>
        </div>
      </div>
      <div className="container-main py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
          <div className="lg:col-span-2 space-y-5">
            {[{label:"Email",value:"hello@safemart.ng",sub:"We reply within 24 hours",icon:"M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"},{label:"Phone",value:"+234 800 000 0000",sub:"Mon-Sat, 8am-6pm WAT",icon:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.64 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.83-.83a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"},{label:"Location",value:"Port Harcourt, Rivers State",sub:"Nigeria",icon:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}].map(item => (
              <div key={item.label} className="flex items-start gap-4 p-5 bg-surface-container-low rounded-md ghost-border">
                <div className="w-10 h-10 bg-on-surface rounded-sm flex items-center justify-center shrink-0"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="text-inverse-on-surface"><path d={item.icon}/></svg></div>
                <div><p className="label-overline mb-1">{item.label}</p><p className="font-headline font-bold text-sm text-on-surface">{item.value}</p><p className="font-body text-xs text-secondary mt-0.5">{item.sub}</p></div>
              </div>
            ))}
            <div className="p-5 bg-surface-container-low rounded-md ghost-border">
              <p className="label-overline mb-4">Business Hours</p>
              <div className="space-y-2">
                {[["Monday - Friday","8:00am - 6:00pm"],["Saturday","9:00am - 4:00pm"],["Sunday","Closed"]].map(([d,h]) => (
                  <div key={d} className="flex justify-between text-sm"><span className="font-body text-secondary">{d}</span><span className="font-headline font-semibold text-on-surface">{h}</span></div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            {sent ? (
              <div className="bg-surface-container-low rounded-md p-10 ghost-border text-center">
                <div className="w-14 h-14 bg-on-surface rounded-full flex items-center justify-center mx-auto mb-6"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-inverse-on-surface"><polyline points="20 6 9 17 4 12"/></svg></div>
                <h2 className="headline-md text-xl text-on-surface mb-3">Message sent!</h2>
                <p className="font-body text-sm text-secondary leading-relaxed mb-6">We have sent a confirmation to your email and will reply within 24 hours.</p>
                <button onClick={() => setSent(false)} className="btn-secondary">Send Another Message</button>
              </div>
            ) : (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border">
                <h2 className="headline-md text-xl text-on-surface mb-7">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="label-overline mb-2 block">Full Name</label><input type="text" required value={form.name} onChange={set("name")} className="input-field" placeholder="John Doe" /></div>
                    <div><label className="label-overline mb-2 block">Email Address</label><input type="email" required value={form.email} onChange={set("email")} className="input-field" placeholder="you@example.com" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="label-overline mb-2 block">Phone (optional)</label><input type="tel" value={form.phone} onChange={set("phone")} className="input-field" placeholder="+234 800 000 0000" /></div>
                    <div><label className="label-overline mb-2 block">Subject</label><select required value={form.subject} onChange={set("subject")} className="input-field"><option value="">Select a subject</option>{SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                  </div>
                  <div><label className="label-overline mb-2 block">Message</label><textarea required rows={6} value={form.message} onChange={set("message")} className="input-field resize-none" placeholder="Tell us how we can help..." /></div>
                  <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Sending..." : "Send Message"}</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
'@

Write-Host "Legal pages written..." -ForegroundColor Gray

Write-Host ""
Write-Host "=============================================" -ForegroundColor Green
Write-Host "   ALL FILES INSTALLED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Run npm run dev to start the frontend" -ForegroundColor Cyan
Write-Host ""
Write-Host "BACKEND SETUP:" -ForegroundColor Yellow
Write-Host "  1. Copy these to Backend/src/:" -ForegroundColor White
Write-Host "     - email.service.js    -> src/services/email.service.js" -ForegroundColor White
Write-Host "     - contact.controller  -> src/controllers/contact.controller.js" -ForegroundColor White
Write-Host "     - contact.routes      -> src/routes/contact.routes.js" -ForegroundColor White
Write-Host "     - auth.controller     -> src/controllers/auth.controller.js" -ForegroundColor White
Write-Host "     - auth.routes         -> src/routes/auth.routes.js" -ForegroundColor White
Write-Host ""
Write-Host "  2. Add to Backend/.env:" -ForegroundColor White
Write-Host "     GMAIL_USER=your@gmail.com" -ForegroundColor Gray
Write-Host "     GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx" -ForegroundColor Gray
Write-Host "     ADMIN_EMAIL=your@gmail.com" -ForegroundColor Gray
Write-Host "     FRONTEND_URL=http://localhost:5173" -ForegroundColor Gray
Write-Host ""
Write-Host "  3. Run: cd ../Backend && npm install nodemailer" -ForegroundColor White
Write-Host ""
Write-Host "  4. Add contact route to app.js:" -ForegroundColor White
Write-Host '     app.use("/api/v1/contact", contactRouter)' -ForegroundColor Gray
Write-Host ""
Write-Host "  5. After deployment: update yourdomain.com in index.html" -ForegroundColor White
Write-Host ""

# =============================================================
# src/pages/Legal/About.jsx
# =============================================================

Write-File "src\pages\Legal\About.jsx" @'
import { Link } from "react-router-dom"
import { useSEO } from "../../hooks/useSEO"

const VALUES = [
  { num: "01", title: "Quality First",     desc: "Every product is rigorously vetted for build quality, reliability, and performance before we list it." },
  { num: "02", title: "Genuine Products",  desc: "Sourced directly from authorised distributors. Every item is 100% authentic with full manufacturer warranty." },
  { num: "03", title: "Expert Guidance",   desc: "Our team helps you select the right system whether residential, commercial, or industrial." },
  { num: "04", title: "Customer Trust",    desc: "Transparent pricing, honest communication, and standing behind every product we sell." },
]

const STATS = [
  { value: "500+",   label: "Products" },
  { value: "5,000+", label: "Happy Customers" },
  { value: "7+",     label: "Years Experience" },
  { value: "36",     label: "States Delivered" },
]

export default function About() {
  useSEO({ title: "About Us", description: "Learn about Safemart, Nigeria's premier electronic security systems store. Founded to make professional-grade security accessible to all Nigerians." })

  return (
    <div className="bg-surface">
      <div className="bg-on-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container-main py-20 md:py-28 relative z-10">
          <span className="label-overline text-on-tertiary/60 block mb-5">Our Story</span>
          <h1 className="headline-display text-5xl md:text-7xl text-inverse-on-surface leading-none mb-8 max-w-3xl">PROTECTING NIGERIA, ONE SYSTEM AT A TIME.</h1>
          <p className="font-body text-base text-inverse-on-surface/60 max-w-xl leading-relaxed">Safemart was founded with a single conviction: every home and business in Nigeria deserves access to professional-grade security, delivered with integrity and expertise.</p>
        </div>
      </div>

      <div className="bg-surface-container-low">
        <div className="container-main py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/20">
            {STATS.map(s => (
              <div key={s.label} className="bg-surface-container-low px-8 py-10 text-center">
                <p className="headline-display text-4xl md:text-5xl text-on-surface mb-2">{s.value}</p>
                <p className="label-overline">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-main section-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="label-overline text-tertiary block mb-5">Our Mission</span>
            <h2 className="headline-lg text-4xl text-on-surface mb-6 leading-tight">Security that matches your ambition.</h2>
            <p className="font-body text-secondary text-base leading-relaxed mb-5">We started Safemart because we saw a gap: businesses and homeowners were forced to choose between affordability and quality. We refused to accept that compromise.</p>
            <p className="font-body text-secondary text-base leading-relaxed mb-8">Today we curate the most trusted security brands and make them accessible to every Nigerian, backed by genuine expertise and after-sales support.</p>
            <Link to="/products" className="btn-primary inline-flex">Explore Our Products</Link>
          </div>
          <div className="aspect-square bg-surface-container-low rounded-md ghost-border flex items-center justify-center">
            <div className="text-center p-12">
              <div className="w-20 h-20 bg-on-surface rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <p className="font-headline font-black text-2xl text-on-surface/20 tracking-wider uppercase">Since 2018</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low section-xl">
        <div className="container-main">
          <div className="text-center mb-14">
            <span className="label-overline text-tertiary block mb-3">What We Stand For</span>
            <h2 className="headline-lg text-4xl text-on-surface">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map(v => (
              <div key={v.num} className="bg-surface-container-lowest rounded-md p-7 ghost-border">
                <span className="font-headline font-black text-4xl text-outline-variant/40 block mb-4">{v.num}</span>
                <h3 className="headline-md text-lg text-on-surface mb-3">{v.title}</h3>
                <p className="font-body text-sm text-secondary leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-main pb-20 pt-16">
        <div className="bg-on-surface rounded-md p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          <h2 className="headline-lg text-3xl text-inverse-on-surface mb-4 relative z-10">Ready to get started?</h2>
          <p className="font-body text-sm text-inverse-on-surface/60 mb-8 max-w-md mx-auto relative z-10 leading-relaxed">Browse our catalogue or speak to our team to find the perfect security solution.</p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <Link to="/products" className="bg-white text-primary px-10 py-4 rounded-sm font-headline font-bold text-xs tracking-[0.2em] uppercase hover:bg-surface-variant transition-colors">Shop Now</Link>
            <Link to="/contact"  className="border border-inverse-on-surface/20 text-inverse-on-surface px-10 py-4 rounded-sm font-headline font-bold text-xs tracking-[0.2em] uppercase hover:border-inverse-on-surface/50 transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
'@

Write-Host "About page written..." -ForegroundColor Gray

# =============================================================
# src/pages/Wishlist
# =============================================================

Write-File "src\pages\Wishlist\index.jsx" @'
import { Link } from "react-router-dom"
import { useWishlist } from "../../hooks/useWishlist"
import { useCart } from "../../context/CartContext"
import { useAuth } from "../../context/AuthContext"
import { Price, Stars, EmptyState } from "../../components/ui"
import { useSEO } from "../../hooks/useSEO"
import toast from "react-hot-toast"
import { useState } from "react"

export default function Wishlist() {
  useSEO({ title: "Wishlist" })
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
          <h1 className="headline-lg text-4xl text-on-surface">Wishlist {items.length > 0 && <span className="font-body font-normal text-lg text-secondary ml-2">({items.length})</span>}</h1>
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
                <div key={product._id} className="group anim-fade-up" style={{ animationDelay: `${idx * 0.07}s` }}>
                  <div className="relative aspect-[3/4] bg-surface-container-low rounded-md overflow-hidden mb-4 ghost-border">
                    <Link to={`/products/${product._id}`}>
                      {product.images?.[0]
                        ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        : <div className="w-full h-full flex items-center justify-center text-outline-variant"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
                      }
                    </Link>
                    <button onClick={() => { toggle(product); toast.success("Removed from wishlist") }}
                      className="absolute top-3 right-3 w-8 h-8 bg-surface-container-lowest/90 backdrop-blur-sm text-tertiary flex items-center justify-center rounded-sm hover:bg-error-container hover:text-error transition-all opacity-0 group-hover:opacity-100">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button onClick={() => handleAdd(product)} disabled={adding === product._id}
                        className="w-full bg-primary/90 backdrop-blur-sm text-on-primary font-headline font-bold text-[10px] tracking-[0.2em] uppercase py-3.5 hover:bg-primary transition-colors">
                        {adding === product._id ? "Adding..." : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                  <div className="px-1">
                    <span className="label-overline text-tertiary block mb-1.5">{product.category}</span>
                    <Link to={`/products/${product._id}`} className="font-headline font-bold text-base text-on-surface leading-snug line-clamp-2 hover:text-primary-fixed transition-colors block mb-2.5">{product.name}</Link>
                    {product.numReviews > 0 && <div className="mb-2"><Stars rating={product.ratings} count={product.numReviews} /></div>}
                    <div className="flex items-center gap-2">
                      <Price amount={displayPrice} className="text-sm text-on-surface" />
                      {hasDiscount && <span className="price-text text-xs text-secondary line-through opacity-60">N{Number(product.price).toLocaleString()}</span>}
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

Write-Host "Wishlist page written..." -ForegroundColor Gray

# =============================================================
# src/pages/Orders
# =============================================================

Write-File "src\pages\Orders\index.jsx" @'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ordersApi } from "../../api/services"
import { LoadingPage, EmptyState, Badge, Price } from "../../components/ui"
import { useSEO } from "../../hooks/useSEO"

export default function Orders() {
  useSEO({ title: "My Orders" })
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ordersApi.getMyOrders().then(res => setOrders(res.data.data)).catch(() => {}).finally(() => setLoading(false))
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
          <EmptyState title="No orders yet" description="Your order history will appear here once you make a purchase." action={<Link to="/products" className="btn-primary mt-2">Start Shopping</Link>} />
        ) : (
          <div className="space-y-3">
            {orders.map(order => (
              <Link key={order._id} to={`/orders/${order._id}`} className="block bg-surface-container-low rounded-md p-6 ghost-border hover:bg-surface-container transition-colors duration-200 group">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
                  <div>
                    <span className="label-overline text-secondary block mb-1">Order #{order._id.slice(-8).toUpperCase()}</span>
                    <p className="font-body text-xs text-secondary">{new Date(order.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                  <div className="flex items-center gap-2"><Badge status={order.orderStatus} /><Badge status={order.paymentStatus} /></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {order.items?.slice(0, 5).map((item, i) => (
                      <div key={i} className="w-10 h-10 rounded-sm border-2 border-surface bg-surface-container overflow-hidden">
                        {item.product?.images?.[0] && <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />}
                      </div>
                    ))}
                    {order.items?.length > 5 && <div className="w-10 h-10 rounded-sm border-2 border-surface bg-surface-container-high flex items-center justify-center"><span className="font-label text-[9px] text-secondary">+{order.items.length - 5}</span></div>}
                  </div>
                  <div className="flex items-center gap-4">
                    <Price amount={order.totalAmount} className="text-sm text-on-surface" />
                    <span className="label-overline text-outline group-hover:text-tertiary transition-colors">View</span>
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

Write-File "src\pages\Orders\Detail.jsx" @'
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ordersApi } from "../../api/services"
import { LoadingPage, Badge, Price } from "../../components/ui"
import { useSEO } from "../../hooks/useSEO"
import toast from "react-hot-toast"

const STATUS_STEPS = ["pending", "processing", "shipped", "delivered"]

export default function OrderDetail() {
  const { id } = useParams()
  useSEO({ title: `Order #${id?.slice(-8).toUpperCase() || ""}` })
  const [order, setOrder]           = useState(null)
  const [loading, setLoading]       = useState(true)
  const [cancelling, setCancelling] = useState(false)

  useEffect(() => {
    ordersApi.getById(id).then(res => setOrder(res.data.data)).catch(() => {}).finally(() => setLoading(false))
  }, [id])

  const handleCancel = async () => {
    if (!confirm("Cancel this order?")) return
    try {
      setCancelling(true)
      const res = await ordersApi.cancel(id, "Customer requested cancellation")
      setOrder(res.data.data); toast.success("Order cancelled")
    } catch (err) { toast.error(err.response?.data?.message || "Failed to cancel") }
    finally { setCancelling(false) }
  }

  if (loading) return <LoadingPage />
  if (!order) return <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4"><p className="font-body text-secondary">Order not found.</p><Link to="/orders" className="btn-primary">Back to Orders</Link></div>

  const stepIndex   = STATUS_STEPS.indexOf(order.orderStatus)
  const isCancelled = order.orderStatus === "cancelled"
  const canCancel   = ["pending","processing"].includes(order.orderStatus)

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-10">
          <Link to="/orders" className="label-overline text-secondary hover:text-on-surface transition-colors block mb-4">Back to Orders</Link>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <span className="label-overline text-tertiary block mb-2">Order #{order._id.slice(-8).toUpperCase()}</span>
              <h1 className="headline-lg text-3xl text-on-surface">Order Details</h1>
              <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-1">{new Date(order.createdAt).toLocaleString("en-NG", { dateStyle: "long", timeStyle: "short" })}</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge status={order.orderStatus} /><Badge status={order.paymentStatus} />
              {canCancel && <button onClick={handleCancel} disabled={cancelling} className="label-overline text-error hover:text-on-surface transition-colors">{cancelling ? "Cancelling..." : "Cancel Order"}</button>}
            </div>
          </div>
        </div>
      </div>
      <div className="container-main py-10">
        {!isCancelled && (
          <div className="bg-surface-container-low rounded-md p-6 ghost-border mb-8">
            <p className="label-overline mb-7">Order Progress</p>
            <div className="flex items-center">
              {STATUS_STEPS.map((s, i) => (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 flex items-center justify-center text-[10px] font-headline font-bold rounded-sm transition-all ${i < stepIndex ? "bg-on-surface text-inverse-on-surface" : i === stepIndex ? "bg-tertiary-container text-on-tertiary-container" : "bg-surface-container-high text-secondary"}`}>
                      {i < stepIndex ? "v" : i + 1}
                    </div>
                    <span className={`font-label text-[9px] mt-2 capitalize uppercase tracking-wider ${i <= stepIndex ? "text-on-surface" : "text-secondary/50"}`}>{s}</span>
                  </div>
                  {i < STATUS_STEPS.length - 1 && <div className={`flex-1 h-px mx-3 mb-4 transition-colors ${i < stepIndex ? "bg-on-surface" : "bg-outline-variant/30"}`} />}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-surface-container-low rounded-md ghost-border divide-y divide-outline-variant/10">
              {order.items?.map((item, i) => (
                <div key={i} className="flex gap-4 p-5">
                  <Link to={`/products/${item.product?._id}`} className="w-16 h-16 bg-surface-container rounded-md overflow-hidden shrink-0">
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
          <div className="space-y-4">
            <div className="bg-surface-container-low rounded-md p-5 ghost-border">
              <p className="label-overline mb-4">Summary</p>
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm"><span className="font-body text-secondary">Subtotal</span><Price amount={order.subtotalAmount} className="text-sm text-on-surface" /></div>
                <div className="flex justify-between text-sm"><span className="font-body text-secondary">Shipping</span>{order.shippingCost === 0 ? <span className="font-label text-[10px] uppercase tracking-wider text-on-surface font-bold">Free</span> : <Price amount={order.shippingCost} className="text-sm text-on-surface" />}</div>
                <div className="flex justify-between font-bold pt-2.5 border-t border-outline-variant/20"><span className="font-headline text-sm text-on-surface">Total</span><Price amount={order.totalAmount} className="text-sm text-on-surface" /></div>
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
              <p className="font-body text-sm text-on-surface capitalize">{order.paymentMethod?.replace("_"," ")}</p>
              {order.paymentReference && <p className="font-label text-[9px] text-secondary mt-1.5 break-all uppercase tracking-wider">{order.paymentReference}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'@

Write-Host "Order pages written..." -ForegroundColor Gray

# =============================================================
# src/pages/Checkout
# =============================================================

Write-File "src\pages\Checkout\PaymentCallback.jsx" @'
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
    paymentApi.verify(reference).then(() => { setStatus("success"); fetchCart() }).catch(() => setStatus("failed"))
  }, [reference])

  return (
    <div className="bg-surface min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        {status === "verifying" && (<><Spinner size="lg" className="mx-auto mb-8" /><h1 className="headline-lg text-2xl text-on-surface mb-2">Verifying payment</h1><p className="font-body text-sm text-secondary">Please wait...</p></>)}
        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-8 ghost-border"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-on-surface"><polyline points="20 6 9 17 4 12"/></svg></div>
            <span className="label-overline text-tertiary block mb-3">Confirmed</span>
            <h1 className="headline-lg text-3xl text-on-surface mb-3">Payment successful</h1>
            <p className="font-body text-sm text-secondary mb-10 leading-relaxed">Your order has been placed and is being processed.</p>
            <div className="flex gap-3 justify-center"><Link to="/orders" className="btn-primary">View Orders</Link><Link to="/products" className="btn-secondary">Continue Shopping</Link></div>
          </>
        )}
        {status === "failed" && (
          <>
            <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center mx-auto mb-8"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-error"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
            <span className="label-overline text-error block mb-3">Failed</span>
            <h1 className="headline-lg text-3xl text-on-surface mb-3">Payment failed</h1>
            <p className="font-body text-sm text-secondary mb-10 leading-relaxed">We could not verify your payment. Please try again or contact support.</p>
            <div className="flex gap-3 justify-center"><Link to="/cart" className="btn-primary">Return to Cart</Link><Link to="/orders" className="btn-secondary">My Orders</Link></div>
          </>
        )}
      </div>
    </div>
  )
}
'@

Write-Host "Checkout callback written..." -ForegroundColor Gray

# =============================================================
# src/pages/Admin
# =============================================================

Write-File "src\pages\Admin\Dashboard.jsx" @'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { adminApi, ordersApi } from "../../api/services"
import { LoadingPage, Price, Badge } from "../../components/ui"
import { useSEO } from "../../hooks/useSEO"

export default function AdminDashboard() {
  useSEO({ title: "Admin Dashboard" })
  const [analytics, setAnalytics]       = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    Promise.all([adminApi.getAnalytics(), ordersApi.getAll({ limit: 6, sort: "-createdAt" })])
      .then(([aRes, oRes]) => { setAnalytics(aRes.data.data); setRecentOrders(oRes.data.data) })
      .catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingPage />

  const stats = [
    { label: "Total Revenue",  value: <Price amount={analytics?.totalRevenue || 0} className="text-3xl text-on-surface" />, sub: "All time" },
    { label: "Total Orders",   value: <span className="font-headline font-black text-3xl text-on-surface">{analytics?.totalOrders || 0}</span>,   sub: "Orders placed" },
    { label: "Total Users",    value: <span className="font-headline font-black text-3xl text-on-surface">{analytics?.totalUsers || 0}</span>,    sub: "Registered" },
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
              {[["Products","/admin/products"],["Orders","/admin/orders"],["Users","/admin/users"]].map(([l,to]) => (
                <Link key={to} to={to} className="btn-secondary py-2 text-xs">{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container-main py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(s => (
            <div key={s.label} className="bg-surface-container-low rounded-md p-6 ghost-border">
              {s.value}
              <p className="font-headline font-bold text-sm text-on-surface mt-1">{s.label}</p>
              <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
        {analytics?.monthlyRevenue?.length > 0 && (
          <div className="bg-surface-container-low rounded-md p-7 ghost-border mb-8">
            <p className="label-overline mb-6">Monthly Revenue</p>
            <div className="flex items-end gap-2 h-28">
              {analytics.monthlyRevenue.map((m, i) => {
                const max = Math.max(...analytics.monthlyRevenue.map(r => r.revenue), 1)
                const h   = Math.max(2, (m.revenue / max) * 100)
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full bg-on-surface rounded-sm" style={{ height: `${h}%` }} />
                    <span className="font-label text-[9px] text-secondary uppercase">{m._id?.month}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        <div className="bg-surface-container-low rounded-md ghost-border">
          <div className="flex items-center justify-between p-6 border-b border-outline-variant/20">
            <p className="label-overline">Recent Orders</p>
            <Link to="/admin/orders" className="label-overline text-secondary hover:text-on-surface transition-colors">View all</Link>
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
                <Link to={`/orders/${order._id}`} className="label-overline text-secondary hover:text-on-surface transition-colors">View</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
'@

Write-File "src\pages\Admin\Orders.jsx" @'
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
    try { const res = await ordersApi.getAll({ page, limit: 15, ...(statusFilter && { orderStatus: statusFilter }) }); setOrders(res.data.data); setPages(res.data.pages) }
    catch {} finally { setLoading(false) }
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
          <Link to="/admin" className="label-overline text-secondary hover:text-on-surface transition-colors block mb-4">Dashboard</Link>
          <h1 className="headline-lg text-4xl text-on-surface">Orders</h1>
        </div>
      </div>
      <div className="container-main py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {["", ...STATUS_OPTIONS].map(s => (
            <button key={s || "all"} onClick={() => { setStatusFilter(s); setPage(1) }} className={`font-label text-[10px] uppercase tracking-wider px-4 py-2 rounded-sm transition-colors ${s === statusFilter ? "bg-on-surface text-inverse-on-surface" : "bg-surface-container-low text-secondary hover:bg-surface-container hover:text-on-surface"}`}>
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
                    <p className="font-label text-[10px] text-secondary uppercase tracking-wider">{order.user?.fullName} - {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Badge status={order.paymentStatus} />
                  <select value={order.orderStatus} onChange={e => updateStatus(order._id, e.target.value)} className="input-field w-auto py-1.5 text-xs font-label uppercase tracking-wider">
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <Price amount={order.totalAmount} className="text-sm text-on-surface" />
                  <Link to={`/orders/${order._id}`} className="label-overline text-secondary hover:text-on-surface transition-colors">View</Link>
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

Write-File "src\pages\Admin\Users.jsx" @'
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
    try { const res = await adminApi.getUsers({ page, limit: 20 }); setUsers(res.data.data); setPages(res.data.pages) }
    catch {} finally { setLoading(false) }
  }

  useEffect(() => { fetchUsers() }, [page])

  const toggleStatus = async (id) => { try { await adminApi.toggleStatus(id); toast.success("Updated"); fetchUsers() } catch { toast.error("Failed") } }
  const changeRole   = async (id, role) => { try { await adminApi.changeRole(id, role); toast.success("Updated"); fetchUsers() } catch { toast.error("Failed") } }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-10">
          <Link to="/admin" className="label-overline text-secondary hover:text-on-surface transition-colors block mb-4">Dashboard</Link>
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
                  <div className="w-9 h-9 rounded-full bg-on-surface flex items-center justify-center text-inverse-on-surface font-headline font-black text-sm shrink-0">{user.fullName?.[0]?.toUpperCase()}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-headline font-bold text-sm text-on-surface">{user.fullName}</p>
                    <p className="font-label text-[10px] text-secondary uppercase tracking-wider">{user.email}</p>
                  </div>
                  <span className={`status-badge ${user.isActive ? "bg-surface-container-high text-on-surface" : "bg-error-container text-error"}`}>{user.isActive ? "Active" : "Suspended"}</span>
                  <select value={user.role} onChange={e => changeRole(user._id, e.target.value)} className="input-field w-auto py-1.5 text-xs font-label uppercase tracking-wider">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button onClick={() => toggleStatus(user._id)} className={`label-overline transition-colors ${user.isActive ? "text-error hover:text-on-surface" : "text-tertiary hover:text-on-surface"}`}>{user.isActive ? "Suspend" : "Activate"}</button>
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

Write-Host "Admin pages written..." -ForegroundColor Gray

Write-Host ""
Write-Host "=============================================" -ForegroundColor Green
Write-Host "   COMPLETE! ALL FILES INSTALLED" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "BACKEND SETUP:" -ForegroundColor Yellow
Write-Host "  1. Copy to Backend/src/services/email.service.js" -ForegroundColor White
Write-Host "  2. Copy to Backend/src/controllers/contact.controller.js" -ForegroundColor White
Write-Host "  3. Copy to Backend/src/routes/contact.routes.js" -ForegroundColor White
Write-Host "  4. Copy to Backend/src/controllers/auth.controller.js" -ForegroundColor White
Write-Host "  5. Copy to Backend/src/routes/auth.routes.js" -ForegroundColor White
Write-Host ""
Write-Host "  Add to Backend/.env:" -ForegroundColor Yellow
Write-Host "    GMAIL_USER=your@gmail.com" -ForegroundColor Gray
Write-Host "    GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx" -ForegroundColor Gray
Write-Host "    ADMIN_EMAIL=your@gmail.com" -ForegroundColor Gray
Write-Host "    FRONTEND_URL=http://localhost:5173" -ForegroundColor Gray
Write-Host ""
Write-Host "  cd ..\Backend && npm install nodemailer" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Add to app.js:" -ForegroundColor Yellow
Write-Host '    import contactRouter from "./routes/contact.routes.js"' -ForegroundColor Gray
Write-Host '    app.use("/api/v1/contact", contactRouter)' -ForegroundColor Gray
Write-Host ""
Write-Host "After deployment: replace yourdomain.com in index.html" -ForegroundColor Yellow
Write-Host ""

# =============================================================
# src/components/layout/Navbar.jsx
# =============================================================

Write-File "src\components\layout\Navbar.jsx" @'
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
  const searchRef   = useRef(null)
  const searchTimer = useRef(null)

  useEffect(() => { if (searchOpen) searchRef.current?.focus() }, [searchOpen])

  const handleSearch = (val) => {
    setSearchQuery(val)
    clearTimeout(searchTimer.current)
    if (!val.trim()) { setResults([]); return }
    setSearching(true)
    searchTimer.current = setTimeout(async () => {
      try { const res = await productsApi.getAll({ search: val, limit: 5 }); setResults(res.data.data) }
      catch {} finally { setSearching(false) }
    }, 300)
  }

  const closeSearch = () => { setSearchOpen(false); setSearchQuery(""); setResults([]) }

  const handleLogout = async () => {
    await logout(); toast.success("Signed out"); navigate("/"); setDrawerOpen(false)
  }

  const itemCount = cart?.totalItems || 0

  const drawerSections = [
    {
      heading: "Shop",
      links: [
        { to: "/products",               label: "All Products", icon: "M4 6h16M4 12h16M4 18h16" },
        { to: "/products?isFeatured=true",label: "Collections", icon: "M5 3l14 9-14 9V3z" },
        { to: "/products?sort=-createdAt",label: "New Arrivals", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
      ],
    },
    ...(user ? [{
      heading: "Account",
      links: [
        { to: "/orders",   label: "My Orders", icon: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" },
        { to: "/wishlist", label: "Wishlist",  icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" },
        { to: "/profile",  label: "Profile",   icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
      ],
    }] : []),
    {
      heading: "Company",
      links: [
        { to: "/about",   label: "About Us",   icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" },
        { to: "/contact", label: "Contact Us", icon: "M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { to: "/privacy-policy", label: "Privacy Policy",     icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { to: "/terms",          label: "Terms & Conditions", icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" },
        { to: "/returns",        label: "Return Policy",      icon: "M3 10h10a8 8 0 0 1 8 8v2M3 10l6 6m-6-6l6-6" },
        { to: "/shipping",       label: "Shipping Policy",    icon: "M5 8h14M5 8a2 2 0 1 0-4 0v1a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 1 2-2V8m-14 0V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" },
      ],
    },
    ...(isAdmin ? [{
      heading: "Admin",
      links: [{ to: "/admin", label: "Admin Panel", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }],
    }] : []),
  ]

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-full glass-nav flex justify-between items-center px-6 md:px-8 py-3.5">
        <div className="flex items-center gap-6">
          <button onClick={() => setDrawerOpen(true)} className="w-8 h-8 flex items-center justify-center text-on-surface hover:opacity-60 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <nav className="hidden md:flex items-center gap-7">
            {[["Products","/products"],["Collections","/products?isFeatured=true"]].map(([label, to]) => (
              <NavLink key={to} to={to} className={({ isActive }) =>
                `font-headline font-bold text-sm tracking-tight transition-colors ${isActive ? "text-on-surface border-b-2 border-on-surface pb-0.5" : "text-secondary hover:text-on-surface"}`
              }>{label}</NavLink>
            ))}
            {isAdmin && (
              <NavLink to="/admin" className={({ isActive }) =>
                `font-label text-[10px] tracking-[0.35em] uppercase transition-colors ${isActive ? "text-tertiary" : "text-tertiary/50 hover:text-tertiary"}`
              }>Admin</NavLink>
            )}
          </nav>
        </div>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="font-headline font-black tracking-[0.2em] text-lg md:text-xl text-on-surface uppercase whitespace-nowrap">SAFEMART</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <button onClick={() => setSearchOpen(true)} className="w-8 h-8 flex items-center justify-center text-secondary hover:text-on-surface transition-colors">
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
            <Link to="/login" className="hidden md:flex items-center font-label text-[10px] tracking-[0.35em] uppercase text-secondary hover:text-on-surface transition-colors ml-2">Sign in</Link>
          )}
        </div>
      </header>

      {/* Drawer overlay */}
      {drawerOpen && <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-[60] anim-fade-in" onClick={() => setDrawerOpen(false)} />}

      {/* Drawer panel */}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-[70] flex flex-col shadow-drawer transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-6 py-6 border-b border-outline-variant/20">
          <span className="font-headline font-black tracking-[0.2em] text-base uppercase">SAFEMART</span>
          <button onClick={() => setDrawerOpen(false)} className="w-8 h-8 flex items-center justify-center text-secondary hover:text-on-surface transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {user && (
          <div className="px-6 py-4 bg-surface-container mx-4 mt-4 rounded-md">
            <p className="font-headline font-semibold text-sm text-on-surface">{user.fullName}</p>
            <p className="font-label text-[11px] text-secondary mt-0.5">{user.email}</p>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-hide">
          {drawerSections.map(({ heading, links }) => (
            <div key={heading}>
              <p className="font-label text-[9px] uppercase tracking-[0.3em] text-outline px-4 mb-1">{heading}</p>
              {links.map(({ to, label, icon }) => (
                <Link key={to} to={to} onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-4 px-4 py-2.5 rounded-sm text-secondary hover:bg-surface-container hover:text-on-surface transition-all duration-200 group">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 group-hover:text-tertiary transition-colors">
                    <path d={icon}/>
                  </svg>
                  <span className="font-headline font-semibold text-sm uppercase tracking-wider">{label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="px-4 pb-6 pt-2 border-t border-outline-variant/20 mt-auto space-y-2">
          {user ? (
            <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-sm text-error/70 hover:bg-error/5 hover:text-error transition-all duration-200">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
              <span className="font-headline font-semibold text-sm uppercase tracking-wider">Sign Out</span>
            </button>
          ) : (
            <div className="space-y-2">
              <Link to="/login"    onClick={() => setDrawerOpen(false)} className="btn-primary w-full text-center block">Sign In</Link>
              <Link to="/register" onClick={() => setDrawerOpen(false)} className="btn-secondary w-full text-center block">Create Account</Link>
            </div>
          )}
        </div>
      </aside>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[80]">
          <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={closeSearch} />
          <div className="relative bg-surface shadow-ambient-lg anim-fade-up">
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
                    <Link key={p._id} to={`/products/${p._id}`} onClick={closeSearch}
                      className="flex items-center gap-4 py-3 px-2 -mx-2 hover:bg-surface-container-low rounded-sm transition-colors group">
                      <div className="w-12 h-12 bg-surface-container rounded-md overflow-hidden shrink-0">
                        {p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-headline font-semibold text-sm text-on-surface truncate">{p.name}</p>
                        <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-0.5">{p.category}</p>
                      </div>
                      <p className="price-text text-sm text-on-surface shrink-0">N{Number(p.discountPrice || p.price).toLocaleString()}</p>
                    </Link>
                  ))}
                  {results.length > 0 && (
                    <Link to={`/products?search=${searchQuery}`} onClick={closeSearch} className="block pt-3 label-overline text-tertiary hover:text-on-surface transition-colors">View all results</Link>
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

Write-Host "Navbar written..." -ForegroundColor Gray

# =============================================================
# Final summary
# =============================================================

Write-Host ""
Write-Host "=============================================" -ForegroundColor Green
Write-Host "   SAFEMART FULLY INSTALLED!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Start the app:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "BACKEND SETUP STEPS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Step 1 - Copy backend files:" -ForegroundColor White
Write-Host "    email.service.js      -> Backend/src/services/email.service.js" -ForegroundColor Gray
Write-Host "    contact.controller.js -> Backend/src/controllers/contact.controller.js" -ForegroundColor Gray
Write-Host "    contact.routes.js     -> Backend/src/routes/contact.routes.js" -ForegroundColor Gray
Write-Host "    auth.controller.js    -> Backend/src/controllers/auth.controller.js" -ForegroundColor Gray
Write-Host "    auth.routes.js        -> Backend/src/routes/auth.routes.js" -ForegroundColor Gray
Write-Host ""
Write-Host "  Step 2 - Add to Backend/.env:" -ForegroundColor White
Write-Host "    GMAIL_USER=your@gmail.com" -ForegroundColor Gray
Write-Host "    GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx" -ForegroundColor Gray
Write-Host "    ADMIN_EMAIL=your@gmail.com" -ForegroundColor Gray
Write-Host "    FRONTEND_URL=http://localhost:5173" -ForegroundColor Gray
Write-Host ""
Write-Host "  Step 3 - Install nodemailer:" -ForegroundColor White
Write-Host "    cd ..\Backend && npm install nodemailer" -ForegroundColor Gray
Write-Host ""
Write-Host "  Step 4 - Add to Backend/src/app.js:" -ForegroundColor White
Write-Host '    import contactRouter from "./routes/contact.routes.js"' -ForegroundColor Gray
Write-Host '    app.use("/api/v1/contact", contactRouter)' -ForegroundColor Gray
Write-Host ""
Write-Host "  Step 5 - After deployment:" -ForegroundColor White
Write-Host "    Replace yourdomain.com in index.html" -ForegroundColor Gray
Write-Host "    Update FRONTEND_URL in .env to your live URL" -ForegroundColor Gray
Write-Host ""

# =============================================================
# src/pages/Home/index.jsx
# =============================================================

Write-File "src\pages\Home\index.jsx" @'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { productsApi } from "../../api/services"
import ProductCard from "../../components/ui/ProductCard"
import { Skeleton } from "../../components/ui"
import { useSEO } from "../../hooks/useSEO"

const COLLECTIONS = [
  { num: "01", label: "Surveillance",  name: "CCTV Systems",      desc: "Cinematic clarity, 24/7 watch.",   cat: "CCTV",           col: "col-span-12 md:col-span-7", aspect: "aspect-[4/3]" },
  { num: "02", label: "Perimeter",     name: "Alarm Systems",     desc: "Instant alert, total peace.",      cat: "Alarms",         col: "col-span-12 md:col-span-5", aspect: "aspect-[4/3]" },
  { num: "03", label: "Access",        name: "Control Systems",   desc: "Who enters. You decide.",          cat: "Access Control", col: "col-span-12 md:col-span-5", aspect: "aspect-[4/3]" },
  { num: "04", label: "Connected",     name: "Networking",        desc: "Infrastructure for the future.",   cat: "Networking",     col: "col-span-12 md:col-span-7", aspect: "aspect-[4/3]" },
]

export default function Home() {
  useSEO({ title: "Premium Security Systems Nigeria", description: "Shop 500+ genuine CCTV, alarm systems, access control and networking products for homes and businesses across Nigeria." })
  const [featured, setFeatured] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    productsApi.getFeatured().then(res => setFeatured(res.data.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-surface text-on-surface">

      <section className="relative h-[88vh] min-h-[600px] px-4 md:px-6 mb-24">
        <div className="w-full h-full rounded-md overflow-hidden relative ghost-border">
          <div className="absolute inset-0 bg-gradient-to-br from-on-surface via-primary-container to-primary" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />
          <div className="absolute bottom-14 left-10 md:left-14 max-w-2xl">
            <span className="label-overline text-white/70 mb-5 block anim-fade-up">Premium Electronic Security</span>
            <h1 className="headline-display text-5xl md:text-8xl text-white leading-none tracking-tighter mb-8 anim-fade-up delay-1">SAFE.<br />SECURE.<br />CERTAIN.</h1>
            <div className="flex flex-wrap gap-4 anim-fade-up delay-2">
              <Link to="/products" className="bg-white text-primary px-10 py-5 rounded-sm font-headline font-bold text-xs tracking-[0.2em] uppercase hover:bg-surface-variant transition-all active:scale-95">Explore Collection</Link>
              <Link to="/products?isFeatured=true" className="border border-white/30 text-white px-10 py-5 rounded-sm font-headline font-bold text-xs tracking-[0.2em] uppercase hover:border-white/60 transition-all">View Featured</Link>
            </div>
          </div>
          <div className="absolute top-10 right-10 text-right hidden md:block anim-fade-up delay-3">
            <p className="font-headline font-black text-5xl text-white/20 leading-none">500+</p>
            <p className="label-overline text-white/40 mt-1">Products</p>
          </div>
        </div>
      </section>

      <section className="container-main mb-32">
        <div className="flex justify-between items-end mb-16">
          <div className="max-w-md">
            <h2 className="headline-lg text-4xl text-on-surface mb-4 tracking-tight">CURATED SELECTIONS</h2>
            <p className="font-body text-secondary text-sm leading-relaxed">Professional-grade systems selected for architectural integrity and technical excellence.</p>
          </div>
          <Link to="/products" className="label-overline text-on-surface/60 border-b border-primary/20 pb-1 hover:border-primary hover:text-on-surface transition-colors hidden md:block">View All Products</Link>
        </div>
        <div className="asymmetric-grid">
          {COLLECTIONS.map((col, i) => (
            <Link key={col.cat} to={`/products?category=${encodeURIComponent(col.cat)}`}
              className={`${col.col} ${col.aspect} bg-surface-container-low rounded-md overflow-hidden group ghost-border anim-fade-up`}
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="relative h-full w-full">
                <div className={`absolute inset-0 ${i % 2 === 0 ? "bg-gradient-to-br from-inverse-surface/80 to-primary-container" : "bg-gradient-to-br from-primary to-primary-fixed-dim"}`} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="label-overline text-white/60 mb-2">{col.num}. {col.label}</p>
                  <h4 className="headline-lg text-2xl md:text-3xl font-bold text-white">{col.name}</h4>
                  <p className="font-body text-sm text-white/60 mt-1">{col.desc}</p>
                </div>
                <div className="absolute top-8 right-8 w-9 h-9 border border-white/20 rounded-sm flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/50 transition-all duration-300">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface-container-low section-xl mb-20 overflow-hidden">
        <div className="container-main grid grid-cols-1 md:grid-cols-2 items-center gap-20 md:gap-28">
          <div className="relative">
            <div className="w-full aspect-[3/4] bg-white rounded-md p-5 ghost-border">
              <div className="w-full h-full bg-surface-container rounded-sm overflow-hidden flex items-center justify-center">
                <div className="text-center p-10">
                  <div className="w-24 h-24 bg-inverse-surface rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <p className="font-headline font-bold text-on-surface/20 text-sm tracking-widest uppercase">Sentinel Pro</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-tertiary-container rounded-md items-center justify-center p-7 hidden md:flex">
              <p className="font-headline font-bold text-center text-on-tertiary-container leading-tight text-sm uppercase tracking-wide">PROFESSIONAL GRADE</p>
            </div>
          </div>
          <div>
            <span className="label-overline text-tertiary block mb-6">Spotlight System</span>
            <h2 className="headline-lg text-4xl md:text-5xl text-on-surface mb-6 leading-tight">The Sentinel Pro Series</h2>
            <p className="font-body text-secondary text-base leading-relaxed mb-10 opacity-80">Our flagship security ecosystem. Engineered for commercial precision, refined for residential elegance.</p>
            <div className="space-y-4 mb-12">
              {["4K Ultra HD Resolution","AI-Powered Motion Detection","Remote Monitoring Anywhere","5-Year Warranty Included"].map(spec => (
                <div key={spec} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <p className="font-label text-sm uppercase tracking-wider text-on-surface-variant">{spec}</p>
                </div>
              ))}
            </div>
            <Link to="/products?category=CCTV" className="btn-primary inline-flex">Explore Systems</Link>
          </div>
        </div>
      </section>

      <section className="container-main section-xl">
        <div className="text-center mb-16">
          <h3 className="label-overline text-secondary mb-4">Handpicked</h3>
          <h2 className="headline-lg text-4xl text-on-surface">Featured Products</h2>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => <div key={i}><Skeleton className="aspect-[3/4] mb-4" /><Skeleton className="h-3 w-1/3 mb-2" /><Skeleton className="h-4 w-3/4 mb-2" /><Skeleton className="h-3 w-1/4" /></div>)}
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center py-16"><p className="font-body text-secondary mb-6">No featured products yet.</p><Link to="/products" className="btn-primary inline-flex">Browse All Products</Link></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {featured.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </div>
        )}
      </section>

      <section className="container-main section-xl">
        <div className="bg-primary text-on-primary p-16 md:p-20 rounded-md text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at center, white, transparent 70%)" }} />
          <h3 className="headline-lg text-4xl md:text-5xl font-bold mb-5 relative z-10">PROTECT YOUR WORLD</h3>
          <p className="font-body text-on-primary/60 mb-10 max-w-lg mx-auto relative z-10 leading-relaxed">Receive exclusive access to new arrivals, security advisory content, and member-only offers.</p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
            <input type="email" placeholder="Email address" className="bg-white/10 border-0 rounded-sm px-6 py-4 flex-grow text-white placeholder:text-white/40 font-body text-sm outline-none focus:ring-1 focus:ring-white/30" />
            <button className="bg-white text-primary px-8 py-4 rounded-sm font-headline font-bold text-xs tracking-[0.2em] uppercase hover:bg-surface-variant transition-colors shrink-0">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  )
}
'@

Write-Host "Home page written..." -ForegroundColor Gray

# =============================================================
# src/pages/Products/index.jsx
# =============================================================

Write-File "src\pages\Products\index.jsx" @'
import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import { productsApi } from "../../api/services"
import ProductCard from "../../components/ui/ProductCard"
import { LoadingPage, EmptyState, Pagination, Skeleton } from "../../components/ui"
import { useSEO } from "../../hooks/useSEO"

const CATEGORIES   = ["CCTV","Alarms","Access Control","Intercom","Networking","Other"]
const SORT_OPTIONS = [{ label: "Newest", value: "-createdAt" },{ label: "Price: Low", value: "price" },{ label: "Price: High", value: "-price" },{ label: "Top Rated", value: "-ratings" }]
const PRICE_RANGES = [{ label: "All Prices", min: "", max: "" },{ label: "Under N10k", min: "", max: "10000" },{ label: "N10k - N50k", min: "10000", max: "50000" },{ label: "N50k - N100k", min: "50000", max: "100000" },{ label: "Over N100k", min: "100000", max: "" }]

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [total, setTotal]       = useState(0)
  const [pages, setPages]       = useState(1)
  const [loading, setLoading]   = useState(true)

  const page     = Number(searchParams.get("page") || 1)
  const category = searchParams.get("category") || ""
  const sort     = searchParams.get("sort")     || "-createdAt"
  const search   = searchParams.get("search")   || ""
  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""
  const inStock  = searchParams.get("inStock")  || ""

  useSEO({ title: category ? `${category} Systems` : "All Products", description: `Shop professional ${category || "security"} systems in Nigeria. Genuine products, fast delivery.` })

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await productsApi.getAll({ page, limit: 12, ...(category && { category }), ...(sort && { sort }), ...(search && { search }), ...(minPrice && { minPrice }), ...(maxPrice && { maxPrice }), ...(inStock && { inStock: true }) })
      setProducts(res.data.data); setTotal(res.data.total || 0); setPages(res.data.pages || 1)
    } catch {} finally { setLoading(false) }
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
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">Shop</span>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h1 className="headline-lg text-4xl text-on-surface">{category || "All Products"}{total > 0 && <span className="ml-3 font-body font-normal text-lg text-secondary">({total})</span>}</h1>
            <select value={sort} onChange={e => setParam("sort", e.target.value)} className="input-field w-auto py-2 text-xs font-label uppercase tracking-wider">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="container-main py-12">
        <div className="flex gap-12">
          <aside className="hidden md:block w-52 shrink-0">
            <div className="space-y-10 sticky top-28">
              <div>
                <p className="label-overline mb-3">Search</p>
                <div className="relative">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input type="text" placeholder="Search..." value={search} onChange={e => setParam("search", e.target.value)} className="input-field pl-8 py-2.5 text-xs" />
                </div>
              </div>
              <div>
                <p className="label-overline mb-4">Category</p>
                <div className="space-y-1">
                  {["", ...CATEGORIES].map(c => (
                    <button key={c || "all"} onClick={() => setParam("category", c)}
                      className={`w-full text-left px-3 py-2 text-sm font-body rounded-sm transition-colors ${c === category ? "bg-on-surface text-inverse-on-surface font-medium" : "text-secondary hover:bg-surface-container hover:text-on-surface"}`}>
                      {c || "All Categories"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="label-overline mb-4">Price Range</p>
                <div className="space-y-1">
                  {PRICE_RANGES.map(r => (
                    <button key={r.label} onClick={() => setPriceRange(r.min, r.max)}
                      className={`w-full text-left px-3 py-2 text-sm font-body rounded-sm transition-colors ${r.label === activePriceLabel ? "bg-on-surface text-inverse-on-surface font-medium" : "text-secondary hover:bg-surface-container hover:text-on-surface"}`}>
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="label-overline mb-3">Availability</p>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={!!inStock} onChange={e => setParam("inStock", e.target.checked ? "true" : "")} className="w-3.5 h-3.5 accent-on-surface" />
                  <span className="font-body text-sm text-secondary">In stock only</span>
                </label>
              </div>
              {hasFilters && <button onClick={() => setSearchParams({})} className="label-overline text-tertiary hover:text-on-surface transition-colors text-left">Clear all filters</button>}
            </div>
          </aside>
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[...Array(6)].map((_, i) => <div key={i}><Skeleton className="aspect-[3/4] mb-4" /><Skeleton className="h-2.5 w-1/3 mb-2" /><Skeleton className="h-4 w-3/4 mb-2" /><Skeleton className="h-3 w-1/4" /></div>)}
              </div>
            ) : products.length === 0 ? (
              <EmptyState title="No products found" description="Try adjusting your filters or search terms."
                action={<button onClick={() => setSearchParams({})} className="btn-secondary mt-4">Clear Filters</button>} />
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-14">
                  {products.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
                </div>
                <div className="flex justify-center"><Pagination page={page} pages={pages} onPageChange={p => setParam("page", p)} /></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
'@

Write-Host "Products listing page written..." -ForegroundColor Gray

# =============================================================
# src/pages/Cart/index.jsx
# =============================================================

Write-File "src\pages\Cart\index.jsx" @'
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useCart } from "../../context/CartContext"
import { Price, EmptyState } from "../../components/ui"
import { trackEvent } from "../../hooks/useAnalytics"
import { useSEO } from "../../hooks/useSEO"
import toast from "react-hot-toast"

export default function Cart() {
  useSEO({ title: "Your Cart" })
  const { cart, updateItem, removeItem, clearCart } = useCart()
  const navigate  = useNavigate()
  const [clearing, setClearing] = useState(false)

  const subtotal = cart?.totalPrice || 0
  const shipping = subtotal >= 50000 ? 0 : 2500
  const total    = subtotal + shipping
  const progress = Math.min(100, (subtotal / 50000) * 100)

  const handleUpdate = async (id, qty) => {
    try { await updateItem(id, qty) } catch (err) { toast.error(err.response?.data?.message || "Failed to update") }
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
            <button onClick={handleClear} disabled={clearing} className="label-overline text-secondary hover:text-error transition-colors">{clearing ? "Clearing..." : "Clear all"}</button>
          </div>
        </div>
      </div>
      <div className="container-main py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 divide-y divide-outline-variant/15">
            {cart.items.map(item => (
              <div key={item._id} className="flex gap-5 py-7">
                <Link to={`/products/${item.product?._id}`} className="w-24 h-24 bg-surface-container-low rounded-md overflow-hidden shrink-0 ghost-border">
                  {item.product?.images?.[0] ? <img src={item.product.images[0]} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" /> : <div className="w-full h-full" />}
                </Link>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <span className="label-overline text-tertiary block mb-1">{item.product?.category}</span>
                    <Link to={`/products/${item.product?._id}`} className="font-headline font-bold text-base text-on-surface hover:text-primary-fixed transition-colors line-clamp-2 leading-snug">{item.product?.name}</Link>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center bg-surface-container-high rounded-sm">
                      <button onClick={() => item.quantity > 1 ? handleUpdate(item.product?._id, item.quantity - 1) : handleRemove(item.product?._id)} className="w-8 h-9 flex items-center justify-center text-secondary hover:text-on-surface transition-colors text-sm">-</button>
                      <span className="w-7 text-center font-label font-bold text-xs">{item.quantity}</span>
                      <button onClick={() => handleUpdate(item.product?._id, item.quantity + 1)} className="w-8 h-9 flex items-center justify-center text-secondary hover:text-on-surface transition-colors text-sm">+</button>
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
          <div>
            <div className="bg-surface-container-low rounded-md p-6 ghost-border sticky top-28">
              <h2 className="headline-md text-lg text-on-surface mb-6">Summary</h2>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm"><span className="font-body text-secondary">Subtotal</span><Price amount={subtotal} className="text-sm text-on-surface" /></div>
                <div className="flex justify-between text-sm"><span className="font-body text-secondary">Shipping</span>{shipping === 0 ? <span className="font-label text-[10px] uppercase tracking-wider text-on-surface font-bold">Free</span> : <Price amount={shipping} className="text-sm text-on-surface" />}</div>
              </div>
              {subtotal < 50000 && (
                <div className="mb-5">
                  <p className="font-label text-[10px] text-secondary uppercase tracking-wider mb-2">Add <span className="text-on-surface font-bold">N{(50000 - subtotal).toLocaleString()}</span> for free shipping</p>
                  <div className="h-0.5 bg-surface-container-highest rounded-full overflow-hidden"><div className="h-full bg-on-surface rounded-full transition-all duration-500" style={{ width: `${progress}%` }} /></div>
                </div>
              )}
              <div className="border-t border-outline-variant/20 pt-4 mb-6 flex justify-between">
                <span className="font-headline font-bold text-sm text-on-surface">Total</span>
                <Price amount={total} className="text-base text-on-surface" />
              </div>
              <button onClick={() => { trackEvent.beginCheckout(); navigate("/checkout") }} className="btn-primary w-full mb-3">Proceed to Checkout</button>
              <Link to="/products" className="block text-center label-overline text-secondary hover:text-on-surface transition-colors">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'@

Write-Host "Cart page written..." -ForegroundColor Gray

# =============================================================
# src/pages/Checkout/index.jsx
# =============================================================

Write-File "src\pages\Checkout\index.jsx" @'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { ordersApi, paymentApi } from "../../api/services"
import { Price } from "../../components/ui"
import { useSEO } from "../../hooks/useSEO"
import toast from "react-hot-toast"

const STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"]
const STEPS  = ["Address","Payment","Review"]

export default function Checkout() {
  useSEO({ title: "Checkout" })
  const { cart, fetchCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep]         = useState(0)
  const [address, setAddress]   = useState({ street: "", city: "", state: "Rivers", country: "Nigeria" })
  const [payment, setPayment]   = useState("paystack")
  const [loading, setLoading]   = useState(false)

  const subtotal = cart?.totalPrice || 0
  const shipping = subtotal >= 50000 ? 0 : 2500
  const total    = subtotal + shipping
  const setAddr  = k => e => setAddress(a => ({ ...a, [k]: e.target.value }))

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
        navigate(`/orders/${order._id}`)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order")
    } finally { setLoading(false) }
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-10">
          <span className="label-overline text-tertiary mb-3 block">Secure</span>
          <h1 className="headline-lg text-4xl text-on-surface mb-8">Checkout</h1>
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 ${i <= step ? "opacity-100" : "opacity-40"}`}>
                  <div className={`w-6 h-6 flex items-center justify-center text-[10px] font-headline font-bold rounded-sm transition-colors ${i < step ? "bg-on-surface text-inverse-on-surface" : i === step ? "bg-tertiary-container text-on-tertiary-container" : "bg-surface-container-high text-secondary"}`}>
                    {i < step ? "v" : i + 1}
                  </div>
                  <span className={`font-label text-[10px] uppercase tracking-wider ${i === step ? "text-on-surface" : "text-secondary"}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className="w-8 h-px bg-outline-variant/30 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-main py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            {step === 0 && (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border anim-fade-up">
                <h2 className="headline-md text-xl text-on-surface mb-7">Shipping Address</h2>
                <div className="space-y-4">
                  <div><label className="label-overline mb-2 block">Street Address</label><input type="text" required value={address.street} onChange={setAddr("street")} className="input-field" placeholder="12 Aba Road" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="label-overline mb-2 block">City</label><input type="text" required value={address.city} onChange={setAddr("city")} className="input-field" placeholder="Port Harcourt" /></div>
                    <div><label className="label-overline mb-2 block">State</label><select value={address.state} onChange={setAddr("state")} className="input-field">{STATES.map(s => <option key={s}>{s}</option>)}</select></div>
                  </div>
                </div>
                <button onClick={() => { if (!address.street || !address.city) { toast.error("Fill in address"); return } setStep(1) }} className="btn-primary mt-7">Continue to Payment</button>
              </div>
            )}
            {step === 1 && (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border anim-fade-up">
                <div className="flex items-center gap-4 mb-7">
                  <button onClick={() => setStep(0)} className="label-overline text-secondary hover:text-on-surface transition-colors">Back</button>
                  <h2 className="headline-md text-xl text-on-surface">Payment Method</h2>
                </div>
                <div className="space-y-3 mb-7">
                  {[{ value: "paystack", label: "Pay with Paystack", desc: "Cards, bank transfer, USSD" },{ value: "bank_transfer", label: "Direct Bank Transfer", desc: "Pay directly to our account" }].map(opt => (
                    <label key={opt.value} className={`flex items-start gap-4 p-5 rounded-sm cursor-pointer transition-all ${payment === opt.value ? "bg-on-surface text-inverse-on-surface" : "bg-surface-container hover:bg-surface-container-high"}`}>
                      <input type="radio" name="payment" value={opt.value} checked={payment === opt.value} onChange={() => setPayment(opt.value)} className="mt-1 shrink-0" />
                      <div>
                        <p className={`font-headline font-bold text-sm mb-0.5 ${payment === opt.value ? "text-inverse-on-surface" : "text-on-surface"}`}>{opt.label}</p>
                        <p className={`font-body text-xs ${payment === opt.value ? "text-inverse-on-surface/60" : "text-secondary"}`}>{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="btn-primary">Review Order</button>
              </div>
            )}
            {step === 2 && (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border anim-fade-up">
                <div className="flex items-center gap-4 mb-7">
                  <button onClick={() => setStep(1)} className="label-overline text-secondary hover:text-on-surface transition-colors">Back</button>
                  <h2 className="headline-md text-xl text-on-surface">Review and Place Order</h2>
                </div>
                <div className="space-y-3 mb-8">
                  <div className="bg-surface-container rounded-sm p-4"><p className="label-overline mb-1.5">Shipping To</p><p className="font-body text-sm text-on-surface">{address.street}, {address.city}, {address.state}, Nigeria</p></div>
                  <div className="bg-surface-container rounded-sm p-4"><p className="label-overline mb-1.5">Payment</p><p className="font-body text-sm text-on-surface capitalize">{payment.replace("_"," ")}</p></div>
                </div>
                <button onClick={handlePlaceOrder} disabled={loading} className="btn-primary w-full">{loading ? "Processing..." : payment === "paystack" ? `Pay N${total.toLocaleString()}` : "Place Order"}</button>
                <p className="font-label text-[10px] text-secondary text-center mt-4 flex items-center justify-center gap-1.5 uppercase tracking-wider">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Secured by SSL encryption
                </p>
              </div>
            )}
          </div>
          <div className="lg:col-span-2">
            <div className="bg-surface-container-low rounded-md p-6 ghost-border sticky top-28">
              <h2 className="headline-md text-base text-on-surface mb-5">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-52 overflow-y-auto scrollbar-hide divide-y divide-outline-variant/10">
                {cart?.items?.map(item => (
                  <div key={item._id} className="flex items-center gap-3 pt-3 first:pt-0">
                    <div className="w-11 h-11 bg-surface-container rounded-sm overflow-hidden shrink-0">{item.product?.images?.[0] && <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />}</div>
                    <p className="font-body text-xs text-on-surface flex-1 line-clamp-2">{item.product?.name}</p>
                    <span className="font-label text-[10px] text-secondary shrink-0">x{item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-outline-variant/20 pt-4 space-y-2.5">
                <div className="flex justify-between text-sm"><span className="font-body text-secondary">Subtotal</span><Price amount={subtotal} className="text-sm text-on-surface" /></div>
                <div className="flex justify-between text-sm"><span className="font-body text-secondary">Shipping</span>{shipping === 0 ? <span className="font-label text-[10px] uppercase tracking-wider text-on-surface font-bold">Free</span> : <Price amount={shipping} className="text-sm text-on-surface" />}</div>
                <div className="flex justify-between font-bold pt-2 border-t border-outline-variant/20"><span className="font-headline text-sm text-on-surface">Total</span><Price amount={total} className="text-base text-on-surface" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'@

Write-Host "Checkout page written..." -ForegroundColor Gray

# =============================================================
# src/pages/Products/Detail.jsx
# =============================================================

Write-File "src\pages\Products\Detail.jsx" @'
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { productsApi } from "../../api/services"
import { useCart } from "../../context/CartContext"
import { useAuth } from "../../context/AuthContext"
import { useWishlist } from "../../hooks/useWishlist"
import { useRecentlyViewed } from "../../hooks/useRecentlyViewed"
import { useSEO } from "../../hooks/useSEO"
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

  useSEO({
    title: product?.name || "Product",
    description: product ? `${product.description?.slice(0,150)}... Buy ${product.name} at Safemart Nigeria.` : "",
    image: product?.images?.[0],
    type: "product",
  })

  useEffect(() => {
    setLoading(true)
    productsApi.getById(id)
      .then(res => {
        const p = res.data.data
        setProduct(p); setActiveImg(0); addRecent(p)
        return productsApi.getAll({ category: p.category, limit: 5 })
      })
      .then(res => setRelated(res.data.data.filter(p => p._id !== id).slice(0,4)))
      .catch(() => {}).finally(() => setLoading(false))
  }, [id])

  const handleAdd = async () => {
    if (!user) { toast.error("Sign in to add to cart"); return }
    try { setAdding(true); await addToCart(product._id, qty); toast.success("Added to cart") }
    catch (err) { toast.error(err.response?.data?.message || "Failed") }
    finally { setAdding(false) }
  }

  const handleWishlist = () => { toggle(product); toast.success(wishlisted ? "Removed from wishlist" : "Saved to wishlist") }

  const handleZoom = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setZoomPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  const handleReview = async (e) => {
    e.preventDefault()
    if (!user) { toast.error("Sign in to leave a review"); return }
    try {
      setSubmitting(true)
      await productsApi.addReview(id, { rating: reviewRating, comment: reviewComment })
      toast.success("Review submitted"); setReviewComment("")
      const res = await productsApi.getById(id); setProduct(res.data.data)
    } catch (err) { toast.error(err.response?.data?.message || "Failed") }
    finally { setSubmitting(false) }
  }

  if (loading) return <LoadingPage />
  if (!product) return <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4"><p className="font-body text-secondary">Product not found.</p><Link to="/products" className="btn-primary">Browse Products</Link></div>

  const wishlisted   = isWishlisted(product._id)
  const hasDiscount  = product.discountPrice > 0
  const displayPrice = hasDiscount ? product.discountPrice : product.price
  const discount     = hasDiscount ? Math.round((1 - product.discountPrice / product.price) * 100) : 0
  const mainImage    = product.images?.[activeImg]

  return (
    <div className="bg-surface">
      <div className="bg-surface-container-low">
        <div className="container-main py-3 flex items-center gap-2 font-label text-[11px] text-secondary uppercase tracking-wider">
          <Link to="/" className="hover:text-on-surface transition-colors">Home</Link><span>/</span>
          <Link to="/products" className="hover:text-on-surface transition-colors">Products</Link><span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-on-surface transition-colors">{product.category}</Link><span>/</span>
          <span className="text-on-surface truncate max-w-[150px]">{product.name}</span>
        </div>
      </div>
      <div className="container-main py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24">
          <div className="space-y-3">
            <div className="relative aspect-square bg-surface-container-low rounded-md overflow-hidden cursor-crosshair group ghost-border" onMouseMove={handleZoom} onMouseLeave={() => setZoomPos(null)}>
              {mainImage ? (
                <>
                  <img src={mainImage} alt={product.name} className={`w-full h-full object-cover transition-opacity duration-200 ${zoomPos ? "opacity-0" : "opacity-100"}`} />
                  {zoomPos && <div className="absolute inset-0" style={{ backgroundImage: `url(${mainImage})`, backgroundSize: "220%", backgroundRepeat: "no-repeat", backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%` }} />}
                  <div className="absolute bottom-3 right-3 bg-surface-container-lowest/80 px-2.5 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"><span className="font-label text-[9px] uppercase tracking-wider text-secondary">Hover to zoom</span></div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-outline-variant"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-md overflow-hidden ghost-border transition-all duration-200 ${i === activeImg ? "ring-2 ring-on-surface" : "opacity-50 hover:opacity-80"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="label-overline text-tertiary mb-4">{product.category}</span>
            <h1 className="headline-lg text-3xl md:text-4xl text-on-surface mb-5 leading-tight">{product.name}</h1>
            {product.numReviews > 0 && <div className="mb-6"><Stars rating={product.ratings} count={product.numReviews} size={13} /></div>}
            <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-outline-variant/20">
              <Price amount={displayPrice} className="text-3xl text-on-surface" />
              {hasDiscount && <div className="flex items-center gap-2"><span className="price-text text-sm text-secondary line-through opacity-60">N{Number(product.price).toLocaleString()}</span><span className="status-badge bg-tertiary-container text-on-tertiary-container">-{discount}%</span></div>}
            </div>
            <p className="font-body text-secondary text-sm leading-relaxed mb-8">{product.description}</p>
            <div className="space-y-2 mb-10 text-sm">
              {product.brand && <div className="flex gap-4"><span className="font-label text-secondary w-16 shrink-0 uppercase text-[11px] tracking-wider">Brand</span><span className="font-body font-medium text-on-surface">{product.brand}</span></div>}
              <div className="flex gap-4"><span className="font-label text-secondary w-16 shrink-0 uppercase text-[11px] tracking-wider">Stock</span><span className={`font-body font-medium ${product.stock > 0 ? "text-on-surface" : "text-error"}`}>{product.stock > 0 ? `${product.stock} available` : "Out of stock"}</span></div>
            </div>
            {product.stock > 0 && (
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center bg-surface-container-high rounded-sm">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-12 flex items-center justify-center text-secondary hover:text-on-surface transition-colors">-</button>
                  <span className="w-10 text-center font-label font-bold text-sm">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-10 h-12 flex items-center justify-center text-secondary hover:text-on-surface transition-colors">+</button>
                </div>
                <button onClick={handleAdd} disabled={adding} className="btn-primary flex-1">
                  {adding ? <><Spinner size="sm" className="border-on-primary/30 border-t-on-primary" /> Adding...</> : "Add to Cart"}
                </button>
                <button onClick={handleWishlist} className={`w-12 h-12 flex items-center justify-center rounded-sm transition-all ${wishlisted ? "bg-tertiary text-on-tertiary" : "bg-surface-container-high text-secondary hover:bg-tertiary hover:text-on-tertiary"}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 mt-auto pt-8 border-t border-outline-variant/20">
              {[["Lock","Genuine Product"],["Truck","Fast Delivery"],["Return","Easy Returns"],["Tool","Pro Support"]].map(([_,label]) => (
                <div key={label} className="flex items-center gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0" /><span className="font-label text-[10px] uppercase tracking-wider text-secondary">{label}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {product.stock > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-sm border-t border-outline-variant/20 md:hidden">
          <div className="container-main py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0"><p className="font-label text-[10px] uppercase tracking-wider text-secondary truncate">{product.name}</p><Price amount={displayPrice} className="text-sm text-on-surface" /></div>
            <button onClick={handleAdd} disabled={adding} className="btn-primary py-2.5 px-6 text-xs shrink-0">{adding ? "Adding..." : "Add to Cart"}</button>
          </div>
        </div>
      )}

      <div className="bg-surface-container-low">
        <div className="container-main py-16">
          <h2 className="headline-lg text-3xl text-on-surface mb-12">Reviews {product.numReviews > 0 && <span className="font-body font-normal text-lg text-secondary ml-2">({product.numReviews})</span>}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <div className="space-y-8">
              {product.reviews?.length === 0 && <p className="font-body text-sm text-secondary">No reviews yet. Be the first!</p>}
              {product.reviews?.map((r, i) => (
                <div key={i} className="pb-8 border-b border-outline-variant/20">
                  <div className="flex items-center justify-between mb-2"><p className="font-headline font-semibold text-sm text-on-surface">{r.user?.fullName || "Anonymous"}</p><Stars rating={r.rating} /></div>
                  <p className="font-body text-sm text-secondary leading-relaxed">{r.comment}</p>
                  <p className="font-label text-[10px] text-secondary/60 mt-2 uppercase tracking-wider">{new Date(r.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}</p>
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
                          <svg width="24" height="24" viewBox="0 0 24 24" fill={n <= reviewRating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className={n <= reviewRating ? "text-tertiary" : "text-outline-variant"}>
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div><p className="label-overline mb-2">Comment</p><textarea value={reviewComment} onChange={e => setReviewComment(e.target.value)} rows={4} required className="input-field resize-none" placeholder="Share your experience..." /></div>
                  <button type="submit" disabled={submitting} className="btn-primary">{submitting ? "Submitting..." : "Submit Review"}</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="container-main py-16">
          <div className="flex items-end justify-between mb-10">
            <h2 className="headline-lg text-2xl text-on-surface">Related Products</h2>
            <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="label-overline text-secondary hover:text-on-surface transition-colors">View all</Link>
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

Write-Host "Product detail page written..." -ForegroundColor Gray

Write-Host ""
Write-Host "=============================================" -ForegroundColor Green
Write-Host "  ALL FILES COMPLETE - SAFEMART INSTALLED!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Run: npm run dev" -ForegroundColor Cyan
Write-Host ""
