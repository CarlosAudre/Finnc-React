export function FormLayout({ title, children, onSubmit}) {
  return (
    <div className={`flex fixed flex-col w-full justify-center items-center -mt-20 md:mt-6`}>
      <div className="bg-slate-950/75 backdrop-blur-md lg:mr-80 p-5 rounded-2xl md:w-md xl:w-auto">
        <h1 className="ml-2 font-semibold text-lg mb-4">{title}</h1>
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          {children}
          </form>
      </div>
    </div>
  );
}
