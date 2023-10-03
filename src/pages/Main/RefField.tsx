import React, { useState } from "react";
import EditorFilter from "../../components/Layouts/EditorFilter";
import EditorProps from "../../components/Layouts/EditorProps";
import Toolbar from "../../components/Layouts/Toolbar";

const RefField: React.FC = () => {
  const [rows, setRows] = useState([...Array(20).keys()]);
  const [columns, setColumns] = useState([...Array(20).keys()]);

  // Function to load more content when reaching the end
  const loadMore = () => {
    // Simulate loading more rows and columns
    setRows((prevRows) => [...prevRows, ...Array(10).keys()]);
    setColumns((prevCols) => [...prevCols, ...Array(10).keys()]);
  };
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    // Check if we are at the bottom of the container
    if (scrollTop + clientHeight >= scrollHeight) {
      loadMore();
    }

    // Check if we are at the right edge of the container
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    if (scrollLeft + clientWidth >= scrollWidth) {
      // Load more columns (horizontally)
    }
  };
  return (
    <div className="relative">
      <EditorFilter />
      <EditorProps />
      <Toolbar />
      <div className="w-[9999999px] h-[9999999px] overflow-auto">
        <div className="" onScroll={handleScroll}>
          <table>
            <tbody>
              {rows.map((row) => (
                <tr key={row}>
                  {columns.map((col) => (
                    <td key={col}>
                      {row + 1}, {col + 1}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RefField;
