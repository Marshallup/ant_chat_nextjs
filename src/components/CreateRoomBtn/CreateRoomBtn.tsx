import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';
import { Button, ButtonProps } from "antd";

const CreateRoomBtn: FC<ButtonProps> = ({ ...props }) => {
    const router = useRouter();

    function createRoom() {
        router.push(`/rooms/${v4()}`)
    }

    return (
        <Button
            size={'large'}
            type={'primary'}
            onClick={createRoom}
            { ...props }
        >
            Создать комнату
        </Button>
    )
}

export default CreateRoomBtn;