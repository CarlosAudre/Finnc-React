export function Input({ title, type, placeholder, value, onChange, Icon }) {
    function handleClick(e) {
    if (type === "month" && e.target.showPicker) {
      e.target.showPicker();
    }
  }
  return (
    <div className="flex flex-col rounded-md p-2 lg:w-130 h-auto justify-center gap-2">
      <label className="text-sm text-amber-50">{title}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-50/60 w-5 h-5" />
        )}

        <input
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          onClick={handleClick}
          className={`text-amber-50 w-70 text-sm md:w-full h-auto border-2 rounded-md border-amber-50/8 p-3.5 ${Icon && "pl-10"} `}
        />
      </div>
    </div>
  );
}
