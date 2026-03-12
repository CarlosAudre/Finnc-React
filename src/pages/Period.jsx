import { Wallet, Banknote, PiggyBank, Plus, Pencil } from "lucide-react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Calendar } from "../components/Calendar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormBalance } from "../forms/FormBalance";
import { FormContainer } from "../forms/FormContainer";
import { ContainerCard } from "../components/ContainerCard";
import { toast } from "sonner";

export function Period() {
  //Period
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [periodTotalPorcentage, setPeriodTotalPorcentage] = useState("");
  const [periodTotalSpent, setPeriodTotalSpent] = useState("");
  const [periodContainerCount, setPeriodContainerCount] = useState(0);
  const [periodEconomy, setPeriodEconomy] = useState("");
  const { year, month } = useParams();

  //Container
  const [containers, setContainers] = useState([]);
  const [containersVisibility, setContainersVisibility] = useState(false);
  const [containerTitle, setContainerTitle] = useState("");
  const [containerBalance, setContainerBalance] = useState("");
  const [containerEndDate, setContainerEndDate] = useState("");
  const [containerColor, setContainerColor] = useState("PURPLE");

  //periodTotal %
  useEffect(() => {
    if (Number(balance) > 0) {
      const periodPorcentage =
        100 - (Number(periodTotalSpent) * 100) / Number(balance);

      setPeriodTotalPorcentage(periodPorcentage.toFixed(1));
    }
  }, [balance, periodTotalSpent]);

  //ContainerColors
  const containerColors = {
    PURPLE: {
      solid: "bg-violet-600",
      soft: "bg-violet-600/20",
    },
    BLUE: {
      solid: "bg-blue-500",
      soft: "bg-blue-500/20",
    },
    GREEN: {
      solid: "bg-emerald-500",
      soft: "bg-emerald-500/20",
    },
    YELLOW: {
      solid: "bg-yellow-500",
      soft: "bg-yellow-500/20",
    },
    RED: {
      solid: "bg-rose-600",
      soft: "bg-rose-600/20",
    },
  };

  //Forms
  const [formBalancevisibility, setFormBalanceVisibility] = useState(false);
  const [formContainerVisibility, setFormContainerVisibility] = useState(false);

  //Today
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");
  const todayPeriod = `${year}-${formattedMonth}-${day}`;

  //Converts Endmonth to localDate
  function convertEndMonthToFullDate(monthValue) {
    const [year, month] = monthValue.split("-");
    const lastDate = new Date(year, month, 0).getDate();
    return `${monthValue}-${lastDate.toString().padStart(2, "0")}`;
  }
  console.log;

  //Navigate
  const navigate = useNavigate();

  //FillBalance
  async function fillBalance() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await fetch(
      `http://localhost:8081/period/${year}/${month}/balance`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value }),
      },
    );
    if (!response.ok) {
      const error = await response.json();
      toast.error(error.message);
      throw new Error("Error creating period");
    }
  }

  async function handleFillBalanceSubmit(e) {
    e.preventDefault();
    try {
      if (value.trim() === "") {
        toast.error("Preencha o saldo do mês");
        return;
      }
      await fillBalance();
      const newEconomy = value - balance;
      setPeriodEconomy((prev) => prev + newEconomy);
      setBalance(Number(value));
      setValue("0");
      setFormBalanceVisibility((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  }

  //GetPeriod
  useEffect(() => {
    async function getPeriod() {
      try {
        setBalance(0);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }
        const response = await fetch(
          `http://localhost:8081/period/${year}/${month}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Error fetching balance");
        }
        const data = await response.json();
        setPeriodTotalSpent(Number(data.totalSpent));
        setPeriodEconomy(Number(data.economy));
        setBalance(Number(data.value));
        setContainers(data.containerDtos);
        setContainersVisibility(true);
        setPeriodContainerCount(data.containerCount);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getPeriod();
  }, [year, month]);

  //CreateContainer
  async function createContainer() {
    if (
      containerTitle.trim() === "" ||
      containerBalance.trim() === "" ||
      containerEndDate.trim() === ""
    ) {
      return toast.error("Preencha todos os campos");
    }

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8081/period/containers`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: containerTitle,
        totalValue: Number(containerBalance),
        startDate: todayPeriod,
        endDate: convertEndMonthToFullDate(containerEndDate),
        color: containerColor,
      }),
    });
    console.log("Saldo do período", balance);
    console.log("Saldo do container", containerBalance);
    if (!response.ok) {
      const error = await response.json();
      toast.error(error.message);
      console.log(error);
      throw new Error("Erro ao criar container");
    }
    return await response.json();
  }

  async function handleCreateContainerSubmit(e) {
    e.preventDefault();
    try {
      const newContainer = await createContainer();
      const formattedContainer = {
        id: newContainer.id,
        title: newContainer.container.title,
        endDate: newContainer.container.endDate,
        totalValue: newContainer.totalValue,
        color: newContainer.container.color,
      };
      const newTotalSpent = periodTotalSpent + Number(containerBalance);
      setPeriodTotalSpent(newTotalSpent);
      setPeriodEconomy(balance - newTotalSpent);
      setPeriodContainerCount((prev) => prev + 1);

      setFormContainerVisibility((prev) => !prev);
      setContainers((prev) => [...prev, formattedContainer]);
      setContainerBalance("");
      setContainerTitle("");
      setContainerEndDate("");
    } catch (error) {
      console.log(error);
    }
  }

  const months = [
    { name: "Jan", fullName: "Janeiro", id: 1 },
    { name: "Fev", fullName: "Fevereiro", id: 2 },
    { name: "Mar", fullName: "Março", id: 3 },
    { name: "abr", fullName: "Abril", id: 4 },
    { name: "Mai", fullName: "Maio", id: 5 },
    { name: "Jun", fullName: "Junho", id: 6 },
    { name: "Jul", fullName: "Julho", id: 7 },
    { name: "Ago", fullName: "Agosto", id: 8 },
    { name: "Set", fullName: "Setembro", id: 9 },
    { name: "Out", fullName: "Outubro", id: 10 },
    { name: "Nov", fullName: "Novembro", id: 11 },
    { name: "Dez", fullName: "Dezembro", id: 12 },
  ];

  const selectedMonth = months.find((m) => m.id === Number(month));
  const monthFullName = selectedMonth?.fullName || "";

  return (
    <div className="w-auto h-screen flex flex-col md:p-3">
      <header className="flex flex-col md:flex-row justify-between p-3 mt-10 m-3 md:mt-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Despesas</h1>
          <p className="text-slate-300/70 text-base">{`Gerencie seus gastos de ${monthFullName + " " + year}`}</p>
        </div>

        <Calendar
          month={month}
          year={year}
          months={months}
          monthFullName={monthFullName}
        />
      </header>

      <main className="flex flex-col">
        {/*Forms*/}
        {formBalancevisibility && (
          <FormBalance
            onChange={(e) => setValue(e.target.value)}
            onSubmit={handleFillBalanceSubmit}
            onCancel={() => setFormBalanceVisibility((prev) => !prev)}
            value={value}
          />
        )}

        {formContainerVisibility && (
          <FormContainer
            titleValue={containerTitle}
            balanceValue={containerBalance}
            endDateValue={containerEndDate}
            containerColorValue={containerColor}
            onColorChange={setContainerColor}
            onTitleChange={(e) => setContainerTitle(e.target.value)}
            onBalanceChange={(e) => setContainerBalance(e.target.value)}
            onEndDateChange={(e) => setContainerEndDate(e.target.value)}
            onCancel={() => setFormContainerVisibility((prev) => !prev)}
            onSubmit={handleCreateContainerSubmit}
          />
        )}

        {/*Cards*/}
        <div
          className="p-5 gap-10 md:gap-5 lg:gap-15 grid grid-cols-1 md:grid-cols-2 
          xl:grid-cols-3"
        >
          <Card /*Pense em transformar em um componente unificado, para user os dados em outros locais*/
            bgColor="bg-violet-600/20"
            bgIconColor="bg-violet-600"
            bgIconColor2="bg-violet-600"
            title="Saldo total"
            img={<Wallet />}
            img2={<Pencil />}
            value={`${balance ? balance : 0}`}
            date={`${monthFullName} ${year}`}
            onOpenForm={() => setFormBalanceVisibility((prev) => !prev)}
          />

          <Card
            bgColor="bg-rose-600/15"
            bgIconColor="bg-[#E83343]"
            title="Total gasto"
            img={<Banknote />}
            value={`${periodTotalSpent ? periodTotalSpent : 0}`} //Será introduzido ao ter toda lógica de Containers e despesas, no backend
            date={`${periodContainerCount} containers`}
          />

          <Card
            bgColor="bg-emerald-500/20"
            bgIconColor="bg-[#0e9c87]"
            title="Disponível"
            img={<PiggyBank />}
            value={`${periodEconomy ? periodEconomy : 0}`} //Será introduzido ao ter toda lógica de Containers e despesas, no backend
            date={`${periodTotalPorcentage}% do total`}
          />
        </div>

        {/*Containers*/}
        <div className="flex flex-col justify-center p-3 m-3">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-2xl">Containers</h3>
              <p className="text-sm text-slate-300/70 ">{`R$${periodEconomy} disponível para alocar`}</p>
            </div>
            <Button
              title="Novo Container"
              onClick={() => setFormContainerVisibility((prev) => !prev)}
              img={<Plus />}
            />
          </div>
          <div
            className="gap-10 md:gap-5 lg:gap-15 grid grid-cols-1 md:grid-cols-2 
          xl:grid-cols-3 mt-7"
          >
            {containersVisibility &&
              containers.map((c) => (
                <ContainerCard
                  key={c.id}
                  onClick={() => navigate(`/containers/${c.id}`)}
                  title={c.title}
                  endDate={c.endDate}
                  containerTotalValue={c.totalValue}
                  containerLimite={c.totalValue}
                  percent={3}
                  containerColor={containerColors[c.color].solid} //ex: PURPLE.solid
                  bgColor={containerColors[c.color].soft}
                />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
