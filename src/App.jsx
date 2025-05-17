import { BrowserProvider, Contract } from "ethers";
import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Page/Home";
import MyVote from "./Page/Dahsboard";
import Dashboard from "./Page/Dahsboard";
import Testupload from "./Page/Testupload";
import CreateProposal from "./components/CreatePetisi";
import mainContractABI from "./contract/mainContract.json";
import profileContractABI from "./contract/profileContract.json";

const App = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenPetisi, setIsOpenPetisi] = useState(false);
  const [mainContract, setMainContract] = useState(null);
  const [profileContract, setProfileContract] = useState(null);
  const [shortAddress, setShortAddress] = useState("");
  const [account, setAccount] = useState(null);
  const [profile, setProfile] = useState(null);
  // get
  const { VITE_CONTRACT_PROFILE_ADDRESS, VITE_CONTRACT_MAIN_ADDRESS } =
    import.meta.env;

  // function get profile
  const getProfile = async (contract, account) => {
    try {
      const profile = await contract.getProfile(account);
      if (profile) {
        setProfile(profile);
      }
    } catch (error) {
      if (error.code === "BAD_DATA") {
        console.error("No profile found for this address");
      }
      setProfile("noData");
    }
  };

  async function connectMetaMask() {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    // connect to wallet
    if (typeof window.ethereum === "undefined") {
      throw new Error("MetaMask is not installed");
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // create main contract
      const mainContract = new Contract(
        VITE_CONTRACT_MAIN_ADDRESS,
        mainContractABI,
        signer
      );
      setMainContract(mainContract);

      // crate profile contract
      const profileContract = new Contract(
        VITE_CONTRACT_PROFILE_ADDRESS,
        profileContractABI,
        signer
      );
      setProfileContract(profileContract);
      setAccount(accounts[0]);
      shortAddressHandler(accounts[0]);
      getProfile(profileContract, accounts[0]);
    } catch (error) {
      if (error.code === 4001) {
        throw new Error("User rejected the connection request.");
      } else if (error.message.includes("connect")) {
        throw new Error(
          "Failed to connect to MetaMask. Please ensure MetaMask is unlocked and try again."
        );
      } else {
        throw new Error(
          "An unexpected error occurred while connecting to MetaMask: " +
            error.message
        );
      }
    }
  }
  // short address
  const shortAddressHandler = (address) => {
    if (!address) return "";
    const start = address.slice(0, 5);
    const end = address.slice(-4);
    setShortAddress(`${start}...${end}`);
  };
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
              connectMetaMask={connectMetaMask}
              profile={profile}
              setProfile={setProfile}
              profileContract={profileContract}
              mainContract={mainContract}
              account={account}
              shortAddress={shortAddress}
              shortAddressHandler={shortAddressHandler}
              getProfile={getProfile}
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
