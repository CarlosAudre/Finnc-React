import { Plus} from "lucide-react";
import { ExpenseCard } from "./ExpenseCard";
import { Button } from "../Button";


export function Expenses({onClick, expenses, expensesVisibility, onCardClick, containerLimit}) {
  const noBalance = containerLimit < 0
  return (
    <div className="flex flex-col pt-3 mt-10 m-3 md:mt-5 gap-5">
      <div className="flex flex-col md:flex-row  justify-between md:items-center">
        <h2 className="text-xl font-semibold">Despesas</h2>
        <Button
          titleButton="Criar Despesa"
          title="Nova Despesa"
          onClick={onClick}
          img={<Plus />}
          disabled={noBalance}

        />
      </div>

      <div className="flex flex-col gap-5">
        {expensesVisibility ?
        expenses.map((e) => 
        <ExpenseCard
          onClick={() => onCardClick(e.id)}
          key={e.id}
          title={e.title}
          endDate={e.endDate}
          value={e.value}
          createdAt={e.createdAt}
        />
        ): <h2 className="text-xl text-center justify-center mt-5 md:mt-15">Nenhuma despesa criada</h2>
        }
      </div>
    </div>
  );
}


