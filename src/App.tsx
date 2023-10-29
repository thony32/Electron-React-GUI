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
    <ReactFlowProvider>
      <ReactFlowContextProvider>
        <FunctionProvider>
          <RecoilRoot>
            <div>
              <ThemeChanger/>
              <NodeInfosBar />
              <Canvas />
              <NodesListBar/>
            </div>
          </RecoilRoot>
        </FunctionProvider>
      </ReactFlowContextProvider>
    </ReactFlowProvider>
  )
}

export default App
