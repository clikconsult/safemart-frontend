import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-surface-container-low py-20 px-6 md:px-10">
      <div className="container-main">
        <div className="flex flex-col md:flex-row justify-between items-start gap-14 mb-16">
          <div className="max-w-xs space-y-5">
            <h4 className="font-headline font-black text-lg tracking-[0.2em] uppercase text-on-surface">SAFEMART</h4>
            <p className="font-body text-secondary text-sm leading-relaxed">
              A curated collection of trusted security systems, access control, and surveillance solutions. We believe protection should be as refined as the spaces it guards.
            </p>
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

        <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-label text-[11px] text-secondary uppercase tracking-wider">&copy; {new Date().getFullYear()} SAFEMART. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="font-label text-[10px] text-secondary uppercase tracking-wider hover:text-on-surface transition-colors">Privacy</Link>
            <Link to="/terms" className="font-label text-[10px] text-secondary uppercase tracking-wider hover:text-on-surface transition-colors">Terms</Link>
            <Link to="/contact" className="font-label text-[10px] text-secondary uppercase tracking-wider hover:text-on-surface transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
