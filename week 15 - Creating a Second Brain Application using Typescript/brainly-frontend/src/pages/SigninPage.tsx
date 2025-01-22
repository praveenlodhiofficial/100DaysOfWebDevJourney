export const SignupPage = () => {
    return (
        <div className="bg-black bg-opacity-95 h-full w-screen absolute top-0 justify-center flex items-center z-10">
            <div className="border flex justify-center sm:max-w-94 h-fit  bg-white flex-col rounded-lg">

                <div className="bg-slate-100 gap-5  flex flex-col p-10 py-20">
                    <h1 className="text-3xl text-center font-semibold uppercase">Signup to Second Brain</h1>

                    <form action="" method="post" className="flex flex-col gap-2 text-sm">

                        {/* Title Input */}
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="border w-full rounded px-2 py-1 items-center text-black"
                            placeholder="Username"
                        />

                        {/* Link Input */}
                        <input
                            type="text"
                            name="link"
                            id="link"
                            className="border w-full rounded px-2 py-1 items-center text-black"
                            placeholder="Password"
                        />

                        {/* Signup Button */}
                        <button
                            type="submit"
                            className="border rounded bg-black text-white py-2 px-4 w-full hover:bg-opacity-90 transition-all"
                        >
                            Signup
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
};

