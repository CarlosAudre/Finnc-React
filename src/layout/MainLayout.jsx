import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { BottonBar } from "../components/BottonBar";

export function MainLayout() {
  return (
    <div className="min-h-screen w-screen flex text-amber-50 relative">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block w-85  ">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-auto bg-linear-to-br from-[#070C1E] via-[#131631] to-[#2d1063]">
        {/* Botão Mobile */}
        <Outlet />
      </main>

      <BottonBar />
    </div>
  );
}
