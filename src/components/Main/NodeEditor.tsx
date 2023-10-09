import React from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

const NodeEditor: React.FC = () => {
  return (
    <div className="h-full col-span-10">
      <ReactFlow>
        <Background />
        <Controls className="bg-gray-600 rounded-md z-20"/>
        <MiniMap className=""/>
      </ReactFlow>
    </div>
  );
};

export default NodeEditor;
