import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { BottonBar } from "../components/BottonBar";
import logo from "../assets/finnc_logo.png";

export function MainLayout() {
  return (
    <div className="min-h-screen w-screen flex text-amber-50 relative">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block w-85  ">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-auto
       bg-linear-to-br from-[#090C23] from-20% via-[#0F1331] via-70% to-[#1a144f] to-100%">
        <div className="flex lg:hidden mt-12">
        <img
          className="flex w-40 h-30 -my-3  absolute -top-4 -left-2"
          src={logo}
          alt="Logo"
        ></img>
      </div>
        <Outlet />
      </main>

      <BottonBar />
    </div>
  );
}
