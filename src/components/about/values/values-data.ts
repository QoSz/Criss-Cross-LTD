import { Target, Handshake, Heart, LucideIcon } from "lucide-react";

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  colorScheme: {
    bg: string;
    text: string;
  };
}

export const companyValues: CompanyValue[] = [
  {
    id: "customer-success",
    title: "Customer Success First",
    description:
      "We understand that retailers don't just buy products—they buy peace of mind. When you trust us with your livelihood, we take that responsibility seriously.",
    icon: Target,
    colorScheme: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
    },
  },
  {
    id: "reliable-partnerships",
    title: "Reliable Partnerships",
    description:
      "We've built our reputation on consistent reliability, genuine understanding, and mutual growth. Trust isn't given—it's earned, one delivery at a time.",
    icon: Handshake,
    colorScheme: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
    },
  },
  {
    id: "community-impact",
    title: "Community Impact",
    description:
      "Business success isn't measured just in profits, but in the number of other businesses we help succeed. When Kenyan retailers prosper, Kenya prospers.",
    icon: Heart,
    colorScheme: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600 dark:text-purple-400",
    },
  },
];
