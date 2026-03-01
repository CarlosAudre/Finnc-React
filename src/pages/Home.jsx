import { useEffect, useState } from "react";
import { ArrowRight, Wallet, Banknote, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

export function Home() {
  const [userName, setUserName] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    //UseEffect its used when the function is executed only once
    async function getUserName() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await fetch("http://localhost:8081/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("User not authenticated");
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
      <header className="flex flex-col md:flex-row justify-between p-3 m-3 mt-10 md:mt-5">
        <div className="flex flex-col gap-2">
          <h1
            className={"text-3xl font-semibold"}
          >{`Olá, ${userName ? userName : "Carregando usuário"}`}</h1>
          <p
            className={"text-slate-300/70 text-base"}
          >{`Aqui está seu resumo financeiro de fevereiro`}</p>
        </div>

        <Button title="Ver despesas" onClick={() => navigate("/period")} img={<ArrowRight/>} />
      </header>

      <main className="flex flex-col">
        <div
          className="p-5 gap-10 md:gap-5 lg:gap-15 grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-3"
        >
          <Card //Cria um fetch que muda as datas com base na url
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
