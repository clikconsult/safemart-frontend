import { useRef, useState } from "react"
import toast from "react-hot-toast"
import { productsApi } from "../../api/services"

const C = {
  bg:      "var(--color-background-primary)",
  surface: "var(--color-background-secondary)",
  border:  "var(--color-border-tertiary)",
  borderMd:"var(--color-border-secondary)",
  text:    "var(--color-text-primary)",
  muted:   "var(--color-text-secondary)",
  faint:   "var(--color-text-tertiary)",
  radMd:   "var(--border-radius-md)",
  radLg:   "var(--border-radius-lg)",
}

const Icon = ({ n, size = 14, style = {} }) => (
  <i className={`ti ti-${n}`} aria-hidden="true" style={{ fontSize: size, lineHeight: 1, flexShrink: 0, ...style }} />
)

const btnBase    = { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 500, padding: "6px 12px", borderRadius: C.radMd, cursor: "pointer", border: `0.5px solid ${C.border}`, background: C.bg, color: C.text }
const btnPrimary = { ...btnBase, background: C.text, color: C.bg, border: "none" }

/**
 * Expected CSV columns (matches the Safemart Product Data Collection sheet):
 * Product Name, Brand / Manufacturer, Category, Sub-Category, Model Number,
 * Selling Price ₦, Short Description, Key Specifications, In Stock?,
 * Stock Quantity, Cost Price ₦, Reorder Level, Notes / Variants, Image URL
 *
 * "Image URL" can hold one or more manufacturer/hosted image links,
 * separated by commas or pipes — each gets fetched and re-hosted on Cloudinary.
 */
export default function BulkImportModal({ onClose, onImported }) {
  const [file, setFile]     = useState(null)
  const [busy, setBusy]     = useState(false)
  const [report, setReport] = useState(null) // { imported, updated, skipped, failed, results }
  const [updateExisting, setUpdateExisting] = useState(false)
  const fileRef = useRef()

  const handlePick = e => {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.name.toLowerCase().endsWith(".csv")) {
      toast.error("Please choose a .csv file")
      e.target.value = ""
      return
    }
    setFile(f)
    setReport(null)
  }

  const handleImport = async () => {
    if (!file) { toast.error("Choose a CSV file first"); return }
    setBusy(true)
    try {
      const fd = new FormData()
      fd.append("csvFile", file)
      fd.append("updateExisting", updateExisting ? "true" : "false")
      const res = await productsApi.bulkImport(fd)
      const data = res.data
      setReport(data)
      if (data.imported > 0) toast.success(`${data.imported} product(s) created`)
      if (data.updated > 0) toast.success(`${data.updated} product(s) updated`)
      if (data.failed > 0) toast.error(`${data.failed} row(s) failed — see details below`)
      if (data.imported > 0 || data.updated > 0) onImported?.()
    } catch (err) {
      toast.error(err.response?.data?.message || "Import failed")
    } finally {
      setBusy(false)
    }
  }

  const reset = () => {
    setFile(null); setReport(null)
    if (fileRef.current) fileRef.current.value = ""
  }

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 16 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: C.radLg, width: 560, maxWidth: "100%", maxHeight: "90vh", display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "14px 18px", borderBottom: `0.5px solid ${C.border}`, flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, color: C.text }}>Bulk upload products</p>
            <p style={{ fontSize: 11, color: C.faint, marginTop: 2 }}>Upload a CSV exported from the Product Data Collection sheet.</p>
          </div>
          <button onClick={onClose} style={{ ...btnBase, padding: "4px 7px", border: "none", background: "transparent", color: C.faint }}>
            <Icon n="x" size={17} />
          </button>
        </div>

        {/* Body */}
        <div style={{ overflowY: "auto", padding: "18px", flex: 1 }}>

          {/* Column reference */}
          <div style={{ background: C.surface, borderRadius: C.radMd, padding: "10px 12px", marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: C.faint, marginBottom: 6 }}>Expected columns</p>
            <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
              Product Name*, Brand / Manufacturer, Category*, Sub-Category, Model Number, Selling Price ₦*, Short Description*, Key Specifications, Stock Quantity*, Cost Price ₦, Reorder Level, Notes / Variants, Image URL
            </p>
            <p style={{ fontSize: 10, color: C.faint, marginTop: 6 }}>
              * required for new products · column headers are matched case-insensitively · Image URL can hold multiple links separated by commas — each is fetched and re-hosted on Cloudinary automatically · rows sharing the same Model Number (or Name) are treated as duplicates and only the first is used.
            </p>
          </div>

          <label style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 14, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={updateExisting}
              onChange={e => setUpdateExisting(e.target.checked)}
              style={{ marginTop: 2 }}
            />
            <span>
              <span style={{ fontSize: 12, color: C.text, display: "block" }}>Update existing products</span>
              <span style={{ fontSize: 10, color: C.faint }}>
                If a row's Model Number (or Name) matches a product already in Safemart, update it instead of skipping it. Blank cells leave the existing value unchanged.
              </span>
            </span>
          </label>

          {/* File picker */}
          <input ref={fileRef} type="file" accept=".csv" onChange={handlePick} style={{ display: "none" }} />
          {!file ? (
            <button onClick={() => fileRef.current?.click()} style={{ ...btnBase, width: "100%", justifyContent: "center", padding: "16px", border: `1px dashed ${C.borderMd}` }}>
              <Icon n="file-upload" size={16} />
              Choose CSV file
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: C.surface, borderRadius: C.radMd, marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                <Icon n="file-spreadsheet" size={16} style={{ color: C.muted }} />
                <span style={{ fontSize: 12, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
              </div>
              <button onClick={reset} style={{ ...btnBase, padding: "3px 7px", border: "none", background: "transparent", color: C.faint }}>
                <Icon n="x" size={13} />
              </button>
            </div>
          )}

          {/* Report */}
          {report && (
            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 12, background: "#EAF3DE", color: "#3B6D11" }}>
                  {report.imported} created
                </span>
                {report.updated > 0 && (
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 12, background: "#E3EEFB", color: "#1D4E89" }}>
                    {report.updated} updated
                  </span>
                )}
                {report.skipped > 0 && (
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 12, background: "#FDF3DB", color: "#8A6116" }}>
                    {report.skipped} skipped
                  </span>
                )}
                {report.failed > 0 && (
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 12, background: "#FCEBEB", color: "#A32D2D" }}>
                    {report.failed} failed
                  </span>
                )}
              </div>

              {report.results?.length > 0 && (
                <div style={{ border: `0.5px solid ${C.border}`, borderRadius: C.radMd, maxHeight: 220, overflowY: "auto" }}>
                  {report.results.map((r, i) => {
                    const style = {
                      success: { icon: "circle-check", color: "#3B6D11" },
                      updated: { icon: "refresh", color: "#1D4E89" },
                      skipped: { icon: "alert-triangle", color: "#8A6116" },
                      failed:  { icon: "alert-circle", color: "#A32D2D" },
                    }[r.status] || { icon: "alert-circle", color: C.faint }
                    return (
                      <div key={i} style={{ padding: "8px 12px", borderBottom: i === report.results.length - 1 ? "none" : `0.5px solid ${C.border}`, display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <Icon n={style.icon} size={14} style={{ color: style.color, marginTop: 1 }} />
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <p style={{ fontSize: 11, color: C.text }}>Row {r.row} — {r.name}</p>
                          {r.reason && <p style={{ fontSize: 10, color: style.color, marginTop: 2 }}>{r.reason}</p>}
                          {r.warnings?.map((w, wi) => (
                            <p key={wi} style={{ fontSize: 10, color: "#854F0B", marginTop: 2 }}>{w}</p>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 18px", borderTop: `0.5px solid ${C.border}`, flexShrink: 0, display: "flex", gap: 8 }}>
          <button onClick={onClose} style={{ ...btnBase, flex: "0 0 auto" }}>
            {report ? "Done" : "Cancel"}
          </button>
          {!report && (
            <button onClick={handleImport} disabled={!file || busy} style={{ ...btnPrimary, flex: 1, justifyContent: "center", opacity: (!file || busy) ? .6 : 1 }}>
              <Icon n="upload" size={13} />
              {busy ? "Importing…" : "Import products"}
            </button>
          )}
          {report && (report.failed > 0 || report.skipped > 0) && (
            <button onClick={reset} style={{ ...btnBase, flex: 1, justifyContent: "center" }}>
              <Icon n="refresh" size={13} />
              Upload another file
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
