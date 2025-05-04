import { Box, Card, FormControl, Modal, TextField } from "@mui/material";
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
      className="w-[400px] h-[500px] p-5"
    >
      <Box className="w-max p-10 flex flex-col gap-6" sx={style}>
        <form action="" className="w-[320px] h-[400px] flex flex-col gap-5">
          <FormControl>
            <TextField type="text" required label="Title" fullWidth />
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
};

export default CreatePetisi;
