import { CalendarFold, Wallet, Banknote, PiggyBank } from "lucide-react";
import { Card } from "../components/Card";

export function Expense() {
  return (
    <div className="w-auto h-screen flex flex-col md:p-3">
      <header className="flex flex-col md:flex-row justify-between p-3 m-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Despesas</h1>
          <p className="text-slate-300/70 text-base">{`Gerencie seus gastos de fevereiro 2026`}</p>
        </div>

        <div
          className="flex justify-center items-center p-5 mt-3 w-50 md:w-50 h-13 cursor-pointer  rounded-md
        bg-gray-500/5 border-2 border-amber-50/3 text-amber-50 font-bold gap-1"
        >
          <CalendarFold className="text-violet-400" />
          <p>Fevereiro 2026</p>
        </div>
      </header>

      <main className="flex flex-col">
        <div
          className="p-5 gap-10 md:gap-5 lg:gap-15 grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-3"
        >
          <Card
            bgColor="bg-violet-500/15"
            bgIconColor="bg-violet-500"
            title="Saldo total"
            img={<Wallet />}
            balance="1500,00"
            date="Fevereiro 2026"
          />

          <Card
            bgColor="bg-[#E83343]/15"
            bgIconColor="bg-[#E83343]"
            title="Total gasto"
            img={<Banknote />}
            balance="1500,00"
            date="1 despesa"
          />

          <Card
            bgColor="bg-[#0e9c87]/15"
            bgIconColor="bg-[#0e9c87]"
            title="Economia"
            img={<PiggyBank />}
            balance="1500,00"
            date="50% do total"
          />
        </div>

        <div></div>
      </main>
    </div>
  );
}
