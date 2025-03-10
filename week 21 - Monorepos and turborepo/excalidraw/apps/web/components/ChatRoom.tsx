import axios from "axios";
import { HTTP_BACKEND_URL } from "../app/config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: string) {
    try {
        const response = await axios.get(`${HTTP_BACKEND_URL}/chats/${roomId}`);
        return response.data.messages;
    } catch (error) {
        console.error("Error fetching chats:", error);
        return []; // Return an empty array or handle the error as needed
    }
}

export async function ChatRoom({ id }: { id: string }) {
    const messages = await getChats(id);
    return (
        <ChatRoomClient
            id={id}
            messages={messages}
        />
    )
}
