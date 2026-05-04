import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import { productsApi } from "../../api/services"
import ProductCard from "../../components/ui/ProductCard"
import { EmptyState, Pagination, Skeleton } from "../../components/ui"

const CATEGORIES = ["CCTV", "Alarms", "Access Control", "Intercom", "Networking", "Other"]
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low", value: "price_asc" },
  { label: "Price: High", value: "price_desc" },
  { label: "Top Rated", value: "popular" },
]
const PRICE_RANGES = [
  { label: "All Prices", min: "", max: "" },
  { label: "Under NGN 10k", min: "", max: "10000" },
  { label: "NGN 10k - NGN 50k", min: "10000", max: "50000" },
  { label: "NGN 50k - NGN 100k", min: "50000", max: "100000" },
  { label: "Over NGN 100k", min: "100000", max: "" },
]

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(true)

  const page = Number(searchParams.get("page") || 1)
  const category = searchParams.get("category") || ""
  const sort = searchParams.get("sort") || "newest"
  const keyword = searchParams.get("keyword") || ""
  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""
  const inStock = searchParams.get("inStock") || ""

  const fetchProducts = useCallback(async () => {
    setLoading(true)

    try {
      const res = await productsApi.getAll({
        page,
        limit: 12,
        ...(category && { category }),
        ...(sort && { sort }),
        ...(keyword && { keyword }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
        ...(inStock && { inStock: true }),
      })

      setProducts(res.data.data)
      setTotal(res.data.total || 0)
      setPages(res.data.pages || 1)
    } catch {
    } finally {
      setLoading(false)
    }
  }, [page, category, sort, keyword, minPrice, maxPrice, inStock])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams)

    if (value !== "" && value !== null && value !== undefined) next.set(key, String(value))
    else next.delete(key)

    if (key !== "page") next.delete("page")
    setSearchParams(next)
  }

  const setPriceRange = (min, max) => {
    const next = new URLSearchParams(searchParams)

    if (min) next.set("minPrice", min)
    else next.delete("minPrice")

    if (max) next.set("maxPrice", max)
    else next.delete("maxPrice")

    next.delete("page")
    setSearchParams(next)
  }

  const activePriceLabel = PRICE_RANGES.find(range => range.min === minPrice && range.max === maxPrice)?.label || "All Prices"
  const hasFilters = category || minPrice || maxPrice || inStock || keyword

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">Shop</span>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h1 className="headline-lg text-4xl text-on-surface">
              {category || "All Products"}
              {total > 0 && <span className="ml-3 font-body font-normal text-lg text-secondary">({total})</span>}
            </h1>
            <select value={sort} onChange={e => setParam("sort", e.target.value)} className="input-field w-auto py-2 text-xs font-label uppercase tracking-wider">
              {SORT_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="container-main py-12">
        <div className="flex gap-12">
          <aside className="hidden md:block w-52 shrink-0">
            <div className="space-y-10 sticky top-28">
              <div>
                <p className="label-overline mb-3">Search</p>
                <div className="relative">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  <input type="text" placeholder="Search..." value={keyword} onChange={e => setParam("keyword", e.target.value)} className="input-field pl-8 py-2.5 text-xs" />
                </div>
              </div>

              <div>
                <p className="label-overline mb-4">Category</p>
                <div className="space-y-1">
                  {["", ...CATEGORIES].map(currentCategory => (
                    <button
                      key={currentCategory || "all"}
                      onClick={() => setParam("category", currentCategory)}
                      className={`w-full text-left px-3 py-2 text-sm font-body rounded-sm transition-colors ${
                        currentCategory === category ? "bg-on-surface text-inverse-on-surface font-medium" : "text-secondary hover:bg-surface-container hover:text-on-surface"
                      }`}
                    >
                      {currentCategory || "All Categories"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="label-overline mb-4">Price Range</p>
                <div className="space-y-1">
                  {PRICE_RANGES.map(range => (
                    <button
                      key={range.label}
                      onClick={() => setPriceRange(range.min, range.max)}
                      className={`w-full text-left px-3 py-2 text-sm font-body rounded-sm transition-colors ${
                        range.label === activePriceLabel ? "bg-on-surface text-inverse-on-surface font-medium" : "text-secondary hover:bg-surface-container hover:text-on-surface"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="label-overline mb-3">Availability</p>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={Boolean(inStock)} onChange={e => setParam("inStock", e.target.checked ? "true" : "")} className="w-3.5 h-3.5 accent-on-surface" />
                  <span className="font-body text-sm text-secondary">In stock only</span>
                </label>
              </div>

              {hasFilters && (
                <button onClick={() => setSearchParams({})} className="label-overline text-tertiary hover:text-on-surface transition-colors text-left">
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="aspect-[3/4] mb-4" />
                    <Skeleton className="h-2.5 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <EmptyState
                title="No products found"
                description="Try adjusting your filters or search terms."
                action={<button onClick={() => setSearchParams({})} className="btn-secondary mt-4">Clear Filters</button>}
              />
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-14">
                  {products.map((product, i) => <ProductCard key={product._id} product={product} index={i} />)}
                </div>
                <div className="flex justify-center">
                  <Pagination page={page} pages={pages} onPageChange={nextPage => setParam("page", nextPage)} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
