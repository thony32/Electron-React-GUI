import React, { useState } from "react"
import { useSetRecoilState } from "recoil"
import { selectedNodeIdState } from "../../states"
import { useNodeFunction, useNodesAndEdgesState } from "../../hooks"
import { Copy, Trashbin } from "../../assets"
import "../../index.css"
import { Edge, Node } from "reactflow"

const NodesList: React.FC = () => {
  const { nodes, setNodes, setEdges } = useNodesAndEdgesState() as any
  const setSelectedNodeId = useSetRecoilState(selectedNodeIdState)
  const { deleteNode, duplicateNode } = useNodeFunction()
  // const { setNodes, setEdges } = useReactFlowFunctions()
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

  // NOTE: Handle Id change
  const handleIdChange = (oldId: string, newId: string) => {
    setNodes((prevNodes: Node[]) => prevNodes.map((node: Node) => (node.id === oldId ? { ...node, id: newId } : node)))
    setEdges((prevEdges: Edge[]) => prevEdges.map((edge: Edge) => (edge.source === oldId ? { ...edge, source: newId } : edge)))
    setEdges((prevEdges: Edge[]) => prevEdges.map((edge: Edge) => (edge.target === oldId ? { ...edge, target: newId } : edge)))
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

  // This function will display the nodes avatar according to the type of the node
  const displayAvatar = (node: Node) => {
    if (node.type === "ImageNode") {
      return (
        <div className="mask w-10 h-10 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-10 h-10 fill-gray-500">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
          </svg>
        </div>
      )
    } else if (node.type === "VideoNode") {
      return (
        <div className="mask w-10 h-10 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-10 h-10 fill-gray-500">
            <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
        </div>
      )
    } else if (node.type === "TextNode") {
      return (
        <div className="mask w-10 h-10 rounded-full">
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3V21M9 21H15M19 6V3H5V6" className="stroke-gray-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    }
  }

  // console.log("Nodes: ", nodes )
  // console.log('Is Array:', Array.isArray(nodes))
  // console.log('Type of nodes:', typeof nodes);
  return (
    <div className="p-1 overflow-y-auto scrollbar h-full">
      <div className="font-bold uppercase px-4">Nodes List</div>
      <div className="divider"></div>
      {nodes.map((node: Node, index: number) => (
        <div key={index} className="flex justify-between items-center p-1 hover:bg-base-200 cursor-pointer" onClick={() => handleNodeClick(node.id)}>
          <div className="flex items-center gap-3">
            <div className="avatar">{displayAvatar(node)}</div>
            <input
              type="text"
              className="block py-1 px-0 w-1/3 text-sm font-semibold bg-transparent border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer text-current"
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
