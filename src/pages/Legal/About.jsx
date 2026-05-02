import { Link } from "react-router-dom"

const VALUES = [
  {
    num: "01",
    title: "Quality First",
    desc: "Every product in our catalogue is rigorously vetted for build quality, reliability, and performance before we make it available.",
  },
  {
    num: "02",
    title: "Genuine Products",
    desc: "We source directly from authorised distributors. Every item is 100% authentic and comes with full manufacturer warranty.",
  },
  {
    num: "03",
    title: "Expert Guidance",
    desc: "Our team is available to help you select the right system for your needs, whether residential, commercial, or industrial.",
  },
  {
    num: "04",
    title: "Customer Trust",
    desc: "We believe in transparent pricing, honest communication, and standing behind every product we sell.",
  },
]

const STATS = [
  { value: "500+", label: "Products" },
  { value: "5,000+", label: "Happy Customers" },
  { value: "7+", label: "Years Experience" },
  { value: "36", label: "States Delivered" },
]

export default function About() {
  return (
    <div className="bg-surface">
      <div className="bg-on-surface relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container-main py-20 md:py-28 relative z-10">
          <span className="label-overline text-on-tertiary/60 block mb-5">Our Story</span>
          <h1 className="headline-display text-5xl md:text-7xl text-inverse-on-surface leading-none mb-8 max-w-3xl">
            Protecting Nigeria, one system at a time.
          </h1>
          <p className="font-body text-base text-inverse-on-surface/60 max-w-xl leading-relaxed">
            Safemart was founded with a single conviction: every home and
            business in Nigeria deserves access to professional-grade security,
            delivered with integrity and expertise.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-low">
        <div className="container-main py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/20">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-surface-container-low px-8 py-10 text-center">
                <p className="headline-display text-4xl md:text-5xl text-on-surface mb-2">{stat.value}</p>
                <p className="label-overline">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-main section-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="label-overline text-tertiary block mb-5">Our Mission</span>
            <h2 className="headline-lg text-4xl text-on-surface mb-6 leading-tight">
              Security that matches your ambition.
            </h2>
            <p className="font-body text-secondary text-base leading-relaxed mb-5">
              We started Safemart because we saw a gap: businesses and homeowners
              were forced to choose between affordability and quality.
            </p>
            <p className="font-body text-secondary text-base leading-relaxed mb-8">
              Today we curate trusted security brands and make them accessible to
              every Nigerian, backed by genuine expertise and after-sales support.
            </p>
            <Link to="/products" className="btn-primary inline-flex">
              Explore Our Products
            </Link>
          </div>
          <div className="aspect-square bg-surface-container-low rounded-md ghost-border flex items-center justify-center">
            <div className="text-center p-12">
              <div className="w-20 h-20 bg-on-surface rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <p className="font-headline font-black text-2xl text-on-surface/20 tracking-wider uppercase">
                Since 2018
              </p>
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
            {VALUES.map((value) => (
              <div key={value.num} className="bg-surface-container-lowest rounded-md p-7 ghost-border">
                <span className="font-headline font-black text-4xl text-outline-variant/40 block mb-4">
                  {value.num}
                </span>
                <h3 className="headline-md text-lg text-on-surface mb-3">{value.title}</h3>
                <p className="font-body text-sm text-secondary leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-main pb-20 pt-16">
        <div className="bg-on-surface rounded-md p-14 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <h2 className="headline-lg text-3xl text-inverse-on-surface mb-4 relative z-10">
            Ready to get started?
          </h2>
          <p className="font-body text-sm text-inverse-on-surface/60 mb-8 max-w-md mx-auto relative z-10 leading-relaxed">
            Browse our catalogue or speak to our team to find the right security
            solution for your needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <Link to="/products" className="bg-white text-primary px-10 py-4 rounded-sm font-headline font-bold text-xs tracking-[0.2em] uppercase hover:bg-surface-variant transition-colors">
              Shop Now
            </Link>
            <Link to="/contact" className="border border-inverse-on-surface/20 text-inverse-on-surface px-10 py-4 rounded-sm font-headline font-bold text-xs tracking-[0.2em] uppercase hover:border-inverse-on-surface/50 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
