"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
    messages = [],
    id,
}: {
    messages?: { message: string }[];
    id: string;
}) {
    const [chats, setChats] = useState(messages); // Use `chats` for rendering
    const { socket, loading } = useSocket();
    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {
        if (socket && !loading) {
            // Join the room
            socket.send(
                JSON.stringify({
                    type: "join_room",
                    roomId: id,
                })
            );

            // Listen for incoming messages
            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if (parsedData.type === "chat") {
                    setChats((prevChats) => [
                        ...prevChats,
                        { message: parsedData.message },
                    ]);
                }
            };

            return () => {
                socket.close(); // Cleanup socket on unmount
            };
        }
    }, [socket, loading, id]);

    const sendMessage = () => {
        socket?.send(
            JSON.stringify({
                type: "chat",
                roomId: id,
                message: currentMessage,
            })
        );
        setCurrentMessage(""); // Clear the input field
    };

    return (
        <div className="h-screen p-5 text-lg flex flex-col gap-2">

            <h1 className="text-5xl mb-5">Chat Room: {id}</h1>

            <div className="flex w-full gap-5">
                <div className="flex w-1/2 border h-screen p-5 rounded-md border-dashed flex-col gap-2 overflow-y-auto max-h-[70vh]">
                    {chats.length > 0 ? (
                        chats.slice().reverse().map((chat, index) => (
                            <div key={index} className="bg-gray-100 p-2 rounded">
                                {chat.message}
                            </div>
                        ))
                    ) : (
                        <p>No messages yet</p>
                    )}
                </div>

                <div className="flex w-1/2 border p-5 rounded-md border-dashed flex-col gap-2">
                    <input
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        type="text"
                        className="bg-slate-200 px-2 py-1 rounded h-full text-wrap text-center"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
                    >
                        Send Message
                    </button>
                </div>

            </div>
        </div>
    );
}
