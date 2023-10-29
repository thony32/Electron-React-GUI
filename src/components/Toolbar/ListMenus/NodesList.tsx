import React from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { nodesState, selectedNodeIdState } from "../../../states"
import { useNodeFunction } from "../../../hooks"
import { Trashbin } from "../../../assets"

const NodesList: React.FC = () => {
  const imageNodes = useRecoilValue(nodesState)
  const setSelectedNodeId = useSetRecoilState(selectedNodeIdState)
  const { deleteNode } = useNodeFunction()
  const handleDeleteClick = (nodeId: string) => {
    deleteNode(nodeId)
  }
  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId)
  }

  return (
    <div className="p-2 overflow-y-auto h-full">
      <div className="text-sm font-bold uppercase px-4">Nodes List</div>
      <div className="divider"></div>
      {imageNodes.map((node) => (
        <div key={node.id} className="flex justify-center items-center p-1 hover:bg-base-200 space-x-1 cursor-pointer" onClick={() => handleNodeClick(node.id)}>
          <div className="flex items-center gap-2">
            <div className="avatar">
              <div className="mask w-10 h-10 rounded-full">{node.data.label}</div>
            </div>
            <div className="text-xs">{node.id}</div>
          </div>
          <button className="p-1 rounded-md bg-red-500 hover:bg-red-600 active:scale-90 duration-300" onClick={() => handleDeleteClick(node.id)}>
            <Trashbin />
          </button>
        </div>
      ))}
    </div>
  )
}

export default NodesList
