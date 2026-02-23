import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Menu, ArrowLeft } from "lucide-react";
import { useState } from "react";

export function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex text-amber-50 relative">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block w-85  ">
        <Sidebar />
      </div>

      {/* Sidebar Mobile */}
      <div
        className={`fixed w-64 transform transition-transform duration-300 lg:hidden
                  ${isOpen ? "translate-x-0" : "-translate-x-full"}
                 `}
      >
        <Sidebar />
      </div>

      <main className="flex-1 overflow-auto bg-linear-to-br from-[#070C1E] via-[#131631] to-[#2d1063]">
        {/* Botão Mobile */}
        <button className="lg:hidden p-4" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <ArrowLeft className="w-8 h-8 ml-64" />
          ) : (
            <Menu className="w-10 h-10" />
          )}
        </button>

        <Outlet />
      </main>
    </div>
  );
}
