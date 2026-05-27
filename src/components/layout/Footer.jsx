import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-surface-container-low pt-12 pb-16 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-outline-variant/50 to-transparent" />
      <div className="container-main">

        {/* --- TRUST BADGES --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 border-b border-outline-variant/20 pb-8 text-left">
          {[
            { label: "Secured Nodes", desc: "End-to-end encryption" },
            { label: "5-Year Guarantee", desc: "Premium series warranty" },
            { label: "Nigeria Coverage", desc: "Shipping across all 36 states" },
            { label: "Expert Deployment", desc: "Certified systems support" }
          ].map(badge => (
            <div key={badge.label} className="space-y-1">
              <p className="font-label font-bold text-[10px] uppercase tracking-[0.15em] text-on-surface">{badge.label}</p>
              <p className="font-body text-xs text-secondary opacity-80">{badge.desc}</p>
            </div>
          ))}
        </div>

        {/* --- BRAND INFO & NAVIGATION COLUMNS --- */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-14 mb-16 text-left">
          <div className="max-w-xs space-y-5">
            <h4 className="font-headline font-black text-lg tracking-[0.2em] uppercase text-on-surface">SAFEMART</h4>
            <p className="font-body text-secondary text-sm leading-relaxed">
              A curated collection of trusted security systems, access control, and surveillance solutions. We believe protection should be as refined as the spaces it guards.
            </p>
            <div className="space-y-2">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-secondary">Trusted for</p>
              <div className="flex flex-wrap gap-2">
                {["Homes", "Retail", "Offices", "Estates"].map(item => (
                  <span key={item} className="status-badge bg-surface-container text-on-surface">{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14">
            <div className="space-y-4">
              <h5 className="font-label font-bold text-[10px] uppercase tracking-[0.3em] text-on-surface">Shop</h5>
              <ul className="space-y-3">
                {[["All Products", "/products"], ["Collections", "/products?isFeatured=true"], ["New Arrivals", "/products?sort=-createdAt"], ["CCTV", "/products?category=CCTV"], ["Alarms", "/products?category=Alarms"]].map(([label, to]) => (
                  <li key={to}><Link to={to} className="font-body text-sm text-secondary hover:text-on-surface underline underline-offset-2 decoration-outline-variant hover:decoration-on-surface transition-colors opacity-80 hover:opacity-100">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-label font-bold text-[10px] uppercase tracking-[0.3em] text-on-surface">Account</h5>
              <ul className="space-y-3">
                {[["Sign In", "/login"], ["Register", "/register"], ["Orders", "/orders"], ["Wishlist", "/wishlist"], ["Profile", "/profile"]].map(([label, to]) => (
                  <li key={to}><Link to={to} className="font-body text-sm text-secondary hover:text-on-surface underline underline-offset-2 decoration-outline-variant hover:decoration-on-surface transition-colors opacity-80 hover:opacity-100">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-label font-bold text-[10px] uppercase tracking-[0.3em] text-on-surface">Company</h5>
              <ul className="space-y-3">
                {[["About Us", "/about"], ["Contact Us", "/contact"]].map(([label, to]) => (
                  <li key={to}><Link to={to} className="font-body text-sm text-secondary hover:text-on-surface underline underline-offset-2 decoration-outline-variant hover:decoration-on-surface transition-colors opacity-80 hover:opacity-100">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-label font-bold text-[10px] uppercase tracking-[0.3em] text-on-surface">Legal</h5>
              <ul className="space-y-3">
                {[["Privacy Policy", "/privacy-policy"], ["Terms & Conditions", "/terms"], ["Return Policy", "/returns"], ["Shipping Policy", "/shipping"]].map(([label, to]) => (
                  <li key={to}><Link to={to} className="font-body text-sm text-secondary hover:text-on-surface underline underline-offset-2 decoration-outline-variant hover:decoration-on-surface transition-colors opacity-80 hover:opacity-100">{label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BASE BAR --- */}
        <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-label text-[11px] text-secondary uppercase tracking-wider">&copy; {new Date().getFullYear()} SAFEMART. ALL RIGHTS RESERVED.</p>
          
          {/* Agency Credit */}
          <p className="font-body text-xs text-secondary opacity-80">
            Made with love by{" "}
            <a 
              href="https://clikconsult.com.ng" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-headline font-bold tracking-wider uppercase text-on-surface hover:text-primary transition-colors underline underline-offset-4 decoration-outline-variant"
            >
              clikconsult
            </a>
          </p>

          {/* Payment Icons & Bottom Menu Links */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            
            {/* Highly Visible Branded Card Container */}
           {/* Highly Visible Branded Dark Card Container */}
<div className="flex items-center gap-5 bg-[#0B111D] px-5 py-2.5 rounded-md border border-outline-variant/40 shadow-md">
  
  {/* BULLETPROOF 1-PATH VISA LOGO (Switched fill to white for high contrast on dark bg) */}
  <svg className="h-4 w-auto" viewBox="0 0 320 100" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
    <path d="M125.7 18.5H110l-12.8 61.5h15.6l12.9-61.5zm87.4 0c-4.1-1.6-10.7-3.3-19-3.3-21 0-35.8 11.2-35.9 27.2-.2 11.8 10.6 18.4 18.7 22.3 8.3 4 11.1 6.6 11.1 10.2-.1 5.5-6.6 8-12.8 8-8.2 0-12.6-1.3-19.3-4.2l-2.7-1.3-2.2 13.9c4.8 2.2 13.6 4.2 22.8 4.3 22.4 0 36.9-11.1 37.1-28.1.1-9.3-5.5-16.4-17.9-22.2-7.5-3.6-12.1-6-12.1-9.7.1-3.4 3.8-6.9 12-6.9 6.7-.1 11.6 1.4 15.6 3.1l2 1 2.2-14.2zm64.8-2.9c-3 0-5.7 1.7-6.9 4.4L228.3 80h16.4s2.7-7.6 3.3-9.3h20.1c.5 2.2 3.1 9.3 3.1 9.3h14.5l-20.2-61.5h-15.3zm-10.3 16.7c1.3-3.6 6.3-17 6.3-17s1.3 3.7 2.1 6.1c-2.4 6.7-7.2 20.6-7.2 20.6h-11.6c.1.1 2.4-6.3 10.4-9.7zm-207.2-13.8L40.7 61.5 35 15.1c-.5-2.7-2.6-4.5-5.3-5L2.3 5v8l10.9 2.3c2.3.5 3 1.3 3.6 3.5l14.1 53.6h16.5l24.9-61.5H60.4z"/>
  </svg>

  {/* Divider Line */}
  <div className="h-5 w-px bg-outline-variant/30" />

  {/* OFFICIAL MASTERCARD BRAND SVG */}
  <svg className="h-6 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#EB001B" fillOpacity="0.95"/>
    <circle cx="24" cy="12" r="10" fill="#FF5F00" fillOpacity="0.92"/>
    <path d="M18 4.414A9.957 9.957 0 0 1 21.996 12 9.956 9.956 0 0 1 18 19.586 9.957 9.957 0 0 1 14.004 12 9.956 9.956 0 0 1 18 4.414z" fill="#FF5F00"/>
  </svg>

</div>

            <div className="flex items-center gap-6">

</div>

            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="font-label text-[10px] text-secondary uppercase tracking-wider hover:text-on-surface transition-colors">Privacy</Link>
              <Link to="/terms" className="font-label text-[10px] text-secondary uppercase tracking-wider hover:text-on-surface transition-colors">Terms</Link>
              <Link to="/contact" className="font-label text-[10px] text-secondary uppercase tracking-wider hover:text-on-surface transition-colors">Contact</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}