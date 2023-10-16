/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

const useDrop = (videoRef: React.RefObject<HTMLVideoElement>, fastForward: () => void, fastBackward: () => void) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>, setNodes: any, initialNodes: Node[]) => {

    event.preventDefault()

    const files = event.dataTransfer.files

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (file.type.startsWith("image/")) {
        // Handle image file as a new node
        const imageUrl = URL.createObjectURL(file)
        const newNode = {
          id: `image-node-${Date.now()}`,
          type: "ResizableNodeSelected",
          data: { label: <img src={imageUrl} alt={`Image`} /> },
          position: { x: event.clientX - 100, y: event.clientY - 100 },
        }
        setNodes([...initialNodes, newNode])
      } else if (file.type.startsWith("video/")) {
        // Handle video file as a new node
        const videoUrl = URL.createObjectURL(file)
        const newNode = {
          id: `video-node-${Date.now()}`,
          type: "ResizableNodeSelected",
          data: (
            <div className="flex justify-center items-center">
              <video ref={videoRef} controls autoPlay loop className="w-full h-full">
                <source src={videoUrl} type={file.type} />
              </video>
              <button className="btn btn-primary btn-sm" onClick={fastBackward}>
                -10
              </button>
              <button className="btn btn-primary btn-sm" onClick={fastForward}>
                +10
              </button>
            </div>
          ),
          position: { x: event.clientX - 100, y: event.clientY - 100 },
        }
        setNodes([...initialNodes, newNode])
      }
    }
  }
  return { handleDrop }
}

export default useDrop
