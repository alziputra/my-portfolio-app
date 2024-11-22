//src/pages/Portfolios/PortfolioList.jsx
import { useState } from "react";
import { usePortfolioContext } from "../../context/PortfolioContext";
import { AiOutlinePlus } from "react-icons/ai";
import PortfolioCard from "../../components/PortfolioCard";
import PortfolioForm from "./PortfolioForm";

const PortfolioList = () => {
  const { portfolios } = usePortfolioContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [editingPortfolio, setEditingPortfolio] = useState(null);

  const handleAddPortfolio = () => {
    setFormMode("add");
    setEditingPortfolio(null);
    setIsFormOpen(true);
  };

  const handleEditPortfolio = (portfolio) => {
    setFormMode("edit");
    setEditingPortfolio(portfolio);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Portfolios</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" onClick={handleAddPortfolio}>
          <AiOutlinePlus size={20} />
          <span>Add Portfolio</span>
        </button>
      </div>

      {isFormOpen && <PortfolioForm onClose={() => setIsFormOpen(false)} mode={formMode} initialData={editingPortfolio} />}

      {!isFormOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              image={portfolio.image}
              title={portfolio.title}
              description={portfolio.description}
              technologies={portfolio.technologies}
              demoLink={portfolio.demoLink}
              githubLink={portfolio.githubLink}
              createdAt={portfolio.createdAt}
              onEdit={() => handleEditPortfolio(portfolio)}
              onDelete={(id) => console.log(`Portfolio with ID ${id} deleted`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioList;
