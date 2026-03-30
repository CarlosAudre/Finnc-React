export function CategoriesDetails({ categoria, value, color, percent }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <div
            className="w-3.5 h-3.5 rounded-full"
            style={{ backgroundColor: color }}
          />

          <p className="text-base text-gray-100">{categoria}</p>
        </div>

        <p className="text-white font-semibold text-base">R$ {value}</p>
      </div>
      <div title={`${percent}%`} className="w-full h-2 bg-gray-700 rounded-2xl">
        <div
          className="h-2 rounded-2xl"
          style={{
            width: `${percent}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
