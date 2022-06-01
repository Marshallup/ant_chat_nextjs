import { useRef, useEffect, useCallback, useState } from "react";
import { Button } from "antd";
import { useRouter } from "next/router";
import mySocket from "@/services/socket";
import freeice from 'freeice';
import { notification } from 'antd';
import { ACTIONS } from "@/utils/ACTIONS_ROOMS";
import useStateWithCallback from "../useStateWithCallback";
import useMediaDevice from "../useMediaDevice";
import { LOCAL_VIDEO } from "./constants";
import {
    VideoElsInterface,
    MediaStreamsInterface,
    PeerConnectionsInterface,
    HandleNewPeerInterface,
    SetRemoteMediaInterface,
    HandleRemovePeerInterface,
    PeerConnectionLoaders,
} from "./interfaces";

export default function useWebRTC(roomID: string) {
    const router = useRouter();
    const [ enabledDevices, setEnabledDevices ] = useState({
        video: {
            enabled: false,
            error: false,
        },
        audio: {
            enabled: false,
            error: false,
        },
    });
    const [ isErrorDevices, setIsErrorDevices ] = useState(false);
    const { getVideoAndAudio } = useMediaDevice();
    const [ isWebRTCReady, setIsWebRTCReady ] = useState(false);
    const [ clients, setClients ] = useStateWithCallback<string[]>([]);
    const mediaStreams = useRef<MediaStreamsInterface>({
        [LOCAL_VIDEO]: null,
    })
    const videoEls = useRef<VideoElsInterface>({
        [LOCAL_VIDEO]: null,
    });
    const [videoLoaders, setVideoLoaders] = useState<PeerConnectionLoaders>({
       [LOCAL_VIDEO]: true, 
    });
    const peerConnections = useRef<PeerConnectionsInterface>({});
    const addNewClient = useCallback((clientID: string, cb: () => void) => {
        setClients(clientsID => {
            if (!clientsID.includes(clientID)) {
                return [
                    ...clientsID,
                    clientID,
                ];
            }
            return clientsID;
        }, cb);
    }, [ setClients ]);
    const setLoadingStatus = useCallback((peerID: string, status: boolean) => {
        setVideoLoaders(prevState => ({ ...prevState, [peerID]: status }));
    }, [ setVideoLoaders ]);
    const removeLoadingStatus = useCallback((peerID: string) => {
        setVideoLoaders(prevState => {
            delete prevState[peerID];
            return { ...prevState };
        });
    }, [ setVideoLoaders ]);
    const getVideoElByID = useCallback((id: string) => videoEls.current[id], []);
    const getStreamByID = useCallback((id: string) => mediaStreams.current[id], []);
    const getPeerConnectionByID = useCallback((id: string) => peerConnections.current[id], []);
    const stopLocalStracks = useCallback(() => {
        const localStream = getStreamByID(LOCAL_VIDEO);

        if (localStream) {
            localStream.getTracks()
                .forEach(track => {
                    track.stop();
                    localStream.removeTrack(track);
                });
        }
    }, [  getStreamByID ]);
    const addPeerConnection = useCallback(( peerID: string ) => {
        peerConnections.current[peerID] = new RTCPeerConnection({ iceServers: freeice(), });
    }, []);
    const addVideoInList = useCallback((peerID: string) => {
        const stream = getStreamByID(peerID);
        const videoEl = getVideoElByID(peerID);

        if (videoEl) {
            videoEl.srcObject = stream;

            setTimeout(() => {
                setLoadingStatus(peerID, false);
            }, 100);
        }

    }, [
        getStreamByID,
        getVideoElByID,
        setLoadingStatus,
    ]);
    const addOnTrackPeerConnectionByID = useCallback((peerID: string) => {
        const peerConnection = getPeerConnectionByID(peerID);
        
        if (peerConnection) {
            const stream = getStreamByID(peerID);

            let tracksLength = 0;
            peerConnection.ontrack = ({ streams: [ remotestream ] }) => {
                tracksLength++;

                if (tracksLength === 2 && stream) {
                    tracksLength = 0;

                    mediaStreams.current[peerID] = remotestream;
                    
                    addNewClient(peerID, () => {});
                }
            }
        }
    }, [
        getStreamByID,
        getPeerConnectionByID,
        addNewClient,
    ]);
    const addEventIcePeerConnectionByID = useCallback((peerID: string) => {
        const peerConnection = getPeerConnectionByID(peerID);

        if (peerConnection) {
            peerConnection.onicecandidate = event => {
                const { candidate } = event;

                if (candidate) {
                    mySocket.emit(ACTIONS.RELAY_ICE, {
                        peerID,
                        iceCandidate: candidate,
                    })
                }
            }
        }

    }, [ getPeerConnectionByID ]);
    const setLocalTrackInRemote = useCallback((peerID: string) => {
        const localStream = getStreamByID(LOCAL_VIDEO);

        if (localStream) {
            const peerConnection = getPeerConnectionByID(peerID);

            localStream.getTracks().forEach(track => {
                if (peerConnection) {
                    peerConnection.addTrack(track, localStream);
                }
            })
        }

    }, [ getStreamByID, getPeerConnectionByID ]);
    const createOfferPeerConnection = useCallback(async (peerID: string) => {
        const peerConnection = getPeerConnectionByID(peerID);

        if (peerConnection) {
            const offer = await peerConnection.createOffer();

            await peerConnection.setLocalDescription(offer);

            mySocket.emit(ACTIONS.RELAY_SDP, {
                peerID,
                sessionDescription: offer,
            });
        }

    }, [ getPeerConnectionByID ]);

    const setEnabledVideo = useCallback((status: boolean = false) => {
        const localStream = getStreamByID(LOCAL_VIDEO);

        if (localStream) {
            const tracks = localStream.getVideoTracks();

            if (tracks.length) {
                setEnabledDevices(prevState => ({
                    audio: prevState.audio,
                    video: {
                        enabled: status,
                        error: prevState.video.error,
                    },
                }));
                tracks[0].enabled = status;
            }
        }
    }, [ getStreamByID ]);
    const disableVideo = useCallback(() => {
        setEnabledVideo();
    }, [ setEnabledVideo ]);
    const enableVideo = useCallback(() => {
        setEnabledVideo(true);
    }, [ setEnabledVideo ]);
    const leaveRoom = useCallback(() => {
        stopLocalStracks();
        setIsWebRTCReady(false);
        mySocket.off(ACTIONS.SUCCESS_ROOM_CONNECTION);
        mySocket.off(ACTIONS.ERROR_ROOM_CONNECTION);
        mySocket.emit(ACTIONS.LEAVE);
    }, [ stopLocalStracks ]);
    function setEnabledMicrophone(status: boolean = false) {
        const localStream = getStreamByID(LOCAL_VIDEO);

        if (localStream) {
            const tracks = localStream.getAudioTracks();

            if (tracks.length) {
                setEnabledDevices(prevState => ({
                    audio: {
                        enabled: status,
                        error: prevState.audio.error,
                    },
                    video: prevState.video,
                }));
                tracks[0].enabled = status;
            }
        }
    }
    function disableMicrophone() {
        setEnabledMicrophone();
    }
    function enableMicrophone() {
        setEnabledMicrophone(true);
    }
    function provideMediaEls(id: string, nodeEl: HTMLVideoElement | null) {
        videoEls.current[id] = nodeEl;
    }
    const initMyVideo = useCallback(async () => {
        const streamInfo = await getVideoAndAudio();

        switch(streamInfo.deviceNotAvailable) {
            case 'audio':
                setEnabledDevices({
                    audio: {
                        enabled: false,
                        error: true,
                    },
                    video: {
                        enabled: true,
                        error: false,
                    },
                });
                throw new Error('Проверьте доступность микрофона');
            case 'video':
                setEnabledDevices({
                    audio: {
                        enabled: true,
                        error: false,
                    },
                    video: {
                        enabled: false,
                        error: true,
                    }
                });
                throw new Error('Проверьте доступность видео-камеры');
            case 'both':
                setEnabledDevices({
                    audio: {
                        enabled: false,
                        error: true,
                    },
                    video: {
                        enabled: false,
                        error: true,
                    }
                });
                throw new Error('Проверьте доступность микрофона и видео-камеры');
            default:
                setEnabledDevices({
                    audio: {
                        enabled: true,
                        error: false,
                    },
                    video: {
                        enabled: true,
                        error: false,
                    }
                });
                setLoadingStatus(LOCAL_VIDEO, true);
                break;

        }

        if (streamInfo) {
            stopLocalStracks();

            mediaStreams.current[LOCAL_VIDEO] = streamInfo.stream;

            notification.close('error_device');
        }

        return streamInfo;

    }, [
        getVideoAndAudio,
        setEnabledDevices,
        setLoadingStatus,
        stopLocalStracks,
    ]);
    const initRoomConnected = useCallback(() => {
        function joinRoom() {
            mySocket.emit(ACTIONS.JOIN, { roomID });
        }

        initMyVideo()
            .then(() => {
                setIsErrorDevices(false);
                joinRoom();
            })
            .catch(error => {
                setIsErrorDevices(true);
                notification.open({
                    message: error.message,
                    className: 'notification-error',
                    key: 'error_device',
                    duration: 0,
                    maxCount: 2,
                });
            });
    }, [
        roomID,
        initMyVideo,
        setIsErrorDevices,
    ]);


    useEffect(() => {
        function handleRemovePeer({ peerID }: HandleRemovePeerInterface) {
            if (peerConnections.current[peerID]) {
                peerConnections.current[peerID].close(); 
            }

            delete mediaStreams.current[peerID];
            delete peerConnections.current[peerID];
            
            setClients(clients => clients.filter(clientID => clientID !== peerID));
            removeLoadingStatus(peerID);
        }

        mySocket.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

        return () => {
            mySocket.off(ACTIONS.REMOVE_PEER);
        }

    },
    [
        setClients,
        removeLoadingStatus,
    ]);


    useEffect(() => {
        function handleNewPeer({ peerID, createOffer }: HandleNewPeerInterface) {
            const peerConnection = getPeerConnectionByID(peerID);

            if (peerConnection) {
                console.warn(`${peerID} already connected!`);
                return;
            }

            setLoadingStatus(peerID, true);

            mediaStreams.current[peerID] = new MediaStream();

            addPeerConnection(peerID);
            addEventIcePeerConnectionByID(peerID);
            addOnTrackPeerConnectionByID(peerID);
            setLocalTrackInRemote(peerID);

            if (createOffer) {
                createOfferPeerConnection(peerID)
            }
        }

        mySocket.on(ACTIONS.ADD_PEER, handleNewPeer);

        return () => {
            mySocket.off(ACTIONS.ADD_PEER);
        }
    },
    [
        addPeerConnection,
        addEventIcePeerConnectionByID,
        addOnTrackPeerConnectionByID,
        getPeerConnectionByID,
        setLocalTrackInRemote,
        createOfferPeerConnection,
        setLoadingStatus,
    ]);

    useEffect(() => {
        mySocket.on(ACTIONS.ICE_CANDIDATE, ({ peerID, iceCandidate }) => {
            const peerConnection = getPeerConnectionByID(peerID);

            if (peerConnection) {
                peerConnection.addIceCandidate(
                    new RTCIceCandidate(iceCandidate)
                )
            }
        });

        return () => {
            mySocket.off(ACTIONS.ICE_CANDIDATE);
          }
    }, [ getPeerConnectionByID ]);

    useEffect(() => {
        async function setRemoteMedia({ peerID, sessionDescription: remoteDescription }: SetRemoteMediaInterface) {
            const peerConnection = getPeerConnectionByID(peerID);

            if (peerConnection) {
                await peerConnection.setRemoteDescription(
                    new RTCSessionDescription(remoteDescription),
                );
    
                if (remoteDescription.type === 'offer') {
                    const answer = await peerConnection.createAnswer();
    
                    await peerConnection.setLocalDescription(answer);
    
                    mySocket.emit(ACTIONS.RELAY_SDP, {
                        peerID,
                        sessionDescription: answer
                    });
                }
            }
        }

        mySocket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);

        return () => {
            mySocket.off(ACTIONS.SESSION_DESCRIPTION);
        }
    }, [ getPeerConnectionByID ]);

    useEffect(() => {
        navigator.mediaDevices.ondevicechange = async () => {
            const checkLocalVideoEl = getVideoElByID(LOCAL_VIDEO);

            if (checkLocalVideoEl) {
                await initMyVideo()
                    .then(({ stream, deviceNotAvailable }) => {
                        if (!deviceNotAvailable) {
                            const localMediaEl = getVideoElByID(LOCAL_VIDEO);
                            disableVideo();
            
                            if (localMediaEl) {
                                localMediaEl.srcObject = stream;
                                localMediaEl.volume = 0;
            
                                Object.entries(peerConnections.current).forEach(([, peerConnection ]) => {
                                    const localStream = mediaStreams.current[LOCAL_VIDEO];
            
                                    if (localStream) {
                                        peerConnection.getSenders()
                                            .forEach((sender, idx) => {
                                                sender.replaceTrack(localStream.getTracks()[idx]);
                                            });
                                    }
                                });
            
                                setTimeout(() => {
                                    setLoadingStatus(LOCAL_VIDEO, false);
                                }, 100);
                            }
                        }
                    })
                    .catch(error => {
                        notification.open({
                            message: error.message,
                            className: 'notification-error',
                            key: 'error_device',
                            duration: 0,
                            maxCount: 2,
                        });
                    });
            } else {
                initRoomConnected();
            }
        }

        return () => {
            navigator.mediaDevices.ondevicechange = () => {};
        }
    }, [
        initMyVideo,
        getVideoElByID,
        setLoadingStatus,
        disableVideo,
        setLocalTrackInRemote,
        initRoomConnected,
    ]);

    useEffect(() => {
        function initReadyConnect() {
            mySocket.emit(ACTIONS.CLIENT_READY_CONNECT, { roomID });
        }

        initRoomConnected();

        mySocket.on(ACTIONS.ERROR_ROOM_CONNECTION, () => {
            notification.open({
                key: 'error-ws',
                message: 'Ошибка при попытке подключится к комнате',
                className: 'notification-error',
                duration: 0,
                maxCount: 2,
                btn: (
                    <Button
                        danger
                        onClick={() => {
                            notification.close('error-ws');
                            router.replace('/rooms');
                        }}
                    >
                        Перейти к списку комнат
                    </Button>
                ),
            });
            setIsErrorDevices(true);
            stopLocalStracks();
        });

        mySocket.on(ACTIONS.SUCCESS_ROOM_CONNECTION, () => {
            addNewClient(LOCAL_VIDEO, () => {
                const localMediaEl = getVideoElByID(LOCAL_VIDEO);
                const localMediaStream = mediaStreams.current[LOCAL_VIDEO];

                if (localMediaEl) {
                    localMediaEl.srcObject = localMediaStream;
                    localMediaEl.volume = 0;
                    setLoadingStatus(LOCAL_VIDEO, false);
                    setIsWebRTCReady(true);
                }

                initReadyConnect();
            });
        });

        return () => {
            leaveRoom();
        }
    }, [
        roomID,
        router,
        addNewClient,
        getVideoElByID,
        getStreamByID,
        setLoadingStatus,
        getVideoAndAudio,
        initMyVideo,
        stopLocalStracks,
        leaveRoom,
        initRoomConnected,
    ]);

    return {
        isErrorDevices,
        enabledDevices,
        isWebRTCReady,
        clients,
        videoLoaders,
        provideMediaEls,
        enableMicrophone,
        disableMicrophone,
        enableVideo,
        disableVideo,
        leaveRoom,
        addVideoInList,
    }
}

export {
    LOCAL_VIDEO
}