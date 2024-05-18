import ReactFlow, { NodeTypes } from "reactflow"
import "/node_modules/reactflow/dist/style"
import ImageNode from "./nodeTypes/image-node"
import TextNode from "./nodeTypes/text-node"
import VideoNode from "./nodeTypes/video-node"
import LinkNode from "./nodeTypes/link-node"
import { useCanvasStore } from "@/store/useCanvasStore"

const nodeTypes: NodeTypes = {
    ImageNode,
    TextNode,
    VideoNode,
    LinkNode,
}

const Canvas = () => {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onNodesDelete } = useCanvasStore()

    return (
        <div>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodesDelete={onNodesDelete}
            />
        </div>
    )
}

export default Canvas
