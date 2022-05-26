export interface VideoControlPanelProps {
    disableMicro: () => void,
    enableMicro: () => void,
    leaveRoom: () => void,
    enableVideo: () => void,
    disableVideo: () => void,
}