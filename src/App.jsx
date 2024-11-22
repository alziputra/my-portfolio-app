import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact";
import Bloglist from "./pages/Blogs/Bloglist";
import BlogDetail from "./pages/Blogs/BlogDetail";
import PostCreator from "./components/PostCreator";
import PortfolioList from "./pages/Portfolios/PortfolioList";
import PortfolioDetail from "./pages/Portfolios/PortfolioDetail";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/blogs" replace />} />
          {/* Define main routes */}
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/portfolios" element={<PortfolioList />} />
          <Route path="/portfolios/:id" element={<PortfolioDetail />} />
          <Route path="/blogs" element={<Bloglist />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post" element={<PostCreator />} />

          {/* Fallback for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>

      {/* ToastContainer to display toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Router>
  );
};

export default App;
