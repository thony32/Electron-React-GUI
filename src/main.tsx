import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { routeTree } from "./routeTree.gen"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import ThemeProvider from "@/services/theme-provider"
import { ErrorBoundary } from "react-error-boundary"
import { Button } from "@/components/ui/button"
import "./index.css"

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

const ErrorFallback = () => {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen text-red-500" role="alert">
            <h2 className="text-lg font-semibold">Oops, something went wrong :( </h2>
            <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
                Refresh
            </Button>
        </div>
    )
}

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <ThemeProvider storageKey="vite-ui-theme">
                    <RouterProvider router={router} />
                </ThemeProvider>
            </ErrorBoundary>
        </StrictMode>
    )
}
