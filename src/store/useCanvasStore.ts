import { create } from "zustand"
import { Node, Edge, NodeChange, EdgeChange, Connection, addEdge, OnNodesChange, OnEdgesChange, OnConnect, applyNodeChanges, applyEdgeChanges } from "reactflow"

export type RFState = {
    nodes: Node[]
    edges: Edge[]
    getNodes: () => Node[]
    getEdges: () => Edge[]
    setNodes: (nodes: Node[]) => void
    setEdges: (edges: Edge[]) => void
    onNodesChange: OnNodesChange
    onEdgesChange: OnEdgesChange
    onConnect: OnConnect
    onNodesDelete: (deleted: Node[]) => void
}

export const useCanvasStore = create<RFState>((set, get) => ({
    nodes: [],
    edges: [],
    getNodes: () => get().nodes,
    getEdges: () => get().edges,
    setNodes: (nodes: Node[]) => set({ nodes }),
    setEdges: (edges: Edge[]) => set({ edges }),
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
    onNodesDelete: (deleted: Node[]) => {
        set({
            nodes: get().nodes.filter((node) => !deleted.includes(node)),
            edges: get().edges.filter((edge) => !deleted.some((deletedNode) => edge.source === deletedNode.id || edge.target === deletedNode.id)),
        })
    },
}))
