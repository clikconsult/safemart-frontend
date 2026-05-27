import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import { ordersApi } from "../../api/services"
import { LoadingPage, Price } from "../../components/ui"

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

const DATE_FMT = { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }
const DATE_SHORT = { year: "numeric", month: "short", day: "numeric" }

/* ── Atoms ───────────────────────────────────────────────────────── */
const Icon = ({ n, size = 14, style = {} }) => (
  <i className={`ti ti-${n}`} aria-hidden="true" style={{ fontSize: size, lineHeight: 1, flexShrink: 0, ...style }} />
)

const Ol = ({ children, mb = 10 }) => (
  <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: C.faint, marginBottom: mb }}>
    {children}
  </p>
)

const Section = ({ children, style = {} }) => (
  <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: C.radLg, padding: "16px 18px", ...style }}>
    {children}
  </div>
)

const Chip = ({ children, bg, color }) => (
  <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 10, letterSpacing: ".04em", textTransform: "capitalize", background: bg, color, display: "inline-block", whiteSpace: "nowrap" }}>
    {children}
  </span>
)

const StatusChip = ({ status }) => {
  const s = STATUS_BADGE[status] || { bg: C.surface, color: C.muted }
  return <Chip bg={s.bg} color={s.color}>{status}</Chip>
}

const PaymentChip = ({ status }) => {
  const s = PAYMENT_BADGE[status] || { bg: C.surface, color: C.muted }
  return <Chip bg={s.bg} color={s.color}>{status || "unknown"}</Chip>
}

const Row = ({ label, children }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `0.5px solid ${C.border}` }}>
    <span style={{ fontSize: 11, color: C.muted }}>{label}</span>
    <span style={{ fontSize: 11, fontWeight: 500, color: C.text, textAlign: "right" }}>{children}</span>
  </div>
)

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

/* ── Copy button ─────────────────────────────────────────────────── */
function CopyButton({ value }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }
  return (
    <button onClick={copy} title="Copy" style={{ ...btnBase, padding: "2px 6px", fontSize: 10, color: copied ? "#3B6D11" : C.faint, background: copied ? "#EAF3DE" : C.surface, border: `0.5px solid ${copied ? "#3B6D11" : C.border}` }}>
      <Icon n={copied ? "check" : "copy"} size={11} />
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════ */
export default function AdminOrderDetail() {
  const { id } = useParams()
  const [order,          setOrder]          = useState(null)
  const [loading,        setLoading]        = useState(true)
  const [statusModal,    setStatusModal]    = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("")
  const [note,           setNote]           = useState("")
  const [saving,         setSaving]         = useState(false)

  const fetchOrder = async () => {
    setLoading(true)
    try {
      const res = await ordersApi.getById(id)
      const o = res.data.data
      setOrder(o)
      setSelectedStatus(o.orderStatus)
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load order")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrder() }, [id])

  const handleStatusUpdate = async () => {
    setSaving(true)
    try {
      const res = await ordersApi.updateStatus(id, { status: selectedStatus, note: note.trim() })
      setOrder(res.data.data)
      setNote("")
      setStatusModal(false)
      toast.success(res.data.message || "Order updated")
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update order")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingPage />

  if (!order) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <p style={{ fontSize: 13, color: C.muted }}>Order not found.</p>
        <Link to="/admin/orders" style={{ ...btnPrimary }}>Back to Orders</Link>
      </div>
    )
  }

  const payStatus  = order.paymentInfo?.status
  const orderBadge = STATUS_BADGE[order.orderStatus]  || { bg: C.surface, color: C.muted }
  const history    = [...(order.statusHistory || [])].reverse()
  const discount   = order.totalPrice - order.finalPrice + (order.shippingPrice || 0)

  return (
    <div style={{ background: C.page, minHeight: "100vh", fontFamily: "var(--font-sans)" }}>

      {/* ── Top bar ── */}
      <div style={{ background: C.bg, borderBottom: `0.5px solid ${C.border}`, padding: "14px 32px" }}>
        <Link to="/admin/orders" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: C.faint, textDecoration: "none", marginBottom: 10 }}>
          <Icon n="arrow-left" size={13} /> Back to orders
        </Link>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: C.faint, marginBottom: 4 }}>Order</p>
            <h1 style={{ fontSize: 22, fontWeight: 500, color: C.text, lineHeight: 1 }}>
              #{order._id.slice(-8).toUpperCase()}
            </h1>
            <p style={{ fontSize: 11, color: C.faint, marginTop: 5 }}>
              {new Date(order.createdAt).toLocaleString("en-NG", DATE_FMT)}
            </p>
          </div>

          {/* Status badges + action */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <StatusChip status={order.orderStatus} />
            <PaymentChip status={payStatus} />
            <button
              onClick={() => { setSelectedStatus(order.orderStatus); setNote(""); setStatusModal(true) }}
              style={btnPrimary}
            >
              <Icon n="edit" size={13} /> Update status
            </button>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "24px 32px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, alignItems: "start" }}>

        {/* LEFT column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Order items */}
          <Section style={{ padding: 0 }}>
            <div style={{ padding: "14px 18px", borderBottom: `0.5px solid ${C.border}` }}>
              <Ol mb={0}>Items — {order.totalItems} total</Ol>
            </div>
            {order.items?.map((item, i) => (
              <div key={`${item.product?._id || item.name}-${i}`} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 18px", borderBottom: i < order.items.length - 1 ? `0.5px solid ${C.border}` : "none" }}>
                {/* Image */}
                <div style={{ width: 52, height: 52, borderRadius: C.radMd, background: C.surface, overflow: "hidden", flexShrink: 0, border: `0.5px solid ${C.border}` }}>
                  {item.image
                    ? <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon n="photo" size={18} style={{ color: C.faint }} /></div>
                  }
                </div>
                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 500, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                  <p style={{ fontSize: 10, color: C.faint, marginTop: 2 }}>Qty: {item.quantity} · <Price amount={item.price} /> each</p>
                  {item.product?._id && (
                    <Link to={`/products/${item.product._id}`} style={{ fontSize: 10, color: C.faint, textDecoration: "none", marginTop: 3, display: "inline-block" }}>
                      View product →
                    </Link>
                  )}
                </div>
                {/* Subtotal */}
                <p style={{ fontSize: 13, fontWeight: 500, color: C.text, flexShrink: 0 }}>
                  <Price amount={item.subtotal ?? item.price * item.quantity} />
                </p>
              </div>
            ))}
          </Section>

          {/* Status history */}
          <Section>
            <Ol>Status history</Ol>
            {history.length === 0
              ? <p style={{ fontSize: 12, color: C.faint }}>No status history yet.</p>
              : (
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {history.map((entry, i) => {
                    const sty = STATUS_BADGE[entry.status] || { bg: C.surface, color: C.muted }
                    const isLast = i === history.length - 1
                    return (
                      <div key={`${entry.status}-${entry.changedAt}-${i}`} style={{ display: "flex", gap: 14, paddingBottom: isLast ? 0 : 16, position: "relative" }}>
                        {/* Timeline line */}
                        {!isLast && (
                          <div style={{ position: "absolute", left: 7, top: 18, width: 1, height: "calc(100% - 4px)", background: C.border }} />
                        )}
                        {/* Dot */}
                        <div style={{ width: 15, height: 15, borderRadius: "50%", background: sty.bg, border: `1.5px solid ${sty.color}`, flexShrink: 0, marginTop: 2, zIndex: 1 }} />
                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: entry.note ? 4 : 0 }}>
                            <StatusChip status={entry.status} />
                            <span style={{ fontSize: 10, color: C.faint }}>
                              {new Date(entry.changedAt).toLocaleString("en-NG", DATE_FMT)}
                            </span>
                          </div>
                          {entry.note && (
                            <p style={{ fontSize: 11, color: C.muted, background: C.surface, padding: "6px 10px", borderRadius: C.radMd, marginTop: 6 }}>
                              {entry.note}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            }
          </Section>
        </div>

        {/* RIGHT column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Customer */}
          <Section>
            <Ol>Customer</Ol>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#EEEDFE", color: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
                {(order.user?.fullName || "?").slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{order.user?.fullName || "Unknown"}</p>
                <p style={{ fontSize: 11, color: C.faint }}>{order.user?.email || "No email"}</p>
              </div>
            </div>
            {order.user?.phone && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.muted, padding: "6px 10px", background: C.surface, borderRadius: C.radMd }}>
                <Icon n="phone" size={12} style={{ color: C.faint }} />
                {order.user.phone}
              </div>
            )}
          </Section>

          {/* Shipping address */}
          <Section>
            <Ol>Shipping address</Ol>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {order.shippingAddress?.fullName && (
                <p style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{order.shippingAddress.fullName}</p>
              )}
              {order.shippingAddress?.phone && (
                <p style={{ fontSize: 11, color: C.muted }}>{order.shippingAddress.phone}</p>
              )}
              {order.shippingAddress?.street && (
                <p style={{ fontSize: 11, color: C.muted }}>{order.shippingAddress.street}</p>
              )}
              <p style={{ fontSize: 11, color: C.muted }}>
                {[order.shippingAddress?.city, order.shippingAddress?.state].filter(Boolean).join(", ")}
              </p>
              {order.shippingAddress?.country && (
                <p style={{ fontSize: 11, color: C.muted }}>{order.shippingAddress.country}</p>
              )}
            </div>
          </Section>

          {/* Payment */}
          <Section>
            <Ol>Payment</Ol>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: C.muted, textTransform: "capitalize" }}>
                  {order.paymentInfo?.method?.replaceAll("_", " ") || "—"}
                </span>
                <PaymentChip status={payStatus} />
              </div>
              {order.paymentInfo?.paystackReference && (
                <div style={{ padding: "8px 10px", background: C.surface, borderRadius: C.radMd }}>
                  <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: C.faint, marginBottom: 5 }}>Paystack reference</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontSize: 10, fontFamily: C.mono, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {order.paymentInfo.paystackReference}
                    </span>
                    <CopyButton value={order.paymentInfo.paystackReference} />
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* Order summary */}
          <Section>
            <Ol>Order summary</Ol>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Row label="Items">{order.totalItems}</Row>
              <Row label="Subtotal"><Price amount={order.totalPrice} /></Row>
              {order.shippingPrice > 0 && <Row label="Shipping"><Price amount={order.shippingPrice} /></Row>}
              {discount > 0 && (
                <Row label="Discount">
                  <span style={{ color: "#3B6D11" }}>−<Price amount={discount} /></span>
                </Row>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, marginTop: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Total</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}><Price amount={order.finalPrice} /></span>
              </div>
            </div>
          </Section>

          {/* Inventory flag */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 12px", background: order.inventoryCommitted ? "#EAF3DE" : C.surface, borderRadius: C.radMd, border: `0.5px solid ${order.inventoryCommitted ? "#3B6D11" : C.border}` }}>
            <Icon n={order.inventoryCommitted ? "package-check" : "package"} size={13} style={{ color: order.inventoryCommitted ? "#3B6D11" : C.faint }} />
            <p style={{ fontSize: 11, color: order.inventoryCommitted ? "#3B6D11" : C.muted, fontWeight: 500 }}>
              Inventory {order.inventoryCommitted ? "committed" : "not committed"}
            </p>
          </div>
        </div>
      </div>

      {/* ══ Status update modal ══ */}
      {statusModal && (
        <Modal
          title="Update order status"
          subtitle={`Order #${order._id.slice(-8).toUpperCase()} · ${order.user?.fullName || "Unknown"}`}
          onClose={() => setStatusModal(false)}
          footer={<>
            <button onClick={() => setStatusModal(false)} style={btnBase}>Cancel</button>
            <button
              onClick={handleStatusUpdate}
              disabled={saving || selectedStatus === order.orderStatus}
              style={{ ...btnPrimary, opacity: (saving || selectedStatus === order.orderStatus) ? .5 : 1 }}
            >
              {saving ? "Saving…" : "Update status"}
            </button>
          </>}
        >
          {/* Summary strip */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16, padding: "10px 12px", background: C.surface, borderRadius: C.radMd }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 10, color: C.faint, marginBottom: 2 }}>Amount</p>
              <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}><Price amount={order.finalPrice} /></p>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 10, color: C.faint, marginBottom: 2 }}>Current</p>
              <StatusChip status={order.orderStatus} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 10, color: C.faint, marginBottom: 2 }}>Items</p>
              <p style={{ fontSize: 11, color: C.text }}>{order.totalItems}</p>
            </div>
          </div>

          {/* Status card picker */}
          <Ol mb={8}>Select new status</Ol>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
            {STATUS_OPTIONS.map(s => {
              const sty = STATUS_BADGE[s] || { bg: C.surface, color: C.muted }
              const active = selectedStatus === s
              return (
                <button key={s} onClick={() => setSelectedStatus(s)} style={{ padding: "10px 12px", borderRadius: C.radMd, cursor: "pointer", border: `1.5px solid ${active ? sty.color : C.border}`, background: active ? sty.bg : C.bg, color: active ? sty.color : C.muted, fontSize: 11, fontWeight: active ? 600 : 400, textTransform: "capitalize", textAlign: "left", display: "flex", alignItems: "center", gap: 7, transition: "all .1s" }}>
                  {active && <Icon n="check" size={12} style={{ color: sty.color }} />}
                  {s}
                </button>
              )
            })}
          </div>

          {/* Note */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: C.faint, marginBottom: 5 }}>Note (optional)</p>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="Reason for status change, tracking number, etc." style={{ width: "100%", fontSize: 12, padding: "7px 10px", borderRadius: C.radMd, border: `0.5px solid ${C.borderMd}`, background: C.bg, color: C.text, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          </div>
        </Modal>
      )}
    </div>
  )
}