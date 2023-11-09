import { useEffect, useRef, useState } from "react"
import { Handle, NodeProps, NodeResizeControl, Position, useUpdateNodeInternals } from "reactflow"
import { drag } from "d3-drag"
import { select } from "d3-selection"

type Size = {
  width: number
  height: number
}

const controlStyle = {
  background: "transparent",
  border: "none",
}

const ControledNodeSelected = ({ id, data, isConnectable }: NodeProps) => {
  const [rotation, setRotation] = useState(0)
  const rotatable = true
  const updateNodeInternals = useUpdateNodeInternals()
  const rotateControlRef = useRef<any>(null)
  const contentRef = useRef<any>(null)
//   const { nodes } = useNodesAndEdgesState()
  const [aspectRatio, setAspectRatio] = useState<number>(1)

  // NOTE This effect will add the drag handler to the rotate control
  useEffect(() => {
    if (!rotateControlRef.current) {
      return
    }

    const selection = select(rotateControlRef.current)
    const dragHandler = drag().on("drag", (event: any) => {
      const dx = event.x - 100
      const dy = event.y - 100
      const rad = Math.atan2(dx, dy)
      const deg = rad * (180 / Math.PI)
      setRotation(180 - deg)
      updateNodeInternals(id)
    })

    selection.call(dragHandler)
  }, [id, updateNodeInternals])

  // NOTE This effect will update the node internals when the size changes
  useEffect(() => {
    updateNodeInternals(id)
  }, [id, updateNodeInternals])

  // NOTE This effect will calculate the aspect ratio of the content
  useEffect(() => {
    if (contentRef.current) {
      const { offsetWidth, offsetHeight } = contentRef.current
      setAspectRatio(offsetWidth / offsetHeight)
    }
  }, [data])

  // FIXME This effect will update the content size when the aspect ratio changes
  const onResize = (_event: DragEvent, { width }: Size) => {
    // Calculate the new height based on the aspect ratio
    const newHeight = width / aspectRatio
    // Apply the new width and height to the content element
    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.style.width = `${width}px`
      contentElement.style.height = `${newHeight}px`
    }
  }

  return (
    <div
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
        <ResizeIcon />
      </NodeResizeControl>
      <div
        ref={rotateControlRef}
        style={{
          display: rotatable ? "block" : "none",
        }}
        className={`nodrag absolute w-[40px] h-[40px] bg-base-100 left-1/2 top-[-25px] rounded-full transform translate-x-[-50%] translate-y-[-50%] cursor-alias`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 fill-current" viewBox="0 -960 960 960">
          <path d="M482-160q-134 0-228-93t-94-227v-7l-64 64-56-56 160-160 160 160-56 56-64-64v7q0 100 70.5 170T482-240q26 0 51-6t49-18l60 60q-38 22-78 33t-82 11Zm278-161L600-481l56-56 64 64v-7q0-100-70.5-170T478-720q-26 0-51 6t-49 18l-60-60q38-22 78-33t82-11q134 0 228 93t94 227v7l64-64 56 56-160 160Z" />
        </svg>
      </div>
      <div className="p-2 nodes w-full h-full flex items-center justify-center" ref={contentRef}>
        {data.label}
      </div>
      <Handle type="source" className="w-3 h-8 rounded-full bg-sky-500 border-none" position={Position.Right} isConnectable={isConnectable} />
      <Handle type="target" className="w-3 h-8 rounded-full bg-black border-none" position={Position.Left} isConnectable={isConnectable} />
    </div>
  )
}

const ResizeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="hsl(var(--in))"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: "absolute", right: 5, bottom: 5 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="16 20 20 20 20 16" />
      <line x1="14" y1="14" x2="20" y2="20" />
      <polyline points="8 4 4 4 4 8" />
      <line x1="4" y1="4" x2="10" y2="10" />
    </svg>
  )
}

export default ControledNodeSelected
