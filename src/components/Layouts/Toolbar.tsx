import React from "react";


const Toolbar: React.FC = () => {
  
  return (
    <div className="fixed bottom-5 left-[25%] w-1/2 bg-gray-800 p-4 rounded-full">
      <button className="btn btn-primary btn-sm">
        Select all
      </button>
      <button className="btn btn-primary btn-sm">
        Reset Zoom
      </button>
      <button className="btn btn-primary btn-sm">
        Zoom In
      </button>
      <button className="btn btn-primary btn-sm">
        Zoom Out
      </button>
      <button className="btn btn-primary btn-sm">
        Layer up
      </button>
      <button className="btn btn-primary btn-sm">
        Layer Down
      </button>
    </div>
  );
};

export default Toolbar;
