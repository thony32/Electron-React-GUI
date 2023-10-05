import React from "react";
import { EditorFilter, Toolbar, EditorProps } from "../../components";

const Canvas: React.FC = () => {
  
  return (
    <div className="relative">
      <EditorFilter />
      <EditorProps />
      <Toolbar />
    </div>
  );
};

export default Canvas;
