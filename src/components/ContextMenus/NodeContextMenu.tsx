/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
// import { useReactFlow } from "reactflow"
// import { v4 as uuidv4 } from "uuid"
import { useNodeFunction } from "../../hooks"

interface NodeContextMenuProps {
  id: string
  top: number
  left: number
  right: number
  bottom: number
}

const NodeContextMenu: React.FC<NodeContextMenuProps> = ({ id, top, left, right, bottom, ...props }) => {
  // const { getNode, setNodes, addNodes, setEdges } = useReactFlow()
  const { duplicateNode, deleteNode } = useNodeFunction()

  // // NOTE: Duplicate node
  // const duplicateNode = useCallback(() => {
  //   const node: any = getNode(id)
  //   const position = {
  //     x: node.position.x + 50,
  //     y: node.position.y + 50,
  //   }

  //   addNodes({ ...node, id: `${node.id}-${uuidv4()}`, position })
  // }, [id, getNode, addNodes])

  // // NOTE: Delete node
  // const deleteNode = useCallback(() => {
  //   setNodes((nodes) => nodes.filter((node) => node.id !== id))
  //   setEdges((edges) => edges.filter((edge) => edge.source !== id))
  // }, [id, setNodes, setEdges])

  return (
    <div style={{ top, left, right, bottom }} className="absolute flex flex-col w-[150px] lg:w-[200px] bg-base-300 rounded-sm z-50" {...props}>
      <button onClick={() => duplicateNode(id)} className="py-2 px-4 text-xs xl:text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between">
        <span>Duplicate</span>
        <kbd className="kbd-xs">Ctrl + C</kbd>
      </button>
      <button onClick={() => deleteNode(id)} className="py-2 px-4 text-xs xl:text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between">
        <span>Delete</span>
        <kbd className="kbd-xs">Del</kbd>
      </button>
    </div>
  )
}

export default NodeContextMenu
