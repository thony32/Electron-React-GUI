/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react"
import type { ProviderProps } from "../utils"

const RFContext = createContext<any | undefined>(undefined)

export const RFProvider = ({ children }: ProviderProps) => {
  const [rfInstance, setRfInstance] = useState(null)

  return <RFContext.Provider value={{ rfInstance, setRfInstance }}>{children}</RFContext.Provider>
}

export default RFContext