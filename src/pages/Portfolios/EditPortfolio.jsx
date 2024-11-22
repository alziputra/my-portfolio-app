import { useParams } from "react-router-dom";

const EditPortfolioForm = () => {
  const { id } = useParams(); // Mendapatkan id dari URL

  // Lakukan logika untuk mengedit portfolio dengan id ini
  return (
    <div>
      <h2>Edit Portfolio {id}</h2>
      {/* Formulir untuk mengedit */}
    </div>
  );
};

export default EditPortfolioForm;
