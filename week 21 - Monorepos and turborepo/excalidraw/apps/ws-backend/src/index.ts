import jwt, { decode } from 'jsonwebtoken';
import { WebSocketServer } from 'ws';
import { JWT_SECRET } from '@repo/backend-common/config';

const wss = new WebSocketServer({ port: 8080 });

function cheakUser(token: string): string | null {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if(typeof decoded === 'string') {
        return null
    }

    if(!decoded || !decoded.userId) {
        return null
    }
    return decoded.userId
}

wss.on('connection', (ws, request) => {
    const url = request.url;

    if(!url) [
        ws.close(1003, 'No url provided'),
        return;
    ]

    const queryParams = new URLSearchParams(url?.split('?'[1]))
    const token = queryParams.get('token') || '';
    const userId = cheakUser(token)

    if(!userId) {
        ws.close(1003, 'User not authenticated'),
        return;
    }

    ws.on('message', (data) => {
        ws.send(data);
    }
})