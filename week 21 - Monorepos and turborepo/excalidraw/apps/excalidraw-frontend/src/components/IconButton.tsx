"use client"

export function IconButton({
    icon, onClick, activated
}: {
    icon: React.ReactNode,
    onClick: () => void,
    activated: boolean
}) {
    return (
        <button
                className={`rounded-full text-black p-2 w-10 h-10 flex items-center justify-center cursor-pointer ${activated ? "bg-amber-400" : "bg-white"}`}
            onClick={onClick}
        >
            {icon}
        </button>
    )
}


