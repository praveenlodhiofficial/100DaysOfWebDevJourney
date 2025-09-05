"use client"

import { useState } from "react"
import { PiSpinner, PiTrash, PiX } from "react-icons/pi"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

function DeleteNote({ open, setOpen, id }: {
    open: boolean,
    setOpen: (open: boolean) => void,
    id: string
}) {

    const router = useRouter()
    const [loading, setloading] = useState(false)

    if (!open) return null

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setloading(true)

        try {
            const response = await fetch(`/api/delete/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })

            const data = await response.json()
            console.log(data)

            if (data.success) {
                setOpen(false)
                setloading(false)
                toast.success(data.message || "Note deleted successfully")
                router.refresh()
            } else {
                setloading(false)
                toast.error(data.message || "Failed to delete note")
            }
        } catch (error) {
            setloading(false)
        }
    }

    return (
        <div className="fixed bg-red-900/2 inset-0 h-screen flex justify-center items-center z-10">
            <div className="absolute flex flex-col max-w-sm w-full justify-center  gap-4 p-4 rounded-md bg-white/10 backdrop-blur-md border border-white/10">
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3 cursor-pointer"
                >
                    <PiX className="text-white/80 size-4" />
                </button>
                <h1 className="text-2xl font-bold text-center">Delete Note</h1>

                <p className="text-center tracking-wide text-white/80 capitalize text-sm font-light">
                    Are you sure you want to delete this note?
                </p>

                <form onSubmit={handleDelete} className="flex flex-col gap-2 w-full">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-500 hover:bg-red-500/80 transition-all duration-300 cursor-pointer rounded-md p-2 text-white flex justify-center items-center"
                    >
                        {loading ? <PiSpinner className="animate-spin" /> : "Delete"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export function DeleteNoteModal({id}: {id: string}) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="hover:bg-red-500/10 rounded-md"
            >
                <PiTrash className="text-red-500 hover:text-red-400 size-5 cursor-pointer" />
            </button>
            {open && <DeleteNote open={open} setOpen={setOpen} id={id} />}
            </>
    )
}