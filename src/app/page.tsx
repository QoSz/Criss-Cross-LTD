import { Companies } from "@/components/home/companies/Companies";
import Hero from "@/components/home/Hero";
import { Explore } from "@/components/home/Explore";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-100/70 to-gray-100/30 dark:bg-gradient-to-b dark:from-gray-900/70 dark:to-gray-900/30 dark:text-gray-100 min-h-screen">
      <Hero />
      <Companies />
      <Explore />
    </div>
  );
}
