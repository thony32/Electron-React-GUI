import React from "react"
import { Undo, Redo } from "../../assets"
import { InputText } from ".."
import { useNodesAndEdgesState } from "../../hooks"
import { useHotkeys } from "react-hotkeys-hook"

const Toolbar: React.FC<{ addTextNode: (text: string, position?: { x: number; y: number }) => void }> = ({ addTextNode }) => {
    const { undoNodes, redoNodes, canUndoNodes, canRedoNodes, undoEdges, redoEdges, canUndoEdges, canRedoEdges } = useNodesAndEdgesState()
    const handleUndo = () => {
        if (canUndoNodes) undoNodes()
        if (canUndoEdges) undoEdges()
    }
    const handleRedo = () => {
        if (canRedoNodes) redoNodes()
        if (canRedoEdges) redoEdges()
    }

    useHotkeys("ctrl+z", handleUndo)
    useHotkeys("ctrl+y", handleRedo)

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex justify-center items-center">
                <button className="p-2 rounded-md hover:bg-base-300 duration-300 active:scale-95 disabled:opacity-20 flex justify-center items-center gap-2" onClick={handleUndo} disabled={!canUndoNodes && !canUndoEdges}>
                    <Undo />
                    <span>Undo</span>
                </button>
                <button className="p-2 rounded-md hover:bg-base-300 duration-300 active:scale-95 disabled:opacity-20 flex justify-center items-center gap-2" onClick={handleRedo} disabled={!canRedoNodes && !canRedoEdges}>
                    <Redo />
                    <span>Redo</span>
                </button>
            </div>
            <InputText addTextNode={addTextNode} />
            {/* <Shortcuts /> */}
        </div>
    )
}

export default Toolbar
