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
    border-radius: 2rem;

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
        }
    }
`;
export const VideoRoomEl = styled.video`
    border-radius: inherit;
    display: block;
    width: 100%;
    max-height: 100vh;
    object-fit: cover;
    padding: 1rem;
`;