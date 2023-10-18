import React from "react"
import { NodeInfosMenusButton, NodeListMenusButton, ThemeChanger } from ".."

const Toolbar: React.FC = () => {
  return (
    <div className="fixed bottom-5 left-[25%] max-[500px]:hidden xl:left-[30%] 2xl:left-[35%] min-[2560px]:left-[40%] w-[400px] xl:w-[500px] 2xl:w-[600px] bg-base-300 px-4 py-2 rounded-md flex">
      <ThemeChanger />
      <NodeInfosMenusButton />
      <NodeListMenusButton />
    </div>
  )
}

export default Toolbar
