import "./App.css"
import React from "react"
import { Canvas } from "./pages"
import { Toolbar } from "./components"

const App: React.FC = () => {
  return (
    <>
      <Canvas />
      <Toolbar />
    </>
  )
}

export default App
