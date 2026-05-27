import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get("redirect")
  const from = redirectTo || location.state?.from?.pathname || "/"
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setLoading(true)
      await login(form.email, form.password)
      toast.success("Welcome back")
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[90vh] flex bg-surface">
      <div className="hidden lg:flex lg:flex-1 bg-on-surface flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
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

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Link to="/" className="font-headline font-black text-base tracking-[0.2em] uppercase text-on-surface block mb-12 lg:hidden">SAFEMART</Link>
          <span className="label-overline text-tertiary block mb-4">Account</span>
          <h1 className="headline-lg text-3xl text-on-surface mb-2">Welcome back</h1>
          <p className="font-body text-sm text-secondary mb-10">Sign in to continue your session.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-overline mb-2 block">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm(current => ({ ...current, email: e.target.value }))} className="input-field" placeholder="you@example.com" autoComplete="email" />
            </div>
            <div>
              <label className="label-overline mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={e => setForm(current => ({ ...current, password: e.target.value }))}
                  className="input-field pr-10"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShow(current => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors">
                  {show
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="font-body text-sm text-secondary text-center mt-8">
            No account?{" "}
            <Link to={redirectTo ? `/register?redirect=${encodeURIComponent(redirectTo)}` : "/register"} className="text-on-surface font-medium underline underline-offset-2 hover:text-tertiary transition-colors">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
