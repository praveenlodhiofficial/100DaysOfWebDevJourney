export default function Signin() {
    return (
        <div className="flex flex-col gap-5 p-5">

            <h1 className="text-6xl uppercase">Signin Page</h1>


            <div className="flex gap-5">
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="username"
                    className="p-1 bg-transparent border rounded-md border-gray-500 text-center"
                />
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="password"
                    className="p-1 bg-transparent border rounded-md border-gray-500 text-center"
                />

                <button
                    className="py-1 px-3 bg-white text-black border rounded-md "
                >
                    Submit
                </button>
            </div>

        </div>
    )
}