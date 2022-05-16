import type { NextPage, GetServerSidePropsContext } from 'next';
import useWebRTC from '@/hooks/useWebRTC';
import { VideoRoomIDBody } from '@/styles/pages/roomID';
import VideoList from '@/components/VideoList';

const Room: NextPage<{ roomID: string }> = ({ roomID }) => {
    const {
        clients,
        provideMediaRef,
        disableMicrophone,
        enableMicrophone,
    } = useWebRTC(roomID);
    
    return (
        <>
            <VideoRoomIDBody>
                <VideoList
                    clients={clients}
                    provideMediaRef={provideMediaRef}
                />
            </VideoRoomIDBody>
            <div onClick={disableMicrophone}>
                OFF MICRO
            </div>
            <div onClick={enableMicrophone}>
                ENABLE MICRO
            </div>
        </>
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