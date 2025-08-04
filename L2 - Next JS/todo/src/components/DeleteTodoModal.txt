"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteTodoModalProps {
  open: boolean;
  onClose: () => void;
  todoId: string;
}

function DeleteTodoModal({ open, onClose, todoId }: DeleteTodoModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (!open) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/todo?id=${todoId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to delete todo");
      } else {
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white shadow-md w-[350px] flex flex-col gap-6 p-6 rounded-xl relative">
        <button
          className="absolute top-2 right-2 text-xl font-bold px-2 py-1 rounded hover:bg-gray-200"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg font-bold text-center">Delete Todo?</h2>
        <p className="text-center text-gray-600">
          Are you sure you want to delete this todo?
        </p>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="flex gap-3 justify-center">
          <button
            className="bg-gray-200 px-4 py-1 rounded"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-1 rounded"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DeleteTodoModalButton({ todoId }: { todoId: string }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className="bg-red-500 text-white p-1 rounded-md text-sm cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        <Trash2 className="h-3 w-3 text-white" />
      </button>
      <DeleteTodoModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        todoId={todoId}
      />
    </>
  );
}
