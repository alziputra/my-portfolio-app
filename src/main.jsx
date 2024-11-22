import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BlogProvider from "./provider/BlogProvider";
import PortfolioProvider from "./provider/PortfolioProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BlogProvider>
      <PortfolioProvider>
        <App />
      </PortfolioProvider>
    </BlogProvider>
  </React.StrictMode>
);
