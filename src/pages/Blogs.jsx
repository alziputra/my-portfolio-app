import BlogCard from "../components/BlogCard";
import blogItems from "../data/blogItems";

const Blogs = () => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-8 text-center">Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogItems.map((item) => (
          <BlogCard key={item.id} id={item.id} image={item.image} createdAt={item.createdAt} title={item.title} content={item.content} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
