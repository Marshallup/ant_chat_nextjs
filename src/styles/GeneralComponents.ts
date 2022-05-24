import styled from "styled-components";
import { LoadingOutlined } from '@ant-design/icons';

export const Loader = styled(LoadingOutlined)<{ $isAbsolute?: boolean }>`
    font-size: 1em;
    color: #1890ff;
    ${({ $isAbsolute }) => $isAbsolute ? 'position: absolute;' : null}
`;