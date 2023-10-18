// src/states/nodesState.ts

import { atom } from "recoil"

export interface NodeData {
  id: string
  type: string
  data: {
    label: React.ReactNode
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
