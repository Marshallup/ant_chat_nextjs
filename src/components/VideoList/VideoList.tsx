import React, { FC } from "react";
import Video, { VideoWrap } from "@/components/Video";
import { LOCAL_VIDEO } from '@/hooks/useWebRTC';
import { VideoListProps } from "./interfaces";

function layout(clientsNumber = 1): { width: string, height: string }[] {

    const pairs: Array<undefined[]> = Array.from<undefined>({length: clientsNumber})
      .reduce((acc: Array<undefined[]>, next, index, arr) => {
        if (index % 2 === 0) {
            acc.push(arr.slice(index, index + 2));
        }
        
        return acc;
      }, []);
    const rowsNumber = pairs.length;
    const height = `${100 / rowsNumber}%`;
  
    return pairs.map((row, index, arr) => {
  
      if (index === arr.length - 1 && row.length === 1) {
        return [{
          width: '100%',
          height,
        }];
      }
  
      return row.map(() => ({
        width: '50%',
        height,
      }));
      
    }).flat();
}

const VideoList: FC<VideoListProps> = ({ clients, provideMediaRef }) => {

    const videoLayout = layout(clients.length);

    return <>
        {
            clients.map((clientID, idx) => (
                <VideoWrap
                    key={clientID}
                    id={clientID}
                    style={videoLayout[idx]}
                >
                    <Video
                        ref={instance => provideMediaRef(clientID, instance)}
                        width="100%"
                        height="100%"
                        autoPlay
                        playsInline
                        muted={clientID === LOCAL_VIDEO}
                    />
                </VideoWrap>
            ))
        }
    </>
}

export default VideoList;