import { Clock } from "lucide-react"

export function ExpenseCard(){
    return(
        <div className="flex p-5 md:p-7 md:pr-15 bg-slate-500/13 justify-between items-center w-full h-fit rounded-2xl">
            <div className="flex gap-4">
                <div className="flex w-12 h-12 items-center justify-center bg-amber-300/20 p-2 rounded-2xl text-amber-300"><Clock/></div>
                <div className="flex flex-col gap-1">
                    <p className="text-lg">titulo</p>
                    <p className="text-slate-300/70 text-sm">até 03/04/2026</p>
                </div>
            </div>
            <p className="text-lg font-semibold">R$ 1,00</p>
        </div>
    )
}