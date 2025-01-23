import { useRef, useState } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./ui/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { TweetIcon } from "../icons/TweetIcon";
import { VideoIcon } from "../icons/VideosIcon";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
}

const CreateContent = ({ onClose }) => {
    const [type, setType] = useState<ContentType>(ContentType.Youtube);
    const [description, setDescription] = useState<string>("");

    const titleRef = useRef<HTMLInputElement | null>(null);
    const linkRef = useRef<HTMLInputElement | null>(null);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
    
        try {
            await axios.post(
                `${BACKEND_URL}/api/v1/content`,
                {
                    link,
                    title,
                    type,
                    description,
                },
                {
                    headers: {
                        authorization: localStorage.getItem("token") || "",
                    },
                }
            );
            console.log("Content added successfully");
            
            // Trigger a content re-fetch
            onClose(); // Close modal
            window.location.reload(); // Simple solution, better: trigger hook state update
        } catch (error) {
            console.error("Error adding content", error);
        }
    }
    


    return (
        <div className="fixed top-0 bg-black h-full w-screen bg-opacity-85 flex justify-center items-center z-10">
            <div className="border flex justify-center sm:max-w-40 lg:min-w-96 h-fit bg-white flex-col rounded-lg">
                {/* Close Icon */}
                <div className="flex justify-end p-2">
                    <button className="cursor-pointer" onClick={onClose} aria-label="Close">
                        <CloseIcon size="lg" />
                    </button>
                </div>

                {/* Form Content */}
                <div className="gap-3 flex flex-col p-4">
                    <h1 className="text-3xl text-center font-semibold">Create Content</h1>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addContent();
                        }}
                        className="flex flex-col gap-3 text-sm"
                    >

                        {/* Title Input */}
                        <input
                            ref={titleRef}
                            type="text"
                            className="border w-full border-dashed border-black rounded px-2 py-1 text-black"
                            placeholder="Title"
                            aria-label="Title"
                        />

                        {/* Link Input */}
                        <input
                            ref={linkRef}
                            type="text"
                            className="border w-full border-dashed border-black rounded px-2 py-1 text-black"
                            placeholder="Link"
                            aria-label="Link"
                        />

                        {/* Description Box */}
                        <textarea
                            rows={5}
                            className="border w-full border-dashed border-black rounded px-2 py-1 text-black"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            aria-label="Description"
                        ></textarea>

                        <div className="flex gap-2 justify-center items-center"> 

                            <Button
                                variant="tertiary"
                                startIcon={<TweetIcon size="md" color="white"/>}
                                size="md"
                                onClick={() => { setType(ContentType.Twitter) }}
                                className={ type === ContentType.Twitter ? "shadow-md shadow-black" : "invert border-[#363434] border-dashed" }
                            />

                            <Button
                                variant="tertiary"
                                startIcon={<VideoIcon size="md" color="white"/>}
                                size="md"
                                onClick={() => { setType(ContentType.Youtube) }}
                                className={ type === ContentType.Youtube ? "shadow-md shadow-black" : "invert border-[#363434] border-dashed" }
                            />

                        </div>

                        {/* Submit Button */}
                        <Button
                            variant="tertiary"
                            title="Submit"
                            size="md"
                            onClick={addContent}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateContent;
