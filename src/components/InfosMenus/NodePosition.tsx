
import React from "react"
import { useRecoilState } from "recoil"
import { nodesState } from "../../states"

const NodePosition: React.FC = () => {
  const [imageNodes, setImageNodes] = useRecoilState(nodesState)

  const handleXPositionChange = (id: string, newXValue: string) => {
    const value = newXValue.trim() === "" ? "0" : newXValue
    setImageNodes((prevNodes: any) => prevNodes.map((node: any) => (node.id === id ? { ...node, position: { ...node.position, x: parseFloat(value) } } : node)))
  }

  const handleYPositionChange = (id: string, newYValue: string) => {
    const value = newYValue.trim() === "" ? "0" : newYValue
    setImageNodes((prevNodes: any) => prevNodes.map((node: any) => (node.id === id ? { ...node, position: { ...node.position, y: parseFloat(value) } } : node)))
  }

  return (
    <div className="p-2 h-[50%] overflow-y-auto">
      <div className="text-sm font-bold uppercase px-4">Nodes Position</div>
      <div className="divider"></div>
      {imageNodes.map((node) => (
        <div key={node.id} className="flex flex-col space-y-4 justify-between p-2 hover:bg-base-200">
          <div className="text-center text-xs font-semibold">{node.id}</div>
          <div className="flex justify-center gap-4">
            <div className="text-xs flex justify-center items-center gap-4">
              <span>X:</span>
              <input type="text" className="block py-1 px-0 w-1/3 text-xs bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:ring-0 peer text-current" value={node.position.x.toFixed(0)} onChange={(e) => handleXPositionChange(node.id, e.target.value)} />
            </div>
            <div className="text-xs flex justify-center items-center gap-4">
              <span>Y:</span>
              <input type="text" className="block py-1 px-0 w-1/3 text-xs bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:ring-0 peer text-current" value={node.position.y.toFixed(0)} onChange={(e) => handleYPositionChange(node.id, e.target.value)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NodePosition
