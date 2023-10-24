import "./App.css"
import React from "react"
import { Canvas } from "./pages"
import { ReactFlowProvider } from "reactflow"
import { RecoilRoot } from "recoil"
import { FunctionProvider } from "./contexts/canvasContext"

const App: React.FC = () => {
  return (
    <ReactFlowProvider>
      <FunctionProvider>
        <RecoilRoot>
          <Canvas />
        </RecoilRoot>
      </FunctionProvider>
    </ReactFlowProvider>
  )
}

export default App
