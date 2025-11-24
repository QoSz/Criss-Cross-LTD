import { cn } from "@/lib/utils";

interface FloatingTooltipProps {
  id: string;
  text: string;
  className?: string;
}

export function FloatingTooltip({ id, text, className }: FloatingTooltipProps) {
  return (
    <div
      id={id}
      role="tooltip"
      className={cn(
        "hidden sm:block absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-3 py-1 bg-gray-800 text-white text-xs sm:text-sm rounded-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none",
        className
      )}
    >
      {text}
      <div
        className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-800"
        aria-hidden="true"
      />
    </div>
  );
}
