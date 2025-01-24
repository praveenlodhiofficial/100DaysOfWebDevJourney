import { DeleteIcon } from "../icons/DeleteIcon"
import { DocumentIcon } from "../icons/DocumentsIcon"
import { LoaderIcon } from "../icons/LoaderIcon";
import { ShareIcon } from "../icons/ShareIcon"

interface CardProps {
    title: string;
    link: string;
    type: 'youtube' | 'twitter';
    description?: string;
}

export const Card = ({ title, link, type, description }: CardProps) => {
    return (
        <>
            <div className="border min-w-72 flex flex-col text-sm rounded-md bg-white mb-">
                <div className="flex items-center justify-between border-b px-3 py-2">

                    {/* All Notes */}
                    <div className="flex items-center gap-1 text-xs">
                        <DocumentIcon size="md" />
                        {title}
                    </div>

                    {/* Create & Share Contetn Button */}
                    <div className="flex gap-4">
                        <ShareIcon size="md" />
                        <DeleteIcon size="md" />
                    </div>

                </div>

                {/* Fetch Content */}
                <div className="overflow-scroll no-scrollbar">

                    {type === 'youtube' &&

                        <div className="px-2 pt-2 gap-2">
                            <div className="text-xs">{description}</div>

                            <iframe
                                className="cover-background scale-90 relative right-4"
                                src={link.replace("watch?v=", "embed/").replace("&", "?")}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            >
                                <LoaderIcon fillStroke="#000" size="lg"/>
                            </iframe>

                        </div>
                    }

                    {type === 'twitter' &&

                        <div className="px-3 text-center">
                            <div className="px-2 text-xs">{description}</div>
                            <blockquote className="border-none cover-background twitter-tweet">
                                <a
                                    className="border-none text-xs cover-background rounded no-scrollbar justify-center flex"
                                    href={link.replace('x.com', 'twitter.com')}
                                >
                                    <LoaderIcon fillStroke="#000" size="lg"/>
                                </a>
                            </blockquote>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}