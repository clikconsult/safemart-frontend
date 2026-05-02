import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import { ordersApi } from "../../api/services"
import { LoadingPage, Badge, Price } from "../../components/ui"

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"]
const DATE_FORMAT = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
}

export default function AdminOrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("")
  const [note, setNote] = useState("")

  const fetchOrder = async () => {
    setLoading(true)

    try {
      const res = await ordersApi.getById(id)
      const nextOrder = res.data.data
      setOrder(nextOrder)
      setSelectedStatus(nextOrder.orderStatus)
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load order")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [id])

  const handleStatusUpdate = async () => {
    try {
      setSaving(true)
      const res = await ordersApi.updateStatus(id, {
        status: selectedStatus,
        note: note.trim(),
      })
      setOrder(res.data.data)
      setNote("")
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="font-body text-secondary">Order not found.</p>
        <Link to="/admin/orders" className="btn-primary">Back to Orders</Link>
      </div>
    )
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-10">
          <Link to="/admin/orders" className="label-overline text-secondary hover:text-on-surface transition-colors block mb-4">&larr; Back to Orders</Link>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <span className="label-overline text-tertiary block mb-2">Admin Order View</span>
              <h1 className="headline-lg text-3xl text-on-surface">Order #{order._id.slice(-8).toUpperCase()}</h1>
              <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-2">
                Created {new Date(order.createdAt).toLocaleString("en-NG", DATE_FORMAT)}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge status={order.orderStatus} />
              <Badge status={order.paymentInfo?.status} />
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-surface-container-low rounded-md ghost-border divide-y divide-outline-variant/10">
              <div className="p-5">
                <p className="label-overline mb-2">Processing Controls</p>
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,180px)_1fr_auto] gap-3 items-start">
                  <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="input-field">
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="input-field resize-none"
                    placeholder="Add an internal processing note"
                  />
                  <button
                    onClick={handleStatusUpdate}
                    disabled={saving || selectedStatus === order.orderStatus}
                    className="btn-primary px-6 py-3"
                  >
                    {saving ? "Updating..." : "Update"}
                  </button>
                </div>
                <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-3">
                  Inventory committed: {order.inventoryCommitted ? "yes" : "no"}
                </p>
              </div>

              {order.items?.map((item, index) => (
                <div key={`${item.product?._id || item.name}-${index}`} className="flex gap-4 p-5">
                  <div className="w-16 h-16 bg-surface-container rounded-md overflow-hidden shrink-0">
                    {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-headline font-bold text-sm text-on-surface line-clamp-1">{item.name}</p>
                    <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-0.5">Qty: {item.quantity}</p>
                    {item.product?._id && (
                      <Link to={`/products/${item.product._id}`} className="label-overline text-secondary hover:text-on-surface transition-colors inline-block mt-2">
                        View product
                      </Link>
                    )}
                  </div>
                  <Price amount={item.subtotal ?? item.price * item.quantity} className="text-sm text-on-surface shrink-0" />
                </div>
              ))}
            </div>

            <div className="bg-surface-container-low rounded-md p-5 ghost-border">
              <p className="label-overline mb-4">Status History</p>
              <div className="space-y-4">
                {[...(order.statusHistory || [])].slice().reverse().map((entry, index) => (
                  <div key={`${entry.status}-${entry.changedAt}-${index}`} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-on-surface mt-2 shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge status={entry.status} />
                        <span className="font-label text-[10px] text-secondary uppercase tracking-wider">
                          {new Date(entry.changedAt).toLocaleString("en-NG", DATE_FORMAT)}
                        </span>
                      </div>
                      {entry.note && <p className="font-body text-sm text-secondary mt-2">{entry.note}</p>}
                    </div>
                  </div>
                ))}
                {(!order.statusHistory || order.statusHistory.length === 0) && (
                  <p className="font-body text-sm text-secondary">No status history yet.</p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-surface-container-low rounded-md p-5 ghost-border">
              <p className="label-overline mb-4">Customer</p>
              <div className="space-y-2 text-sm">
                <p className="font-headline font-bold text-on-surface">{order.user?.fullName || "Unknown customer"}</p>
                <p className="font-body text-secondary">{order.user?.email || "No email"}</p>
                <p className="font-body text-secondary">{order.user?.phone || "No phone"}</p>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-md p-5 ghost-border">
              <p className="label-overline mb-4">Shipping Address</p>
              <div className="font-body text-sm text-secondary space-y-1">
                <p>{order.shippingAddress?.fullName}</p>
                <p>{order.shippingAddress?.phone}</p>
                <p>{order.shippingAddress?.street}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                <p>{order.shippingAddress?.country}</p>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-md p-5 ghost-border">
              <p className="label-overline mb-4">Payment</p>
              <div className="space-y-2 text-sm">
                <p className="font-body text-on-surface capitalize">{order.paymentInfo?.method?.replaceAll("_", " ")}</p>
                <Badge status={order.paymentInfo?.status} />
                {order.paymentInfo?.paystackReference && (
                  <p className="font-label text-[10px] text-secondary uppercase tracking-wider break-all">
                    Ref: {order.paymentInfo.paystackReference}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-surface-container-low rounded-md p-5 ghost-border">
              <p className="label-overline mb-4">Order Summary</p>
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="font-body text-secondary">Items</span>
                  <span className="font-body text-on-surface">{order.totalItems}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-body text-secondary">Subtotal</span>
                  <Price amount={order.totalPrice} className="text-sm text-on-surface" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-body text-secondary">Shipping</span>
                  <Price amount={order.shippingPrice} className="text-sm text-on-surface" />
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-outline-variant/20">
                  <span className="font-headline text-sm text-on-surface">Total</span>
                  <Price amount={order.finalPrice} className="text-sm text-on-surface" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
