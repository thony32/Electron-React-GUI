/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, NodeResizer, Position } from "reactflow"

interface ResizableNodeSelectedProps {
  data: any
  selected: boolean
}

const ResizableNodeSelected: React.FC<ResizableNodeSelectedProps> = ({ data, selected }) => {
  return (
    <>
      <NodeResizer color="hsl(var(--bc))" isVisible={selected} minWidth={100} minHeight={30} keepAspectRatio={true} />
      <div className="p-2">{data.label}</div>
      <Handle type="target" className="w-3 h-3 rounded-full bg-base-content border-none" position={Position.Top} isConnectable={true} isConnectableEnd={true} />
      <Handle type="source" className="w-3 h-3 rounded-full bg-blue-700 border-none" position={Position.Right} isConnectable={true} isConnectableStart={true} />
      <Handle type="source" className="w-3 h-3 rounded-full bg-blue-700 border-none" position={Position.Bottom} isConnectable={true} isConnectableStart={true} />
      <Handle type="target" className="w-3 h-3 rounded-full bg-base-content border-none" position={Position.Left} isConnectable={true} isConnectableEnd={true} />
    </>
  )
}

export default ResizableNodeSelected
