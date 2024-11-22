import { useState, useEffect } from "react";
import { usePortfolioContext } from "../../context/PortfolioContext";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const PortfolioForm = ({ onClose, mode = "add", initialData = null }) => {
  const { addPortfolio, updatePortfolio } = usePortfolioContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setTechnologies(initialData.technologies.join(", ") || "");
      setDemoLink(initialData.demoLink || "");
      setGithubLink(initialData.githubLink || "");
      setImage(initialData.image || null);
    }
  }, [mode, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !demoLink || !githubLink || (!image && mode === "add")) {
      toast.error("Please fill out all fields!");
      return;
    }

    const newPortfolio = {
      title,
      description,
      technologies: technologies.split(",").map((tech) => tech.trim()),
      demoLink,
      githubLink,
    };

    try {
      setIsUploading(true);

      if (mode === "add") {
        await addPortfolio(newPortfolio, image);
        toast.success("Portfolio added successfully!");
      } else {
        await updatePortfolio(initialData.id, newPortfolio, image);
        toast.success("Portfolio updated successfully!");
      }

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the portfolio.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-gray-300 rounded-lg shadow-md">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter project title" />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" rows="4" placeholder="Enter project description"></textarea>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Technologies</label>
        <input type="text" value={technologies} onChange={(e) => setTechnologies(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Comma-separated technologies (e.g., React, Node.js)" />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Demo Link</label>
        <input type="url" value={demoLink} onChange={(e) => setDemoLink(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter demo link" />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">GitHub Link</label>
        <input type="url" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter GitHub link" />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full p-2 border border-gray-300 rounded-lg" />
        {image && typeof image === "string" && (
          <div className="mt-2">
            <img src={image} alt="Current project" className="w-full h-32 object-cover rounded-lg" />
          </div>
        )}
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" disabled={isUploading}>
        {isUploading ? "Uploading..." : mode === "add" ? "Add Portfolio" : "Update Portfolio"}
      </button>
    </form>
  );
};

PortfolioForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["add", "edit"]),
  initialData: PropTypes.object,
};

export default PortfolioForm;
