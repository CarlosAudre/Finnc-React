import { HomeIcon, Wallet, ChartColumn, User, Bot } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";

export function BottonBar() {
  const { month, year } = useParams();
  const { pathname } = useLocation();
  console.log("Month: ", month, "Year: ", year);
  console.log(pathname);

  const icons = [
    { icon: HomeIcon, path: "/" },
    { icon: Wallet, path: month && year ? `/period/${year}/${month}` : "/period"},
    { icon: ChartColumn, path: "/dashboard" },
    { icon: Bot, path: "/ficAi" },
    { icon: User, path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 flex justify-between md:hidden p-3.5 px-7 w-screen bg-indigo-950 rounded-md mx-auto">
      {icons.map(({ icon: Icon, path }, index) => (
        <Link key={index} to={path}>
          <Icon
            className={`${pathname === path ? "w-7 h-7 text-violet-400" : "w-7 h-7"}`}
          />
        </Link>
      ))}
    </div>
  );
}
