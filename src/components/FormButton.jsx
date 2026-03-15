export function FormButton({title, onClick, bg, hover, type}) {
  return (
    <button
    type={type}
      onClick={onClick}
      className={`flex justify-center items-center ${bg} rounded-md
         p-5 w-5/11 h-12 cursor-pointer font-bold  text-amber-50 ${hover}
         transition-colors duration-300`}
    >
      <p className="text-sm md:text-base">{title}</p>
    </button>
  );
}
