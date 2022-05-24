import styled from "styled-components";

export const VideoPanel = styled.div`
    padding: 1rem;
    position: fixed;
    display: flex;
    justify-content: center;
    bottom: 1rem;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
`;

export const ControlItem = styled.div<{ isRed?: boolean }>`
    width: 4vw;
    height: 4vw;
    font-size: 2vw;
    max-width: 10rem;
    max-height: 10rem;
    min-width: 50px;
    min-height: 50px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ isRed }) => isRed ? 'rgba(255, 5, 5, 0.7);' : 'rgba(53, 53, 53, 0.7);'};
    backdrop-filter: blur(14px);
    cursor: pointer;

    @media screen and (max-width: 1100px) {
        font-size: 2.376rem;
    }
    @media screen and (min-width: 2000px) {
        font-size: 4.5rem;
    }
`;