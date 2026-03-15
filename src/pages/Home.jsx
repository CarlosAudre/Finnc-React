import { useEffect, useState } from "react";
import { ArrowRight, Wallet, Banknote, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

//API URL---------------------------------------------------------------------------------------------
  const apiUrl = "http://localhost:8081";

export function Home() {
  const [userName, setUserName] = useState();
  const [balance, setBalance] = useState();
  const [periodTotalSpent, setPeriodTotalSpent] = useState("");
  const [periodEconomy, setPeriodEconomy] = useState("");
  const [periodTotalPorcentage, setPeriodTotalPorcentage] = useState("");
  const [periodContainerCount, setPeriodContainerCount] = useState(0)
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const monthName = new Date().toLocaleString("pt-BR", {
    month: "long",
  });
  const navigate = useNavigate();

  //periodTotal %
  useEffect(() => {
    if (Number(balance) > 0) {
      const periodPorcentage =
        100 - (Number(periodTotalSpent) * 100) / Number(balance);

      setPeriodTotalPorcentage(periodPorcentage.toFixed(1));
    }
  }, [balance, periodTotalSpent]);

  useEffect(() => {
    //UseEffect its used when the function is executed only once
    async function getUserName() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await fetch(`${apiUrl}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("User not authenticated");
        }
        const data = await response.json();
        setUserName(data.name);
      } catch (err) {
        console.log(err.message);
      }
    }
    getUserName();
  }, []);

  useEffect(() => {
    async function getPeriod() {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }
      const response = await fetch(
        `${apiUrl}/period/${todayYear}/${todayMonth}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setBalance(data.value);
      setPeriodTotalSpent(data.totalSpent);
      setPeriodEconomy(data.economy);
      setPeriodContainerCount(data.containerCount)
    }
    getPeriod();
  }, [todayYear, todayMonth]);

  return (
    <div className="flex flex-col w-auto min-h-screen mb-10 md:mb-0 md:p-3">
      <header className="flex flex-col md:flex-row justify-between p-3 m-3 mt-10 md:mt-5">
        <div className="flex flex-col gap-2">
          <h1
            className={"text-3xl font-semibold"}
          >{`Olá, ${userName ? userName : "Carregando usuário"}`}</h1>
          <p
            className={"text-slate-300/70 text-base"}
          >{`Aqui está seu resumo financeiro de ${monthName}`}</p>
        </div>

        <Button
          title="Ver despesas"
          onClick={() => navigate("/period")}
          img={<ArrowRight />}
        />
      </header>

      <main className="flex flex-col">
        <div
          className="p-5 gap-10 md:gap-5 lg:gap-15 grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-3"
        >
          <Card //Cria um fetch que muda as datas com base na url
            bgColor="bg-violet-600/20"
            bgIconColor="bg-violet-600"
            title="Saldo total"
            img={<Wallet />}
            value={`${balance ? balance : 0}`}
            date={`${monthName} 2026`}
          />

          <Card
            bgColor="bg-rose-600/15"
            bgIconColor="bg-[#E83343]"
            title="Total Gasto"
            img={<Banknote />}
            value={`${periodTotalSpent ? periodTotalSpent : 0}`}
            date={`${periodContainerCount} containers`}
          />

          <Card
            bgColor="bg-emerald-500/20"
            bgIconColor="bg-[#0e9c87]"
            title="Economia"
            img={<PiggyBank />}
            value={`${periodEconomy ? periodEconomy : 0}`}
            date={`${periodTotalPorcentage}% do total`}
          />
        </div>

        <div></div>
      </main>
    </div>
  );
}
