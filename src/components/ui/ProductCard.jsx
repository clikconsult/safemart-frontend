import { useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { Price, Stars } from "./index"
import { useCart } from "../../context/CartContext"
import { useAuth } from "../../context/AuthContext"
import { useWishlist } from "../../hooks/useWishlist"

export default function ProductCard({ product, index = 0 }) {
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const [adding, setAdding] = useState(false)
  const wishlisted = isWishlisted(product._id)

  const handleAdd = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (!user) {
      toast.error("Sign in to add to cart")
      return
    }

    try {
      setAdding(true)
      await addToCart(product._id, 1)
      toast.success("Added to cart")
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add")
    } finally {
      setAdding(false)
    }
  }

  const handleWishlist = (event) => {
    event.preventDefault()
    event.stopPropagation()
    toggle(product)
    toast.success(wishlisted ? "Removed from wishlist" : "Saved to wishlist")
  }

  const hasDiscount = product.discountPrice > 0
  const displayPrice = hasDiscount ? product.discountPrice : product.price
  const discountPercent = hasDiscount ? Math.round((1 - product.discountPrice / product.price) * 100) : 0

  return (
    <Link to={`/products/${product._id}`} className="group block anim-fade-up" style={{ animationDelay: `${index * 0.07}s` }}>
      <div className="product-card relative aspect-[3/4] rounded-[1.25rem] overflow-hidden mb-4">
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-outline-variant">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.stock === 0 && <span className="status-badge bg-on-surface text-inverse-on-surface">Sold Out</span>}
          {hasDiscount && <span className="status-badge bg-tertiary-container text-on-tertiary-container">-{discountPercent}%</span>}
          {product.isFeatured && <span className="status-badge bg-white/80 text-on-surface backdrop-blur-md">Featured</span>}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleWishlist}
            className={`w-9 h-9 flex items-center justify-center rounded-sm backdrop-blur-md transition-all ${
              wishlisted ? "bg-tertiary text-on-tertiary shadow-ambient" : "bg-white/75 text-on-surface hover:bg-tertiary hover:text-on-tertiary"
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {product.stock > 0 && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button onClick={handleAdd} disabled={adding} className="w-full bg-primary/85 backdrop-blur-md text-on-primary font-headline font-bold text-[10px] tracking-[0.2em] uppercase py-3.5 hover:bg-primary transition-colors">
              {adding ? "Adding..." : "Quick Add"}
            </button>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-primary/16 via-transparent to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      <div className="px-1">
        <p className="label-overline text-tertiary mb-1.5">{product.category}</p>
        <h3 className="font-headline font-bold text-base text-on-surface leading-snug line-clamp-2 mb-2.5 group-hover:text-primary-fixed transition-colors duration-200">
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="font-label text-[10px] uppercase tracking-[0.22em] text-secondary">
            {product.brand || "Safemart Select"}
          </p>
          <p className={`font-label text-[10px] uppercase tracking-[0.2em] ${product.stock > 0 ? "text-secondary" : "text-error"}`}>
            {product.stock > 0 ? `${product.stock} in stock` : "Unavailable"}
          </p>
        </div>
        {product.numReviews > 0 && <div className="mb-2.5"><Stars rating={product.ratings} count={product.numReviews} /></div>}
        <div className="flex items-center gap-2.5">
          <Price amount={displayPrice} className="text-sm text-on-surface" />
          {hasDiscount && <Price amount={product.price} className="text-xs text-secondary line-through opacity-60" />}
        </div>
      </div>
    </Link>
  )
}
