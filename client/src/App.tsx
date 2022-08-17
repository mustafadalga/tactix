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
                <Route path="/room/">
                    <Route path=":roomID" element={<Room/>}/>
                    <Route path="" element={<Room/>}/>
                </Route>
                <Route path="/join/">
                    <Route path=":roomID" element={<Join/>}/>
                    <Route path="" element={<Join/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
