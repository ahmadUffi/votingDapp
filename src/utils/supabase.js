import { createClient } from "@supabase/supabase-js";

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;
console.log(
  "VITE_SUPABASE_URL",
  VITE_SUPABASE_URL,
  "VITE_SUPABASE_ANON_KEY",
  VITE_SUPABASE_ANON_KEY
);

// Create a single supabase client for interacting with your database
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

const createBucket = async () => {
  const { data, error } = await supabase.storage.createBucket("avatars", {
    public: false,
    allowedMimeTypes: ["image/png"],
    fileSizeLimit: 1024 * 1024, // 1 MB, bukan 1024 bytes
  });

  if (error) {
    console.error("Error creating bucket:", error.message);
  } else {
    console.log("Bucket created:", data);
  }
};

const uploadImage = async (file) => {
  console.log("Uploading image:", file);
  console.log("File type:", file.type);
  console.log("File name:", file.name);

  try {
    const { data, error } = await supabase.storage
      .from("imagavote")
      .upload(`public/avatar2`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error.message);
    } else {
      console.log("Upload success:", data);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

const getImageUrl = (path) => {
  const { data, error } = supabase.storage
    .from("imagavote")
    .getPublicUrl(`public/${path}`);
  if (error) {
    console.error("Error getting image URL:", error);
  } else {
    return data.publicUrl;
  }
};

export { supabase, createBucket, uploadImage, getImageUrl };
