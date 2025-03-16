type Shape = {
    type: "rectangle";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
}

export function initDraw(canvas: HTMLCanvasElement) {

    const ctx = canvas.getContext("2d");
    let existingShapes: Shape[] = [];

    if (!ctx) {
        console.error("Failed to get 2d context");
        return;
    }
    // Set the canvas to the full size of the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw the background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;

        existingShapes.push({
            type: "rectangle",
            x: startX,
            y: startY,
            width,
            height,
        });
    });

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {

            const width = e.clientX - startX;
            const height = e.clientY - startY;

            // Clear the canvas
            clearCanvas(existingShapes, ctx, canvas);

            // Draw the rectangle
            ctx.strokeStyle = "white";
            ctx.strokeRect(startX, startY, width, height);
        }
    });
}

function clearCanvas(existingShapes: Shape[], ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the existing shapes
    existingShapes.map((shape) => {
        if (shape.type === "rectangle") {
            ctx.strokeStyle = "white";
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    })
}

function getExistingShapes(existingShapes: Shape[], ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    existingShapes.map((shape) => {
        if (shape.type === "rectangle") {
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    })
}
