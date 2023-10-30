import React from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { nodesState, selectedNodeIdState } from "../../states"
import { useNodeFunction } from "../../hooks"
import { Copy, Trashbin } from "../../assets"

const NodesList: React.FC = () => {
  const imageNodes = useRecoilValue(nodesState)
  const setSelectedNodeId = useSetRecoilState(selectedNodeIdState)
  const { deleteNode, duplicateNode } = useNodeFunction()
  const handleDeleteClick = (nodeId: string) => {
    deleteNode(nodeId)
  }
  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId)
  }
  const handleDuplicateClick = (nodeId: string) => {
    duplicateNode(nodeId)
  }

  return (
    <div className="p-1 overflow-y-auto h-full">
      <div className="text-sm font-bold uppercase px-4">Nodes List</div>
      <div className="divider"></div>
      {imageNodes.map((node) => (
        <div key={node.id} className="flex justify-between items-center p-1 hover:bg-base-200 cursor-pointer" onClick={() => handleNodeClick(node.id)}>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask w-10 h-10 rounded-full">{node.data.label}</div>
            </div>
            <div className="text-xs">{node.id}</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => handleDuplicateClick(node.id)}>
              <Copy />
            </button>
            <button onClick={() => handleDeleteClick(node.id)}>
              <Trashbin />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NodesList
