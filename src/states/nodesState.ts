/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil"

export interface NodeData {
  id: string
  type: string
  data: {
    label: any
  }
  position: {
    x: number
    y: number
  }
}

export const nodesState = atom<NodeData[]>({
  key: "nodesState",
  default: [],
})
