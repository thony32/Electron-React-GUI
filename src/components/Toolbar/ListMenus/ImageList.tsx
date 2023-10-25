import React from "react"
import { useRecoilValue } from "recoil"
import { nodesState } from "../../../states"
import { Trashbin } from "../../../assets"
import { useNodeFunction } from "../../../hooks"

const ImageList: React.FC = () => {
  const imageNodes = useRecoilValue(nodesState)
  const { deleteNode } = useNodeFunction()
  const handleDeleteClick = (nodeId: string) => {
    deleteNode(nodeId)
  }
  return (
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200 w-full">
      <div className="collapse-title text-lg font-medium w-full uppercase">Your Ref Images</div>
      <div className="collapse-content flex flex-col gap-4">
        {imageNodes.length > 0 ? (
          imageNodes.map((node) => (
            <div key={node.id} className="flex items-center space-x-8 hover:bg-base-300 px-4 py-4 rounded-sm duration-200">
              <div className="avatar">
                <div className="mask w-12 h-12">{node.data.label}</div>
              </div>
              <div>
                <div className="font-bold">{node.id}</div>
              </div>
              <div className="z-50">
                <button className="btn btn-error btn-sm btn-circle z-20" onClick={() => handleDeleteClick(node.id)}>
                  <Trashbin />
                </button>
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
