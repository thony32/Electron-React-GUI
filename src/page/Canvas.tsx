import React, { useCallback, useEffect, useRef, useState } from "react"
import ReactFlow, { Background, MiniMap, applyNodeChanges, NodeTypes, addEdge, applyEdgeChanges, OnNodesChange, OnEdgesChange, Connection, Edge } from "reactflow"
import "/node_modules/reactflow/dist/style.css"
import { handleDragOver, ResizableNodeSelected } from "../utils"
import { MainContextMenu, Toolbar, NodeContextMenu } from "../components"
import { ReactFlowInstanceProvider } from "../contexts"
import ReactPlayer from "react-player"
import { nanoid } from "nanoid"
import { useNodesAndEdgesState } from "../hooks"

const nodeTypes: NodeTypes = {
  ResizableNodeSelected,
}

// Define the Canvas component
const Canvas: React.FC = () => {
  const { nodes, setNodes, edges, setEdges } = useNodesAndEdgesState()
  const [menu, setMenu] = useState<any>(null)
  const [show, setShow] = useState(false)
  const [points, setPoints] = useState({ x: 0, y: 0 })
  const [rightClickOnNode, setRightClickOnNode] = useState(false)
  const ref = useRef<HTMLDivElement | any>(null)
  // const { videoRef, fastForward, fastBackward } = useVideoFunctions() as any

  // NOTE All ReactFlow Props Functions
  const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds: any) => applyNodeChanges(changes, nds)), [setNodes])
  const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds: any) => applyEdgeChanges(changes, eds)), [setEdges])

  // NOTE Function to handle connection between nodes
  const onConnect = useCallback((params: Connection | Edge) => setEdges((els: any) => addEdge(params, els)), [setEdges])

  // NOTE Function to handle deletion of nodes
  const onNodesDelete = (nodeId: any) => {
    setNodes((nodes: any) => nodes.filter((node: any) => node.id !== nodeId))
  }

  useEffect(() => {
    window.addEventListener("click", () => {
      setShow(false)
    })
    return () =>
      window.removeEventListener("click", () => {
        setShow(false)
      })
  }, [])

  // NOTE Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu])

  // NOTE: Handle Main Context Menu event listener
  const showContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    const targetNode = event.target as HTMLElement
    const isNode = targetNode && targetNode.classList.contains("nodes")

    if (isNode) {
      // Right-click on a node
      setRightClickOnNode(true)
      setShow(false)
    } else {
      // Right-click in the canvas
      setRightClickOnNode(false)
      setPoints({ x: event.pageX, y: event.pageY })
      setShow(true)
    }
  }

  // NOTE: Function to check if the URL is a video
  const isVideoURL = (url: string): boolean => {
    return url.startsWith("http://") || url.startsWith("https://")
  }

  // NOTE: Function to create a video as a node from the web
  const createVideoNodeFromURL = (url: string, clientX: number, clientY: number) => {
    const newNode = {
      id: `VID-${nanoid(3)}`,
      type: "ResizableNodeSelected",
      data: {
        label: (
          <>
            <ReactPlayer className="nodes w-full h-full object-contain block" url={url} controls autoPlay />
          </>
        ),
      },
      position: {
        x: clientX - 100,
        y: clientY - 100,
      },
    }
    setNodes((prevNodes: any) => [...prevNodes, newNode])
  }

  // NOTE: Function to handle drop of media files into React Flow

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const uri = event.dataTransfer.getData("URL") || event.dataTransfer.getData("text/uri-list")
    if (uri && isVideoURL(uri)) {
      createVideoNodeFromURL(uri, event.clientX, event.clientY)
      return
    } else {
      const files = event.dataTransfer.files

      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        if (file.type.startsWith("image/")) {
          // NOTE: Handle image file as a new node
          const imageUrl = URL.createObjectURL(file)
          const newNode = {
            id: `IMG-${nanoid(3)}`,
            type: "ResizableNodeSelected",
            data: { label: <img src={imageUrl} className="nodes w-full h-full object-contain block" /> },
            position: { x: event.clientX, y: event.clientY },
            selected: true,
          }
          setNodes((prevNodes: any) => [...prevNodes, newNode])
        } else if (file.type.startsWith("video/")) {
          // NOTE: Handle video file as a new node
          const videoUrl = URL.createObjectURL(file)
          const newNode = {
            id: `VID-${nanoid(3)}`,
            type: "ResizableNodeSelected",
            data: {
              label: (
                <div className="nodes flex flex-col w-full h-full object-contain">
                  <ReactPlayer className="nodes" url={videoUrl} controls autoPlay />
                  {/* <div>
                    <button className="btn btn-primary btn-sm" onClick={fastBackward}>
                      -10
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={fastForward}>
                      +10
                    </button>
                  </div> */}
                </div>
              ),
            },
            position: { x: event.clientX - 100, y: event.clientY - 100 },
          }
          setNodes((prevNodes: any) => [...prevNodes, newNode])
        }
      }
    }
  }

  // Function to add a new text node
  const addTextNode = (text: string, position = { x: 250, y: 100 }) => {
    const newNode = {
      id: `text-${nanoid(3)}`,
      type: 'input', // or any custom type you have defined
      data: { label: <p className="nodes text-xl">{text}</p> },
      position,
    };
    setNodes((prevNodes: any) => [...prevNodes, newNode]);
  };

  // NOTE: Handle Node Context Menu

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: any) => {
      // Prevent native context menu from showing
      event.preventDefault()

      if (rightClickOnNode) {
        const pane = ref.current.getBoundingClientRect()
        setMenu({
          id: node.id,
          top: event.clientY < pane.height - 200 && event.clientY,
          left: event.clientX < pane.width - 200 && event.clientX,
          right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
          bottom: event.clientY >= pane.height - 200 && pane.height - event.clientY,
        })
      } else {
        setMenu(null) // Clear the menu if right-clicking in the canvas
        setPoints({ x: event.pageX, y: event.pageY })
        setShow(true)
      }
    },
    [setMenu, rightClickOnNode]
  )

  return (
    <main className="h-screen overflow-hidden col-span-8 -z-50 introjs-tooltiptext" onDrop={handleDrop} onDragOver={handleDragOver} onContextMenu={showContextMenu}>
      <div className="w-full h-full flex justify-center items-center" ref={ref}>
        {/* React Flow component */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          minZoom={0.0001}
          maxZoom={10}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onNodesDelete={onNodesDelete}
          onEdgesChange={onEdgesChange}
          onPaneClick={onPaneClick}
          onConnect={onConnect}
          onNodeContextMenu={onNodeContextMenu}
          fitView /* snapToGrid={true} snapGrid={[5, 5]}*/
        >
          <Background color="hsl(var(--b1)" />
          <MiniMap className="scale-[.65] lg:scale-[.80] 2xl:scale-100 bg-neutral-content -translate-x-[220px] 2xl:-translate-x-[250px]" pannable={true} />
          {menu && <NodeContextMenu onClick={onPaneClick} {...menu} />}
          {show && (
            <ReactFlowInstanceProvider>
              <MainContextMenu top={points.y} left={points.x} />
            </ReactFlowInstanceProvider>
          )}
        </ReactFlow>
      </div>
      <Toolbar addTextNode={addTextNode}/>
    </main>
  )
}

export default Canvas
