import axios from "axios";
import { WS_BACKEND_URL } from "../../config";
import { ChatRoom } from "../../../components/ChatRoom";

async function getRoom(slug: string) {
    const response = await axios.get(`${WS_BACKEND_URL}/room/${slug}`);
    return response.data.room.id;
}

export default async function ChatRoomPage({
    params,
}: {
    params: {
        slug: string;
    };
}) {
    const slug = params.slug;
    const roomId = await getRoom(slug);

    return <ChatRoom id={roomId} />;
}
