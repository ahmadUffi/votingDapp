import React from "react";
import Navbar from "../components/Navbar";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  return (
    <div className="home mt-15">
      <nav>
        <Navbar />
      </nav>
      <section className="">
        <div className="search w-[40vw] p-3" style={{ margin: "95px auto" }}>
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
    </div>
  );
};

export default Home;
