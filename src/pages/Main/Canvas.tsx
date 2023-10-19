/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react"
import ReactFlow, { Controls, Background, MiniMap, applyNodeChanges, OnNodesChange, NodeTypes, OnEdgesChange, applyEdgeChanges, useEdges } from "reactflow"
import "../../../node_modules/reactflow/dist/style.css"
import { handleDragOver, ResizableNodeSelected } from "../../utils"
import { Gifs, VideoPlayer } from "../../components"
import { MainContextMenu } from "../../components"
import { useRecoilState } from "recoil"
import { nodesState } from "../../states"
import { v4 as uuidv4 } from "uuid"
import { Toolbar } from "../../components"

const nodeTypes: NodeTypes = {
  ResizableNodeSelected,
}

// Define the Canvas component
const Canvas: React.FC = () => {
  const [nodes, setNodes] = useRecoilState(nodesState)
  const [edges, setEdges] = useState([])
  const [show, setShow] = useState(false)
  const [points, setPoints] = useState({ x: 0, y: 0 })
  // const jPressed = useKeyPress("j")

  useEffect(() => {
    window.addEventListener("click", () => {
      setShow(false)
    })
    return () =>
      window.removeEventListener("click", () => {
        setShow(false)
      })
  }, [])

  // NOTE: Handle Context Menu event listener
  const showContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    setShow(true)
    console.log(event.pageX, event.pageY)
    setPoints({ x: event.pageX, y: event.pageY })
  }

  // TODO: Handle Copy Nodes

  // TODO: Handle Paste Nodes

  // ? Function to handle drop of media files into React Flow
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    const files = event.dataTransfer.files

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (file.type.startsWith("image/")) {
        // NOTE: Handle image file as a new node
        const imageUrl = URL.createObjectURL(file)
        const newNode = {
          id: `IMG-${uuidv4()}`,
          type: "ResizableNodeSelected",
          data: { label: <img src={imageUrl} /> },
          position: { x: event.clientX - 100, y: event.clientY - 100 },
        }
        setNodes((prevNodes: any) => [...prevNodes, newNode])
      } else if (file.type.startsWith("video/")) {
        // FIXME: Handle video file as a new node
        const videoUrl = URL.createObjectURL(file)
        const newNode = {
          id: `VID-${uuidv4()}`,
          type: "ResizableNodeSelected",
          data: {
            label: <VideoPlayer src={videoUrl} file={file.type} />,
          },
          position: { x: event.clientX - 100, y: event.clientY - 100 },
        }
        setNodes((prevNodes: any) => [...prevNodes, newNode])
      } else if (file.type === "image/gif") {
        // NOTE: Handle gif file as a new node
        const gifUrl = URL.createObjectURL(file)
        const newNode = {
          id: `GIF-${uuidv4()}`,
          type: "ResizableNodeSelected",
          data: { label: <Gifs src={gifUrl} /> },
          position: { x: event.clientX - 100, y: event.clientY - 100 },
        }
        setNodes((prevNodes: any) => [...prevNodes, newNode])
      }
    }
  }

  const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [])
  const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])

  // NOTE: onNodeDelete React Flow function
  const onNodesDelete: any = (nodeId: string) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== nodeId))
  }

  // TODO: Example of using useKeyPress hook
  // useEffect(() => {
  //   const event = {
  //     preventDefault: () => {}, // Define a dummy preventDefault function
  //     pageX: 0, // Set the desired values for pageX and pageY
  //     pageY: 0,
  //   };

  //   showContextMenu(event as React.MouseEvent<HTMLDivElement>);
  // }, [jPressed])

  return (
    <main className="h-screen overflow-hidden" onDrop={handleDrop} onDragOver={handleDragOver} onContextMenu={showContextMenu}>
      <div className="w-full h-full flex justify-center items-center" >
        {/* React Flow component */}
        <ReactFlow nodes={nodes} nodeTypes={nodeTypes} onNodesChange={onNodesChange} onNodesDelete={onNodesDelete} onConnect={() => {}} fitView onEdgesChange={onEdgesChange} edges={edges} /* snapToGrid={true} snapGrid={[5, 5]}*/>
          <Background color="hsl(var(--b1)" />
          <Controls className="bg-neutral-content rounded-sm" />
          <MiniMap className="scale-[.65] lg:scale-[.80] 2xl:scale-100 bg-neutral-content" pannable={true} />
        </ReactFlow>
        {show && <MainContextMenu top={points.y} left={points.x} />}
      </div>
      <Toolbar />
    </main>
  )
}

export default Canvas
