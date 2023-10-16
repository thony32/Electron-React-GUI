import "./App.css"
import React from "react"
import { Canvas } from "./pages"
import { RightClick, Toolbar } from "./components"

const App: React.FC = () => {
  return (
    <>
      
      <div className="grid grid-cols-12 h-screen z-20">
        {/* <EditorFilter /> */}
        <Canvas />
        {/* <EditorProps /> */}
        {/* <RightClick /> */}
      </div>
      <Toolbar />
    </>
  )
}

export default App
