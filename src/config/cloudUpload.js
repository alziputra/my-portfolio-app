import axios from "axios";

const cloudinaryUpload = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration is missing!");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
    console.log("Cloudinary upload response:", response.data); // Debugging
    return response.data.secure_url; // URL gambar
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || "Failed to upload image");
  }
};

export default cloudinaryUpload;
