import React from "react"
import { EditorFilter, Toolbar, EditorProps, NodeEditor, ThemeChanger } from "../../components"

const Canvas: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-12 h-screen z-20">
        {/* <EditorFilter /> */}
        <NodeEditor />
        {/* <EditorProps /> */}
      </div>
      <Toolbar />
    </>
  )
}

export default Canvas
