import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Trophy, Handshake, Target, Heart, Phone, ArrowRight } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
import { OrganizationSchema } from "@/components/structured-data/OrganizationSchema";
import Link from "next/link";

export const metadata = createPageMetadata(
  "About Us",
  "Learn about Criss Cross Ltd's 25-year journey as Kenya's trusted wholesale FMCG distributor. Discover our story, values, and commitment to supporting Kenyan retailers since 1999."
);

export default function AboutPage() {
  return (
    <>
      <OrganizationSchema />
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-900/50">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-blue-400 text-transparent bg-clip-text dark:from-blue-400 dark:to-blue-600">
              25 Years of Trust and Growth
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              From a small warehouse with two delivery trucks to Kenya&apos;s most trusted wholesale FMCG distributor. 
              This is the story of Criss Cross Ltd.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">25+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years in Business</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">30+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Retail Partners</div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 px-4 bg-blue-50 dark:bg-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
              Our Journey Through the Years
            </h2>
            
            <div className="space-y-12">
              {/* 1999 - The Beginning */}
              <Card className="p-8 rounded-[1.618rem] hover:shadow-lg transition-all duration-300 dark:hover:shadow-gray-800/50">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full">
                      <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">1999 - The Beginning</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Two ambitious entrepreneurs saw an opportunity in Kenya&apos;s uncertain retail landscape. Starting with 
                      a small warehouse in Industrial Area, Nairobi, and just two delivery trucks, they had a vision that 
                      went beyond selling products—they wanted to solve the reliability problem that was crippling small retailers.
                    </p>
                  </div>
                </div>
              </Card>

              {/* 2000s - Building Trust */}
              <Card className="p-8 rounded-[1.618rem] hover:shadow-lg transition-all duration-300 dark:hover:shadow-gray-800/50">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
                      <Handshake className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400">Early 2000s - Building Trust</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      While others focused on quick profits, we made a radical decision: customer loyalty over short-term gains. 
                      During challenging economic periods when many businesses collapsed, Criss Cross Ltd not only survived but 
                      thrived by becoming the dependable partner retailers could count on.
                    </p>
                  </div>
                </div>
              </Card>

              {/* 2005 - Word of Mouth Growth */}
              <Card className="p-8 rounded-[1.618rem] hover:shadow-lg transition-all duration-300 dark:hover:shadow-gray-800/50">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full">
                      <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-purple-600 dark:text-purple-400">2005 - Organic Growth</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Something remarkable happened&mdash;word-of-mouth recommendations grew faster than our marketing budget ever could. 
                      Retailers weren&apos;t just buying from us, they were recommending us to their competitors. This unprecedented 
                      trust proved that when you prioritize customer success, profits follow naturally.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Supporting Local */}
              <Card className="p-8 rounded-[1.618rem] hover:shadow-lg transition-all duration-300 dark:hover:shadow-gray-800/50">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-full">
                      <Heart className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-orange-600 dark:text-orange-400">Supporting Local Brands</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      While international brands flooded the Kenyan market, we became champions of local and regional brands. 
                      By supporting local manufacturers, we didn&apos;t just distribute products&mdash;we helped create jobs, strengthen 
                      the economy, and give Kenyan families access to affordable, quality goods.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Today */}
              <Card className="p-8 rounded-[1.618rem] hover:shadow-lg transition-all duration-300 dark:hover:shadow-gray-800/50 border-2 border-blue-200 dark:border-blue-700">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full">
                      <Trophy className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-yellow-600 dark:text-yellow-400">Today - Industry Leader</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      We&apos;re not just a distributor&mdash;we&apos;re the invisible thread connecting hundreds of Kenyan businesses. 
                      Our trucks carry the hopes and ambitions of small business owners across the country, ensuring 
                      families have access to essential products while helping retailers compete and grow.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
              What Drives Us
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 rounded-[1.618rem] hover:shadow-lg transition-all duration-300 dark:hover:shadow-gray-800/50 text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full w-fit mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Customer Success First</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We understand that retailers don&apos;t just buy products&mdash;they buy peace of mind. When you trust us 
                  with your livelihood, we take that responsibility seriously.
                </p>
              </Card>

              <Card className="p-6 rounded-[1.618rem] hover:shadow-lg transition-all duration-300 dark:hover:shadow-gray-800/50 text-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-fit mx-auto mb-4">
                  <Handshake className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Reliable Partnerships</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We&apos;ve built our reputation on consistent reliability, genuine understanding, and mutual growth. 
                  Trust isn&apos;t given&mdash;it&apos;s earned, one delivery at a time.
                </p>
              </Card>

              <Card className="p-6 rounded-[1.618rem] hover:shadow-lg transition-all duration-300 dark:hover:shadow-gray-800/50 text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full w-fit mx-auto mb-4">
                  <Heart className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Community Impact</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Business success isn&apos;t measured just in profits, but in the number of other businesses we help succeed. 
                  When Kenyan retailers prosper, Kenya prospers.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900/70">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-gray-100 mb-6 italic">
              &ldquo;We didn&apos;t just weather the storm&mdash;we became the shelter for hundreds of retailers who needed a dependable partner.&rdquo;
            </blockquote>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              This philosophy has guided every decision we&apos;ve made for over two decades.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-blue-50 dark:bg-gray-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Ready to Join Our Success Story?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the hundreds of successful retailers who&apos;ve made Criss Cross Ltd their trusted partner. 
              Because in business, as in life, trust isn&apos;t given&mdash;it&apos;s earned, one delivery at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white dark:from-blue-600 dark:to-purple-500 hover:opacity-80 transition-opacity duration-200">
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
      </div>
    </>
  );
}