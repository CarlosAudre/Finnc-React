import { formatToReal } from "@/constants/FormatToReal";

export function ContainerCard({
  title,
  onClick,
  endDate,
  containerTotalValue,
  containerLimite,
  percent,
  containerColor,
  bgColor
}) {
  return (
    <div onClick={onClick}
     className={`flex flex-col w-auto p-7 ${bgColor} rounded-2xl  cursor-pointer transition-transform duration-200 hover:scale-103`}>

      <div className="flex gap-3">
        <div className="flex h-full items-center justify-center">
          <div className={`h-4 w-4 rounded-full ${containerColor}`}></div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-amber-300">Até {endDate}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <div className="flex justify-between">
          <h2 className="text-slate-300/80">Gasto</h2>
          <p>{percent}%</p>
        </div>

        <div className="rounded-2xl h-2 bg-gray-700 w-full">
          <div
            className={`h-2 ${containerColor} rounded-2xl`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <div className="flex-col">
          <p className="font-semibold">Total</p>
          <p className="text-xl">{formatToReal(containerTotalValue)}</p>
        </div>

        <div className="flex-col">
          <p className="text-slate-300/80">Limite</p>
          <p className="text-slate-300/80 text-md font-semibold">{formatToReal(containerLimite)}</p>
        </div>
      </div>
    </div>
  );
}
