import { Trash, Table } from "lucide-react";

export function FormLayout({
  title,
  children,
  onSubmit,
  trashVisibility,
  onDelete,
}) {
  return (
    <div
      className={`flex fixed inset-1 lg:ml-70 z-50 flex-col w-full justify-center items-center -mt-20 md:mt-6`}
    >
      <div className="bg-slate-950/75 backdrop-blur-md lg:mr-80 p-5 rounded-2xl md:w-md xl:w-auto">
        <div className="flex items-center text-center mb-4 gap-5">
          <h1 className="ml-2 font-semibold text-lg">{title}</h1>
          {trashVisibility && (
            <button
              onClick={onDelete}
              title="Deletar Despesa"
              className="cursor-pointer bg-rose-400 rounded-2xl p-2 hover:bg-rose-500 transition duration-200"
            >
              {<Trash />}
            </button>
          )}
        </div>
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}
