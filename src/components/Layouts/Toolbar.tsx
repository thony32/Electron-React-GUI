import React from "react"
import { Undo, Redo } from "../../assets"
import { InputText, Shortcuts } from ".."

const Toolbar: React.FC<{ addTextNode: (text: string, position?: { x: number, y: number }) => void }> = ({addTextNode}) => {
  return (
    <div className="fixed bottom-5  max-[500px]:hidden left-[40%] min-[2560px]:left-[50%] xl:w-64 bg-base-300 px-4 py-2 rounded-md flex gap-4 justify-between">
      <button className="p-2 rounded-md hover:bg-base-200 duration-300 active:scale-95">
        <Undo />
      </button>
      <button className="p-2 rounded-md hover:bg-base-200 duration-300 active:scale-95">
        <Redo />
      </button>
      <InputText addTextNode={addTextNode} />
      <Shortcuts />
    </div>
  )
}

export default Toolbar
