import "./App.css"
import React from "react"
import { FlowChart } from "./page"
import { ReactFlowProvider } from "reactflow"
import { RecoilRoot } from "recoil"
import { CanvasContextProvider, NodesAndEdgesContextProvider, ReactFlowContextProvider } from "./contexts"
import { NodeInfosBar, NodesListBar, ThemeChanger } from "./components"
import { BrowserView, MobileView } from "react-device-detect"

const App: React.FC = () => {
    return (
        <>
            <BrowserView>
                <div className="hurme">
                    <RecoilRoot>
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
                    </RecoilRoot>
                </div>
            </BrowserView>
            <MobileView>
                <div className="flex justify-center items-center h-screen">
                    <h1 className="text-3xl font-bold text-center">This app is not available on mobile devices</h1>
                </div>
            </MobileView>
        </>
    )
}

export default App
