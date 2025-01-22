import { DeleteIcon } from "../icons/DeleteIcon"
import { DocumentIcon } from "../icons/DocumentsIcon"
import { ShareIcon } from "../icons/ShareIcon"

interface CardProps {
    brainTitle: string;
    brainLink: string;
    brainType: 'youtube' | 'twitter';
    brainDescription?: string;
}

export const Cards = ({ brainTitle, brainLink, brainType, brainDescription }) => {
    return (
        <>
            <div className="border min-w-72 flex flex-col text-sm rounded-md bg-white mb-">

                {/* Card Name */}
                <div className="flex items-center justify-between border-b px-3 py-2">
                    <div className="flex items-center gap-1 text-xs">
                        <DocumentIcon size="md" />
                        {brainTitle}
                    </div>

                    {/* Sharable */}
                    <div className="flex gap-4">
                        <ShareIcon size="md" />
                        <DeleteIcon size="md" />
                    </div>
                </div>

                {/* Fetch Content */}
                <div className="overflow-scroll no-scrollbar">

                    {brainType === 'youtube' &&

                        <div className="px-2 pt-2 gap-2">
                            <div className="text-xs">{brainDescription}</div>
                            <iframe
                                className="cover-background scale-90 relative right-4"
                                src={brainLink.replace('watch', 'embed').replace('?va = ', '/')}
                                // src = "https://www.youtube.com/embed/Qfd00VQ2W1Y?si = jlGCHzi3UPSS1sdS"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            >
                                Loading...
                            </iframe>
                        </div>
                    }

                    {brainType === 'twitter' &&

                        <div className="px-3 text-center">
                            <div className="px-2 text-xs">{brainDescription}</div>
                            <blockquote className="border-none cover-background twitter-tweet">
                                <a
                                    className="border-none text-xs cover-background rounded no-scrollbar"
                                    // href = "https://twitter.com/praveenlodhi99/status/1873186043769630935?ref_src=twsrc%5Etfw"
                                    href={brainLink.replace('x.com', 'twitter.com')}
                                >
                                    Loading...
                                </a>
                            </blockquote>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}