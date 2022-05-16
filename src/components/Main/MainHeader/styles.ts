import styled from "styled-components";
import { ArrowLeftOutlined } from '@ant-design/icons';

export const MainHeaderEl = styled.header`
    margin-bottom: 3.3rem;
`;
export const BackBtnIcon = styled(ArrowLeftOutlined)`
    margin: 0.2rem 0.9rem 0 0;
    font-size: 1.5rem;
    font-weight: 700;
`;
export const BackBtn = styled.button`
    padding: 0;
    display: flex;
    align-items: center;
    color: #6667D9;
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 2rem;
    cursor: pointer;
`;