import { useEffect, useState } from "react";
import { ArrowRight, Wallet, Banknote, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

//API URL---------------------------------------------------------------------------------------------
const apiUrl = "http://192.168.3.13:8081";

export function Home() {
  const [userName, setUserName] = useState();
  const [balance, setBalance] = useState();
  const [periodContainerTotalSpent, setPeriodContainerTotalSpent] =
    useState("");
  const [periodExpenseTotalSpent, setPeriodExpenseTotalSpent] = useState("");
  const [periodContainerEconomy, setPeriodContainerEconomy] = useState("");
  const [periodExpenseEconomy, setPeriodExpenseEconomy] = useState("");
  const [periodContainerCount, setPeriodContainerCount] = useState(0);
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const monthName = new Date().toLocaleString("pt-BR", {
    month: "long",
  });
  const navigate = useNavigate();

  //periodTotal %

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
      setPeriodContainerTotalSpent(Number(data.containerTotalSpent));
      setPeriodExpenseTotalSpent(Number(data.expenseTotalSpent));
      setPeriodContainerEconomy(Number(data.containerEconomy));
      setPeriodExpenseEconomy(Number(data.expenseEconomy));
      setPeriodContainerCount(data.containerCount);
    }
    getPeriod();
  }, [todayYear, todayMonth]);

  return (
    <div className="flex flex-col w-auto min-h-screen mb-15 md:h-screen  md:mb-0 md:p-3">
      <header className="flex flex-col md:flex-row justify-between pl-3 mb-3 ml-3 mt-3">
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
          <Card 
            bgColor="bg-violet-600/20"
            bgIconColor="bg-violet-600"
            title="Saldo total"
            img={<Wallet />}
            value={`${balance ? balance : 0}`}
            info={`${monthName} 2026`}
          />

          <Card
            bgColor="bg-rose-600/15"
            bgIconColor="bg-[#E83343]"
            title="Total gasto"
            img={<Banknote />}
            value={`${periodExpenseTotalSpent ? periodExpenseTotalSpent : 0}`}
            info={`Gasto em containers: ${periodContainerTotalSpent ? periodContainerTotalSpent : 0}`}
            info2={`${periodContainerCount} containers`}
          />

          <Card
            bgColor="bg-emerald-500/20"
            bgIconColor="bg-[#0e9c87]"
            title="Disponível"
            img={<PiggyBank />}
            value={`${periodExpenseEconomy ? periodExpenseEconomy : 0}`}
            info={`Disponível para containers: R$ ${periodContainerEconomy ? periodContainerEconomy : 0}`}
          />
        </div>
      </main>
    </div>
  );
}
