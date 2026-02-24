export function Card(props){
    return(
        <div className={`flex rounded-2xl justify-between ${props.bgColor} p-7 h-45`}>
            <div className="flex flex-col gap-3">
                <p className="text-slate-300/90 text-base">{props.title}</p>
                <p className="font-semibold text-3xl">R$ {props.balance}</p>
                <p className="text-slate-300/70 text-sm">{props.date}</p>
            </div>

            <div className={`flex justify-center items-center rounded-2xl ${props.bgIconColor} w-13 h-13`}>
                {props.img}
            </div>
        </div>
    )
}