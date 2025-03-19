import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./GetExistingShapes";

type Shape = {
    type: "box";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "line";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

export class Game {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[] = [];
    private roomId: string;
    private clicked: boolean = false;
    private startX: number = 0;
    private startY: number = 0;
    private socket: WebSocket;
    private selectedTool: Tool;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.initResizeHandler();
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.selectedTool = "circle"; // Set default here explicitly if needed, but it will be overridden by setTool
        this.init();
        this.socketInitHandlers();
        this.initMouseHandlers();
    }

    private initResizeHandler() {
        const resizeCanvas = () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.clearCanvas();
        };

        resizeCanvas(); // Initial resize
        window.addEventListener("resize", resizeCanvas);
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas();
    }

    socketInitHandlers() {
        this.socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === "chat") {
                    const parsedShape = JSON.parse(message.message);
                    this.existingShapes.push(parsedShape.shape);
                    this.clearCanvas();
                }
            } catch (err) {
                console.error("Error handling WebSocket message:", err);
            }
        };
    }


    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the background
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw existing shapes
        this.existingShapes.forEach((shape) => {
            this.ctx.strokeStyle = "white";

            if (shape.type === "box") {
                this.ctx.beginPath();
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
                this.ctx.closePath();
            }
            else if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
            else if (shape.type === "line") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.x1, shape.y1);
                this.ctx.lineTo(shape.x2, shape.y2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        });
    }

    setTool(tool: "circle" | "box" | "line" | "eraser" | "pencil") {
        this.selectedTool = tool;
    }

    initMouseHandlers() {

        // Mouse Down Event
        this.canvas.addEventListener("mousedown", (e) => {
            this.clicked = true;
            this.startX = e.clientX;
            this.startY = e.clientY;
        });

        // Mouse Up Event
        this.canvas.addEventListener("mouseup", (e) => {
            if (!this.clicked) return;
            this.clicked = false;

            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;

            let shape: Shape;

            switch (this.selectedTool) {

                // Box
                case "box":
                    shape = {
                        type: "box",
                        x: this.startX,
                        y: this.startY,
                        width,
                        height
                    };
                    break;

                // Circle
                case "circle":
                    shape = {
                        type: "circle",
                        centerX: this.startX + width / 2,
                        centerY: this.startY + height / 2,
                        radius: Math.max(width, height) / 2
                    };
                    break;

                // Line
                case "line":
                    shape = {
                        type: "line",
                        x1: this.startX,
                        y1: this.startY,
                        x2: e.clientX,
                        y2: e.clientY
                    };
                    break;

                default:
                    return;
            }

            this.existingShapes.push(shape);
            this.clearCanvas();

            // Send shape to server via WebSocket
            this.socket.send(
                JSON.stringify({
                    type: "chat",
                    message: JSON.stringify({ shape }),
                    roomId: this.roomId
                })
            );
        });

        // Mouse Move Event
        this.canvas.addEventListener("mousemove", (e) => {
            if (this.clicked) {
                const width = e.clientX - this.startX;
                const height = e.clientY - this.startY;

                // Clear and redraw during drag
                this.clearCanvas();
                this.ctx.strokeStyle = "white";

                // Only draw the selected tool's shape
                switch (this.selectedTool) {

                    // Box
                    case "box":
                        this.ctx.strokeRect(this.startX, this.startY, width, height);
                        break;

                    // Circle
                    case "circle":
                        const centerX = this.startX + width / 2;
                        const centerY = this.startY + height / 2;
                        const radius = Math.max(width, height) / 2;
                        this.ctx.beginPath();
                        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                        this.ctx.stroke();
                        this.ctx.closePath();
                        break;

                    // Line
                    case "line":
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.startX, this.startY);
                        this.ctx.lineTo(e.clientX, e.clientY);
                        this.ctx.stroke();
                        this.ctx.closePath();
                        break;

                    default:
                        break;
                }
            }
        });

    }
}