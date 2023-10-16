import { useRef } from "react"

const useVideoFunctions = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const fastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10 // Fast forward by 10 seconds
    }
  }

  const fastBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10 // Fast backward by 10 seconds
    }
  }
  return { videoRef, fastBackward, fastForward }
}

export default useVideoFunctions
