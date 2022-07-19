import React from 'react';
import { Routes, Route } from "react-router-dom";
import Room from "./pages/Room";
import Home from "./pages/Home";



function App() {
  return (
      <div className="App w-screen h-screen">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="room" element={<Room />} />
        </Routes>
      </div>
  );
}

export default App;
