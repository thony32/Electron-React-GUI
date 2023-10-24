import { useNodesState } from "reactflow"
import { useRecoilValue } from "recoil"
import { nodesState } from "../states"

const useNodesAndRecoilState = () => {
  const [nodes, setNodes] = useNodesState([])
  const recoilNodes = useRecoilValue(nodesState)

  return {
    nodes: nodes,
    setNodes: setNodes,
    recoilNodes: recoilNodes,
  }
}

export { useNodesAndRecoilState }
