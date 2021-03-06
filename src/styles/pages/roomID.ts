import styled from "styled-components";
import Video from "@/components/Video";
import UserIcon from "@/components/Icons/UserIcon";
import { MEDIA_WIDTH } from "../vars";

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

    @media screen and (max-width: ${MEDIA_WIDTH.MOBILE}) {
        margin: -1rem;
    }
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
            max-height: calc(50vh - 2rem);
            min-height: 16rem;
        }
    }

    @media screen and (max-width: ${MEDIA_WIDTH.MOBILE}) {
        &.two-client {
            flex-basis: 100%;

            video {
                max-height: calc(50vh - 2rem);
                min-height: 15rem;
            }
        }

        &.many-client {
            flex-basis: 50%;

            min-width: 18rem;
        }
    }
`;
export const VideoRoomElInner = styled.div`
    position: relative;
    border-radius: 2rem;
`;
export const VideoRoomElInnerWrap = styled.div`
    padding: 1rem;
    border-radius: inherit;
`;
export const VideoRoomElOverlay = styled.div`
    border-radius: inherit;
    position: relative;
    &:before {
        content: '';
        border-radius: inherit;
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }
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

    @media screen and (max-width: ${MEDIA_WIDTH.MOBILE}) {
        bottom: auto;
        top: 1rem;
    }
`;
export const VideoLoaderInner = styled.div`
    font-size: 5rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
`;
export const VideoRoomEl = styled(Video)`
    border-radius: inherit;
    display: block;
    width: 100%;
    max-height: calc(100vh - 2rem);
    object-fit: cover;
    transform: scaleX(-1);
`;
export const VideoUserIcon = styled(UserIcon)`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
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