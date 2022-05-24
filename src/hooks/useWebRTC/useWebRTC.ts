import mySocket from "@/services/socket";
import freeice from 'freeice';
import { ACTIONS } from "@/utils/ACTIONS_ROOMS";
import { useRef, useEffect, useCallback, useState } from "react";
import useStateWithCallback from "../useStateWithCallback";
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
    const addPeerConnection = useCallback(( peerID: string ) => {
        peerConnections.current[peerID] = new RTCPeerConnection({ iceServers: freeice(), });
    }, []);
        const addVideoInList = useCallback((peerID: string) => {
        const stream = getStreamByID(peerID);

        addNewClient(peerID, () => {
            const videoEl = getVideoElByID(peerID);

            if (videoEl) {
                videoEl.srcObject = stream;
            }
        });

    }, [ getStreamByID, addNewClient, getVideoElByID ]);
    const addOnTrackPeerConnectionByID = useCallback((peerID: string) => {
        const peerConnection = getPeerConnectionByID(peerID);
        
        if (peerConnection) {
            peerConnection.ontrack = ({ streams: [ remotestream ] }) => {
                remotestream.getTracks().forEach(track => {
                    const stream = getStreamByID(peerID);
    
                    if (stream) {
                        stream.addTrack(track);
                        addVideoInList(peerID);
                        setLoadingStatus(peerID, false);
                    }
                });
            }
        }
    }, [ getStreamByID, getPeerConnectionByID, addVideoInList, setLoadingStatus ]);
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
            localStream.getTracks().forEach(track => {
                const peerConnection = getPeerConnectionByID(peerID);

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

    function setEnabledMicrophone(status: boolean = false) {
        const localStream = getStreamByID(LOCAL_VIDEO);

        if (localStream) {
            localStream.getAudioTracks()[0].enabled = status;
        }
    }
    function disableMicrophone() {
        setEnabledMicrophone(false);
    }

    function enableMicrophone() {
        setEnabledMicrophone(true);
    }
    function provideMediaEls(id: string, nodeEl: HTMLVideoElement | null) {
        videoEls.current[id] = nodeEl;
    }

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

    }, [ setClients, removeLoadingStatus ]);


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
        async function initMyVideo() {
            mediaStreams.current[LOCAL_VIDEO] = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });

            addNewClient(LOCAL_VIDEO, () => {
                const localMediaEl = getVideoElByID(LOCAL_VIDEO);
                const localMediaStream = mediaStreams.current[LOCAL_VIDEO];

                if (localMediaEl) {
                    localMediaEl.srcObject = localMediaStream;
                    localMediaEl.volume = 0;
                    setLoadingStatus(LOCAL_VIDEO, false);
                }
            })
        }

        initMyVideo()
            .then(() => mySocket.emit(ACTIONS.JOIN, { roomID }))
            .catch(error => {
                console.log(error, 'error init my video');
            });


        return () => {
            const localStream = getStreamByID(LOCAL_VIDEO);

            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
                mySocket.emit(ACTIONS.LEAVE);
            }
        }
        
    }, [ roomID, addNewClient, getVideoElByID, getStreamByID, setLoadingStatus ]);

    return {
        clients,
        videoLoaders,
        provideMediaEls,
        enableMicrophone,
        disableMicrophone,
    }
}

export {
    LOCAL_VIDEO
}