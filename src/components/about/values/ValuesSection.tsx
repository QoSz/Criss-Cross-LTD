import { companyValues } from "./values-data";
import { ValueCard } from "./ValueCard";

export function ValuesSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
          What Drives Us
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companyValues.map((value) => (
            <ValueCard key={value.id} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
}
