import { useContext } from "react"
import CanvasContext from "../contexts/CanvasContext"

export const useNodeFunction = () => {
    const context = useContext(CanvasContext)

    if (context === undefined) {
        throw new Error("useNodeFunction must be used within a MyProvider")
    }

    return context
}
