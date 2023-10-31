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
      <Handle type="source" className="w-2 h-12 rounded-full bg-sky-500 border-none" position={Position.Right} isConnectable={true} />
      <Handle type="target" className="w-2 h-12 rounded-full bg-black border-none" position={Position.Left} isConnectable={true} />
    </>
  )
}

export default ResizableNodeSelected
