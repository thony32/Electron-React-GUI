import React, { useCallback, useEffect, useRef, useState } from "react"
import ReactFlow, { Background, MiniMap, applyNodeChanges, NodeTypes, addEdge, applyEdgeChanges, OnNodesChange, OnEdgesChange, Connection, Edge } from "reactflow"
import "/node_modules/reactflow/dist/style.css"
import { handleDragOver, ResizableNodeSelected, TextNode } from "../utils"
import { MainContextMenu, Toolbar, NodeContextMenu } from "../components"
import { ReactFlowInstanceProvider } from "../contexts"
import ReactPlayer from "react-player"
import { nanoid } from "nanoid"
import { useNodesAndEdgesState } from "../hooks"

const nodeTypes: NodeTypes = {
  ResizableNodeSelected,
  TextNode,
}

// Define the Canvas component
const Canvas: React.FC = () => {
  const { nodes, setNodes, edges, setEdges } = useNodesAndEdgesState()
  const [menu, setMenu] = useState<any>(null)
  const [show, setShow] = useState(false)
  const [points, setPoints] = useState({ x: 0, y: 0 })
  const [rightClickOnNode, setRightClickOnNode] = useState(false)
  const ref = useRef<HTMLDivElement | any>(null)

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

  // FIXME: Function to check if the URL is a video
  const isVideoURL = (url: string): boolean => {
    // List of common video file extensions and patterns in video URLs
    const videoIndicators = [
      ".mp4",
      ".webm",
      ".ogg",
      ".avi",
      ".mov",
      ".mkv", // extensions
      "youtube.com",
      "vimeo.com", // domains known for videos
      "/video",
      "watch?",
      "embed", // URL segments that could indicate video content
    ]

    // Check if any of the video indicators are present in the URL
    return videoIndicators.some((indicator) => url.toLowerCase().includes(indicator))
  }

  // FIXME: Function to check if the URL is an image
  const isImageURL = (url: string): boolean => {
    const imageExtensions = [".jpeg", ".jpg", ".gif", ".png", ".bmp", ".svg", ".webp"]
    return imageExtensions.some((extension) => url.toLowerCase().endsWith(extension))
  }

  // NOTE: Create a video as a new node
  const createVideoNodeFromURL = (url: string, clientX: number, clientY: number) => {
    const newNode = {
      id: `VID-${nanoid(3)}`,
      type: "ResizableNodeSelected",
      data: {
        label: (
          <>
            <ReactPlayer className="nodes w-full h-full object-contain block" url={url} controls />
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

  // NOTE: Create image file as a new node
  const createImageNodeFromURL = (url: string, clientX: number, clientY: number) => {
    const newNode = {
      id: `IMG-${nanoid(3)}`,
      type: "ResizableNodeSelected",
      data: { label: <img src={url} className="nodes w-full h-full object-contain block" /> },
      position: { x: clientX, y: clientY },
      selected: true,
    }
    setNodes((prevNodes: any) => [...prevNodes, newNode])
  }

  // NOTE: Function to create a clickable link node from a URL
  const createLinkNodeFromURL = (url: string, clientX: number, clientY: number) => {
    const newNode = {
      id: `LINK-${nanoid(3)}`,
      type: "TextNode",
      data: {
        label: (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {url}
          </a>
        ),
      },
      position: { x: clientX, y: clientY },
    }
    setNodes((prevNodes: any) => [...prevNodes, newNode])
  }

  // NOTE: Function to check if the URL is a video or image
  const handleDroppedURL = async (uri: string, clientX: number, clientY: number) => {
    // Perform a HEAD request to check the Content-Type
    try {
      const response = await fetch(uri, { method: "HEAD" })
      // console.log(response)
      const contentType = response.headers.get("Content-Type")
      // console.log(contentType)

      if (contentType?.startsWith("video")) {
        // It's a video
        createVideoNodeFromURL(uri, clientX, clientY)
      } else if (contentType?.startsWith("image")) {
        // It's an image
        createImageNodeFromURL(uri, clientX, clientY)
      }
    } catch (error) {
      // If HEAD request fails, fallback to extension checking
      console.error("Error fetching URL, fallback to extension checking:", error)
      if (isVideoURL(uri)) {
        createVideoNodeFromURL(uri, clientX, clientY)
      } else {
        // Assume it's an image if not a known video extension
        createImageNodeFromURL(uri, clientX, clientY)
      }
    }
  }

  // NOTE: FUNCTION TO HANDLE DROP EVENT

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const uri = event.dataTransfer.getData("URL") || event.dataTransfer.getData("text/uri-list")

    if (uri && isVideoURL(uri)) {
      handleDroppedURL(uri, event.clientX, event.clientY)
      return
    }

    if (!isImageURL(uri) && !isVideoURL(uri)) {
      const clientX = event.clientX - (ref.current.getBoundingClientRect().left + window.scrollX)
      const clientY = event.clientY - (ref.current.getBoundingClientRect().top + window.scrollY)
      createLinkNodeFromURL(uri, clientX, clientY)
    }

    const files = event.dataTransfer.files

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const clientX = event.clientX - 100
      const clientY = event.clientY - 100

      if (file.type.startsWith("image/")) {
        // NOTE Handle image file as a new node
        const imageUrl = URL.createObjectURL(file)
        createImageNodeFromURL(imageUrl, clientX, clientY)
      } else if (file.type.startsWith("video/")) {
        // NOTE Handle video file as a new node
        const videoUrl = URL.createObjectURL(file)
        createVideoNodeFromURL(videoUrl, clientX, clientY)
      }
    }
  }

  // NOTE: Function to add a new text node
  const addTextNode = (text: string, position = { x: Math.floor(Math.random() * 1001), y: Math.floor(Math.random() * 1001) }) => {
    const newNode = {
      id: `text-${nanoid(3)}`,
      type: "TextNode", // or any custom type you have defined
      data: { label: <p className="nodes text-3xl font-semibold tracking-wide w-full h-full">{text}</p> },
      position,
    }
    setNodes((prevNodes: any) => [...prevNodes, newNode])
  }

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
        setMenu(null)
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
          minZoom={0.2}
          maxZoom={20}
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
      <Toolbar addTextNode={addTextNode} />
    </main>
  )
}

export default Canvas
