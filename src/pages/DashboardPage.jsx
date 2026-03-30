import { useNavigate, useParams } from "react-router-dom";
import { Calendar } from "../components/Calendar";
import {
  Wallet,
  PiggyBank,
  Banknote,
  TrendingUp,
  TrendingDown,
  MoveRight,
} from "lucide-react";
import { Card } from "../components/Card";
import { DaashboardCard } from "@/components/dashboards/DashboardCard";
import { useEffect, useState } from "react";
import { OverviewChart } from "@/components/dashboards/OverviewChart";
import { ComparativeChart } from "@/components/dashboards/ComparativeChart";
import { CategoriesChart } from "@/components/dashboards/CategoriesChart";
import { DashboardCalendar } from "@/components/dashboards/DashboardCalendar";

export function DashboardPage() {
  //API URL---------------------------------------------------------------------------------------------
  const apiUrl = "http://192.168.3.13:8081";

  //Summary Values--------------------------------------------------------------------------------------
  const [totalReceived, setTotalReceived] = useState("0");
  const [totalSpent, setTotalSpent] = useState("0");
  const [totalEconomy, setTotalEconomy] = useState("0");
  const [trendPercentage, setTrendPercentage] = useState("0");

  //Overview data--------------------------------------------------------------------------------------
  const [monthChartData, setMonthChartData] = useState([""]);

  //Categories data
  const [categoriesChartData, setCategoriesChartData] = useState([""]);

  const trendClass = `${(trendPercentage < 0 && "text-emerald-400") || (trendPercentage > 0 && "text-red-400") || (trendPercentage == 0 && "text-indigo-500")} h-10 w-9.5`;
  const trendIconClass = `h-10 w-9.5 ${trendClass}`;
  const trendIcon =
    trendPercentage < 0 ? (
      <TrendingDown className={trendIconClass} />
    ) : trendPercentage > 0 ? (
      <TrendingUp className={trendIconClass} />
    ) : (
      <MoveRight className={trendIconClass} />
    );

  const { year } = useParams();
  const [view, setView] = useState("overview");
  const navigate = useNavigate();

  const navigateToPreviousYear = () => {
    navigate(`/dashboard/${Number(year) - 1}`);
  };

  const navigateToNextYear = () => {
    navigate(`/dashboard/${Number(year) + 1}`);
  };

  useEffect(() => {
    async function getSummary() {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const month = new Date().getMonth() + 1;
      const response = await fetch(`${apiUrl}/dashboard/${year}/${month}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      setTotalReceived(data.totalReceived);
      setTotalSpent(data.totalSpent);
      setTotalEconomy(data.totalEconomy);
      setTrendPercentage(data.trendPercentage);
      console.log(data);
    }

    getSummary();
  }, [year]);

  useEffect(() => {
    async function getOverviewChartDate() {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`${apiUrl}/dashboard/${year}/overview`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      setMonthChartData(data);

      console.log(data);
    }

    getOverviewChartDate();
  }, [year]);

  useEffect(() => {
    async function getCategoriesChartDate() {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`${apiUrl}/dashboard/${year}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      setCategoriesChartData(data)

      console.log("EITA PRR: ", data);
    }

    getCategoriesChartDate();
  }, [year]);

  return (
    <div className="w-full mb-15 md:h-screen md:mb-0 flex flex-col md:p-3">
      <header className="flex flex-col md:flex-row justify-between gap-2 pl-3 mb-3 ml-3 mt-3 ">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Gráficos</h1>
          <p className="text-slate-300/70 text-base">
            Visualize a evolução das suas finanças
          </p>
        </div>
        <div className="w-70">
          <DashboardCalendar
            year={year}
            navigateToPreviousYear={navigateToPreviousYear}
            navigateToNextYear={navigateToNextYear}
          />
        </div>
      </header>

      <main className="flex flex-col gap-2">
        <div
          className="p-5 gap-10 md:gap-5 lg:gap-15 grid grid-cols-1 md:grid-cols-2 
          2xl:grid-cols-4"
        >
          <DaashboardCard
            img={<Wallet className="h-9.5 w-9.5 text-violet-500" />}
            bgColor="bg-violet-600/15"
            period={year}
            title="Total recebido"
            value={`R$ ${totalReceived}`}
          />

          <DaashboardCard
            img={<Banknote className="h-10 w-9.5 text-red-400 " />}
            bgColor="bg-rose-600/15"
            period={year}
            title="Total gasto"
            value={`R$ ${totalSpent}`}
          />

          <DaashboardCard
            img={<PiggyBank className="h-10 w-9.5 text-emerald-300" />}
            bgColor="bg-emerald-500/20"
            period={year}
            title="Total economizado"
            value={`R$ ${totalEconomy}`}
          />

          <DaashboardCard
            img={trendIcon}
            bgColor="bg-blue-500/20"
            period={"vs mês anterior"}
            title="Tendencia de gastos"
            value={`+${trendPercentage}%`}
            textColor={`${trendClass}`}
          />
        </div>

        <div className="flex flex-col w-full items-center md:items-baseline md:pl-3 md:m-3">
          <div className="flex bg-gray-500/10  border-2  border-gray-500/30 rounded-2xl p-3 w-fit md:w-100 h-fit gap-3.5 text-slate-300/70 justify-center ">
            <button
              onClick={() => setView("overview")}
              className={`${view === "overview" ? "bg-violet-500 text-amber-50 font-semibold" : "bg-none"} p-2 rounded-md cursor-pointer`}
            >
              <p className="text-sm md:text-base">Visão geral</p>
            </button>

            <button
              onClick={() => setView("comparative")}
              className={`${view === "comparative" ? "bg-violet-500 text-amber-50 font-semibold" : "bg-none"} p-2 rounded-md cursor-pointer`}
            >
              <p className="text-sm md:text-base">Comparativo</p>
            </button>

            <button
              onClick={() => setView("categories")}
              className={`${view === "categories" ? "bg-violet-500 text-amber-50 font-semibold" : "bg-none"} p-2 rounded-md cursor-pointer`}
            >
              <p className="text-sm md:text-base">Categorias</p>
            </button>
          </div>

          <div className="flex w-full justify-center mt-3 p-5">
            {view === "overview" && <OverviewChart data={monthChartData} />}
            {view === "comparative" && (
              <ComparativeChart data={monthChartData} />
            )}
            {view === "categories" && <CategoriesChart data={categoriesChartData} />}
          </div>
        </div>
      </main>
    </div>
  );
}
