import React from "react"
import { useRecoilValue } from "recoil"
import { nodesState } from "../../../states"

const NodePosition: React.FC = () => {
  const imageNodes = useRecoilValue(nodesState)

  return (
    <div className="p-2 h-96 overflow-y-auto">
      <div className="text-sm font-bold uppercase">Nodes Position</div>
      <div className="divider"></div>
      {imageNodes.map((node) => (
        <div key={node.id} className="flex flex-col space-y-4 justify-between p-2 hover:bg-base-200">
          <div className="text-center text-xs font-semibold">
            {node.id}
          </div>
          <div className="flex justify-center gap-4">
            <div className="text-xs">
              X: {node.position.x.toFixed(0)}
            </div>
            <div className="text-xs">
              Y: {node.position.y.toFixed(0)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NodePosition
