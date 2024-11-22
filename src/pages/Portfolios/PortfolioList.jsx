import { useState } from "react";
import { usePortfolioContext } from "../../context/PortfolioContext";
import { AiOutlinePlus } from "react-icons/ai";
import PortfolioCard from "../../components/PortfolioCard";
import AddPortfolioForm from "./AddPortfolio";
import EditPortfolioForm from "./EditPortfolio";

const PortfolioList = () => {
  const { portfolios } = usePortfolioContext();

  // State untuk mengontrol form Add/Edit
  const [isAdding, setIsAdding] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);

  // State untuk mengelola dropdown aktif pada PortfolioCard
  const [activeCard, setActiveCard] = useState(null);

  // Fungsi untuk mengedit portfolio
  const handleEditPortfolio = (portfolio) => {
    setEditingPortfolio(portfolio);
    setIsAdding(false); // Sembunyikan form Add jika sedang edit
  };

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Portfolios</h1>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => {
            setIsAdding((prev) => !prev);
            setEditingPortfolio(null); // Reset editing state jika sedang menambah
          }}
        >
          <AiOutlinePlus size={20} />
          <span>{isAdding ? "Close Form" : "Add Portfolio"}</span>
        </button>
      </div>

      {/* Form Add Portfolio */}
      {isAdding && <AddPortfolioForm onClose={() => setIsAdding(false)} />}

      {/* Form Edit Portfolio */}
      {editingPortfolio && <EditPortfolioForm portfolio={editingPortfolio} onClose={() => setEditingPortfolio(null)} />}

      {/* Daftar Portfolio */}
      {!isAdding && !editingPortfolio && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          onClick={() => setActiveCard(null)} // Menutup dropdown jika area kosong diklik
        >
          {portfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              id={portfolio.id}
              image={portfolio.image}
              title={portfolio.title}
              description={portfolio.description}
              createdAt={new Date(portfolio.createdAt).toLocaleDateString()}
              onEdit={() => handleEditPortfolio(portfolio)}
              onDelete={(id) => console.log(`Portfolio with ID ${id} deleted`)}
              activeCard={activeCard}
              setActiveCard={setActiveCard}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioList;
