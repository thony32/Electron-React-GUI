import React from "react";
import EditorFilter from "../../components/Layouts/EditorFilter";
import EditorProps from "../../components/Layouts/EditorProps";
import Toolbar from "../../components/Layouts/Toolbar";

const RefField: React.FC = () => {
  
  return (
    <div className="relative">
      <EditorFilter />
      <EditorProps />
      <Toolbar />
    </div>
  );
};

export default RefField;
