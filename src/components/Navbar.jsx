import { Button, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router";

const Navbar = ({ setIsOpen, account }) => {
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

      {account ? (
        <div className="profile flex gap-2 justify-center items-center">
          <Typography variant="p" className="text-md" color="blue">
            ssdsf3...rwfe23
          </Typography>
          <div className="photo w-[60px] h-[60px] rounded-full bg-red-50 overflow-hidden">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="bg-center bg-cover rounded-full"
            />
          </div>
        </div>
      ) : (
        <div className="wallet">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsOpen(true)}
          >
            Connet Wallet
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
