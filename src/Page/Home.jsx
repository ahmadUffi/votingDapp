import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CardVoting from "../components/CardVoting";
import CreateProfile from "../components/CreateProfile";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="home mt-15 p-12 flex flex-col">
      <nav>
        <Navbar setIsOpen={setIsOpen} />
      </nav>
      <section className="">
        <div
          className="search w-[90%] md:w-[60%] lg:w-[40vw] p-3"
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
      </section>
      <section>
        <div className="card-box flex flex-wrap gap-10 justify-center">
          <CardVoting />
          <CardVoting />
          <CardVoting />
          {/* <CardVoting />
          <CardVoting />
          <CardVoting />
          <CardVoting /> */}
        </div>
      </section>
      <CreateProfile isOpen={isOpen} />
    </div>
  );
};

export default Home;
