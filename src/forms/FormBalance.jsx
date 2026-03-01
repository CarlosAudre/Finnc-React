import { FormButton } from "../components/FormButton";
import { Input } from "../components/Input";
import { FormLayout } from "../layout/FromLayout";

export function FormBalance({onChange, value, onCancel, onSubmit}){
    return(
        <FormLayout title="Definir saldo" onSubmit={onSubmit}>

            <Input title="Saldo total do mês" placeHolder="0" type="number" value={value} onChange={onChange}/>

            <div className="flex justify-between w-full p-2">
                 <FormButton
                  title="Cancelar"
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
    )
}