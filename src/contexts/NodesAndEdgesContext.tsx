import { createContext, useCallback, useEffect } from "react"
import type { ProviderProps } from "../utils"
import { useRecoilState } from "recoil"
import { edgesState, nodesState } from "../states"
import useUndoable from "use-undoable"

const NodesAndEdgesContext = createContext<any | undefined>(undefined)

export const NodesAndEdgesContextProvider = ({ children }: ProviderProps) => {
  // FIXME: UNDO & REDO : Using useUndoable to manage the history state
  const [nodes, setNodes, { undo: undoNodes, redo: redoNodes, canUndo: canUndoNodes, canRedo: canRedoNodes }] = useUndoable([])
  const [edges, setEdges, { undo: undoEdges, redo: redoEdges, canUndo: canUndoEdges, canRedo: canRedoEdges }] = useUndoable([])

  // NOTE Synchronize the undoable state with Recoil state
  const [recoilNodes, setRecoilNodes] = useRecoilState(nodesState)
  const [recoilEdges, setRecoilEdges] = useRecoilState(edgesState)

  // FIXME: Update Recoil state whenever undoable state changes
  useEffect(() => {
    if (nodes !== recoilNodes) {
      setRecoilNodes(nodes)
    }
  }, [nodes, recoilNodes, setRecoilNodes])

  useEffect(() => {
    if (edges !== recoilEdges) {
      setRecoilEdges(edges)
    }
  }, [edges, recoilEdges, setRecoilEdges])

  // NOTE Use useCallback to memoize these functions so they don't change on every render
  const handleSetNodes = useCallback(
    (newNodes: any) => {
      setNodes(newNodes)
      setRecoilNodes(newNodes)
    },
    [setNodes, setRecoilNodes]
  )

  const handleSetEdges = useCallback(
    (newEdges: any) => {
      setEdges(newEdges)
      setRecoilEdges(newEdges)
    },
    [setEdges, setRecoilEdges]
  )

  return (
    <NodesAndEdgesContext.Provider
      value={{
        nodes: recoilNodes,
        setNodes: handleSetNodes,
        undoNodes,
        redoNodes,
        canUndoNodes,
        canRedoNodes,
        edges: recoilEdges,
        setEdges: handleSetEdges,
        undoEdges,
        redoEdges,
        canUndoEdges,
        canRedoEdges,
      }}
    >
      {children}
    </NodesAndEdgesContext.Provider>
  )
}

export default NodesAndEdgesContext
