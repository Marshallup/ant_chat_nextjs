import React, { FC, useState } from "react";
import { Row, Col } from "antd";
import { VideoPanel, ControlItem } from "./styles";
import { PhoneOutlined, AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import { VideoControlPanelProps } from "./interfaces";

const VideoControlPanel: FC<VideoControlPanelProps> = ({
    enableMicro,
    disableMicro,
    leaveRoom,
}) => {
    const [ enabledMicro, setEnabledMicro ] = useState(true);
    
    function onClickToggleMicro() {
        setEnabledMicro(!enabledMicro);

        if (enabledMicro) {
            disableMicro();
        } else {
            enableMicro();
        }

    }
    function onLeaveRoom() {
        leaveRoom();
    }

    return (
        <VideoPanel>
            <Row gutter={20}>
                <Col>
                    <ControlItem isRed onClick={onLeaveRoom}>
                        <PhoneOutlined />
                    </ControlItem>
                </Col>
                <Col>
                    <ControlItem onClick={onClickToggleMicro}>
                        { enabledMicro ? <AudioOutlined /> : <AudioMutedOutlined /> }
                    </ControlItem>
                </Col>
            </Row>
        </VideoPanel>
    )
}

export default VideoControlPanel;