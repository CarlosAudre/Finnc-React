import { ArrowRight } from "lucide-react";

export function Submit(props) {
  return (
    <div className="text-center w-full ">
      <button
        type={props.type}
        className="relative bg-linear-to-r from-violet-500 to-violet-900  hover:from-violet-600 hover:to-violet-950
            rounded-2xl w-full md:w-full cursor-pointer text-base p-3 "
      >
        {props.title}
        <ArrowRight className="absolute top-3 right-4"/>
      </button>
    </div>
  );
}
