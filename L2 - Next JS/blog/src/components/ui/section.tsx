import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({ children, className }: SectionProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto py-10 border-2 border-red-500 flex flex-col",
        className
      )}
    >
      {children}
    </div>
  );
}
