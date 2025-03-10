import { useEffect, useState } from "react";
import { WS_BACKEND_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WS_BACKEND_URL);

        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        };

        return () => ws.close(); // Cleanup
    }, []);

    return {
        socket,
        loading,
    };
}
