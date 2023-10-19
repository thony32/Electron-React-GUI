import React from "react"
import { useRecoilValue } from "recoil"
import { nodesState } from "../../../states"

const ImageList: React.FC = () => {
  const imageNodes = useRecoilValue(nodesState)
  return (
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
      <div className="collapse-title text-xl font-medium">Your Ref Images</div>
      <div className="collapse-content">
        {imageNodes.length > 0 ? (
          imageNodes.map((node) => (
            <div key={node.id} className="flex gap-4 flex-col">
              <div className="flex  gap-4  w-52">
                <div className="w-8 h-8">{node.data.label}</div>
                <p>{node.id}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No images to display.</p>
        )}
      </div>
    </div>
  )
}

export default ImageList
