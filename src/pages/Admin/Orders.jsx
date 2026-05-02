import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { ordersApi } from "../../api/services"
import { LoadingPage, Badge, Price, Pagination } from "../../components/ui"

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"]

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("")

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

  useEffect(() => {
    fetchOrders()
  }, [page, statusFilter])

  const updateStatus = async (orderId, status) => {
    try {
      await ordersApi.updateStatus(orderId, { status })
      toast.success("Updated")
      fetchOrders()
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed")
    }
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-10">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/admin" className="label-overline text-secondary hover:text-on-surface transition-colors">&larr; Dashboard</Link>
          </div>
          <h1 className="headline-lg text-4xl text-on-surface">Orders</h1>
        </div>
      </div>

      <div className="container-main py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {["", ...STATUS_OPTIONS].map(status => (
            <button
              key={status || "all"}
              onClick={() => {
                setStatusFilter(status)
                setPage(1)
              }}
              className={`font-label text-[10px] uppercase tracking-wider px-4 py-2 rounded-sm transition-colors ${
                status === statusFilter ? "bg-on-surface text-inverse-on-surface" : "bg-surface-container-low text-secondary hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              {status || "All"}
            </button>
          ))}
        </div>

        {loading ? <LoadingPage /> : (
          <>
            <div className="bg-surface-container-low rounded-md ghost-border divide-y divide-outline-variant/10 mb-8">
              {orders.length === 0 && <p className="font-body text-sm text-secondary p-6">No orders found.</p>}
              {orders.map(order => (
                <div key={order._id} className="flex items-center gap-4 px-6 py-4 flex-wrap hover:bg-surface-container transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-headline font-bold text-xs text-on-surface">#{order._id.slice(-8).toUpperCase()}</p>
                    <p className="font-label text-[10px] text-secondary uppercase tracking-wider">{order.user?.fullName} - {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Badge status={order.paymentInfo?.status} />
                  <select value={order.orderStatus} onChange={e => updateStatus(order._id, e.target.value)} className="input-field w-auto py-1.5 text-xs font-label uppercase tracking-wider">
                    {STATUS_OPTIONS.map(status => <option key={status} value={status}>{status}</option>)}
                  </select>
                  <Price amount={order.finalPrice} className="text-sm text-on-surface" />
                  <Link to={`/admin/orders/${order._id}`} className="label-overline text-secondary hover:text-on-surface transition-colors">View</Link>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Pagination page={page} pages={pages} onPageChange={setPage} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
