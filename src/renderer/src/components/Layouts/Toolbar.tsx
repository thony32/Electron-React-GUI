import React from "react"
import { Undo, Redo } from "../../assets"
import { InputText, Shortcuts } from ".."
import { useNodesAndEdgesState } from "../../hooks"

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

  return (
    <div className="fixed bottom-5  max-[500px]:hidden left-[40%] min-[2560px]:left-[50%] xl:w-64 bg-base-300 px-4 py-2 rounded-md flex gap-4 justify-between">
      <button className="p-2 rounded-md hover:bg-base-200 duration-300 active:scale-95" onClick={handleUndo} disabled={!canUndoNodes && !canUndoEdges}>
        <Undo />
      </button>
      <button className="p-2 rounded-md hover:bg-base-200 duration-300 active:scale-95" onClick={handleRedo} disabled={!canRedoNodes && !canRedoEdges}>
        <Redo />
      </button>
      <InputText addTextNode={addTextNode} />
      <Shortcuts />
    </div>
  )
}

export default Toolbar
