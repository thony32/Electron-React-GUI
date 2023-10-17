import React from "react"
import { RightClickMenuData } from "../../data"

const ContextMenu: React.FC = () => {
  return (
    <div className="absolute flex flex-col w-24 lg:w-36 bg-base-200 rounded-md z-50">
      {RightClickMenuData.map((menu, index) => {
        return (
          <button className="py-1 px-3 text-xs hover:bg-base-300 duration-300 rounded-md" key={index}>
            {menu.label}
          </button>
        )
      })}
    </div>
  )
}

export default ContextMenu
