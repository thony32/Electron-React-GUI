import { createRootRoute, Outlet } from "@tanstack/react-router"
import { useMediaQuery } from "react-responsive"

const App = () => {
    const isSmallWindowSize = useMediaQuery({ maxWidth: 1279 })
    return <>{isSmallWindowSize ? <div className="w-screen h-screen grid place-items-center text-red-500">Oops! Please enlarge your screen</div> : <Outlet />}</>
}

export default App

export const Route = createRootRoute({
    component: App,
})
