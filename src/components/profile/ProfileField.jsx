import { Settings } from "lucide-react";

export function ProfileField({ label, Icon, value, type = "text", SettingsMessage, onClick }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-3 text-gray-200">
        <Icon className="w-5 h-5" /> {label}
      </label>

      <div className="relative w-full">
        <input
          type={type}
          className="bg-zinc-50/10 rounded-md text-sm w-full p-3 pr-10"
          value={value}
          readOnly
        />

        <div onClick={onClick} title={SettingsMessage}>
            <Settings
              title="Editar"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 cursor-pointer hover:text-white"
            />
        </div>
      </div>
    </div>
  );
}
