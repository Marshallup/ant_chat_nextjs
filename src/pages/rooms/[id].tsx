import type { NextPage, GetServerSidePropsContext } from "next";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { VideoRoomBody, VideoRoomElWrap, VideoRoomEl, VideoRoomBodyInner } from '@/styles/pages/roomID';
import useWebRTC from "@/hooks/useWebRTC";


const Room: NextPage<{ roomID: string }> = ({ roomID }) => {
    const {
        clients,
        provideMediaEls,
    } = useWebRTC(roomID);
    const classVideoList = useMemo(() => {
        const countClients = clients.length;
        const className = '-client';

        if (countClients <= 1) {
            return 'one' + className;
        } else if (countClients === 2) {
            return 'two' + className;
        }

        return 'many' + className;

    }, [ clients ]);

    return (
        <VideoRoomBody>
            <VideoRoomBodyInner>
                { clients.map(clientID => (
                    <VideoRoomElWrap
                        className={classVideoList}
                        key={clientID}
                    >
                        <VideoRoomEl
                            ref={instance => provideMediaEls(clientID, instance)}
                            width={720}
                            height={720}
                            autoPlay
                            playsInline
                        />
                    </VideoRoomElWrap>
                ))}
            </VideoRoomBodyInner>
        </VideoRoomBody>
    )
}


export const getServerSideProps = ( context: GetServerSidePropsContext ) => {
    const { params } = context;

    return {
        props: {
            roomID: params?.id
        }
    };
}

export default Room;









// import type { NextPage, GetServerSidePropsContext } from 'next';
// import useWebRTC from '@/hooks/useWebRTC';
// import { useRouter } from 'next/router';
// import { VideoRoomIDBody } from '@/styles/pages/roomID';
// import VideoList from '@/components/VideoList';
// import VideoControlPanel from '@/components/VideoControlPanel';

// const Room: NextPage<{ roomID: string }> = ({ roomID }) => {
//     const router = useRouter();
//     const {
//         clients,
//         provideMediaRef,
//         disableMicrophone,
//         enableMicrophone,
//     } = useWebRTC(roomID);

//     function leaveRoom() {
//         router.push('/rooms');
//     }
    
//     return (
//         <>
//             <VideoRoomIDBody>
//                 <VideoList
//                     clients={clients}
//                     provideMediaRef={provideMediaRef}
//                 />
//             </VideoRoomIDBody>
//             <VideoControlPanel
//                 enableMicro={enableMicrophone}
//                 disableMicro={disableMicrophone}
//                 leaveRoom={leaveRoom}
//             />
//         </>
//     )
// }

// export const getServerSideProps = ( context: GetServerSidePropsContext ) => {
//     const { params } = context;

//     return {
//         props: {
//             roomID: params?.id
//         }
//     };
// }

// export default Room;