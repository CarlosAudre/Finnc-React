import { Button } from "@/components/Button";
import { FormButton } from "@/components/FormButton";
import { Input } from "@/components/Input";
import { FormLayout } from "@/layout/FormLayout";

export function FormProfile({
  value,
  type,
  title,
  placeHolder,
  onChange,
  onSubmit,
  onCancel,
  hasPasswordConfirmation,
  currentPasswordValue,
  onCurrentPassword,
}) {
  return (
    <FormLayout title={title} onSubmit={onSubmit}>
      {hasPasswordConfirmation && (
        <Input
          title="Digite sua senha atual"
          type="password"
          value={currentPasswordValue}
          onChange={onCurrentPassword}
        />
      )}
      <Input
        title={title}
        placeHolder={placeHolder}
        type={type}
        value={value}
        onChange={onChange}
      />

      <div className="flex justify-between w-full p-2">
        <FormButton
          title="Cancelar"
          type="button"
          bg="bg-linear-to-r from-fuchsia-900 to-fuchsia-950 rounded-md"
          hover={"hover:from-fuchsia-900 hover:to-fuchsia-800"}
          onClick={onCancel}
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
