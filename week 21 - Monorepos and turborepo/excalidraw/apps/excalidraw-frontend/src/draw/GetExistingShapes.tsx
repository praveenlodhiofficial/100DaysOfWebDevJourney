import { HTTP_BACKEND_URL } from "@/app/config";
import axios from "axios";

export async function getExistingShapes(roomId: string) {
    try {
        const res = await axios.get(`${HTTP_BACKEND_URL}/chats/${roomId}`);
        const messages = res.data.messages;

        const shapes = messages.map((message: { message: string }) => {
            const messageData = JSON.parse(message.message);
            return messageData.shape;
        });

        console.log("Fetched shapes:", shapes);
        return shapes;
    } catch (error) {
        console.error("Error fetching existing shapes:", error);
        return [];
    }
}
