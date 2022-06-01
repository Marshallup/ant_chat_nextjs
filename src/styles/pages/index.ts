import styled from "styled-components";
import { Row } from "antd";
import { MEDIA_WIDTH } from "../vars";

export const MainRow = styled(Row)`
    min-height: calc(100vh - 4rem);

    @media screen and (max-width: 900px) {
        justify-content: center;
        text-align: center;

        & > div:first-child {
            flex: 1;
            max-width: none;
        }
        & > div:last-child {
            display: none;
        }
    }
`;
export const MainRowBtns = styled(Row)`
    @media screen and (max-width: 900px) {
        justify-content: center;
    }
`;
export const MainTitle = styled.h1`
    margin-bottom: 4.2rem;
    font-size: 5rem;
    font-weight: 400;
    max-width: 64.1rem;
    line-height: 7.2rem;

    @media screen and (max-width: ${MEDIA_WIDTH.SMALL_DESKTOP}) {
        font-size: 4rem;
        line-height: 5.2rem;
        max-width: 47.1rem;
    }

    @media screen and (max-width: 900px) {
        margin-left: auto;
        margin-right: auto;
    }

    @media screen and (max-width: ${MEDIA_WIDTH.MOBILE}) {
        margin-bottom: 3.2rem;
        font-size: 3rem;
        line-height: 3.7rem;
        max-width: 39.1rem;
    }
`;
export const MainImageContainer = styled.div`
    max-width: 80%;
    margin: 0 auto;

    span {
        max-height: calc(100vh - 4rem) !important;
        min-height: 300px;
    }
`;
export const MainBtnWrap = styled.div`
    @media screen and (max-width: ${MEDIA_WIDTH.MOBILE}) {
        margin-bottom: 1rem;
    }
`;