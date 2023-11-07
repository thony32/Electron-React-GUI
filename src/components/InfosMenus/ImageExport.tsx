
import React, { useContext, useState } from "react"
import { getRectOfNodes, getTransformForBounds } from "reactflow"
import { toPng } from "html-to-image"
import ReactFlowContext from "../../contexts/ReactFlowContext"
import { ImageIcon } from "../../assets"
import { FileExport } from ".."


const downloadImage = (dataUrl: string) => {
  const a = document.createElement("a")

  a.setAttribute("download", "Untitled.png")
  a.setAttribute("href", dataUrl)
  a.click()
}

const ImageExport: React.FC = () => {
  const { getNodes } = useContext(ReactFlowContext)
  const [imageWidth, setImageWidth] = useState(1920)
  const [imageHeight, setImageHeight] = useState(1080)
  const handleImageExport = () => {
    const nodesBounds = getRectOfNodes(getNodes())
    const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2)

    toPng(document.querySelector<any>(".react-flow__viewport"), {
      backgroundColor: "#1E242A",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth.toString(),
        height: imageHeight.toString(),
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage)
  }
  return (
    <div className="p-2 h-48">
      <div className="text-sm font-bold uppercase px-4">Export</div>
      <div className="divider"></div>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h1 className="text-sm font-bold">Export to Image (Preview)</h1>
          <h1 className="text-xs ">Size of the image</h1>
        </div>
        <div className="flex justify-center gap-4 items-center">
          <input type="text" className="block py-1 px-0 w-1/4 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:ring-0 peer text-current" value={imageWidth} onChange={(e) => setImageWidth(parseInt(e.target.value) || 0)} />
          <span>x</span>
          <input type="text" className="block py-1 px-0 w-1/4 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:ring-0 peer text-current" value={imageHeight} onChange={(e) => setImageHeight(parseInt(e.target.value) || 0)} />
        </div>
        <div>
          <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-primary text-slate-200 text-sm font-bold w-full hover:bg-primary/75 active:scale-95 duration-300" onClick={handleImageExport}>
            <ImageIcon/>
            <span>Export to PNG</span>
          </button>
        </div>
      </div>
      <FileExport />
    </div>
  )
}

export default ImageExport
