"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <>
      <div className="h-screen w-1/2 p-5 text-lg flex flex-col gap-2">
        <h1 className="text-5xl mb-5">Join Room</h1>
        
        <input
          id="room-id"
          name="roomId"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          type="text"
          placeholder="Room ID"
          className="bg-slate-200 px-2 py-1 rounded"
        />

        <button
          onClick={() => router.push(`/room/${roomId}`)}
          className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
          disabled={!roomId.trim()} // Disable button if input is empty
        >
          Join Room
        </button>
      </div>
    </>
  );
}
