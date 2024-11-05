import Card from "../components/Card";
import profileItem from "../data/profileItem";

const AboutMe = () => {
  return (
    <div className="container mx-auto p-8 grid gap-8">
      {profileItem.map((section, index) => (
        <Card key={index} title={section.title} content={section.content} />
      ))}
    </div>
  );
};

export default AboutMe;
