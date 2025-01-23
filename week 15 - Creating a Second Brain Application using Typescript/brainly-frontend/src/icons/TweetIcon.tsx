interface TweetIconProps {
    size?: "sm" | "md" | "lg"; // Optional size prop
    className?: string; // Optional custom class name prop
    color?: string;
  }
  
  // Size variants for different sizes
  const sizeVariants: Record<"sm" | "md" | "lg", string> = {
    sm: "w-4 h-4", // Tailwind classes for size
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };
  
  export function TweetIcon({ size = "sm", className = "", color = "#3f434a"  }: TweetIconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 50 50"
        strokeWidth="2"
        stroke={`${color}`}
        className={`${sizeVariants[size]} ${className}`} // Combine size and custom class names
      >
        <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
      </svg>
    );
  }
  