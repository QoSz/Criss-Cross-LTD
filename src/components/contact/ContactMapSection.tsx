import { Card } from "@/components/ui/card";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.734665705923!2d36.89375821082464!3d-1.335415298646304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f13df6febb2d7%3A0x23d6ba31663476fa!2sCriss%20Cross%20Ltd!5e0!3m2!1sen!2ske!4v1736585818128!5m2!1sen!2ske";

export function ContactMapSection() {
  return (
    <section aria-label="Our location" className="h-full w-full min-h-[450px]">
      <Card className="p-2 h-full rounded-[1.618rem] overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800/50">
        <iframe
          src={MAP_SRC}
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: "1.618rem" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-[1.618rem]"
          title="Google Maps showing Criss Cross Ltd location at Duldul Godown, Phase 2, Mombasa Road, Nairobi"
        />
      </Card>
    </section>
  );
}
