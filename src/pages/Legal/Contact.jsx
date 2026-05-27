import { useState } from "react"
import toast from "react-hot-toast"
import { contactApi } from "../../api/services"

const SUBJECTS = [
  "Product Enquiry",
  "Order Support",
  "Technical Assistance",
  "Returns & Refunds",
  "Shipping & Delivery",
  "Business / Wholesale",
  "Other",
]

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const set = (key) => (e) => setForm((current) => ({ ...current, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const payload = {
        ...form,
        phone: form.phone.trim(),
      }

      const res = await contactApi.submit(payload)
      toast.success(res.data?.message || "Message sent - we will be in touch within 24 hours")
      setForm({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch (err) {
      toast.error(err.response?.data?.message || "We could not send your message right now")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-12">
          <span className="label-overline text-tertiary mb-3 block">Get in Touch</span>
          <h1 className="headline-lg text-4xl text-on-surface">Contact Us</h1>
          <p className="font-body text-sm text-secondary mt-3 max-w-md leading-relaxed">
            Have a question about a product, need installation advice, or want
            to discuss a large project? We are here to help.
          </p>
        </div>
      </div>

      <div className="container-main py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
          <div className="lg:col-span-2 space-y-5">
            {[
              {
                label: "Email",
                value: "hello@safemartng.com",
                sub: "We reply within 24 hours",
                icon: "M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z",
              },
              {
                label: "Phone",
                value: "+234 802 639 5499",
                sub: "Mon - Sat, 8am - 6pm WAT",
                icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.64 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.83-.83a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
              },
              {
                label: "Location",
                value: "Uyo, Akwa Ibom State",
                sub: "Nigeria",
                icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 bg-surface-container-low rounded-md ghost-border">
                <div className="w-10 h-10 bg-on-surface rounded-sm flex items-center justify-center shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    className="text-inverse-on-surface"
                  >
                    <path d={item.icon} />
                  </svg>
                </div>
                <div>
                  <p className="label-overline mb-1">{item.label}</p>
                  <p className="font-headline font-bold text-sm text-on-surface">{item.value}</p>
                  <p className="font-body text-xs text-secondary mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
            <div className="p-5 bg-surface-container-low rounded-md ghost-border">
              <p className="label-overline mb-4">Business Hours</p>
              <div className="space-y-2">
                {[
                  ["Monday - Friday", "8:00am - 6:00pm"],
                  ["Saturday", "9:00am - 4:00pm"],
                  ["Sunday", "Closed"],
                ].map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm gap-4">
                    <span className="font-body text-secondary">{day}</span>
                    <span className="font-headline font-semibold text-on-surface text-right">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-surface-container-low rounded-md p-7 ghost-border">
              <h2 className="headline-md text-xl text-on-surface mb-7">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-overline mb-2 block">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={set("name")}
                      className="input-field"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="label-overline mb-2 block">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      className="input-field"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-overline mb-2 block">Phone</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={set("phone")}
                      className="input-field"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                  <div>
                    <label className="label-overline mb-2 block">Subject</label>
                    <select required value={form.subject} onChange={set("subject")} className="input-field">
                      <option value="">Select a subject</option>
                      {SUBJECTS.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label-overline mb-2 block">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={set("message")}
                    className="input-field resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
