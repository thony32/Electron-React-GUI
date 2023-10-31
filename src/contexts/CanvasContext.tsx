/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useCallback, useContext, useEffect } from "react"
import { ProviderProps } from "../utils"
import { nanoid } from "nanoid"
import ReactFlowContext from "./ReactFlowContext"
import { Edge, Node, useKeyPress } from "reactflow"
import { useRecoilValue } from "recoil"
import { nodesState } from "../states"

// Définir le type pour le context
interface ContextTypes {
  duplicateNode: (id: string) => void
  deleteNode: (id: string) => void
}

const CanvasContext = createContext<ContextTypes | undefined>(undefined)

// Provider pour envelopper votre application

export const FunctionProvider = ({ children }: ProviderProps) => {
  // La fonction que vous souhaitez partager
  const { getNode, setNodes, addNodes, setEdges } = useContext(ReactFlowContext)
  const nodes = useRecoilValue(nodesState)
  // Trouvez le nœud actuellement sélectionné
  const selectedNode = nodes.find(node => node.selected);
  
  // Utilisez le hook `useKeyPress` pour écouter les raccourcis clavier
  const duplicateKeyPressed = useKeyPress("d");
  const deleteKeyPressed = useKeyPress("Delete");
  // NOTE: Duplicate node
  const duplicateNode = useCallback((id: string) => {
    const node: any = getNode(id)
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    }

    addNodes({ ...node, id: `${node.id}-${nanoid(2)}`, position })
  }, [addNodes, getNode])

  // NOTE: Delete node
  const deleteNode = useCallback((id: string) => {
    setNodes((nodes: any) => nodes.filter((node: Node) => node.id !== id))
    setEdges((edges: any) => edges.filter((edge: Edge) => edge.source !== id))
  }, [setNodes, setEdges])
  
  
  useEffect(() => {
    if (duplicateKeyPressed && selectedNode) {
      // Appelez la fonction de duplication si le raccourci de duplication est enfoncé et un nœud est sélectionné
      duplicateNode(selectedNode.id);
    }
  }, [duplicateKeyPressed, selectedNode]);
  
  useEffect(() => {
    if (deleteKeyPressed && selectedNode) {
      // Appelez la fonction de suppression si le raccourci de suppression est enfoncé et un nœud est sélectionné
      deleteNode(selectedNode.id);
    }
  }, [deleteKeyPressed, selectedNode]);
  
  const contextValue: ContextTypes = {
    duplicateNode, deleteNode
  }
  return <CanvasContext.Provider value={contextValue}>{children}</CanvasContext.Provider>
}

export default CanvasContext
