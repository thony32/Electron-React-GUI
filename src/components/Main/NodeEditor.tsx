import React, { useState } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import "../../App.css";

interface FlowProps {
  nodes: any;
  onElementsRemove: any;
  onConnect: any;
  onSelectionChange: any;
  deleteKeyCode: any;
  onLoad: any;
  snapToGrid: any;
  snapGrid: any;
  defaultZoom: any;
};

// Define the initial nodes for the React Flow component
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

// Define the NodeEditor component
const NodeEditor: React.FC<FlowProps> = () => {
  // State to store nodes and media items
  const [nodes, setNodes] = useState(initialNodes);

  //* Function to handle removal of elements in React Flow
  const onElementsRemove = (elementsToRemove: any) => {
    // Remove nodes that match the elements to remove
    setNodes((prevNodes) => prevNodes.filter((node) => !elementsToRemove.find((el: any) => el.id === node.id)));
  };

  //* Function to handle drop of media files into React Flow
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

        // Add the new image node to the nodes state
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

        // Add the new video node to the nodes state
        setNodes((prevNodes: any) => [...prevNodes, newNode]);
      }
    }
  };

  // Function to handle drag-over event
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="h-full col-span-12">
      <div
        className="h-full border-dashed flex flex-col justify-center items-center bg-red-200"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
      {/* React Flow component */}
      <ReactFlow nodes={nodes} onElementsRemove={onElementsRemove} onConnect={() => {}} onSelectionChange={() => {}} deleteKeyCode={46 as any} onLoad={(reactFlowInstance) => reactFlowInstance.fitView()} snapToGrid={true} snapGrid={[15, 15]} defaultZoom={1.5}>
        {/* Flow background */}
        <Background />

        {/* Controls for the Flow */}
        <Controls className="bg-gray-600 rounded-md z-20" />

        {/* MiniMap for navigation */}
        <MiniMap />
      </ReactFlow>
      </div>
    </div>
  );
};

export default NodeEditor;
