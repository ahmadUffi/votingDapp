import Navbar from "../components/Navbar";
import { InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CardVoting from "../components/CardVoting";
import CreateProfile from "../components/CreateProfile";

const Dashboard = ({ setIsOpen, isOpen, account }) => {
  return (
    <div>
      <nav>
        <Navbar setIsOpen={setIsOpen} />
      </nav>
      <div className="">
        <CreateProfile isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      {!account ? (
        <div className="inform flex justify-center items-center h-[100dvh]">
          <Typography
            variant="p"
            className="text-3xl md:text-6xl opacity-40 font-bold"
          >
            Create and Connect Wallet First
          </Typography>
        </div>
      ) : (
        <div>
          <div className="home mt-15 p-12 flex flex-col">
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
            <CreateProfile isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
