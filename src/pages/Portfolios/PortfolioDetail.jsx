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
              <label className="block font-bold mb-2 text-gray-800">Title</label>
              <input type="text" name="title" value={formData?.title || ""} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2 text-gray-800">Description</label>
              <textarea name="description" value={formData?.description || ""} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="6" />
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Save Changes
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="p-3">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 border-b-2 border-gray-300 inline-block">{formData?.title}</h1>
            <img src={formData?.image} alt={formData?.title} className="w-full h-64 object-cover rounded-lg mb-6" />
            <p className="text-gray-800 leading-relaxed mb-4">{formData?.description}</p>
            <div className="mt-4">
              <h2 className="font-bold text-gray-800 mb-2">Technologies:</h2>
              <div className="flex gap-2 list-disc list-inside text-gray-800">
                {formData?.technologies.map((tech, index) => (
                  <div key={index} className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <a href={formData?.demoLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                View Demo
              </a>
              <a href={formData?.githubLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                View Code
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="border border-gray-300 p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Other Portfolios</h3>
        <ul className="space-y-4">
          {portfolios.map((portfolio) => (
            <li key={portfolio.id} className={`cursor-pointer ${portfolio.id === id ? "text-blue-500 font-semibold" : "text-gray-800 hover:text-blue-500"}`}>
              <button onClick={() => navigate(`/portfolios/${portfolio.id}`)} className="w-full text-left bg-white border border-gray-300 p-4 rounded-lg hover:bg-gray-100">
                <div className="flex items-center space-x-4">
                  <img src={portfolio.image} alt={portfolio.title} className="w-16 h-16 object-cover rounded-lg border border-gray-300" />
                  <div>
                    <h4 className="text-lg font-semibold">{portfolio.title}</h4>
                    <p className="text-sm text-gray-600">{portfolio.description.slice(0, 50)}...</p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PortfolioDetail;
