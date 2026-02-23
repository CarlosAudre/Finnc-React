import { useState } from "react"
import { Input } from "../components/Input"

export function AddMessage({handleSubmit}){

    const[name, setName] = useState("")
    const[age, setAge] = useState()

    return(
        <div className=" bg-gray-600 p-6 rounded-2xl">  
            <div className="flex flex-col space-y-5 text-2xl">

               {/* <Input 
                    placeholder = "Digite o nome"
                    type = "text"
                    value = {name}
                    onChange = {(event => setName(event.target.value))}
                />

                <Input 
                    placeholder = "Digite a idade"
                    type = "text"
                    value = {age}
                    onChange = {(event => setAge(event.target.value))}
                />

                 */}

        
                <button type="submit" className=" bg-indigo-900 p-2 cursor-pointer rounded-md"
                onClick={() => {
                    if(!name.trim() || !age.trim()){
                        return alert("Preencha algo plmns")
                    }

                    handleSubmit(name, age),
                    setName(""),
                    setAge("")}}
                >Adicionar</button>
                
            </div>
        </div>
    )
}