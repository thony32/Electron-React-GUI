import "./App.css"
import React from "react"
import { FlowChart } from "./page"
import { ReactFlowProvider } from "reactflow"
import { RecoilRoot } from "recoil"
import { CanvasContextProvider, LoadedContextProvider, NodesAndEdgesContextProvider, ReactFlowContextProvider } from "./contexts"
import { NodeInfosBar, NodesListBar, ThemeChanger } from "./components"

const App: React.FC = () => {
  return (
    <div className="hurme">
      <RecoilRoot>
        <LoadedContextProvider>
          <ReactFlowProvider>
            <NodesAndEdgesContextProvider>
              <ReactFlowContextProvider>
                <CanvasContextProvider>
                  <div>
                    <ThemeChanger />
                    <NodeInfosBar />
                    <FlowChart />
                    <NodesListBar />
                  </div>
                </CanvasContextProvider>
              </ReactFlowContextProvider>
            </NodesAndEdgesContextProvider>
          </ReactFlowProvider>
        </LoadedContextProvider>
      </RecoilRoot>
    </div>
  )
}

export default App
