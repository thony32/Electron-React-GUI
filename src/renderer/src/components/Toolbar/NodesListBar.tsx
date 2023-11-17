import { NodesList } from ".."

const NodesListBar: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 bottom-0 z-10 bg-base-300 w-60">
            <NodesList />
        </div>
    )
}

export default NodesListBar
