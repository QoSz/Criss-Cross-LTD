import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

/**
 * GradientText - Reusable component for gradient text effects
 * Reduces duplication of gradient text patterns across the codebase
 */
export function GradientText({ children, variant = 'primary', className }: GradientTextProps) {
  const gradients = {
    primary: 'bg-gradient-to-b from-blue-700 to-blue-400 dark:from-blue-400 dark:to-blue-600',
    secondary: 'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-600 dark:to-purple-500',
  };

  return (
    <span className={cn(gradients[variant], 'bg-clip-text text-transparent', className)}>
      {children}
    </span>
  );
}
