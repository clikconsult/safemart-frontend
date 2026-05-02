import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { adminApi, ordersApi } from "../../api/services"
import { LoadingPage, Price, Badge } from "../../components/ui"

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([adminApi.getAnalytics(), ordersApi.getAll({ limit: 6, sort: "-createdAt" })])
      .then(([analyticsRes, ordersRes]) => {
        setAnalytics(analyticsRes.data.data)
        setRecentOrders(ordersRes.data.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingPage />

  const monthlyRevenue = analytics?.monthlyRevenue || []
  const ordersByStatus = analytics?.ordersByStatus || []
  const topProducts = analytics?.topProducts || []
  const allTimeRevenue = analytics?.overview?.totalRevenue || 0
  const lastSixMonthsRevenue = monthlyRevenue.reduce((sum, entry) => sum + (entry.revenue || 0), 0)
  const olderRevenue = Math.max(0, allTimeRevenue - lastSixMonthsRevenue)
  const paidOrders = analytics?.overview?.totalOrders || 0
  const lastSixMonthsOrders = monthlyRevenue.reduce((sum, entry) => sum + (entry.orders || 0), 0)
  const statusMap = Object.fromEntries(ordersByStatus.map(entry => [entry._id, entry.count]))
  const deliveredOrders = statusMap.delivered || 0
  const cancelledOrders = statusMap.cancelled || 0
  const processingOrders = statusMap.processing || 0
  const pendingOrders = statusMap.pending || 0
  const shippedOrders = statusMap.shipped || 0
  const averageOrderValue = paidOrders > 0 ? allTimeRevenue / paidOrders : 0
  const deliveryConversion = paidOrders > 0 ? (deliveredOrders / paidOrders) * 100 : 0
  const cancellationRate = paidOrders > 0 ? (cancelledOrders / paidOrders) * 100 : 0
  const monthLabel = (entry) => {
    const date = new Date(entry._id.year, entry._id.month - 1, 1)
    return date.toLocaleString("en-NG", { month: "short" })
  }

  const stats = [
    { label: "Total Revenue", value: <Price amount={analytics?.overview?.totalRevenue || 0} className="text-3xl text-on-surface" />, sub: "All time" },
    { label: "Total Orders", value: <span className="font-headline font-black text-3xl text-on-surface">{analytics?.overview?.totalOrders || 0}</span>, sub: "Paid orders" },
    { label: "Total Users", value: <span className="font-headline font-black text-3xl text-on-surface">{analytics?.overview?.totalUsers || 0}</span>, sub: "Registered" },
    { label: "Total Products", value: <span className="font-headline font-black text-3xl text-on-surface">{analytics?.overview?.totalProducts || 0}</span>, sub: "Active catalogue" },
  ]

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-10">
          <span className="label-overline text-tertiary mb-3 block">Admin</span>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h1 className="headline-lg text-4xl text-on-surface">Dashboard</h1>
            <div className="flex flex-wrap gap-3">
              {[["Products", "/admin/products"], ["Orders", "/admin/orders"], ["Users", "/admin/users"]].map(([label, to]) => (
                <Link key={to} to={to} className="btn-secondary py-2 text-xs">{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(stat => (
            <div key={stat.label} className="glass-panel rounded-md p-6 ghost-border overflow-hidden">
              {stat.value}
              <p className="font-headline font-bold text-sm text-on-surface mt-1">{stat.label}</p>
              <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="glass-panel rounded-md p-6 ghost-border overflow-hidden">
            <p className="label-overline mb-3">Revenue Analysis</p>
            <p className="font-headline font-black text-2xl text-on-surface mb-1">
              <Price amount={lastSixMonthsRevenue} className="text-2xl text-on-surface" />
            </p>
            <p className="font-body text-sm text-secondary">Paid revenue recorded in the last 6 months.</p>
            <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-4">
              Older paid revenue outside this chart: &#8358;{olderRevenue.toLocaleString("en-NG")}
            </p>
          </div>

          <div className="glass-panel rounded-md p-6 ghost-border overflow-hidden">
            <p className="label-overline mb-3">Order Analysis</p>
            <p className="font-headline font-black text-2xl text-on-surface mb-1">{lastSixMonthsOrders}</p>
            <p className="font-body text-sm text-secondary">Paid orders represented in the 6-month revenue window.</p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                ["pending", pendingOrders],
                ["processing", processingOrders],
                ["shipped", shippedOrders],
              ].map(([label, value]) => (
                <div key={label} className="glass-chip rounded-sm p-3">
                  <p className="font-headline font-bold text-sm text-on-surface">{value}</p>
                  <p className="font-label text-[9px] text-secondary uppercase tracking-wider mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-md p-6 ghost-border overflow-hidden">
            <p className="label-overline mb-3">Top Product</p>
            {topProducts[0] ? (
              <>
                <p className="font-headline font-bold text-lg text-on-surface line-clamp-2">{topProducts[0].name}</p>
                <p className="font-body text-sm text-secondary mt-2">{topProducts[0].category}</p>
                <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-4">
                  Units sold: {topProducts[0].sold}
                </p>
              </>
            ) : (
              <p className="font-body text-sm text-secondary">No product sales data yet.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="glass-panel rounded-md p-6 ghost-border overflow-hidden">
            <p className="label-overline mb-3">Average Order Value</p>
            <Price amount={averageOrderValue} className="text-2xl text-on-surface" />
            <p className="font-body text-sm text-secondary mt-2">Average value across all paid orders.</p>
          </div>

          <div className="glass-panel rounded-md p-6 ghost-border overflow-hidden">
            <p className="label-overline mb-3">Delivery Conversion</p>
            <p className="font-headline font-black text-2xl text-on-surface">{deliveryConversion.toFixed(1)}%</p>
            <p className="font-body text-sm text-secondary mt-2">Delivered orders as a share of paid orders.</p>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="glass-chip rounded-sm p-3">
                <p className="font-headline font-bold text-sm text-on-surface">{deliveredOrders}</p>
                <p className="font-label text-[9px] text-secondary uppercase tracking-wider mt-1">Delivered</p>
              </div>
              <div className="glass-chip rounded-sm p-3">
                <p className="font-headline font-bold text-sm text-on-surface">{paidOrders}</p>
                <p className="font-label text-[9px] text-secondary uppercase tracking-wider mt-1">Paid orders</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-md p-6 ghost-border overflow-hidden">
            <p className="label-overline mb-3">Cancellation Signal</p>
            <p className="font-headline font-black text-2xl text-on-surface">{cancellationRate.toFixed(1)}%</p>
            <p className="font-body text-sm text-secondary mt-2">Cancelled orders as a share of paid orders.</p>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="glass-chip rounded-sm p-3">
                <p className="font-headline font-bold text-sm text-on-surface">{cancelledOrders}</p>
                <p className="font-label text-[9px] text-secondary uppercase tracking-wider mt-1">Cancelled</p>
              </div>
              <div className="glass-chip rounded-sm p-3">
                <p className="font-headline font-bold text-sm text-on-surface">{shippedOrders}</p>
                <p className="font-label text-[9px] text-secondary uppercase tracking-wider mt-1">Shipped</p>
              </div>
            </div>
          </div>
        </div>

        {monthlyRevenue.length > 0 && (
          <div className="glass-panel rounded-md p-7 ghost-border overflow-hidden mb-8">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
              <div>
                <p className="label-overline">Monthly Revenue</p>
                <p className="font-body text-sm text-secondary mt-2">This chart covers paid revenue from the last 6 months, not all-time totals.</p>
              </div>
              <div className="text-right">
                <p className="font-headline font-bold text-sm text-on-surface">&#8358;{lastSixMonthsRevenue.toLocaleString("en-NG")}</p>
                <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-1">Last 6 months</p>
              </div>
            </div>
            <div className="flex items-end gap-2 h-28">
              {monthlyRevenue.map((month, i) => {
                const max = Math.max(...monthlyRevenue.map(entry => entry.revenue), 1)
                const height = Math.max(2, (month.revenue / max) * 100)

                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full bg-on-surface rounded-sm transition-all duration-700" style={{ height: `${height}%` }} />
                    <span className="font-label text-[9px] text-secondary uppercase">{monthLabel(month)}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="glass-panel rounded-md ghost-border overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-outline-variant/20">
            <p className="label-overline">Recent Orders</p>
            <Link to="/admin/orders" className="label-overline text-secondary hover:text-on-surface transition-colors">View all</Link>
          </div>
          <div className="divide-y divide-outline-variant/10">
            {recentOrders.length === 0 && <p className="font-body text-sm text-secondary p-6">No orders yet.</p>}
            {recentOrders.map(order => (
              <div key={order._id} className="flex items-center gap-4 px-6 py-4 hover:bg-surface-container transition-colors flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="font-headline font-bold text-xs text-on-surface">#{order._id.slice(-8).toUpperCase()}</p>
                  <p className="font-label text-[10px] text-secondary uppercase tracking-wider">{order.user?.fullName || "Unknown"}</p>
                </div>
                <Badge status={order.orderStatus} />
                <Price amount={order.finalPrice} className="text-sm text-on-surface" />
                <Link to={`/admin/orders/${order._id}`} className="label-overline text-secondary hover:text-on-surface transition-colors">View</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
