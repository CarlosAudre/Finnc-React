export function Submit(props){
    return(
        <div className="text-center">
            <button type={props.type} 
            className=" bg-indigo-800 rounded-md hover:bg-indigo-600  lg:w-sm cursor-pointer text-base p-3 ">{props.title}</button>
        </div>
    )
}