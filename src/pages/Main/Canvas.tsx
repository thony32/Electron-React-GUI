/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react"
import ReactFlow, { Controls, Background, MiniMap, applyNodeChanges, OnNodesChange, NodeTypes } from "reactflow"
import "../../../node_modules/reactflow/dist/style.css"
import { handleDragOver, ResizableNodeSelected } from "../../utils"
import { Gifs, VideoPlayer, MainContextMenu, Toolbar } from "../../components"
import { useRecoilState } from "recoil"
import { nodesState } from "../../states"
import { v4 as uuidv4 } from "uuid"
import { NodeData } from "../../states/nodesState"
import { useHotkeys } from "react-hotkeys-hook"

const nodeTypes: NodeTypes = {
  ResizableNodeSelected,
}

// Define the Canvas component
const Canvas: React.FC = () => {
  const [nodes, setNodes] = useRecoilState(nodesState)
  // const [edges, setEdges] = useState([])
  const [show, setShow] = useState(false)
  const [points, setPoints] = useState({ x: 0, y: 0 })
  const [selectedNode, setSelectedNode] = useState<any>(null)
  useHotkeys("delete", () => {
    if (selectedNode) {
      setNodes((nodes) => nodes.filter((node) => node.id !== selectedNode.id))
    }
  })
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
    // console.log(event.pageX, event.pageY)
    setPoints({ x: event.pageX, y: event.pageY })
  }

  // FIXME: Handle Undo/Redo
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

  // TODO: Handle Copy Nodes

  // TODO: Handle Paste Nodes

  // ? Function to handle drop of media files into React Flow
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
          id: `IMG-${uuidv4()}`,
          type: "ResizableNodeSelected",
          data: { label: <img src={imageUrl} /> },
          position: { x: event.clientX, y: event.clientY },
        }
        setNodes((prevNodes: NodeData[]) => [...prevNodes, newNode])
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
        setNodes((prevNodes: NodeData[]) => [...prevNodes, newNode])
      } else if (file.type === "image/gif") {
        // NOTE: Handle gif file as a new node
        const gifUrl = URL.createObjectURL(file)
        const newNode = {
          id: `GIF-${uuidv4()}`,
          type: "ResizableNodeSelected",
          data: { label: <Gifs src={gifUrl} /> },
          position: { x: event.clientX - 100, y: event.clientY - 100 },
        }
        setNodes((prevNodes: NodeData[]) => [...prevNodes, newNode])
      }
    }
  }

  const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []) 

  // NOTE: onNodeDelete React Flow function
  const onNodeClick = (target, nodes: Node[]) => {
    setSelectedNode(nodes)
  }

  const onNodesDelete: any = (nodeId: string) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== nodeId))
  }

  // const onNodeDeleteClick = () => {
  //   if (reactFlowInstance.current && selectedNode) {
  //     const deleteNode = [selectedNode]
  //     reactFlowInstance.deleteElements({ nodes: deleteNode })
  //     setSelectedNode(null)
  //   }
  // }

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
      <div className="w-full h-full flex justify-center items-center">
        {/* React Flow component */}
        <ReactFlow nodes={nodes} nodeTypes={nodeTypes} onNodesChange={onNodesChange} onNodesDelete={onNodesDelete} onConnect={() => {}} fitView /* snapToGrid={true} snapGrid={[5, 5]}*/>
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
