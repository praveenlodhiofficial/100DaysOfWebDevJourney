"use client"

import { useState } from "react"
import { PiPlusCircleDuotone, PiSpinner, PiX } from "react-icons/pi"
import { useRouter } from "next/navigation"

function CreateNote({ open, setOpen }: {
    open: boolean,
    setOpen: (open: boolean) => void
}) {

    const router = useRouter()
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState("")
    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")

    if (!open) return null

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        seterror("")
        setloading(true)

        try {
            const response = await fetch("/api/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description })
            })

            const data = await response.json()
            console.log(data)

            if (data.success) {
                setOpen(false)
                settitle("")
                setdescription("")
                setloading(false)
                router.refresh()
            } else {
                seterror(data.message || "Failed to create note")
                setloading(false)
            }
        } catch (error) {
            seterror("Something went wrong")
            setloading(false)
        }
    }

    return (
        <div className="absolute inset-0 flex justify-center items-center">
            <div className="absolute flex flex-col max-w-xl w-full justify-center  gap-4 p-4 rounded-md bg-white/10 backdrop-blur-md border border-white/10">
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3 cursor-pointer"
                >
                    <PiX className="text-white/80 size-4" />
                </button>
                <h1 className="text-2xl font-bold text-center">Create Notes</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                        className="bg-white/10 border border-white/10 rounded-md p-2 font-semibold text-white/80 focus:outline-none" />

                    <textarea
                        placeholder="Description"
                        rows={10}
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                        className="bg-white/10 border border-white/10 rounded-md p-2 text-sm text-white/80 font-light focus:outline-none" />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black border border-black hover:border-white/30 cursor-pointer rounded-md p-2 text-white flex justify-center items-center"
                    >
                        {loading ? <PiSpinner className="animate-spin" /> : "Create"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export function CreateNoteModal() {
    const [open, setOpen] = useState(false)

    return (
        <div className="rounded-md w-full space-y-3 aspect-square group">
            <h1 className="text-center text-2xl font-white font-semibold capitalize">Create New Note</h1>
            <p className="text-center tracking-wide text-white/80 capitalize text-sm font-light">Create a new note to save your thoughts and ideas</p>
            {open && <CreateNote open={open} setOpen={setOpen} />}
            <button
                onClick={() => setOpen(true)}
                className="flex justify-center mt-15 items-center w-full cursor-pointer"
            >
                <PiPlusCircleDuotone className="text-white/80 size-20 group-hover:rotate-45 transition-all duration-300" />
            </button>
        </div>
    )
}