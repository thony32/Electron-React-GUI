/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { Resizable } from "react-resizable";
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges } from "reactflow";
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
  const [edges, setEdges] = useState(initialEdges);
  const [media, setMedia] = useState<MediaItem[]>([]);

  const onNodesChange = useCallback((changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const files = event.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.startsWith("image/")) {
        // Handle image file
        const imageUrl = URL.createObjectURL(file);
        setMedia((prevMedia) => [...prevMedia, { type: "image", url: imageUrl }]);
      } else if (file.type.startsWith("video/")) {
        // Handle video file
        const videoUrl = URL.createObjectURL(file);
        setMedia((prevMedia) => [...prevMedia, { type: "video", url: videoUrl }]);
      }
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleResize = (index: number, width: number, height: number) => {
    const updatedMedia = [...media];
    updatedMedia[index].width = width;
    updatedMedia[index].height = height;
    setMedia(updatedMedia);
  };

  return (
    <div className="h-full col-span-12">
      <ReactFlow onDrop={handleDrop} onDragOver={handleDragOver}>
        <Background />
        <Controls className="bg-gray-600 rounded-md z-20" />
        <div>
          {media.map((item, index) => (
            <Resizable key={index} width={item.width || 200} height={item.height || 200} onResize={(e, { size }) => handleResize(index, size.width, size.height)}>
              <div>
                {item.type === "image" && <img src={item.url} alt={`Image ${index}`} className="w-[50%] h-[50%] z-50" />}
                {item.type === "video" && (
                  <video controls className="w-48 h-48">
                    <source src={item.url} type={item.type} />
                  </video>
                )}
              </div>
            </Resizable>
          ))}
        </div>
      </ReactFlow>
    </div>
  );
};

export default NodeEditor;
