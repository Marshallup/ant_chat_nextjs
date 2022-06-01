import type { NextPage } from 'next';
import { useEffect, useState, useRef } from 'react';
import { MainEmptyRooms } from '@/styles/pages/rooms';
import RoomList from '@/components/RoomList';
import MainHeader from '@/components/Main/MainHeader';
import Head from 'next/head';
import mySocket from '@/services/socket';
import { ACTIONS } from '@/utils/ACTIONS_ROOMS';

const Rooms: NextPage = () => {
    const [ rooms, setRooms ] = useState([]);
    const rootNode = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mySocket.on(ACTIONS.SHARE_ROOMS, ({ rooms } = {}) => {
            if (rootNode.current) {
                setRooms(rooms);
            }
        });

        mySocket.emit(ACTIONS.GET_ROOMS);
    }, []);

    return (
        <>
            <Head>
                <title>Список комнат</title>
            </Head>

            <MainHeader />

            <div
                ref={rootNode}
            >
                { !rooms?.length ? (
                    <MainEmptyRooms level={2}>Комнат пока нет!</MainEmptyRooms>
                ) : (
                    <RoomList rooms={rooms} />
                )}
            </div>
        </>
    )
}

export default Rooms;