import { timelineMilestones } from "./timeline-data";
import { TimelineCard } from "./TimelineCard";

export function TimelineSection() {
  return (
    <section className="py-16 px-4 bg-blue-50 dark:bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
          Our Journey Through the Years
        </h2>

        <div className="space-y-12">
          {timelineMilestones.map((milestone) => (
            <TimelineCard key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </div>
    </section>
  );
}
