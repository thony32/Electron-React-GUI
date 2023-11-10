
import { createContext } from "react"
import { useReactFlow } from "reactflow"
import { ProviderProps } from "../utils"
import { useNodesAndEdgesState } from "../hooks"

// Créez un context spécifique à React Flow
const ReactFlowContext = createContext<any | undefined>(undefined)

export function ReactFlowContextProvider({ children }: ProviderProps) {
  // Utilisez le hook useReactFlow pour obtenir les fonctions spécifiques à React Flow
  const { getNode, getNodes, getEdge, getEdges, addNodes, addEdges } = useReactFlow() 
  const { setNodes, setEdges } = useNodesAndEdgesState() 

  return <ReactFlowContext.Provider value={{ getNode, getNodes, getEdge, getEdges, setNodes, addNodes, setEdges, addEdges }}>{children}</ReactFlowContext.Provider>
}

export default ReactFlowContext
