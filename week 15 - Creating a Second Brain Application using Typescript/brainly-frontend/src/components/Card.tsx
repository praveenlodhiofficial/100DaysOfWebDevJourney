import { DeleteIcon } from "../icons/DeleteIcon"
import { DocumentIcon } from "../icons/DocumentsIcon"
import { ShareIcon } from "../icons/ShareIcon"

export const Cards = () => {
    return (
        <>
            <div className="border w-fit flex flex-col text-sm rounded-md bg-white">

                {/* Card Name */}
                <div className="flex items-center justify-between border-b px-3 py-2">
                    <div className="flex items-center gap-1">
                        <DocumentIcon size="md" />
                        Project Ideas
                    </div>

                    {/* Sharable */}
                    <div className="flex gap-4">
                        <ShareIcon size="md" />
                        <DeleteIcon size="md" />
                    </div>
                </div>

                {/* Fetch Content */}
                <div className="max-w-72 max-h-72 overflow-scroll no-scrollbar">

                    {/* <iframe
                        className="cover-background"
                        src="https://www.youtube.com/embed/Qfd00VQ2W1Y?si=jlGCHzi3UPSS1sdS"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe> */}

                    <div className="px-3 text-center">
                        <blockquote className="border-none cover-background twitter-tweet">
                            <a className="border-none cover-background rounded no-scrollbar" href="https://twitter.com/praveenlodhi99/status/1873186043769630935?ref_src=twsrc%5Etfw">
                                December 29, 2024
                            </a>
                        </blockquote>
                    </div>
                </div>

            </div>
        </>
    )
}