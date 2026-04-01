export function MostExpentCategories({
  onClick,
  title,
  totalValue,
  totalSpent,
  color,
  percent,
}) {
  return (
    <div onClick={onClick}
      className="flex items-center p-5 bg-zinc-50/5 rounded-2xl gap-3 cursor-pointer
         transition-transform duration-200 hover:scale-101"
    >
      <div className={`w-6 h-6 rounded-full ${color}`} />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between w-full">
          <p>{title}</p>
          <p>R$ {totalSpent}</p>
        </div>
        <div
          title={`${percent}%`}
          className="w-full h-2 bg-gray-700 rounded-2xl"
        >
          <div
            className={`h-2 rounded-2xl ${color}`}
            style={{
              width: `${percent}%`,
            }}
          />
        </div>
        <div>
          <p className="text-sm text-gray-400/90">
            {percent}% de R$ {totalValue}
          </p>
        </div>
      </div>
    </div>
  );
}
