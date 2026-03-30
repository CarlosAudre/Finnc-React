export function DaashboardCard({img, period, title, value, bgColor, textColor}){
    return(
        <div className={`flex flex-col p-6 gap-3 ${bgColor} rounded-2xl h-fit `}>
            <div className="flex justify-between items-center">
                {img}
                <p className="text-slate-300/85">{period}</p>
            </div>
            <div className="flex flex-col gap-1">
               <p className="text-slate-300/90 text-base">{title}</p>
                <p className={`font-semibold ${textColor ? textColor : "text-amber-50"} text-2xl`}>{value}</p>
            </div>
        </div>
    )
}