import { DocumentIcon } from "../icons/DocumentsIcon"
import { LinksIcon } from "../icons/Links"
import { TagsIcon } from "../icons/Tags"
import { TweetIcon } from "../icons/TweetIcon"
import { VideoIcon } from "../icons/VideosIcon"

export const SideBar = () => {
    return (
        <>
            <div className="w-[20vw] fixed h-full gap-5 p-5 bg-white border-r flex flex-col text-[#3f434a]">

                <div className="header uppercase text-xl font-bold ">
                    Second Brain
                </div>

                <div className="text-sm">

                    {/* Twitter */}
                    <div className="py-2 flex gap-3 items-center hover:bg-slate-200 hover:rounded-md transition-all duration-150 hover:px-2 hover:cursor-pointer">
                        <TweetIcon size="md"/>
                        Tweets
                    </div>

                    {/* Videos */}
                    <div className="py-2 flex gap-3 items-center hover:bg-slate-200 hover:rounded-md transition-all duration-150 hover:px-2 hover:cursor-pointer">
                    <VideoIcon size="md"/>
                        Videos
                    </div>

                    {/* Documents */}
                    <div className="py-2 flex gap-3 items-center hover:bg-slate-200 hover:rounded-md transition-all duration-150 hover:px-2 hover:cursor-pointer">
                    <DocumentIcon size="md"/>
                        Documents
                    </div>

                    {/* Links */}
                    <div className="py-2 flex gap-3 items-center hover:bg-slate-200 hover:rounded-md transition-all duration-150 hover:px-2 hover:cursor-pointer">
                    <LinksIcon size="md"/>
                        Links
                    </div>

                    {/* Tags */}
                    <div className="py-2 flex gap-3 items-center hover:bg-slate-200 hover:rounded-md transition-all duration-150 hover:px-2 hover:cursor-pointer">
                    <TagsIcon size="md"/>
                        Tags
                    </div>

                </div>


            </div>
        </>
    )
}