import React from 'react';
import { Routes, Route } from "react-router-dom";
import Room from "./pages/Room";
import Home from "./pages/Home";
import Join from "./pages/Join";

function App() {


  return (
    <div className="App w-screen h-screen">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="room/:roomID" element={<Room/>}/>
            <Route path="join/:roomID" element={<Join/>}/>
        </Routes>
    </div>
  );
}

export default App;
