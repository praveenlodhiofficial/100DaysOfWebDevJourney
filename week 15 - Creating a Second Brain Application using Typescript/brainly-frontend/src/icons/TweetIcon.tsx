interface TweetIconProps {
    size?: "sm" | "md" | "lg"
}

const sizeVariants = {
    "sm": "size-2",
    "md": "size-4",
    "lg": "size-6"
}

export function TweetIcon(props: TweetIconProps) {
    // return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#3f434a" className={sizeVariants[props.size || "sm"]}>
    //     <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    // </svg>
    return <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" stroke-width="2" stroke="#3f434a" className={sizeVariants[props.size || "sm"]}>
    <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
    </svg>
}

