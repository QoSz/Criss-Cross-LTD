import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TimelineMilestone } from "./timeline-data";

export function TimelineCard({ milestone }: { milestone: TimelineMilestone }) {
  const { year, title, description, icon: Icon, colorScheme, featured } = milestone;
  const displayTitle = year ? `${year} - ${title}` : title;

  return (
    <Card
      className={cn(
        "p-8 rounded-[1.618rem] hover:shadow-lg transition-all duration-300 dark:hover:shadow-gray-800/50",
        featured && "border-2 border-blue-200 dark:border-blue-700"
      )}
    >
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex-shrink-0">
          <div className={`${colorScheme.bg} p-4 rounded-full`}>
            <Icon className={`h-8 w-8 ${colorScheme.text}`} />
          </div>
        </div>
        <div>
          <h3 className={`text-2xl font-bold mb-2 ${colorScheme.text}`}>
            {displayTitle}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
