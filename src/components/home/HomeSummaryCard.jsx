import { DollarSign } from "lucide-react";
export function HomeSummaryCard({ value, spent, economy, percentage }) {
  const items = [
    { label: "Gasto", value: spent },
    { label: "Economizado", value: economy },
    { label: "Taxa de poupança", value: percentage },
  ];

  return (
    <div className="flex flex-col gap-3 bg-linear-to-r from-[#121546] from-30% to-[#1E2050] border border-violet-200/10 to-100% p-6 md:pl-10 rounded-2xl">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-slate-300/90">Saldo do mês</p>
          <h1 className="text-4xl font-bold text-indigo-400">R$ {value} </h1>
        </div>
        <div className="bg-linear-to-r from-[#3B1BB8] to-[#3246e1] rounded-md p-3 text-white/80 ">
          <DollarSign className="w-7 h-8" />
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col md:flex-row gap-3 w-full">
          {items.map((item, index) => (
            <div key={index} className="flex">
              <div
                className={`flex w-full justify-between md:justify-baseline md:gap-0 items-center md:flex-col ${item.label === "Gasto" ? " md:mr-8" : "md:mx-5"}`}
              >
                <p className="text-sm text-slate-300/90">{item.label}:</p>
                <p className="font-semibold">
                  {item.label === "Taxa de poupança"
                    ? item.value + "%"
                    : "R$ " + item.value}
                </p>
              </div>
              {item.label !== "Taxa de poupança" && (
                <div className="hidden md:block w-0.5 bg-gray-400/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
