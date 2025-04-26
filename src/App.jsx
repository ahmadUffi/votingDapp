import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Page/Home";
import MyVote from "./Page/Dahsboard";
import Dashboard from "./Page/Dahsboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dahboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
