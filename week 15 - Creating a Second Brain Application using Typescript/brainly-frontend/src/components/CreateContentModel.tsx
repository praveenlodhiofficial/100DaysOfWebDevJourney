import { CloseIcon } from "../icons/CloseIcon";

export const CreateContent = ({ onClose }) => {
    return (
        <div className="bg-black h-full w-screen absolute top-0 bg-opacity-80 justify-center flex items-center z-10">
            <div className=" border flex justify-center sm:max-w-40 lg:min-w-96 h-fit  bg-white flex-col rounded-lg">

                <div className="flex justify-end">
                    <div className="cursor-pointer" onClick={onClose} >
                        <CloseIcon size="lg" />
                    </div>
                </div>

                <div className="gap-3 flex flex-col p-2">
                    <h1 className="text-3xl text-center font-semibold">Create Content</h1>

                    <form action="" method="post" className="flex flex-col gap-2 text-sm">

                        {/* Title Input */}
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="border w-full border-dashed border-black rounded px-2 py-1 items-center text-black"
                            placeholder="Title"
                        />

                        {/* Link Input */}
                        <input
                            type="text"
                            name="link"
                            id="link"
                            className="border w-full border-dashed border-black rounded px-2 py-1 items-center text-black"
                            placeholder="Link"
                        />

                        {/* Video Type */}
                        <div className="flex gap-3 border w-full border-dashed border-black rounded px-2 py-1 items-center text-black">
                            Brain Type :
                            <label className="flex items-center gap-1 text-sm">
                                <input type="checkbox" name="videoType" value="youtube" />
                                YouTube
                            </label>
                            <label className="flex items-center gap-1 text-sm">
                                <input type="checkbox" name="videoType" value="twitter" />
                                Twitter
                            </label>
                        </div>

                        {/* Description Box */}
                        <textarea
                            name="description"
                            id="description"
                            rows={5}
                            className="border w-full border-dashed border-black rounded px-2 py-1 items-center text-black"
                            placeholder="Description"
                        ></textarea>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="border border-dashed border-black rounded bg-black text-white py-2 px-4 w-full hover:bg-opacity-90 transition-all"
                        >
                            Submit
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default CreateContent;
