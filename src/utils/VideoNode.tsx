import { useEffect, useRef, useState } from "react"
import { Handle, NodeProps, Position, useUpdateNodeInternals } from "reactflow"
import { drag } from "d3-drag"
import { select } from "d3-selection"

const VideoNode = ({ id, data, isConnectable }: NodeProps) => {
  const [rotation, setRotation] = useState(0)
  const rotatable = true
  const updateNodeInternals = useUpdateNodeInternals()
  const rotateControlRef = useRef<any>(null)

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

  // NOTE Styles

  const parentDivStyle = {
    transform: `rotate(${rotation}deg)`,
  }

  const rotateButtonStyle = {
    display: rotatable ? "block" : "none",
  }

  return (
    <div style={parentDivStyle} className=" border-2 border-[#FF0844] rounded-md shadow-md relative">
      <div
        ref={rotateControlRef}
        style={rotateButtonStyle}
        className={`nodrag absolute w-[40px] h-[40px] bg-base-100 left-1/2 top-[-25px] rounded-full transform translate-x-[-50%] translate-y-[-50%] cursor-alias`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 fill-current" viewBox="0 -960 960 960">
          <path d="M482-160q-134 0-228-93t-94-227v-7l-64 64-56-56 160-160 160 160-56 56-64-64v7q0 100 70.5 170T482-240q26 0 51-6t49-18l60 60q-38 22-78 33t-82 11Zm278-161L600-481l56-56 64 64v-7q0-100-70.5-170T478-720q-26 0-51 6t-49 18l-60-60q38-22 78-33t82-11q134 0 228 93t94 227v7l64-64 56 56-160 160Z" />
        </svg>
      </div>
      <div className=" nodes p-8 ">{data.label}</div>
      <Handle type="source" className="w-4 h-12 rounded-full bg-sky-500 border-none" position={Position.Right} isConnectable={isConnectable} />
      <Handle type="target" className="w-4 h-12 rounded-full bg-black border-none" position={Position.Left} isConnectable={isConnectable} />
    </div>
  )
}

export default VideoNode
