import { Clock, Calendar } from "lucide-react";
import { FormatDateToString } from "@/constants/FormatDateToString";
import { formatToReal } from "@/constants/FormatToReal";

export function ExpenseCard({ title, endDate, value, onClick, createdAt }) {
  const date = new Date(createdAt);
  const day = date.getDate();
  return (
    <button
      onClick={onClick}
      className="flex p-3 md:p-7 md:pr-15 bg-slate-500/8 border border-slate-500/30 justify-between items-center w-full h-fit rounded-2xl
                    cursor-pointer transition-transform duration-200 hover:scale-101
        "
    >
      <div className="flex gap-3 md:gap-6">
        <div className="flex w-12 h-12 items-center justify-center bg-amber-300/20 p-2 rounded-2xl text-amber-300">
          <Clock />
        </div>
        <div className="flex flex-col gap-1 -mt-2 md:-mt-1">
          <p className="text-lg md:text-xl text-left">{title}</p>
          <div className="flex flex-col md:flex-row gap-1 md:gap-5">
            <p className=" flex items-center gap-2 text-left text-slate-300/70 text-[13px]">
               <Calendar className=" w-4 h-4 mb-0.5"/>{" " + day + " "}
              {FormatDateToString(date)}
            </p>
            <div className="hidden md:block bg-zinc-400/50 w-0.5 h-5" />
            <p className=" flex items-center gap-2 text-amber-300/90 text-[13px]">
              <Clock className="w-4 h-4 " /> Até {FormatDateToString(endDate)}
            </p>
          </div>
        </div>
      </div>
      <p className="text-base md:text-lg font-semibold">{formatToReal(value)}</p>
    </button>
  );
}
