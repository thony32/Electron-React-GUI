import { create } from "zustand"
import { Connection, Edge, EdgeChange, Node, NodeChange, addEdge, OnNodesChange, OnEdgesChange, OnConnect, applyNodeChanges, applyEdgeChanges, NodeTypes } from "reactflow"
import { ResizableNodeSelected } from "../utils"

type RFState = {
  nodes: Node[]
  edges: Edge[]
  nodeTypes: NodeTypes
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
}

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  nodes: [],
  nodeTypes: { ResizableNodeSelected },
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    })
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    })
  },
}))

export default useStore
