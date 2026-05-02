// Spinner
export function Spinner({ size = "md", className = "" }) {
  const sizes = { sm: "w-4 h-4 border", md: "w-5 h-5 border-2", lg: "w-7 h-7 border-2" }

  return <div className={`${sizes[size] || sizes.md} border-surface-container-high border-t-on-surface rounded-full animate-spin ${className}`} />
}

export function LoadingPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}

// Skeleton
export function Skeleton({ className = "" }) {
  return <div className={`anim-shimmer rounded-md ${className}`} />
}

// Empty state
export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {icon && <div className="text-outline-variant mb-6">{icon}</div>}
      <h3 className="headline-md text-xl text-on-surface mb-2">{title}</h3>
      {description && <p className="font-body text-sm text-secondary max-w-xs mb-8 leading-relaxed">{description}</p>}
      {action}
    </div>
  )
}

// Status badge
const BADGE = {
  pending: "bg-surface-container-high text-on-surface-variant",
  processing: "bg-tertiary-container/20 text-tertiary",
  shipped: "bg-surface-container-highest text-on-surface-variant",
  delivered: "bg-surface-container-high text-on-surface",
  cancelled: "bg-error-container text-error",
  paid: "bg-surface-container-high text-on-surface",
  failed: "bg-error-container text-error",
  refunded: "bg-surface-container-highest text-secondary",
}

export function Badge({ status }) {
  return <span className={`status-badge ${BADGE[status] || "bg-surface-container-high text-secondary"}`}>{status}</span>
}

// Price
export function Price({ amount, className = "" }) {
  return <span className={`price-text ${className}`}>&#8358;{Number(amount ?? 0).toLocaleString("en-NG")}</span>
}

// Stars
export function Stars({ rating, count, size = 11 }) {
  const roundedRating = Math.round(rating || 0)

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={i <= roundedRating ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            className={i <= roundedRating ? "text-tertiary" : "text-outline-variant"}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      {count !== undefined && <span className="font-label text-[10px] text-secondary">({count})</span>}
    </div>
  )
}

// Pagination
export function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="w-9 h-9 flex items-center justify-center font-label text-sm text-secondary hover:text-on-surface hover:bg-surface-container rounded-sm disabled:opacity-30 transition-colors"
      >
        &larr;
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 flex items-center justify-center font-label text-sm rounded-sm transition-colors ${
            p === page ? "bg-primary text-on-primary font-bold" : "text-secondary hover:bg-surface-container hover:text-on-surface"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pages}
        className="w-9 h-9 flex items-center justify-center font-label text-sm text-secondary hover:text-on-surface hover:bg-surface-container rounded-sm disabled:opacity-30 transition-colors"
      >
        &rarr;
      </button>
    </div>
  )
}
