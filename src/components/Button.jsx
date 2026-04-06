export function Button({ onClick, title, img, titleButton, disabled }) {
  return (
    <button
      title={titleButton}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center items-center rounded-md
        p-5 mt-3 w-50 md:w-auto h-12 text-yellow-200 font-bold gap-1
        transition-colors duration-300
        
        ${
          disabled
            ? "bg-[#3B1BB8] cursor-not-allowed opacity-60"
            : "bg-linear-to-r from-[#3B1BB8] to-[#3246e1] shadow-lg  cursor-pointer hover:from-[#2f1694] hover:to-[#2a3bbf]"
        }
      `}
    >
      <p>{title}</p>
      {img}
    </button>
  );
}