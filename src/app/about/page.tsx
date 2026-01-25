import { createPageMetadata } from "@/lib/seo";
import { OrganizationSchema } from "@/components/structured-data/OrganizationSchema";
import {
  AboutHero,
  TimelineSection,
  ValuesSection,
  AboutCTA,
} from "@/components/about";

export const metadata = createPageMetadata(
  "About Us",
  "Learn about Criss Cross Ltd's 25-year journey as Kenya's trusted wholesale FMCG distributor. Discover our story, values, and commitment to supporting Kenyan retailers since 1999."
);

export default function AboutPage() {
  return (
    <>
      <OrganizationSchema />
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-900/50">
        <AboutHero />
        <TimelineSection />
        <ValuesSection />
        <AboutCTA />
      </div>
    </>
  );
}
