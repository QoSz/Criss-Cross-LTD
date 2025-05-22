"use client";

import { Input } from "@/components/ui/input"; // Assuming Shadcn UI path

interface ProductSearchInputProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  className?: string;
}

export default function ProductSearchInput({
  searchTerm,
  onSearchTermChange,
  className,
}: ProductSearchInputProps) {
  return (
    <Input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => onSearchTermChange(e.target.value)}
      className={className}
    />
  );
} 