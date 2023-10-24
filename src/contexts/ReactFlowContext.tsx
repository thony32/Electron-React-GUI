/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react"
import { useReactFlow } from "reactflow"
import { ProviderProps } from "../utils"

// Créez un context spécifique à React Flow
const ReactFlowContext = createContext<any | undefined>(undefined)

export function ReactFlowContextProvider({ children }: ProviderProps) {
  // Utilisez le hook useReactFlow pour obtenir les fonctions spécifiques à React Flow
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow()

  return <ReactFlowContext.Provider value={{ getNode, setNodes, addNodes, setEdges }}>{children}</ReactFlowContext.Provider>
}

export default ReactFlowContext
