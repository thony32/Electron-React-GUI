import React from "react"
import { useRecoilValue } from "recoil"
import { nodesState } from "../../../states"
import { useNodeFunction } from "../../../hooks"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { useHotkeys } from 'react-hotkeys-hook';

const NodesList: React.FC = () => {
  const imageNodes = useRecoilValue(nodesState)
  const { deleteNode } = useNodeFunction()
  const handleDeleteClick = (nodeId: string) => {
    deleteNode(nodeId)
  }

  return (
    <div className="p-2">
      <div className="text-sm font-bold">Nodes List</div>
      <div className="divider"></div>
      {imageNodes.map((node) => (
        <div key={node.id} className="flex space-y-8 justify-center items-center px-2 hover:bg-base-200">
          <div className="flex items-center">
            {/* <div className="avatar">
              <div className="mask w-10 h-10 rounded-full ring-offset-base-100 ring-offset-2">
                {node.data.label}
              </div>
            </div> */}
            <div className="text-xs text-ellipsis">
              {node.id}
            </div>
          </div>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteClick(node.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ))}
    </div>
  )
}

export default NodesList
