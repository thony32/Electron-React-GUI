import "./App.css"
import React from "react"
import { Canvas } from "./pages"
import { ReactFlowProvider } from "reactflow"
import { RecoilRoot } from "recoil"
import { FunctionProvider } from "./contexts/canvasContext"
import { ReactFlowContextProvider } from "./contexts/ReactFlowContext"

const App: React.FC = () => {
  return (
    <ReactFlowProvider>
      <ReactFlowContextProvider>
        <FunctionProvider>
          <RecoilRoot>
            <Canvas />
          </RecoilRoot>
        </FunctionProvider>
      </ReactFlowContextProvider>
    </ReactFlowProvider>
  )
}

export default App
