import { OS } from "../../utils"

const NodeContextMenuData = [
    {
      label: "Duplicate",
      key: OS(window) === "MacOS" ? "Cmd + D" : "Ctrl + D",
      action: "",
    },
    {
      label: "Delete",
      key: OS(window) === "MacOS" ? "Del" : "Del",
      action: "",
    },
  ]
  
  export default NodeContextMenuData