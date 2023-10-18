import React from "react"

const ImageList: React.FC = () => {
  return (
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">

      // FIXME: Mapping the nodes id and label to display the images as a list
      <div className="collapse-title text-xl font-medium">Your Ref Images</div>
      {nodes && nodes.length > 0 ? (
        nodes.map((node) => (
          <div key={node.id} className="collapse-content flex gap-4">
            {node.data.label}
            <p>ID: {node.id}</p>
          </div>
        ))
      ) : (
        <div className="collapse-content"><p>No images to display.</p></div>
      )}
    </div>
  )
}

export default ImageList
