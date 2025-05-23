import { Companies } from "@/components/home/companies/Companies";
import Hero from "@/components/home/Hero";
import { Explore } from "@/components/home/Explore";
import { OrganizationSchema, WebsiteSchema } from "@/components/structured-data/OrganizationSchema";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Home",
  description: "Criss Cross Ltd is Kenya's trusted wholesale FMCG distributor offering competitive prices on cooking oil, soaps, rice, sugar, water, juices and more. Reliable delivery across Nairobi and Kenya.",
  keywords: [
    "wholesale FMCG distributor Kenya",
    "fast moving consumer goods Nairobi",
    "wholesale food products Kenya",
    "bulk consumer goods distributor",
    "FMCG supply chain Kenya",
    "wholesale household products Nairobi"
  ]
});

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <div className="bg-gradient-to-b from-gray-100/70 to-gray-100/30 dark:bg-gradient-to-b dark:from-gray-900/70 dark:to-gray-900/30 dark:text-gray-100 min-h-screen">
        <Hero />
        <Companies />
        <Explore />
      </div>
    </>
  );
}
