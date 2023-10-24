/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useCallback, useContext } from "react"
import { ProviderProps } from "../utils"
import { v4 as uuidv4 } from "uuid"
import ReactFlowContext from "./ReactFlowContext"
import { Edge, Node } from "reactflow"

// Définir le type pour le context
interface ContextTypes {
  duplicateNode: (id: string) => void
  deleteNode: (id: string) => void
}

const CanvasContext = createContext<ContextTypes | undefined>(undefined)

// Créez un provider pour envelopper votre application

export const FunctionProvider = ({ children }: ProviderProps) => {
  // La fonction que vous souhaitez partager
  const { getNode, setNodes, addNodes, setEdges } = useContext(ReactFlowContext)
  
  // NOTE: Duplicate node
  const duplicateNode = useCallback((id: string) => {
    const node: any = getNode(id)
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    }

    addNodes({ ...node, id: `${node.id}-${uuidv4()}`, position })
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
