import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;   
}

export default function Container({ children, className }: ContainerProps) {
  return <div className={cn("container max-w-5xl mx-auto", className)}>{children}</div>;
}