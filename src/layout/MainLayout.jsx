import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Menu, ArrowLeft } from "lucide-react";
import { useState } from "react";

export function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-min-screen w-screen flex text-amber-50 relative">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block w-85  ">
        <Sidebar />
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Mobile */}
      <div
        className={`fixed w-64 z-10 transform transition-transform duration-300 lg:hidden
                  ${isOpen ? "translate-x-0" : "-translate-x-full"}
                 `}
      >
        <Sidebar />
      </div>

      <main className="flex-1 overflow-auto bg-linear-to-br from-[#070C1E] via-[#131631] to-[#2d1063]">
        {/* Botão Mobile */}
        <button className="fixed lg:hidden p-2 pt-3" onClick={() => setIsOpen(!isOpen)}>
           <Menu className="w-10 h-10 text-amber-50/70"/>
        </button>
        <Outlet/>
      </main>
    </div>
  );
}
