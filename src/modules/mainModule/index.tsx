import { Outlet } from "react-router-dom";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";

function MainModule() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow w-full ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainModule;
