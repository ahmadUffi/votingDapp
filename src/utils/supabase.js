import { createClient } from "@supabase/supabase-js";

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

const uploadImage = async (bucket, file, namefile) => {
  console.log("Uploading image:", file);
  console.log("File type:", file.type);
  console.log("File name:", file.name);

  try {
    const { data, error } = await supabase.storage
      .from(`${bucket}`)
      .upload(`public/${namefile}`, file, {
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

const getImageUrl = (bucket, path) => {
  const { data, error } = supabase.storage
    .from(`${bucket}`)
    .getPublicUrl(`public/${path}`);
  if (error) {
    console.error("Error getting image URL:", error);
  } else {
    return data.publicUrl;
  }
};

export { supabase, uploadImage, getImageUrl };
