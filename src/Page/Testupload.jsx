import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { uploadImage, getImageUrl } from "../utils/supabase"; // Pastikan path ini benar

const Testupload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [staticImageUrl, setStaticImageUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const imageUrl = await uploadImage(selectedFile); // Tunggu hingga upload selesai
      if (imageUrl) {
        setUploadedImageUrl(imageUrl); // Simpan URL yang diunggah
      }
    } else {
      alert("Pilih file terlebih dahulu.");
    }
  };

  const handleCek = async () => {
    const url = getImageUrl("avatar2");
    setStaticImageUrl(url);
    console.log("URL gambar statis:", url);
  };

  return (
    <div>
      <TextField type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Unggah</Button>{" "}
      {/* Tombol untuk mengunggah */}
      <Button onClick={handleCek}>cek</Button>
      {uploadedImageUrl && (
        <img
          src={uploadedImageUrl}
          alt="Uploaded"
          style={{ maxWidth: "300px" }}
        /> // Tampilkan gambar yang diunggah
      )}
      {staticImageUrl && (
        <img src={staticImageUrl} alt="Static" style={{ maxWidth: "300px" }} />
      )}
    </div>
  );
};

export default Testupload;
