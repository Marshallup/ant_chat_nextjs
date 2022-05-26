import React, { FC, useState } from "react";
import { Row, Col } from "antd";
import { VideoPanel, ControlItem } from "./styles";
import { Videocam, VideocamOff, Mic, MicOff, Phone, Link } from '@mui/icons-material';
import { VideoControlPanelProps } from "./interfaces";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

const VideoControlPanel: FC<VideoControlPanelProps> = ({
    enableMicro,
    disableMicro,
    enableVideo,
    disableVideo,
    leaveRoom,
}) => {
    const [ enabledMicro, setEnabledMicro ] = useState(true);
    const [ enabledVideo, setEnabledVideo ] = useState(true);
    const copy = useCopyToClipboard();

    function onClickCopyLink() {
        copy(document.location.href, { message: 'Ссылка успешно скопирована!' });
    }    
    function onClickToggleVideo() {
        setEnabledVideo(!enabledVideo);

        if (enabledVideo) {
            disableVideo();
        } else {
            enableVideo();
        }
    }
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
                    <ControlItem onClick={onClickToggleMicro}>
                        { enabledMicro ? <Mic className="mu-icon" /> : <MicOff className="mu-icon" /> }
                    </ControlItem>
                </Col>
                <Col>
                <ControlItem onClick={onClickToggleVideo}>
                        { enabledVideo ? <Videocam className="mu-icon" /> : <VideocamOff className="mu-icon" /> }
                    </ControlItem>
                </Col>
                <Col>
                    <ControlItem isRed onClick={onLeaveRoom}>
                        <Phone className="mu-icon" />
                    </ControlItem>
                </Col>
                <Col>
                    <ControlItem onClick={onClickCopyLink}>
                        <Link className="mu-icon" />
                    </ControlItem>
                </Col>
            </Row>
        </VideoPanel>
    )
}

export default VideoControlPanel;