import { ImageList, VideoList, Others } from ".."
import { Node } from "reactflow"

type NodeListMenusButtonProps = {
  nodes: Node[] // Define the prop for nodes
}

const NodeListMenusButton: React.FC<NodeListMenusButtonProps> = ({ nodes }) => {

  return (
    <div className="drawer w-32">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          Node Outline
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-96 min-h-full bg-base-200 text-base-content flex flex-col gap-4">
          {/* Sidebar content here */}
          <li>
            <ImageList nodes={nodes} />
          </li>
          <li>
            <VideoList />
          </li>
          <li>
            <Others />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NodeListMenusButton
