import styled from "styled-components";
import { Layout } from 'antd';

const { Content } = Layout;

export const MainLayoutContainer = styled.div`
    max-width: 1800px;
    margin: 0 auto;
`;
export const ContentMainLayout = styled(Content)`
    padding: 20px;
    background-color: #ffffff;
`;
export const RootLayout = styled(Layout)`
    min-height: 100vh;
`;