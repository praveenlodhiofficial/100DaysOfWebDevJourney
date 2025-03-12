import jwt from 'jsonwebtoken';
import { WebSocketServer, WebSocket } from 'ws';
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from '@repo/db/prismaClient';

interface User {
    userId: string;
    rooms: string[];
    ws: WebSocket;
}

const wss = new WebSocketServer({ port: 8080 });
const users: User[] = []; // Array to manage user state

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded === 'string' || !decoded || !decoded.userId) {
            return null;
        }

        return decoded.userId;
    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
}

wss.on('connection', (ws, request) => {
    try {
        const url = request.url;

        if (!url) {
            ws.close(1003, 'No URL provided');
            return;
        }

        const queryParams = new URLSearchParams(url.split('?')[1]);
        const token = queryParams.get('token') || '';
        const userId = checkUser(token);

        if (userId === null) {
            ws.close(1003, 'User not authenticated');
            return null;
        }

        // Add the user to the users array
        users.push({
            userId,
            ws,
            rooms: [],
        });

        console.log(`User connected: ${userId}`);

        ws.on('message', async (data) => {
            try {
                const parsedData = JSON.parse(data as unknown as string);

                if (parsedData.type === 'join_room') {
                    const user = users.find(x => x.ws === ws);
                    if (user) {
                        if (!user.rooms.includes(parsedData.roomId)) {
                            user.rooms.push(parsedData.roomId);
                            console.log(`User ${user.userId} joined room: ${parsedData.roomId}`);
                        }
                    }
                }

                if (parsedData.type === 'leave_room') {
                    const user = users.find((x) => x.ws === ws);
                    if (user) {
                        user.rooms = user.rooms.filter(roomId => roomId !== parsedData.roomId);
                        console.log(`User ${user.userId} left room: ${parsedData.roomId}`);
                    }
                }

                if (parsedData.type === 'chat') {
                    const roomId = parsedData.roomId;
                    const message = parsedData.message;

                    await prismaClient.chat.create ({
                        data: {
                            message,
                            roomId,
                            userId
                        }
                    });

                    console.log(`Message in room ${roomId}: ${message}`);

                    users.forEach((user) => {
                        if (user.rooms.includes(roomId)) {
                            user.ws.send(
                                JSON.stringify({
                                    type: 'chat',
                                    message,
                                    roomId,
                                })
                            );
                            console.log(`Message sent to user ${user.userId} in room ${roomId}`);
                        }
                    });
                }
            } catch (messageError) {
                console.error('Error processing message:', messageError);
                ws.send(JSON.stringify({ error: 'Invalid message format or data' }));
            }
        });

        ws.on('close', () => {
            // Remove the user from the users array on disconnection
            const userIndex = users.findIndex((user) => user.ws === ws);
            if (userIndex !== -1) {
                if (users[userIndex]) {
                    console.log(`User disconnected: ${users[userIndex].userId}`);
                    users.splice(userIndex, 1);
                }
            }
        });

        // Notify the client of a successful connection
        ws.send('Connection established');
    } catch (connectionError) {
        console.error('Error during WebSocket connection:', connectionError);
        ws.close(1011, 'Internal server error');
    }
});
