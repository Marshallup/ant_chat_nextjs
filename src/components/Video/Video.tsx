import React, { forwardRef, FC, PropsWithChildren } from "react";
import { VideoProps, VideoWrapProps } from "./interfaces";
import { VideoEl, VideoElWrap } from "./styles";

const Video = forwardRef<HTMLVideoElement, VideoProps>(({ ...props }, ref) => {
    return (
        <VideoEl
            ref={ref}
            { ...props }
        />
    )
});

export const VideoWrap: FC<PropsWithChildren<VideoWrapProps>> = ({ children, ...props }) => {
    return (
        <VideoElWrap { ...props } >
            { children }
        </VideoElWrap>
    )
}

const VideoList: FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <ul>
            { children }
        </ul>
    )
} 

Video.displayName = 'Video';

export default Video;