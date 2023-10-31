import "./App.css"
import React from "react"
import { Canvas } from "./page"
import { ReactFlowProvider } from "reactflow"
import { RecoilRoot } from "recoil"
import { CanvasContextProvider, NodesAndEdgesContextProvider, ReactFlowContextProvider } from "./contexts"
import { NodeInfosBar, NodesListBar, ThemeChanger } from "./components"

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <ReactFlowProvider>
        <ReactFlowContextProvider>
          <CanvasContextProvider>
            <NodesAndEdgesContextProvider>
              <div>
                <ThemeChanger />
                <NodeInfosBar />
                <Canvas />
                <NodesListBar />
              </div>
            </NodesAndEdgesContextProvider>
          </CanvasContextProvider>
        </ReactFlowContextProvider>
      </ReactFlowProvider>
    </RecoilRoot>
  )
}

export default App
