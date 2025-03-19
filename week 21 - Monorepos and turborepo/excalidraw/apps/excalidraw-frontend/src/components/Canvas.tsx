"use client"

import { useEffect, useRef, useState } from "react";
import { initDraw } from "@/draw";
import { IconButton } from "./IconButton";
import { Pencil, Circle, RectangleHorizontal, Eraser, Minus } from "lucide-react";

type Shape = "pencil" | "circle" | "rectangle" | "eraser" | "minus"

export function Canvas({
    roomId,
    socket
}: {
    roomId: string,
    socket: WebSocket
}) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Shape>("circle");

    // create a global variable to store the selected tool
    useEffect(() => {
        // @ts-ignore
        window.selectedTool = selectedTool;
    }, [selectedTool]);

    // Initialize the canvas
    useEffect(() => {
        if (canvasRef.current) {
            initDraw(canvasRef.current, roomId, socket);
        }
    }, [canvasRef]);

    return (
        <>
            <canvas ref={canvasRef} />
            <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        </>
    )
}

function TopBar({
    selectedTool,
    setSelectedTool
}: {
    selectedTool: Shape,
    setSelectedTool: (shape: Shape) => void
}) {
    return (
        <div className="fixed flex-col border gap-5 text-white  border-white rounded-md top-5 right-5 flex justify-between items-center px-3 py-2">

            <IconButton
                icon={<Pencil />}
                onClick={() => setSelectedTool("pencil")}
                activated={selectedTool === "pencil"}
            />

            <IconButton
                icon={<Circle />}
                onClick={() => setSelectedTool("circle")}
                activated={selectedTool === "circle"}
            />

            <IconButton
                icon={<RectangleHorizontal />}
                onClick={() => setSelectedTool("rectangle")}
                activated={selectedTool === "rectangle"}
            />

            <IconButton
                icon={<Eraser />}
                onClick={() => setSelectedTool("eraser")}
                activated={selectedTool === "eraser"}
            />

            <IconButton
                icon={<Minus />}
                onClick={() => setSelectedTool("minus")}
                activated={selectedTool === "minus"}
            />


        </div>
    )
}
