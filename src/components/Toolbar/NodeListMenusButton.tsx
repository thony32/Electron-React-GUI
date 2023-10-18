import React, { useState } from "react"
import { ImageList, VideoList, Others } from ".."

const NodeListMenusButton: React.FC = () => {
  // TODO: Handle checked state
  const [selectedInput, setSelectedInput] = useState<string | null>(null)

  const handleInputChange = (id: string) => {
    if (id === selectedInput) {
      setSelectedInput(null)
    } else {
      setSelectedInput(id)
    }
  }

  const isInputChecked = (id: string) => {
    return id === selectedInput
  }

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
        <ul className="menu p-4 w-96 min-h-full bg-base-200 text-base-content flex flex-col gap-4">
          {/* Sidebar content here */}
          <li>
            {/* <ImageList /> */}
            <div className="collapse collapse-arrow bg-base-300">
              <input type="radio" checked={isInputChecked("input1")} onChange={() => handleInputChange("input1")} />
              <div className="collapse-title text-xl font-medium bg-red-200 w-80">Your Ref Images</div>
              <div className="collapse-content w-80">
                <p>hello</p>
              </div>
            </div>
          </li>
          <li>
            {/* <VideoList /> */}
            <div className="collapse collapse-arrow bg-base-300">
              <input type="radio" checked={isInputChecked("input2")} onChange={() => handleInputChange("input2")} />
              <div className="collapse-title text-xl font-medium w-80">Your Ref Images</div>
              <div className="collapse-content w-80">
                <p>hello</p>
              </div>
            </div>
          </li>
          <li>
            {/* <Others /> */}
            <div className="collapse collapse-arrow bg-base-300">
              <input type="radio" checked={isInputChecked("input3")} onChange={() => handleInputChange("input3")} />
              <div className="collapse-title text-xl font-medium w-80">Your Ref Images</div>
              <div className="collapse-content w-80">
                <p>hello</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NodeListMenusButton
