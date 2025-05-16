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
import Loader from "./Loader";
import { getImageUrl, uploadImage } from "../utils/supabase";

const CreatePetisi = ({ isOpenPetisi, setIsOpenPetisi, mainContract }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expired, setExpired] = useState("");
  const [file, setFile] = useState("");

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

  const handleCratePetisi = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      setIsLoading(true);

      const selecetDate = new Date(expired);
      const expredDate = Math.floor(selecetDate.getTime() / 1000);

      const upload = await uploadImage("petisi", file, title);
      if (!upload.success) {
        console.error(upload.success);
        alert("File upload failed");
        return;
      }
      const urlImg = getImageUrl("petisi", title);
      await mainContract.createProposal(title, description, urlImg, expredDate);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsOpenPetisi(false);
      setTitle("");
      setDescription("");
      setExpired("");
      setFile("");
      setError(null);
    }
  };

  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={isOpenPetisi}
    >
      <Box className="w-max p-10 flex flex-col gap-6" sx={style}>
        <Typography variant="h6">Create Petisi</Typography>
        <form
          action=""
          className="w-[320px] h-[400px] flex flex-col gap-5"
          onSubmit={handleCratePetisi}
        >
          <FormControl className="flex flex-col gap-5">
            <TextField
              type="text"
              // required
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              type="text"
              // required
              label="Description"
              fullWidth
              multiline
              value={description}
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              type="datetime-local"
              fullWidth
              required
              value={expired}
              label="expired"
              id="outlined-required"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              onChange={(e) => setExpired(e.target.value)}
            />
            <TextField
              type="file"
              fullWidth
              // required
              value={file}
              label="File"
              id="outlined-required"
              onChange={(e) => setFile(e.target.files[0])}
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
          </FormControl>

          <div className="button flex justify-around mt-3">
            <Button type="submit" variant="contained" className="w-[100 px]">
              {!isLoading ? (
                <Typography variant="p" className="font-bold">
                  Create
                </Typography>
              ) : (
                <Loader />
              )}
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => setIsOpenPetisi(false)}
            >
              <Typography variant="p" className="font-bold">
                Cancel
              </Typography>
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CreatePetisi;
