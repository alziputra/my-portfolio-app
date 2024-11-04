import PortfolioCard from "../components/PortfolioCard";

const Portfolio = () => {
  const portfolioItems = [
    {
      id: 1,
      image: "https://via.placeholder.com/300",
      date: "October 5, 2023",
      title: "Project 1",
      description: "This is a description of the first project.",
      technologies: ["React", "Node.js", "MySQL"],
      demoLink: "https://example.com/demo1",
      githubLink: "https://github.com/username/project1",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300",
      date: "November 15, 2023",
      title: "Project 2",
      description: "This is a description of the second project.",
      technologies: ["Vue", "Express", "MongoDB"],
      demoLink: "https://example.com/demo2",
      githubLink: "https://github.com/username/project2",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300",
      date: "December 10, 2023",
      title: "Project 3",
      description: "This is a description of the third project.",
      technologies: ["Angular", "Firebase"],
      demoLink: "https://example.com/demo3",
      githubLink: "https://github.com/username/project3",
    },
    // Tambahkan lebih banyak item portofolio sesuai kebutuhan
  ];

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-8 text-center">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item) => (
          <PortfolioCard key={item.id} id={item.id} image={item.image} date={item.date} title={item.title} description={item.description} technologies={item.technologies} demoLink={item.demoLink} githubLink={item.githubLink} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
