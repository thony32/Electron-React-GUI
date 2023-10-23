import { OS } from "../../utils"

// TODO: Create function for each of these datas

const MainContextMenuData = [
  {
    label: "Help",
    key: OS(window) === "MacOS" ? "Cmd + H" : "Ctrl + H",
    action: "",
  },
  {
    label: "Settings",
    key: OS(window) === "MacOS" ? "Cmd + U" : "Ctrl + U",
    action: "",
  },
  {
    label: "Undo",
    key: OS(window) === "MacOS" ? "Cmd + Z" : "Ctrl + Z",
    action: "",
  },
  {
    label: "Redo",
    key: OS(window) === "MacOS" ? "Cmd + Y" : "Ctrl + Y",
    action: "",
  },
  // {
  //   label: "Copy",
  //   key: OS(window) === "MacOS" ? "Cmd + C" : "Ctrl + C",
  //   action: "",
  // },
  // {
  //   label: "Paste",
  //   key: OS(window) === "MacOS" ? "Cmd + V" : "Ctrl + V",
  //   action: "",
  // },
  {
    label: "Add Text",
    key: OS(window) === "MacOS" ? "Cmd + T" : "Ctrl + T",
    action: "",
  },
  {
    label: "Save",
    key: OS(window) === "MacOS" ? "Cmd + S" : "Ctrl + S",
    action: "",
  },
  {
    label: "Quit",
    key: OS(window) === "MacOS" ? "Cmd + Q" : "Ctrl + Q",
    action: "",
  },
]

export default MainContextMenuData
