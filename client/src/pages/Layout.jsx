import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="wrapper min-h-screen">
      <Sidebar />
      <div className="main-container">
        <Header />
        <main className="flex items-center justify-center relative">
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
