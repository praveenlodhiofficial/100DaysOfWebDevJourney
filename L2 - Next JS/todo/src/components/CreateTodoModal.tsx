"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CreateTodoModalProps {
  open: boolean;
  onClose: () => void;
}

function CreateTodoModal({ open, onClose }: CreateTodoModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setstatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to create todo");
      } else {
        setTitle("");
        setDescription("");
        setstatus("pending");
        onClose();
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${status === "completed" ? "bg-green-400/10" : status === "in_progress" ? "bg-yellow-400/10" : "bg-red-400/10"}`}>
      <div className={`bg-white shadow-lg w-lg flex flex-col justify-center gap-5 p-8 rounded-xl relative ${status === "completed" ? "shadow-green-500/50" : status === "in_progress" ? "shadow-yellow-500/50 " : "shadow-red-500/50"}`}>
        <button
          className="absolute top-2 right-2 text-xl font-bold px-2 py-1 rounded hover:bg-gray-200"
          onClick={onClose}
        >
          ×
        </button>
        <h1 className="text-2xl font-bold uppercase text-center ">
          Create Todo
        </h1>
        <form className="gap-2 flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="px-3 py-1 rounded-lg border w-full text-base font-semibold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            rows={6}
            cols={30}
            placeholder="Description"
            className="px-3 py-1 rounded-lg border w-full text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div>
            <label
              htmlFor="status"
              className="text-xs uppercase font-bold mt-3"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setstatus(e.target.value)}
              className="px-3 py-1 rounded-lg border w-full"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-black/80 text-white px-3 py-1.5 rounded-lg mt-2"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CreateTodoModalButton() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className="bg-black/80 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        Create New Todo
      </button>
      <CreateTodoModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
