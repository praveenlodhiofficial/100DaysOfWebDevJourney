interface LoaderIconProps {
    size?: "sm" | "md" | "lg";
    fillStroke?: string; // Added fillStroke prop
}

const sizeVariants = {
    sm: "size-2",
    md: "size-5",
    lg: "size-10",
};

export function LoaderIcon(props: LoaderIconProps) {
    const { size = "sm", fillStroke = "#fff" } = props; // Destructure and provide default values

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${sizeVariants[size]} w-full` } viewBox="0 0 200 200">

            <circle fill={fillStroke} stroke={fillStroke} strokeWidth="10" r="20" cx="40" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
            </circle>

            <circle fill={fillStroke} stroke={fillStroke} strokeWidth="6" r="20" cx="100" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
            </circle>

            <circle fill={fillStroke} stroke={fillStroke} strokeWidth="6" r="20" cx="160" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
            </circle>
        </svg>

    );
}
