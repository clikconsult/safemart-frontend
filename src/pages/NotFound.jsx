import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="bg-surface min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-headline font-black text-[10rem] leading-none text-surface-container-highest select-none mb-4">404</p>
      <span className="label-overline text-tertiary block mb-3">Not Found</span>
      <h1 className="headline-lg text-3xl text-on-surface mb-3">Page not found</h1>
      <p className="font-body text-sm text-secondary mb-10 max-w-xs leading-relaxed">The page you're looking for doesn't exist or may have been moved.</p>
      <Link to="/" className="btn-primary">Return Home</Link>
    </div>
  )
}

