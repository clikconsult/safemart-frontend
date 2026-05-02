import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ordersApi } from "../../api/services"
import { LoadingPage, Badge, Price } from "../../components/ui"
import toast from "react-hot-toast"

const STATUS_STEPS = ["pending", "processing", "shipped", "delivered"]
const ORDER_DATE_FORMAT = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
}

export default function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)

  useEffect(() => {
    ordersApi.getById(id)
      .then(res => setOrder(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const handleCancel = async () => {
    if (!window.confirm("Cancel this order?")) return

    try {
      setCancelling(true)
      const res = await ordersApi.cancel(id, "Customer requested cancellation")
      setOrder(res.data.data)
      toast.success("Order cancelled")
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel")
    } finally {
      setCancelling(false)
    }
  }

  if (loading) return <LoadingPage />
  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="font-body text-secondary">Order not found.</p>
        <Link to="/orders" className="btn-primary">Back to Orders</Link>
      </div>
    )
  }

  const stepIndex = STATUS_STEPS.indexOf(order.orderStatus)
  const isCancelled = order.orderStatus === "cancelled"
  const canCancel = ["pending", "processing"].includes(order.orderStatus)

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-10">
          <Link to="/orders" className="label-overline text-secondary hover:text-on-surface transition-colors block mb-4">&larr; Back to Orders</Link>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <span className="label-overline text-tertiary block mb-2">Order #{order._id.slice(-8).toUpperCase()}</span>
              <h1 className="headline-lg text-3xl text-on-surface">Order Details</h1>
              <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-1">
                {new Date(order.createdAt).toLocaleString("en-NG", ORDER_DATE_FORMAT)}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge status={order.orderStatus} />
              <Badge status={order.paymentInfo?.status} />
              {canCancel && (
                <button onClick={handleCancel} disabled={cancelling} className="label-overline text-error hover:text-on-surface transition-colors">
                  {cancelling ? "Cancelling..." : "Cancel Order"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-10">
        {!isCancelled && (
          <div className="glass-card rounded-[1.5rem] p-6 ghost-border mb-8 overflow-hidden relative">
            <div className="absolute -top-10 right-0 w-40 h-40 rounded-full bg-tertiary/10 blur-3xl anim-float" />
            <p className="label-overline mb-7">Order Progress</p>
            <div className="flex items-center">
              {STATUS_STEPS.map((status, i) => (
                <div key={status} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 flex items-center justify-center text-[10px] font-headline font-bold rounded-sm transition-all ${
                        i < stepIndex
                          ? "bg-on-surface text-inverse-on-surface"
                          : i === stepIndex
                            ? "bg-tertiary-container text-on-tertiary-container shadow-ambient anim-glow"
                            : "bg-surface-container-high text-secondary"
                      }`}
                    >
                      {i < stepIndex ? "\u2713" : i + 1}
                    </div>
                    <span className={`font-label text-[9px] mt-2 capitalize uppercase tracking-wider ${i <= stepIndex ? "text-on-surface" : "text-secondary/50"}`}>
                      {status}
                    </span>
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div className={`flex-1 h-px mx-3 mb-4 transition-colors ${i < stepIndex ? "bg-on-surface" : "bg-outline-variant/30"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="glass-card rounded-[1.5rem] ghost-border divide-y divide-outline-variant/10 overflow-hidden">
              {order.items?.map((item, i) => (
                <div key={i} className="flex gap-4 p-5">
                  <Link to={`/products/${item.product?._id || ""}`} className="w-16 h-16 bg-surface-container rounded-md overflow-hidden shrink-0 hover:opacity-80 transition-opacity">
                    {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="font-headline font-bold text-sm text-on-surface line-clamp-1">{item.name}</p>
                    <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <Price amount={item.subtotal ?? item.price * item.quantity} className="text-sm text-on-surface shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
              <div className="glass-card rounded-[1.5rem] p-5 ghost-border">
                <p className="label-overline mb-4">Summary</p>
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="font-body text-secondary">Subtotal</span>
                  <Price amount={order.totalPrice} className="text-sm text-on-surface" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-body text-secondary">Shipping</span>
                  {order.shippingPrice === 0
                    ? <span className="font-label text-[10px] uppercase tracking-wider text-on-surface font-bold">Free</span>
                    : <Price amount={order.shippingPrice} className="text-sm text-on-surface" />}
                </div>
                <div className="flex justify-between font-bold pt-2.5 border-t border-outline-variant/20">
                  <span className="font-headline text-sm text-on-surface">Total</span>
                  <Price amount={order.finalPrice} className="text-sm text-on-surface" />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-[1.5rem] p-5 ghost-border">
              <p className="label-overline mb-3">Shipping To</p>
              <div className="font-body text-sm text-secondary space-y-0.5">
                <p>{order.shippingAddress?.fullName}</p>
                <p>{order.shippingAddress?.phone}</p>
                <p>{order.shippingAddress?.street}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                <p>{order.shippingAddress?.country}</p>
              </div>
            </div>

            <div className="glass-card rounded-[1.5rem] p-5 ghost-border">
              <p className="label-overline mb-3">Payment</p>
              <p className="font-body text-sm text-on-surface capitalize">{order.paymentInfo?.method?.replaceAll("_", " ")}</p>
              {order.paymentInfo?.paystackReference && (
                <p className="font-label text-[9px] text-secondary mt-1.5 break-all uppercase tracking-wider">{order.paymentInfo.paystackReference}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
