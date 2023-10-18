import React from "react"
// import DeleteBtn from "../Toolbar/DeleteBtn"
import { ThemeChanger } from ".."


const Toolbar: React.FC = () => {
  return (
    <div className="fixed bottom-5 left-[25%] w-1/2 bg-neutral-content p-4 rounded-full flex z-10">
      <ThemeChanger />
      {/* <DeleteBtn /> */}
    </div>
  )
}

export default Toolbar
