/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react"
import CanvasContext from "../contexts/canvasContext"

export function useMyFunction() {
  const context = useContext(CanvasContext) as any

  if (context === undefined) {
    throw new Error("useMyFunction must be used within a MyProvider")
  }

  return context.myFunction
}
