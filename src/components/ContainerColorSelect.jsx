export function ContainerColorSelect({ onClick, colorOn }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-9 h-9 rounded-md cursor-pointer ${colorOn}`}
    ></button>
  );
}
