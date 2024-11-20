import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AboutMe from "./pages/AboutMe";
import Portfolio from "./pages/Portfolios/Portfolio";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetail from "./pages/Blogs/BlogDetail";
import Contact from "./pages/Contact";
import PostCreator from "./components/PostCreator";

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/blogs" replace />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post" element={<PostCreator />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
