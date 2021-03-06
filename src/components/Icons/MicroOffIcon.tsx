import React, { forwardRef, SVGAttributes } from "react";

const MicroOffIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>((props, ref) => {
    return (
        <svg
            ref={ref}
            width={'1em'}
            height={'1em'}
            { ...props }
            viewBox="0 0 30 32"
        >
            <g>
                <path d="M21,14V8A6,6,0,0,0,10,4.73L20.79,15.55A5.63,5.63,0,0,0,21,14Z"/>
                <path d="M25,14a1,1,0,0,0-2,0,8,8,0,0,1-.64,3.12l1.5,1.5A9.84,9.84,0,0,0,25,14Z"/>
                <path d="M28.71,26.29l0,0-5.92-5.92L21.32,18.9l-1.43-1.43L9.14,6.72,4.71,2.29A1,1,0,0,0,3.29,3.71L9,9.42V14a6,6,0,0,0,9.47,4.89h0l1.43,1.43A8,8,0,0,1,7,14a1,1,0,0,0-2,0,10,10,0,0,0,9,9.95V28H10a1,1,0,0,0,0,2H20a1,1,0,0,0,0-2H16V23.95a10,10,0,0,0,5.33-2.2l6,6a1,1,0,0,0,1.42,0A1,1,0,0,0,28.71,26.29Z"/>
            </g>
        </svg>
    )
});

MicroOffIcon.displayName = 'MicroOffIcon';

export default MicroOffIcon;