import { useContext } from "react"
import NodesAndEdgesContext from "../contexts/NodesAndEdgesContext"

export const useNodesAndEdgesState = () => {
  const context = useContext(NodesAndEdgesContext)
  if (!context) {
    throw new Error("UseNodesAndEdgesState must be used within a NOdesAndEdgesProvider")
  }
  return context
}
