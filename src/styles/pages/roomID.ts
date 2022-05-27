import styled from "styled-components";

export const VideoRoomIDBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    height: 100vh;
    max-height: calc(100vh - 40px);
    min-height: 400px;
    margin: -10px;
`;
export const VideoRoomBody = styled.div`
    margin: -2rem;
    background: #2D2D2D;
    min-height: 100vh;
`;
export const VideoRoomBodyInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;
export const VideoRoomElWrap = styled.div`
    min-width: 32rem;

    &.one-client {
        flex-basis: 100%;
    }
    &.two-client {
        flex-basis: 50%;
    }
    &.many-client {
        flex-basis: 33%;
        video {
            max-height: 50vh;
            min-height: 16rem;
        }
    }
`;
export const VideoRoomElInner = styled.div`
    position: relative;
    border-radius: 2rem;
`;
export const VideoOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;
export const VideoLoaderWrap = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #332f2f;
    z-index: 1;
`;
export const VideoItemName = styled.div`
    color: white;
    position: absolute;
    padding: 1rem;
    bottom: 1rem;
    left: 1rem;
    z-index: 1;
`;
export const VideoLoaderInner = styled.div`
    font-size: 5rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
`;
export const VideoRoomEl = styled.video`
    border-radius: inherit;
    display: block;
    width: 100%;
    max-height: 100vh;
    object-fit: cover;
    padding: 1rem;
    transform: scaleX(-1);
`;
export const PageLoaderWrap = styled.div`
    font-size: 12rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: visible;
    opacity: 1;
    background-color: #2D2D2D;
    z-index: 10;
    transition: visibility .3s ease, opacity .3s ease;

    &.hide {
        opacity: 0;
        visibility: hidden;
    }
`;