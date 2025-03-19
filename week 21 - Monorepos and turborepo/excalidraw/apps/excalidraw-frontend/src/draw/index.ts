export async function initDraw( canvas: HTMLCanvasElement ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Failed to get 2D context. Check if the canvas is properly initialized.");
        return;
    }
}
