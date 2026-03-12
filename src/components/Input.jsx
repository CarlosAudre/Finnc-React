export function Input({ title, type, placeholder, value, onChange }) {
  function handleClick(e) {
    if (type === "month" && e.target.showPicker) {
      e.target.showPicker();
    }
  }

  return (
    <div className="flex flex-col rounded-md p-2 w-auto lg:w-130 h-auto justify-center gap-2">
      <label className="text-sm text-amber-50">{title}</label>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onClick={handleClick}
        className={`text-amber-50 text-sm md:w-sm xl:w-auto h-auto border-2 rounded-md border-amber-50/8 p-3`}
      ></input>
    </div>
  );
}
