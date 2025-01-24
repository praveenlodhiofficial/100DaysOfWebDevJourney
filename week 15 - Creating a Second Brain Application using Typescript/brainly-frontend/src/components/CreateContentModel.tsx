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
            onClose();

        } catch (error) {
            console.error("Error adding content", error);
        }
    }

    return (
        <div className="fixed top-0 bg-black h-full w-screen bg-opacity-85 flex justify-center items-center z-10">
            <div className="border flex justify-center sm:max-w-40 lg:min-w-96 h-fit bg-white flex-col rounded-lg">

                <div className="flex justify-end p-2">
                    <button className="cursor-pointer" onClick={onClose} aria-label="Close">
                        <CloseIcon size="lg" />
                    </button>
                </div>

                <div className="gap-3 flex flex-col p-4">
                    <h1 className="text-3xl text-center font-semibold">Create Content</h1>

                    <form

                        className="flex flex-col gap-3 text-sm"
                    >

                        <label htmlFor="title" className="sr-only">Title</label>
                        <input
                            ref={titleRef}
                            type="text"
                            id="title"
                            name="title"
                            className="border w-full border-dashed border-black rounded px-2 py-1 text-black"
                            placeholder="Title"
                            aria-label="Title"
                        />

                        <label htmlFor="link" className="sr-only">Link</label>
                        <input
                            ref={linkRef}
                            type="text"
                            id="link"
                            name="link"
                            className="border w-full border-dashed border-black rounded px-2 py-1 text-black"
                            placeholder="Link"
                            aria-label="Link"
                        />

                        <label htmlFor="description" className="sr-only">Description</label>
                        <textarea
                            rows={5}
                            id="description"
                            name="description"
                            className="border w-full border-dashed border-black rounded px-2 py-1 text-black"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            aria-label="Description"
                        ></textarea>

                        <div className="flex gap-2 justify-center items-center">

                            <Button
                                type="button"
                                variant="tertiary"
                                startIcon={<TweetIcon size="md" color="white" />}
                                size="md"
                                onClick={() => { setType(ContentType.Twitter) }}
                                className={type === ContentType.Twitter ? "shadow-md shadow-black" : "invert border-[#363434] border-dashed"}
                            />

                            <Button
                                type="button"
                                variant="tertiary"
                                startIcon={<VideoIcon size="md" color="white" />}
                                size="md"
                                onClick={() => { setType(ContentType.Youtube) }}
                                className={type === ContentType.Youtube ? "shadow-md shadow-black" : "invert border-[#363434] border-dashed"}
                            />

                        </div>

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
