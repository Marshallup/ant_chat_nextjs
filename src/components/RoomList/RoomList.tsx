import React, { FC, useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ACTIONS } from "@/utils/ACTIONS_ROOMS";
import ChatSocket from "@/services/socket";


const RoomList: FC = () => {
    const [ rooms, setRooms ] = useState([]);
    const router = useRouter();
    const rootNode = useRef<HTMLUListElement>(null);

    useEffect(() => {
        ChatSocket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
            if (rootNode.current) {
                setRooms(rooms);
            }
        })

    }, []);

    return (
        <ul ref={rootNode}>

            { rooms.map(roomID => (
                <li key={roomID}>
                    { roomID }

                    <button
                        onClick={() => {
                            router.push(`/rooms/${roomID}`)
                        }}
                    >
                        JOIN ROOM
                    </button>
                </li>
            ))}

            </ul>
    )
}

export default RoomList;