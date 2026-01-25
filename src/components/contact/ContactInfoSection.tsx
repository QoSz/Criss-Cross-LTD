import { Card } from "@/components/ui/card";
import { contactInfoItems } from "./info/contact-info-data";
import { ContactInfoCard } from "./info/ContactInfoCard";

export function ContactInfoSection() {
  return (
    <div className="space-y-6">
      {contactInfoItems.map((item) => (
        <ContactInfoCard key={item.id} item={item} />
      ))}

      <Card className="p-6 rounded-[1.618rem] transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800/50">
        <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
        <p className="text-muted-foreground mb-4">
          Let&apos;s build something amazing together. Reach out for
          collaborations, support, career opportunities, or just to say hello!
        </p>
      </Card>
    </div>
  );
}
