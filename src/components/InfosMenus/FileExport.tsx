import React from "react"
import { Download } from "../../assets"

const FileExport: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <h1 className="text-sm font-bold">Export your project</h1>
      </div>
      <div>
        <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-primary text-slate-200 text-sm font-bold w-full hover:bg-primary/75 active:scale-95 duration-300">
          <Download/>
          <span>Export as .ref</span>
        </button>
      </div>
    </div>
  )
}

export default FileExport
