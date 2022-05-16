import styled from "styled-components";

export const RoomUl = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: -10px;
    display: flex;
    flex-wrap: wrap;
`;
export const RoomCard = styled.li`
    margin: 10px;
`;
export const RoomCardContent = styled.a`
    display: flex;
    background-color: rgba(196, 196, 196, 0.2);
    border-radius: 1rem;
    padding: 19px 16px;
    justify-content: space-between;
    align-items: center;
    color: #6667D9;
    font-size: 2rem;
    font-weight: 400;
    max-width: 296px;
    min-height: 100%;
    width: 100%;
    cursor: pointer;
`;
export const RoomCardText = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 0.5rem;
    max-width: 100%;
`;