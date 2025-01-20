import { DeleteIcon } from "../icons/deleteIcon"
import { DocumentIcon } from "../icons/DocumentsIcon"
import { ShareIcon } from "../icons/ShareIcon"

export const Cards = () => {
    return (
        <>
            <div className="border w-fit flex flex-col text-sm rounded-md bg-white">

                {/* Card Name */}
                <div className="flex items-center gap-20 border-b px-3 py-2 ">
                    <div className="flex items-center gap-1">
                        <DocumentIcon size="md"/>
                        Project Ideas
                    </div>

                    {/* Sharable */}
                    <div className="flex gap-4">
                        <ShareIcon size="md"/>
                        <DeleteIcon size="md"/>
                    </div>
                </div>

                {/* Fetch Content */}
                <div className="px-3 py-1 h-72">
                    wdakjfnlmv
                </div>

            </div>
        </>
    )
}