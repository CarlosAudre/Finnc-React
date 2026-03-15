import { Button } from "./Button";
import { Plus } from "lucide-react";
import { ExpenseCard } from "./ExpenseCard";

export function Expenses() {
  return (
    <div className="flex flex-col pt-3 mt-10 m-3 md:mt-5 gap-5">
      <div className="flex flex-col md:flex-row  justify-between md:items-center">
        <h2 className="text-xl font-semibold">Despesas</h2>
        <Button titleButton="Criar Despesa" title="Nova Despesa" onClick={() => alert("Faz o L")} img={<Plus/>} />
      </div>

      <div><ExpenseCard/></div>
    </div>
  );
}
