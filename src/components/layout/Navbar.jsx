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
        const res = await productsApi.getAll({ keyword: val, limit: 5 })
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

  const drawerSections = [
    {
      heading: "Shop",
      links: [
        { to: "/products",                  label: "All Products",  icon: "M4 6h16M4 12h16M4 18h16" },
        { to: "/products?isFeatured=true",  label: "Collections",  icon: "M5 3l14 9-14 9V3z" },
        { to: "/products?sort=newest",  label: "New Arrivals", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
      ],
    },
    ...(user ? [{
      heading: "Account",
      links: [
        { to: "/orders",   label: "My Orders", icon: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" },
        { to: "/wishlist", label: "Wishlist",   icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" },
        { to: "/profile",  label: "Profile",   icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
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
        { to: "/privacy-policy", label: "Privacy Policy",       icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { to: "/terms",          label: "Terms & Conditions",   icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" },
        { to: "/returns",        label: "Return Policy",        icon: "M3 10h10a8 8 0 0 1 8 8v2M3 10l6 6m-6-6l6-6" },
        { to: "/shipping",       label: "Shipping Policy",      icon: "M5 8h14M5 8a2 2 0 1 0-4 0v1a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 1 2-2V8m-14 0V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" },
      ],
    },
    ...(isAdmin ? [{
      heading: "Admin",
      links: [
        { to: "/admin", label: "Admin Panel", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
      ],
    }] : []),
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
              `font-headline font-bold text-sm tracking-tight transition-colors ${isActive ? "text-on-surface border-b-2 border-on-surface pb-0.5" : "text-secondary hover:text-on-surface"}`
            }>Products</NavLink>
            <NavLink to="/products?isFeatured=true" className={({ isActive }) =>
              `font-headline font-bold text-sm tracking-tight transition-colors ${isActive ? "text-on-surface border-b-2 border-on-surface pb-0.5" : "text-secondary hover:text-on-surface"}`
            }>Collections</NavLink>
            {isAdmin && (
              <NavLink to="/admin" className={({ isActive }) =>
                `font-label text-[10px] tracking-editorial uppercase transition-colors ${isActive ? "text-tertiary" : "text-tertiary/50 hover:text-tertiary"}`
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
            {wishCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-tertiary text-on-tertiary text-[8px] font-bold rounded-full flex items-center justify-center anim-glow">{wishCount}</span>}
          </Link>
          <Link to="/cart" className="relative w-8 h-8 flex items-center justify-center text-secondary hover:text-on-surface transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {itemCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-tertiary text-on-tertiary text-[8px] font-bold rounded-full flex items-center justify-center anim-glow">{itemCount > 9 ? "9+" : itemCount}</span>}
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
        <aside className={`fixed left-0 top-0 h-full w-72 glass-panel z-[70] flex flex-col shadow-drawer transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-outline-variant/20">
            <span className="font-headline font-black tracking-[0.2em] text-base uppercase">SAFEMART</span>
            <button onClick={() => setDrawerOpen(false)} className="w-8 h-8 flex items-center justify-center text-secondary hover:text-on-surface transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {/* User info */}
          {user && (
            <div className="px-6 py-4 glass-chip mx-4 mt-4 rounded-md">
              <p className="font-headline font-semibold text-sm text-on-surface">{user.fullName}</p>
              <p className="font-label text-[11px] text-secondary mt-0.5">{user.email}</p>
            </div>
          )}

          {/* Links */}
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
          <div className="relative glass-panel shadow-ambient-lg anim-fade-up overflow-hidden">
            <div className="absolute -top-10 right-10 w-40 h-40 rounded-full bg-tertiary/15 blur-3xl anim-float" />
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
                    <Link to={`/products?search=${searchQuery}`} onClick={closeSearch}
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
