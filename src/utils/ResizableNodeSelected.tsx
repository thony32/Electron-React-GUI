/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodeResizer } from "reactflow"

const ResizableNodeSelected = ({ data, selected }: any) => {
  return (
    <>
      <NodeResizer color="hsl(var(--nc))" isVisible={selected} minWidth={100} minHeight={30} keepAspectRatio={true} />
      <div>{data.label}</div>
    </>
  )
}

export default ResizableNodeSelected
