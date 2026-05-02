import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { Price, EmptyState } from "../../components/ui"

export default function Cart() {
  const { cart, updateItem, removeItem, clearCart } = useCart()
  const navigate = useNavigate()
  const [clearing, setClearing] = useState(false)

  const subtotal = cart?.totalPrice || 0
  const shipping = subtotal >= 50000 ? 0 : 2500
  const total = subtotal + shipping
  const progress = Math.min(100, (subtotal / 50000) * 100)

  const handleUpdate = async (id, qty) => {
    try {
      await updateItem(id, qty)
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update")
    }
  }

  const handleRemove = async (id) => {
    try {
      await removeItem(id)
    } catch {
      toast.error("Failed to remove")
    }
  }

  const handleClear = async () => {
    try {
      setClearing(true)
      await clearCart()
    } catch {
      toast.error("Failed")
    } finally {
      setClearing(false)
    }
  }

  if (!cart?.items?.length) {
    return (
      <div className="bg-surface min-h-screen">
        <div className="container-main py-20">
          <EmptyState
            icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>}
            title="Your cart is empty"
            description="Browse our security systems and add items to your cart."
            action={<Link to="/products" className="btn-primary mt-2">Browse Products</Link>}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">Your</span>
          <div className="flex items-end justify-between">
            <h1 className="headline-lg text-4xl text-on-surface">Cart <span className="font-body font-normal text-lg text-secondary">({cart.totalItems})</span></h1>
            <button onClick={handleClear} disabled={clearing} className="label-overline text-secondary hover:text-error transition-colors">
              {clearing ? "Clearing..." : "Clear all"}
            </button>
          </div>
        </div>
      </div>

      <div className="container-main py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 divide-y divide-outline-variant/15">
            {cart.items.map(item => (
              <div key={item._id} className="flex gap-5 py-7">
                <Link to={`/products/${item.product?._id}`} className="w-24 h-24 bg-surface-container-low rounded-md overflow-hidden shrink-0 ghost-border">
                  {item.product?.images?.[0]
                    ? <img src={item.product.images[0]} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    : <div className="w-full h-full" />}
                </Link>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <span className="label-overline text-tertiary block mb-1">{item.product?.category}</span>
                    <Link to={`/products/${item.product?._id}`} className="font-headline font-bold text-base text-on-surface hover:text-primary-fixed transition-colors line-clamp-2 leading-snug">
                      {item.product?.name}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center bg-surface-container-high rounded-sm">
                      <button
                        onClick={() => item.quantity > 1 ? handleUpdate(item.product?._id, item.quantity - 1) : handleRemove(item.product?._id)}
                        className="w-8 h-9 flex items-center justify-center text-secondary hover:text-on-surface transition-colors text-sm"
                      >
                        -
                      </button>
                      <span className="w-7 text-center font-label font-bold text-xs">{item.quantity}</span>
                      <button onClick={() => handleUpdate(item.product?._id, item.quantity + 1)} className="w-8 h-9 flex items-center justify-center text-secondary hover:text-on-surface transition-colors text-sm">+</button>
                    </div>
                    <div className="flex items-center gap-4">
                      <Price amount={item.totalPrice} className="text-sm text-on-surface" />
                      <button onClick={() => handleRemove(item.product?._id)} className="text-outline-variant hover:text-error transition-colors">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="bg-surface-container-low rounded-md p-6 ghost-border sticky top-28">
              <h2 className="headline-md text-lg text-on-surface mb-6">Summary</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="font-body text-secondary">Subtotal</span>
                  <Price amount={subtotal} className="text-sm text-on-surface" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-body text-secondary">Shipping</span>
                  {shipping === 0
                    ? <span className="font-label font-semibold text-xs text-on-surface uppercase tracking-wider">Free</span>
                    : <Price amount={shipping} className="text-sm text-on-surface" />}
                </div>
              </div>

              {subtotal < 50000 && (
                <div className="mb-5">
                  <p className="font-label text-[10px] text-secondary uppercase tracking-wider mb-2">
                    Add <span className="text-on-surface font-bold">&#8358;{(50000 - subtotal).toLocaleString()}</span> for free shipping
                  </p>
                  <div className="h-0.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-on-surface rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <div className="border-t border-outline-variant/20 pt-4 mb-6 flex justify-between">
                <span className="font-headline font-bold text-sm text-on-surface">Total</span>
                <Price amount={total} className="text-base text-on-surface" />
              </div>

              <button onClick={() => navigate("/checkout")} className="btn-primary w-full mb-3">
                Proceed to Checkout
              </button>
              <Link to="/products" className="block text-center label-overline text-secondary hover:text-on-surface transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
