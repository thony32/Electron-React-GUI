import React from "react"
import { NodePosition } from ".."

const NodeInfosMenusButton: React.FC = () => {
  return (
    <div className="drawer drawer-end w-32">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Node Proprieties
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-96 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <NodePosition/>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NodeInfosMenusButton
