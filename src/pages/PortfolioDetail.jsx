import { useParams } from "react-router-dom";

const PortfolioDetail = () => {
  const { id } = useParams();

  // Fetch data based on ID, or pass down data from props/context if available
  // Contoh data sementara
  const portfolioItem = {
    image: "https://via.placeholder.com/600",
    date: "October 5, 2023",
    title: `Project ${id}`,
    description: "This is a detailed description of the project.",
    technologies: ["React", "Node.js", "MySQL"],
    demoLink: "https://example.com/demo",
    githubLink: "https://github.com/username/project",
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">{portfolioItem.title}</h2>
      <img src={portfolioItem.image} alt={portfolioItem.title} className="w-full h-96 object-cover rounded-md mb-4" />
      <p className="text-sm text-gray-500 mb-2">{portfolioItem.date}</p>
      <p className="text-gray-700 mb-4">{portfolioItem.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {portfolioItem.technologies.map((tech, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between">
        <a href={portfolioItem.demoLink} target="_blank" rel="noopener noreferrer" className="text-sm bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Demo
        </a>
        <a href={portfolioItem.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900">
          GitHub
        </a>
      </div>
    </div>
  );
};

export default PortfolioDetail;
