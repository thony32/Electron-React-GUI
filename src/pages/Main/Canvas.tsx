import React from "react";
import { EditorFilter, Toolbar, EditorProps, NodeEditor } from "../../components";

const Canvas: React.FC = () => {
  
  return (
    <div className=" bg-red-200">
      <EditorFilter />
      <EditorProps />
      <Toolbar />
      <NodeEditor/>
    </div>
  );
};

export default Canvas;
