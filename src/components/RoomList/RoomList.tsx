import React, { FC, forwardRef } from "react";
import Link from "next/link";
import { RoomItemProps, RoomListProps } from "./interfaces";
import { Button, Tooltip } from "antd";
import { ArrowRightOutlined } from '@ant-design/icons';
import { RoomCard, RoomUl, RoomCardText, RoomCardContent } from "./styles";


export const RoomItem: FC<RoomItemProps> = ({ text, roomID }) => {
    return (
        <Tooltip
            title={text}
            placement={'bottom'}
            overlayClassName={'mobile-hide'}
        >

            <RoomCard>
                <Link href={`/rooms/${roomID}`} passHref>
                    <RoomCardContent>
                        <RoomCardText>
                            { text }
                        </RoomCardText>
                        <Button
                            type={'primary'}
                            shape={'circle'}
                            icon={<ArrowRightOutlined/>}
                        />
                    </RoomCardContent>
                </Link>
            </RoomCard>

        </Tooltip>
    )
}

const RoomList = forwardRef<HTMLUListElement, RoomListProps>(({ rooms }, ref) => {

    return (
        <RoomUl ref={ref}>

            { rooms.map(roomID => (
                <RoomItem
                    key={roomID}
                    text={roomID}
                    roomID={roomID}
                />
            ))}

        </RoomUl>
    )
})

RoomList.displayName = 'RoomList';

export default RoomList;