import { LOCAL_VIDEO } from "./constants";

export type VideoElType = HTMLVideoElement | null;
export type MediaStreamType = MediaStream | null;

export interface VideoElsInterface {
    [LOCAL_VIDEO]: VideoElType,
    [key: string]: VideoElType,
}
export interface MediaStreamsInterface {
    [LOCAL_VIDEO]: MediaStreamType,
    [key: string]: MediaStreamType,
}
export interface PeerConnectionsInterface {
    [key: string]: RTCPeerConnection,
}
export interface HandleNewPeerInterface {
    peerID: string,
    createOffer: boolean,
}
export interface SetRemoteMediaInterface {
    peerID: string,
    sessionDescription: RTCSessionDescription,
}
export interface HandleRemovePeerInterface {
    peerID: string
}
export type ProvideMediaRefFn = (id: string, node: HTMLVideoElement | null) => void