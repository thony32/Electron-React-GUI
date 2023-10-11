import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { Login, Canvas, Registration } from "./pages";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/register" element={<Registration/>}/>
          <Route path="/" element={<Canvas/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
