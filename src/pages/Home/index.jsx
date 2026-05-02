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
  "Remote Monitoring - Anywhere",
  "5-Year Warranty Included",
]

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productsApi.getFeatured()
      .then(res => setFeatured(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-surface text-on-surface">
      <section className="relative h-[88vh] min-h-[600px] px-4 md:px-6 mb-24">
        <div className="w-full h-full rounded-[1.75rem] overflow-hidden relative glass-hero">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="absolute -top-24 right-[-5%] w-[34rem] h-[34rem] rounded-full bg-white/10 blur-3xl anim-float" />
          <div className="absolute -bottom-20 left-[-8%] w-[28rem] h-[28rem] rounded-full bg-white/8 blur-3xl anim-float" style={{ animationDelay: "1.5s" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-transparent to-black/46" />

          <div className="absolute bottom-14 left-10 md:left-14 max-w-2xl">
            <span className="label-overline text-white/70 mb-5 block anim-fade-up">Trusted Security Systems for Home and Business</span>
            <h1 className="headline-display text-5xl md:text-8xl text-white leading-none tracking-tighter mb-8 anim-fade-up delay-1">
              SAFE.<br />SECURE.<br />CERTAIN.
            </h1>
            <p className="max-w-2xl text-base text-white/80 mb-8 anim-fade-up delay-1.5">
              Secure every perimeter with proven surveillance, access control, and alarm solutions designed for demanding environments.
            </p>
            <div className="flex flex-wrap gap-4 anim-fade-up delay-2">
              <Link to="/products" className="bg-white text-primary px-10 py-5 rounded-sm font-headline font-bold text-xs tracking-[0.2em] uppercase hover:bg-on-primary-fixed-variant transition-all active:scale-95">
                Browse Security Systems
              </Link>
              <Link to="/products?isFeatured=true" className="border border-white/30 text-white px-10 py-5 rounded-sm font-headline font-bold text-xs tracking-[0.2em] uppercase hover:border-white/60 transition-all">
                View Featured
              </Link>
            </div>
          </div>

          <div className="absolute top-10 right-10 text-right hidden md:block anim-fade-up delay-3">
            <div className="glass-chip rounded-2xl px-6 py-5">
              <p className="font-headline font-black text-5xl text-white/80 leading-none">500+</p>
              <p className="label-overline text-white/55 mt-1">Products</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-main mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: "24/7 Monitoring Ready",
              desc: "Systems built for nonstop surveillance, instant alerts, and dependable response.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M12 21s-8-4-8-10 8-9 8-9 8 4 8 9-8 10-8 10z" />
                  <path d="M9.5 12.5l1.5 1.5 4-4" />
                </svg>
              ),
            },
            {
              title: "Certified Security Brands",
              desc: "Trusted equipment from vetted manufacturers and installers.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
                </svg>
              ),
            },
            {
              title: "Rapid Response Support",
              desc: "Expert pre-sale advice and post-sale service across Nigeria.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M18 8a6 6 0 0 0-12 0c0 3.3 2 6 4.5 7.2V21l3-1.5 3 1.5v-5.8C16 14 18 11.3 18 8z" />
                  <path d="M12 2v6" />
                </svg>
              ),
            },
            {
              title: "Built for Resilience",
              desc: "Rugged solutions designed for outdoor, commercial, and industrial use.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M13 2l7 4-2 7-5 2-5 2-2-7 7-4z" />
                  <path d="M12 10v6" />
                  <path d="M10 14h4" />
                </svg>
              ),
            },
          ].map(item => (
            <div key={item.title} className="group glass-card rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:border-tertiary/40 hover:shadow-ambient-lg">
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-tertiary transition-all duration-300 group-hover:bg-primary group-hover:text-on-primary group-hover:anim-glow">
                {item.icon}
              </div>
              <p className="font-label uppercase tracking-[0.3em] text-secondary mb-3 group-hover:text-on-surface transition-colors duration-300">{item.title}</p>
              <p className="font-body text-sm text-secondary leading-relaxed group-hover:text-on-surface/80 transition-colors duration-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-main mb-32">
        <div className="flex justify-between items-end mb-16">
          <div className="max-w-md">
            <h2 className="headline-lg text-4xl text-on-surface mb-4 tracking-tight">PROFESSIONAL SECURITY COLLECTIONS</h2>
            <p className="font-body text-secondary text-sm leading-relaxed">
              Professional-grade systems selected for architectural integrity and technical excellence.
            </p>
          </div>
          <Link to="/products" className="label-overline text-on-surface/60 border-b border-primary/20 pb-1 hover:border-primary hover:text-on-surface transition-colors hidden md:block">
            View All Products
          </Link>
        </div>

        <div className="asymmetric-grid">
          {COLLECTIONS.map((collection, i) => (
            <Link
              key={collection.cat}
              to={`/products?category=${encodeURIComponent(collection.cat)}`}
              className={`${collection.col} ${collection.aspect} rounded-[1.5rem] overflow-hidden group ghost-border anim-fade-up glass-card`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative h-full w-full">
                <div className={`absolute inset-0 ${i % 2 === 0 ? "bg-gradient-to-br from-primary via-primary-container to-tertiary-fixed-dim" : "bg-gradient-to-br from-primary-container via-primary-fixed-dim to-tertiary-fixed"}`} />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                <div className="absolute bottom-10 left-10 text-white">
                  <p className="label-overline text-white/60 mb-2">{collection.num}. {collection.label}</p>
                  <h4 className="headline-lg text-2xl md:text-3xl font-bold text-white">{collection.name}</h4>
                  <p className="font-body text-sm text-white/60 mt-1">{collection.desc}</p>
                </div>

                <div className="absolute top-8 right-8 w-9 h-9 border border-white/20 rounded-sm flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/50 transition-all duration-300">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface-container-low section-xl mb-20 overflow-hidden">
        <div className="container-main grid grid-cols-1 md:grid-cols-2 items-center gap-20 md:gap-28">
          <div className="relative">
            <div className="w-full aspect-[3/4] glass-card rounded-[1.75rem] p-5 ghost-border">
              <div className="w-full h-full bg-gradient-to-br from-surface-container to-surface-container-high rounded-2xl overflow-hidden flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(127,139,151,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(127,139,151,0.5) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                <div className="text-center p-10">
                  <div className="w-24 h-24 bg-inverse-surface rounded-full flex items-center justify-center mx-auto mb-6 anim-float">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <p className="font-headline font-bold text-on-surface/20 text-sm tracking-widest uppercase">Product Image</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-44 h-44 glass-card rounded-[1.5rem] hidden md:flex items-center justify-center p-7">
              <p className="font-headline font-bold text-center text-on-tertiary-container leading-tight text-sm uppercase tracking-wide">
                PROFESSIONAL<br />GRADE
              </p>
            </div>
          </div>

          <div>
            <span className="label-overline text-tertiary block mb-6">Spotlight System</span>
            <h2 className="headline-lg text-4xl md:text-5xl text-on-surface mb-6 leading-tight">
              The Sentinel<br />Pro Series
            </h2>
            <p className="font-body text-secondary text-base leading-relaxed mb-10 opacity-80">
              Our flagship security ecosystem combines advanced surveillance, alarm integration, and access control for complete perimeter protection.
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
            {featured.map((product, i) => <ProductCard key={product._id} product={product} index={i} />)}
          </div>
        )}
      </section>

      <section className="container-main section-xl">
        <div className="glass-hero text-on-primary p-16 md:p-20 rounded-[2rem] text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at center, white, transparent 70%)" }} />
          <div className="absolute -top-12 left-10 w-40 h-40 rounded-full bg-white/10 blur-3xl anim-float" />
          <div className="absolute -bottom-16 right-12 w-52 h-52 rounded-full bg-white/8 blur-3xl anim-float" style={{ animationDelay: "1.2s" }} />
          <h3 className="headline-lg text-4xl md:text-5xl font-bold mb-5 relative z-10">SECURE YOUR WORLD</h3>
          <p className="font-body text-on-primary/60 mb-10 max-w-lg mx-auto relative z-10 leading-relaxed">
            Receive exclusive access to new arrivals, security advisory content, and member-only offers.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
            <input type="email" placeholder="Email address" className="bg-white/10 border-0 rounded-sm px-6 py-4 flex-grow text-white placeholder:text-white/40 font-body text-sm outline-none focus:ring-1 focus:ring-white/30" />
            <button className="bg-white text-primary px-8 py-4 rounded-sm font-headline font-bold text-xs tracking-[0.2em] uppercase hover:bg-surface-variant transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
