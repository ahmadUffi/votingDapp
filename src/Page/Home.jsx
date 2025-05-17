import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CardVoting from "../components/CardVoting";
import CreateProfile from "../components/CreateProfile";
import CreatePetisi from "../components/CreatePetisi";
import { BrowserProvider, Contract } from "ethers";
import mainContractABI from "../contract/mainContract.json";

const Home = ({
  isOpenProfile,
  setIsOpenProfile,
  isOpenPetisi,
  setIsOpenPetisi,
  connectMetaMask,
  profile,
  setProfile,
  account,
  mainContract,
  profileContract,
  shortAddress,
  getProfile,
}) => {
  console.log(mainContract);
  const [allPetisi, setAllPetisi] = useState([]);
  const { VITE_CONTRACT_MAIN_ADDRESS } = import.meta.env;
  const provider = new BrowserProvider(window.ethereum);
  const mainContractGlobal = new Contract(
    VITE_CONTRACT_MAIN_ADDRESS,
    mainContractABI,
    provider
  );

  const getAllPetisi = async () => {
    if (!mainContractGlobal) {
      console.error("Main contract is not initialized");
      return;
    }
    try {
      const getllPetisi = await mainContractGlobal.gerAllProposal();
      setAllPetisi(getllPetisi);
      console.log(getllPetisi);
    } catch (error) {
      console.error("Error fetching all petitions:", error);
    }
  };
  const createPetisiHandler = async (e) => {
    e.preventDefault();
    if (!account) {
      alert("Please connect your wallet first");
      return;
    }
    setIsOpenPetisi(true);
  };

  useEffect(() => {
    getAllPetisi();
  }, []);

  return (
    <div className="home mt-15 p-12 flex flex-col">
      <nav>
        <Navbar
          setIsOpenProfile={setIsOpenProfile}
          connectMetaMask={connectMetaMask}
          shortAddress={shortAddress}
          profile={profile}
          account={account}
        />
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
            onClick={createPetisiHandler}
          >
            Create Petisi
          </button>
        </div>
      </section>
      <section>
        <div className="card-box flex flex-wrap gap-10 justify-center">
          {allPetisi.length > 0 ? (
            allPetisi.map((item, index) => (
              <CardVoting
                key={index}
                profile={item.imgAuthore}
                username={item.usernameAuthor}
                description={item.description}
                title={item.title}
                signatures={item.votes}
                id={item.id}
                expired={item.deadline}
                created={item.created}
                imgUrl={item.imgUrl}
                mainContract={mainContract}
                account={account}
              />
            ))
          ) : (
            <div className="w-full h-[50vh] flex justify-center items-center">
              <h1 className="text-2xl font-bold text-gray-500">
                No Petitions Found
              </h1>
            </div>
          )}
        </div>
      </section>

      <CreateProfile
        isOpenProfile={isOpenProfile}
        setIsOpenProfile={setIsOpenProfile}
        connectMetaMask={connectMetaMask}
        profile={profile}
        setProfile={setProfile}
        account={account}
        mainContract={mainContract}
        profileContract={profileContract}
        getProfile={getProfile}
      />

      <CreatePetisi
        isOpenPetisi={isOpenPetisi}
        setIsOpenPetisi={setIsOpenPetisi}
        connectMetaMask={connectMetaMask}
        profile={profile}
        setProfile={setProfile}
        account={account}
        mainContract={mainContract}
        profileContract={profileContract}
        getProfile={getProfile}
        getAllPetisi={getAllPetisi}
      />
    </div>
  );
};

export default Home;
