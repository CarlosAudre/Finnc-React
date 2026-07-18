import { Bot } from "lucide-react";

export function AiMessage({ message }) {
  return (
    <div className="flex gap-3 p-3 m-2 max-w-[50%] bg-slate-500/8 border w-fit  border-slate-500/30 rounded-2xl">
      <div className="flex bg-violet-600 rounded-md p-1 items-center h-fit">
        <Bot className="w-7 h-7" />
      </div>

      <div className="flex flex-col min-w-0">
        <p className="wrap-break-word">{message}</p>
      </div>
    </div>
  );
}