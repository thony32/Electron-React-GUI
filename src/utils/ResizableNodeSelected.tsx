/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, NodeResizer, Position } from "reactflow"

const ResizableNodeSelected = ({ data, selected }: any) => {
  return (
    <>
      <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  )
}

export default ResizableNodeSelected
