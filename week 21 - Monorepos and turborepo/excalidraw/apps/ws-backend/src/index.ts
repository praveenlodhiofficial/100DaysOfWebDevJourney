import jwt from 'jsonwebtoken';
import { WebSocketServer } from 'ws';
import { JWT_SECRET } from '@repo/backend-common/config';

const wss = new WebSocketServer({ port: 8080 });

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
    const url = request.url;

    if (!url) {
        ws.close(1003, 'No URL provided');
        return;
    }

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || '';
    const userId = checkUser(token);

    if (!userId) {
        ws.close(1003, 'User not authenticated');
        return;
    }

    ws.on('message', (data) => {
        ws.send(data); // Echo the received message back to the client
    });

    ws.send('Connection established'); // Optional: notify client of successful connection
});
