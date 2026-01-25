import { MapPin, Mail, Phone, type LucideIcon } from "lucide-react";

export interface ContactLink {
  href: string;
  text: string;
}

export interface ContactInfoItem {
  id: string;
  title: string;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
  links: ContactLink[];
  isExternal?: boolean;
}

export const contactInfoItems: ContactInfoItem[] = [
  {
    id: "address",
    title: "Address:",
    icon: MapPin,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
    isExternal: true,
    links: [
      {
        href: "https://maps.app.goo.gl/HMpV56YZSjdmKVJq8",
        text: "Duldul Godown, Phase 2,\nMombasa Road, Nairobi",
      },
    ],
  },
  {
    id: "email",
    title: "Email:",
    icon: Mail,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    links: [
      { href: "mailto:info@crisscross.co.ke", text: "info@crisscross.co.ke" },
      { href: "mailto:crisscrossltd@gmail.com", text: "crisscrossltd@gmail.com" },
    ],
  },
  {
    id: "phone",
    title: "Call US:",
    icon: Phone,
    bgColor: "bg-amber-100",
    iconColor: "text-amber-600",
    links: [
      { href: "tel:+254707451536", text: "+254 707 451 536" },
      { href: "tel:+254722488224", text: "+254 722 488 224" },
      { href: "tel:+254723641478", text: "+254 723 641 478" },
    ],
  },
];
