/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react"
import type { ProviderProps } from "../utils"

const ReactFlowInstanceContext = createContext<any | undefined>(undefined)

export const ReactFlowInstanceProvider = ({ children }: ProviderProps) => {
  const [rfInstance, setRfInstance] = useState(null)

  return <ReactFlowInstanceContext.Provider value={{ rfInstance, setRfInstance }}>{children}</ReactFlowInstanceContext.Provider>
}

export default ReactFlowInstanceContext