import { FormBalance } from "../forms/FormBalance";

export function Card({
  title,
  value,
  info,
  info2,
  bgIconColor,
  bgIconColor2,
  bgColor,
  img,
  img2,
  onOpenForm,
}) {
  return (
    <div className={`flex rounded-2xl justify-between ${bgColor} p-7 h-45`}>
      <div className="flex flex-col gap-3">
        <p className="text-slate-300/90 text-base">{title}</p>
        <p className="font-semibold text-3xl">R$ {value}</p>
        <p className="text-slate-300/70 text-sm">{info}</p>
        {info2 && <p className="text-slate-300/70 text-sm">{info2}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <div
          className={`flex flex-col justify-center items-center rounded-2xl ${bgIconColor}  w-13 h-13`}
        >
          {img}
        </div>
        {img2 && (
          <button
            title="Adicionar ou editar saldo"
            onClick={onOpenForm}
            className={`flex flex-col justify-center items-center rounded-2xl ${bgIconColor2} cursor-pointer hover:bg-violet-700 w-13 h-13`}
          >
            {img2}
          </button>
        )}
      </div>
    </div>
  );
}
