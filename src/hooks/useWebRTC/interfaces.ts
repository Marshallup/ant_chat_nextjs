export interface peerMediaElementsInterface {
    LOCAL_VIDEO: HTMLVideoElement | null,
    [key: string]: HTMLVideoElement | null,
}
export interface peerConnectionInterface {
    [key: string]: RTCPeerConnection,
}
export interface handleNewPeerInterface {
    peerID: string,
    createOffer: boolean,
}
export interface setRemoteMediaInterface {
    peerID: string,
    sessionDescription: RTCSessionDescription,
}
export interface handleRemovePeer {
    peerID: string
}
export type ProvideMediaRefFn = (id: string, node: HTMLVideoElement | null) => void