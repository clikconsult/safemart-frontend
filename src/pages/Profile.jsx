import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { uploadApi } from "../api/services"
import toast from "react-hot-toast"

const TABS = ["Profile", "Security"]

export default function Profile() {
  const { user } = useAuth()
  const [tab, setTab]           = useState("Profile")
  const [uploading, setUploading] = useState(false)

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploading(true)
      const fd = new FormData()
      fd.append("avatar", file)
      await uploadApi.avatar(fd)
      toast.success("Avatar updated")
    } catch { toast.error("Failed to upload") }
    finally { setUploading(false) }
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">Account</span>
          <h1 className="headline-lg text-4xl text-on-surface">My Profile</h1>
        </div>
      </div>

      <div className="container-main py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Sidebar */}
          <div className="md:col-span-1">
            {/* Avatar */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative group mb-4">
                <div className="w-20 h-20 bg-on-surface rounded-full flex items-center justify-center overflow-hidden">
                  {user?.avatar
                    ? <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                    : <span className="font-headline font-black text-2xl text-inverse-on-surface">{user?.fullName?.[0]?.toUpperCase()}</span>
                  }
                </div>
                <label className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>
              <p className="font-headline font-bold text-base text-on-surface">{user?.fullName}</p>
              <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-0.5">{user?.role}</p>
              {uploading && <p className="font-label text-[10px] text-tertiary mt-1 uppercase tracking-wider">Uploading...</p>}
            </div>

            {/* Tab nav */}
            <nav className="space-y-1">
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`w-full text-left px-4 py-2.5 font-headline font-semibold text-sm uppercase tracking-wider rounded-sm transition-colors ${
                    tab === t ? "bg-on-surface text-inverse-on-surface" : "text-secondary hover:bg-surface-container hover:text-on-surface"
                  }`}>{t}</button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {tab === "Profile" && (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border">
                <h2 className="headline-md text-xl text-on-surface mb-7">Personal Information</h2>
                <div className="space-y-5 max-w-md">
                  <div>
                    <label className="label-overline mb-2 block">Full Name</label>
                    <input type="text" defaultValue={user?.fullName} className="input-field" />
                  </div>
                  <div>
                    <label className="label-overline mb-2 block">Email Address</label>
                    <input type="email" defaultValue={user?.email} className="input-field opacity-60" readOnly />
                  </div>
                  <div>
                    <label className="label-overline mb-2 block">Phone Number</label>
                    <input type="tel" defaultValue={user?.phone || ""} placeholder="+234 800 000 0000" className="input-field" />
                  </div>
                  <button onClick={() => toast.success("Profile updated")} className="btn-primary">Save Changes</button>
                </div>
              </div>
            )}

            {tab === "Security" && (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border">
                <h2 className="headline-md text-xl text-on-surface mb-7">Change Password</h2>
                <div className="space-y-5 max-w-md">
                  <div>
                    <label className="label-overline mb-2 block">Current Password</label>
                    <input type="password" className="input-field" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="label-overline mb-2 block">New Password</label>
                    <input type="password" className="input-field" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="label-overline mb-2 block">Confirm New Password</label>
                    <input type="password" className="input-field" placeholder="••••••••" />
                  </div>
                  <button onClick={() => toast.success("Password updated")} className="btn-primary">Update Password</button>
                </div>

                <div className="mt-10 pt-8 border-t border-outline-variant/20">
                  <p className="label-overline mb-3">Account Status</p>
                  <div className="flex items-center gap-2">
                    <span className={`status-badge ${user?.isActive ? "bg-surface-container-high text-on-surface" : "bg-error-container text-error"}`}>
                      {user?.isActive ? "Active" : "Suspended"}
                    </span>
                    <span className="status-badge bg-surface-container-high text-on-surface-variant capitalize">{user?.role}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
