import React, { useCallback, useEffect, useRef, useState } from "react"
import ReactFlow, { Background, MiniMap, applyNodeChanges, NodeTypes, addEdge, applyEdgeChanges, OnNodesChange, OnEdgesChange, Connection, Edge, Node, OnConnect } from "reactflow"
import { handleDragOver, ImageNode, TextNode, VideoNode, LinkNode } from "../utils"
import { MainContextMenu, Toolbar, NodeContextMenu } from "../components"
import { ReactFlowInstanceProvider } from "../contexts"
import { nanoid } from "nanoid"
import { useNodesAndEdgesState } from "../hooks"
import "../../../../node_modules/reactflow/dist/style.css"

const nodeTypes: NodeTypes = {
  ImageNode,
  TextNode,
  VideoNode,
  LinkNode,
}

// Define the Canvas component
const FlowChart: React.FC = () => {
  const { nodes, setNodes, edges, setEdges } = useNodesAndEdgesState() as any
  const [menu, setMenu] = useState<any>(null)
  const [show, setShow] = useState(false)
  const [points, setPoints] = useState({ x: 0, y: 0 })
  const [rightClickOnNode, setRightClickOnNode] = useState(false)
  const ref = useRef<HTMLDivElement | any>(null)

  // NOTE All ReactFlow Props Functions
  const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds: Node[]) => applyNodeChanges(changes, nds)), [setNodes])
  const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)), [setEdges])

  // NOTE Function to handle connection between nodes
  const onConnect: OnConnect = useCallback((params: Connection | Edge) => setEdges((els: Edge[]) => addEdge(params, els)), [setEdges])

  // NOTE Function to handle deletion of nodes
  const onNodesDelete: any = (nodeId: string) => {
    setNodes((nodes: Node[]) => nodes.filter((node) => node.id !== nodeId))
  }

  useEffect(() => {
    const handleClickOutside = () => setShow(false)
    window.addEventListener("click", handleClickOutside)
    return () => window.removeEventListener("click", handleClickOutside)
  }, [])

  // NOTE Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu])

  // NOTE: Handle Main Context Menu event listener
  const showContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    const targetNode = event.target as HTMLElement
    const isNode = targetNode && targetNode.classList.contains("nodes")
    setRightClickOnNode(isNode)
    setPoints({ x: event.pageX, y: event.pageY })
    setShow(!isNode)
  }

  // FIXME: Function to check if the URL is a video
  const isVideoURL = (url: string): boolean => {
    // List of common video file extensions and patterns in video URLs
    const videoIndicators = [".mp4", ".webm", ".ogg", ".avi", ".mov", ".mkv", "youtube.com", "vimeo.com", "/video", "watch?", "embed"]

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
      type: "VideoNode",
      data: {
        label: <video src={url} className="nodes w-full h-full object-contain block" controls autoPlay></video>,
      },
      position: {
        x: clientX - 100,
        y: clientY - 100,
      },
    }
    setNodes((prevNodes: Node[]) => [...prevNodes, newNode])
  }

  // NOTE: Create image file as a new node
  const createImageNodeFromURL = (url: string, clientX: number, clientY: number) => {
    const newNode = {
      id: `IMG-${nanoid(3)}`,
      type: "ImageNode",
      data: {
        label: <img src={url} className="nodes w-full h-full object-contain block" />,
      },
      position: { x: clientX, y: clientY },
      selected: true,
    }
    setNodes((prevNodes: Node[]) => [...prevNodes, newNode])
  }

  const createLinkNodeFromURL = (url: string, clientX: number, clientY: number) => {
    const newNode = {
      id: `LINK-${nanoid(3)}`,
      type: "LinkNode",
      data: {
        label: (
          <a href={url} target="_blank" className="text-blue-500">
            {url}
          </a>
        ),
      },
      position: { x: clientX, y: clientY },
    }
    setNodes((prevNodes: Node[]) => [...prevNodes, newNode])
  }

  // const fetchMediaFromURL = async (url: string) => {
  //   try {
  //     const response = await fetch("http://localhost:3000/fetch-media", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ url }),
  //     })
  //     const data = await response.json()
  //     return data
  //   } catch (error) {
  //     console.error("Error fetching media URL:", error)
  //     return null
  //   }
  // }
  // NOTE: Function to check if the URL is a video or image
  const handleDroppedURL = async (uri: string, clientX: number, clientY: number) => {
    try {
      const response = await fetch(uri, { method: "HEAD" })
      const contentType = response.headers.get("Content-Type")
      if (contentType?.startsWith("video")) {
        createVideoNodeFromURL(uri, clientX, clientY)
      } else if (contentType?.startsWith("image")) {
        createImageNodeFromURL(uri, clientX, clientY)
      } else {
        // Fallback to link node if content type is not image or video
        createLinkNodeFromURL(uri, clientX, clientY)
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
      // createLinkNodeFromURL(uri, clientX, clientY)
    }
  }

  // NOTE: FUNCTION TO HANDLE DROP EVENT

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const uri = event.dataTransfer.getData("URL") || event.dataTransfer.getData("text/uri-list")
    // if (uri) {
    //   const mediaData = await fetchMediaFromURL(uri)
    //   if (mediaData && mediaData.images && mediaData.images.length > 0) {
    //     const validImageUrl = mediaData.images.find((imgUrl) => imgUrl && imgUrl !== "")
    //     if (validImageUrl) {
    //       createImageNodeFromURL(valid, event.clientX, event.clientY)
    //     }

    //     console.log(uri)
    //     console.log(validImageUrl)
    //     console.log(mediaData)

    //   }
    // }
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
        console.log(imageUrl, clientX, clientY)
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
      id: `TXT-${nanoid(3)}`,
      type: "TextNode",
      data: {
        label: (
          <>
            <p className="nodes font-semibold tracking-wide w-full h-full">{text}</p>
          </>
        ),
      },
      position,
    }
    setNodes((prevNodes: Node[]) => [...prevNodes, newNode])
  }

  // NOTE: Handle Node Context Menu

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
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

  const setNodeColor = (node: Node) => {
    switch (node.type) {
      case "ImageNode":
        return "black" // Noir pour ImageNode
      case "VideoNode":
        return "#ff0844" // Rouge pour VideoNode
      case "TextNode":
        return "#fee140" // Gris pour TextNode
      case "LinkNode":
        return "#005bea" // Bleu pour LinkNode
      default:
        return "#ffb199" // Couleur par défaut
    }
  }

  return (
    <main className="h-screen overflow-hidden col-span-8 -z-50 introjs-tooltiptext" onDrop={handleDrop} onDragOver={handleDragOver} onContextMenu={showContextMenu}>
      <div className="w-full h-full flex justify-center items-center" ref={ref}>
        {/* React Flow component */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          minZoom={0.05}
          maxZoom={50}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onNodesDelete={onNodesDelete}
          onEdgesChange={onEdgesChange}
          onPaneClick={onPaneClick}
          onConnect={onConnect}
          onNodeContextMenu={onNodeContextMenu}
          fitView
        >
          <Background color="oklch(var(--b1))" />
          <MiniMap className="scale-[.65] lg:scale-[.80] 2xl:scale-100 bg-gray-600 -translate-x-[220px] 2xl:-translate-x-[250px]" nodeColor={(nodes) => setNodeColor(nodes)} pannable={true} />
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

export default FlowChart
