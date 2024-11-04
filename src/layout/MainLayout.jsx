import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <div className="lg:flex h-screen">
      {/* Sidebar dengan ukuran tetap */}
      <div className="w-70 lg:flex-shrink-0 bg-gray-800">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow overflow-hidden">
        <div className="flex-grow overflow-y-auto">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
