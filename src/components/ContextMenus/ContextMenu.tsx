import React from "react"
import { ContextMenuData } from "../../data"
import type { ContextMenuProps } from "../../utils"

const ContextMenu: React.FC<ContextMenuProps> = ({top, left}) => {
  
  const containerClasses = `absolute top-${top} left-${left} flex flex-col w-24 lg:w-36 bg-base-200 rounded-md z-50`;

  return (
    <div className={containerClasses}>
      {ContextMenuData.map((menu, index) => {
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
