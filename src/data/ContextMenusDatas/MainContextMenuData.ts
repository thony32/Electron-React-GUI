import { useRFInstance } from "../../hooks";
import { OS } from "../../utils"

// TODO: Create function for each of these datas

const MainContextMenuData = [
  {
    label: "Help",
    key: OS(window) === "MacOS" ? "Cmd + H" : "Ctrl + H",
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
  {
    label: "Add Text",
    key: OS(window) === "MacOS" ? "Cmd + T" : "Ctrl + T",
    action: "",
  },
  {
    label: "Save",
    key: OS(window) === "MacOS" ? "Cmd + S" : "Ctrl + S",
    action: () => {
      const { rfInstance } = useRFInstance();
      if (rfInstance) {
        const flow = rfInstance.toObject();
        localStorage.setItem(flowKey, JSON.stringify(flow));
      }
    },
  },
  {
    label: "Quit",
    key: OS(window) === "MacOS" ? "Cmd + Q" : "Ctrl + Q",
    action: "",
  },
]

export default MainContextMenuData
