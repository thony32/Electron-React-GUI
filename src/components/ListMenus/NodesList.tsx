
import React, { useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { nodesState, selectedNodeIdState } from "../../states"
import { useNodeFunction, useReactFlowFunctions } from "../../hooks"
import { Copy, Trashbin } from "../../assets"

const NodesList: React.FC = () => {
  const nodes = useRecoilValue(nodesState)
  const setSelectedNodeId = useSetRecoilState(selectedNodeIdState)
  const { deleteNode, duplicateNode } = useNodeFunction()
  const { setNodes, setEdges } = useReactFlowFunctions()
  const [tempId, setTempId] = useState<string>("")
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null)

  const handleDeleteClick = (nodeId: string) => {
    deleteNode(nodeId)
  }

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId)
  }

  const handleDuplicateClick = (nodeId: string) => {
    duplicateNode(nodeId)
  }

  // TODO: Handle Id change
  const handleIdChange = (oldId: string, newId: string) => {
    setNodes((prevNodes: any) => prevNodes.map((node: any) => (node.id === oldId ? { ...node, id: newId } : node)))
    setEdges((prevEdges: any) => prevEdges.map((edge: any) => (edge.source === oldId ? { ...edge, source: newId } : edge)))
    setEdges((prevEdges: any) => prevEdges.map((edge: any) => (edge.target === oldId ? { ...edge, target: newId } : edge)))
  }

  const handleInputChange = (id: string, value: string) => {
    if (id === editingNodeId) {
      setTempId(value)
    }
  }

  const handleInputFocus = (id: string) => {
    setEditingNodeId(id)
    setTempId(id)
  }

  const handleApplyChange = (oldId: string) => {
    handleIdChange(oldId, tempId)
    setEditingNodeId(null)
    setTempId("")
  }

  return (
    <div className="p-1 overflow-y-auto h-full">
      <div className="text-sm font-bold uppercase px-4">Nodes List</div>
      <div className="divider"></div>
      {nodes.map((node, index) => (
        <div key={index} className="flex justify-between items-center p-1 hover:bg-base-200 cursor-pointer" onClick={() => handleNodeClick(node.id)}>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask w-10 h-10 rounded-full">{node.data.label}</div>
            </div>
            {/* <div className="text-xs">{node.id}</div> */}
            <input
              type="text"
              className="block py-1 px-0 w-1/3 text-xs bg-transparent border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer text-current"
              value={editingNodeId === node.id ? tempId : node.id}
              onFocus={() => handleInputFocus(node.id)}
              onChange={(e) => handleInputChange(node.id, e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            {editingNodeId === node.id && (
              <button onClick={() => handleApplyChange(node.id)} key={index}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-4 h-4 fill-current">
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
              </button>
            )}
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
