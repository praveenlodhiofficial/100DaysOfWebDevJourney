import React from "react";

interface InputProps {
  placeholder?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

const sizeVariant: Record<string, string> = {
  sm: "text-sm p-2",
  md: "text-base p-3",
  lg: "text-lg p-4",
};

export const Input: React.FC<InputProps> = ({ placeholder, onClick, size = "md" }) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        onClick={onClick}
        className={`border rounded ${sizeVariant[size]}`}
      />
    </div>
  );
};
