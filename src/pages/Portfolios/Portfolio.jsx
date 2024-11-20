import PortfolioCard from "../../components/PortfolioCard";
import portfolioItems from "../../data/portfolioItems";

const Portfolio = () => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-8 text-center">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item) => (
          <PortfolioCard key={item.id} id={item.id} image={item.image} createdAt={item.createdAt} title={item.title} description={item.description} technologies={item.technologies} demoLink={item.demoLink} githubLink={item.githubLink} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
