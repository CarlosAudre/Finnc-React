import { CalendarFold, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function Calendar({ month, year, months, monthFullName }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col h-15 w-60 md:w-100 gap-1">
      <div className="flex w-full md:justify-end">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className=" flex items-center justify-center p-5 mt-3 w-51  h-13 cursor-pointer  rounded-md
            bg-gray-500/5 border-2 border-amber-50/3 text-amber-50 font-bold gap-1"
        >
          <CalendarFold className="text-violet-400" />
          <p>{monthFullName + " " + year}</p>
          {/*Criar labels com os meses e um useState para month, year e isOpen*/}
        </button>
      </div>

      <div
        className={`${!isOpen && "hidden"} flex flex-col z-10 bg-gray-500/5 backdrop-blur-lg border-2 border-amber-50/3 rounded-md p-3`}
      >
        <div className="flex justify-between">
          <ChevronLeft
            className="cursor-pointer"
            onClick={() => navigate(`/period/${Number(year) - 1}/${month}`)}
          />
          <p className="text-2xl font-bold select-none">{year}</p>
          <ChevronRight
            className="cursor-pointer"
            onClick={() => navigate(`/period/${Number(year) + 1}/${month}`)}
          />
        </div>

        <div className=" flex justify-center">
          <div className=" grid grid-cols-3 md:grid-cols-4 p-3 gap-3">
            {months.map((m) => {
              const isActive = location.pathname === `/period/${year}/${m.id}`;
              return (
                <button
                  key={m.id}
                  onClick={() => navigate(`/period/${year}/${m.id}`)}
                  className={` ${isActive ? "bg-linear-to-r from-violet-500 to-violet-900 rounded-lg font-bold"
                 : "text-gray-300/90 font-bold"}
                  select-none cursor-pointer text-md p-3`}
                >
                  {m.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
