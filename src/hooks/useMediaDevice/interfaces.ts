export type kindDevices = 'audioinput' | 'videoinput';
export interface GetVideoAndAudioInterface {
    stream: null | MediaStream,
    deviceNotAvailable: 'video' | 'audio' | 'both' | boolean,
}