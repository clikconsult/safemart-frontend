import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { uploadApi } from "../api/services"
import toast from "react-hot-toast"

const TABS = ["Profile", "Security"]

export default function Profile() {
  const { user } = useAuth()
  const [tab, setTab] = useState("Profile")
  const [uploading, setUploading] = useState(false)

  const initials = user?.fullName?.split(" ").map(part => part[0]).slice(0, 2).join("").toUpperCase()

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploading(true)
      const fd = new FormData()
      fd.append("avatar", file)
      await uploadApi.avatar(fd)
      toast.success("Avatar updated")
    } catch {
      toast.error("Failed to upload")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="container-main py-8 md:py-10">
        <section className="dashboard-hero px-6 py-8 md:px-10 md:py-10 text-white mb-8 anim-tilt-in">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-[1.75rem] overflow-hidden bg-white/10 border border-white/20 flex items-center justify-center shadow-ambient-lg">
                  {user?.avatar
                    ? <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                    : <span className="font-headline font-black text-3xl md:text-4xl">{initials || "SM"}</span>}
                </div>
                <label className="absolute inset-0 rounded-[1.75rem] flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="font-label text-[10px] uppercase tracking-[0.24em] text-white">Update</span>
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>
              <div>
                <p className="label-overline text-white/65 mb-3">Account Hub</p>
                <h1 className="headline-lg text-3xl md:text-5xl mb-2">{user?.fullName || "Safemart Member"}</h1>
                <p className="font-body text-sm md:text-base text-white/75 max-w-2xl">
                  Manage your identity, security preferences, and profile details from one polished control center.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:min-w-[320px]">
              {[
                { label: "Role", value: user?.role || "customer" },
                { label: "Status", value: user?.isActive ? "Active" : "Suspended" },
                { label: "Email", value: user?.email ? "Verified" : "Missing" },
                { label: "Avatar", value: uploading ? "Updating" : "Ready" },
              ].map((item, index) => (
                <div key={item.label} className="glass-chip rounded-2xl px-4 py-4 anim-fade-up" style={{ animationDelay: `${0.1 + index * 0.08}s` }}>
                  <p className="font-label text-[9px] uppercase tracking-[0.26em] text-white/55 mb-2">{item.label}</p>
                  <p className="font-headline font-bold text-sm text-white capitalize">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1 space-y-5">
            <div className="dashboard-card p-5 anim-fade-up">
              <p className="label-overline mb-4 text-tertiary">Navigation</p>
              <nav className="space-y-2">
                {TABS.map((item, index) => (
                  <button
                    key={item}
                    onClick={() => setTab(item)}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl font-headline font-semibold text-sm uppercase tracking-[0.14em] transition-all duration-300 ${
                      tab === item
                        ? "bg-on-surface text-inverse-on-surface shadow-ambient"
                        : "text-secondary hover:bg-surface-container hover:text-on-surface hover:-translate-y-0.5"
                    }`}
                    style={{ animationDelay: `${index * 0.06}s` }}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="dashboard-card p-5 anim-fade-up delay-2">
              <p className="label-overline mb-4 text-tertiary">Quick Status</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-secondary">Phone</span>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface">{user?.phone ? "Added" : "Pending"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-secondary">Avatar</span>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface">{user?.avatar ? "Custom" : "Default"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-secondary">Security</span>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface">Managed</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="md:col-span-3">
            {tab === "Profile" && (
              <div className="dashboard-card p-6 md:p-8 anim-tilt-in">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                  <div>
                    <p className="label-overline text-tertiary mb-3">Personal Information</p>
                    <h2 className="headline-md text-2xl md:text-3xl text-on-surface">Refine your account identity</h2>
                  </div>
                  <p className="font-body text-sm text-secondary max-w-xl">
                    Keep your contact details accurate so orders, delivery coordination, and support interactions stay frictionless.
                  </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-8">
                  <div className="space-y-5 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="hover-lift">
                        <label className="label-overline mb-2 block">Full Name</label>
                        <input type="text" defaultValue={user?.fullName} className="input-field" />
                      </div>
                      <div className="hover-lift">
                        <label className="label-overline mb-2 block">Phone Number</label>
                        <input type="tel" defaultValue={user?.phone || ""} placeholder="+234 800 000 0000" className="input-field" />
                      </div>
                    </div>
                    <div className="hover-lift">
                      <label className="label-overline mb-2 block">Email Address</label>
                      <input type="email" defaultValue={user?.email} className="input-field opacity-70" readOnly />
                    </div>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button onClick={() => toast.success("Profile updated")} className="btn-primary">Save Changes</button>
                      <button onClick={() => toast.success("Avatar panel opened")} className="btn-secondary">Refresh Visual Identity</button>
                    </div>
                  </div>

                  <div className="aurora-panel p-5 md:p-6">
                    <p className="label-overline mb-4 text-tertiary">Account Snapshot</p>
                    <div className="space-y-4 relative z-10">
                      {[
                        ["Role", user?.role || "customer"],
                        ["Status", user?.isActive ? "Active" : "Suspended"],
                        ["Upload state", uploading ? "Uploading" : "Ready"],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between gap-4">
                          <span className="font-body text-sm text-secondary">{label}</span>
                          <span className="font-label text-[10px] uppercase tracking-[0.22em] text-on-surface">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === "Security" && (
              <div className="dashboard-card p-6 md:p-8 anim-tilt-in">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                  <div>
                    <p className="label-overline text-tertiary mb-3">Security Controls</p>
                    <h2 className="headline-md text-2xl md:text-3xl text-on-surface">Strengthen your account protection</h2>
                  </div>
                  <p className="font-body text-sm text-secondary max-w-xl">
                    Change your password regularly and keep your account details current for safer purchase and support flows.
                  </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-8">
                  <div className="space-y-5 max-w-2xl">
                    <div className="hover-lift">
                      <label className="label-overline mb-2 block">Current Password</label>
                      <input type="password" className="input-field" placeholder="••••••••" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="hover-lift">
                        <label className="label-overline mb-2 block">New Password</label>
                        <input type="password" className="input-field" placeholder="••••••••" />
                      </div>
                      <div className="hover-lift">
                        <label className="label-overline mb-2 block">Confirm Password</label>
                        <input type="password" className="input-field" placeholder="••••••••" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button onClick={() => toast.success("Password updated")} className="btn-primary">Update Password</button>
                      <button onClick={() => toast.success("Security reviewed")} className="btn-secondary">Review Security</button>
                    </div>
                  </div>

                  <div className="aurora-panel p-5 md:p-6">
                    <p className="label-overline mb-4 text-tertiary">Protection Status</p>
                    <div className="space-y-3 relative z-10">
                      <span className={`status-badge ${user?.isActive ? "bg-surface-container-high text-on-surface" : "bg-error-container text-error"}`}>
                        {user?.isActive ? "Account Active" : "Account Suspended"}
                      </span>
                      <span className="status-badge bg-tertiary-container text-on-tertiary-container capitalize">{user?.role}</span>
                      <p className="font-body text-sm text-secondary pt-2">
                        Cookie-based authentication is enabled, so session security depends on safe device usage and strong credentials.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
