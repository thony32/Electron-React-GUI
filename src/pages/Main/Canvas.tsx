/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from "react"
import ReactFlow, { Controls, Background, MiniMap, applyNodeChanges, NodeTypes, addEdge, applyEdgeChanges, OnNodesChange, OnEdgesChange } from "reactflow"
import "/node_modules/reactflow/dist/style.css"
import { handleDragOver, ResizableNodeSelected } from "../../utils"
import { MainContextMenu, Toolbar, NodeContextMenu } from "../../components"
import { useRecoilState, useRecoilValue } from "recoil"
import { nodesState } from "../../states/nodesState"
import { RFProvider } from "../../contexts/RfContext"
import { edgesState, selectedNodeIdState } from "../../states"
import ReactPlayer from "react-player"

const nodeTypes: NodeTypes = {
  ResizableNodeSelected,
}

// Define the Canvas component
const Canvas: React.FC = () => {
  const [nodes, setNodes] = useRecoilState(nodesState)
  const [edges, setEdges] = useRecoilState(edgesState)
  const [menu, setMenu] = useState<any>(null)
  const [show, setShow] = useState(false) // NOTE State for main context Menu
  const [points, setPoints] = useState({ x: 0, y: 0 }) // NOTE State for main context Menu position
  const [rightClickOnNode, setRightClickOnNode] = useState(false)
  const selectedNodeId = useRecoilValue(selectedNodeIdState)
  const ref = useRef<HTMLDivElement | any>(null)

  // NOTE: All ReactFlow Props Functions
  const onNodesChange: OnNodesChange = useCallback((changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)), [])
  const onEdgesChange: OnEdgesChange = useCallback((changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])
  const onConnect = useCallback((params: any) => setEdges((els) => addEdge(params, els)), [setEdges])

  const onNodesDelete = (nodeId: any) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== nodeId))
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

  // Close the context menu if it's open whenever the window is clicked.
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

  // TODO: Handle Undo/Redo
  // const undo = useCallback(() => {
  //   // get the last state that we want to go back to
  //   const pastState = past[tabIndex][past[tabIndex].length - 1];

  //   if (pastState) {
  //     // first we remove the state from the history
  //     setPast((old) => {
  //       let newPast = cloneDeep(old);
  //       newPast[tabIndex] = old[tabIndex].slice(0, old[tabIndex].length - 1);
  //       return newPast;
  //     });
  //     // we store the current graph for the redo operation
  //     setFuture((old) => {
  //       let newFuture = cloneDeep(old);
  //       newFuture[tabIndex] = old[tabIndex];
  //       newFuture[tabIndex].push({ nodes: getNodes(), edges: getEdges() });
  //       return newFuture;
  //     });
  //     // now we can set the graph to the past state
  //     setNodes(pastState.nodes);
  //     setEdges(pastState.edges);
  //   }
  // }, [
  //   setNodes,
  //   setEdges,
  //   getNodes,
  //   getEdges,
  //   future,
  //   past,
  //   setFuture,
  //   setPast,
  //   tabIndex,
  // ]);

  // const redo = useCallback(() => {
  //   const futureState = future[tabIndex][future[tabIndex].length - 1];

  //   if (futureState) {
  //     setFuture((old) => {
  //       let newFuture = cloneDeep(old);
  //       newFuture[tabIndex] = old[tabIndex].slice(0, old[tabIndex].length - 1);
  //       return newFuture;
  //     });
  //     setPast((old) => {
  //       let newPast = cloneDeep(old);
  //       newPast[tabIndex] = old[tabIndex];
  //       newPast[tabIndex].push({ nodes: getNodes(), edges: getEdges() });
  //       return newPast;
  //     });
  //     setNodes(futureState.nodes);
  //     setEdges(futureState.edges);
  //   }
  // }, [
  //   future,
  //   past,
  //   setFuture,
  //   setPast,
  //   setNodes,
  //   setEdges,
  //   getNodes,
  //   getEdges,
  //   future,
  //   tabIndex,
  // ]);

  // NOTE: Function to handle drop of media files into React Flow

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const files = event.dataTransfer.files

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (file.type.startsWith("image/")) {
        // NOTE: Handle image file as a new node
        const imageUrl = URL.createObjectURL(file)
        const newNode = {
          id: `IMG-${Date.now()}`,
          type: "ResizableNodeSelected",
          data: { label: <img src={imageUrl} className="nodes" /> },
          position: { x: event.clientX, y: event.clientY },
          selected: `IMG-${Date.now()}` === selectedNodeId 
        }
        setNodes((prevNodes: any) => [...prevNodes, newNode])
      } else if (file.type.startsWith("video/")) {
        // FIXME: Handle video file as a new node
        const videoUrl = URL.createObjectURL(file)
        const newNode = {
          id: `VID-${Date.now()}`,
          type: "ResizableNodeSelected",
          data: {
            label: (
              <div className="nodes w-full h-full">
                <ReactPlayer className="nodes" url={videoUrl} width="100%" height="100%" controls />
              </div>
            ),
          },
          position: { x: event.clientX - 100, y: event.clientY - 100 },
        }
        setNodes((prevNodes: any) => [...prevNodes, newNode])
      }
      else if (file.type.startsWith("text/")) {
        // Handle text file as a new node
        const reader = new FileReader()
        reader.onload = (event: any) => {
          const textContent = event.target.result
          const newNode = {
            id: `TXT-${Date.now()}`,
            type: "ResizableNodeSelected",
            data: { label: <div>{textContent}</div> },
            position: { x: event.clientX, y: event.clientY },
          }
          setNodes((prevNodes: any) => [...prevNodes, newNode])
        }
        reader.readAsText(file)
      }
    }
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
        setMenu(null) // Clear the menu if right-clicking in the canvas
        setPoints({ x: event.pageX, y: event.pageY })
        setShow(true)
      }
    },
    [setMenu, rightClickOnNode]
  )

  return (
    <main className="h-screen overflow-hidden col-span-8" onDrop={handleDrop} onDragOver={handleDragOver} onContextMenu={showContextMenu}>
      <div className="w-full h-full flex justify-center items-center" ref={ref}>
        {/* React Flow component */}
        <ReactFlow nodes={nodes} nodeTypes={nodeTypes} onNodesChange={onNodesChange} onNodesDelete={onNodesDelete} onEdgesChange={onEdgesChange} onPaneClick={onPaneClick} onConnect={onConnect} onNodeContextMenu={onNodeContextMenu} fitView /* snapToGrid={true} snapGrid={[5, 5]}*/>
          <Background color="hsl(var(--b1)" />
          {/* <Controls className="bg-neutral-content rounded-sm translate-x-[250px]" /> */}
          <MiniMap className="scale-[.65] lg:scale-[.80] 2xl:scale-100 bg-neutral-content -translate-x-[220px] 2xl:-translate-x-[250px]" pannable={true} />
          {menu && <NodeContextMenu onClick={onPaneClick} {...menu} />}
          {show && (
            <RFProvider>
              <MainContextMenu top={points.y} left={points.x} />
            </RFProvider>
          )}
        </ReactFlow>
      </div>
      <Toolbar />
    </main>
  )
}

export default Canvas
