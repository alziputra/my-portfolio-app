import axios from "axios";

// Function to upload image to Cloudinary
const cloudinaryUpload = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration is missing!");
  }

  // Validate file extension
  const allowedExtensions = [".png", ".jpg", ".jpeg"];
  const fileExtension = file.name.split(".").pop().toLowerCase();
  if (!allowedExtensions.includes(`.${fileExtension}`)) {
    throw new Error("Invalid file type. Only .png, .jpg, and .jpeg are allowed.");
  }

  // Validate file size (500KB max)
  const maxSize = 500 * 1024; // 500KB in bytes
  if (file.size > maxSize) {
    throw new Error("File size exceeds 500KB. Please upload a smaller image.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    // Upload file to Cloudinary using axios
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);

    console.log("Cloudinary upload response:", response.data); // Debugging
    return response.data.secure_url; // Return the secure URL of the image
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || "Failed to upload image");
  }
};

export default cloudinaryUpload;
