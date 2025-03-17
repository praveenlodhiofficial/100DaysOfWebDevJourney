import { HTTP_BACKEND_URL } from "@/app/config";
import axios from "axios";

type Shape =
    | {
          type: "rectangle";
          x: number;
          y: number;
          width: number;
          height: number;
      }
    | {
          type: "circle";
          centerX: number;
          centerY: number;
          radius: number;
      };

export async function initDraw(
    canvas: HTMLCanvasElement,
    roomId: string,
    socket: WebSocket
) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Failed to get 2D context. Check if the canvas is properly initialized.");
        return;
    }

    // Fetch existing shapes from API
    let existingShapes: Shape[] = await getExistingShapes(roomId);

    // Resize the canvas to fit the window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (!ctx) return;
        clearCanvas(existingShapes, ctx, canvas);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // WebSocket integration
    socket.onopen = () => console.log("WebSocket connection established.");
    socket.onerror = (err) => console.error("WebSocket error:", err);
    socket.onmessage = (event) => {
        try {
            const message = JSON.parse(event.data);
            if (message.type === "chat") {
                const parsedShape = JSON.parse(message.message);
                existingShapes.push(parsedShape.getExistingShapes);
                clearCanvas(existingShapes, ctx, canvas);
            }
        } catch (err) {
            console.error("Error handling WebSocket message:", err);
        }
    };

    // Draw initial canvas background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Handle drawing events
    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    canvas.addEventListener("mouseup", (e) => {
        if (!clicked) return;
        clicked = false;

        const width = e.clientX - startX;
        const height = e.clientY - startY;
        const shape: Shape = {
            type: "rectangle",
            x: startX,
            y: startY,
            width,
            height,
        };

        existingShapes.push(shape);
        clearCanvas(existingShapes, ctx, canvas);

        // Send shape to server via WebSocket
        socket.send(
            JSON.stringify({
                type: "chat",
                message: JSON.stringify({
                    shape
                }),
                roomId
            })
        );
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!clicked) return;

        const width = e.clientX - startX;
        const height = e.clientY - startY;

        // Clear and redraw during drag
        clearCanvas(existingShapes, ctx, canvas);
        ctx.strokeStyle = "white";
        ctx.strokeRect(startX, startY, width, height);
    });
}

function clearCanvas(
    existingShapes: Shape[],
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw existing shapes
    existingShapes.forEach((shape) => {
        if (shape.type === "rectangle") {
            ctx.strokeStyle = "white";
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    });
}

async function getExistingShapes(roomId: string) {
    try {
        const res = await axios.get(`${HTTP_BACKEND_URL}/chats/${roomId}`);
        const messages = res.data.messages;

        const shapes = messages.map((message: { message: string }) => {
            const messageData = JSON.parse(message.message);
            return messageData.shape;
        });

        console.log("Fetched shapes:", shapes);
        return shapes;
    } catch (error) {
        console.error("Error fetching existing shapes:", error);
        return [];
    }
}
