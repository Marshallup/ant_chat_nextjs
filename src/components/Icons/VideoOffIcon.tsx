import React, { forwardRef, SVGAttributes } from "react";

const VideoOffIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>((props, ref) => {
    return (
        <svg
            ref={ref}
            version="1.1"
            width={'1em'}
            height={'1em'}
            viewBox="0 0 24 24"
            { ...props }
        >
            <path d="M3.27,2L2,3.27L4.73,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16C16.2,18 16.39,17.92 16.54,17.82L19.73,21L21,19.73M21,6.5L17,10.5V7A1,1 0 0,0 16,6H9.82L21,17.18V6.5Z" />
        </svg>
    )
});

VideoOffIcon.displayName = 'VideoOffIcon';

export default VideoOffIcon;