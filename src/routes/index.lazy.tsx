import ThemeChanger from "@/components/theme-changer"
import Loader from "@/components/ui/loader"
import { createLazyFileRoute } from "@tanstack/react-router"

const Main = () => {
    return (
        <main>
            <div>Main Home</div>
            <ThemeChanger />
        </main>
    )
}

export default Main

export const Route = createLazyFileRoute("/")({
    component: Main,
    pendingComponent: Loader,
})
