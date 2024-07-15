import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-container">
        <Header />
        <main className="min-h-[400px] flex items-center justify-center">
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
