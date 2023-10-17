import "./App.css"
import React, { useEffect, useState } from "react"
import { Canvas } from "./pages"
import { ContextMenu, Toolbar } from "./components"

const App: React.FC = () => {
  const [show, setShow] = useState(false)
  const [points, setPoints] = useState({ x: 0, y: 0 })

  useEffect(() => {
    window.addEventListener("click", () => {
      setShow(false)
    })
    return () =>
      window.removeEventListener("click", () => {
        setShow(false)
      })
  }, [])
  
  // TODO: Handle Context Menu event listener
  const showContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    setShow(true)
    console.log(event.clientX, event.clientY)
    setPoints({ x: event.clientX, y: event.clientY }) 
  }


  return (
    <>
      <div className="grid grid-cols-12 h-screen z-20" onContextMenu={showContextMenu}>
        {/* <EditorFilter /> */}
        <Canvas />
        {/* <EditorProps /> */}
        {show && <ContextMenu top={points.y} left={points.x}/>}
      </div>
      <Toolbar />
    </>
  )
}

export default App
