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

const logoWidth = 300;
const logoHeight = 150;

export const companyLogos: CompanyLogo[] = [
    {
        id: 1,
        name: "PWANI OIL",
        src: "/images/companies/Pwani.webp",
        alt: "PWANI OIL Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 2,
        name: "TRUFOODS",
        src: "/images/companies/Truefoods.webp",
        alt: "TRUFOODS Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 3,
        name: "KENYA SWEETS",
        src: "/images/companies/Kenya-Sweets.webp",
        alt: "KENYA SWEETS Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 4,
        name: "HIGHLANDS",
        src: "/images/companies/Highlands.webp",
        alt: "HIGHLANDS Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 5,
        name: "KETEPA",
        src: "/images/companies/Ketepa.webp",
        alt: "KETEPA Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 6,
        name: "EXCEL",
        src: "/images/companies/Excel.webp",
        alt: "EXCEL Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 7,
        name: "TROPICAL",
        src: "/images/companies/Tropical-Heat.webp",
        alt: "TROPICAL Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 8,
        name: "Chandaria Industries Ltd",
        src: "/images/companies/Chandaria-Industries.webp",
        alt: "Chandaria Industries Ltd Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 9,
        name: "CADBURY'S",
        src: "/images/companies/Cadburys.webp",
        alt: "CADBURY'S Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 10,
        name: "Manji",
        src: "/images/companies/Manji.webp",
        alt: "MANJI Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 11,
        name: "Melvins",
        src: "/images/companies/Melvins.webp",
        alt: "MELVINS Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 12,
        name: "Sun Rice",
        src: "/images/companies/Sunrice.webp",
        alt: "Sun Rice Logo",
        width: logoWidth,
        height: logoHeight,
    },
    {
        id: 13,
        name: "Pure Mountain",
        src: "/images/companies/Pure-Mountain.webp",
        alt: "Pure Mountain Logo",
        width: logoWidth,
        height: logoHeight,
    },
];

export type { CompanyLogo }; 