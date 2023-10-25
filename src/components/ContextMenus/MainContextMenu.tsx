import React from "react"
import { OS, type ContextMenuProps } from "../../utils"

const MainContextMenu: React.FC<ContextMenuProps> = ({ top, left }) => {
  return (
    <div className="absolute flex flex-col w-[150px] lg:w-[200px] bg-base-300 rounded-sm z-50" style={{ top: top, left: left }}>
      <button className="py-2 px-4 text-xs xl:text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between">
        Help
        <kbd className="kbd-xs">{OS(window) === "MacOS" ? "Cmd + H" : "Ctrl + H"}</kbd>
      </button>
      <button className="py-2 px-4 text-xs xl:text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between">
        Undo
        <kbd className="kbd-xs">{OS(window) === "MacOS" ? "Cmd + Z" : "Ctrl + Z"}</kbd>
      </button>
      <button className="py-2 px-4 text-xs xl:text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between">
        Redo
        <kbd className="kbd-xs">{OS(window) === "MacOS" ? "Cmd + Y" : "Ctrl + Y"}</kbd>
      </button>
      <button className="py-2 px-4 text-xs xl:text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between">
        Add Text
        <kbd className="kbd-xs">{OS(window) === "MacOS" ? "Cmd + T" : "Ctrl + T"}</kbd>
      </button>
      <button className="py-2 px-4 text-xs xl:text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between">
        Save
        <kbd className="kbd-xs">{OS(window) === "MacOS" ? "Cmd + S" : "Ctrl + S"}</kbd>
      </button>
      <button className="py-2 px-4 text-xs xl:text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between">
        Export
        <kbd className="kbd-xs">{OS(window) === "MacOS" ? "Cmd + E" : "Ctrl + E"}</kbd>
      </button>
      <button className="py-2 px-4 text-xs xl:text-sm hover:bg-base-200 duration-300 rounded-sm flex justify-between">
        Quit
        <kbd className="kbd-xs">{OS(window) === "MacOS" ? "Cmd + Q" : "Ctrl + Q"}</kbd>
      </button>
    </div>
  )
}

export default MainContextMenu
