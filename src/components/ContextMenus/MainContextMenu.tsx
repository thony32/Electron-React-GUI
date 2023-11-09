import React from "react"
import { OS, type ContextMenuProps } from "../../utils"
import { useLocalStorage, useRFInstance } from "../../hooks"

const flowKey = "flowKey"

const MainContextMenu: React.FC<ContextMenuProps> = ({ top, left }) => {

  const { rfInstance } = useRFInstance()
  const { setValue } = useLocalStorage()

  // NOTE Set Flow state into LocalStorage
  const handleSave = () => {
    if (rfInstance) {
      const flow = rfInstance.toObject()
      setValue(flowKey, flow)
    }
  }

  return (
    <div className="absolute flex flex-col w-[150px] lg:w-[200px] bg-neutral/75 text-neutral-content rounded-sm z-10" style={{ top: top, left: left }}>
      <button className="py-2 px-4 text-sm hover:bg-neutral/80 duration-300 rounded-sm flex justify-between items-center">
        <span className="font-bold tracking-wide">Help</span>
        <span className="text-xs font-semibold">{OS(window) === "MacOS" ? "Cmd + H" : "Ctrl + H"}</span>
      </button>
      <button className="py-2 px-4 text-sm hover:bg-neutral/80 duration-300 rounded-sm flex justify-between items-center">
        <span className="font-bold tracking-wide">Undo</span>
        <span className="text-xs font-semibold">{OS(window) === "MacOS" ? "Cmd + Z" : "Ctrl + Z"}</span>
      </button>
      <button className="py-2 px-4 text-sm hover:bg-neutral/80 duration-300 rounded-sm flex justify-between items-center">
        <span className="font-bold tracking-wide">Redo</span>
        <span className="text-xs font-semibold">{OS(window) === "MacOS" ? "Cmd + Y" : "Ctrl + Y"}</span>
      </button>
      <button className="py-2 px-4 text-sm hover:bg-neutral/80 duration-300 rounded-sm flex justify-between items-center">
        <span className="font-bold tracking-wide">Add Text</span>
        <span className="text-xs font-semibold">{OS(window) === "MacOS" ? "Cmd + T" : "Ctrl + T"}</span>
      </button>
      <button className="py-2 px-4 text-sm hover:bg-neutral/80 duration-300 rounded-sm flex justify-between items-center" onClick={handleSave}>
        <span className="font-bold tracking-wide">Save</span>
        <span className="text-xs font-semibold">{OS(window) === "MacOS" ? "Cmd + S" : "Ctrl + S"}</span>
      </button>
      <button className="py-2 px-4 text-sm hover:bg-neutral/80 duration-300 rounded-sm flex justify-between items-center">
        <span className="font-bold tracking-wide">Export</span>
        <span className="text-xs font-semibold">{OS(window) === "MacOS" ? "Cmd + E" : "Ctrl + E"}</span>
      </button>
      <button className="py-2 px-4 text-sm hover:bg-neutral/80 duration-300 rounded-sm flex justify-between items-center">
        <span className="font-bold tracking-wide">Quit</span>
        <span className="text-xs font-semibold">{OS(window) === "MacOS" ? "Cmd + Q" : "Ctrl + Q"}</span>
      </button>
    </div>
  )
}

export default MainContextMenu
