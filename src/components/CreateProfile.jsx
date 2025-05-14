import {
  Box,
  Button,
  Card,
  FormControl,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import React, { useState } from "react";
import { getImageUrl, uploadImage } from "../utils/supabase";
import Loader from "./Loader";

const CreateProfile = ({
  isOpenProfile,
  setIsOpenProfile,
  connectMetaMask,
  profile,
}) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  const connectWalletHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const account = await connectMetaMask();
      await uploadImage("profileusers", file, username);
      const profileImg = await getImageUrl("profileusers", username);
      console.log("Profile image URL:", profileImg);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsOpenProfile(false);
    }
  };

  const cencelHandler = () => {
    setIsOpenProfile(false);
    setError(null);
    setIsLoading(false);
    setUsername("");
    setDescription("");
    setFile(null);
    setError(null);
  };

  return (
    <div>
      <Modal
        open={!isOpenProfile ? (profile === null ? true : false) : false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="w-max p-10 flex flex-col gap-6" sx={style}>
          <Typography variant="h5" className="mb-10 font-bold underline">
            Create Porfile
          </Typography>
          <form className="flex flex-col gap-5" onSubmit={connectWalletHandler}>
            <TextField
              onChange={(e) => setUsername(e.target.value)}
              id="outlined-text-input"
              label="Username"
              type="text"
              required
              value={username}
            />
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              id="outlined-text-input"
              label="Deskripsi"
              type="text"
              className="w-[250px] md:w-[400px] lg:w-[450px]"
              required
              value={description}
            />
            <TextField
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              fullWidth
              required
              label="File"
              value={file}
              id="outlined-required"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DriveFolderUploadIcon />
                  </InputAdornment>
                ),
              }}
            />

            <div className="button flex justify-around mt-3">
              <Button type="submit" variant="contained" className="w-[190px]">
                {!isLoading ? (
                  <Typography variant="p" className="font-bold">
                    Connect Wallet
                  </Typography>
                ) : (
                  <Loader />
                )}
              </Button>
              <Button color="error" variant="contained" onClick={cencelHandler}>
                <Typography variant="p" className="font-bold">
                  Cancel
                </Typography>
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateProfile;
