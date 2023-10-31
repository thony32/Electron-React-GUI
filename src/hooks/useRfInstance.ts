import { useContext } from "react"
import RFContext from "../contexts/ReactFlowInstanceContext"

export const useRFInstance = () => {
  const context = useContext(RFContext)
  if (!context) {
    throw new Error("useRFInstance must be used within a RFProvider")
  }
  return context
}
