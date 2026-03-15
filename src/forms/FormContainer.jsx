import { ContainerColorSelect } from "../components/ContainerColorSelect";
import { FormButton } from "../components/FormButton";
import { Input } from "../components/Input";
import { FormLayout } from "../layout/FormLayout";

export function FormContainer({
  titlePlaceHolder,
  balancePlaceHolder,
  titleValue,
  balanceValue,
  endDateValue,
  containerColorValue,
  onColorChange,
  onTitleChange,
  onBalanceChange,
  onEndDateChange,
  onCancel,
  onSubmit,
}) {
  const borderColor = "border-2 border-white p-0.5 bg-clip-content";

  const containerColors = [
    { name: "PURPLE", class: "bg-violet-600", hover: "bg-violet-700" },
    { name: "BLUE", class: "bg-blue-500", hover: "bg-blue-600" },
    { name: "GREEN", class: "bg-emerald-500", hover: "bg-emerald-600" },
    { name: "YELLOW", class: "bg-yellow-500", hover: "bg-yellow-600" },
    { name: "RED", class: "bg-rose-500", hover: "bg-rose-600" },
  ];

  return (
    <FormLayout title="Novo container" onSubmit={onSubmit}>
      <Input
        title="Título"
        type="text"
        value={titleValue}
        onChange={onTitleChange}
        placeholder="Ex: Viagem"
      />

      <Input
        title="Saldo máximo"
        type="number"
        value={balanceValue}
        onChange={onBalanceChange}
        placeholder="R$ 0,00"
      />

      <Input
        title="Data de fim"
        type="month"
        value={endDateValue}
        onChange={onEndDateChange}
      />

      <div className="flex flex-col p-2 gap-3">
        <p className="text-sm">Cor</p>

        <div className="flex gap-2">
          {containerColors.map((color) => (
            <ContainerColorSelect
              key={color.name}
              onClick={() => onColorChange(color.name)}
              colorOn={`${
                containerColorValue === color.name
                  ? `${color.class} ${borderColor}`
                  : color.hover
              }`}
            />
          ))}
        </div>
      </div>

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
