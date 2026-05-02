import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams, Link } from "react-router-dom"
import { productsApi } from "../../api/services"
import { useCart } from "../../context/CartContext"
import { useAuth } from "../../context/AuthContext"
import { useWishlist } from "../../hooks/useWishlist"
import { useRecentlyViewed } from "../../hooks/useRecentlyViewed"
import { LoadingPage, Stars, Price, Spinner } from "../../components/ui"
import ProductCard from "../../components/ui/ProductCard"

export default function ProductDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const { add: addRecent } = useRecentlyViewed()

  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [adding, setAdding] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [zoomPos, setZoomPos] = useState(null)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setLoading(true)

    productsApi.getById(id)
      .then(res => {
        const currentProduct = res.data.data
        setProduct(currentProduct)
        setActiveImg(0)
        addRecent(currentProduct)
        return productsApi.getAll({ category: currentProduct.category, limit: 5 })
      })
      .then(res => setRelated(res.data.data.filter(item => item._id !== id).slice(0, 4)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const handleAdd = async () => {
    if (!user) {
      toast.error("Sign in to add to cart")
      return
    }

    try {
      setAdding(true)
      await addToCart(product._id, qty)
      toast.success("Added to cart")
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed")
    } finally {
      setAdding(false)
    }
  }

  const handleWishlist = () => {
    toggle(product)
    toast.success(wishlisted ? "Removed from wishlist" : "Saved to wishlist")
  }

  const handleZoom = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

  const handleReview = async (event) => {
    event.preventDefault()

    if (!user) {
      toast.error("Sign in to leave a review")
      return
    }

    try {
      setSubmitting(true)
      await productsApi.addReview(id, { rating: reviewRating, comment: reviewComment })
      toast.success("Review submitted")
      setReviewComment("")
      const res = await productsApi.getById(id)
      setProduct(res.data.data)
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingPage />
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="font-body text-secondary">Product not found.</p>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    )
  }

  const wishlisted = isWishlisted(product._id)
  const hasDiscount = product.discountPrice > 0
  const displayPrice = hasDiscount ? product.discountPrice : product.price
  const discount = hasDiscount ? Math.round((1 - product.discountPrice / product.price) * 100) : 0
  const mainImage = product.images?.[activeImg]

  return (
    <div className="bg-surface">
      <div className="bg-surface-container-low">
        <div className="container-main py-3 flex items-center gap-2 font-label text-[11px] text-secondary uppercase tracking-wider">
          <Link to="/" className="hover:text-on-surface transition-colors">Home</Link>
          <span className="text-outline-variant">/</span>
          <Link to="/products" className="hover:text-on-surface transition-colors">Products</Link>
          <span className="text-outline-variant">/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-on-surface transition-colors">{product.category}</Link>
          <span className="text-outline-variant">/</span>
          <span className="text-on-surface truncate max-w-[150px]">{product.name}</span>
        </div>
      </div>

      <div className="container-main py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24">
          <div className="space-y-3">
            <div
              className="relative aspect-square bg-surface-container-low rounded-md overflow-hidden cursor-crosshair group ghost-border"
              onMouseMove={handleZoom}
              onMouseLeave={() => setZoomPos(null)}
            >
              {mainImage ? (
                <>
                  <img src={mainImage} alt={product.name} className={`w-full h-full object-cover transition-opacity duration-200 ${zoomPos ? "opacity-0" : "opacity-100"}`} />
                  {zoomPos && (
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${mainImage})`,
                        backgroundSize: "220%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                      }}
                    />
                  )}
                  <div className="absolute bottom-3 right-3 bg-surface-container-lowest/80 px-2.5 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-label text-[9px] uppercase tracking-wider text-secondary">Hover to zoom</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-outline-variant"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                </div>
              )}
            </div>

            {product.images?.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-md overflow-hidden ghost-border transition-all duration-200 ${i === activeImg ? "ring-2 ring-on-surface" : "opacity-50 hover:opacity-80"}`}>
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="label-overline text-tertiary mb-4">{product.category}</span>
            <h1 className="headline-lg text-3xl md:text-4xl text-on-surface mb-5 leading-tight">{product.name}</h1>

            {product.numReviews > 0 && <div className="mb-6"><Stars rating={product.ratings} count={product.numReviews} size={13} /></div>}

            <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-outline-variant/20">
              <Price amount={displayPrice} className="text-3xl text-on-surface" />
              {hasDiscount && (
                <div className="flex items-center gap-2">
                  <Price amount={product.price} className="text-sm text-secondary line-through opacity-60" />
                  <span className="status-badge bg-tertiary-container text-on-tertiary-container">-{discount}%</span>
                </div>
              )}
            </div>

            <p className="font-body text-secondary text-sm leading-relaxed mb-8">{product.description}</p>

            <div className="space-y-2 mb-10 text-sm">
              {product.brand && (
                <div className="flex gap-4">
                  <span className="font-label text-secondary w-16 shrink-0 uppercase text-[11px] tracking-wider">Brand</span>
                  <span className="font-body font-medium text-on-surface">{product.brand}</span>
                </div>
              )}
              <div className="flex gap-4">
                <span className="font-label text-secondary w-16 shrink-0 uppercase text-[11px] tracking-wider">Stock</span>
                <span className={`font-body font-medium ${product.stock > 0 ? "text-on-surface" : "text-error"}`}>
                  {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                </span>
              </div>
            </div>

            {product.stock > 0 && (
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center bg-surface-container-high rounded-sm">
                  <button onClick={() => setQty(current => Math.max(1, current - 1))} className="w-10 h-12 flex items-center justify-center text-secondary hover:text-on-surface transition-colors">-</button>
                  <span className="w-10 text-center font-label font-bold text-sm">{qty}</span>
                  <button onClick={() => setQty(current => Math.min(product.stock, current + 1))} className="w-10 h-12 flex items-center justify-center text-secondary hover:text-on-surface transition-colors">+</button>
                </div>
                <button onClick={handleAdd} disabled={adding} className="btn-primary flex-1">
                  {adding ? <><Spinner size="sm" className="border-on-primary/30 border-t-on-primary" /> Adding...</> : "Add to Cart"}
                </button>
                <button
                  onClick={handleWishlist}
                  className={`w-12 h-12 flex items-center justify-center rounded-sm transition-all ${
                    wishlisted ? "bg-tertiary text-on-tertiary" : "bg-surface-container-high text-secondary hover:bg-tertiary hover:text-on-tertiary"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mt-auto pt-8 border-t border-outline-variant/20">
              {[["SEC", "Genuine Product"], ["DEL", "Fast Delivery"], ["RET", "Easy Returns"], ["SUP", "Pro Support"]].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className="font-label text-[9px] uppercase tracking-wider text-on-surface">{icon}</span>
                  <span className="font-label text-[10px] uppercase tracking-wider text-secondary">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {product.stock > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-sm border-t border-outline-variant/20 md:hidden">
          <div className="container-main py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-label text-[10px] uppercase tracking-wider text-secondary truncate">{product.name}</p>
              <Price amount={displayPrice} className="text-sm text-on-surface" />
            </div>
            <button onClick={handleAdd} disabled={adding} className="btn-primary py-2.5 px-6 text-xs shrink-0">
              {adding ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-surface-container-low">
        <div className="container-main py-16">
          <h2 className="headline-lg text-3xl text-on-surface mb-12">
            Reviews {product.numReviews > 0 && <span className="font-body font-normal text-lg text-secondary ml-2">({product.numReviews})</span>}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <div className="space-y-8">
              {product.reviews?.length === 0 && <p className="font-body text-sm text-secondary">No reviews yet. Be the first!</p>}
              {product.reviews?.map((review, i) => (
                <div key={i} className="pb-8 border-b border-outline-variant/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-headline font-semibold text-sm text-on-surface">{review.user?.fullName || "Anonymous"}</p>
                    <Stars rating={review.rating} />
                  </div>
                  <p className="font-body text-sm text-secondary leading-relaxed">{review.comment}</p>
                  <p className="font-label text-[10px] text-secondary/60 mt-2 uppercase tracking-wider">
                    {new Date(review.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              ))}
            </div>
            {user && (
              <div>
                <h3 className="headline-md text-lg text-on-surface mb-6">Write a Review</h3>
                <form onSubmit={handleReview} className="space-y-5">
                  <div>
                    <p className="label-overline mb-3">Rating</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button type="button" key={n} onClick={() => setReviewRating(n)} className="transition-transform hover:scale-110">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill={n <= reviewRating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className={n <= reviewRating ? "text-tertiary" : "text-outline-variant"}>
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="label-overline mb-2">Comment</p>
                    <textarea value={reviewComment} onChange={e => setReviewComment(e.target.value)} rows={4} required className="input-field resize-none" placeholder="Share your experience..." />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary">
                    {submitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="container-main py-16">
          <div className="flex items-end justify-between mb-10">
            <h2 className="headline-lg text-2xl text-on-surface">Related Products</h2>
            <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="label-overline text-secondary hover:text-on-surface transition-colors">View all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {related.map((relatedProduct, i) => <ProductCard key={relatedProduct._id} product={relatedProduct} index={i} />)}
          </div>
        </div>
      )}
    </div>
  )
}
