import { FormButton } from "../components/FormButton";
import { Input } from "../components/Input";
import { FormLayout } from "../layout/FormLayout";
import { Trash } from "lucide-react";

export function FormExpense({
  title,
  onSubmit,
  onDelete,
  onCancel,
  titleValue,
  onTitleChange,
  value,
  onValueChange,
  endDateValue,
  onEndDateChange,
  trashVisibility,
  

}) {
  return (
    <FormLayout title={title ? title : "Nova despesa"} onSubmit={onSubmit} trashVisibility={trashVisibility} onDelete={onDelete}>
      <Input
        title="Título"
        type="text"
        value={titleValue}
        onChange={onTitleChange}
        placeholder="Ex: Sorvete"
      />

      <Input
        title="Valor da despesa"
        type="number"
        value={value}
        onChange={onValueChange}
        placeholder="R$ 0,00"
      />

      <Input
        title="Data de fim (Dentro do prazo do container)"
        type="month"
        value={endDateValue}
        onChange={onEndDateChange}
      />

       <div className="flex justify-between w-full p-2">
        <FormButton
          title="Cancelar"
          onClick={onCancel}
          bg="bg-linear-to-r from-fuchsia-900 to-fuchsia-950 rounded-md"
          hover={"hover:from-fuchsia-900 hover:to-fuchsia-800"}
        />

        <FormButton
          title="Enviar"
          type="submit"
          bg="bg-linear-to-r from-violet-500 to-violet-900 rounded-md"
          hover={"hover:from-violet-600 hover:to-violet-950"}
        />
      </div>

      
    </FormLayout>
  );
}
