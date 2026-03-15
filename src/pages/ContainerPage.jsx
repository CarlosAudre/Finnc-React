import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { ArrowLeft, Clock, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { months } from "../constants/MonthsValue";
import { containerColors } from "../constants/ContainerColors";
import { Expenses } from "../components/Expenses";
import { toast } from "sonner";
import { FormContainer } from "../forms/FormContainer";
import { Message } from "../components/Message";

export function ContainerPage() {
  //API URL---------------------------------------------------------------------------------------------
  const apiUrl = "http://localhost:8081";

  //Container Info-----------------------------------------------------------------------------------------
  const [containerTitle, setContainerTitle] = useState("");
  const [containerEndDate, setContainerEndDate] = useState("");
  const [containerBalance, setContainerBalance] = useState(0);
  const [containerColor, setContainerColor] = useState("");
  const [containerTotalSpent, setContainerTotalSpent] = useState(0);
  const [containerLimit, setContainerLimit] = useState(0);

  //Container Update-----------------------------------------------------------------------------------------
  const [containerTitleUpdate, setContainerTitleUpdate] = useState("");
  const [containerEndDateUpdate, setContainerEndDateUpdate] = useState("");
  const [containerBalanceUpdate, setContainerBalanceUpdate] = useState(0);
  const [containerColorUpdate, setContainerColorUpdate] = useState("PURPLE");
  const [containerTotalSpentUpdate, setContainerTotalSpentUpdate] = useState(0);
  const [containerLimitUpdate, setContainerLimitUpdate] = useState(0);
  const [formContainerVisibility, setFormContainerVisibility] = useState(false);

  //Delete Container-----------------------------------------------------------------------------------------
  const [deleteContainerVisibility, setDeleteContainerVisibility] =
    useState(false);

  //Formatted new Date-----------------------------------------------------------------------------------------
  useEffect(() => {
    if (!containerEndDate) return;
    const date = new Date(containerEndDate);
    const endYear = date.getFullYear();
    const endMonth = date.getMonth() + 1;
    const formatted = `${endYear}-${String(endMonth).padStart(2, "0")}`;
    setContainerEndDateUpdate(formatted);
  }, [containerEndDate]);

  //Expense Info-----------------------------------------------------------------------------------------

  //Convert Month-----------------------------------------------------------------------------------------
  function convertEndMonthToFullDate(monthValue) {
    const [year, month] = monthValue.split("-");
    const lastDate = new Date(year, month, 0).getDate();
    return `${monthValue}-${lastDate.toString().padStart(2, "0")}`;
  }

  //Container Info-----------------------------------------------------------------------------------------
  const { id, month, year } = useParams(); //------------------------- UseParams()

  useEffect(() => {
    async function getContainerInfo() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await fetch(
          `${apiUrl}/period/${year}/${month}/containers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        setContainerTitle(data.title);
        setContainerEndDate(data.endDate);
        setContainerBalance(data.totalValue);
        setContainerColor(data.color);

        setContainerTitleUpdate(data.title);
        setContainerBalanceUpdate(data.totalValue);
        setContainerColorUpdate(data.color);

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    getContainerInfo();
  }, [month, year, id]);

  //ContainerUpdate-----------------------------------------------------------------------------------------
  async function containerUpdate() {
    if (
      !containerTitleUpdate.trim() ||
      !containerBalanceUpdate ||
      !containerEndDateUpdate.trim()
    ) {
      toast.error("Preencha todos os campos");
      return null;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${apiUrl}/period/${year}/${month}/containers/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: containerTitleUpdate,
            totalValue: Number(containerBalanceUpdate),
            endDate: convertEndMonthToFullDate(containerEndDateUpdate),
            color: containerColorUpdate,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message);
        return null;
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      toast.error("Erro ao atualizar container");
      return null;
    }
  }
  //----------------------------------------------
  async function handleContainerUpdateSubmit(e) {
    e.preventDefault();

    const update = await containerUpdate();

    if (!update) return;

    setContainerTitle(containerTitleUpdate);
    setContainerEndDate(containerEndDateUpdate + "-31");
    setContainerBalance(containerBalanceUpdate);
    setContainerColor(containerColorUpdate);

    setFormContainerVisibility(false);

    toast.success("Container atualizado");
  }


  //AllContainerPeriod Delete-----------------------------------------------------------------------------------------
  async function deleteContainer() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/period/${year}/${month}/containers/${id}/all`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("STATUS:", response.status);
      navigate(`/period/${year}/${month}`);
    } catch (err) {
      console.log(err);
    }
  }

  //Container Status-----------------------------------------------------------------------------------------
  const containerStats = (
    <>
      <div className="flex justify-between md:flex-col text-center">
        <p className=" text-slate-300/70">Gasto</p>
        <p className="text-xl md:text-2xl font-semibold">{`R$ 101`}</p>
      </div>

      <div className="flex justify-between md:flex-col text-center">
        <p className=" text-slate-300/70">Disponível</p>
        <p className="text-xl md:text-2xl text-emerald-400 font-semibold">{`R$ ${containerBalance}`}</p>
      </div>

      <div className="flex justify-between md:flex-col text-center">
        <p className=" text-slate-300/70">Limite</p>
        <p className="text-xl md:text-2xl text-slate-300/90 font-semibold">{`R$ 101`}</p>
      </div>
    </>
  );

  //useNavigate
  const navigate = useNavigate();

  //monthFullName
  const monthFullName = months.find((m) => m.id === Number(month))?.fullName;
  //Container Color
  const color = containerColors[containerColor];

  return (
    <div className="h-screen max-w-5xl mx-auto flex flex-col p-3">
      <header className="flex flex-col md:flex-row justify-between pt-3 mt-10 m-3 md:mt-5">
        <div className="flex gap-2">
          <button
            title="Voltar"
            className="flex w-10 h-10 items-center justify-center bg-gray-800 rounded-md cursor-pointer"
            onClick={() => navigate(`/period/${year}/${month}`)}
          >
            <ArrowLeft />
          </button>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">{`${containerTitle}`}</h1>
            <p className="text-slate-300/70 text-base ml-1">{`${monthFullName} ${year}`}</p>
          </div>
        </div>
        <div className="flex flex-row-reverse md:flex-row justify-between items-center gap-8">
          <button
            title="Deletar Container"
            className="cursor-pointer p-3 bg-linear-to-r from-violet-500 to-violet-900 rounded-2xl h-13 mt-3
             hover:from-violet-600 hover:to-violet-950 transition-colors duration-300 "
            onClick={() => setDeleteContainerVisibility((prev) => !prev)}
          >
            <Trash />
          </button>
          <Button
            titleButton="Editar Container"
            title="Editar Container"
            onClick={() => setFormContainerVisibility((prev) => !prev)}
          />
        </div>
      </header>

      <main className="relative flex flex-col p-3">
        {/*Forms*/}
        {formContainerVisibility && (
          <div className="relative inset-0 w-full lg:w-6xl flex items-center justify-center">
            <div className="absolute flex w-full mb-15 justify-center max-w-md">
              <FormContainer
                titleValue={containerTitleUpdate}
                balanceValue={containerBalanceUpdate}
                endDateValue={containerEndDateUpdate}
                containerColorValue={containerColorUpdate}
                onColorChange={setContainerColorUpdate}
                onTitleChange={(e) => setContainerTitleUpdate(e.target.value)}
                onBalanceChange={(e) =>
                  setContainerBalanceUpdate(e.target.value)
                }
                onEndDateChange={(e) =>
                  setContainerEndDateUpdate(e.target.value)
                }
                onCancel={() => setFormContainerVisibility(false)}
                onSubmit={handleContainerUpdateSubmit}
              />
            </div>
          </div>
        )}

        {/*Messages*/}
        {deleteContainerVisibility && (
          <div className="relative inset-0 w-full flex items-center justify-center">
            <div className="absolute flex mb-15 justify-center mt-20">
              <Message
                message="Esta ação removerá o container de todos os meses."
                title1="Deletar container"
                title2="Deletar em todos os períodos"
                onClick={() => deleteContainer()}
                onCancel={() => setDeleteContainerVisibility((prev) => !prev)}
              />
            </div>
          </div>
        )}

        {/*Container Info*/}
        <div
          className={`flex flex-col ${color ? color.soft : "bg-none"} rounded-2xl p-5 md:p-8 gap-4`}
        >
          <div
            className={`flex text-sm font-semibold text-amber-300 ${containerColor === "YELLOW" ? "bg-gray-950/50" : "bg-amber-300/20"} w-fit  gap-2 p-3 rounded-md`}
          >
            <Clock className="w-5 h-5" />
            <p className="">{`Até ${containerEndDate}`}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            {/*Progress bar*/}
            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <div className="flex justify-between">
                <p className="text-base text-slate-300/70">
                  Progresso de gastos
                </p>
                <p>3%</p>
              </div>
              <div className="rounded-2xl h-3 bg-gray-700">
                <div
                  className={`rounded-2xl h-3 ${color ? color.solid : "bg-none"}`}
                  style={{ width: `3%` }}
                ></div>
              </div>
            </div>
            {/*ContainerStats*/}
            <div className="flex flex-col gap-3 md:flex-row md:gap-10">
              {containerStats}
            </div>
          </div>
        </div>

        {/*Expenses*/}
        <div>
          <Expenses />
        </div>
      </main>
    </div>
  );
}
