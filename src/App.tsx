import "./App.css"
import React from "react"
import { Canvas } from "./pages"
import { ReactFlowProvider } from "reactflow"
import { RecoilRoot } from "recoil"
import { FunctionProvider } from "./contexts/CanvasContext"
import { ReactFlowContextProvider } from "./contexts/ReactFlowContext"
import { NodeInfosBar, NodesListBar, ThemeChanger } from "./components"

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <ReactFlowProvider>
        <ReactFlowContextProvider>
          <FunctionProvider>
            <div>
              <ThemeChanger />
              <NodeInfosBar />
              <Canvas />
              <NodesListBar />
            </div>
          </FunctionProvider>
        </ReactFlowContextProvider>
      </ReactFlowProvider>
    </RecoilRoot>
  )
}

export default App
