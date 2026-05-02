import { LegalLayout, LegalSection, LegalList } from "./LegalLayout"

export default function PrivacyPolicy() {
  return (
    <LegalLayout label="Legal" title="Privacy Policy" lastUpdated="April 2025">
      <LegalSection title="1. Introduction">
        <p>
          Safemart is committed to protecting your personal information. This
          Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you visit our website or make a purchase.
        </p>
        <p>
          By using our services, you agree to the collection and use of
          information in accordance with this policy.
        </p>
      </LegalSection>
      <LegalSection title="2. Information We Collect">
        <p>We collect the following types of information:</p>
        <LegalList
          items={[
            "Personal identification - full name, email address, phone number",
            "Shipping and billing address",
            "Payment information - processed securely through Paystack, we do not store card details",
            "Order history and transaction data",
            "Device and browser information when you visit our website",
            "Communications you send us via email or contact forms",
          ]}
        />
      </LegalSection>
      <LegalSection title="3. How We Use Your Information">
        <LegalList
          items={[
            "Process and fulfill your orders",
            "Send order confirmations and shipping updates",
            "Respond to your customer service requests",
            "Send promotional communications only with your consent",
            "Improve our website and product offerings",
            "Comply with legal obligations",
            "Prevent fraud and ensure the security of our platform",
          ]}
        />
      </LegalSection>
      <LegalSection title="4. Information Sharing">
        <p>We do not sell or rent your personal information. We may share it with:</p>
        <LegalList
          items={[
            "Paystack - to process payments securely",
            "Cloudinary - to store and serve product images",
            "Delivery partners - to fulfill and ship your orders",
            "Legal authorities - when required by law",
          ]}
        />
      </LegalSection>
      <LegalSection title="5. Data Security">
        <p>
          We implement industry-standard security measures including SSL
          encryption. However, no method of transmission over the internet is
          100% secure.
        </p>
      </LegalSection>
      <LegalSection title="6. Your Rights">
        <LegalList
          items={[
            "Access the personal information we hold about you",
            "Request correction of inaccurate information",
            "Request deletion of your personal data",
            "Opt out of marketing communications at any time",
          ]}
        />
      </LegalSection>
      <LegalSection title="7. Contact Us">
        <div className="mt-3 p-5 bg-surface-container-low rounded-md ghost-border space-y-1">
          <p className="font-headline font-bold text-sm text-on-surface">Safemart</p>
          <p>Email: privacy@safemart.ng</p>
          <p>Phone: +234 800 000 0000</p>
          <p>Address: Port Harcourt, Rivers State, Nigeria</p>
        </div>
      </LegalSection>
    </LegalLayout>
  )
}
