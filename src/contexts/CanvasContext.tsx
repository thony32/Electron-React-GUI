
import { createContext, useCallback } from "react"
import { ProviderProps } from "../utils"
import { nanoid } from "nanoid"
import { Edge, Node } from "reactflow"
import { useReactFlowFunctions } from "../hooks"

// Définir le type pour le context
interface ContextTypes {
  duplicateNode: (id: string) => void
  deleteNode: (id: string) => void
}


const CanvasContext = createContext<ContextTypes | undefined>(undefined)

// Provider pour envelopper votre application

export const CanvasContextProvider = ({ children }: ProviderProps) => {

  // La fonction que vous souhaitez partager
  const { getNode, setNodes, addNodes, setEdges } = useReactFlowFunctions()

  // Trouvez le nœud actuellement sélectionné
  // const selectedNode = nodes.find(node => node.selected);
  
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
  
  const contextValue: ContextTypes = {
    duplicateNode, deleteNode
  }

  return <CanvasContext.Provider value={contextValue}>{children}</CanvasContext.Provider>
}

export default CanvasContext
