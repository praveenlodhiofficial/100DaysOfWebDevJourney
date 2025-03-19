"use client"

import { useEffect, useRef, useState } from "react";
import { Game } from "@/draw/Game";
import { TopBar } from "./TopBar";

export type Tool = "pencil" | "circle" | "box" | "eraser" | "line"

export function Canvas({
    roomId,
    socket
}: {
    roomId: string,
    socket: WebSocket
}) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("circle");

    // Initialize the game
    useEffect(() => {
        if (canvasRef.current && !game) {
            const newGame = new Game(canvasRef.current, roomId, socket);
            newGame.setTool(selectedTool);
            setGame(newGame);
        }
    }, [canvasRef, roomId, socket, selectedTool]);

    // Update the tool when it changes
    useEffect(() => {
        game?.setTool(selectedTool);
    }, [selectedTool, game]);

    return (
        <>
            <canvas ref={canvasRef} />
            <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        </>
    )
}
