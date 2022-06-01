import React, { forwardRef, SVGAttributes } from "react";

const VideoOnIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>((props, ref) => {
    return (
        <svg
            ref={ref}
            width={'1em'}
            height={'1em'}
            viewBox="0 0 32 32"
            { ...props }
        >
            <path d="M21.743 12.764v-3.077c0-1.23-1.026-2.154-2.154-2.154h-13.435c-1.231 0-2.154 0.923-2.154 2.154v12.717c0 1.23 1.026 2.154 2.154 2.154h13.435c1.23 0 2.154-0.923 2.154-2.154v-3.077l6.256 3.897v-14.358c0.102 0-6.256 3.897-6.256 3.897v0.001z"/>
        </svg>
    )
});

VideoOnIcon.displayName = 'VideoOnIcon';

export default VideoOnIcon;