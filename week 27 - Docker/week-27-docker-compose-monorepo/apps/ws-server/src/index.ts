import { prismaClient } from "@repo/db/prismaClient";

Bun.serve({
    port: 3002,
    fetch: (req, server) => {
        if(server.upgrade(req)) {
            return;
        }
        return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        message: async (ws, message) => {
            const user = await prismaClient.user.create({
                data: {
                    username: Math.random().toString(36).substring(2, 15),
                    password: Math.random().toString(36)
                }
            })
            ws.send(JSON.stringify({
                success: true,
                user,
                message: "User created successfully"
            }))
        },
    }
})