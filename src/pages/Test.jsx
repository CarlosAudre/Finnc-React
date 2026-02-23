export function Test({msg, onNameClick, deleteMessage}) {
    return (
        <div className=" bg-gray-600 p-6 rounded-2xl">
            <h1 className="text-center">{msg.length < 1 && "Nenhuma mensagem encontrada"}</h1>

            <ul className="text-slate-950 space-y-4">{msg.map((m) =>              
                <li className="text-2xl flex gap-3">
                    <button className={`text-amber-100 bg-indigo-900 p-2 rounded-md w-full cursor-pointer ${m.isAdult && "line-through"}`}
                     onClick={()=> onNameClick(m.id)}>

                        {m.name + ": " +  m.age}
                        {m.isAdult === true ? ", Complete" : ", Incomplete"}

                    </button>

                    <button className={`text-amber-100 bg-indigo-900 p-2 rounded-md cursor-pointer`}
                    onClick={() => deleteMessage(m.id)}
                    > 
                        
                        {"Delete"}

                    </button>                
                </li>              
            )}</ul>
        </div>
    )
}