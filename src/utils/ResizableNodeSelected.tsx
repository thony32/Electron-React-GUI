/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, NodeResizer, Position } from "reactflow"

const ResizableNodeSelected = ({ data, selected }: any) => {
  return (
    <>
      <NodeResizer color="hsl(var(--bc))" isVisible={selected} minWidth={100} minHeight={30} keepAspectRatio={true} />
      <div className="p-2">{data.label}</div>
      {/* <Handle type="target" position={Position.Top} isConnectable={true} isConnectableEnd={true} />
      <Handle type="source" position={Position.Right} isConnectable={true} isConnectableStart={true} />
      <Handle type="source" position={Position.Bottom} isConnectable={true} isConnectableStart={true} />
      <Handle type="target" position={Position.Left} isConnectable={true} isConnectableEnd={true} /> */}
    </>
  )
}

export default ResizableNodeSelected
