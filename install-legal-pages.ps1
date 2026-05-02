# Safemart Legal Pages Installer
# Run from: safemart-frontend folder
# Command: .\install-legal-pages.ps1

Write-Host "Installing legal pages..." -ForegroundColor Cyan

$base = "src"

# Create Legal directory
New-Item -ItemType Directory -Force -Path "$base\pages\Legal" | Out-Null

# ── LegalLayout.jsx ──────────────────────────────────
Set-Content -Path "$base\pages\Legal\LegalLayout.jsx" -Encoding UTF8 -Value @'
export function LegalLayout({ label, title, lastUpdated, children }) {
  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">{label}</span>
          <h1 className="headline-lg text-4xl text-on-surface">{title}</h1>
          {lastUpdated && (
            <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-2">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
      </div>
      <div className="container-main py-14">
        <div className="max-w-3xl space-y-10">{children}</div>
      </div>
    </div>
  )
}

export function LegalSection({ title, children }) {
  return (
    <section>
      <h2 className="font-headline font-bold text-lg text-on-surface mb-4 pb-3 border-b border-outline-variant/20">
        {title}
      </h2>
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

# ── PrivacyPolicy.jsx ─────────────────────────────────
Set-Content -Path "$base\pages\Legal\PrivacyPolicy.jsx" -Encoding UTF8 -Value @'
import { LegalLayout, LegalSection, LegalList } from "./LegalLayout"

export default function PrivacyPolicy() {
  return (
    <LegalLayout label="Legal" title="Privacy Policy" lastUpdated="April 2025">
      <LegalSection title="1. Introduction">
        <p>Safemart is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.</p>
        <p>By using our services, you agree to the collection and use of information in accordance with this policy.</p>
      </LegalSection>
      <LegalSection title="2. Information We Collect">
        <p>We collect the following types of information:</p>
        <LegalList items={[
          "Personal identification — full name, email address, phone number",
          "Shipping and billing address",
          "Payment information — processed securely through Paystack, we do not store card details",
          "Order history and transaction data",
          "Device and browser information when you visit our website",
          "Communications you send us via email or contact forms",
        ]} />
      </LegalSection>
      <LegalSection title="3. How We Use Your Information">
        <LegalList items={[
          "Process and fulfill your orders",
          "Send order confirmations and shipping updates",
          "Respond to your customer service requests",
          "Send promotional communications (only with your consent)",
          "Improve our website and product offerings",
          "Comply with legal obligations",
          "Prevent fraud and ensure the security of our platform",
        ]} />
      </LegalSection>
      <LegalSection title="4. Information Sharing">
        <p>We do not sell or rent your personal information. We may share it with:</p>
        <LegalList items={[
          "Paystack — to process payments securely",
          "Cloudinary — to store and serve product images",
          "Delivery partners — to fulfill and ship your orders",
          "Legal authorities — when required by law",
        ]} />
      </LegalSection>
      <LegalSection title="5. Data Security">
        <p>We implement industry-standard security measures including SSL encryption. However, no method of transmission over the internet is 100% secure.</p>
      </LegalSection>
      <LegalSection title="6. Your Rights">
        <LegalList items={[
          "Access the personal information we hold about you",
          "Request correction of inaccurate information",
          "Request deletion of your personal data",
          "Opt out of marketing communications at any time",
        ]} />
      </LegalSection>
      <LegalSection title="7. Contact Us">
        <div className="mt-3 p-5 bg-surface-container-low rounded-md ghost-border space-y-1">
          <p className="font-headline font-bold text-sm text-on-surface">Safemart</p>
          <p>Email: privacy@safemart.ng</p>
          <p>Phone: +234 800 000 0000</p>
          <p>Address: Port Harcourt, Rivers State, Nigeria</p>
        </div>
      </LegalSection>
    </LegalLayout>
  )
}
'@

# ── TermsAndConditions.jsx ────────────────────────────
Set-Content -Path "$base\pages\Legal\TermsAndConditions.jsx" -Encoding UTF8 -Value @'
import { LegalLayout, LegalSection, LegalList } from "./LegalLayout"

export default function TermsAndConditions() {
  return (
    <LegalLayout label="Legal" title="Terms & Conditions" lastUpdated="April 2025">
      <LegalSection title="1. Agreement to Terms">
        <p>By accessing or using Safemart and purchasing our products, you agree to be bound by these Terms and Conditions.</p>
      </LegalSection>
      <LegalSection title="2. Products and Pricing">
        <p>All products are subject to availability. Prices are in Nigerian Naira (NGN) and may be modified without prior notice.</p>
        <LegalList items={[
          "Product descriptions are for informational purposes and may vary slightly from the actual product",
          "We reserve the right to limit quantities of any product",
          "Promotional pricing applies only during the specified period",
        ]} />
      </LegalSection>
      <LegalSection title="3. Orders and Payment">
        <LegalList items={[
          "Orders are confirmed only after successful payment processing",
          "We accept Paystack (cards, bank transfer, USSD) and direct bank transfer",
          "You must be 18 years or older to make a purchase",
          "Orders cannot be modified after payment is confirmed",
        ]} />
      </LegalSection>
      <LegalSection title="4. Product Warranty">
        <p>All products come with the manufacturer's warranty. Warranty does not cover damage caused by misuse or unauthorized modifications.</p>
      </LegalSection>
      <LegalSection title="5. Limitation of Liability">
        <p>Safemart shall not be liable for any indirect or consequential damages. Our total liability shall not exceed the amount paid for the specific product.</p>
      </LegalSection>
      <LegalSection title="6. Governing Law">
        <p>These terms are governed by the laws of the Federal Republic of Nigeria. Disputes are subject to the courts of Rivers State, Nigeria.</p>
      </LegalSection>
      <LegalSection title="7. Contact Us">
        <div className="mt-3 p-5 bg-surface-container-low rounded-md ghost-border space-y-1">
          <p className="font-headline font-bold text-sm text-on-surface">Safemart</p>
          <p>Email: legal@safemart.ng</p>
          <p>Phone: +234 800 000 0000</p>
        </div>
      </LegalSection>
    </LegalLayout>
  )
}
'@

# ── ReturnPolicy.jsx ──────────────────────────────────
Set-Content -Path "$base\pages\Legal\ReturnPolicy.jsx" -Encoding UTF8 -Value @'
import { LegalLayout, LegalSection, LegalList } from "./LegalLayout"

export default function ReturnPolicy() {
  return (
    <LegalLayout label="Policy" title="Return & Refund Policy" lastUpdated="April 2025">
      <LegalSection title="Return Eligibility">
        <p>You may return a product within <strong className="text-on-surface font-semibold">7 days</strong> of delivery if:</p>
        <LegalList items={[
          "The product is defective or damaged upon arrival",
          "The product received is different from what was ordered",
          "The product is unused and in original packaging with all accessories",
        ]} />
        <p className="mt-3">Items NOT eligible for return:</p>
        <LegalList items={[
          "Products that have been installed, used, or tampered with",
          "Products with missing or damaged original packaging",
          "Products returned after the 7-day window",
          "Custom or special-order items",
        ]} />
      </LegalSection>
      <LegalSection title="How to Initiate a Return">
        <div className="space-y-4 mt-3">
          {[
            { step: "01", title: "Contact Us", desc: "Email returns@safemart.ng within 7 days of receiving your order. Include your order number and reason for return." },
            { step: "02", title: "Await Approval", desc: "Our team will review your request within 24-48 hours and send return instructions if approved." },
            { step: "03", title: "Ship the Item", desc: "Securely repack in original packaging and ship to our returns address using a trackable method." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4 p-4 bg-surface-container-low rounded-sm ghost-border">
              <span className="font-headline font-black text-2xl text-outline-variant shrink-0 leading-none">{step}</span>
              <div>
                <p className="font-headline font-bold text-sm text-on-surface mb-1">{title}</p>
                <p className="font-body text-xs text-secondary leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </LegalSection>
      <LegalSection title="Refund Process">
        <LegalList items={[
          "Approved refunds are processed within 5-7 business days",
          "Refunds are issued via the original payment method",
          "Original shipping fees are non-refundable unless the return is due to our error",
        ]} />
      </LegalSection>
      <LegalSection title="Contact for Returns">
        <div className="p-5 bg-surface-container-low rounded-md ghost-border space-y-1">
          <p className="font-headline font-bold text-sm text-on-surface">Safemart Returns</p>
          <p>Email: returns@safemart.ng</p>
          <p>Phone: +234 800 000 0000</p>
          <p>Hours: Monday - Friday, 9am - 5pm WAT</p>
        </div>
      </LegalSection>
    </LegalLayout>
  )
}
'@

# ── ShippingPolicy.jsx ────────────────────────────────
Set-Content -Path "$base\pages\Legal\ShippingPolicy.jsx" -Encoding UTF8 -Value @'
import { LegalLayout, LegalSection, LegalList } from "./LegalLayout"

export default function ShippingPolicy() {
  return (
    <LegalLayout label="Policy" title="Shipping Policy" lastUpdated="April 2025">
      <LegalSection title="Shipping Rates">
        <div className="mt-2 overflow-hidden rounded-md ghost-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-container-high">
                <th className="text-left px-4 py-3 font-headline font-bold text-xs text-on-surface uppercase tracking-wider">Order Value</th>
                <th className="text-left px-4 py-3 font-headline font-bold text-xs text-on-surface uppercase tracking-wider">Shipping Fee</th>
                <th className="text-left px-4 py-3 font-headline font-bold text-xs text-on-surface uppercase tracking-wider">Estimated Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15">
              {[
                ["Below N50,000", "N2,500", "3-5 business days"],
                ["N50,000 and above", "Free", "3-5 business days"],
                ["Same-day (Lagos)", "N5,000", "Same day (order before 12pm)"],
              ].map(([value, fee, time]) => (
                <tr key={value} className="bg-surface-container-lowest">
                  <td className="px-4 py-3 font-body text-sm text-on-surface">{value}</td>
                  <td className="px-4 py-3 font-headline font-semibold text-sm text-on-surface">{fee}</td>
                  <td className="px-4 py-3 font-body text-sm text-secondary">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>
      <LegalSection title="Delivery Timeframes">
        <LegalList items={[
          "Port Harcourt and Rivers State - 1-2 business days",
          "Lagos, Abuja, and major cities - 2-3 business days",
          "Other states - 3-5 business days",
          "Remote or rural areas - 5-7 business days",
        ]} />
      </LegalSection>
      <LegalSection title="Order Processing">
        <p>Orders are processed within <strong className="text-on-surface font-semibold">1-2 business days</strong> after payment confirmation.</p>
        <LegalList items={[
          "Order confirmation email sent immediately after payment",
          "Shipping confirmation with tracking sent once dispatched",
          "Processing may be longer during sales events or peak periods",
        ]} />
      </LegalSection>
      <LegalSection title="Contact for Shipping">
        <div className="p-5 bg-surface-container-low rounded-md ghost-border space-y-1">
          <p className="font-headline font-bold text-sm text-on-surface">Safemart Logistics</p>
          <p>Email: shipping@safemart.ng</p>
          <p>Phone: +234 800 000 0000</p>
          <p>Hours: Monday - Saturday, 8am - 6pm WAT</p>
        </div>
      </LegalSection>
    </LegalLayout>
  )
}
'@

# ── Contact.jsx ───────────────────────────────────────
Set-Content -Path "$base\pages\Legal\Contact.jsx" -Encoding UTF8 -Value @'
import { useState } from "react"
import toast from "react-hot-toast"

const SUBJECTS = ["Product Enquiry","Order Support","Technical Assistance","Returns & Refunds","Shipping & Delivery","Business / Wholesale","Other"]

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [loading, setLoading] = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    toast.success("Message sent - we will be in touch within 24 hours")
    setForm({ name: "", email: "", phone: "", subject: "", message: "" })
    setLoading(false)
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">Get in Touch</span>
          <h1 className="headline-lg text-4xl text-on-surface">Contact Us</h1>
          <p className="font-body text-sm text-secondary mt-3 max-w-md leading-relaxed">
            Have a question about a product, need installation advice, or want to discuss a large project? We are here to help.
          </p>
        </div>
      </div>

      <div className="container-main py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
          <div className="lg:col-span-2 space-y-5">
            {[
              { label: "Email", value: "hello@safemart.ng", sub: "We reply within 24 hours", icon: "M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" },
              { label: "Phone", value: "+234 800 000 0000", sub: "Mon - Sat, 8am - 6pm WAT", icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.64 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.83-.83a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" },
              { label: "Location", value: "Port Harcourt, Rivers State", sub: "Nigeria", icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4 p-5 bg-surface-container-low rounded-md ghost-border">
                <div className="w-10 h-10 bg-on-surface rounded-sm flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="text-inverse-on-surface">
                    <path d={item.icon}/>
                  </svg>
                </div>
                <div>
                  <p className="label-overline mb-1">{item.label}</p>
                  <p className="font-headline font-bold text-sm text-on-surface">{item.value}</p>
                  <p className="font-body text-xs text-secondary mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
            <div className="p-5 bg-surface-container-low rounded-md ghost-border">
              <p className="label-overline mb-4">Business Hours</p>
              <div className="space-y-2">
                {[["Monday - Friday","8:00am - 6:00pm"],["Saturday","9:00am - 4:00pm"],["Sunday","Closed"]].map(([day,hours]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="font-body text-secondary">{day}</span>
                    <span className="font-headline font-semibold text-on-surface">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-surface-container-low rounded-md p-7 ghost-border">
              <h2 className="headline-md text-xl text-on-surface mb-7">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-overline mb-2 block">Full Name</label>
                    <input type="text" required value={form.name} onChange={set("name")} className="input-field" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="label-overline mb-2 block">Email Address</label>
                    <input type="email" required value={form.email} onChange={set("email")} className="input-field" placeholder="you@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-overline mb-2 block">Phone (optional)</label>
                    <input type="tel" value={form.phone} onChange={set("phone")} className="input-field" placeholder="+234 800 000 0000" />
                  </div>
                  <div>
                    <label className="label-overline mb-2 block">Subject</label>
                    <select required value={form.subject} onChange={set("subject")} className="input-field">
                      <option value="">Select a subject</option>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label-overline mb-2 block">Message</label>
                  <textarea required rows={6} value={form.message} onChange={set("message")} className="input-field resize-none" placeholder="Tell us how we can help..." />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'@

# ── About.jsx ─────────────────────────────────────────
Set-Content -Path "$base\pages\Legal\About.jsx" -Encoding UTF8 -Value @'
import { Link } from "react-router-dom"

const VALUES = [
  { num: "01", title: "Quality First", desc: "Every product in our catalogue is rigorously vetted for build quality, reliability, and performance before we make it available." },
  { num: "02", title: "Genuine Products", desc: "We source directly from authorised distributors. Every item is 100% authentic and comes with full manufacturer warranty." },
  { num: "03", title: "Expert Guidance", desc: "Our team is available to help you select the right system for your needs, whether residential, commercial, or industrial." },
  { num: "04", title: "Customer Trust", desc: "We believe in transparent pricing, honest communication, and standing behind every product we sell." },
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
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container-main py-20 md:py-28 relative z-10">
          <span className="label-overline text-on-tertiary/60 block mb-5">Our Story</span>
          <h1 className="headline-display text-5xl md:text-7xl text-inverse-on-surface leading-none mb-8 max-w-3xl">
            PROTECTING NIGERIA, ONE SYSTEM AT A TIME.
          </h1>
          <p className="font-body text-base text-inverse-on-surface/60 max-w-xl leading-relaxed">
            Safemart was founded with a single conviction: every home and business in Nigeria deserves access to professional-grade security, delivered with integrity and expertise.
          </p>
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
            <p className="font-body text-secondary text-base leading-relaxed mb-5">
              We started Safemart because we saw a gap: businesses and homeowners were forced to choose between affordability and quality. We refused to accept that compromise.
            </p>
            <p className="font-body text-secondary text-base leading-relaxed mb-8">
              Today we curate the most trusted security brands and make them accessible to every Nigerian, backed by genuine expertise and after-sales support.
            </p>
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
          <p className="font-body text-sm text-inverse-on-surface/60 mb-8 max-w-md mx-auto relative z-10 leading-relaxed">
            Browse our catalogue or speak to our team to find the perfect security solution for your needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <Link to="/products" className="bg-white text-primary px-10 py-4 rounded-sm font-headline font-bold text-xs tracking-[0.2em] uppercase hover:bg-surface-variant transition-colors">Shop Now</Link>
            <Link to="/contact" className="border border-inverse-on-surface/20 text-inverse-on-surface px-10 py-4 rounded-sm font-headline font-bold text-xs tracking-[0.2em] uppercase hover:border-inverse-on-surface/50 transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
'@

# ── App.jsx ───────────────────────────────────────────
Set-Content -Path "$base\App.jsx" -Encoding UTF8 -Value @'
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

# ── Footer.jsx ────────────────────────────────────────
Set-Content -Path "$base\components\layout\Footer.jsx" -Encoding UTF8 -Value @'
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
          <p className="font-label text-[11px] text-secondary uppercase tracking-wider">© {new Date().getFullYear()} SAFEMART. ALL RIGHTS RESERVED.</p>
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

Write-Host ""
Write-Host "Legal pages installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "New routes available:" -ForegroundColor Cyan
Write-Host "  /about           - About Us" -ForegroundColor White
Write-Host "  /contact         - Contact" -ForegroundColor White
Write-Host "  /privacy-policy  - Privacy Policy" -ForegroundColor White
Write-Host "  /terms           - Terms & Conditions" -ForegroundColor White
Write-Host "  /returns         - Return & Refund Policy" -ForegroundColor White
Write-Host "  /shipping        - Shipping Policy" -ForegroundColor White
