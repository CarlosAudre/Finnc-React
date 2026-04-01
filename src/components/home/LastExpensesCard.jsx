import { Wallet } from "lucide-react";

export function LastExpensesCard({onClick, title, value, containerTitle}){
    return(
        <button
      onClick={onClick}
      className="flex p-5 md:p-7 md:pr-15 bg-slate-500/13 justify-between items-center w-full h-fit rounded-2xl
                    cursor-pointer transition-transform duration-200 hover:scale-101
        "
    >
      <div className="flex gap-4">
        <div className="flex w-12 h-12 items-center justify-center bg-violet-800 p-2 rounded-2xl text-violet-300">
          <Wallet />
        </div>
        <div className="flex flex-col text-left">
          <p className="text-base">{title}</p>
          <p className="text-gray-400/90 text-sm">{containerTitle}</p>
        </div>
      </div>
      <p className="text-base font-semibold">R$ {value}</p>
    </button>
  );
}