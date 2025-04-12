import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Componants/Header";
import Footer from "./Componants/Footer";
import ScrollToTop from "./Componants/ScrollToTop";
import { UserProvider } from "./context/UserContext";

const Layout = () => {
  return (
   
        <div>
      <ScrollToTop /> {/* Fixed case-sensitive issue */}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>

  
  );
};

export default Layout;
