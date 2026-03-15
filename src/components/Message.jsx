import { useState } from "react";
import { FormButton } from "./FormButton";

export function Message({ message, onClick, onCancel, title1, title2 }) {
    const [isChecked, setIsChecked] = useState(false)
  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 md:bg-gray-900/40 backdrop-blur-md px-5 pb-5 pt-8 text-center gap-5 rounded-md w-full">
      <h2 className="text-md md:text-lg text-red-300 font-semibold">{message}</h2>
      <div className="flex flex-col w-full gap-3">
        <div className="flex justify-between w-full p-2">
          <FormButton
            title="Cancelar"
            onClick={onCancel}
            bg="bg-linear-to-r from-fuchsia-900 to-fuchsia-950 rounded-md"
            hover={"hover:from-fuchsia-900 hover:to-fuchsia-800"}
          />
          <FormButton
          title={title1}
            onClick={onClick}           
            bg="bg-linear-to-r from-violet-500 to-violet-900 rounded-md"
            hover={"hover:from-violet-600 hover:to-violet-950"}
          />
        </div>

      </div>
    </div>
  );
}
