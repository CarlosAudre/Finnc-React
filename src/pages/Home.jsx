import { useEffect, useState } from "react";
import { ArrowRight, Wallet, Banknote, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";

export function Home() {
  const [userName, setUserName] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    //UseEffect its used when the function is executed only once
    async function getUserName() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token não encontrado");
        }
        const response = await fetch("http://localhost:8081/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Usuário não autenticado");
        }
        const data = await response.json();
        setUserName(data.name);
      } catch (err) {
        console.log(err.message);
      }
    }
    getUserName();
  }, []);

  return (
    <div className="flex flex-col w-auto h-screen md:p-3">
      <header className="flex flex-col md:flex-row justify-between p-3 m-3">
        <div className="flex flex-col gap-2">
          <h1
            className={"text-3xl font-semibold"}
          >{`Olá, ${userName ? userName : "Carregando usuário"}`}</h1>
          <p
            className={"text-slate-300/70 text-base"}
          >{`Aqui está seu resumo financeiro de fevereiro`}</p>
        </div>

        <div
          onClick={() => navigate("/expense")}
          className="flex justify-center items-center bg-linear-to-r from-violet-500 to-violet-900 rounded-md
         p-5 mt-3 w-50 md:w-auto h-12 cursor-pointer text-yellow-200 font-bold gap-1 hover:from-violet-600 hover:to-violet-950 
         transition-colors duration-300"
        >
          <p>Ver despesas</p>
          <ArrowRight />
        </div>
      </header>

      <main className="flex flex-col">
        <div
          className="p-5 gap-10 md:gap-5 lg:gap-15 grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-3"
        >
          <Card
            bgColor="bg-violet-500/15"
            bgIconColor="bg-violet-500"
            title="Saldo total"
            img={<Wallet />}
            balance="1500,00"
            date="Fevereiro 2026"
          />

          <Card
            bgColor="bg-[#E83343]/15"
            bgIconColor="bg-[#E83343]"
            title="Saldo total"
            img={<Banknote />}
            balance="1500,00"
            date="Fevereiro 2026"
          />

          <Card
            bgColor="bg-[#0e9c87]/15"
            bgIconColor="bg-[#0e9c87]"
            title="Saldo total"
            img={<PiggyBank />}
            balance="1500,00"
            date="Fevereiro 2026"
          />
        </div>

        <div></div>
      </main>
    </div>
  );
}
