import { useEffect, useState, useRef } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { productsApi, uploadApi } from "../../api/services"
import { LoadingPage, Price, Pagination } from "../../components/ui"

const CATEGORIES = ["CCTV", "Alarms", "Access Control", "Intercom", "Networking", "Other"]
const BLANK = { name: "", description: "", price: "", discountPrice: "", category: "CCTV", brand: "", stock: "", isFeatured: false }

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(BLANK)
  const [saving, setSaving] = useState(false)
  const [existingImages, setExistingImages] = useState([])
  const [newFiles, setNewFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const fetchProducts = async () => {
    setLoading(true)

    try {
      const res = await productsApi.getAll({ page, limit: 15 })
      setProducts(res.data.data)
      setPages(res.data.pages)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [page])

  const openCreate = () => {
    setForm(BLANK)
    setExistingImages([])
    setNewFiles([])
    setPreviews([])
    setModal("create")
  }

  const openEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      discountPrice: product.discountPrice || "",
      category: product.category,
      brand: product.brand || "",
      stock: product.stock,
      isFeatured: product.isFeatured,
    })
    setExistingImages(product.images || [])
    setNewFiles([])
    setPreviews([])
    setModal(product)
  }

  const closeModal = () => {
    previews.forEach(url => URL.revokeObjectURL(url))
    setNewFiles([])
    setPreviews([])
    setExistingImages([])
    setModal(null)
  }

  const set = (key) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    setForm(current => ({ ...current, [key]: value }))
  }

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files)
    if (!files.length) return

    const totalAfter = existingImages.length + newFiles.length + files.length
    if (totalAfter > 5) {
      toast.error(`Can only add ${5 - existingImages.length - newFiles.length} more image(s)`)
      return
    }

    const invalid = files.filter(file => !file.type.startsWith("image/"))
    if (invalid.length) {
      toast.error("Only image files are allowed")
      return
    }

    setNewFiles(prev => [...prev, ...files])
    setPreviews(prev => [...prev, ...files.map(file => URL.createObjectURL(file))])
    event.target.value = ""
  }

  const removeExisting = (index) => setExistingImages(prev => prev.filter((_, idx) => idx !== index))

  const removeNew = (index) => {
    URL.revokeObjectURL(previews[index])
    setNewFiles(prev => prev.filter((_, idx) => idx !== index))
    setPreviews(prev => prev.filter((_, idx) => idx !== index))
  }

  const handleSave = async (event) => {
    event.preventDefault()

    try {
      setSaving(true)
      let uploadedUrls = []

      if (newFiles.length > 0) {
        setUploading(true)
        const formData = new FormData()
        newFiles.forEach(file => formData.append("images", file))
        const res = await uploadApi.productImages(formData)
        uploadedUrls = res.data.data.urls
        setUploading(false)
      }

      const payload = { ...form, images: [...existingImages, ...uploadedUrls] }

      if (modal === "create") {
        await productsApi.create(payload)
        toast.success("Product created")
      } else {
        await productsApi.update(modal._id, payload)
        toast.success("Product updated")
      }

      closeModal()
      fetchProducts()
    } catch (err) {
      setUploading(false)
      toast.error(err.response?.data?.message || "Save failed")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return

    try {
      await productsApi.remove(id)
      toast.success("Product deleted")
      fetchProducts()
    } catch {
      toast.error("Failed to delete")
    }
  }

  const totalImages = existingImages.length + newFiles.length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-xs text-ink-400 hover:text-ink">&larr; Dashboard</Link>
          <h1 className="page-title">Products</h1>
        </div>
        <button onClick={openCreate} className="btn-primary text-xs py-2">+ New Product</button>
      </div>

      {loading ? <LoadingPage /> : (
        <>
          <div className="card divide-y divide-ink-50 mb-6">
            {products.length === 0 && <p className="text-sm text-ink-400 p-5">No products yet.</p>}
            {products.map(product => (
              <div key={product._id} className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 bg-ink-50 rounded-sm overflow-hidden shrink-0">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-ink-100 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-300"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{product.name}</p>
                  <p className="text-xs text-ink-400">{product.category} - Stock: {product.stock} - {product.images?.length || 0} image{product.images?.length !== 1 ? "s" : ""}</p>
                </div>
                {product.isFeatured && <span className="tag bg-sage-100 text-sage-dark text-[10px]">Featured</span>}
                <Price amount={product.price} className="text-sm" />
                <button onClick={() => openEdit(product)} className="text-xs text-ink-400 hover:text-ink transition-colors">Edit</button>
                <button onClick={() => handleDelete(product._id)} className="text-xs text-red-400 hover:text-red-600 transition-colors">Delete</button>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Pagination page={page} pages={pages} onPageChange={setPage} />
          </div>
        </>
      )}

      {modal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-sm shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-ink-100 sticky top-0 bg-white z-10">
              <h2 className="font-display font-semibold text-base">
                {modal === "create" ? "New Product" : "Edit Product"}
              </h2>
              <button onClick={closeModal} className="text-ink-400 hover:text-ink transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="section-label">Product Images</label>
                  <span className="text-xs text-ink-400">{totalImages}/5</span>
                </div>

                {totalImages > 0 && (
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {existingImages.map((url, i) => (
                      <div key={`e-${i}`} className="relative group aspect-square">
                        <img src={url} alt="" className="w-full h-full object-cover rounded-sm border border-ink-100" />
                        <button type="button" onClick={() => removeExisting(i)} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full items-center justify-center hidden group-hover:flex shadow-sm">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                        {i === 0 && <span className="absolute bottom-0 left-0 right-0 text-[9px] text-center bg-black/50 text-white py-0.5 rounded-b-sm">Main</span>}
                      </div>
                    ))}
                    {previews.map((url, i) => (
                      <div key={`n-${i}`} className="relative group aspect-square">
                        <img src={url} alt="" className="w-full h-full object-cover rounded-sm border border-sage/40 ring-1 ring-sage/20" />
                        <button type="button" onClick={() => removeNew(i)} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full items-center justify-center hidden group-hover:flex shadow-sm">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                        <span className="absolute bottom-0 left-0 right-0 text-[9px] text-center bg-sage/70 text-white py-0.5 rounded-b-sm">New</span>
                      </div>
                    ))}
                  </div>
                )}

                {totalImages < 5 && (
                  <>
                    <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" multiple className="hidden" />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-ink-200 rounded-sm py-5 flex flex-col items-center gap-1.5 text-ink-400 hover:border-ink hover:text-ink transition-colors"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                      <span className="text-xs font-medium">Click to upload images</span>
                      <span className="text-[11px] text-ink-300">PNG, JPG, WEBP - Up to {5 - totalImages} more - First image = main photo</span>
                    </button>
                  </>
                )}

                {uploading && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-sage">
                    <div className="w-3 h-3 border border-sage/30 border-t-sage rounded-full animate-spin" />
                    Uploading to Cloudinary...
                  </div>
                )}
              </div>

              <div>
                <label className="section-label mb-2 block">Name</label>
                <input required type="text" value={form.name} onChange={set("name")} className="input-field" placeholder="4MP IP Dome Camera" />
              </div>

              <div>
                <label className="section-label mb-2 block">Description</label>
                <textarea rows={3} required value={form.description} onChange={set("description")} className="input-field resize-none" placeholder="Full HD resolution with night vision..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="section-label mb-2 block">Price (NGN)</label>
                  <input required type="number" min="0" value={form.price} onChange={set("price")} className="input-field" placeholder="45000" />
                </div>
                <div>
                  <label className="section-label mb-2 block">Discount Price (NGN)</label>
                  <input type="number" min="0" value={form.discountPrice} onChange={set("discountPrice")} className="input-field" placeholder="0" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="section-label mb-2 block">Category</label>
                  <select value={form.category} onChange={set("category")} className="input-field">
                    {CATEGORIES.map(category => <option key={category}>{category}</option>)}
                  </select>
                </div>
                <div>
                  <label className="section-label mb-2 block">Stock</label>
                  <input required type="number" min="0" value={form.stock} onChange={set("stock")} className="input-field" placeholder="10" />
                </div>
              </div>

              <div>
                <label className="section-label mb-2 block">Brand</label>
                <input type="text" value={form.brand} onChange={set("brand")} className="input-field" placeholder="Hikvision" />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isFeatured} onChange={set("isFeatured")} className="w-4 h-4" />
                <span className="text-sm font-medium text-ink">Feature this product on the homepage</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" disabled={saving || uploading} className="btn-primary flex-1 justify-center">
                  {uploading ? "Uploading..." : saving ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
