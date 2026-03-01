import { Wallet, Banknote, PiggyBank, Plus, Pencil } from "lucide-react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Calendar } from "../components/Calendar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormBalance } from "../forms/FormBalance";

export function Period() {
  const [value, setValue] = useState("");
  const [balance, setBalance] = useState("");
  const { year, month } = useParams();
  const [formBalancevisibility, setFormBalanceVisibility] = useState(false);

  async function fillBalance() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await fetch(
      `http://localhost:8081/period/${year}/${month}/balance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value }),
      },
    );
    if (!response.ok) {
      throw new Error("Error creating period");
    }
  }

  async function handleFillBalanceSubmit(e) {
    e.preventDefault();
    await fillBalance();
    setBalance(value)
    setValue(0)
    setFormBalanceVisibility((prev) => !prev);
  }

  useEffect(() => {
    async function getBalance() {
      try {
        setBalance(0);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await fetch(
          `http://localhost:8081/period/${year}/${month}/balance`,
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
        setBalance(data.value);
      } catch (err) {
        console.log(err.message);
      }
    }
    getBalance();
  }, [year, month]);

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
        <div
          className="p-5 gap-10 md:gap-5 lg:gap-15 grid grid-cols-1 md:grid-cols-2 
          xl:grid-cols-3"
        >
          <Card /*Pense em transformar em um componente unificado, para user os dados em outros locais*/
            bgColor="bg-violet-500/15"
            bgIconColor="bg-violet-600"
            bgIconColor2="bg-violet-600"
            title="Saldo total"
            img={<Wallet />}
            img2={<Pencil />}
            balance={`${balance ? balance : 0}`}
            date={`${monthFullName} ${year}`}
            onOpenForm={() => setFormBalanceVisibility((prev) => !prev)}
          />

          <Card
            bgColor="bg-[#E83343]/15"
            bgIconColor="bg-[#E83343]"
            title="Total gasto"
            img={<Banknote />}
            balance="1500,00" //Será introduzido ao ter toda lógica de Containers e despesas, no backend
            date="1 despesa"
          />

          <Card
            bgColor="bg-[#0e9c87]/15"
            bgIconColor="bg-[#0e9c87]"
            title="Economia"
            img={<PiggyBank />}
            balance="1500,00" //Será introduzido ao ter toda lógica de Containers e despesas, no backend
            date="50% do total"
          />
        </div>

        <div className="flex flex-col justify-center p-3 m-3">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-2xl">Containers</h3>
              <p className="text-slate-300/70 text-base">{`R$ 200,00 disponível para alocar`}</p>
            </div>
            <Button title="Novo Container" onClick={""} img={<Plus />} />
          </div>
          <div className="grid gird-col-1 mg:grid-cols-2 lg:grid-cols-3">
            {/*Containers map*/}
          </div>
        </div>
      </main>
    </div>
  );
}
