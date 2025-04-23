import { Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-gray-200 text-white w-full z-10">
      <div className="navigation flex">
        <NavLink to={"/"} className="nav-link ">
          <Button variant="text" className="font-bold">
            Home
          </Button>
        </NavLink>
        <NavLink to={"/dahboard"} className="nav-link">
          <Button variant="text" className="font-bold">
            Dashboard
          </Button>
        </NavLink>
      </div>

      <div className="wallet">
        <Button variant="contained" color="primary">
          Connet Wallet
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
