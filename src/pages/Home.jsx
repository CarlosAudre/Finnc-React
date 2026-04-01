import { useEffect, useState } from "react";
import { ArrowRight, Wallet, Banknote, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { HomeSummaryCard } from "@/components/home/HomeSummaryCard";
import { MostExpentCategories } from "@/components/home/MostSpentCaregories";
import { containerColors } from "@/constants/ContainerColors";
import { LastExpensesCard } from "@/components/home/LastExpensesCard";

//API URL---------------------------------------------------------------------------------------------
const apiUrl = "http://192.168.3.13:8081";

export function Home() {
  const [userName, setUserName] = useState();

  //-------------------------------------------------------------------------------------------------
  const [balance, setBalance] = useState();
  const [periodContainerTotalSpent, setPeriodContainerTotalSpent] =
    useState("");
  const [periodExpenseTotalSpent, setPeriodExpenseTotalSpent] = useState("");
  const [periodContainerEconomy, setPeriodContainerEconomy] = useState("");
  const [periodExpenseEconomy, setPeriodExpenseEconomy] = useState("");
  const [periodContainerCount, setPeriodContainerCount] = useState(0);
  const [periodPercent, setPeriodPercent] = useState(0);
  //-------------------------------------------------------------------------------------------------
  const [containerData, setContainerData] = useState([]);
  //-------------------------------------------------------------------------------------------------
  const [expenseData, setExpenseData] = useState([])
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const monthName = new Date().toLocaleString("pt-BR", {
    month: "long",
  });

  useEffect(() => {
    async function getPeriodPercent() {
      const percent = 100 - (periodExpenseTotalSpent / balance) * 100;
      setPeriodPercent(percent.toFixed(1));
    }
    getPeriodPercent();
  }, [periodExpenseTotalSpent, balance]);

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

  useEffect(() => {
    async function getMostExpensivesContainers() {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }
      const response = await fetch(
        `${apiUrl}/containers/${todayYear}/${todayMonth}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setContainerData(data);
      console.log(data);
    }
    getMostExpensivesContainers();
  }, [todayYear, todayMonth]);

  //---------------------------------------------------------------------------------------------------
  const onContainerClick = (id) => navigate(`/period/2026/3/containers/${id}`);

  //---------------------------------------------------------------------------------------------------

  useEffect(() => {
    async function getLastExpenses() {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }
      const response = await fetch(
        `${apiUrl}/expenses/${todayYear}/${todayMonth}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      console.log(data);
      setExpenseData(data)
    }
    getLastExpenses();
  }, [todayYear, todayMonth]);

  //Navigate-------------------------------------------------------------------------------------------
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mb-15 md:h-screen md:mb-0 max-w-5xl mx-auto flex flex-col md:p-3">
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

      <main className="flex flex-col w-full">
        <div className="flex flex-col p-5 w-full gap-10">
          <HomeSummaryCard
            value={balance}
            spent={periodExpenseTotalSpent}
            economy={periodExpenseEconomy}
            percentage={periodPercent}
          />

          <div className="flex flex-col p-1 gap-5 w-full">
            <h3 className="text-lg font-semibold">Maiores Gastos do Mês</h3>
            {containerData.map((data) => (
              <MostExpentCategories
                onClick={() => onContainerClick(data.id)}
                key={data.id}
                title={data.title}
                totalValue={data.totalValue}
                totalSpent={data.totalSpent}
                color={containerColors[data.color].solid}
                percent={(
                  (Number(data.totalSpent) / Number(data.totalValue)) *
                  100
                ).toFixed(1)}
              />
            ))}
          </div>
          <div className="flex flex-col p-1 gap-5 w-full">
            <h3 className="text-lg font-semibold">
              Últimas Despesas Adicionadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {expenseData.map((data) => (
                <LastExpensesCard
                onClick={() => onContainerClick(data.id)}
                title={data.title}
                value={data.value}
                containerTitle={data.containerTitle}
              />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
