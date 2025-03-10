"use client";

import { LogoCarousel } from "@/components/ui/logo-carousel";
import { Card, CardContent } from "@/components/ui/card";
import { companyLogos } from "./company-logos-data";

const logoWidth: number = 280;
const logoHeight: number = 140;

function Companies() {
    const uniqueCompanyLogos = companyLogos.filter((logo, index, arr) =>
        index === arr.findIndex(l => l.src === logo.src)
    );

    return (
        <Card>
            <CardContent className="pt-6 px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-4 sm:mb-4">
                    <p className="text-md font-medium tracking-widest text-muted-foreground">
                        DISTRIBUTING PRODUCTS FOR LEADING BRANDS IN KENYA
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] tracking-normal bg-gradient-to-b from-blue-700 to-blue-400 text-transparent bg-clip-text dark:from-blue-400 dark:to-blue-600">
                        Our Principal Companies
                    </h2>
                </div>
                <LogoCarousel
                    logos={uniqueCompanyLogos.map(logo => ({
                        ...logo,
                        width: logoWidth,
                        height: logoHeight,
                        className: `${logo.className || ''} w-[200px] h-[100px] sm:w-[250px] sm:h-[125px] md:w-[300px] md:h-[150px]`
                    }))}
                />
            </CardContent>
        </Card>
    );
}

export { Companies };