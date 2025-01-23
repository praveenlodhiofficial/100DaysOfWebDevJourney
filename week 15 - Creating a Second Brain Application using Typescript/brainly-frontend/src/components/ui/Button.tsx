import React, { ReactElement, useState } from "react";
import { LoaderIcon } from "../../icons/LoaderIcon";

// ---------------------------------------> INTERFACE

export interface ButtonProps {
  variant: Variant;
  title?: string | ReactElement;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  size: "sm" | "md" | "lg";
  onClick?: () => void;
  loading?: boolean
  className?: string
}

type Variant = "primary" | "secondary" | "tertiary";

// ---------------------------------------> VARIANT STYLES

const variantStyles = {
  primary: "text-purple-600 bg-purple-300 min-w-36",
  secondary: "text-white bg-purple-600 min-w-36",
  tertiary: "border  rounded bg-black text-white w-full hover:bg-opacity-90 transition-all",
};

const sizeStyles = {
  sm: "px-2 py-1 text-xs rounded-sm",
  md: "px-4 py-2 text-sm rounded-md",
  lg: "px-6 py-3 text-md rounded-lg",
};

// ---------------------------------------> EXPORT FUNCTION

export const Button: React.FC<ButtonProps> = ({ variant, title, startIcon, endIcon, size, onClick, loading, className}) => {
  // const [isClicked, setIsClicked] = useState(false);

  // const handleClick = () => {
  //   if (!loading) {
  //     setIsClicked(true);
  //     onClick?.();
  //   }
  // };

  return (
    <button
      onClick={!loading ? onClick : undefined} // Disable interaction when loading

      className={`
        flex items-center justify-center gap-2 
        ${className || ""}
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${loading ? "opacity-50 cursor-not-allowed" : ""}
        `}

      disabled={loading} // Prevent native events when loading
    >
      {loading ? (
        
        <span className="flex items-center">
        <LoaderIcon size="md"/>
      </span>

      ) : (
        <>
          {startIcon} {title} {endIcon}
        </>
      )}
    </button>
  );
};
