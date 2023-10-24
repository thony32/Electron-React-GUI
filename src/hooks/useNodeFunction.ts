/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react"
import CanvasContext from "../contexts/CanvasContext"

export function useNodeFunction() {
  const context = useContext(CanvasContext)

  if (context === undefined) {
    throw new Error("useNodeFunction must be used within a MyProvider")
  }

  return context
}
