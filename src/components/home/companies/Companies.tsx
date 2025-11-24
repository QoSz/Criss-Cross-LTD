"use client";

import { LogoCarousel } from "@/components/ui/logo-carousel";
import { Card, CardContent } from "@/components/ui/card";
import { companyLogos } from "./company-logos-data";

function Companies() {
    // O(n) duplicate removal using Set (optimized from O(n²))
    const seen = new Set<string>();
    const uniqueCompanyLogos = companyLogos.filter(logo => {
        if (seen.has(logo.src)) {
            return false;
        }
        seen.add(logo.src);
        return true;
    });

    return (
        <Card>
            <CardContent className="pt-6 px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-4 sm:mb-4">
                    <p className="text-md font-medium tracking-widest text-muted-foreground">
                        DISTRIBUTING PRODUCTS FOR LEADING BRANDS IN KENYA
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-normal bg-gradient-to-b from-blue-700 to-blue-400 text-transparent bg-clip-text dark:from-blue-400 dark:to-blue-600">
                        Our Principal Companies
                    </h2>
                </div>
                <LogoCarousel
                    logos={uniqueCompanyLogos.map(logo => ({
                        ...logo,
                        className: `${logo.className || ''} w-[200px] h-[100px] sm:w-[250px] sm:h-[125px] md:w-[300px] md:h-[150px]`
                    }))}
                />
            </CardContent>
        </Card>
    );
}

export { Companies };