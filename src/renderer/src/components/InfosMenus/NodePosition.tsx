import React from "react"
import "../../index.css"
import { useNodesAndEdgesState } from "../../hooks"
import { Node } from "reactflow"

const NodePosition: React.FC = () => {
    const { nodes, setNodes } = useNodesAndEdgesState() as any

    const handleXPositionChange = (id: string, newXValue: string) => {
        const value = newXValue.trim() === "" ? "0" : newXValue
        setNodes((prevNodes: Node[]) => prevNodes.map((node: Node) => (node.id === id ? { ...node, position: { ...node.position, x: parseFloat(value) } } : node)))
    }

    const handleYPositionChange = (id: string, newYValue: string) => {
        const value = newYValue.trim() === "" ? "0" : newYValue
        setNodes((prevNodes: Node[]) => prevNodes.map((node: Node) => (node.id === id ? { ...node, position: { ...node.position, y: parseFloat(value) } } : node)))
    }

    return (
        <div className="p-1 h-[50%] overflow-y-auto scrollbar space-y-4">
            <div className="font-bold uppercase p-2 m-2 border-b border-current">Properties</div>
            {/* <div className="divider"></div> */}
            {nodes
                .filter((node: Node) => node.selected)
                .map((node: Node) => (
                    <div key={node.id} className="flex flex-col space-y-4 justify-between p-4 hover:bg-base-200">
                        <div className="text-center text-sm font-semibold bg-gray-500/30 p-2 rounded-md">
                            <div className="w-full break-words">{node.id}</div>
                        </div>
                        <div className="flex justify-center gap-4">
                            <div className="text-xs flex justify-center items-center gap-4">
                                <span>X:</span>
                                <input
                                    type="text"
                                    className="block py-1 px-0 w-1/3 text-xs bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:ring-0 peer text-current"
                                    value={node.position.x.toFixed(0)}
                                    onChange={(e) => handleXPositionChange(node.id, e.target.value)}
                                />
                            </div>
                            <div className="text-xs flex justify-center items-center gap-4">
                                <span>Y:</span>
                                <input
                                    type="text"
                                    className="block py-1 px-0 w-1/3 text-xs bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:ring-0 peer text-current"
                                    value={node.position.y.toFixed(0)}
                                    onChange={(e) => handleYPositionChange(node.id, e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default NodePosition
