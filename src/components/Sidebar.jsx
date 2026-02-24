import { HomeIcon, Wallet, ChartColumn, User, LogOut } from "lucide-react";
import logo from "../assets/finnc_logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Sidebar() {
  const { pathname } = useLocation(); //get the path name
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className=" flex h-screen  flex-col justify-self-start gap-10 bg-slate-900 border-2 border-violet-300/8 p-5 w-64 lg:w-85">
      {/*Logo*/}
      <div onClick={() => navigate("/")} className="flex gap-3 cursor-pointer">
        <img src={logo} alt="logo" className="w-1/4 h-15  " />
        <div className="flex flex-col p-1">
          <h1 className="text-2xl font-semibold">Finnc</h1>
          <p className="text-sm text-slate-300/70">Gestão financeira</p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col justify-between h-full gap-10">
        {/* Principal */}
        <div className="flex flex-col gap-2">
          <Link
            to="/"
            className={`${pathname === "/" ? "flex gap-2 p-4 rounded-2xl ring-2 border-violet-500/20 bg-violet-500/20 text-violet-400" : "flex gap-2 p-4"}`}
          >
            <HomeIcon />
            <p className="text-amber-50 text-base">Inicio</p>
          </Link>

          <Link
            to="/expense"
            className={`${
              pathname === "/expense"
                ? "flex gap-2 p-4 rounded-2xl ring-2 border-violet-500/20 bg-violet-500/20 text-violet-400 "
                : "flex gap-2 p-4"
            }`}
          >
            <Wallet />
            <p className="text-amber-50">Despesas</p>
          </Link>

          <Link
            to="/dashboard"
            className={`${pathname === "/dashboard" ? "flex gap-2 p-4 rounded-2xl ring-2 border-violet-500/20 bg-violet-500/20 text-violet-400" : "flex gap-2 p-4"}`}
          >
            <ChartColumn />
            <p className="text-amber-50">Gráficos</p>
          </Link>
        </div>

        {/* Profile */}
        <div className="flex flex-col border-t-2 border-violet-300/20 pt-5 gap-2">
          <Link
            to="/profile"
            className={`${pathname === "/profile" ? "flex p-4 gap-2  rounded-2xl ring-2 border-violet-500/20 bg-violet-500/20 text-violet-400" : "flex gap-2 p-4"}`}
          >
            <User />
            <p className="text-amber-50">Perfil</p>
          </Link>

          <button
            onClick={handleLogout}
            className="flex gap-2 p-4 cursor-pointer"
          >
            <LogOut />
            <p className="text-amber-50">Sair</p>
          </button>
        </div>
      </div>
    </div>
  );
}
