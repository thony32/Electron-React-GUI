/* eslint-disable @typescript-eslint/no-explicit-any */
import { EdgeMarkerType } from "reactflow"
import { atom } from "recoil"

export interface EdgeData {
  id: string
  type: string
  label: string
  position: {
    x: number
    y: number
  }
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
