import { CSSProperties } from "react"

const handleStyleLeft: CSSProperties = {
  width: "50px",
  height: "20%",
  border: "none",
  borderRadius: "999px",
  backgroundColor: "black",
}

const handleStyleRight: CSSProperties = {
  width: "50px",
  height: "20%",
  border: "none",
  borderRadius: "999px",
  backgroundColor: "oklch(var(--in))",
}

export { handleStyleLeft, handleStyleRight }
