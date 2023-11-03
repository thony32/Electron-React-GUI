import { useEffect, useRef, useState } from "react"
import { Handle, NodeProps, NodeResizer, Position, useUpdateNodeInternals } from "reactflow"
import { drag } from "d3-drag"
import { select } from "d3-selection"
import styles from "./style.module.css"
import { useNodesAndEdgesState } from "../hooks"

const ResizableNodeSelected = ({ id, data, selected, isConnectable }: NodeProps) => {
  const [rotation, setRotation] = useState(0)
  const [rotatable, setRotatable] = useState(true)
  const updateNodeInternals = useUpdateNodeInternals()
  const rotateControlRef = useRef<any>(null)
  const { nodes } = useNodesAndEdgesState()
  const lineStyle: React.CSSProperties = {
    maxWidth: "100%",
    maxHeight: "100%",
  }

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

  return (
    <div
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <NodeResizer nodeId={nodes.id} color="hsl(var(--ac))" lineStyle={lineStyle} isVisible={selected} keepAspectRatio={true} />
      <div
        ref={rotateControlRef}
        style={{
          display: rotatable ? "block" : "none",
        }}
        className={`nodrag ${styles.rotateHandle}`}
      />
      <div className="p-2 nodes">{data.label}</div>
      <Handle type="source" className="w-3 h-8 rounded-full bg-sky-500 border-none" position={Position.Right} isConnectable={isConnectable} />
      <Handle type="target" className="w-3 h-8 rounded-full bg-black border-none" position={Position.Left} isConnectable={isConnectable} />
    </div>
  )
}

export default ResizableNodeSelected
