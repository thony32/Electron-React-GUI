import React from "react"
import ResetZoomBtn from "../Toolbar/ResetZoomBtn"
import ZoomInBtn from "../Toolbar/ZoomInBtn"
import ZoomOutBtn from "../Toolbar/ZoomOutBtn"
import LayerUpBtn from "../Toolbar/LayerUpBtn"
import LayerDownBtn from "../Toolbar/LayerDownBtn"
import { ThemeChanger } from ".."

const Toolbar: React.FC = () => {
  return (
    <div className="fixed bottom-5 left-[25%] w-1/2 bg-neutral-content p-4 rounded-full flex justify-between z-10">
      <ThemeChanger />
      <ResetZoomBtn />
      <ZoomInBtn />
      <ZoomOutBtn />
      <LayerUpBtn />
      <LayerDownBtn />
    </div>
  )
}

export default Toolbar
