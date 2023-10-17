import "./App.css"
import React from "react"
import { Canvas } from "./pages"
import { ContextMenu, Toolbar } from "./components"

const App: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-12 h-screen z-20">
        {/* <EditorFilter /> */}
        <Canvas />
        {/* <EditorProps /> */}
      </div>
      <ContextMenu />
      <Toolbar />
    </>
  )
}

export default App
