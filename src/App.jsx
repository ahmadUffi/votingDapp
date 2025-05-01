import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Page/Home";
import MyVote from "./Page/Dahsboard";
import Dashboard from "./Page/Dahsboard";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route
          path="/dahboard"
          element={<Dashboard sOpen={isOpen} setIsOpen={setIsOpen} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
