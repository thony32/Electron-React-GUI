/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"
import { useVideoFunctions } from "."
import { VideoPlayer } from "../components"

const useDrop = () => {
  const { videoRef, fastForward, fastBackward } = useVideoFunctions()
  const [nodes, setNodes] = useState<Node[]>([])

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, setNodes: (nodes: Node[]) => void) => {
    event.preventDefault()

    const files = event.dataTransfer.files

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // Handle image, video, or GIF files as new nodes based on their MIME types
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file)
        const newNode = {
          id: `IMG-${Date.now()}`,
          type: "ResizableNodeSelected",
          data: { label: <img src={imageUrl} /> },
          position: { x: event.clientX - 100, y: event.clientY - 100 },
        }
        setNodes((prevNodes: Node[]) => [...prevNodes, newNode])
      } else if (file.type.startsWith("video/")) {
        const videoUrl = URL.createObjectURL(file)
        const newNode = {
          id: `VIDEO-${Date.now()}`,
          type: "ResizableNodeSelected",
          data: {
            label: (
              <VideoPlayer src={videoUrl} file={file.type} ref={videoRef} fastForward={fastForward} fastBackward={fastBackward} />
            ),
          },
          position: { x: event.clientX - 100, y: event.clientY - 100 },
        }
        setNodes((prevNodes: Node[]) => [...prevNodes, newNode])
      } else if (file.type === "image/gif") {
        const gifUrl = URL.createObjectURL(file)
        const newNode = {
          id: `GIF-${Date.now()}`,
          type: "ResizableNodeSelected",
          data: { label: <Gifs src={gifUrl} /> },
          position: { x: event.clientX - 100, y: event.clientY - 100 },
        }
        setNodes((prevNodes: Node[]) => [...prevNodes, newNode])
      }
    }
  }
  return handleDrop
}

export default useDrop
