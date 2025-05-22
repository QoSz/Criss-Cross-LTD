"use client";

import { Button } from "@/components/ui/button"; // Assuming Shadcn UI path
import { RotateCcw } from 'lucide-react'; // Icon for reset

interface ResetFiltersButtonProps {
  onReset: () => void;
  className?: string;
  disabled?: boolean;
}

export default function ResetFiltersButton({
  onReset,
  className,
  disabled,
}: ResetFiltersButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onReset}
      className={className}
      disabled={disabled}
    >
      <RotateCcw className="mr-2 h-4 w-4" /> Reset Filters
    </Button>
  );
} 