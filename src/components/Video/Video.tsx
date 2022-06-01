import React, { useEffect, forwardRef, VideoHTMLAttributes } from "react";
import { VideoProps } from "./interfaces";

const Video = forwardRef<HTMLVideoElement, VideoProps & VideoHTMLAttributes<HTMLVideoElement>>(({ id, cbOnMounted, ...props }, ref) => {

    useEffect(() => {
        cbOnMounted(id);
    }, [ id, cbOnMounted ]);

    return (
        <video ref={ref} { ...props } />
    )
});

Video.displayName = 'MyVideo';

export default Video;