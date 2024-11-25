import axios from "axios";

// Fungsi untuk upload gambar ke Cloudinary dengan folder
const cloudinaryUpload = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration is missing!");
  }

  const allowedExtensions = [".png", ".jpg", ".jpeg"];
  const fileExtension = file.name.split(".").pop().toLowerCase();
  if (!allowedExtensions.includes(`.${fileExtension}`)) {
    throw new Error("Invalid file type. Only .png, .jpg, and .jpeg are allowed.");
  }

  const maxSize = 500 * 1024; // 500KB
  if (file.size > maxSize) {
    throw new Error("File size exceeds 500KB. Please upload a smaller image.");
  }

  console.log("Cloudinary config:", { cloudName, uploadPreset });
  console.log("File details:", { name: file.name, size: file.size });

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "my-web-img");

  const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  console.log("Cloudinary API URL:", apiUrl);

  try {
    const response = await axios.post(apiUrl, formData);
    console.log("Cloudinary upload response:", response.data);
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || "Failed to upload image");
  }
};

export default cloudinaryUpload;
