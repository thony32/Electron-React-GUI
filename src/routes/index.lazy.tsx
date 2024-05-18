import ThemeChanger from "@/components/theme-changer"
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
})
