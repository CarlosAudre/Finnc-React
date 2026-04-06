import { ChartColumnIncreasing, Shield, TrendingUp } from "lucide-react";
import logo from "../../assets/finnc_logo.png";
import { AuthInfo } from "./AuthInfo";

const info = [
  {
    id: 1,
    title: "Resumo completo",
    info: "Veja seus gastos e economias em um só lugar",
    icon: <ChartColumnIncreasing />,
  },
  {
    id: 2,
    title: "Seguro e confiável",
    info: "Seus dados sempre protegidos com criptografia",
    icon: <Shield />,
  },
  {
    id: 3,
    title: "Tomada de decisão",
    info: "Insights que ajudam você a crescer",
    icon: <TrendingUp />,
  },
];

export function LeftPart() {
  return (
    <div className="hidden justify-center lg:flex flex-col text-center w-4/8 bg-linear-to-tl from-gray-950 from-75% via-violet-950 via-90% to-violet-900 to-100% ">
      <div className="pb-20 gap-20 flex flex-col max-w-lg mx-auto">
        <div className=" flex flex-col justify-center items-center">
          <img src={logo} alt="Logo" className="w-105 h-60" />
          <p className="-mt-23.5 ml-13 text-slate-300/70">Gestão financeira</p>
        </div>
        <div className="-mt-12 flex flex-col items-center text-left gap-3">
          <h2 className="text-[40px] font-semibold ml-3 leading-12">
            Domine suas <br />{" "}
            <strong className="text-violet-600">finanças</strong>
          </h2>
          <p className="text-slate-300/70 mt-2 ml-13 text-lg ">
            Simples, claro e eficiente para <br /> você tomar as melhores
            decisões
          </p>
        </div>
        <div className="flex flex-col gap-10">
          {info.map((i) => (
            <AuthInfo key={i.id} title={i.title} info={i.info} icon={i.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
