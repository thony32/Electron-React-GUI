import "./App.css"
import React from "react"
import { Canvas } from "./pages"
import { ReactFlowProvider } from "reactflow"
import { RecoilRoot } from "recoil"

const App: React.FC = () => {
  return (
    <ReactFlowProvider>
      <RecoilRoot>
        <Canvas />
      </RecoilRoot>
    </ReactFlowProvider>
  )
}

export default App
