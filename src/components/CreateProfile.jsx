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
  setProfile,
  profileContract,
  getProfile,
  account,
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

  const createProfileHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const upload = await uploadImage("profileusers", file, username);
      console.log(upload);
      if (!upload.success) {
        console.error(upload.success);
        alert("Username already exists");
        return;
      }
      const urlImg = getImageUrl("profileusers", username);
      console.log(urlImg);
      await profileContract.setProfile(username, description, urlImg);
      getProfile(profileContract, account);
    } catch (err) {
      console.error(err);
      setError("Failed to create profile");
      alert("Failed to create profile");
    } finally {
      setIsLoading(false);
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
    setProfile(null);
  };

  return (
    <div>
      <Modal
        open={!isOpenProfile ? (profile == "noData" ? true : false) : false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="w-max p-10 flex flex-col gap-6" sx={style}>
          <Typography variant="h5" className="mb-10 font-bold underline">
            Create Porfile
          </Typography>
          <form className="flex flex-col gap-5" onSubmit={createProfileHandler}>
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
                    Create Profile
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
