/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react"
import type { ProviderProps } from "../utils"
import { useRecoilState } from "recoil"
import { edgesState, nodesState } from "../states"

const NodesAndEdgesContext = createContext<any | undefined>(undefined)

export const NodesAndEdgesContextProvider = ({ children }: ProviderProps) => {
  const [nodes, setNodes] = useRecoilState(nodesState)
  const [edges, setEdges] = useRecoilState(edgesState)

  return <NodesAndEdgesContext.Provider value={{ nodes, setNodes, edges, setEdges }}>{children}</NodesAndEdgesContext.Provider>
}

export default NodesAndEdgesContext