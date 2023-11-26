import { Handle, NodeProps, NodeResizer, Position } from "reactflow"
import { handleStyleLeft } from "."
import { handleStyleRight } from "."

const TextNode = ({ id, selected, data, isConnectable }: NodeProps) => {
    const handleStyle = {
        width: "20px",
        height: "20px",
        border: "none",
        borderRadius: "999px",
    }

    return (
        <div className="bg-gray-500/25 rounded-lg max-w-[500px]">
            <NodeResizer nodeId={id} color="#FF0844" isVisible={selected} keepAspectRatio={true} handleStyle={handleStyle} />
            <div className="p-4 nodes w-full h-full">{data.label}</div>
            <Handle type="source" style={handleStyleRight} position={Position.Right} isConnectable={isConnectable} />
            <Handle type="target" style={handleStyleLeft} position={Position.Left} isConnectable={isConnectable} />
        </div>
    )
}

export default TextNode
