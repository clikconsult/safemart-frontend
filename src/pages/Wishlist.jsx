import { Link } from "react-router-dom"
import { useState } from "react"
import toast from "react-hot-toast"
import { useWishlist } from "../hooks/useWishlist"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { Price, Stars, EmptyState } from "../components/ui"

export default function Wishlist() {
  const { items, toggle } = useWishlist()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [adding, setAdding] = useState(null)

  const handleAdd = async (product) => {
    if (!user) {
      toast.error("Sign in to add to cart")
      return
    }

    try {
      setAdding(product._id)
      await addToCart(product._id, 1)
      toast.success("Added to cart")
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add")
    } finally {
      setAdding(null)
    }
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">Saved</span>
          <h1 className="headline-lg text-4xl text-on-surface">
            Wishlist {items.length > 0 && <span className="font-body font-normal text-lg text-secondary ml-2">({items.length})</span>}
          </h1>
        </div>
      </div>

      <div className="container-main py-10">
        {items.length === 0 ? (
          <EmptyState
            icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>}
            title="Your wishlist is empty"
            description="Save products you love and find them here later."
            action={<Link to="/products" className="btn-primary mt-2">Browse Products</Link>}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {items.map((product, idx) => {
              const hasDiscount = product.discountPrice > 0
              const displayPrice = hasDiscount ? product.discountPrice : product.price

              return (
                <div key={product._id} className="group anim-fade-up" style={{ animationDelay: `${idx * 0.07}s` }}>
                  <div className="relative aspect-[3/4] bg-surface-container-low rounded-md overflow-hidden mb-4 ghost-border">
                    <Link to={`/products/${product._id}`}>
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-outline-variant">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                      )}
                    </Link>

                    <button
                      onClick={() => {
                        toggle(product)
                        toast.success("Removed from wishlist")
                      }}
                      className="absolute top-3 right-3 w-8 h-8 bg-surface-container-lowest/90 backdrop-blur-sm text-tertiary flex items-center justify-center rounded-sm hover:bg-error-container hover:text-error transition-all opacity-0 group-hover:opacity-100"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button
                        onClick={() => handleAdd(product)}
                        disabled={adding === product._id}
                        className="w-full bg-primary/90 backdrop-blur-sm text-on-primary font-headline font-bold text-[10px] tracking-[0.2em] uppercase py-3.5 hover:bg-primary transition-colors"
                      >
                        {adding === product._id ? "Adding..." : "Add to Cart"}
                      </button>
                    </div>
                  </div>

                  <div className="px-1">
                    <span className="label-overline text-tertiary block mb-1.5">{product.category}</span>
                    <Link to={`/products/${product._id}`} className="font-headline font-bold text-base text-on-surface leading-snug line-clamp-2 hover:text-primary-fixed transition-colors block mb-2.5">
                      {product.name}
                    </Link>
                    {product.numReviews > 0 && <div className="mb-2"><Stars rating={product.ratings} count={product.numReviews} /></div>}
                    <div className="flex items-center gap-2">
                      <Price amount={displayPrice} className="text-sm text-on-surface" />
                      {hasDiscount && <Price amount={product.price} className="text-xs text-secondary line-through opacity-60" />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
