import { LegalLayout, LegalSection, LegalList } from "./LegalLayout"

export default function ShippingPolicy() {
  return (
    <LegalLayout label="Policy" title="Shipping Policy" lastUpdated="April 2025">
      <LegalSection title="Shipping Rates">
        <div className="mt-2 overflow-hidden rounded-md ghost-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-container-high">
                <th className="text-left px-4 py-3 font-headline font-bold text-xs text-on-surface uppercase tracking-wider">
                  Order Value
                </th>
                <th className="text-left px-4 py-3 font-headline font-bold text-xs text-on-surface uppercase tracking-wider">
                  Shipping Fee
                </th>
                <th className="text-left px-4 py-3 font-headline font-bold text-xs text-on-surface uppercase tracking-wider">
                  Estimated Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15">
              {[
                ["Below N50,000", "N2,500", "3-5 business days"],
                ["N50,000 and above", "Free", "3-5 business days"],
                ["Same-day (Lagos)", "N5,000", "Same day (order before 12pm)"],
              ].map(([value, fee, time]) => (
                <tr key={value} className="bg-surface-container-lowest">
                  <td className="px-4 py-3 font-body text-sm text-on-surface">{value}</td>
                  <td className="px-4 py-3 font-headline font-semibold text-sm text-on-surface">{fee}</td>
                  <td className="px-4 py-3 font-body text-sm text-secondary">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>
      <LegalSection title="Delivery Timeframes">
        <LegalList
          items={[
            "Port Harcourt and Rivers State - 1-2 business days",
            "Lagos, Abuja, and major cities - 2-3 business days",
            "Other states - 3-5 business days",
            "Remote or rural areas - 5-7 business days",
          ]}
        />
      </LegalSection>
      <LegalSection title="Order Processing">
        <p>
          Orders are processed within{" "}
          <strong className="text-on-surface font-semibold">1-2 business days</strong>{" "}
          after payment confirmation.
        </p>
        <LegalList
          items={[
            "Order confirmation email sent immediately after payment",
            "Shipping confirmation with tracking sent once dispatched",
            "Processing may be longer during sales events or peak periods",
          ]}
        />
      </LegalSection>
      <LegalSection title="Contact for Shipping">
        <div className="p-5 bg-surface-container-low rounded-md ghost-border space-y-1">
          <p className="font-headline font-bold text-sm text-on-surface">Safemart Logistics</p>
          <p>Email: shipping@safemart.ng</p>
          <p>Phone: +234 800 000 0000</p>
          <p>Hours: Monday - Saturday, 8am - 6pm WAT</p>
        </div>
      </LegalSection>
    </LegalLayout>
  )
}
