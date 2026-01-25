import { Card } from "@/components/ui/card";
import { CompanyValue } from "./values-data";

export function ValueCard({ value }: { value: CompanyValue }) {
  const { title, description, icon: Icon, colorScheme } = value;

  return (
    <Card className="p-6 rounded-[1.618rem] hover:shadow-lg transition-all duration-300 dark:hover:shadow-gray-800/50 text-center">
      <div className={`${colorScheme.bg} p-4 rounded-full w-fit mx-auto mb-4`}>
        <Icon className={`h-8 w-8 ${colorScheme.text}`} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </Card>
  );
}
