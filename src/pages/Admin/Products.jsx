import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { productsApi, uploadApi } from "../../api/services"
import { LoadingPage, Price, Pagination } from "../../components/ui"

/* ── Tabler icons CDN ────────────────────────────────────────────── */
if (typeof document !== "undefined" && !document.getElementById("_ti")) {
  const l = document.createElement("link")
  l.id = "_ti"; l.rel = "stylesheet"
  l.href = "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css"
  document.head.appendChild(l)
}

/* ── Tokens ──────────────────────────────────────────────────────── */
const C = {
  bg:       "var(--color-background-primary)",
  surface:  "var(--color-background-secondary)",
  page:     "var(--color-background-tertiary)",
  border:   "var(--color-border-tertiary)",
  borderMd: "var(--color-border-secondary)",
  text:     "var(--color-text-primary)",
  muted:    "var(--color-text-secondary)",
  faint:    "var(--color-text-tertiary)",
  mono:     "var(--font-mono)",
  radMd:    "var(--border-radius-md)",
  radLg:    "var(--border-radius-lg)",
}

const CATEGORIES = ["CCTV", "Alarms", "Access Control", "Intercom", "Networking", "Other"]

const BLANK = {
  name: "", description: "", price: "", discountPrice: "",
  category: "", brand: "", stock: "",
  isFeatured: false, isActive: true,
}

/* ── Atoms ───────────────────────────────────────────────────────── */
const Icon = ({ n, size = 14, style = {} }) => (
  <i className={`ti ti-${n}`} aria-hidden="true" style={{ fontSize: size, lineHeight: 1, flexShrink: 0, ...style }} />
)
const Ol = ({ children, mb = 10 }) => (
  <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: C.faint, marginBottom: mb }}>
    {children}
  </p>
)
const Chip = ({ children, bg, color }) => (
  <span style={{ fontSize: 9, fontWeight: 600, padding: "2px 7px", borderRadius: 10, letterSpacing: ".04em", textTransform: "capitalize", background: bg, color, display: "inline-block", whiteSpace: "nowrap" }}>
    {children}
  </span>
)
const TblWrap = ({ children }) => (
  <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: C.radLg, overflow: "hidden" }}>
    {children}
  </div>
)
const TblHead = ({ cols, labels }) => (
  <div style={{ display: "grid", gridTemplateColumns: cols, padding: "7px 16px", background: C.surface, borderBottom: `0.5px solid ${C.border}` }}>
    {labels.map(l => <span key={l} style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: C.faint }}>{l}</span>)}
  </div>
)
const TblRow = ({ cols, children, last, dim }) => (
  <div style={{ display: "grid", gridTemplateColumns: cols, padding: "9px 16px", alignItems: "center", borderBottom: last ? "none" : `0.5px solid ${C.border}`, opacity: dim ? 0.45 : 1 }}>
    {children}
  </div>
)
function Empty({ icon, text }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "48px 20px" }}>
      <Icon n={icon} size={26} style={{ color: C.faint }} />
      <p style={{ fontSize: 12, color: C.faint }}>{text}</p>
    </div>
  )
}

/* ── Buttons ─────────────────────────────────────────────────────── */
const btnBase    = { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 500, padding: "6px 12px", borderRadius: C.radMd, cursor: "pointer", border: `0.5px solid ${C.border}`, background: C.bg, color: C.text }
const btnPrimary = { ...btnBase, background: C.text, color: C.bg, border: "none" }
const btnDanger  = { ...btnBase, background: "#FCEBEB", color: "#A32D2D", border: "0.5px solid #F09595" }

/* ── Toggle ──────────────────────────────────────────────────────── */
function Toggle({ value, onChange, label, activeColor = "#3B6D11", activeBg = "#EAF3DE" }) {
  return (
    <button onClick={() => onChange(!value)} style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", padding: "6px 10px", borderRadius: C.radMd, border: `0.5px solid ${value ? activeColor : C.border}`, background: value ? activeBg : C.surface, transition: "all .15s" }}>
      <div style={{ width: 28, height: 16, borderRadius: 8, background: value ? activeColor : C.borderMd, position: "relative", transition: "background .15s", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 2, left: value ? 14 : 2, width: 12, height: 12, borderRadius: "50%", background: "#fff", transition: "left .15s" }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 500, color: value ? activeColor : C.muted }}>{label}</span>
    </button>
  )
}

/* ── Modal ───────────────────────────────────────────────────────── */
function Modal({ title, subtitle, onClose, children, footer, width = 600 }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 }}>
      <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: C.radLg, width, maxWidth: "100%", maxHeight: "92vh", display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "14px 18px", borderBottom: `0.5px solid ${C.border}`, flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{title}</p>
            {subtitle && <p style={{ fontSize: 11, color: C.faint, marginTop: 2 }}>{subtitle}</p>}
          </div>
          <button onClick={onClose} style={{ ...btnBase, padding: "3px 6px", border: "none", background: "transparent", color: C.faint }}>
            <Icon n="x" size={15} />
          </button>
        </div>
        <div style={{ overflowY: "auto", padding: "18px 18px 4px", flex: 1 }}>{children}</div>
        {footer && (
          <div style={{ padding: "12px 18px", borderTop: `0.5px solid ${C.border}`, flexShrink: 0, display: "flex", justifyContent: "flex-end", gap: 8 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Form field ──────────────────────────────────────────────────── */
const Field = ({ label, hint, children, span2 = false }) => (
  <div style={{ marginBottom: 13, gridColumn: span2 ? "1 / -1" : undefined }}>
    <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: C.faint, marginBottom: 5 }}>{label}</p>
    {children}
    {hint && <p style={{ fontSize: 10, color: C.faint, marginTop: 4 }}>{hint}</p>}
  </div>
)
const inp = { width: "100%", fontSize: 12, padding: "7px 10px", borderRadius: C.radMd, border: `0.5px solid ${C.borderMd}`, background: C.bg, color: C.text, outline: "none", boxSizing: "border-box" }
const sel = { ...inp, cursor: "pointer" }

/* ══════════════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════════════ */
export default function AdminProducts() {
  const [products,     setProducts]     = useState([])
  const [pages,        setPages]        = useState(1)
  const [page,         setPage]         = useState(1)
  const [loading,      setLoading]      = useState(true)
  const [filterCat,    setFilterCat]    = useState("")
  const [modal,        setModal]        = useState(null)
  const [form,         setForm]         = useState(BLANK)
  const [existingImgs, setExistingImgs] = useState([])   // string[]
  const [newFiles,     setNewFiles]     = useState([])   // File[]
  const [previews,     setPreviews]     = useState([])   // blob URLs
  const [uploading,    setUploading]    = useState(false)
  const [saving,       setSaving]       = useState(false)
  const fileRef = useRef()

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await productsApi.getAll({ page, limit: 15, ...(filterCat && { category: filterCat }) })
      setProducts(res.data.data)
      setPages(res.data.pages)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [page, filterCat])

  /* ── helpers ── */
  const f = v => setForm(x => ({ ...x, ...v }))

  const openCreate = () => {
    setForm(BLANK); setExistingImgs([]); setNewFiles([]); setPreviews([]); setModal("create")
  }
  const openEdit = p => {
    setForm({
      name: p.name || "", description: p.description || "",
      price: p.price ?? "", discountPrice: p.discountPrice ?? "",
      category: p.category || "", brand: p.brand || "",
      stock: p.stock ?? "", isFeatured: !!p.isFeatured,
      isActive: p.isActive !== false,
    })
    setExistingImgs([...(p.images || [])])
    setNewFiles([]); setPreviews([]); setModal(p)
  }
  const closeModal = () => {
    previews.forEach(u => URL.revokeObjectURL(u))
    setNewFiles([]); setPreviews([]); setExistingImgs([]); setModal(null); setSaving(false)
  }

  const handlePick = files => {
    const arr = Array.from(files)
    const total = existingImgs.length + newFiles.length + arr.length
    if (total > 5) { toast.error(`Can only add ${5 - existingImgs.length - newFiles.length} more image(s)`); return }
    const bad = arr.filter(f => !f.type.startsWith("image/"))
    if (bad.length) { toast.error("Only image files are allowed"); return }
    setNewFiles(prev  => [...prev, ...arr])
    setPreviews(prev => [...prev, ...arr.map(f => URL.createObjectURL(f))])
  }
  const removeExisting = i => setExistingImgs(prev => prev.filter((_, idx) => idx !== i))
  const removeNew      = i => {
    URL.revokeObjectURL(previews[i])
    setNewFiles(prev  => prev.filter((_, idx) => idx !== i))
    setPreviews(prev => prev.filter((_, idx) => idx !== i))
  }

  const handleSave = async () => {
    if (!form.name.trim())  { toast.error("Product name is required"); return }
    if (!form.price)        { toast.error("Price is required"); return }
    if (!form.category)     { toast.error("Category is required"); return }
    setSaving(true)
    try {
      let uploaded = []
      if (newFiles.length > 0) {
        setUploading(true)
        const fd = new FormData()
        newFiles.forEach(file => fd.append("images", file))
        const res = await uploadApi.productImages(fd)
        /* handle both { data: { data: { urls: [] } } } and { data: { data: [] } } shapes */
        const raw = res.data?.data?.urls ?? res.data?.data ?? res.data ?? []
        uploaded = Array.isArray(raw) ? raw : []
        setUploading(false)
      }
      const payload = {
        name:          form.name.trim(),
        description:   form.description.trim(),
        price:         Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : 0,
        category:      form.category,
        brand:         form.brand.trim(),
        stock:         Number(form.stock) || 0,
        isFeatured:    form.isFeatured,
        isActive:      form.isActive,
        images:        [...existingImgs, ...uploaded],
      }
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
      setSaving(false)
    }
  }

  const handleDelete = async id => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return
    try { await productsApi.remove(id); toast.success("Deleted"); fetchProducts() }
    catch { toast.error("Failed to delete") }
  }

  /* Quick-toggle isFeatured or isActive from the row */
  const quickToggle = async (product, field) => {
    try {
      const res = await productsApi.update(product._id, { [field]: !product[field] })
      const updated = res.data.data || res.data
      setProducts(prev => prev.map(p => p._id === product._id ? updated : p))
    } catch { toast.error("Failed to update") }
  }

  const isCreate     = modal === "create"
  const totalImgs    = existingImgs.length + newFiles.length
  const hasDisc      = p => p.discountPrice > 0
  const discPreview  = form.price && form.discountPrice && Number(form.discountPrice) > 0 && Number(form.discountPrice) < Number(form.price)
    ? Math.round((1 - Number(form.discountPrice) / Number(form.price)) * 100) : null

  return (
    <div style={{ background: C.page, minHeight: "100vh", fontFamily: "var(--font-sans)" }}>

      {/* Top bar */}
      <div style={{ background: C.bg, borderBottom: `0.5px solid ${C.border}`, padding: "14px 32px" }}>
        <Link to="/admin" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: C.faint, textDecoration: "none", marginBottom: 10 }}>
          <Icon n="arrow-left" size={13} /> Dashboard
        </Link>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: C.faint, marginBottom: 4 }}>Admin</p>
            <h1 style={{ fontSize: 22, fontWeight: 500, color: C.text }}>Products</h1>
          </div>
          <button onClick={openCreate} style={btnPrimary}>
            <Icon n="plus" size={13} /> Add product
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 32px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Category filter + summary */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["", ...CATEGORIES].map(c => (
              <button key={c || "all"} onClick={() => { setFilterCat(c); setPage(1) }} style={{ fontSize: 10, fontWeight: 500, padding: "4px 10px", borderRadius: 12, cursor: "pointer", background: filterCat === c ? C.text : "transparent", color: filterCat === c ? C.bg : C.muted, border: `0.5px solid ${filterCat === c ? C.text : C.border}` }}>
                {c || "All"}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Chip bg="#EAF3DE" color="#3B6D11">{products.filter(p => p.isFeatured).length} featured</Chip>
            <Chip bg="#FCEBEB" color="#A32D2D">{products.filter(p => p.isActive === false).length} hidden</Chip>
          </div>
        </div>

        {loading ? <LoadingPage /> : (
          <>
            <TblWrap>
              <TblHead cols="50px 1fr 100px 90px 52px 80px 80px 76px" labels={["","Product","Category","Price","Stock","Featured","Visible","Actions"]} />
              {products.length === 0 && <Empty icon="box" text="No products found" />}
              {products.map((p, i) => (
                <TblRow key={p._id} cols="50px 1fr 100px 90px 52px 80px 80px 76px" last={i === products.length - 1} dim={p.isActive === false}>
                  {/* Thumbnail */}
                  {p.images?.[0]
                    ? <img src={p.images[0]} alt="" style={{ width: 36, height: 36, objectFit: "cover", borderRadius: C.radMd, border: `0.5px solid ${C.border}` }} />
                    : <div style={{ width: 36, height: 36, borderRadius: C.radMd, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon n="photo" size={14} style={{ color: C.faint }} />
                      </div>
                  }
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 500, color: C.text, lineHeight: 1.3 }}>{p.name}</p>
                    <p style={{ fontSize: 10, color: C.faint }}>{p.brand || "—"}</p>
                  </div>
                  <span style={{ fontSize: 11, color: C.muted }}>{p.category || "—"}</span>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 500, color: C.text }}><Price amount={p.price} /></p>
                    {hasDisc(p) && <p style={{ fontSize: 10, color: "#3B6D11" }}>-{Math.round((1 - p.discountPrice / p.price) * 100)}% · <Price amount={p.discountPrice} /></p>}
                  </div>
                  <span style={{ fontSize: 11, color: (p.stock ?? 99) < 5 ? "#A32D2D" : C.muted, fontWeight: (p.stock ?? 99) < 5 ? 600 : 400 }}>
                    {p.stock ?? "—"}
                  </span>
                  {/* Featured toggle */}
                  <button onClick={() => quickToggle(p, "isFeatured")} style={{ ...btnBase, padding: "3px 8px", fontSize: 10, background: p.isFeatured ? "#EAF3DE" : C.surface, color: p.isFeatured ? "#3B6D11" : C.faint, border: `0.5px solid ${p.isFeatured ? "#3B6D11" : C.border}` }}>
                    <Icon n={p.isFeatured ? "star-filled" : "star"} size={11} style={{ color: p.isFeatured ? "#3B6D11" : C.faint }} />
                    {p.isFeatured ? "Yes" : "No"}
                  </button>
                  {/* Active toggle */}
                  <button onClick={() => quickToggle(p, "isActive")} style={{ ...btnBase, padding: "3px 8px", fontSize: 10, background: p.isActive !== false ? "#EAF3DE" : "#FCEBEB", color: p.isActive !== false ? "#3B6D11" : "#A32D2D", border: `0.5px solid ${p.isActive !== false ? "#3B6D11" : "#F09595"}` }}>
                    <Icon n={p.isActive !== false ? "eye" : "eye-off"} size={11} />
                    {p.isActive !== false ? "Live" : "Hidden"}
                  </button>
                  <div style={{ display: "flex", gap: 5 }}>
                    <button onClick={() => openEdit(p)} style={{ ...btnBase, padding: "4px 7px" }}><Icon n="edit" size={12} /></button>
                    <button onClick={() => handleDelete(p._id)} style={{ ...btnDanger, padding: "4px 7px" }}><Icon n="trash" size={12} /></button>
                  </div>
                </TblRow>
              ))}
            </TblWrap>

            {pages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                <Pagination page={page} pages={pages} onPageChange={setPage} />
              </div>
            )}
          </>
        )}
      </div>

      {/* ══ Product modal ══ */}
      {modal && (
        <Modal
          title={isCreate ? "Add new product" : "Edit product"}
          subtitle={isCreate ? "Fill in the details to list a new product." : `Editing: ${modal.name}`}
          onClose={closeModal}
          footer={<>
            <button onClick={closeModal} style={btnBase}>Cancel</button>
            <button onClick={handleSave} disabled={saving || uploading} style={{ ...btnPrimary, opacity: (saving || uploading) ? .6 : 1 }}>
              <Icon n={isCreate ? "plus" : "check"} size={13} />
              {uploading ? "Uploading images…" : saving ? "Saving…" : isCreate ? "Create product" : "Save changes"}
            </button>
          </>}
        >
          {/* ── Visibility toggles ── */}
          <div style={{ display: "flex", gap: 10, marginBottom: 18, padding: "12px 14px", background: C.surface, borderRadius: C.radMd }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: C.faint, marginBottom: 7 }}>Visibility</p>
              <Toggle value={form.isActive} onChange={v => f({ isActive: v })} label={form.isActive ? "Live — visible to customers" : "Hidden"} activeColor="#3B6D11" activeBg="#EAF3DE" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: C.faint, marginBottom: 7 }}>Featured</p>
              <Toggle value={form.isFeatured} onChange={v => f({ isFeatured: v })} label={form.isFeatured ? "On home page" : "Not featured"} activeColor="#EF9F27" activeBg="#FAEEDA" />
            </div>
          </div>

          {/* ── Fields grid ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>

            <Field label="Product name" span2>
              <input value={form.name} onChange={e => f({ name: e.target.value })} style={inp} placeholder="e.g. Hikvision 4MP IP Camera" />
            </Field>

            <Field label="Category">
              <select value={form.category} onChange={e => f({ category: e.target.value })} style={sel}>
                <option value="">Select category…</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            <Field label="Brand">
              <input value={form.brand} onChange={e => f({ brand: e.target.value })} style={inp} placeholder="e.g. Hikvision" />
            </Field>

            <Field label="Price (₦)">
              <input type="number" min="0" value={form.price} onChange={e => f({ price: e.target.value })} style={inp} placeholder="0" />
            </Field>

            <Field label="Discount price (₦)" hint="Leave 0 for no discount">
              <input type="number" min="0" value={form.discountPrice} onChange={e => f({ discountPrice: e.target.value })} style={inp} placeholder="0" />
            </Field>

            <Field label="Stock quantity">
              <input type="number" min="0" value={form.stock} onChange={e => f({ stock: e.target.value })} style={inp} placeholder="0" />
            </Field>

            <Field label="Description" span2>
              <textarea value={form.description} onChange={e => f({ description: e.target.value })} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="Full HD resolution with night vision…" />
            </Field>

            {/* Discount preview */}
            {discPreview && (
              <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#EAF3DE", borderRadius: C.radMd, marginBottom: 4 }}>
                <Icon n="tag" size={13} style={{ color: "#3B6D11" }} />
                <p style={{ fontSize: 11, color: "#3B6D11" }}>
                  <strong>{discPreview}% off</strong> — customers pay <strong><Price amount={Number(form.discountPrice)} /></strong> instead of <Price amount={Number(form.price)} />
                </p>
              </div>
            )}

            {/* ── Images ── */}
            <Field label={`Product images (${totalImgs} / 5)`} hint="First image is the main display image on the product page." span2>

              {/* Existing */}
              {existingImgs.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: C.faint, marginBottom: 7 }}>Saved — click ✕ to remove</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {existingImgs.map((url, i) => (
                      <div key={i} style={{ position: "relative", width: 76, height: 76 }}>
                        <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: C.radMd, border: `0.5px solid ${C.border}`, display: "block" }} />
                        <button onClick={() => removeExisting(i)} style={{ position: "absolute", top: -7, right: -7, width: 20, height: 20, borderRadius: "50%", background: "#FCEBEB", color: "#A32D2D", border: "0.5px solid #F09595", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                          <Icon n="x" size={11} />
                        </button>
                        {i === 0 && <span style={{ position: "absolute", bottom: 4, left: 4, fontSize: 8, fontWeight: 700, letterSpacing: ".06em", background: "rgba(0,0,0,.6)", color: "#fff", padding: "1px 5px", borderRadius: 4 }}>MAIN</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New previews */}
              {previews.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: C.faint, marginBottom: 7 }}>New — will upload on save</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {previews.map((src, i) => (
                      <div key={i} style={{ position: "relative", width: 76, height: 76 }}>
                        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: C.radMd, border: `1px dashed ${C.borderMd}`, display: "block" }} />
                        <button onClick={() => removeNew(i)} style={{ position: "absolute", top: -7, right: -7, width: 20, height: 20, borderRadius: "50%", background: "#FCEBEB", color: "#A32D2D", border: "0.5px solid #F09595", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                          <Icon n="x" size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload button */}
              {totalImgs < 5 && (
                <>
                  <input ref={fileRef} type="file" accept="image/*" multiple onChange={e => { handlePick(e.target.files); e.target.value = "" }} style={{ display: "none" }} />
                  <button onClick={() => fileRef.current?.click()} style={{ ...btnBase, width: "100%", justifyContent: "center", padding: "10px", border: `1px dashed ${C.borderMd}` }}>
                    <Icon n="upload" size={13} />
                    {totalImgs > 0 ? `Add more images (${5 - totalImgs} remaining)` : "Upload images"}
                  </button>
                </>
              )}

              {uploading && (
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 8, fontSize: 11, color: C.muted }}>
                  <Icon n="loader" size={13} style={{ color: C.faint }} /> Uploading to Cloudinary…
                </div>
              )}
            </Field>
          </div>
        </Modal>
      )}
    </div>
  )
}