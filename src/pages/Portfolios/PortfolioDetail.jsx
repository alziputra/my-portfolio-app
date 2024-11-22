//src/pages/Portfolios/PortfolioDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";

const PortfolioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { portfolios, updatePortfolio, loading, error } = useContext(PortfolioContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const portfolioContent = portfolios.find((portfolio) => portfolio.id === id) || {};
    setFormData(portfolioContent);
  }, [portfolios, id]);

  if (loading) return <div className="container mx-auto p-8">Loading...</div>;
  if (error) return <div className="container mx-auto p-8">Error: {error}</div>;
  if (!formData) return <div className="container mx-auto p-8">Portfolio not found.</div>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updatePortfolio(id, formData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData?.title || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData?.description || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="6"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="ml-4 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">{formData?.title}</h1>
            <img src={formData?.image} alt={formData?.title} className="w-full h-64 object-cover rounded-lg mb-6" />
            <p className="text-gray-800 leading-relaxed">{formData?.description}</p>
            <div className="mt-4">
              <h2 className="font-bold mb-2">Technologies:</h2>
              <ul className="list-disc list-inside text-gray-700">
                {formData?.technologies.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex space-x-4">
              <a
                href={formData?.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View Demo
              </a>
              <a
                href={formData?.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                View Code
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioDetail;

