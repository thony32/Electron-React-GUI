import React from "react"
import { Undo, Redo, Text } from "../../assets"
import { Shortcuts } from ".."

const Toolbar: React.FC = () => {
  return (
    <div className="fixed bottom-5  max-[500px]:hidden left-[40%] min-[2560px]:left-[40%] xl:w-64 bg-base-300 px-4 py-2 rounded-md flex gap-4 justify-between">
      <button className="p-2 rounded-md hover:bg-base-200 duration-300 active:scale-95">
        <Undo />
      </button>
      <button className="p-2 rounded-md hover:bg-base-200 duration-300 active:scale-95">
        <Redo />
      </button>
      <button className="p-2 rounded-md hover:bg-base-200 duration-300 active:scale-95">
        <Text />
      </button>
      <Shortcuts />
    </div>
  )
}

export default Toolbar
