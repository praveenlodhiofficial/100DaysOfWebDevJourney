import { cn } from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function Container({ children, className }: ContainerProps) {
    return <div
        className={cn("max-w-5xl mx-auto border-2 border-blue-500 min-h-screen", className)}>
        {children}
    </div>;
}