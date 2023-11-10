import React from "react"
import { OS, type ContextMenuProps } from "../../utils"
import { useLocalStorage, useNodesAndEdgesState, useRFInstance } from "../../hooks"

const flowKey = "flowKey"

const MainContextMenu: React.FC<ContextMenuProps> = ({ top, left }) => {
  const { undoNodes, redoNodes, canUndoNodes, canRedoNodes, undoEdges, redoEdges, canUndoEdges, canRedoEdges } = useNodesAndEdgesState()
  const { rfInstance } = useRFInstance()
  const { setValue } = useLocalStorage()

  const handleUndo = () => {
    if (canUndoNodes) undoNodes()
    if (canUndoEdges) undoEdges()
  }

  const handleRedo = () => {
    if (canRedoNodes) redoNodes()
    if (canRedoEdges) redoEdges()
  }

  // NOTE: Set Flow state into LocalStorage
  const handleSave = () => {
    if (rfInstance) {
      const flow = rfInstance.toObject()
      setValue(flowKey, flow)
    }
  }

  return (
    <div className="absolute flex flex-col w-[200px] xl:w-[250px] bg-base-200/60 rounded-md z-10" style={{ top: top, left: left }}>
      {/* <button className="py-2 px-4 text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between items-center space-x-4">
        <span className="font-bold tracking-wide">Help</span>
        <span className="text-xs font-semibold">{OS(window) === "MacOS" ? "Cmd + H" : "Ctrl + H"}</span>
      </button> */}
      <button
        className="py-2 px-4 text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between items-center space-x-4"
        onClick={handleUndo}
        disabled={!canUndoNodes && !canUndoEdges}
      >
        <span className="font-bold tracking-wide">Undo</span>
        <span className="text-xs font-semibold">{OS(window) === "MacOS" ? "Cmd + Z" : "Ctrl + Z"}</span>
      </button>
      <button
        className="py-2 px-4 text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between items-center space-x-4"
        onClick={handleRedo}
        disabled={!canRedoNodes && !canRedoEdges}
      >
        <span className="font-bold tracking-wide">Redo</span>
        <span className="text-xs font-semibold">{OS(window) === "MacOS" ? "Cmd + Y" : "Ctrl + Y"}</span>
      </button>
      <button className="py-2 px-4 text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between items-center space-x-4" onClick={handleSave}>
        <span className="font-bold tracking-wide">Save State</span>
        <span className="text-xs font-semibold">{OS(window) === "MacOS" ? "Cmd + S" : "Ctrl + S"}</span>
      </button>
      {/* <button className="py-2 px-4 text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between items-center space-x-4">
        <span className="font-bold tracking-wide">Export as Image</span>
        <span className="text-xs font-semibold">{OS(window) === "MacOS" ? "Cmd + E" : "Ctrl + E"}</span>
      </button> */}
      {/* // TODO: Export as File */}
      <button className="py-2 px-4 text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between items-center space-x-4">
        <span className="font-bold tracking-wide">Export as File</span>
        <span className="text-xs font-semibold">{OS(window) === "MacOS" ? "Cmd + E" : "Ctrl + shift + E"}</span>
      </button>
    </div>
  )
}

export default MainContextMenu
