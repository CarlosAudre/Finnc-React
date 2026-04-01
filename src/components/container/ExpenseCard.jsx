import { Clock } from "lucide-react";

export function ExpenseCard({ title, endDate, value, onClick}) {
  return (
    <button
      onClick={onClick}
      className="flex p-5 md:p-7 md:pr-15 bg-slate-500/13 justify-between items-center w-full h-fit rounded-2xl
                    cursor-pointer transition-transform duration-200 hover:scale-101
        "
    >
      <div className="flex gap-4">
        <div className="flex w-12 h-12 items-center justify-center bg-amber-300/20 p-2 rounded-2xl text-amber-300">
          <Clock />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg">{title}</p>
          <p className="text-slate-300/70 text-sm">até {endDate}</p>
        </div>
      </div>
      <p className="text-lg font-semibold">R$ {value}</p>
    </button>
  );
}
