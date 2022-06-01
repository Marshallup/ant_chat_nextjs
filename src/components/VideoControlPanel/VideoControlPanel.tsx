import React, { FC, useMemo } from "react";
import { Row, Col, Tooltip } from "antd";
import { VideoPanel, ControlItem, ControlItemBadge } from "./styles";
import LinkIcon from "@/components/Icons/LinkIcon";
import VideoOnIcon from "@/components/Icons/VideoOnIcon";
import VideoOffIcon from "../Icons/VideoOffIcon";
import MicroOnIcon from "../Icons/MicroOnIcon";
import MicroOffIcon from "../Icons/MicroOffIcon";
import PhoneIcon from "../Icons/PhoneIcon";
import { VideoControlPanelProps } from "./interfaces";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

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
    const toolTipAudioText = useMemo(() => {
        if (isAudioError) {
            return 'Проверьте доступность микрофона';
        }

        if (isAudioAvailable) {
            return 'Выключить микрофон';
        }

        return 'Включить микрофон';
    }, [ isAudioAvailable, isAudioError ]);
    function onClickCopyLink() {
        copy(document.location.href, { message: 'Ссылка успешно скопирована!' });
    }    
    function onClickToggleVideo() {

        if (isVideoAvailable) {
            disableVideo();
        } else if (!isVideoAvailable && !isVideoError) {
            enableVideo();
        }
    }
    function onClickToggleMicro() {

        if (isAudioAvailable) {
            disableMicro();
        } else if (!isAudioAvailable && !isAudioError) {
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
                    <Tooltip overlayClassName={'mobile-hide'} title={toolTipAudioText}>
                        <ControlItem isRed={isAudioAvailable ? false : true} onClick={onClickToggleMicro}>
                            { isAudioAvailable ? <MicroOnIcon className="mu-icon" /> : <MicroOffIcon className="mu-icon" /> }
                        </ControlItem>
                    </Tooltip>
                </Col>
                <Col>
                    <ControlItemBadge dot={isVideoError}>
                        <Tooltip overlayClassName={'mobile-hide'} title={toolTipVideoText}>
                            <ControlItem isRed={isVideoAvailable ? false : true} onClick={onClickToggleVideo}>
                                { isVideoAvailable ? <VideoOnIcon className="mu-icon" /> : <VideoOffIcon className="mu-icon" /> }
                            </ControlItem>
                        </Tooltip>
                    </ControlItemBadge>
                </Col>
                <Col>
                    <Tooltip overlayClassName={'mobile-hide'} title={'Покинуть комнату'}>
                        <ControlItem isRed onClick={onLeaveRoom}>
                            <PhoneIcon className="mu-icon" />
                        </ControlItem>
                    </Tooltip>
                </Col>
                <Col>
                    <Tooltip overlayClassName={'mobile-hide'} title={'Копировать ссылку на комнату'}>
                        <ControlItem onClick={onClickCopyLink}>
                            <LinkIcon />
                        </ControlItem>
                    </Tooltip>
                </Col>
            </Row>
        </VideoPanel>
    )
}

export default VideoControlPanel;