export interface VideoControlPanelProps {
    isAudioAvailable: boolean,
    isVideoAvailable: boolean,
    isVideoError: boolean,
    isAudioError: boolean,
    disableMicro: () => void,
    enableMicro: () => void,
    leaveRoom: () => void,
    enableVideo: () => void,
    disableVideo: () => void,
}