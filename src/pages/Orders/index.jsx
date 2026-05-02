import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ordersApi } from "../../api/services"
import { LoadingPage, EmptyState, Badge, Price } from "../../components/ui"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ordersApi.getMyOrders()
      .then(res => setOrders(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingPage />

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">Account</span>
          <h1 className="headline-lg text-4xl text-on-surface">My Orders</h1>
        </div>
      </div>

      <div className="container-main py-10">
        {orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            description="Your order history will appear here once you make a purchase."
            action={<Link to="/products" className="btn-primary mt-2">Start Shopping</Link>}
          />
        ) : (
          <div className="space-y-3">
            {orders.map(order => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="block bg-surface-container-low rounded-md p-6 ghost-border hover:bg-surface-container transition-colors duration-200 group"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
                  <div>
                    <span className="label-overline text-secondary block mb-1">Order #{order._id.slice(-8).toUpperCase()}</span>
                    <p className="font-body text-xs text-secondary">
                      {new Date(order.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge status={order.orderStatus} />
                    <Badge status={order.paymentInfo?.status} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {order.items?.slice(0, 5).map((item, i) => (
                      <div key={i} className="w-10 h-10 rounded-sm border-2 border-surface bg-surface-container overflow-hidden">
                        {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                      </div>
                    ))}
                    {order.items?.length > 5 && (
                      <div className="w-10 h-10 rounded-sm border-2 border-surface bg-surface-container-high flex items-center justify-center">
                        <span className="font-label text-[9px] text-secondary">+{order.items.length - 5}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <Price amount={order.finalPrice} className="text-sm text-on-surface" />
                    <span className="label-overline text-outline group-hover:text-tertiary transition-colors">View</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
