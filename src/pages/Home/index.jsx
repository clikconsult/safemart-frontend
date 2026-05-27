import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { productsApi } from "../../api/services"
import ProductCard from "../../components/ui/ProductCard"
import { Skeleton } from "../../components/ui"

const images = {
  sentinel:        "https://res.cloudinary.com/dt0y9z7fn/image/upload/q_auto/f_auto/v1778382712/Sentinel_onshmq.png",
  access:          "https://res.cloudinary.com/dt0y9z7fn/image/upload/q_auto/f_auto/v1778382712/Access_yo5do6.png",
  cctv:            "https://res.cloudinary.com/dt0y9z7fn/image/upload/q_auto/f_auto/v1778382712/CCTV_w69tpu.png",
  alarm:           "https://res.cloudinary.com/dt0y9z7fn/image/upload/q_auto/f_auto/v1778393182/Alarm_gofuxj.png",
  networking:      "https://res.cloudinary.com/dt0y9z7fn/image/upload/q_auto/f_auto/v1778382712/Networking_rquap6.png",
  hero_alarm:      "https://res.cloudinary.com/dt0y9z7fn/image/upload/q_auto/f_auto/v1779555426/ChatGPT_Image_May_23_2026_05_55_16_PM_drohh6.png",
  hero_cctv:       "https://res.cloudinary.com/dt0y9z7fn/image/upload/q_auto/f_auto/v1779555284/ChatGPT_Image_May_23_2026_05_48_56_PM_wjhgjl.png",
  hero_access:     "https://res.cloudinary.com/dt0y9z7fn/image/upload/q_auto/f_auto/v1779556870/ChatGPT_Image_May_23_2026_06_19_22_PM_imvxyc.png",
  hero_networking: "https://res.cloudinary.com/dt0y9z7fn/image/upload/q_auto/f_auto/v1779659007/ChatGPT_Image_May_24_2026_10_40_59_PM_npdrt5.png",
}

const HERO_SLIDES = [
  {
    image:        images.hero_cctv,
    badge:        "Shop Trusted Surveillance Systems — homes & businesses",
    heading:      "SAFE.\nSECURE.\nCERTAIN.",
    sub:          "Proven surveillance, access control, and alarm solutions.",
    primaryLink:  "/products?category=CCTV",
    primaryLabel: "Shop CCTV",
  },
  {
    image:        images.hero_alarm,
    badge:        "Shop Perimeter Protection",
    heading:      "ALERT.\nARMED.\nACTIVE.",
    sub:          "Instant notification the moment a threat appears.",
    primaryLink:  "/products?category=Alarms",
    primaryLabel: "Shop Alarms",
  },
  {
    image:        images.hero_access,
    badge:        "Shop Access Control Systems",
    heading:      "WHO\nENTERS.\nYOU DECIDE.",
    sub:          "Credentialed access for estates, offices, and residences.",
    primaryLink:  "/products?category=Access+Control",
    primaryLabel: "Shop Access Control",
  },
  {
    image:        images.hero_networking,
    badge:        "Shop Connected Infrastructure",
    heading:      "WIRED\nFOR THE\nFUTURE.",
    sub:          "Enterprise-grade networking for seamless security integration.",
    primaryLink:  "/products?category=Networking",
    primaryLabel: "Shop Networking",
  },
]

const COLLECTIONS = [
  { num: "01", label: "Surveillance", name: "CCTV Systems",    desc: "Cinematic clarity, 24/7 watch.",     cat: "CCTV",           image: images.cctv,       col: "col-span-12 md:col-span-7", aspect: "aspect-[4/3]" },
  { num: "02", label: "Perimeter",    name: "Alarm Systems",   desc: "Instant alert, total peace.",        cat: "Alarms",         image: images.alarm,      col: "col-span-12 md:col-span-5", aspect: "aspect-[4/3]" },
  { num: "03", label: "Access",       name: "Control Systems", desc: "Who enters. You decide.",            cat: "Access Control", image: images.access,     col: "col-span-12 md:col-span-5", aspect: "aspect-[4/3]" },
  { num: "04", label: "Connected",    name: "Networking",      desc: "Infrastructure for the future.",     cat: "Networking",     image: images.networking, col: "col-span-12 md:col-span-7", aspect: "aspect-[4/3]" },
]

const SPECS_SPOTLIGHT = [
  "4K Ultra HD resolution",
  "AI-powered motion detection",
  "Remote monitoring — anywhere",
  "5-year warranty included",
]

const INTERVAL_MS = 5000

export default function Home() {
  const [featured,    setFeatured]    = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [loading,     setLoading]     = useState(true)

  const [activeSlide, setActiveSlide] = useState(0)
  const [prevSlide,   setPrevSlide]   = useState(null)
  const [animating,   setAnimating]   = useState(false)
  const [progress,    setProgress]    = useState(0)
  const intervalRef   = useRef(null)
  const progressRef   = useRef(null)
  const progressStartRef = useRef(null)

  const goToSlide = (idx) => {
    if (animating || idx === activeSlide) return
    setAnimating(true)
    setPrevSlide(activeSlide)
    setActiveSlide(idx)
    setProgress(0)
    progressStartRef.current = performance.now()
    setTimeout(() => {
      setPrevSlide(null)
      setAnimating(false)
    }, 700)
  }

  const startAutoplay = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveSlide((s) => {
        const next = (s + 1) % HERO_SLIDES.length
        setPrevSlide(s)
        setAnimating(true)
        setProgress(0)
        progressStartRef.current = performance.now()
        setTimeout(() => {
          setPrevSlide(null)
          setAnimating(false)
        }, 700)
        return next
      })
    }, INTERVAL_MS)
  }

  const nextSlide = () => {
    clearInterval(intervalRef.current)
    goToSlide((activeSlide + 1) % HERO_SLIDES.length)
    startAutoplay()
  }

  const prevSlideBtn = () => {
    clearInterval(intervalRef.current)
    goToSlide((activeSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
    startAutoplay()
  }

  useEffect(() => {
    startAutoplay()
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    progressStartRef.current = performance.now()
    const tick = (now) => {
      const elapsed = now - (progressStartRef.current || now)
      setProgress(Math.min((elapsed / INTERVAL_MS) * 100, 100))
      progressRef.current = requestAnimationFrame(tick)
    }
    progressRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(progressRef.current)
  }, [activeSlide])

  useEffect(() => {
    ;(async () => {
      try {
        const [featRes, arrRes] = await Promise.all([
          productsApi.getFeatured(),
          productsApi.getAll({ sort: "newest", limit: 5 }),
        ])
        setFeatured(featRes.data.data)
        setNewArrivals(arrRes.data.data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const slide = HERO_SLIDES[activeSlide]

  return (
    <div className="bg-surface text-on-surface font-body antialiased selection:bg-[#0d1724] selection:text-white">

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes tickerLoop {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-ticker-track { animation: tickerLoop 24s linear infinite; }

        @keyframes heroSlideIn {
          from { opacity: 0; transform: scale(1.06); }
          to   { opacity: 0.65; transform: scale(1); }
        }
        @keyframes heroSlideOut {
          from { opacity: 0.65; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.97); }
        }
        @keyframes heroTextIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .carousel-img-enter { animation: heroSlideIn 0.7s cubic-bezier(0.4,0,0.2,1) forwards; }
        .carousel-img-exit  { animation: heroSlideOut 0.7s cubic-bezier(0.4,0,0.2,1) forwards; }
        .hero-text-enter    { animation: heroTextIn 0.55s cubic-bezier(0.4,0,0.2,1) 0.15s both; }
      `}} />

      {/* ─── HERO ─── */}
      <section className="w-[95%] max-w-7xl mx-auto pt-2 md:pt-4 mb-12">
        <div className="relative h-[420px] md:h-[520px] w-full rounded-[20px] overflow-hidden bg-[#0B111D] shadow-ambient">

          {/* Carousel images */}
          {HERO_SLIDES.map((s, i) => {
            const isActive  = i === activeSlide
            const isExiting = i === prevSlide
            if (!isActive && !isExiting) return null
            return (
              <img
                key={i}
                src={s.image}
                alt={s.badge}
                className={`absolute inset-0 w-full h-full object-cover mix-blend-lighten pointer-events-none select-none ${isActive ? "carousel-img-enter z-[1]" : "carousel-img-exit z-[0]"}`}
              />
            )
          })}

          {/* Dot-grid texture */}
          <div className="absolute inset-0 z-[2] opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-[3]" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent z-[4]" />

          {/* Progress bar */}
          <div className="absolute top-0 left-0 h-[2px] bg-white/10 w-full z-[10]">
            <div className="h-full bg-white/50 transition-none" style={{ width: `${progress}%` }} />
          </div>

          {/* Slide counter */}
          <div className="absolute top-6 left-6 md:left-10 z-[10]">
            <span className="font-headline font-bold text-[11px] tracking-[0.2em] text-white/40 uppercase">
              {String(activeSlide + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
            </span>
          </div>

          {/* 100+ badge */}
          <div className="absolute top-6 right-6 md:right-8 z-[10] bg-white/[0.08] border border-white/[0.15] backdrop-blur-md rounded-2xl px-5 py-3 text-right hidden md:block">
            <p className="headline-lg text-3xl text-white leading-none">100+</p>
            <p className="label-overline text-white/50 mt-1">Products</p>
          </div>

          {/* Hero text */}
          <div key={activeSlide} className="absolute bottom-10 left-6 md:left-10 z-[10] max-w-xl hero-text-enter">
            <p className="label-overline text-white/55 mb-3 tracking-[0.2em]">{slide.badge}</p>
            <h1 className="headline-display text-4xl md:text-[54px] text-white leading-[1.0] tracking-[-0.02em] mb-4 whitespace-pre-line">
              {slide.heading}
            </h1>
            <p className="font-body text-sm text-white/65 leading-relaxed mb-6 max-w-sm">{slide.sub}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to={slide.primaryLink} className="font-headline font-bold text-[11px] tracking-[0.15em] uppercase bg-white text-[#0B111D] px-6 py-3 rounded-sm hover:bg-surface-bright transition-all active:scale-[0.98]">
                {slide.primaryLabel}
              </Link>
              <Link to="/products?isFeatured=true" className="font-headline font-bold text-[11px] tracking-[0.15em] uppercase bg-transparent text-white border border-white/30 px-6 py-3 rounded-sm hover:bg-white/10 hover:border-white/50 transition-all">
                View featured
              </Link>
            </div>
          </div>

          {/* Category pills */}
          <div className="absolute bottom-10 right-8 z-[10] hidden lg:flex gap-3">
            {["CCTV", "Alarms", "Access Control"].map((pill) => (
              <Link
                key={pill}
                to={`/products?category=${encodeURIComponent(pill)}`}
                className="font-headline font-bold text-[10px] tracking-widest px-4 py-2 rounded-full bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm uppercase hover:bg-white/20 hover:text-white transition-all"
              >
                {pill}
              </Link>
            ))}
          </div>

          {/* Prev arrow */}
          <button
            onClick={prevSlideBtn}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[10] w-9 h-9 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all hidden md:flex"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[10] w-9 h-9 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all hidden md:flex"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[10] flex items-center gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => { clearInterval(intervalRef.current); goToSlide(i); startAutoplay() }}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${i === activeSlide ? "w-5 h-[5px] bg-white" : "w-[5px] h-[5px] bg-white/35 hover:bg-white/60"}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ─── TICKER ─── */}
      <div className="border-y border-outline-variant/30 py-3 mb-24 overflow-hidden flex whitespace-nowrap bg-surface-bright/50">
        <div className="flex gap-12 animate-ticker-track pr-12">
          {[...Array(2)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex gap-12 shrink-0">
              {["Free delivery on orders over ₦50,000","Certified security brands","Expert pre-sale advice","5-year warranty on select products","Nationwide delivery across Nigeria"].map((text, idx) => (
                <span key={idx} className="label-overline text-secondary flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/80" />
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="w-full max-w-[1080px] mx-auto px-5 md:px-8">

        {/* Trust bar */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "24/7 monitoring ready", desc: "Built for nonstop surveillance and instant alerts.",    icon: <g><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></g> },
              { title: "Certified brands only", desc: "Vetted manufacturers and premium installers.",          icon: <g><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></g> },
              { title: "Rapid support",         desc: "Expert pre and post-sale technical engineering.",       icon: <g><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3v4z"/><path d="M3 19a2 2 0 0 0 2 2h1v-6H3v4z"/></g> },
              { title: "Built to last",         desc: "Rugged outdoor and enterprise grade resilience.",       icon: <g><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></g> },
            ].map((item, idx) => (
              <div key={idx} className="glass-card group hover:-translate-y-2 hover:shadow-ambient transition-all duration-500 rounded-2xl p-6 border border-white/60 hover:border-outline-variant/40">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-500">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary group-hover:text-white transition-colors duration-500">
                    {item.icon}
                  </svg>
                </div>
                <p className="font-headline font-bold text-sm text-on-surface mb-2 tracking-tight uppercase">{item.title}</p>
                <p className="font-body text-sm text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Collections */}
        <section className="mb-32">
          <div className="flex justify-between items-end mb-10">
            <div className="max-w-md">
              <p className="label-overline mb-3">Shop by category</p>
              <h2 className="headline-lg text-3xl md:text-4xl text-on-surface tracking-tight">Security collections</h2>
            </div>
            <Link to="/products" className="btn-ghost hidden md:inline-flex">View All Categories</Link>
          </div>
          <div className="asymmetric-grid">
            {COLLECTIONS.map((col, i) => (
              <Link
                key={col.cat}
                to={`/products?category=${encodeURIComponent(col.cat)}`}
                className={`${col.col} ${col.aspect} rounded-[1.5rem] overflow-hidden group ghost-border bg-[#0B111D] relative block anim-fade-up`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <img src={col.image} alt={col.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <p className="label-overline text-white/50 mb-2">{col.num}. {col.label}</p>
                  <h4 className="headline-lg text-2xl md:text-3xl text-white mb-2">{col.name}</h4>
                  <p className="font-body text-sm text-white/60">{col.desc}</p>
                </div>
                <div className="absolute top-6 right-6 w-11 h-11 border border-white/20 rounded-full flex items-center justify-center text-white/50 group-hover:text-[#0B111D] group-hover:bg-white group-hover:border-white transition-all duration-500 z-20 backdrop-blur-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured products */}
        <section className="mb-32">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="label-overline mb-2">Handpicked</p>
              <h2 className="headline-lg text-3xl md:text-4xl text-on-surface tracking-tight">Featured products</h2>
            </div>
            <Link to="/products?isFeatured=true" className="btn-ghost hidden md:inline-flex">View All →</Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-surface-bright border border-outline-variant/30 rounded-2xl p-5">
                  <Skeleton className="w-full aspect-square rounded-lg mb-4 surface-low" />
                  <Skeleton className="h-3 w-1/3 mb-3 surface-low" />
                  <Skeleton className="h-4 w-3/4 mb-3 surface-low" />
                </div>
              ))}
            </div>
          ) : featured.length === 0 ? (
            <div className="text-center py-20 bg-surface-bright rounded-[1.5rem] border border-outline-variant/30">
              <p className="font-body text-secondary mb-6">No premium featured products are currently available.</p>
              <Link to="/products" className="btn-primary">Browse Catalog</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featured.slice(0, 4).map((product, i) => (
                <div key={product._id || i} className="bg-surface-bright rounded-2xl border border-outline-variant/30 hover:border-outline-variant/60 hover:shadow-ambient transition-all duration-300 overflow-hidden">
                  <ProductCard product={product} index={i} hidePrice={true} hideReviews={true} showPrice={false} showRating={false} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Spotlight */}
        <section className="mb-32">
          <div className="bg-surface-container-low rounded-[2rem] overflow-hidden border border-outline-variant/30 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
              <div className="bg-[#0B111D] p-10 md:p-12 flex items-center justify-center min-h-[400px] relative overflow-hidden group">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                <img src={images.sentinel} alt="The Sentinel Pro Ecosystem" className="w-[85%] h-[85%] object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transform group-hover:scale-105 transition-transform duration-700 z-10" />
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/10 absolute self-center z-0">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div className="p-10 md:p-12 flex flex-col justify-center">
                <p className="label-overline mb-4 text-secondary">Spotlight system</p>
                <h2 className="headline-display text-4xl md:text-5xl text-on-surface mb-6 uppercase tracking-[-0.02em]">The Sentinel<br/>Pro Series</h2>
                <p className="font-body text-secondary text-base leading-relaxed mb-10 max-w-sm">
                  Our flagship security ecosystem combines advanced architectural surveillance, real-time alarm loops, and credentialed access control.
                </p>
                <div className="space-y-4 mb-10">
                  {SPECS_SPOTLIGHT.map((spec) => (
                    <div key={spec} className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <p className="font-headline font-bold text-xs tracking-[0.1em] uppercase text-on-surface-variant">{spec}</p>
                    </div>
                  ))}
                </div>
                <Link to="/products?category=CCTV" className="btn-primary">Explore systems</Link>
              </div>
            </div>
          </div>
        </section>

        {/* New arrivals */}
        <section className="mb-24">
          <div className="bg-surface-container border border-outline-variant/30 rounded-[1.5rem] overflow-hidden">
            <div className="bg-surface-bright flex justify-between items-center p-5 px-6 border-b border-outline-variant/30">
              <div>
                <p className="label-overline mb-1">Just landed</p>
                <h3 className="headline-lg text-xl text-on-surface">New arrivals</h3>
              </div>
              <Link to="/products?sort=newest" className="btn-ghost !border-none !p-0 hidden sm:inline-flex">View all →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4 md:p-6 bg-surface-container-lowest">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className="bg-surface-bright border border-outline-variant/30 rounded-xl p-4">
                    <Skeleton className="w-full aspect-square rounded-lg mb-4 surface-low" />
                    <Skeleton className="h-3 w-1/2 mb-2 surface-low" />
                    <Skeleton className="h-4 w-3/4 surface-low" />
                  </div>
                ))
              ) : newArrivals.length === 0 ? (
                <div className="col-span-12 text-center py-6">
                  <p className="font-label text-xs text-secondary">No fresh arrivals listed yet.</p>
                </div>
              ) : (
                newArrivals.map((prod, idx) => (
                  <Link
                    key={prod._id || idx}
                    to={`/products/${prod._id}`}
                    className="bg-surface-bright border border-outline-variant/30 rounded-xl p-4 flex flex-col justify-between group/card hover:border-outline-variant/60 hover:shadow-sm transition-all text-left"
                  >
                    <div>
                      <div className="w-full aspect-square rounded-lg bg-surface-container-low flex items-center justify-center p-4 mb-4 relative overflow-hidden ghost-border group/thumb">
                        {prod.images?.[0] ? (
                          <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-contain filter drop-shadow-sm group-hover/card:scale-105 transition-transform duration-500" />
                        ) : (
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-secondary">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                            <circle cx="12" cy="13" r="4"/>
                          </svg>
                        )}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
                            className="bg-white text-[#0B111D] font-headline font-bold text-[10px] tracking-wider uppercase px-4 py-2 rounded-sm hover:bg-surface-bright transition-colors active:scale-95 shadow-md"
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                      <span className="font-headline font-bold text-[9px] tracking-widest px-2 py-1 rounded bg-[#FAEEDA] text-[#854F0B] inline-block mb-3 uppercase">New</span>
                      <p className="font-headline font-semibold text-sm text-on-surface line-clamp-2 leading-snug mb-2 group-hover/card:text-primary transition-colors">{prod.name}</p>
                    </div>
                    <p className="price-text text-sm text-secondary mt-2">₦{prod.price?.toLocaleString()}</p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Consultation CTA */}
        <section className="mb-24">
          <div className="bg-surface-bright border border-outline-variant/30 rounded-[1.5rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-sm">
            <div className="max-w-xl">
              <p className="label-overline mb-2 text-primary tracking-widest">Enterprise & Estate Blueprinting</p>
              <h2 className="headline-lg text-xl md:text-2xl text-on-surface tracking-tight mb-3 uppercase">Architectural Security Consultation</h2>
              <p className="font-body text-sm text-secondary leading-relaxed">
                Planning an estate layout, commercial asset, or modern residence? Collaborate directly with our systems engineers to outline server loops, perimeter radar lines, and integrated smart access protocols before deployment.
              </p>
            </div>
            <Link to="/contact" className="font-headline font-bold text-xs tracking-[0.15em] uppercase bg-[#0B111D] text-white px-8 py-4 rounded-sm hover:bg-primary transition-all active:scale-[0.98] shrink-0 whitespace-nowrap">
              Request Site Survey
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}