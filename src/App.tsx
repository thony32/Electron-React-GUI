import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./pages/Authentication/Login";
import Registration from "./pages/Authentication/Registration";
import RefField from "./pages/Main/RefField";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login/>}/> */}
          {/* <Route path="/register" element={<Registration/>}/> */}
          <Route path="/" element={<RefField/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
