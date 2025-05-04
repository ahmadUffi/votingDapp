import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Page/Home";
import MyVote from "./Page/Dahsboard";
import Dashboard from "./Page/Dahsboard";
import Testupload from "./Page/Testupload";
import CreateProposal from "./components/CreatePetisi";

const App = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenPetisi, setIsOpenPetisi] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isOpenProfile={isOpenProfile}
              setIsOpenProfile={setIsOpenProfile}
              isOpenPetisi={isOpenPetisi}
              setIsOpenPetisi={setIsOpenPetisi}
            />
          }
        />
        <Route
          path="/dahboard"
          element={
            <Dashboard
              sOpen={isOpenProfile}
              setIsOpenProfile={setIsOpenProfile}
            />
          }
        />
        <Route path="/test" element={<CreateProposal />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
