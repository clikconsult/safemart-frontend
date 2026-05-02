import { LegalLayout, LegalSection, LegalList } from "./LegalLayout"

export default function ReturnPolicy() {
  return (
    <LegalLayout label="Policy" title="Return & Refund Policy" lastUpdated="April 2025">
      <LegalSection title="Return Eligibility">
        <p>
          You may return a product within{" "}
          <strong className="text-on-surface font-semibold">7 days</strong> of
          delivery if:
        </p>
        <LegalList
          items={[
            "The product is defective or damaged upon arrival",
            "The product received is different from what was ordered",
            "The product is unused and in original packaging with all accessories",
          ]}
        />
        <p className="mt-3">Items not eligible for return:</p>
        <LegalList
          items={[
            "Products that have been installed, used, or tampered with",
            "Products with missing or damaged original packaging",
            "Products returned after the 7-day window",
            "Custom or special-order items",
          ]}
        />
      </LegalSection>
      <LegalSection title="How to Initiate a Return">
        <div className="space-y-4 mt-3">
          {[
            {
              step: "01",
              title: "Contact Us",
              desc: "Email returns@safemart.ng within 7 days of receiving your order. Include your order number and reason for return.",
            },
            {
              step: "02",
              title: "Await Approval",
              desc: "Our team will review your request within 24-48 hours and send return instructions if approved.",
            },
            {
              step: "03",
              title: "Ship the Item",
              desc: "Securely repack in original packaging and ship to our returns address using a trackable method.",
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4 p-4 bg-surface-container-low rounded-sm ghost-border">
              <span className="font-headline font-black text-2xl text-outline-variant shrink-0 leading-none">
                {step}
              </span>
              <div>
                <p className="font-headline font-bold text-sm text-on-surface mb-1">{title}</p>
                <p className="font-body text-xs text-secondary leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </LegalSection>
      <LegalSection title="Refund Process">
        <LegalList
          items={[
            "Approved refunds are processed within 5-7 business days",
            "Refunds are issued via the original payment method",
            "Original shipping fees are non-refundable unless the return is due to our error",
          ]}
        />
      </LegalSection>
      <LegalSection title="Contact for Returns">
        <div className="p-5 bg-surface-container-low rounded-md ghost-border space-y-1">
          <p className="font-headline font-bold text-sm text-on-surface">Safemart Returns</p>
          <p>Email: returns@safemart.ng</p>
          <p>Phone: +234 800 000 0000</p>
          <p>Hours: Monday - Friday, 9am - 5pm WAT</p>
        </div>
      </LegalSection>
    </LegalLayout>
  )
}
