import { CreateNoteModal } from "@/components/modal/create-note";
import { DeleteNoteModal } from "@/components/modal/delete-note";
import { EditNoteModal } from "@/components/modal/edit-note";

export default async function Home() {
  let data = { notes: [] };
  let error = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    if (responseData && responseData.notes) {
      data = responseData;
    }
  } catch (err) {
    console.error("Error fetching notes:", err);
    error = err;
  }

  return (
    <div className="grid grid-cols-4 gap-4">

      <div className="bg-black p-4 rounded-md w-full border-2 border-dotted border-white/50 space-y-3 aspect-square">
        <CreateNoteModal />
      </div>

      {error ? (
        <div className="col-span-4 bg-red-500/10 p-4 rounded-md border border-red-500/20">
          <p className="text-red-400 text-center">Error loading notes. Please try again later.</p>
        </div>
      ) : (
        <>
          {data.notes.map((note: any) => (
            <div key={note._id} className="bg-white/5 p-4 rounded-md w-full border border-white/10 space-y-3 aspect-square">
              <div className="flex justify-between items-center gap-4">
                <h1 className="line-clamp-1 break-words text-2xl font-white font-semibold capitalize">{note.title}</h1>
                <div className="flex justify-center items-center gap-3">
                  <EditNoteModal id={note._id} />
                  <DeleteNoteModal id={note._id} />
                </div>
              </div>
              <p className="tracking-wide text-white/80 capitalize text-sm font-light">{note.description}</p>
            </div>
          ))}
        </>
      )}

    </div>
  )
}