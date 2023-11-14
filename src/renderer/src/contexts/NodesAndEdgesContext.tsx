import { createContext, useCallback } from "react"
import type { ProviderProps } from "../utils"
import { useRecoilState } from "recoil"
import { edgesState, nodesState } from "../states"
import { Edge, Node } from "reactflow"
import useUndoable from "use-undoable"


// Define the shape of your context data
export interface NodesAndEdgesContextType {
  nodes: Node[]
  edges: Edge[]
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  undoNodes: () => void
  redoNodes: () => void
  canUndoNodes: boolean
  canRedoNodes: boolean
  undoEdges: () => void
  redoEdges: () => void
  canUndoEdges: boolean
  canRedoEdges: boolean
}

const NodesAndEdgesContext = createContext<NodesAndEdgesContextType | undefined>(undefined)

export const NodesAndEdgesContextProvider = ({ children }: ProviderProps) => {
  // FIXME: UNDO & REDO : Using useUndoable to manage the history state
  const [recoilNodes, setRecoilNodes] = useRecoilState(nodesState)
  const [recoilEdges, setRecoilEdges] = useRecoilState(edgesState)

  const [nodes, setNodes, { undo: undoNodes, redo: redoNodes, canUndo: canUndoNodes, canRedo: canRedoNodes }] = useUndoable(recoilNodes)
  const [edges, setEdges, { undo: undoEdges, redo: redoEdges, canUndo: canUndoEdges, canRedo: canRedoEdges }] = useUndoable(recoilEdges)

  // NOTE Synchronize the undoable state with Recoil state
  const syncNodesWithRecoil = useCallback(
    (newNodes: Node[]) => {
      setRecoilNodes(newNodes)
      setNodes(newNodes)
    },
    [setRecoilNodes, setNodes]
  )

  const syncEdgesWithRecoil = useCallback(
    (newEdges: Edge[]) => {
      setRecoilEdges(newEdges)
      setEdges(newEdges)
    },
    [setRecoilEdges, setEdges]
  )

  const contextValue = {
    nodes,
    edges,
    setNodes: syncNodesWithRecoil,
    setEdges: syncEdgesWithRecoil,
    undoNodes,
    redoNodes,
    canUndoNodes,
    canRedoNodes,
    undoEdges,
    redoEdges,
    canUndoEdges,
    canRedoEdges,
  }

  return <NodesAndEdgesContext.Provider value={contextValue}>{children}</NodesAndEdgesContext.Provider>
}

export default NodesAndEdgesContext
