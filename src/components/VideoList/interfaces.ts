import { ProvideMediaRefFn } from "@/hooks/useWebRTC/interfaces"

export interface VideoListProps {
    clients: string[],
    provideMediaRef: ProvideMediaRefFn
}
