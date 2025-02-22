import jwt from 'jsonwebtoken';

import { WebSocketServer } from 'ws';

import { JWT_SECRET } from '@repo/backend-common/config'

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws, request) => {
    try {
        // Parse query parameters from the URL
        const url = request.url?.split('?')[1] || ''
        const queryParams = new URLSearchParams(url);
        const token = queryParams.get('token') || '';

        // Verify the JWT
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            ws.close(1008, 'Invalid token'); // Close with policy violation (1008)
            return;
        }

        // Validate decoded token
        if (typeof decoded !== 'object' || !('userId' in decoded)) {
            ws.close(1008, 'Invalid token payload');
            return;
        }

        const userId = decoded.userId;

        // Handle incoming messages
        ws.on('message', (message) => {
            console.log(`Received message from user ${userId}: ${message}`);
            ws.send('pong');
        });

        console.log(`WebSocket connection established for user ${userId}`);
    
    } catch (error) {
    
        console.error('WebSocket error:', error);
        ws.close(1011, 'ws-index : Internal server error'); 
    
    }
});
