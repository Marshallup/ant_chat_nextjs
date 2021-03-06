import styled from "styled-components";
import { Layout } from 'antd';
import { MEDIA_WIDTH } from "@/styles/vars";

const { Content } = Layout;

export const MainLayoutContainer = styled.div`
    max-width: 1800px;
    margin: 0 auto;
`;
export const ContentMainLayout = styled(Content)`
    padding: 2rem;
    background-color: #ffffff;

    @media screen and (max-width: ${MEDIA_WIDTH.MOBILE}) {
        padding: 1rem;
    }
`;
export const RootLayout = styled(Layout)`
    min-height: 100vh;
`;