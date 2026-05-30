import { useEffect, useRef, useState } from "react"
import { adminApi, ordersApi, productsApi, uploadApi } from "../../api/services"
import { LoadingPage, Price } from "../../components/ui"

/* ── Tabler icons ─────────────────────────────────────────────────── */
if (typeof document !== "undefined" && !document.getElementById("_ti")) {
  const l = document.createElement("link")
  l.id = "_ti"; l.rel = "stylesheet"
  l.href = "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css"
  document.head.appendChild(l)
}

/* ── Design tokens ────────────────────────────────────────────────── */
const C = {
  bg:       "var(--color-background-primary)",
  surface:  "var(--color-background-secondary)",
  page:     "var(--color-background-tertiary)",
  border:   "var(--color-border-tertiary)",
  borderMd: "var(--color-border-secondary)",
  text:     "var(--color-text-primary)",
  muted:    "var(--color-text-secondary)",
  faint:    "var(--color-text-tertiary)",
  mono:     "var(--font-mono)",
  radMd:    "var(--border-radius-md)",
  radLg:    "var(--border-radius-lg)",
}

const CATEGORIES = ["CCTV", "Alarms", "Access Control", "Intercom", "Networking", "Other"]
const ACCENTS    = ["#639922", "#378ADD", "#7F77DD", "#EF9F27"]
const STATUS_BADGE = {
  delivered:  { bg: "#EAF3DE", color: "#3B6D11" },
  processing: { bg: "#E6F1FB", color: "#185FA5" },
  pending:    { bg: "#FAEEDA", color: "#854F0B" },
  shipped:    { bg: "#EEEDFE", color: "#534AB7" },
  cancelled:  { bg: "#FCEBEB", color: "#A32D2D" },
}
const STATUSES   = ["pending", "processing", "shipped", "delivered", "cancelled"]
const AVATAR_PAL = [
  ["#E6F1FB","#185FA5"], ["#EEEDFE","#534AB7"], ["#FAEEDA","#854F0B"],
  ["#EAF3DE","#3B6D11"], ["#FCEBEB","#A32D2D"],
]

/* ── Responsive breakpoint hook ───────────────────────────────────── */
function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < bp : false)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < bp)
    window.addEventListener("resize", fn)
    return () => window.removeEventListener("resize", fn)
  }, [bp])
  return mobile
}

/* ── Atoms ────────────────────────────────────────────────────────── */
const Icon = ({ n, size = 15, style = {} }) => (
  <i className={`ti ti-${n}`} aria-hidden="true" style={{ fontSize: size, lineHeight: 1, flexShrink: 0, ...style }} />
)
const Ol = ({ children, mb = 8 }) => (
  <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: C.faint, marginBottom: mb }}>
    {children}
  </p>
)
const Card = ({ children, style = {} }) => (
  <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: C.radLg, padding: "12px 14px", ...style }}>
    {children}
  </div>
)
const Chip = ({ children, bg, color }) => (
  <span style={{ fontSize: 9, fontWeight: 600, padding: "2px 7px", borderRadius: 10, letterSpacing: ".04em", textTransform: "capitalize", background: bg, color, display: "inline-block", whiteSpace: "nowrap" }}>
    {children}
  </span>
)
const StatusChip = ({ status }) => {
  const s = STATUS_BADGE[status] || { bg: C.surface, color: C.muted }
  return <Chip bg={s.bg} color={s.color}>{status}</Chip>
}
const MiniStat = ({ label, value }) => (
  <div style={{ background: C.surface, borderRadius: C.radMd, padding: "8px 10px" }}>
    <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{value}</p>
    <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: C.faint, marginTop: 2 }}>{label}</p>
  </div>
)

function KpiCard({ label, value, sub, accent }) {
  return (
    <Card style={{ position: "relative", overflow: "hidden" }}>
      <span style={{ position: "absolute", top: 0, right: 0, width: 3, height: "100%", background: accent, borderRadius: `0 ${C.radLg} ${C.radLg} 0` }} />
      <Ol mb={8}>{label}</Ol>
      <div style={{ fontSize: 20, fontWeight: 500, color: C.text, lineHeight: 1 }}>{value}</div>
      <p style={{ fontSize: 10, color: C.faint, marginTop: 4 }}>{sub}</p>
    </Card>
  )
}

function Empty({ icon, text }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "40px 20px" }}>
      <Icon n={icon} size={24} style={{ color: C.faint }} />
      <p style={{ fontSize: 12, color: C.faint }}>{text}</p>
    </div>
  )
}

/* ── Toggle ───────────────────────────────────────────────────────── */
function Toggle({ value, onChange, label, activeColor = "#3B6D11", activeBg = "#EAF3DE" }) {
  return (
    <button onClick={() => onChange(!value)} style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", padding: "5px 9px", borderRadius: C.radMd, border: `0.5px solid ${value ? activeColor : C.border}`, background: value ? activeBg : C.surface, transition: "all .15s" }}>
      <div style={{ width: 28, height: 16, borderRadius: 8, background: value ? activeColor : C.borderMd, position: "relative", transition: "background .15s", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 2, left: value ? 14 : 2, width: 12, height: 12, borderRadius: "50%", background: "#fff", transition: "left .15s" }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 500, color: value ? activeColor : C.muted }}>{label}</span>
    </button>
  )
}

/* ── Buttons ──────────────────────────────────────────────────────── */
const btnBase    = { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 500, padding: "6px 12px", borderRadius: C.radMd, cursor: "pointer", border: `0.5px solid ${C.border}`, background: C.bg, color: C.text }
const btnPrimary = { ...btnBase, background: C.text, color: C.bg, border: "none" }
const btnDanger  = { ...btnBase, background: "#FCEBEB", color: "#A32D2D", border: "0.5px solid #F09595" }

/* ── Modal — mobile-aware ─────────────────────────────────────────── */
function Modal({ title, subtitle, onClose, children, width = 580, footer }) {
  const isMobile = useIsMobile()
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const containerStyle = isMobile ? {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
    display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 200,
  } : {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16,
  }

  const sheetStyle = isMobile ? {
    background: C.bg, width: "100%", maxHeight: "92vh",
    borderRadius: "20px 20px 0 0", display: "flex", flexDirection: "column",
    boxShadow: "0 -8px 40px rgba(0,0,0,0.2)",
  } : {
    background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: C.radLg,
    width, maxWidth: "100%", maxHeight: "92vh", display: "flex", flexDirection: "column",
    boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
  }

  return (
    <div style={containerStyle} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={sheetStyle}>
        {/* Drag handle on mobile */}
        {isMobile && (
          <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: C.borderMd }} />
          </div>
        )}
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: isMobile ? "8px 16px 12px" : "14px 18px", borderBottom: `0.5px solid ${C.border}`, flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{title}</p>
            {subtitle && <p style={{ fontSize: 11, color: C.faint, marginTop: 2 }}>{subtitle}</p>}
          </div>
          <button onClick={onClose} style={{ ...btnBase, padding: "3px 6px", border: "none", background: "transparent", color: C.faint, marginLeft: 12 }}>
            <Icon n="x" size={16} />
          </button>
        </div>
        {/* Body */}
        <div style={{ overflowY: "auto", padding: isMobile ? "14px 16px 4px" : "18px 18px 4px", flex: 1 }}>
          {children}
        </div>
        {/* Footer */}
        {footer && (
          <div style={{ padding: isMobile ? "12px 16px 20px" : "12px 18px", borderTop: `0.5px solid ${C.border}`, flexShrink: 0, display: "flex", justifyContent: "flex-end", gap: 8 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Form helpers ─────────────────────────────────────────────────── */
const Field = ({ label, hint, children, span2 = false }) => (
  <div style={{ marginBottom: 13, gridColumn: span2 ? "1 / -1" : undefined }}>
    <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: C.faint, marginBottom: 5 }}>{label}</p>
    {children}
    {hint && <p style={{ fontSize: 10, color: C.faint, marginTop: 4 }}>{hint}</p>}
  </div>
)
const inp = { width: "100%", fontSize: 13, padding: "9px 11px", borderRadius: C.radMd, border: `0.5px solid ${C.borderMd}`, background: C.bg, color: C.text, outline: "none", boxSizing: "border-box" }
const sel = { ...inp, cursor: "pointer" }

/* ══════════════════════════════════════════════════════════════════
   OVERVIEW
══════════════════════════════════════════════════════════════════ */
function RevenueChart({ data }) {
  if (!data.length) return <Empty icon="chart-bar" text="No revenue data yet" />
  const max = Math.max(...data.map(d => d.revenue), 1)
  const lbl = e => new Date(e._id.year, e._id.month - 1, 1).toLocaleString("en-NG", { month: "short" })
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 60 }}>
      {data.map((m, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: "100%", height: `${Math.max(4, (m.revenue / max) * 100)}%`, borderRadius: "2px 2px 0 0", background: i === data.length - 1 ? "#7F77DD" : C.borderMd, transition: "height .4s" }} />
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: C.faint }}>{lbl(m)}</span>
        </div>
      ))}
    </div>
  )
}

function OverviewView({ analytics, recentOrders }) {
  const isMobile = useIsMobile()
  const monthly   = analytics?.monthlyRevenue || []
  const bySt      = analytics?.ordersByStatus || []
  const top       = analytics?.topProducts    || []
  const allRev    = analytics?.overview?.totalRevenue  || 0
  const paid      = analytics?.overview?.totalOrders   || 0
  const sixRev    = monthly.reduce((s, e) => s + (e.revenue || 0), 0)
  const olderRev  = Math.max(0, allRev - sixRev)
  const sm        = Object.fromEntries(bySt.map(e => [e._id, e.count]))
  const delivered = sm.delivered   || 0; const cancelled  = sm.cancelled   || 0
  const processing= sm.processing  || 0; const pending     = sm.pending     || 0
  const shipped   = sm.shipped     || 0
  const aov  = paid > 0 ? allRev / paid : 0
  const conv = paid > 0 ? (delivered / paid) * 100 : 0
  const canc = paid > 0 ? (cancelled / paid) * 100 : 0

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* KPI cards — 2 col on mobile, 4 on desktop */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 8 }}>
        <KpiCard label="Revenue"  value={<Price amount={allRev} />}                          sub="All time"         accent={ACCENTS[0]} />
        <KpiCard label="Orders"   value={analytics?.overview?.totalOrders   ?? 0}            sub="Paid orders"      accent={ACCENTS[1]} />
        <KpiCard label="Users"    value={analytics?.overview?.totalUsers    ?? 0}            sub="Registered"       accent={ACCENTS[2]} />
        <KpiCard label="Products" value={analytics?.overview?.totalProducts ?? 0}            sub="Active catalogue" accent={ACCENTS[3]} />
      </div>

      {/* Revenue + orders by status — stack on mobile */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: 8 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div><Ol mb={2}>Monthly revenue</Ol><p style={{ fontSize: 10, color: C.faint }}>Last 6 months</p></div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}><Price amount={sixRev} /></p>
              {olderRev > 0 && <p style={{ fontSize: 9, color: C.faint, marginTop: 2 }}>+<Price amount={olderRev} /> older</p>}
            </div>
          </div>
          <RevenueChart data={monthly} />
        </Card>
        <Card>
          <Ol>Orders by status</Ol>
          {[["pending",pending],["processing",processing],["shipped",shipped],["delivered",delivered],["cancelled",cancelled]].map(([s,n]) => (
            <div key={s} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 9px", background: C.surface, borderRadius: C.radMd, marginBottom: 5 }}>
              <span style={{ fontSize: 11, color: C.muted, textTransform: "capitalize" }}>{s}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{n}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Metrics — 1 col mobile, 3 col desktop */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 8 }}>
        <Card>
          <Ol>Avg. order value</Ol>
          <p style={{ fontSize: 20, fontWeight: 500, color: C.text }}><Price amount={aov} /></p>
          <p style={{ fontSize: 10, color: C.faint, marginTop: 4 }}>Across all paid orders</p>
        </Card>
        <Card>
          <Ol>Delivery conversion</Ol>
          <p style={{ fontSize: 20, fontWeight: 500, color: C.text }}>{conv.toFixed(1)}%</p>
          <p style={{ fontSize: 10, color: C.faint, marginTop: 4, marginBottom: 10 }}>Delivered ÷ paid orders</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            <MiniStat value={delivered} label="Delivered" />
            <MiniStat value={paid}      label="Paid" />
          </div>
        </Card>
        <Card>
          <Ol>Cancellation signal</Ol>
          <p style={{ fontSize: 20, fontWeight: 500, color: C.text }}>{canc.toFixed(1)}%</p>
          <p style={{ fontSize: 10, color: C.faint, marginTop: 4, marginBottom: 10 }}>Cancelled ÷ paid orders</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            <MiniStat value={cancelled} label="Cancelled" />
            <MiniStat value={shipped}   label="Shipped" />
          </div>
        </Card>
      </div>

      {top[0] && (
        <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <Ol>Top product</Ol>
            <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{top[0].name}</p>
            <p style={{ fontSize: 10, color: C.faint, marginTop: 3 }}>{top[0].category}</p>
          </div>
          <MiniStat value={top[0].sold} label="Units sold" />
        </Card>
      )}

      {/* Recent orders — card list on mobile, table on desktop */}
      {isMobile ? (
        <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: C.radLg, overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: `0.5px solid ${C.border}` }}><Ol mb={0}>Recent orders</Ol></div>
          {recentOrders.length === 0 ? <Empty icon="shopping-bag" text="No orders yet" /> :
            recentOrders.map((o, i) => (
              <div key={o._id} style={{ padding: "12px 14px", borderBottom: i === recentOrders.length - 1 ? "none" : `0.5px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, fontFamily: C.mono, color: C.text }}>#{o._id.slice(-8).toUpperCase()}</span>
                  <StatusChip status={o.orderStatus} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: C.muted }}>{o.user?.fullName || "Unknown"}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}><Price amount={o.finalPrice} /></span>
                </div>
              </div>
            ))
          }
        </div>
      ) : (
        <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: C.radLg, overflow: "hidden" }}>
          <div style={{ padding: "10px 12px", borderBottom: `0.5px solid ${C.border}` }}><Ol mb={0}>Recent orders</Ol></div>
          {recentOrders.length === 0 ? <Empty icon="shopping-bag" text="No orders yet" /> :
            recentOrders.map((o, i) => (
              <div key={o._id} style={{ display: "grid", gridTemplateColumns: "88px 1fr 80px 72px", padding: "9px 12px", alignItems: "center", borderBottom: i === recentOrders.length - 1 ? "none" : `0.5px solid ${C.border}` }}>
                <span style={{ fontSize: 10, fontWeight: 500, fontFamily: C.mono, color: C.text }}>#{o._id.slice(-8).toUpperCase()}</span>
                <span style={{ fontSize: 11, color: C.muted }}>{o.user?.fullName || "Unknown"}</span>
                <StatusChip status={o.orderStatus} />
                <span style={{ fontSize: 11, fontWeight: 500, color: C.text, textAlign: "right" }}><Price amount={o.finalPrice} /></span>
              </div>
            ))
          }
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   ORDERS
══════════════════════════════════════════════════════════════════ */
function OrdersView() {
  const isMobile = useIsMobile()
  const [orders,    setOrders]    = useState([])
  const [loading,   setLoading]   = useState(true)
  const [filter,    setFilter]    = useState("all")
  const [editing,   setEditing]   = useState(null)
  const [newStatus, setNewStatus] = useState("")
  const [note,      setNote]      = useState("")
  const [saving,    setSaving]    = useState(false)
  const [error,     setError]     = useState("")

  useEffect(() => {
    setLoading(true)
    ordersApi.getAll({ limit: 100, sort: "-createdAt" })
      .then(r => setOrders(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const openEdit  = o  => { setEditing(o); setNewStatus(o.orderStatus); setNote(""); setError("") }
  const closeEdit = () => { setEditing(null); setSaving(false) }

  const submit = async () => {
    setSaving(true); setError("")
    try {
      await ordersApi.updateStatus(editing._id, { status: newStatus, note })
      setOrders(prev => prev.map(o => o._id === editing._id ? { ...o, orderStatus: newStatus } : o))
      closeEdit()
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to update status.")
      setSaving(false)
    }
  }

  const visible = filter === "all" ? orders : orders.filter(o => o.orderStatus === filter)

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Filter pills */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {["all", ...STATUSES].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ fontSize: 10, fontWeight: 500, padding: "4px 10px", borderRadius: 12, cursor: "pointer", textTransform: "capitalize", background: filter === s ? C.text : "transparent", color: filter === s ? C.bg : C.muted, border: `0.5px solid ${filter === s ? C.text : C.border}` }}>{s}</button>
          ))}
        </div>

        {/* Mobile: card list / Desktop: table */}
        {isMobile ? (
          <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: C.radLg, overflow: "hidden" }}>
            {loading && <div style={{ padding: "20px 14px", fontSize: 12, color: C.faint }}>Loading…</div>}
            {!loading && visible.length === 0 && <Empty icon="shopping-bag" text="No orders found" />}
            {visible.map((o, i) => (
              <div key={o._id} style={{ padding: "14px", borderBottom: i === visible.length - 1 ? "none" : `0.5px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, fontFamily: C.mono, color: C.text, marginBottom: 2 }}>#{o._id.slice(-8).toUpperCase()}</p>
                    <p style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{o.user?.fullName || "Unknown"}</p>
                    {o.user?.email && <p style={{ fontSize: 10, color: C.faint }}>{o.user.email}</p>}
                  </div>
                  <StatusChip status={o.orderStatus} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}><Price amount={o.finalPrice} /></p>
                    <p style={{ fontSize: 10, color: C.faint }}>{new Date(o.createdAt).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" })}</p>
                  </div>
                  <button onClick={() => openEdit(o)} style={{ ...btnBase, fontSize: 11, padding: "6px 14px" }}>
                    <Icon n="edit" size={13} />Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: C.radLg, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "88px 1fr 84px 80px 58px 60px", padding: "7px 12px", background: C.surface, borderBottom: `0.5px solid ${C.border}` }}>
              {["Order ID","Customer","Status","Amount","Date","Action"].map(l => (
                <span key={l} style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: C.faint }}>{l}</span>
              ))}
            </div>
            {loading && <div style={{ padding: "20px 12px", fontSize: 12, color: C.faint }}>Loading…</div>}
            {!loading && visible.length === 0 && <Empty icon="shopping-bag" text="No orders found" />}
            {visible.map((o, i) => (
              <div key={o._id} style={{ display: "grid", gridTemplateColumns: "88px 1fr 84px 80px 58px 60px", padding: "9px 12px", alignItems: "center", borderBottom: i === visible.length - 1 ? "none" : `0.5px solid ${C.border}` }}>
                <span style={{ fontSize: 10, fontFamily: C.mono, fontWeight: 500, color: C.text }}>#{o._id.slice(-8).toUpperCase()}</span>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 500, color: C.text }}>{o.user?.fullName || "Unknown"}</p>
                  {o.user?.email && <p style={{ fontSize: 10, color: C.faint }}>{o.user.email}</p>}
                </div>
                <StatusChip status={o.orderStatus} />
                <span style={{ fontSize: 11, fontWeight: 500, color: C.text }}><Price amount={o.finalPrice} /></span>
                <span style={{ fontSize: 10, color: C.faint }}>{new Date(o.createdAt).toLocaleDateString("en-NG", { day: "2-digit", month: "short" })}</span>
                <button onClick={() => openEdit(o)} style={{ ...btnBase, fontSize: 10, padding: "4px 8px" }}>
                  <Icon n="edit" size={12} />Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order status modal */}
      {editing && (
        <Modal
          title={`Update order #${editing._id.slice(-8).toUpperCase()}`}
          subtitle={`${editing.user?.fullName || "Unknown"} · ${editing.user?.email || ""}`}
          onClose={closeEdit}
          width={440}
          footer={<>
            <button onClick={closeEdit} style={{ ...btnBase, flex: "0 0 auto" }}>Cancel</button>
            <button onClick={submit} disabled={saving} style={{ ...btnPrimary, flex: 1, justifyContent: "center", opacity: saving ? .6 : 1 }}>
              {saving ? "Saving…" : "Update status"}
            </button>
          </>}
        >
          {/* Summary strip */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16, padding: "10px 12px", background: C.surface, borderRadius: C.radMd }}>
            <div>
              <p style={{ fontSize: 10, color: C.faint, marginBottom: 3 }}>Amount</p>
              <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}><Price amount={editing.finalPrice} /></p>
            </div>
            <div>
              <p style={{ fontSize: 10, color: C.faint, marginBottom: 3 }}>Current</p>
              <StatusChip status={editing.orderStatus} />
            </div>
            <div>
              <p style={{ fontSize: 10, color: C.faint, marginBottom: 3 }}>Date</p>
              <p style={{ fontSize: 11, color: C.muted }}>{new Date(editing.createdAt).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" })}</p>
            </div>
          </div>

          <Ol mb={8}>New status</Ol>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
            {STATUSES.map(s => {
              const sty = STATUS_BADGE[s] || { bg: C.surface, color: C.muted }
              const active = newStatus === s
              return (
                <button key={s} onClick={() => setNewStatus(s)} style={{ padding: "12px 14px", borderRadius: C.radMd, cursor: "pointer", border: `1.5px solid ${active ? sty.color : C.border}`, background: active ? sty.bg : C.bg, color: active ? sty.color : C.muted, fontSize: 12, fontWeight: active ? 600 : 400, textTransform: "capitalize", textAlign: "left", display: "flex", alignItems: "center", gap: 7, transition: "all .1s" }}>
                  {active && <Icon n="check" size={13} style={{ color: sty.color }} />}
                  {s}
                </button>
              )
            })}
          </div>

          <Field label="Note (optional)">
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="Reason for status change…" style={{ ...inp, resize: "vertical" }} />
          </Field>
          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 12px", background: "#FCEBEB", borderRadius: C.radMd, marginTop: 4 }}>
              <Icon n="alert-circle" size={13} style={{ color: "#A32D2D" }} />
              <p style={{ fontSize: 11, color: "#A32D2D" }}>{error}</p>
            </div>
          )}
        </Modal>
      )}
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════
   PRODUCTS
══════════════════════════════════════════════════════════════════ */
const EMPTY_FORM = {
  name: "", description: "", price: "", discountPrice: "",
  category: "", brand: "", stock: "",
  isFeatured: false, isActive: true, images: [],
}

function ProductsView() {
  const isMobile = useIsMobile()
  const [products,  setProducts]  = useState([])
  const [loading,   setLoading]   = useState(true)
  const [filterCat, setFilterCat] = useState("all")
  const [modal,     setModal]     = useState(null)
  const [form,      setForm]      = useState(EMPTY_FORM)
  const [newFiles,  setNewFiles]  = useState([])
  const [previews,  setPreviews]  = useState([])
  const [uploading, setUploading] = useState(false)
  const [saving,    setSaving]    = useState(false)
  const [error,     setError]     = useState("")
  const fileRef = useRef()

  const load = () => {
    setLoading(true)
    productsApi.getAll({ limit: 200 })
      .then(r => setProducts(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const f = v => setForm(x => ({ ...x, ...v }))

  const openCreate = () => { setForm(EMPTY_FORM); setNewFiles([]); setPreviews([]); setError(""); setModal("create") }
  const openEdit   = p  => {
    setForm({ name: p.name || "", description: p.description || "", price: p.price ?? "", discountPrice: p.discountPrice ?? "", category: p.category || "", brand: p.brand || "", stock: p.stock ?? "", isFeatured: !!p.isFeatured, isActive: p.isActive !== false, images: [...(p.images || [])] })
    setNewFiles([]); setPreviews([]); setError(""); setModal(p)
  }
  const closeModal = () => { setModal(null); setSaving(false); setUploading(false) }

  const handlePick = files => {
    const arr = Array.from(files)
    setNewFiles(prev => [...prev, ...arr])
    setPreviews(prev => [...prev, ...arr.map(f => URL.createObjectURL(f))])
  }
  const removeExisting = idx => f({ images: form.images.filter((_, i) => i !== idx) })
  const removeNew      = idx => { setNewFiles(prev => prev.filter((_, i) => i !== idx)); setPreviews(prev => prev.filter((_, i) => i !== idx)) }

  const uploadFiles = async () => {
    if (!newFiles.length) return []
    const fd = new FormData()
    newFiles.forEach(file => fd.append("images", file))
    setUploading(true)
    try {
      const res = await uploadApi.productImages(fd)
      const raw = res.data?.data?.urls ?? res.data?.data ?? res.data ?? []
      return Array.isArray(raw) ? raw : []
    } finally { setUploading(false) }
  }

  const handleSave = async () => {
    if (!form.name.trim())  { setError("Product name is required."); return }
    if (!form.price)        { setError("Price is required."); return }
    if (!form.category)     { setError("Category is required."); return }
    setSaving(true); setError("")
    try {
      const freshUrls = await uploadFiles()
      const payload = { name: form.name.trim(), description: form.description.trim(), price: Number(form.price), discountPrice: form.discountPrice ? Number(form.discountPrice) : 0, category: form.category, brand: form.brand.trim(), stock: Number(form.stock), isFeatured: form.isFeatured, isActive: form.isActive, images: [...form.images, ...freshUrls] }
      if (modal === "create") {
        const res = await productsApi.create(payload)
        setProducts(prev => [res.data.data || res.data, ...prev])
      } else {
        const res = await productsApi.update(modal._id, payload)
        const updated = res.data.data || res.data
        setProducts(prev => prev.map(p => p._id === modal._id ? updated : p))
      }
      closeModal()
    } catch (e) { setError(e?.response?.data?.message || "Failed to save product."); setSaving(false) }
  }

  const quickToggle = async (product, field) => {
    try {
      const res = await productsApi.update(product._id, { [field]: !product[field] })
      const updated = res.data.data || res.data
      setProducts(prev => prev.map(p => p._id === product._id ? updated : p))
    } catch {}
  }

  const handleDelete = async id => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return
    try { await productsApi.remove(id); setProducts(prev => prev.filter(p => p._id !== id)) } catch {}
  }

  const isCreate = modal === "create"
  const visible  = filterCat === "all" ? products : products.filter(p => p.category === filterCat)
  const discountPreview = form.price && form.discountPrice && Number(form.discountPrice) > 0 && Number(form.discountPrice) < Number(form.price)
    ? Math.round((1 - Number(form.discountPrice) / Number(form.price)) * 100) : null

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Toolbar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {["all", ...CATEGORIES].map(c => (
              <button key={c} onClick={() => setFilterCat(c)} style={{ fontSize: 10, fontWeight: 500, padding: "4px 10px", borderRadius: 12, cursor: "pointer", background: filterCat === c ? C.text : "transparent", color: filterCat === c ? C.bg : C.muted, border: `0.5px solid ${filterCat === c ? C.text : C.border}` }}>{c}</button>
            ))}
          </div>
          <button onClick={openCreate} style={btnPrimary}><Icon n="plus" size={13} />Add product</button>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Chip bg="#EAF3DE" color="#3B6D11">{products.filter(p => p.isFeatured).length} featured</Chip>
          <Chip bg={C.surface} color={C.muted}>{products.filter(p => p.isActive !== false).length} active</Chip>
          <Chip bg="#FCEBEB" color="#A32D2D">{products.filter(p => p.isActive === false).length} inactive</Chip>
        </div>

        {/* Mobile: card list / Desktop: table */}
        {isMobile ? (
          <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: C.radLg, overflow: "hidden" }}>
            {loading && <div style={{ padding: "20px 14px", fontSize: 12, color: C.faint }}>Loading…</div>}
            {!loading && visible.length === 0 && <Empty icon="box" text="No products found" />}
            {visible.map((p, i) => (
              <div key={p._id} style={{ padding: "14px", borderBottom: i === visible.length - 1 ? "none" : `0.5px solid ${C.border}`, opacity: p.isActive === false ? 0.5 : 1 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  {/* Thumbnail */}
                  {p.images?.[0]
                    ? <img src={p.images[0]} alt="" style={{ width: 52, height: 52, objectFit: "cover", borderRadius: C.radMd, border: `0.5px solid ${C.border}`, flexShrink: 0 }} />
                    : <div style={{ width: 52, height: 52, borderRadius: C.radMd, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon n="photo" size={18} style={{ color: C.faint }} /></div>
                  }
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 500, color: C.text, marginBottom: 2 }}>{p.name}</p>
                    <p style={{ fontSize: 10, color: C.faint, marginBottom: 6 }}>{p.brand || "—"} · {p.category || "—"}</p>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                      <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}><Price amount={p.price} /></p>
                      <Chip bg={p.isActive !== false ? "#EAF3DE" : "#FCEBEB"} color={p.isActive !== false ? "#3B6D11" : "#A32D2D"}>{p.isActive !== false ? "Live" : "Hidden"}</Chip>
                      {p.isFeatured && <Chip bg="#FAEEDA" color="#854F0B">Featured</Chip>}
                    </div>
                  </div>
                </div>
                {/* Actions row */}
                <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                  <button onClick={() => openEdit(p)} style={{ ...btnBase, flex: 1, justifyContent: "center", fontSize: 11 }}><Icon n="edit" size={13} />Edit</button>
                  <button onClick={() => quickToggle(p, "isFeatured")} style={{ ...btnBase, fontSize: 11, padding: "6px 10px", background: p.isFeatured ? "#FAEEDA" : C.surface, color: p.isFeatured ? "#854F0B" : C.muted }}>
                    <Icon n={p.isFeatured ? "star-filled" : "star"} size={13} />
                  </button>
                  <button onClick={() => quickToggle(p, "isActive")} style={{ ...btnBase, fontSize: 11, padding: "6px 10px", background: p.isActive !== false ? "#EAF3DE" : "#FCEBEB", color: p.isActive !== false ? "#3B6D11" : "#A32D2D" }}>
                    <Icon n={p.isActive !== false ? "eye" : "eye-off"} size={13} />
                  </button>
                  <button onClick={() => handleDelete(p._id)} style={{ ...btnDanger, padding: "6px 10px" }}><Icon n="trash" size={13} /></button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: C.radLg, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 100px 80px 54px 80px 80px 78px", padding: "7px 12px", background: C.surface, borderBottom: `0.5px solid ${C.border}` }}>
              {["","Product","Category","Price","Stock","Featured","Active","Actions"].map(l => (
                <span key={l} style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: C.faint }}>{l}</span>
              ))}
            </div>
            {loading && <div style={{ padding: "20px 12px", fontSize: 12, color: C.faint }}>Loading…</div>}
            {!loading && visible.length === 0 && <Empty icon="box" text="No products found" />}
            {visible.map((p, i) => (
              <div key={p._id} style={{ display: "grid", gridTemplateColumns: "48px 1fr 100px 80px 54px 80px 80px 78px", padding: "9px 12px", alignItems: "center", borderBottom: i === visible.length - 1 ? "none" : `0.5px solid ${C.border}`, opacity: p.isActive === false ? 0.45 : 1 }}>
                {p.images?.[0]
                  ? <img src={p.images[0]} alt="" style={{ width: 36, height: 36, objectFit: "cover", borderRadius: C.radMd, border: `0.5px solid ${C.border}` }} />
                  : <div style={{ width: 36, height: 36, borderRadius: C.radMd, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon n="photo" size={14} style={{ color: C.faint }} /></div>
                }
                <div>
                  <p style={{ fontSize: 11, fontWeight: 500, color: C.text, lineHeight: 1.3 }}>{p.name}</p>
                  <p style={{ fontSize: 10, color: C.faint }}>{p.brand || "—"}</p>
                </div>
                <span style={{ fontSize: 11, color: C.muted }}>{p.category || "—"}</span>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 500, color: C.text }}><Price amount={p.price} /></p>
                  {p.discountPrice > 0 && <p style={{ fontSize: 10, color: "#3B6D11" }}>-{Math.round((1 - p.discountPrice / p.price) * 100)}%</p>}
                </div>
                <span style={{ fontSize: 11, color: (p.stock ?? 99) < 5 ? "#A32D2D" : C.muted, fontWeight: (p.stock ?? 99) < 5 ? 600 : 400 }}>{p.stock ?? "—"}</span>
                <button onClick={() => quickToggle(p, "isFeatured")} style={{ ...btnBase, padding: "3px 8px", fontSize: 10, background: p.isFeatured ? "#EAF3DE" : C.surface, color: p.isFeatured ? "#3B6D11" : C.faint, border: `0.5px solid ${p.isFeatured ? "#3B6D11" : C.border}` }}>
                  <Icon n={p.isFeatured ? "star-filled" : "star"} size={12} />{p.isFeatured ? "Yes" : "No"}
                </button>
                <button onClick={() => quickToggle(p, "isActive")} style={{ ...btnBase, padding: "3px 8px", fontSize: 10, background: p.isActive !== false ? "#EAF3DE" : "#FCEBEB", color: p.isActive !== false ? "#3B6D11" : "#A32D2D", border: `0.5px solid ${p.isActive !== false ? "#3B6D11" : "#F09595"}` }}>
                  <Icon n={p.isActive !== false ? "eye" : "eye-off"} size={12} />{p.isActive !== false ? "Live" : "Hidden"}
                </button>
                <div style={{ display: "flex", gap: 5 }}>
                  <button onClick={() => openEdit(p)} style={{ ...btnBase, padding: "4px 7px" }}><Icon n="edit" size={12} /></button>
                  <button onClick={() => handleDelete(p._id)} style={{ ...btnDanger, padding: "4px 7px" }}><Icon n="trash" size={12} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product modal */}
      {modal && (
        <Modal
          title={isCreate ? "Add new product" : "Edit product"}
          subtitle={isCreate ? "Fill in the details below to list a new product." : `Editing: ${modal.name}`}
          onClose={closeModal}
          width={620}
          footer={<>
            <button onClick={closeModal} style={{ ...btnBase, flex: "0 0 auto" }}>Cancel</button>
            <button onClick={handleSave} disabled={saving || uploading} style={{ ...btnPrimary, flex: 1, justifyContent: "center", opacity: (saving || uploading) ? .6 : 1 }}>
              <Icon n={isCreate ? "plus" : "check"} size={13} />
              {uploading ? "Uploading…" : saving ? "Saving…" : isCreate ? "Create product" : "Save changes"}
            </button>
          </>}
        >
          {/* Visibility toggles */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18, padding: "12px 14px", background: C.surface, borderRadius: C.radMd }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: C.faint, marginBottom: 7 }}>Visibility</p>
              <Toggle value={form.isActive} onChange={v => f({ isActive: v })} label={form.isActive ? "Live" : "Hidden"} activeColor="#3B6D11" activeBg="#EAF3DE" />
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: C.faint, marginBottom: 7 }}>Featured</p>
              <Toggle value={form.isFeatured} onChange={v => f({ isFeatured: v })} label={form.isFeatured ? "On home page" : "Not featured"} activeColor="#EF9F27" activeBg="#FAEEDA" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
            <Field label="Product name" span2>
              <input value={form.name} onChange={e => f({ name: e.target.value })} style={inp} placeholder="e.g. Hikvision 4MP IP Camera" />
            </Field>
            <Field label="Category">
              <select value={form.category} onChange={e => f({ category: e.target.value })} style={sel}>
                <option value="">Select category…</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Brand">
              <input value={form.brand} onChange={e => f({ brand: e.target.value })} style={inp} placeholder="e.g. Hikvision" />
            </Field>
            <Field label="Price (₦)">
              <input type="number" min="0" value={form.price} onChange={e => f({ price: e.target.value })} style={inp} placeholder="0" />
            </Field>
            <Field label="Discount price (₦)" hint="Leave 0 for no discount">
              <input type="number" min="0" value={form.discountPrice} onChange={e => f({ discountPrice: e.target.value })} style={inp} placeholder="0" />
            </Field>
            <Field label="Stock quantity">
              <input type="number" min="0" value={form.stock} onChange={e => f({ stock: e.target.value })} style={inp} placeholder="0" />
            </Field>
            <Field label="Description" span2>
              <textarea value={form.description} onChange={e => f({ description: e.target.value })} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="Describe the product…" />
            </Field>

            {discountPreview && (
              <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#EAF3DE", borderRadius: C.radMd, marginBottom: 4 }}>
                <Icon n="tag" size={13} style={{ color: "#3B6D11" }} />
                <p style={{ fontSize: 11, color: "#3B6D11" }}><strong>{discountPreview}% off</strong> — customers pay <strong><Price amount={Number(form.discountPrice)} /></strong></p>
              </div>
            )}

            {/* Images */}
            <Field label={`Images (${form.images.length + newFiles.length})`} hint="First image is the main display image." span2>
              {form.images.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: C.faint, marginBottom: 7 }}>Saved — tap ✕ to remove</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {form.images.map((url, i) => (
                      <div key={i} style={{ position: "relative", width: 76, height: 76 }}>
                        <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: C.radMd, border: `0.5px solid ${C.border}` }} />
                        <button onClick={() => removeExisting(i)} style={{ position: "absolute", top: -7, right: -7, width: 22, height: 22, borderRadius: "50%", background: "#FCEBEB", color: "#A32D2D", border: "0.5px solid #F09595", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                          <Icon n="x" size={11} />
                        </button>
                        {i === 0 && <span style={{ position: "absolute", bottom: 4, left: 4, fontSize: 8, fontWeight: 700, background: "rgba(0,0,0,.6)", color: "#fff", padding: "1px 5px", borderRadius: 4 }}>MAIN</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {previews.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: C.faint, marginBottom: 7 }}>New — will upload on save</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {previews.map((src, i) => (
                      <div key={i} style={{ position: "relative", width: 76, height: 76 }}>
                        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: C.radMd, border: `1px dashed ${C.borderMd}` }} />
                        <button onClick={() => removeNew(i)} style={{ position: "absolute", top: -7, right: -7, width: 22, height: 22, borderRadius: "50%", background: "#FCEBEB", color: "#A32D2D", border: "0.5px solid #F09595", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                          <Icon n="x" size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" multiple onChange={e => handlePick(e.target.files)} style={{ display: "none" }} />
              <button onClick={() => fileRef.current?.click()} style={{ ...btnBase, width: "100%", justifyContent: "center", padding: "12px", border: `1px dashed ${C.borderMd}` }}>
                <Icon n="upload" size={14} />
                {form.images.length || newFiles.length ? "Add more images" : "Upload images"}
              </button>
            </Field>
          </div>

          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 12px", background: "#FCEBEB", borderRadius: C.radMd, marginTop: 4 }}>
              <Icon n="alert-circle" size={13} style={{ color: "#A32D2D" }} />
              <p style={{ fontSize: 11, color: "#A32D2D" }}>{error}</p>
            </div>
          )}
        </Modal>
      )}
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════
   USERS
══════════════════════════════════════════════════════════════════ */
function UsersView() {
  const isMobile = useIsMobile()
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [acting,  setActing]  = useState({})

  useEffect(() => {
    adminApi.getUsers({ limit: 100 })
      .then(r => setUsers(r.data.data || r.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const busy = id => !!acting[id]
  const wrap = (id, fn) => {
    setActing(a => ({ ...a, [id]: true }))
    fn().catch(() => {}).finally(() => setActing(a => ({ ...a, [id]: false })))
  }
  const toggleStatus = id => wrap(id, async () => {
    const res = await adminApi.toggleStatus(id)
    const u = res.data.data || res.data
    setUsers(prev => prev.map(x => x._id === id ? { ...x, isActive: u.isActive } : x))
  })
  const changeRole = (id, role) => wrap(id, async () => {
    const res = await adminApi.changeRole(id, role)
    const u = res.data.data || res.data
    setUsers(prev => prev.map(x => x._id === id ? { ...x, role: u.role } : x))
  })

  const av = i => AVATAR_PAL[i % AVATAR_PAL.length]

  if (loading) return <div style={{ padding: "20px", fontSize: 12, color: C.faint }}>Loading…</div>

  return (
    <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: C.radLg, overflow: "hidden" }}>
      {!isMobile && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 170px 110px 76px 120px", padding: "7px 14px", background: C.surface, borderBottom: `0.5px solid ${C.border}` }}>
          {["Name","Email","Role","Status","Actions"].map(l => (
            <span key={l} style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: C.faint }}>{l}</span>
          ))}
        </div>
      )}
      {users.length === 0 && <Empty icon="users" text="No users yet" />}
      {users.map((u, i) => {
        const [bg, color] = av(i)
        const initials = (u.fullName || u.name || "?").slice(0, 2).toUpperCase()
        return isMobile ? (
          <div key={u._id} style={{ padding: "14px", borderBottom: i === users.length - 1 ? "none" : `0.5px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: bg, color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{u.fullName || u.name || "—"}</p>
                <p style={{ fontSize: 11, color: C.faint, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email || "—"}</p>
              </div>
              <Chip bg={u.isActive !== false ? "#EAF3DE" : "#FCEBEB"} color={u.isActive !== false ? "#3B6D11" : "#A32D2D"}>
                {u.isActive !== false ? "Active" : "Inactive"}
              </Chip>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <select value={u.role || "user"} disabled={busy(u._id)} onChange={e => changeRole(u._id, e.target.value)}
                style={{ ...sel, fontSize: 11, padding: "6px 9px", flex: 1, opacity: busy(u._id) ? .6 : 1 }}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button onClick={() => toggleStatus(u._id)} disabled={busy(u._id)}
                style={{ ...btnBase, fontSize: 11, padding: "6px 12px", flex: 1, justifyContent: "center", opacity: busy(u._id) ? .6 : 1 }}>
                <Icon n={u.isActive !== false ? "user-off" : "user-check"} size={13} />
                {u.isActive !== false ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        ) : (
          <div key={u._id} style={{ display: "grid", gridTemplateColumns: "1fr 170px 110px 76px 120px", padding: "9px 14px", alignItems: "center", borderBottom: i === users.length - 1 ? "none" : `0.5px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: bg, color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, flexShrink: 0 }}>{initials}</div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 500, color: C.text }}>{u.fullName || u.name || "—"}</p>
                <p style={{ fontSize: 10, color: C.faint }}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-NG", { month: "short", year: "numeric" }) : ""}</p>
              </div>
            </div>
            <span style={{ fontSize: 10, color: C.faint, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email || "—"}</span>
            <select value={u.role || "user"} disabled={busy(u._id)} onChange={e => changeRole(u._id, e.target.value)}
              style={{ ...sel, fontSize: 10, padding: "4px 7px", width: "auto", opacity: busy(u._id) ? .6 : 1 }}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <Chip bg={u.isActive !== false ? "#EAF3DE" : "#FCEBEB"} color={u.isActive !== false ? "#3B6D11" : "#A32D2D"}>
              {u.isActive !== false ? "Active" : "Inactive"}
            </Chip>
            <button onClick={() => toggleStatus(u._id)} disabled={busy(u._id)}
              style={{ ...btnBase, fontSize: 10, padding: "4px 8px", opacity: busy(u._id) ? .6 : 1 }}>
              <Icon n={u.isActive !== false ? "user-off" : "user-check"} size={12} />
              {u.isActive !== false ? "Deactivate" : "Activate"}
            </button>
          </div>
        )
      })}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SHELL
══════════════════════════════════════════════════════════════════ */
const NAV = [
  { id: "overview",  label: "Overview",  icon: "layout-dashboard" },
  { id: "orders",    label: "Orders",    icon: "shopping-bag"      },
  { id: "products",  label: "Products",  icon: "box"               },
  { id: "users",     label: "Users",     icon: "users"             },
]

export default function AdminDashboard() {
  const isMobile = useIsMobile()
  const [active,       setActive]       = useState("overview")
  const [analytics,    setAnalytics]    = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [loading,      setLoading]      = useState(true)
  const [navOpen,      setNavOpen]      = useState(false)

  useEffect(() => {
    Promise.all([
      adminApi.getAnalytics(),
      ordersApi.getAll({ limit: 6, sort: "-createdAt" }),
    ])
      .then(([a, o]) => { setAnalytics(a.data.data); setRecentOrders(o.data.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingPage />

  const handleNav = id => { setActive(id); setNavOpen(false) }

  return (
    <div style={{ display: "flex", height: "100dvh", overflow: "hidden", background: C.page, fontFamily: "var(--font-sans)" }}>

      {/* ── Desktop sidebar ── */}
      {!isMobile && (
        <aside style={{ width: 186, flexShrink: 0, background: C.bg, borderRight: `0.5px solid ${C.border}`, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 14px 12px", borderBottom: `0.5px solid ${C.border}` }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: C.text }}>Safemart</p>
            <p style={{ fontSize: 10, color: C.faint, marginTop: 2 }}>Admin panel</p>
          </div>
          <nav style={{ padding: 8, flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setActive(n.id)} style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "8px 10px", borderRadius: C.radMd, background: active === n.id ? C.surface : "transparent", border: `0.5px solid ${active === n.id ? C.border : "transparent"}`, color: active === n.id ? C.text : C.muted, fontSize: 12, fontWeight: active === n.id ? 500 : 400, cursor: "pointer", textAlign: "left" }}>
                <Icon n={n.icon} size={15} />{n.label}
              </button>
            ))}
          </nav>
          <div style={{ padding: "12px 14px", borderTop: `0.5px solid ${C.border}` }}>
            <p style={{ fontSize: 9, color: C.faint }}>© 2026 Safemart</p>
          </div>
        </aside>
      )}

      {/* ── Mobile bottom sheet nav ── */}
      {isMobile && navOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.4)" }} onClick={() => setNavOpen(false)}>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: C.bg, borderRadius: "20px 20px 0 0", padding: "8px 0 32px" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 12px" }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: C.borderMd }} />
            </div>
            {NAV.map(n => (
              <button key={n.id} onClick={() => handleNav(n.id)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "14px 20px", background: active === n.id ? C.surface : "transparent", border: "none", color: active === n.id ? C.text : C.muted, fontSize: 14, fontWeight: active === n.id ? 500 : 400, cursor: "pointer", textAlign: "left" }}>
                <Icon n={n.icon} size={18} />{n.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Main ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Header */}
        <header style={{ height: 52, flexShrink: 0, background: C.bg, borderBottom: `0.5px solid ${C.border}`, padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {isMobile && (
              <button onClick={() => setNavOpen(true)} style={{ ...btnBase, padding: "5px 8px", border: "none", background: "transparent" }}>
                <Icon n="menu-2" size={18} />
              </button>
            )}
            <div>
              <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".09em", textTransform: "uppercase", color: C.faint }}>Admin</p>
              <p style={{ fontSize: 14, fontWeight: 500, color: C.text, lineHeight: 1.2 }}>{NAV.find(n => n.id === active)?.label}</p>
            </div>
          </div>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#EEEDFE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, color: "#534AB7" }}>A</div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: isMobile ? "12px 12px 24px" : "16px 20px" }}>
          {active === "overview"  && <OverviewView analytics={analytics} recentOrders={recentOrders} />}
          {active === "orders"    && <OrdersView />}
          {active === "products"  && <ProductsView />}
          {active === "users"     && <UsersView />}
        </main>

        {/* ── Mobile bottom tab bar ── */}
        {isMobile && (
          <nav style={{ flexShrink: 0, background: C.bg, borderTop: `0.5px solid ${C.border}`, display: "flex", padding: "6px 0 10px" }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setActive(n.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 4px", background: "transparent", border: "none", cursor: "pointer", color: active === n.id ? C.text : C.faint }}>
                <Icon n={n.icon} size={20} style={{ color: active === n.id ? C.text : C.faint }} />
                <span style={{ fontSize: 9, fontWeight: active === n.id ? 600 : 400, letterSpacing: ".04em" }}>{n.label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  )
}