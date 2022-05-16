import type { NextPage } from 'next';
import { useEffect, useState, useRef } from 'react';
import RoomList from '@/components/RoomList';
import MainHeader from '@/components/Main/MainHeader';
import Head from 'next/head';
import chatSocket from '@/services/socket';
import { ACTIONS } from '@/utils/ACTIONS_ROOMS';

const Rooms: NextPage = () => {
    const [ rooms, setRooms ] = useState([]);
    const rootNode = useRef<HTMLUListElement>(null);

    useEffect(() => {
        chatSocket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
            if (rootNode.current) {
                setRooms(rooms);
            }
        })

    }, []);

    return (
        <>
            <Head>
                <title>Rooms</title>
            </Head>

            <MainHeader />

            <RoomList
                rooms={rooms}
                ref={rootNode}
            />
        </>
    )
}

export default Rooms;