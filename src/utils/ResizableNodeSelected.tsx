import { useEffect, useRef, useState } from "react"
import { Handle, NodeProps, NodeResizer, Position, useUpdateNodeInternals } from "reactflow"
import { drag } from "d3-drag"
import { select } from "d3-selection"
import { useNodesAndEdgesState } from "../hooks"

type Size = {
  width: number
  height: number
}

const ResizableNodeSelected = ({id, data, selected, isConnectable }: NodeProps) => {
  const [rotation, setRotation] = useState(0)
  const rotatable = true
  const updateNodeInternals = useUpdateNodeInternals()
  const rotateControlRef = useRef<any>(null)
  const contentRef = useRef<any>(null)
  const { nodes } = useNodesAndEdgesState()
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
      // Use ResizeObserver to listen for changes in the content size
      const resizeObserver = new ResizeObserver(entries => {
        // eslint-disable-next-line prefer-const
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            setAspectRatio(width / height);
          }
        }
      });
  
      // Start observing the element
      resizeObserver.observe(contentRef.current);
  
      // Cleanup observer on component unmount
      return () => resizeObserver.disconnect();
    }
  }, [data]);

  // NOTE: This effect will update the content size when the aspect ratio changes
  const onResize = (_event: any, { width }: Size) => {
    requestAnimationFrame(() => {
      if (contentRef.current) {
        // Calculate the new height based on the aspect ratio
        const newHeight = width / (aspectRatio || 1); // Fallback to 1 to avoid dividing by zero
        const contentElement = contentRef.current;
        contentElement.style.width = `${width}px`;
        contentElement.style.height = `${newHeight}px`;
        updateNodeInternals(nodes.id);
      }
    });
  }
  // console.log(aspectRatio)

  return (
    <div
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <NodeResizer nodeId={id} color="#FF0844" isVisible={selected} keepAspectRatio={true} onResize={onResize} handleStyle={{ width: "20px", height: "20px" }} />
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
      <div className="p-1 nodes" ref={contentRef}>
        {data.label}
      </div>
      <Handle type="source" className="w-4 h-12 rounded-full bg-sky-500 border-none" position={Position.Right} isConnectable={isConnectable} />
      <Handle type="target" className="w-4 h-12 rounded-full bg-black border-none" position={Position.Left} isConnectable={isConnectable} />
    </div>
  )
}

export default ResizableNodeSelected
