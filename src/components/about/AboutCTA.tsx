import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AboutCTA() {
  return (
    <section className="py-16 px-4 bg-blue-50 dark:bg-gray-800/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Ready to Join Our Success Story?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Join the hundreds of successful retailers who&apos;ve made Criss Cross
          Ltd their trusted partner. Because in business, as in life, trust
          isn&apos;t given—it&apos;s earned, one delivery at a time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white dark:from-blue-600 dark:to-purple-500 hover:opacity-80 transition-opacity duration-200"
          >
            <Link href="/contact">
              <Phone className="h-5 w-5 mr-2" />
              Get in Touch
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/products">
              View Our Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
