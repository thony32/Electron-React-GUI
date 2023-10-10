/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

interface MediaItem {
  type: string;
  url: string;
  width?: number;
  height?: number;
}

const initialNodes = [
  {
    id: "1",
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
    type: "input",
  },
  {
    id: "2",
    data: { label: "World" },
    position: { x: 100, y: 100 },
  },
];

const initialEdges = [{ id: "1-2", source: "1", target: "2", label: "to the", type: "step" }];

const NodeEditor: React.FC = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [media, setMedia] = useState<MediaItem[]>([]);

  const onElementsRemove = (elementsToRemove: any) => {
    setNodes((prevNodes) => prevNodes.filter((node) => !elementsToRemove.find((el: any) => el.id === node.id)));
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const files = event.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.startsWith("image/")) {
        // Handle image file as a new node
        const imageUrl = URL.createObjectURL(file);
        const newNode = {
          id: `image-node-${Date.now()}`,
          data: { label: <img src={imageUrl} alt={`Image`} className="w-48 h-48" /> },
          position: { x: event.clientX - 100, y: event.clientY - 100 },
        };

        setNodes((prevNodes: any) => [...prevNodes, newNode]);
      } else if (file.type.startsWith("video/")) {
        // Handle video file as a new node
        const videoUrl = URL.createObjectURL(file);
        const newNode = {
          id: `video-node-${Date.now()}`,
          data: {
            label: (
              <div className="w-48 h-48">
                <video controls className="w-full h-full">
                  <source src={videoUrl} type={file.type} />
                </video>
              </div>
            ),
          },
          position: { x: event.clientX - 100, y: event.clientY - 100 },
        };

        setNodes((prevNodes: any) => [...prevNodes, newNode]);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Removed the handleResize function as it is not used

  return (
    <div className="h-full col-span-12">
      <ReactFlow
        elements={nodes}
        onElementsRemove={onElementsRemove}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onConnect={() => {}}
        onSelectionChange={() => {}}
        deleteKeyCode={46}
        onLoad={(reactFlowInstance) => reactFlowInstance.fitView()}
        snapToGrid={true}
        snapGrid={[15, 15]}
        defaultZoom={1.5}
      >
        <Background />
        <Controls className="bg-gray-600 rounded-md z-20" />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default NodeEditor;