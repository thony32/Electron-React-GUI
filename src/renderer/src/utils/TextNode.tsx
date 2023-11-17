import { Handle, NodeProps, Position } from "reactflow"
import { handleStyleLeft } from '.';
import { handleStyleRight } from '.';

const TextNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="bg-gray-500/25 rounded-lg max-w-[500px]">
      <div className="p-4 nodes w-full h-full">
        {data.label}
      </div>
      <Handle type="source" style={handleStyleLeft} position={Position.Right} isConnectable={isConnectable} />
      <Handle type="target" style={handleStyleRight} position={Position.Left} isConnectable={isConnectable} />
    </div>
  )
}

export default TextNode
