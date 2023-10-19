import React from "react"

const NodePosition: React.FC = () => {
  return (
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
      <div className="collapse-title text-xl font-medium">The Position of Node</div>
      <div className="collapse-content">
        <p>tabIndex={0} attribute is necessary to make the div focusable</p>
      </div>
    </div>
  )
}

export default NodePosition
