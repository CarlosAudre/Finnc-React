export function AuthInfo({title, info, icon }) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-full flex w-12 h-12 border-2 border-violet-600 text-violet-500 items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col text-left">
        <p className="text-sm">{title}</p>
        <p className="text-sm text-gray-300/70">{info}</p>
      </div>
    </div>
  );
}
