export function LegalLayout({ label, title, lastUpdated, children }) {
  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">{label}</span>
          <h1 className="headline-lg text-4xl text-on-surface">{title}</h1>
          {lastUpdated && (
            <p className="font-label text-[10px] text-secondary uppercase tracking-wider mt-2">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
      </div>
      <div className="container-main py-14">
        <div className="max-w-3xl space-y-10">{children}</div>
      </div>
    </div>
  )
}

export function LegalSection({ title, children }) {
  return (
    <section>
      <h2 className="font-headline font-bold text-lg text-on-surface mb-4 pb-3 border-b border-outline-variant/20">
        {title}
      </h2>
      <div className="space-y-3 font-body text-sm text-secondary leading-relaxed">{children}</div>
    </section>
  )
}

export function LegalList({ items }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="w-1 h-1 rounded-full bg-tertiary mt-2 shrink-0" />
          <span className="font-body text-sm text-secondary leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}
