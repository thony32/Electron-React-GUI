import React from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

const NodeEditor: React.FC = () => {
  return (
    <div className="bg-red-200 h-full">
      <ReactFlow>
        <Background />
        <Controls className="absolute bottom-0 left-[20%]"/>
      </ReactFlow>
    </div>
  );
};

export default NodeEditor;
