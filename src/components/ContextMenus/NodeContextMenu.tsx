/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { useNodeFunction } from "../../hooks"

interface NodeContextMenuProps {
  id: string
  top: number
  left: number
  right: number
  bottom: number
}

const NodeContextMenu: React.FC<NodeContextMenuProps> = ({ id, top, left, right, bottom, ...props }) => {
  const { duplicateNode, deleteNode } = useNodeFunction()

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
