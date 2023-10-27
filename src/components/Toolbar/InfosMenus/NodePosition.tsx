import React from "react"
import { useRecoilValue } from "recoil"
import { nodesState } from "../../../states"

const NodePosition: React.FC = () => {
  const imageNodes = useRecoilValue(nodesState)

  return (
    <div className="p-2 h-96 overflow-y-auto">
      <div className="text-sm font-bold">Nodes Position</div>
      <div className="divider"></div>
      {imageNodes.map((node) => (
        <div key={node.id} className="flex flex-col space-y-4 justify-between px-2 hover:bg-base-200">
          <div className="text-center text-xs font-semibold">
            {node.id}
          </div>
          <div className="">
            <div className="text-xs">
              X: {node.position.x}
            </div>
            <div className="text-xs">
              Y: {node.position.y}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NodePosition
