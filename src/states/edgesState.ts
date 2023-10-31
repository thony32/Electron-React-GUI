/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil"
import { EdgeMarkerType } from "reactflow"

export interface EdgeData {
  id: string
  type: string
  label: string
  animated: boolean
  labelBgPadding: [number, number]
  labelBgStyle: any
  labelBgBorderRadius: number
  markerEnd: EdgeMarkerType
}

export const edgesState = atom<EdgeData[]>({
  key: "edgesState",
  default: [],
})
