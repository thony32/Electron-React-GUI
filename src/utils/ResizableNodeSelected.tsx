/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodeResizer } from "reactflow"

const ResizableNodeSelected = ({ data, selected }: any) => {
  return (
    <>
      <NodeResizer color="hsl(var(--bc))" isVisible={selected} minWidth={100} minHeight={30} keepAspectRatio={true} />
      <div className="p-2">{data.label}</div>
    </>
  )
}

export default ResizableNodeSelected
