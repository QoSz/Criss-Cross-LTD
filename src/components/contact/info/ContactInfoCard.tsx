import { Card } from "@/components/ui/card";
import type { ContactInfoItem } from "./contact-info-data";

interface ContactInfoCardProps {
  item: ContactInfoItem;
}

export function ContactInfoCard({ item }: ContactInfoCardProps) {
  const { title, icon: Icon, bgColor, iconColor, links, isExternal } = item;

  return (
    <Card className="p-6 rounded-[1.618rem] transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800/50">
      <div className="flex items-center gap-4">
        <div className={`${bgColor} p-3 rounded-full`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <div className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-muted-foreground hover:text-primary dark:hover:text-blue-400 whitespace-pre-line"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
