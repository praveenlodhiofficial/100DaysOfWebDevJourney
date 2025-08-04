"use client";

import { Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface EditTodoModalProps {
  open: boolean;
  onClose: () => void;
  todoId: string;
  initialTitle: string;
  initialDescription: string;
  initialStatus: string;
}

function EditTodoModal({
  open,
  onClose,
  todoId,
  initialTitle,
  initialDescription,
  initialStatus,
}: EditTodoModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (!open) return null;

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/todo/${todoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status: false }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Failed to update todo");
      } else {
        setTitle("");
        setDescription("");
        onClose();
        router.refresh();
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white shadow-md shadow-black/50 w-lg flex flex-col justify-center gap-5 p-8 rounded-xl relative">
        <button
          className="absolute top-2 right-2 text-xl font-bold px-2 py-1 rounded hover:bg-gray-200"
          onClick={onClose}
        >
          ×
        </button>
        <h1 className="text-2xl font-bold uppercase text-center ">
          Update Todo
        </h1>
        <form className="gap-2 flex flex-col" onSubmit={handleEdit}>
          <input
            type="text"
            placeholder="Title"
            className="px-3 py-1 rounded-lg border w-full text-base font-semibold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            // type="text"
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
              onChange={(e) => setStatus(e.target.value)}
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

export default function EditTodoModalButton({
  todoId,
  initialTitle,
  initialDescription,
  initialStatus,
}: {
  todoId: string;
  initialTitle: string;
  initialDescription: string;
  initialStatus: string;
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className="bg-amber-500 text-white p-1 rounded-md text-sm cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        <Edit2 className="h-3 w-3 text-white" />
      </button>
      <EditTodoModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        todoId={todoId}
        initialTitle={initialTitle}
        initialDescription={initialDescription}
        initialStatus={initialStatus}
      />
    </>
  );
}
