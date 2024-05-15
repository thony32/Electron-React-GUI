import { atom } from "recoil"

export const selectedNodeIdState = atom<string | null>({
    key: "selectedNodeIdState",
    default: null,
})
