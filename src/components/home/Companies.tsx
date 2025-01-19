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
}

const logoWidth: number = 200;
const logoHeight: number = 100;

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
        name: "MELVINS",
        src: "/images/companies/Melvins.png",
        alt: "MELVINS Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 11,
        name: "Agventure",
        src: "/images/companies/Agventure.png",
        alt: "Agventure Logo",
        width: logoWidth,
        height: logoHeight,
    },
];

function Companies() {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="text-center space-y-4 mb-12">
                    <p className="text-sm font-medium tracking-widest text-muted-foreground">
                        TRUSTED BY TEAMS FROM AROUND THE WORLD
                    </p>
                    <h2 className="text-[3.5rem] font-bold tracking-tight leading-none">
                        The best are already here
                    </h2>
                </div>
                <LogoCarousel
                    logos={companyLogos}
                />
            </CardContent>
        </Card>
    );
}

export { Companies };