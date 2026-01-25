import { Calendar, Handshake, Users, Heart, Trophy, LucideIcon } from "lucide-react";

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  colorScheme: {
    bg: string;
    text: string;
  };
  featured?: boolean;
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: "beginning",
    year: "1999",
    title: "The Beginning",
    description:
      "Two ambitious entrepreneurs saw an opportunity in Kenya's uncertain retail landscape. Starting with a small warehouse in Industrial Area, Nairobi, and just two delivery trucks, they had a vision that went beyond selling products—they wanted to solve the reliability problem that was crippling small retailers.",
    icon: Calendar,
    colorScheme: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
    },
  },
  {
    id: "building-trust",
    year: "Early 2000s",
    title: "Building Trust",
    description:
      "While others focused on quick profits, we made a radical decision: customer loyalty over short-term gains. During challenging economic periods when many businesses collapsed, Criss Cross Ltd not only survived but thrived by becoming the dependable partner retailers could count on.",
    icon: Handshake,
    colorScheme: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
    },
  },
  {
    id: "organic-growth",
    year: "2005",
    title: "Organic Growth",
    description:
      "Something remarkable happened—word-of-mouth recommendations grew faster than our marketing budget ever could. Retailers weren't just buying from us, they were recommending us to their competitors. This unprecedented trust proved that when you prioritize customer success, profits follow naturally.",
    icon: Users,
    colorScheme: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600 dark:text-purple-400",
    },
  },
  {
    id: "supporting-local",
    year: "",
    title: "Supporting Local Brands",
    description:
      "While international brands flooded the Kenyan market, we became champions of local and regional brands. By supporting local manufacturers, we didn't just distribute products—we helped create jobs, strengthen the economy, and give Kenyan families access to affordable, quality goods.",
    icon: Heart,
    colorScheme: {
      bg: "bg-orange-100 dark:bg-orange-900/30",
      text: "text-orange-600 dark:text-orange-400",
    },
  },
  {
    id: "today",
    year: "Today",
    title: "Industry Leader",
    description:
      "We're not just a distributor—we're the invisible thread connecting hundreds of Kenyan businesses. Our trucks carry the hopes and ambitions of small business owners across the country, ensuring families have access to essential products while helping retailers compete and grow.",
    icon: Trophy,
    colorScheme: {
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-600 dark:text-yellow-400",
    },
    featured: true,
  },
];
