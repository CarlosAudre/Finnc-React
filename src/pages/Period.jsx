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
import { containerColors } from "../constants/ContainerColors";
import { months } from "../constants/MonthsValue";
import { m } from "framer-motion";

export function Period() {
  //API URL---------------------------------------------------------------------------------------------
  const apiUrl = "http://192.168.3.13:8081";

  //Period---------------------------------------------------------------------------------------------
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [periodContainerTotalSpent, setPeriodContainerTotalSpent] =
    useState("");
  const [periodExpenseTotalSpent, setPeriodExpenseTotalSpent] = useState("");
  const [periodContainerCount, setPeriodContainerCount] = useState("");
  const [periodContainerEconomy, setPeriodContainerEconomy] = useState("");
  const [periodExpenseEconomy, setPeriodExpenseEconomy] = useState("");
  const { year, month } = useParams();

  //Container---------------------------------------------------------------------------------------------
  const [containers, setContainers] = useState([]);
  const [containersVisibility, setContainersVisibility] = useState(false);
  const [containerTitle, setContainerTitle] = useState("");
  const [containerBalance, setContainerBalance] = useState("");
  const [containerEndDate, setContainerEndDate] = useState("");
  const [containerColor, setContainerColor] = useState("PURPLE");

  //periodTotal %---------------------------------------------------------------------------------------------

  //Forms---------------------------------------------------------------------------------------------
  const [formBalancevisibility, setFormBalanceVisibility] = useState(false);
  const [formContainerVisibility, setFormContainerVisibility] = useState(false);

  //Today---------------------------------------------------------------------------------------------
  function getStartDate(year, month) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    
    if (year == currentYear && month == currentMonth) {
      const day = today.getDate().toString().padStart(2, "0");
      return `${year}-${month.toString().padStart(2, "0")}-${day}`;
    }

    return `${year}-${month.toString().padStart(2, "0")}-01`;
  }

  //Converts Endmonth to localDate---------------------------------------------------------------------------------------------
  function convertEndMonthToFullDate(monthValue) {
    const [year, month] = monthValue.split("-");
    const lastDate = new Date(year, month, 0).getDate();
    return `${monthValue}-${lastDate.toString().padStart(2, "0")}`;
  }

  //Navigate---------------------------------------------------------------------------------------------
  const navigate = useNavigate();

  //FillBalance---------------------------------------------------------------------------------------------
  async function fillBalance() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await fetch(`${apiUrl}/period/${year}/${month}/balance`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ value }),
    });
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
      setPeriodContainerEconomy((prev) => prev + newEconomy);
      setBalance(Number(value));
      setValue("0");
      setFormBalanceVisibility((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  }

  //GetPeriod---------------------------------------------------------------------------------------------
  useEffect(() => {
    async function getPeriod() {
      try {
        setBalance(0);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }
        const response = await fetch(`${apiUrl}/period/${year}/${month}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error fetching balance");
        }
        const data = await response.json();
        setPeriodContainerTotalSpent(Number(data.containerTotalSpent));
        setPeriodExpenseTotalSpent(Number(data.expenseTotalSpent));
        setPeriodContainerEconomy(Number(data.containerEconomy));
        setPeriodExpenseEconomy(Number(data.expenseEconomy));
        setBalance(Number(data.value));
        setContainers(data.containerDtos);
        setPeriodContainerCount(data.containerCount);
        if (containers.length > 0) {
          setContainersVisibility(true);
        }
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getPeriod();
  }, [year, month, containers.length]);

  //CreateContainer---------------------------------------------------------------------------------------------
  async function createContainer() {
    if (
      containerTitle.trim() === "" ||
      containerBalance.trim() === "" ||
      containerEndDate.trim() === ""
    ) {
      toast.error("Preencha todos os campos");
      return null;
    }

    const token = localStorage.getItem("token");
    const response = await fetch(
      `${apiUrl}/period/${year}/${month}/containers`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: containerTitle,
          totalValue: Number(containerBalance),
          startDate: getStartDate(year, month),
          endDate: convertEndMonthToFullDate(containerEndDate),
          color: containerColor,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  }

  async function handleCreateContainerSubmit(e) {
    e.preventDefault();
    try {
      const newContainer = await createContainer();
      if (!newContainer) return;
      const formattedContainer = {
        id: newContainer.id,
        title: newContainer.title,
        endDate: newContainer.endDate,
        totalValue: newContainer.totalValue,
        color: newContainer.color,
      };
      const newTotalSpent =
        periodContainerTotalSpent + Number(containerBalance);
      setPeriodContainerTotalSpent(newTotalSpent);
      setPeriodContainerEconomy(balance - newTotalSpent);
      setPeriodContainerCount((prev) => prev + 1);

      setFormContainerVisibility((prev) => !prev);
      setContainers((prev) => [...prev, formattedContainer]);
      setContainerBalance("");
      setContainerTitle("");
      setContainerEndDate("");
    } catch (error) {
      toast.error(error.message);
    }
  }

  //Month FullName ---------------------------------------------------------------------------------------------
  const selectedMonth = months.find((m) => m.id === Number(month));
  const monthFullName = selectedMonth?.fullName || "";

  return (
    <div className="w-auto min-h-screen mb-15 md:h-screen md:mb-0 flex flex-col md:p-3">
      <header className="flex flex-col md:flex-row justify-between pl-3 mb-3 ml-3 mt-3">
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
          <Card
            bgColor="bg-violet-600/20"
            bgIconColor="bg-violet-600"
            bgIconColor2="bg-violet-600"
            title="Saldo total"
            img={<Wallet />}
            img2={<Pencil />}
            value={`${balance ? balance : 0}`}
            info={`${monthFullName} ${year}`}
            onOpenForm={() => setFormBalanceVisibility((prev) => !prev)}
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

        {/*Containers*/}
        <div className="flex flex-col justify-center p-3 m-3">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-2xl">Containers</h3>
              <p className="text-sm text-slate-300/70 ">{`R$${periodContainerEconomy} disponível para alocar`}</p>
            </div>
            <Button
              titleButton="Criar Contaienr"
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
                  onClick={() =>
                    navigate(`/period/${year}/${month}/containers/${c.id}`)
                  }
                  title={c.title}
                  endDate={c.endDate}
                  containerTotalValue={c.totalValue}
                  containerLimite={c.economy}
                  percent={((c.totalSpent / c.totalValue) * 100).toFixed(1)}
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
