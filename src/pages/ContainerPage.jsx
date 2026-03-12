import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { ArrowLeft, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export function ContainerPage() {
  //Container Info
  const [containerTitle, setContainerTitle] = useState("");
  const [containerEndDate, setContainerEndDate] = useState("");
  const [containerBalance, setContainerBalance] = useState(0);
  const [containerTotalSpent, setContainerTotalSpent] = useState(0);
  const [containerColor, setContainerColor] = useState("");
  const [containerLimit, setContainerLimit] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function getContainerInfo() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8081/containers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setContainerTitle(data.title);
        setContainerEndDate(data.endDate);
        setContainerBalance(data.totalValue);
        setContainerColor(data.containerColor);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    getContainerInfo();
  }, [id]);

  return (
    <div className="h-screen max-w-5xl mx-auto flex flex-col p-3">
      <header className="flex flex-col md:flex-row justify-between p-3 mt-10 m-3 md:mt-5">
        <div className="flex gap-2">
          <button
            className="flex w-10 h-10 items-center justify-center bg-gray-800 rounded-md cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
          </button>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">{`${containerTitle}`}</h1>
            <p className="text-slate-300/70 text-base">Março 2026</p>
          </div>
        </div>
        <div>
          <Button title="Editar Container" />
        </div>
      </header>

      <main className="flex flex-col p-3">
        <div className="flex flex-col bg-violet-600/20 rounded-2xl p-5 md:p-8 gap-4">
          <div className="flex text-sm font-semibold text-amber-300 bg-amber-300/20 w-fit gap-2 p-3 rounded-md">
            <Clock className="w-5 h-5" />
            <p>{`Até ${containerEndDate}`}</p>
          </div>
          <div className="flex gap-5">
            {/*Progress bar*/}
            <div className="flex flex-col md:w-1/2 gap-2">
              <p className="text-slate-300/70">Progresso de gastos</p>
              <div className="rounded-2xl h-3 bg-gray-700">
                <div
                  className="rounded-2xl h-3 bg-violet-600"
                  style={{ width: `3%` }}
                ></div>
              </div>
            </div>
            {/*Info*/}
            <div className="flex gap-10">
              <div className="flex flex-col text-center">
                <p className="text-sm text-slate-300/70">Gasto</p>
                <p className="md:text-xl font-semibold">{`R$ 101`}</p>
              </div>
              <div className="flex flex-col text-center">
                <p className="text-sm text-slate-300/70">Disponível</p>
                <p className="md:text-xl text-emerald-400 font-semibold">{`R$ ${containerBalance}`}</p>
              </div>
              <div className="flex flex-col text-center">
                <p className="text-sm text-slate-300/70">Limite</p>
                <p className="md:text-xl text-slate-300/90 font-semibold">{`R$ 101`}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
