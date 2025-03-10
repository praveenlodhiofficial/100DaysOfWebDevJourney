import { useEffect, useState } from "react";
import { WS_BACKEND_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_BACKEND_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4OGUyYWE2ZS1lNTk0LTRiMGQtOWFiYi1lMTRhZjhkZjdhODkiLCJlbWFpbCI6InByYXZlZW5sb2RoaS5vZmZpY2lhbEBnbWFpbC5jb20iLCJpYXQiOjE3NDE2MzcyODgsImV4cCI6MTc0MTcyMzY4OH0.4B5Ana_2LUvmlvWBnIkdRG87A_RcVrHGJ8B8lbVYISw`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }

}