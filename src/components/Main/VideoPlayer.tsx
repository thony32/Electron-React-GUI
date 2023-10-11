import React, { useRef } from "react"
import Plyr, { APITypes } from "plyr-react"
import "../../App.css"

const videoOptions = undefined
const VideoPlayer: React.FC = () => {
  const ref = useRef<APITypes>(null)
  return (
    <>
      <Plyr
        ref={ref}
        source={{
          type: "video",
          sources: [
            {
              src: videoId,
              provider: provider,
            },
          ],
        }}
        options={videoOptions}
      />
    </>
  );
};

export default VideoPlayer
