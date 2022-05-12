import { useEffect, useState } from "react";
import { ACTIONS } from "@/utils/ACTIONS_ROOMS";
import ChatSocket from "@/services/socket";


export default function useRoomList(): string[] {
    const [ rooms, setRooms ] = useState([]);

    useEffect(() => {
        ChatSocket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
            setRooms(rooms);
        })

    }, []);

    return rooms;
}