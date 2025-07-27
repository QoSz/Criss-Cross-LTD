import { Companies } from "@/components/home/companies/Companies";
import Explore from "@/components/home/Explore";
import Hero from "@/components/home/Hero";
import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema } from "@/components/structured-data/OrganizationSchema";
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
    "wholesale household products Nairobi",
    "competitive wholesale prices Kenya",
    "reliable FMCG delivery Nairobi",
    "wholesale cooking oil distributor",
    "wholesale soap distributor Kenya",
    "bulk rice supplier Nairobi",
    "wholesale sugar distributor",
    "wholesale beverages Kenya",
    "FMCG procurement Kenya",
    "wholesale product sourcing",
    "bulk purchasing FMCG",
    "wholesale trade Kenya",
    "consumer goods wholesale market",
    "FMCG distribution network",
    "wholesale supply chain solutions",
    "bulk product distributor Nairobi",
    "wholesale merchandise Kenya",
    "commercial FMCG supplier"
  ]
});

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <LocalBusinessSchema />
      <div className="bg-gradient-to-b from-gray-100/70 to-gray-100/30 dark:bg-gradient-to-b dark:from-gray-900/70 dark:to-gray-900/30 dark:text-gray-100 min-h-screen">
        <Hero />
        <Companies />
        <Explore />
      </div>
    </>
  );
}
