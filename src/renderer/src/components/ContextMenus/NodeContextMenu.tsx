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
        <div style={{ top, left, right, bottom }} className="absolute flex flex-col w-[200px] xl:w-[250px] bg-base-200/80 rounded-sm z-10" {...props}>
            <div className="text-sm font-bold tracking-wide py-2 px-4 text-center">ID: {id}</div>
            <button onClick={() => duplicateNode(id)} className="py-2 px-4 text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between items-center space-x-4">
                <span className="font-bold tracking-wide">Duplicate</span>
                <span className="text-xs font-semibold">Ctrl + C</span>
            </button>
            <button onClick={() => deleteNode(id)} className="py-2 px-4 text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between items-center space-x-4">
                <span className="font-bold tracking-wide">Delete</span>
                <span className="text-xs font-semibold">Del</span>
            </button>
        </div>
    )
}

export default NodeContextMenu
