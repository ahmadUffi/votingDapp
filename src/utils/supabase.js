import { createClient } from "@supabase/supabase-js";

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

const uploadImage = async (bucket, file, namefile) => {
  try {
    const { data, error } = await supabase.storage
      .from(`${bucket}`)
      .upload(`public/${namefile}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      if (error.statusCode === "409") {
        console.log("File already exists.");
      }
      return { success: false, error: error.message || "Upload error" };
    }

    return { success: true, path: data.path };
  } catch (error) {
    console.log("masuk ke error");
    return { success: false, error: error.message || "unknown error" };
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
