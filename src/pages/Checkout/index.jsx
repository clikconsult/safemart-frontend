import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { useAuth } from "../../context/AuthContext"
import { ordersApi, paymentApi } from "../../api/services"
import { Price } from "../../components/ui"

const STATES = ["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"]
const STEPS = ["Address", "Payment", "Review"]

export default function Checkout() {
  const { cart, fetchCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [address, setAddress] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    street: "",
    city: "",
    state: "Rivers",
    country: "Nigeria",
  })
  const [payment, setPayment] = useState("paystack")
  const [loading, setLoading] = useState(false)

  const subtotal = cart?.totalPrice || 0
  const shipping = subtotal >= 50000 ? 0 : 2500
  const total = subtotal + shipping

  const setAddr = key => event => setAddress(current => ({ ...current, [key]: event.target.value }))

  useEffect(() => {
    setAddress(current => ({
      ...current,
      fullName: current.fullName || user?.fullName || "",
      phone: current.phone || user?.phone || "",
    }))
  }, [user])

  const handlePlaceOrder = async () => {
    try {
      if (!cart?.items?.length) {
        toast.error("Your cart is empty")
        navigate("/cart")
        return
      }

      setLoading(true)
      const orderRes = await ordersApi.create({
        shippingAddress: {
          fullName: address.fullName.trim(),
          phone: address.phone.trim(),
          street: address.street.trim(),
          city: address.city.trim(),
          state: address.state,
          country: address.country,
        },
        paymentMethod: payment,
      })
      const order = orderRes.data.data

      if (payment === "paystack") {
        const payRes = await paymentApi.initialize(order._id)
        window.location.href = payRes.data.data.authorizationUrl
      } else {
        toast.success("Order placed!")
        await fetchCart()
        navigate(`/orders/${order._id}`)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-10">
          <span className="label-overline text-tertiary mb-3 block">Secure</span>
          <h1 className="headline-lg text-4xl text-on-surface mb-8">Checkout</h1>

          <div className="flex items-center gap-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 ${i <= step ? "opacity-100" : "opacity-40"}`}>
                  <div
                    className={`w-6 h-6 flex items-center justify-center text-[10px] font-headline font-bold rounded-sm transition-colors ${
                      i < step
                        ? "bg-on-surface text-inverse-on-surface"
                        : i === step
                          ? "bg-tertiary-container text-on-tertiary-container"
                          : "bg-surface-container-high text-secondary"
                    }`}
                  >
                    {i < step ? "\u2713" : i + 1}
                  </div>
                  <span className={`font-label text-[10px] uppercase tracking-wider ${i === step ? "text-on-surface" : "text-secondary"}`}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && <div className="w-8 h-px bg-outline-variant/30 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-main py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            {step === 0 && (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border anim-fade-up">
                <h2 className="headline-md text-xl text-on-surface mb-7">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="label-overline mb-2 block">Full Name</label>
                    <input type="text" required value={address.fullName} onChange={setAddr("fullName")} className="input-field" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="label-overline mb-2 block">Phone Number</label>
                    <input type="tel" required value={address.phone} onChange={setAddr("phone")} className="input-field" placeholder="+234 800 000 0000" />
                  </div>
                  <div>
                    <label className="label-overline mb-2 block">Street Address</label>
                    <input type="text" required value={address.street} onChange={setAddr("street")} className="input-field" placeholder="12 Aba Road" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label-overline mb-2 block">City</label>
                      <input type="text" required value={address.city} onChange={setAddr("city")} className="input-field" placeholder="Port Harcourt" />
                    </div>
                    <div>
                      <label className="label-overline mb-2 block">State</label>
                      <select value={address.state} onChange={setAddr("state")} className="input-field">
                        {STATES.map(state => <option key={state}>{state}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!address.fullName || !address.phone || !address.street || !address.city) {
                      toast.error("Fill in all required shipping details")
                      return
                    }
                    setStep(1)
                  }}
                  className="btn-primary mt-7"
                >
                  Continue to Payment &rarr;
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border anim-fade-up">
                <div className="flex items-center gap-4 mb-7">
                  <button onClick={() => setStep(0)} className="label-overline text-secondary hover:text-on-surface transition-colors">&larr; Back</button>
                  <h2 className="headline-md text-xl text-on-surface">Payment Method</h2>
                </div>
                <div className="space-y-3 mb-7">
                  {[
                    { value: "paystack", label: "Pay with Paystack", desc: "Cards, bank transfer, USSD - instant and secure" },
                    { value: "cash_on_delivery", label: "Cash on Delivery", desc: "Place the order and pay when it arrives" },
                  ].map(option => (
                    <label
                      key={option.value}
                      className={`flex items-start gap-4 p-5 rounded-sm cursor-pointer transition-all ${
                        payment === option.value ? "bg-on-surface text-inverse-on-surface" : "bg-surface-container hover:bg-surface-container-high"
                      }`}
                    >
                      <input type="radio" name="payment" value={option.value} checked={payment === option.value} onChange={() => setPayment(option.value)} className="mt-1 shrink-0" />
                      <div>
                        <p className={`font-headline font-bold text-sm mb-0.5 ${payment === option.value ? "text-inverse-on-surface" : "text-on-surface"}`}>{option.label}</p>
                        <p className={`font-body text-xs ${payment === option.value ? "text-inverse-on-surface/60" : "text-secondary"}`}>{option.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="btn-primary">Review Order &rarr;</button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-surface-container-low rounded-md p-7 ghost-border anim-fade-up">
                <div className="flex items-center gap-4 mb-7">
                  <button onClick={() => setStep(1)} className="label-overline text-secondary hover:text-on-surface transition-colors">&larr; Back</button>
                  <h2 className="headline-md text-xl text-on-surface">Review & Place Order</h2>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="bg-surface-container rounded-sm p-4">
                    <p className="label-overline mb-1.5">Shipping To</p>
                    <p className="font-body text-sm text-on-surface">{address.fullName}</p>
                    <p className="font-body text-sm text-on-surface">{address.phone}</p>
                    <p className="font-body text-sm text-on-surface">{address.street}, {address.city}, {address.state}, Nigeria</p>
                  </div>
                  <div className="bg-surface-container rounded-sm p-4">
                    <p className="label-overline mb-1.5">Payment</p>
                    <p className="font-body text-sm text-on-surface capitalize">{payment.replace("_", " ")}</p>
                  </div>
                </div>

                <button onClick={handlePlaceOrder} disabled={loading} className="btn-primary w-full">
                  {loading ? "Processing..." : payment === "paystack" ? `Pay \u20A6${total.toLocaleString()}` : "Place Order"}
                </button>

                <p className="font-label text-[10px] text-secondary text-center mt-4 flex items-center justify-center gap-1.5 uppercase tracking-wider">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  Secured by SSL encryption
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-surface-container-low rounded-md p-6 ghost-border sticky top-28">
              <h2 className="headline-md text-base text-on-surface mb-5">Order Summary</h2>

              <div className="space-y-3 mb-5 max-h-52 overflow-y-auto scrollbar-hide divide-y divide-outline-variant/10">
                {cart?.items?.map(item => (
                  <div key={item._id} className="flex items-center gap-3 pt-3 first:pt-0">
                    <div className="w-11 h-11 bg-surface-container rounded-sm overflow-hidden shrink-0">
                      {item.product?.images?.[0] && <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <p className="font-body text-xs text-on-surface flex-1 line-clamp-2">{item.product?.name}</p>
                    <span className="font-label text-[10px] text-secondary shrink-0">&times;{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-outline-variant/20 pt-4 space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="font-body text-secondary">Subtotal</span>
                  <Price amount={subtotal} className="text-sm text-on-surface" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-body text-secondary">Shipping</span>
                  {shipping === 0
                    ? <span className="font-label text-[10px] uppercase tracking-wider text-on-surface font-bold">Free</span>
                    : <Price amount={shipping} className="text-sm text-on-surface" />}
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-outline-variant/20">
                  <span className="font-headline text-sm text-on-surface">Total</span>
                  <Price amount={total} className="text-base text-on-surface" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
