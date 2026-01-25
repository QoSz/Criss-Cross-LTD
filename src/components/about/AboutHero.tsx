import Image from "next/image";

const heroStats = [
  { value: "25+", label: "Years in Business" },
  { value: "30+", label: "Retail Partners" },
] as const;

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-28 pb-16 md:pt-36 md:pb-24 min-h-[420px] md:min-h-[560px]">
      <Image
        src="/images/about/about-hero.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="(max-width: 768px) 100vw, 1200px"
        quality={30}
        className="object-cover object-bottom pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-blue-400 text-transparent bg-clip-text dark:from-blue-400 dark:to-blue-600">
          25 Years of Trust and Growth
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
          From a small warehouse with two delivery trucks to Kenya&apos;s most
          trusted wholesale FMCG distributor. This is the story of Criss Cross
          Ltd.
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-center">
          {heroStats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
