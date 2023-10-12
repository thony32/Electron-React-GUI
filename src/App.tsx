import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from "react"
import { Login, Canvas, Registration } from "./pages"

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Canvas />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
