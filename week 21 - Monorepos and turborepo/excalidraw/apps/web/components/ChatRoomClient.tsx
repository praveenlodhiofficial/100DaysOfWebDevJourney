"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
    messages,
    id,
}: {
    messages: string[];
    id: string;
}) {
    const [chats, setChats] = useState(messages);
    const { socket, loading } = useSocket();
    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {
        if (socket && !loading) {
            socket.send(
                JSON.stringify({
                    type: "join_room",
                    roomId: id,
                })
            );

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if (parsedData.type === "chat") {
                    setChats((chats) => [...chats, parsedData.data.message]);
                }
            };

            return () => {
                socket.close();
            };
        }
    }, [socket, loading, id]);

    const sendMessage = () => {
        if (socket && currentMessage.trim()) {
            socket.send(
                JSON.stringify({
                    type: "chat",
                    roomId: id,
                    message: currentMessage,
                })
            );
            setCurrentMessage("");
        }
    };

    return (
        <div>
            <h1>Chat Room: {id}</h1>
            <div>
                {chats.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>

            <div className="h-screen w-1/2 p-5 text-lg flex flex-col gap-2">
                <input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    type="text"
                    className="bg-slate-200 px-2 py-1 rounded"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                    Send Message
                </button>
            </div>
        </div>
    );
}
