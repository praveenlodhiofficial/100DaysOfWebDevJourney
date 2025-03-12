interface InputProps {
    placeholder: string;
    value?: string;
    onChange?: (value: string) => void;
    type: string;
    className?: string;
    onClick?: () => void;
}

export default function Input({ placeholder, value, onChange, type, className, onClick }: InputProps) {
    return (
        <input
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            type={type}
            className={`outline-none placeholder-gray-400 text-gray-700 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className}`}
            onClick={onClick}
        />
    );
}