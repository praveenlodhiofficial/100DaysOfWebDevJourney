"use client"

import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

// use react forms or react hook forms

export default function Home() {
  const [roomId, setRoomId] = useState("")
  const router = useRouter()

  return (
    <>
      <div className="h-screen w-1/2 p-5 text-lg flex flex-col gap-2">
        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          type="text"
          placeholder="Room Id"
          className="bg-slate-200 px-2 py-1 rounded"
        />

      <button 
      onClick={() => router.push(`/room/${roomId}`)}
      className="bg-blue-500 text-white px-2 py-1 rounded "
      >
        Join Room
      </button>
      </div>
    </>
  )
}
