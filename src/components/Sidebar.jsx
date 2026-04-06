import { HomeIcon, Wallet, ChartColumn, User, LogOut, Bot } from "lucide-react";
import logo from "../assets/finnc_logo.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export function Sidebar() {
  const { month, year } = useParams();

  const { pathname } = useLocation(); //get the path name
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const selectedIconClass =
    "flex gap-2 p-4 rounded-2xl ring-2  border-violet-500/20 bg-violet-500/20 text-violet-400";
  const nonSelectedIconClass = "flex gap-2 p-4";

  return (
    <div className=" flex h-screen flex-col justify-self-start gap-5 bg-[#060721] border border-indigo-950/80 p-5 py-2 w-64 lg:w-85">
      {/*Logo----------------------------------------------------------------------------------*/}
      <div className="relative -my-2 flex flex-col ml-3  ">
        <img  onClick={() => navigate("/")} src={logo} alt="logo" className="w-60 h-40 -mx-10 -my-8 absolute cursor-pointer" />
        <p className="text-sm ml-2 mt-18 text-slate-300/70">Gestão financeira</p>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col justify-between h-full mt-8 gap-10">
        {/* Principal -----------------------------------------------------------------------*/}
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className={`${pathname === "/" ? selectedIconClass : nonSelectedIconClass}`}
          >
            <HomeIcon />
            <p className="text-amber-50 text-base">Inicio</p>
          </Link>

          <Link
            to="/period"
            className={`${
              pathname === `/period/${year}/${month}`
                ? selectedIconClass
                : nonSelectedIconClass
            }`}
          >
            <Wallet />
            <p className="text-amber-50">Despesas</p>
          </Link>

          <Link
            to="/dashboard"
            className={`${pathname === `/dashboard/${year}` ? selectedIconClass : nonSelectedIconClass}`}
          >
            <ChartColumn />
            <p className="text-amber-50">Gráficos</p>
          </Link>

          {/* FicAI */}
          {/* <Link 
          to={"/ficAi"}
          className={`${pathname === "/ficAi" ? selectedIconClass : nonSelectedIconClass}`}
          >
            <Bot/>
             <p className="text-amber-50">FicAi</p>
          </Link>*/}
        </div>

        {/* Profile */}
        <div className="flex flex-col border-t-2 border-violet-300/20 pt-5 gap-2">
          <Link
            to="/profile"
            className={`${pathname === "/profile" ? selectedIconClass : nonSelectedIconClass}`}
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
