import { createPageMetadata } from "@/lib/seo";
import {
  ContactHero,
  ContactInfoSection,
  ContactMapSection,
  ContactFormSection,
} from "@/components/contact";

export const metadata = createPageMetadata(
  "Contact Us",
  "Contact Criss Cross Ltd - Kenya's trusted wholesale FMCG distributor. Located in Nairobi on Mombasa Road. Call +254 707 451 536 or email info@crisscross.co.ke for wholesale inquiries, partnerships, and business opportunities."
);

export default function ContactPage() {
  return (
    <div className="mx-auto py-12 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-900/50">
      <ContactHero />

      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <ContactInfoSection />
        <ContactMapSection />
      </div>

      <ContactFormSection />
    </div>
  );
}
