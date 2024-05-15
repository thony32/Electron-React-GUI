import React from "react"
import { ImageExport, NodePosition, Toolbar } from ".."
import { nanoid } from "nanoid"
import { useNodesAndEdgesState } from "@/hooks"

const NodeInfosBar: React.FC = () => {
    const { setNodes } = useNodesAndEdgesState() as any

    // NOTE: Function to add a new text node
    const addTextNode = (text: string, position = { x: Math.floor(Math.random() * 1001), y: Math.floor(Math.random() * 1001) }) => {
        const newNode = {
            id: `TXT-${nanoid(3)}`,
            type: "TextNode",
            data: {
                label: (
                    <>
                        <p className="nodes font-semibold tracking-wide w-full h-full">{text}</p>
                    </>
                ),
            },
            position,
        }
        setNodes((prevNodes: Node[]) => [...prevNodes, newNode])
    }

    return (
        <div className="fixed top-0 right-0 bottom-0 z-10 bg-base-300 w-60 space-y-4">
            <NodePosition />
            {/* <ImageExport /> */}
            <div className="collapse collapse-arrow bg-base-200 rounded-sm">
                <input type="radio" name="my-accordion-2" id="accordion-1" className="peer" />
                <label htmlFor="accordion-1" className="collapse-title">
                    Tools
                </label>
                <div className="collapse-content peer-checked:block hidden">
                    <Toolbar addTextNode={addTextNode} />
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 rounded-sm">
                <input type="radio" name="my-accordion-2" id="accordion-2" className="peer" />
                <label htmlFor="accordion-2" className="collapse-title">
                    Project
                </label>
                <div className="collapse-content peer-checked:block hidden">
                    <ImageExport />
                </div>
            </div>
        </div>
    )
}

export default NodeInfosBar
