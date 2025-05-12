import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CardVoting from "../components/CardVoting";
import CreateProfile from "../components/CreateProfile";
import CreatePetisi from "../components/CreatePetisi";

const Home = ({
  isOpenProfile,
  setIsOpenProfile,
  isOpenPetisi,
  setIsOpenPetisi,
  connectMetaMask,
}) => {
  return (
    <div className="home mt-15 p-12 flex flex-col">
      <nav>
        <Navbar setIsOpenProfile={setIsOpenProfile} />
      </nav>
      <section className="flex items-center justify-around ">
        <div
          className="search md:w-[60%] lg:w-[40vw] p-3"
          style={{ margin: "95px auto" }}
        >
          <TextField
            id="fullwidth"
            fullWidth
            label="Search a proposal"
            color="black"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ cursor: "pointer" }}
                    className=""
                  >
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>

        <div className="create">
          <button
            className="bg-blue-500 text-white p-3 rounded-sm cursor-pointer"
            onClick={() => setIsOpenPetisi(true)}
          >
            Create Proposal
          </button>
        </div>
      </section>
      <section>
        <div className="card-box flex flex-wrap gap-10 justify-center">
          <CardVoting />
          <CardVoting />
          <CardVoting />
          <CardVoting />
          <CardVoting />
          <CardVoting />
          <CardVoting />
          <CardVoting />
        </div>
      </section>
      <CreateProfile
        isOpenProfile={isOpenProfile}
        setIsOpenProfile={setIsOpenProfile}
        connectMetaMask={connectMetaMask}
      />
      <CreatePetisi
        isOpenPetisi={isOpenPetisi}
        setIsOpenPetisi={setIsOpenPetisi}
        connectMetaMask={connectMetaMask}
      />
    </div>
  );
};

export default Home;
