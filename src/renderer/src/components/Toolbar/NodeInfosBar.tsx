import React from "react"
import { ImageExport, NodePosition } from ".."

const NodeInfosBar: React.FC = () => {
    return (
        <div className="fixed top-0 right-0 bottom-0 z-10 bg-base-300 w-60 space-y-4">
            <NodePosition />
            <ImageExport />
        </div>
    )
}

export default NodeInfosBar
