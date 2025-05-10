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

import React from "react";

const CreatePetisi = ({ isOpenPetisi }) => {
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

  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={isOpenPetisi}
    >
      <Box className="w-max p-10 flex flex-col gap-6" sx={style}>
        <form action="" className="w-[320px] h-[400px] flex flex-col gap-5">
          <FormControl className="flex flex-col gap-5">
            <TextField type="text" required label="Title" fullWidth />
            <TextField
              type="text"
              required
              label="Description"
              fullWidth
              multiline
              rows={4}
            />
            <TextField
              type="date"
              fullWidth
              required
              label="expired"
              id="outlined-required"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
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
          </FormControl>

          <div className="button flex justify-around mt-3">
            <Button type="submit" variant="contained">
              <Typography variant="p" className="font-bold">
                Connect Wallet
              </Typography>
            </Button>
            <Button color="error" variant="contained" onClick="">
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
