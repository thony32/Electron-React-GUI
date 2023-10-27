/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react"
import ReactFlowContext from "../../../contexts/ReactFlowContext"
import { getRectOfNodes, getTransformForBounds } from "reactflow"
import { toPng } from "html-to-image"

const downloadImage = (dataUrl: string) => {
  const a = document.createElement("a")

  a.setAttribute("download", "Untitled.png")
  a.setAttribute("href", dataUrl)
  a.click()
}

const imageWidth = 1920
const imageHeight = 1080

const ImageExport: React.FC = () => {
  const { getNodes } = useContext(ReactFlowContext)
  const handleImageExport = () => {
    const nodesBounds = getRectOfNodes(getNodes())
    const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2)

    toPng(document.querySelector<any>(".react-flow__viewport"), {
      backgroundColor: "hsl(var(--b1))",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    } as any).then(downloadImage)
  }
  return (
    <div className="p-2 h-48">
      <div className="text-sm font-bold uppercase">Export</div>
      <div className="divider"></div>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h1 className="text-sm font-bold">Export to Image</h1>
          <h1 className="text-xs ">Size of the image</h1>
        </div>
        <div className="flex justify-center gap-4 items-center">
          <input type="text" className="block py-2.5 px-0 w-1/4 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:ring-0 peer text-current" value={imageWidth} />
          <span> x </span>
          <input type="text" className="block py-2.5 px-0 w-1/4 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:ring-0 peer text-current" value={imageHeight} />
        </div>
        <div>
          <button className="px-3 py-2 rounded-md bg-primary text-base-content text-sm font-bold w-full hover:bg-primary/75 active:scale-95 duration-300" onClick={handleImageExport}>
            Export to PNG
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageExport
