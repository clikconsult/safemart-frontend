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

