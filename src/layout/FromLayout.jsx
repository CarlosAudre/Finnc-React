export function FormLayout({ title, children, onSubmit}) {
  return (
    <div className={`flex fixed flex-col w-full  justify-center items-center`}>
      <div className="bg-neutral-900 lg:mr-80 p-5 rounded-2xl md:w-md xl:w-auto">
        <h1 className="ml-2">{title}</h1>
        <form onSubmit={onSubmit}>
          {children}
          </form>
      </div>
    </div>
  );
}
