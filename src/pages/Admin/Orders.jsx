import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { ordersApi } from "../../api/services"
import { LoadingPage, Price, Pagination } from "../../components/ui"

/* ── Tabler icons CDN ────────────────────────────────────────────── */
if (typeof document !== "undefined" && !document.getElementById("_ti")) {
  const l = document.createElement("link")
  l.id = "_ti"; l.rel = "stylesheet"
  l.href = "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css"
  document.head.appendChild(l)
}

/* ── Tokens ──────────────────────────────────────────────────────── */
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

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"]

const STATUS_BADGE = {
  pending:    { bg: "#FAEEDA", color: "#854F0B" },
  processing: { bg: "#E6F1FB", color: "#185FA5" },
  shipped:    { bg: "#EEEDFE", color: "#534AB7" },
  delivered:  { bg: "#EAF3DE", color: "#3B6D11" },
  cancelled:  { bg: "#FCEBEB", color: "#A32D2D" },
}

const PAYMENT_BADGE = {
  paid:    { bg: "#EAF3DE", color: "#3B6D11" },
  pending: { bg: "#FAEEDA", color: "#854F0B" },
  failed:  { bg: "#FCEBEB", color: "#A32D2D" },
}

/* ── Atoms ───────────────────────────────────────────────────────── */
const Icon = ({ n, size = 14, style = {} }) => (
  <i className={`ti ti-${n}`} aria-hidden="true" style={{ fontSize: size, lineHeight: 1, flexShrink: 0, ...style }} />
)
const Ol = ({ children, mb = 10 }) => (
  <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: C.faint, marginBottom: mb }}>
    {children}
  </p>
)
const Chip = ({ children, bg, color }) => (
  <span style={{ fontSize: 9, fontWeight: 600, padding: "2px 7px", borderRadius: 10, letterSpacing: ".04em", textTransform: "capitalize", background: bg, color, display: "inline-block", whiteSpace: "nowrap" }}>
    {children}
  </span>
)
const StatusChip  = ({ status }) => { const s = STATUS_BADGE[status]  || { bg: C.surface, color: C.muted }; return <Chip bg={s.bg} color={s.color}>{status}</Chip> }
const PaymentChip = ({ status }) => { const s = PAYMENT_BADGE[status] || { bg: C.surface, color: C.muted }; return <Chip bg={s.bg} color={s.color}>{status || "—"}</Chip> }

const TblWrap = ({ children }) => (
  <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: C.radLg, overflow: "hidden" }}>
    {children}
  </div>
)
const TblHead = ({ cols, labels }) => (
  <div style={{ display: "grid", gridTemplateColumns: cols, padding: "7px 16px", background: C.surface, borderBottom: `0.5px solid ${C.border}` }}>
    {labels.map(l => <span key={l} style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: C.faint }}>{l}</span>)}
  </div>
)
const TblRow = ({ cols, children, last }) => (
  <div style={{ display: "grid", gridTemplateColumns: cols, padding: "10px 16px", alignItems: "center", borderBottom: last ? "none" : `0.5px solid ${C.border}` }}>
    {children}
  </div>
)
function Empty({ icon, text }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "48px 20px" }}>
      <Icon n={icon} size={26} style={{ color: C.faint }} />
      <p style={{ fontSize: 12, color: C.faint }}>{text}</p>
    </div>
  )
}

/* ── Buttons ─────────────────────────────────────────────────────── */
const btnBase    = { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 500, padding: "6px 12px", borderRadius: C.radMd, cursor: "pointer", border: `0.5px solid ${C.border}`, background: C.bg, color: C.text }
const btnPrimary = { ...btnBase, background: C.text, color: C.bg, border: "none" }

/* ── Modal ───────────────────────────────────────────────────────── */
function Modal({ title, subtitle, onClose, children, footer, width = 440 }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 }}>
      <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: C.radLg, width, maxWidth: "100%", maxHeight: "92vh", display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "14px 18px", borderBottom: `0.5px solid ${C.border}`, flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{title}</p>
            {subtitle && <p style={{ fontSize: 11, color: C.faint, marginTop: 2 }}>{subtitle}</p>}
          </div>
          <button onClick={onClose} style={{ ...btnBase, padding: "3px 6px", border: "none", background: "transparent", color: C.faint }}>
            <Icon n="x" size={15} />
          </button>
        </div>
        <div style={{ overflowY: "auto", padding: "18px 18px 4px", flex: 1 }}>{children}</div>
        {footer && (
          <div style={{ padding: "12px 18px", borderTop: `0.5px solid ${C.border}`, flexShrink: 0, display: "flex", justifyContent: "flex-end", gap: 8 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════════════ */
export default function AdminOrders() {
  const [orders,       setOrders]       = useState([])
  const [pages,        setPages]        = useState(1)
  const [page,         setPage]         = useState(1)
  const [loading,      setLoading]      = useState(true)
  const [statusFilter, setStatusFilter] = useState("")
  const [editing,      setEditing]      = useState(null)
  const [newStatus,    setNewStatus]    = useState("")
  const [note,         setNote]         = useState("")
  const [saving,       setSaving]       = useState(false)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await ordersApi.getAll({ page, limit: 15, ...(statusFilter && { status: statusFilter }) })
      setOrders(res.data.data)
      setPages(res.data.pages)
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load orders")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrders() }, [page, statusFilter])

  const openEdit  = o  => { setEditing(o); setNewStatus(o.orderStatus); setNote("") }
  const closeEdit = () => { setEditing(null); setSaving(false) }

  const handleUpdate = async () => {
    setSaving(true)
    try {
      await ordersApi.updateStatus(editing._id, { status: newStatus, note: note.trim() })
      toast.success("Order updated")
      closeEdit()
      fetchOrders()
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update order")
      setSaving(false)
    }
  }

  /* ── status counts for summary chips ── */
  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = orders.filter(o => o.orderStatus === s).length
    return acc
  }, {})

  return (
    <div style={{ background: C.page, minHeight: "100vh", fontFamily: "var(--font-sans)" }}>

      {/* Top bar */}
      <div style={{ background: C.bg, borderBottom: `0.5px solid ${C.border}`, padding: "14px 32px" }}>
        <Link to="/admin" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: C.faint, textDecoration: "none", marginBottom: 10 }}>
          <Icon n="arrow-left" size={13} /> Dashboard
        </Link>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: C.faint, marginBottom: 4 }}>Admin</p>
            <h1 style={{ fontSize: 22, fontWeight: 500, color: C.text }}>Orders</h1>
          </div>
          {/* Status summary chips */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {STATUS_OPTIONS.map(s => {
              const sty = STATUS_BADGE[s]
              return (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 12, background: sty.bg, border: `0.5px solid ${sty.color}20` }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: sty.color }}>{counts[s] || 0}</span>
                  <span style={{ fontSize: 10, color: sty.color, textTransform: "capitalize" }}>{s}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 32px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["", ...STATUS_OPTIONS].map(s => (
            <button key={s || "all"} onClick={() => { setStatusFilter(s); setPage(1) }} style={{ fontSize: 10, fontWeight: 500, padding: "4px 12px", borderRadius: 12, cursor: "pointer", textTransform: "capitalize", background: statusFilter === s ? C.text : "transparent", color: statusFilter === s ? C.bg : C.muted, border: `0.5px solid ${statusFilter === s ? C.text : C.border}` }}>
              {s || "All orders"}
            </button>
          ))}
        </div>

        {loading ? <LoadingPage /> : (
          <>
            <TblWrap>
              <TblHead cols="96px 1fr 90px 80px 76px 64px 56px" labels={["Order ID","Customer","Status","Payment","Amount","Date","Action"]} />
              {orders.length === 0 && <Empty icon="shopping-bag" text="No orders found" />}
              {orders.map((o, i) => (
                <TblRow key={o._id} cols="96px 1fr 90px 80px 76px 64px 56px" last={i === orders.length - 1}>
                  <span style={{ fontSize: 10, fontWeight: 500, fontFamily: C.mono, color: C.text }}>#{o._id.slice(-8).toUpperCase()}</span>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 500, color: C.text }}>{o.user?.fullName || "Unknown"}</p>
                    <p style={{ fontSize: 10, color: C.faint }}>{new Date(o.createdAt).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" })}</p>
                  </div>
                  <StatusChip  status={o.orderStatus} />
                  <PaymentChip status={o.paymentInfo?.status} />
                  <span style={{ fontSize: 11, fontWeight: 500, color: C.text }}><Price amount={o.finalPrice} /></span>
                  <span style={{ fontSize: 10, color: C.faint }}>{new Date(o.createdAt).toLocaleDateString("en-NG", { day: "2-digit", month: "short" })}</span>
                  <div style={{ display: "flex", gap: 5 }}>
                    <button onClick={() => openEdit(o)} style={{ ...btnBase, padding: "3px 7px", fontSize: 10 }}>
                      <Icon n="edit" size={11} />
                    </button>
                    <Link to={`/admin/orders/${o._id}`} style={{ ...btnBase, padding: "3px 7px", fontSize: 10, textDecoration: "none" }}>
                      <Icon n="eye" size={11} />
                    </Link>
                  </div>
                </TblRow>
              ))}
            </TblWrap>

            {pages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                <Pagination page={page} pages={pages} onPageChange={setPage} />
              </div>
            )}
          </>
        )}
      </div>

      {/* Status update modal */}
      {editing && (
        <Modal
          title={`Update order #${editing._id.slice(-8).toUpperCase()}`}
          subtitle={`${editing.user?.fullName || "Unknown"} · ${editing.user?.email || ""}`}
          onClose={closeEdit}
          footer={<>
            <button onClick={closeEdit} style={btnBase}>Cancel</button>
            <button onClick={handleUpdate} disabled={saving || newStatus === editing.orderStatus} style={{ ...btnPrimary, opacity: (saving || newStatus === editing.orderStatus) ? .5 : 1 }}>
              {saving ? "Saving…" : "Update status"}
            </button>
          </>}
        >
          {/* Summary strip */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16, padding: "10px 12px", background: C.surface, borderRadius: C.radMd }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 10, color: C.faint, marginBottom: 2 }}>Amount</p>
              <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}><Price amount={editing.finalPrice} /></p>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 10, color: C.faint, marginBottom: 2 }}>Current status</p>
              <StatusChip status={editing.orderStatus} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 10, color: C.faint, marginBottom: 2 }}>Payment</p>
              <PaymentChip status={editing.paymentInfo?.status} />
            </div>
          </div>

          {/* Status card picker */}
          <Ol mb={8}>Select new status</Ol>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
            {STATUS_OPTIONS.map(s => {
              const sty = STATUS_BADGE[s] || { bg: C.surface, color: C.muted }
              const active = newStatus === s
              return (
                <button key={s} onClick={() => setNewStatus(s)} style={{ padding: "10px 12px", borderRadius: C.radMd, cursor: "pointer", border: `1.5px solid ${active ? sty.color : C.border}`, background: active ? sty.bg : C.bg, color: active ? sty.color : C.muted, fontSize: 11, fontWeight: active ? 600 : 400, textTransform: "capitalize", textAlign: "left", display: "flex", alignItems: "center", gap: 7, transition: "all .1s" }}>
                  {active && <Icon n="check" size={12} style={{ color: sty.color }} />}
                  {s}
                </button>
              )
            })}
          </div>

          {/* Note */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: C.faint, marginBottom: 5 }}>Note (optional)</p>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="Tracking number, reason for change…" style={{ width: "100%", fontSize: 12, padding: "7px 10px", borderRadius: C.radMd, border: `0.5px solid ${C.borderMd}`, background: C.bg, color: C.text, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          </div>
        </Modal>
      )}
    </div>
  )
}