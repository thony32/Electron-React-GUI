import React from "react";
import { EditorFilter, Toolbar, EditorProps, NodeEditor } from "../../components";

const Canvas: React.FC = () => {
  
  return (
    <div className="relative h-screen z-20">
      <EditorFilter />
      <EditorProps />
      <Toolbar />
      <NodeEditor/>
    </div>
  );
};

export default Canvas;
