import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { paymentApi } from "../../api/services"
import { useCart } from "../../context/CartContext"
import { Spinner } from "../../components/ui"

export default function PaymentCallback() {
  const [searchParams] = useSearchParams()
  const { fetchCart }  = useCart()
  const reference      = searchParams.get("reference") || searchParams.get("trxref")
  const [status, setStatus] = useState("verifying")

  useEffect(() => {
    if (!reference) { setStatus("failed"); return }
    paymentApi.verify(reference)
      .then(() => { setStatus("success"); fetchCart() })
      .catch(() => setStatus("failed"))
  }, [reference, fetchCart])

  return (
    <div className="bg-surface min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        {status === "verifying" && (
          <>
            <Spinner size="lg" className="mx-auto mb-8" />
            <h1 className="headline-lg text-2xl text-on-surface mb-2">Verifying payment</h1>
            <p className="font-body text-sm text-secondary">Please wait while we confirm your transaction...</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-8 ghost-border">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-on-surface"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span className="label-overline text-tertiary block mb-3">Confirmed</span>
            <h1 className="headline-lg text-3xl text-on-surface mb-3">Payment successful</h1>
            <p className="font-body text-sm text-secondary mb-10 leading-relaxed">Your order has been placed and is being processed. You will receive a confirmation shortly.</p>
            <div className="flex gap-3 justify-center">
              <Link to="/orders" className="btn-primary">View Orders</Link>
              <Link to="/products" className="btn-secondary">Continue Shopping</Link>
            </div>
          </>
        )}
        {status === "failed" && (
          <>
            <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center mx-auto mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-error"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </div>
            <span className="label-overline text-error block mb-3">Failed</span>
            <h1 className="headline-lg text-3xl text-on-surface mb-3">Payment failed</h1>
            <p className="font-body text-sm text-secondary mb-10 leading-relaxed">We could not verify your payment. Please try again or contact our support team.</p>
            <div className="flex gap-3 justify-center">
              <Link to="/cart" className="btn-primary">Return to Cart</Link>
              <Link to="/orders" className="btn-secondary">My Orders</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

