import { Handle, NodeProps, Position } from "reactflow"

const TextNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="bg-gray-500/25 rounded-lg">
      <div className="p-4 nodes text-2xl font-semibold tracking-widest w-full h-full">
        {data.label}
      </div>
      <Handle type="source" className="w-3 h-3 rounded-full bg-sky-500 border-none" position={Position.Right} isConnectable={isConnectable} />
      <Handle type="target" className="w-3 h-3 rounded-full bg-black border-none" position={Position.Left} isConnectable={isConnectable} />
    </div>
  )
}

export default TextNode
