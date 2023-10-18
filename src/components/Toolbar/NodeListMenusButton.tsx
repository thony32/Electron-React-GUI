import React from "react"
import { ImageList, VideoList, Others } from ".."

const NodeListMenusButton: React.FC = () => {
  return (
    <div className="drawer">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-96 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <ImageList />
          </li>
          <li>
            <VideoList />
          </li>
          <li>
            <Others />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NodeListMenusButton
