export function Button({onClick, title, img}) {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center bg-linear-to-r from-violet-500 to-violet-900 rounded-md
         p-5 mt-3 w-50 md:w-auto h-12 cursor-pointer text-yellow-200 font-bold gap-1 hover:from-violet-600 hover:to-violet-950 
         transition-colors duration-300"
    >
      <p>{title}</p>
      {img}
    </button>
  );
}
