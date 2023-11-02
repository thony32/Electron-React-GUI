/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edge } from "reactflow"
import { atom } from "recoil"

export const edgesState = atom<Edge[]>({
  key: "edgesState",
  default: [],
})
