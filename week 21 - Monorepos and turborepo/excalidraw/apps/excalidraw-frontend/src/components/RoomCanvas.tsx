"use client"

import { WS_BACKEND_URL } from "@/app/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4OGUyYWE2ZS1lNTk0LTRiMGQtOWFiYi1lMTRhZjhkZjdhODkiLCJlbWFpbCI6InByYXZlZW5sb2RoaS5vZmZpY2lhbEBnbWFpbC5jb20iLCJpYXQiOjE3NDIzNTM1OTgsImV4cCI6MTc0MjQzOTk5OH0.BeJ-HbGgVk1ghN890gjobqxDIFK6oTeUO-LoXGZretE";

    // Initialize the socket
    useEffect(() => {
        const ws = new WebSocket(`${WS_BACKEND_URL}?token=${token}`);
 
        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({
                type: "join_room",
                roomId
            })
            console.log(data);
            ws.send(data);
        }
    }, []);

    // If the socket is not connected, show a loading message
    if (!socket) {
        return <div>Connecting to server...</div>
    }

    return (
        <div>
            <Canvas roomId={roomId} socket={socket} />
        </div>
    )
}
