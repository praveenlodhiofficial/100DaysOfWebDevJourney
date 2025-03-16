"use client"

import { useEffect, useRef } from "react";
import { initDraw } from "@/draw";

export function Canvas({
    roomId,
    socket
}: {
    roomId: string,
    socket: WebSocket
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Initialize the canvas
    useEffect(() => {
        if (canvasRef.current) {
            initDraw(canvasRef.current, roomId, socket);
        }
    }, [canvasRef]);

    return (
        <canvas ref={canvasRef} />
    )
}
