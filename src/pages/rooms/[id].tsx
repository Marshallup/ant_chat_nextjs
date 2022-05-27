import type { NextPage, GetServerSidePropsContext } from "next";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import {
    VideoRoomBody,
    VideoRoomElWrap,
    VideoRoomEl,
    VideoRoomBodyInner,
    VideoRoomElInner,
    VideoOverlay,
    VideoLoaderInner,
    VideoLoaderWrap,
    VideoItemName,
    PageLoaderWrap,
} from '@/styles/pages/roomID';
import { Loader } from "@/styles/GeneralComponents";
import VideoControlPanel from "@/components/VideoControlPanel";
import useWebRTC, { LOCAL_VIDEO } from "@/hooks/useWebRTC";


const Room: NextPage<{ roomID: string }> = ({ roomID }) => {
    const {
        enabledDevices,
        isWebRTCReady,
        clients,
        videoLoaders,
        provideMediaEls,
        enableMicrophone,
        disableMicrophone,
        enableVideo,
        disableVideo,
    } = useWebRTC(roomID);
    const router = useRouter();
    const isLocalClient = useCallback((clientID: string) => {
        if (clientID === LOCAL_VIDEO && clients.length > 1) {
            return true
        }
    }, [ clients ]);
    function leaveRoom() {
        router.replace('/rooms');
    }
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
                <PageLoaderWrap className={ isWebRTCReady ? 'hide' : '' }>
                    <Loader />
                </PageLoaderWrap>   
                { clients.map(clientID => (
                <VideoRoomElWrap
                    className={classVideoList}
                    key={clientID}
                >
                    <VideoRoomElInner>
                        <VideoOverlay>
                            { videoLoaders[clientID] && (
                                <VideoLoaderWrap>
                                    <VideoLoaderInner>
                                        <Loader />
                                    </VideoLoaderInner>
                                </VideoLoaderWrap>
                            )}
                            { isLocalClient(clientID) && <VideoItemName>Вы</VideoItemName> }
                        </VideoOverlay>
                        <VideoRoomEl
                            ref={instance => provideMediaEls(clientID, instance)}
                            width={720}
                            height={720}
                            autoPlay
                            playsInline
                        />
                    </VideoRoomElInner>
                </VideoRoomElWrap>
                ))}
                <VideoControlPanel
                    isAudioAvailable={enabledDevices.audio.enabled}
                    isVideoAvailable={enabledDevices.video.enabled}
                    isAudioError={enabledDevices.audio.error}
                    isVideoError={enabledDevices.video.error}
                    leaveRoom={leaveRoom}
                    enableMicro={enableMicrophone}
                    disableMicro={disableMicrophone}
                    enableVideo={enableVideo}
                    disableVideo={disableVideo}
                />
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