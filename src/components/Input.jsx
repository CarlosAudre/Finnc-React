export function Input(props){
    return(
        <div className="flex flex-col rounded-md p-2 w-auto lg:w-130 h-auto justify-center">
            <label className="text-sm text-amber-50">{props.title}</label>
            <input placeholder={props.placeholder} type={props.type} value={props.value} onChange={props.onChange}
             className='text-amber-50 text-sm md:w-sm xl:w-auto h-auto border-2 rounded-md border-amber-50/8 p-3'></input>
        </div>
    )
}