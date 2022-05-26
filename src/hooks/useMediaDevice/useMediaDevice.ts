import { kindDevices, GetVideoAndAudioInterface } from './interfaces';

function useMediaDevice() {
    async function enumerateDevices() {
        return navigator.mediaDevices.enumerateDevices()
            .then(devices => devices);
    }
    async function getVideo(videoInputID?: string) {
        let deviceId = videoInputID;

        if (!videoInputID) {
            deviceId = (await getDevicesByKind('videoinput'))[0]?.deviceId;
        }

        return navigator.mediaDevices.getUserMedia({
            video: {
                deviceId,
            },
        });
    }
    async function getAudio(audioInputID?: string) {
        let deviceId = audioInputID;

        if (!audioInputID) {
            deviceId = (await getDevicesByKind('audioinput'))[0]?.deviceId;
        }

        return navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId,
            },
        });
    }
    async function getVideoAndAudio(audioInputID?: string, videoInputID?: string): Promise<GetVideoAndAudioInterface> {
        let deviceVideoID = videoInputID;
        let deviceAudioID = audioInputID;

        if (!audioInputID) {
            deviceAudioID = (await getDevicesByKind('audioinput'))[0]?.deviceId;
        }

        if (!videoInputID) {
            deviceVideoID = (await getDevicesByKind('videoinput'))[0]?.deviceId;
        }

        const videoStream: false | MediaStream = await navigator.mediaDevices.getUserMedia({
            video: {
                deviceId: deviceVideoID,
            }
        })
            .catch(() => false);

        const audioStream: false | MediaStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: deviceAudioID,
            }
        })
            .catch(() => false);

        if (videoStream && audioStream) {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    deviceId: deviceAudioID,
                },
                video: {
                    deviceId: deviceVideoID,
                }
            });

            return {
                stream,
                deviceNotAvailable: false,
            }
        } else if (videoStream && !audioStream) {
            return {
                stream: videoStream,
                deviceNotAvailable: 'audio',
            }
        } else if (audioStream && !videoStream) {
            return {
                stream: audioStream,
                deviceNotAvailable: 'video',
            }
        }

        return {
            stream: null,
            deviceNotAvailable: 'both'
        };


    }
    async function getDevicesByKind(kind: kindDevices) {
        const devices = await enumerateDevices();

        return devices.filter(device => device.kind === kind);
    }

    return {
        enumerateDevices,
        getDevicesByKind,
        getAudio,
        getVideo,
        getVideoAndAudio,
    }
}

export default useMediaDevice;