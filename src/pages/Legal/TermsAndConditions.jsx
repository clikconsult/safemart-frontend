import { LegalLayout, LegalSection, LegalList } from "./LegalLayout"

export default function TermsAndConditions() {
  return (
    <LegalLayout label="Legal" title="Terms & Conditions" lastUpdated="April 2025">
      <LegalSection title="1. Agreement to Terms">
        <p>
          By accessing or using Safemart and purchasing our products, you agree
          to be bound by these Terms and Conditions.
        </p>
      </LegalSection>
      <LegalSection title="2. Products and Pricing">
        <p>
          All products are subject to availability. Prices are in Nigerian Naira
          (NGN) and may be modified without prior notice.
        </p>
        <LegalList
          items={[
            "Product descriptions are for informational purposes and may vary slightly from the actual product",
            "We reserve the right to limit quantities of any product",
            "Promotional pricing applies only during the specified period",
          ]}
        />
      </LegalSection>
      <LegalSection title="3. Orders and Payment">
        <LegalList
          items={[
            "Orders are confirmed only after successful payment processing",
            "We accept Paystack (cards, bank transfer, USSD) and direct bank transfer",
            "You must be 18 years or older to make a purchase",
            "Orders cannot be modified after payment is confirmed",
          ]}
        />
      </LegalSection>
      <LegalSection title="4. Product Warranty">
        <p>
          All products come with the manufacturer's warranty. Warranty does not
          cover damage caused by misuse or unauthorized modifications.
        </p>
      </LegalSection>
      <LegalSection title="5. Limitation of Liability">
        <p>
          Safemart shall not be liable for any indirect or consequential
          damages. Our total liability shall not exceed the amount paid for the
          specific product.
        </p>
      </LegalSection>
      <LegalSection title="6. Governing Law">
        <p>
          These terms are governed by the laws of the Federal Republic of
          Nigeria. Disputes are subject to the courts of Rivers State, Nigeria.
        </p>
      </LegalSection>
      <LegalSection title="7. Contact Us">
        <div className="mt-3 p-5 bg-surface-container-low rounded-md ghost-border space-y-1">
          <p className="font-headline font-bold text-sm text-on-surface">Safemart</p>
          <p>Email: legal@safemart.ng</p>
          <p>Phone: +234 800 000 0000</p>
        </div>
      </LegalSection>
    </LegalLayout>
  )
}
