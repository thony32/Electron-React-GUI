
import React from "react"
import { useVideoFunctions } from "../../hooks"

type VideoProps = {
  src: string,
  file: any | File
}

const VideoPlayer: React.FC<VideoProps> = ({src, file}) => {
  const { videoRef, fastForward, fastBackward } = useVideoFunctions()
  return (
    <div className="flex justify-center items-center nodes">
      <video ref={videoRef} controls autoPlay loop className="">
        <source src={src} type={file.type} />
      </video>
      <button className="btn btn-primary btn-sm" onClick={fastBackward}>
        -10
      </button>
      <button className="btn btn-primary btn-sm" onClick={fastForward}>
        +10
      </button>
    </div>
  )
}

export default VideoPlayer
