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

const CreateProfile = ({ isOpen }) => {
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
    <div>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="w-max p-10 flex flex-col gap-6" sx={style}>
          <Typography variant="h5" className="mb-10 font-bold underline">
            Create Porfile
          </Typography>
          <FormControl
            className="flex flex-col gap-5 mt-10"
            onSubmit={() => console.log("submit")}
          >
            <TextField id="outlined-text-input" label="Username" type="text" />
            <TextField
              id="outlined-text-input"
              label="Deskripsi"
              type="text"
              // style={{ width: "clamp(200px, 400px, 800px)" }}
              className="w-[250px] md:w-[400px] lg:w-[450px]"
            />
            <TextField
              type="file"
              id="img-file"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ cursor: "pointer" }}
                    >
                      <DriveFolderUploadIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <div className="button flex justify-around mt-3">
              <Button type="button" variant="contained">
                <Typography variant="p" className="font-bold">
                  Create and Connect
                </Typography>
              </Button>
              <Button color="error" variant="contained">
                <Typography variant="p" className="font-bold">
                  Cencel
                </Typography>
              </Button>
            </div>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateProfile;
