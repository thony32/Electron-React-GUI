/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"

type GifProps = {
  src: string
}

const Gifs: React.FC<GifProps> = ({ src }) => {
  const [isPaused, setIsPaused] = useState(false)

  const togglePlay = () => {
    const gifImage = document.getElementById("gifImage") as HTMLVideoElement

    if (isPaused) {
      gifImage.play() // Resume playback
    } else {
      gifImage.pause() // Pause playback
    }

    setIsPaused(!isPaused)
  }

  return (
    <div>
      <div>
        <img src={src} id="gifImage" className="w-full h-full" />
      </div>
      <button className="btn btn-error" onClick={togglePlay}>
        {isPaused ? "Play" : "Pause"}
      </button>
    </div>
  )
}

export default Gifs
