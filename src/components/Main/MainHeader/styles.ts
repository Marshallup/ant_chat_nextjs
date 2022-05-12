import styled from "styled-components";
import { Col } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';

const { Header } = Layout;

const visibleSiderIconsStyles = `
    cursor: pointer;
    font-size: 1.8rem;
    transition: color 0.3s;
    &:hover {
        color: #1890ff;
    }
`;

export const MainHeaderEl = styled(Header)`
    background-color: #ffffff;
`;
export const HideSiderIcon = styled(MenuFoldOutlined)`
    ${visibleSiderIconsStyles}
`;
export const ShowSiderIcon = styled(MenuUnfoldOutlined)`
    ${visibleSiderIconsStyles}
`;
export const HeaderMainPageLinkCol = styled(Col)`
    text-align: center;
    text-transform: uppercase;
`;
export const HeaderBtnCol = styled(Col)`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;