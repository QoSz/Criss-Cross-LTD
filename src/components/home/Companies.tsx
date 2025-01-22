"use client";

import { LogoCarousel } from "@/components/ui/logo-carousel";
import { Card, CardContent } from "@/components/ui/card";

interface CompanyLogo {
    id: number;
    name: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    style?: React.CSSProperties;
    className?: string;
}

const logoWidth: number = 280;
const logoHeight: number = 140;

const companyLogos: CompanyLogo[] = [
    {
        id: 1,
        name: "PWANI OIL",
        src: "/images/companies/Pwani.png",
        alt: "PWANI OIL Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 2,
        name: "TRUFOODS",
        src: "/images/companies/Truefoods.png",
        alt: "TRUFOODS Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 3,
        name: "KENYA SWEETS",
        src: "/images/companies/Kenya-Sweets.png",
        alt: "KENYA SWEETS Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 4,
        name: "HIGHLANDS",
        src: "/images/companies/Highlands.png",
        alt: "HIGHLANDS Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 5,
        name: "KETEPA",
        src: "/images/companies/Ketepa.png",
        alt: "KETEPA Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 6,
        name: "EXCEL",
        src: "/images/companies/Excel.png",
        alt: "EXCEL Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 7,
        name: "TROPICAL",
        src: "/images/companies/Tropical-Heat.png",
        alt: "TROPICAL Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 8,
        name: "Chandaria Industries Ltd",
        src: "/images/companies/Chandaria-Industries.png",
        alt: "Chandaria Industries Ltd Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 9,
        name: "CADBURY'S",
        src: "/images/companies/Cadburys.png",
        alt: "CADBURY'S Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 10,
        name: "Malbros",
        src: "/images/companies/Malbros.png",
        alt: "MALBROS Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 11,
        name: "MELVINS",
        src: "/images/companies/Melvins.png",
        alt: "MELVINS Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 12,
        name: "Sun Rice",
        src: "/images/companies/Sunrice.png",
        alt: "Sun Rice Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 13,
        name: "Agventure",
        src: "/images/companies/Agventure.svg",
        alt: "Agventure Logo",
        width: logoWidth,
        height: logoHeight,
        className: "bg-[#4c9e45] p-4",
    },
];

function Companies() {
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
                    logos={companyLogos.map(logo => ({
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
