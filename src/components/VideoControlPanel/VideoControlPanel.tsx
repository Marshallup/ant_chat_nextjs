import React, { FC, useMemo, useState } from "react";
import { Row, Col, Badge } from "antd";
import { VideoPanel, ControlItem, ControlItemBadge } from "./styles";
import { Videocam, VideocamOff, Mic, MicOff, Phone, Link } from '@mui/icons-material';
import { VideoControlPanelProps } from "./interfaces";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { Tooltip } from "antd";

const VideoControlPanel: FC<VideoControlPanelProps> = ({
    isAudioAvailable,
    isVideoAvailable,
    isVideoError,
    isAudioError,
    enableMicro,
    disableMicro,
    enableVideo,
    disableVideo,
    leaveRoom,
}) => {
    const copy = useCopyToClipboard();

    const toolTipVideoText = useMemo(() => {
        if (isVideoError) {
            return 'Проверьте доступность камеры';
        }

        if (isVideoAvailable) {
            return 'Выключить видео';
        }

        return 'Включить видео';
    }, [ isVideoAvailable, isVideoError ]);
    function onClickCopyLink() {
        copy(document.location.href, { message: 'Ссылка успешно скопирована!' });
    }    
    function onClickToggleVideo() {

        if (isVideoAvailable) {
            disableVideo();
        } else {
            enableVideo();
        }
    }
    function onClickToggleMicro() {

        if (isAudioAvailable) {
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
                    <Tooltip title={isAudioAvailable ? 'Выключить микрофон' : 'Включить микрофон'}>
                        <ControlItem isRed={isAudioAvailable ? false : true} onClick={onClickToggleMicro}>
                            { isAudioAvailable ? <Mic className="mu-icon" /> : <MicOff className="mu-icon" /> }
                        </ControlItem>
                    </Tooltip>
                </Col>
                <Col>
                    <ControlItemBadge dot={isVideoError}>
                        <Tooltip title={toolTipVideoText}>
                            <ControlItem isRed={isVideoAvailable ? false : true} onClick={onClickToggleVideo}>
                                { isVideoAvailable ? <Videocam className="mu-icon" /> : <VideocamOff className="mu-icon" /> }
                            </ControlItem>
                        </Tooltip>
                    </ControlItemBadge>
                </Col>
                <Col>
                    <Tooltip title={'Покинуть комнату'}>
                        <ControlItem isRed onClick={onLeaveRoom}>
                            <Phone className="mu-icon" />
                        </ControlItem>
                    </Tooltip>
                </Col>
                <Col>
                    <Tooltip title={'Копировать ссылку на комнату'}>
                        <ControlItem onClick={onClickCopyLink}>
                            <Link className="mu-icon" />
                        </ControlItem>
                    </Tooltip>
                </Col>
            </Row>
        </VideoPanel>
    )
}

export default VideoControlPanel;