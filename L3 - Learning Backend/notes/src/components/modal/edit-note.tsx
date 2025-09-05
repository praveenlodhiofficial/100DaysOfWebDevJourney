"use client"

import { useEffect, useState } from "react";
import { PiPencilLine, PiSpinner, PiX } from "react-icons/pi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function EditNote({ open, setOpen, id }: {
    open: boolean,
    setOpen: (open: boolean) => void,
    id: string
}) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchNote = async () => {
        try {
            const response = await fetch(`/api/note/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            const data = await response.json()
            
            if (data.success) {
                setFormData({
                    title: data.note.title,
                    description: data.note.description
                })
            }
        } catch (error) {
            console.error("Error fetching note:", error)
            toast.error("Failed to load note data")
        }
    }

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })

    useEffect(() => {
        if (open && id) {
            fetchNote()
        }
    }, [open, id])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const response = await fetch(`/api/edit/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            const data = await response.json()
            console.log(data)

            if (data.success) {
                setOpen(false)
                setLoading(false)
                toast.success(data.message || "Note updated successfully")
                router.refresh()
            }
        } catch (error) {
            setLoading(false)
            setError("Failed to update note")
        } finally {
            setLoading(false)
        } 
    }

    if (!open) return null

    return (
        <div className="fixed bg-green-900/2 inset-0 h-screen flex justify-center items-center z-10">
            <div className="absolute flex flex-col max-w-xl w-full justify-center  gap-4 p-4 rounded-md bg-white/10 backdrop-blur-md border border-white/10">
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3 cursor-pointer"
                >
                    <PiX className="text-white/80 size-4" />
                </button>
                <h1 className="text-2xl font-bold text-center">Edit Note</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Update Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="capitalize bg-white/10 border border-white/10 rounded-md p-2 font-semibold text-white/80 focus:outline-none"
                    />

                    <textarea
                        placeholder="Update description"
                        rows={10}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="capitalize bg-white/10 border border-white/10 rounded-md p-2 text-sm text-white/80 font-light focus:outline-none"
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-600/80 transition-all duration-300 cursor-pointer rounded-md p-2 text-white flex justify-center items-center"
                    >
                        {loading ? <PiSpinner className="animate-spin" /> : "Update"}
                    </button>
                </form>


            </div>
        </div>
    )
}

export function EditNoteModal({ id }: { id: string }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="hover:bg-green-500/10 rounded-md flex items-center justify-center"
            >
                <PiPencilLine className="text-green-500 size-5 cursor-pointer" />
            </button>
            {open && <EditNote open={open} setOpen={setOpen} id={id} />}
        </>
    )
}