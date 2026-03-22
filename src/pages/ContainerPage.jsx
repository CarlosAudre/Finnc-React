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
import { FormExpense } from "../forms/FormExpense";

export function ContainerPage() {
  //API URL---------------------------------------------------------------------------------------------
  const apiUrl = "http://192.168.3.13:8081";

  //Container Info-----------------------------------------------------------------------------------------
  const [containerTitle, setContainerTitle] = useState("");
  const [containerEndDate, setContainerEndDate] = useState("");
  const [containerBalance, setContainerBalance] = useState(0);
  const [containerColor, setContainerColor] = useState("");
  const [containerTotalSpent, setContainerTotalSpent] = useState(0);
  const [containerLimit, setContainerLimit] = useState(0);
  const [containerPercent, setContainerPercent] = useState(0);

  //Container Update-----------------------------------------------------------------------------------------
  const [containerTitleUpdate, setContainerTitleUpdate] = useState("");
  const [containerEndDateUpdate, setContainerEndDateUpdate] = useState("");
  const [containerBalanceUpdate, setContainerBalanceUpdate] = useState();
  const [containerColorUpdate, setContainerColorUpdate] = useState("PURPLE");
  const [formContainerVisibility, setFormContainerVisibility] = useState(false);

  //Expense Info-----------------------------------------------------------------------------------------
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseValue, setExpenseValue] = useState("");
  const [expenseEndDate, setExpenseEndDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expensesVisibility, setExpensesVisibility] = useState(false);
  const [formExpenseVisibility, setFormExpenseVisibility] = useState(false);
  const [formExpenseUpdateVisibility, setFormExpenseUpdateVisibility] =
    useState(false);
  const [expenseId, setExpenseId] = useState("");

  //Expense Update
  const [expenseTitleUpdate, setExpenseTitleUpdate] = useState("");
  const [expenseValueUpdate, setExpenseValueUpdate] = useState("");
  const [expenseEndDateUpdate, setExpenseEndDateUpdate] = useState("");

  //Start Date--------------------------------------------------------------------------------------------
  const todayDate = new Date();
  const firstMonthDay = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    1,
  );
  const startDateFormatted = firstMonthDay.toISOString().split("T")[0];

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

  //Convert Month-----------------------------------------------------------------------------------------
  function convertEndMonthToFullDate(monthValue) {
    const [year, month] = monthValue.split("-");
    const lastDate = new Date(year, month, 0).getDate();
    return `${monthValue}-${lastDate.toString().padStart(2, "0")}`;
  }

  //Get Container-----------------------------------------------------------------------------------------
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
        setContainerTotalSpent(data.totalSpent);
        setContainerLimit(data.economy);
        setContainerColor(data.color);
        setExpenses(data.expenseDtos);

        if (expenses.length > 0) {
          setExpensesVisibility(true);
        }

        setContainerPercent(
          ((data.totalSpent / data.totalValue) * 100).toFixed(1),
        );

        setContainerTitleUpdate(data.title);
        setContainerBalanceUpdate(data.totalValue);
        setContainerColorUpdate(data.color);
      } catch (err) {
        console.log(err);
      }
    }
    getContainerInfo();
  }, [month, year, id, expenses.length]);

  //ContainerUpdate-----------------------------------------------------------------------------------------
  async function containerUpdate() {
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  //----------------------------------------------
  async function handleContainerUpdateSubmit(e) {
    e.preventDefault();

    if (
      !containerTitleUpdate.trim() ||
      !containerBalanceUpdate ||
      !containerEndDateUpdate.trim()
    ) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      await containerUpdate();

      setContainerTitle(containerTitleUpdate);
      setContainerEndDate(containerEndDateUpdate + "-31");
      setContainerBalance(containerBalanceUpdate);
      setContainerColor(containerColorUpdate);
      const newContainerLimit = containerBalanceUpdate - containerTotalSpent;
      setContainerLimit(newContainerLimit);

      setFormContainerVisibility(false);

      toast.success("Container atualizado");
    } catch (err) {
      toast.error(err.message || "Erro ao atualizar container");
    }
  }

  //AllContainerPeriod Delete-----------------------------------------------------------------------------------------
  async function deleteContainer() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${apiUrl}/period/${year}/${month}/containers/${id}/all`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      navigate(`/period/${year}/${month}`);
    } catch (err) {
      toast.error(err.message);
    }
  }

  //Create Expense-------------------------------------------------------------------------------------------
  async function createExpense() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/${id}/expense`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: expenseTitle,
        value: Number(expenseValue),
        startDate: startDateFormatted,
        endDate: convertEndMonthToFullDate(expenseEndDate),
      }),
    });
    return await response.json();
  }

  async function handleCreateExpense(e) {
    e.preventDefault();
    if (
      !expenseTitle.trim() ||
      !expenseValue.trim() ||
      !expenseEndDate.trim()
    ) {
      toast.error("Preencha todos os campos");
      return;
    }
    try {
      const response = await createExpense();
      console.log(response);
      const formattedExpense = {
        id: response.id,
        title: response.title,
        value: response.value,
        endDate: response.endDate,
        startDate: response.startDate,
      };
      setExpenses((prev) => [...prev, formattedExpense]);
      setFormExpenseVisibility((prev) => !prev);
      setExpensesVisibility(true);
      toast.success("Despesa criada");
    } catch (err) {
      toast.error(err.message);
    }
  }

  //Update Expense-------------------------------------------------------------------------------------------
  async function updateExpense() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/${id}/expense/${expenseId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: expenseTitleUpdate,
        value: Number(expenseValueUpdate),
        endDate: convertEndMonthToFullDate(expenseEndDateUpdate),
      }),
    });
    return await response.json();
  }

  async function handleUpdateExpense(e) {
    e.preventDefault();
    if (
      !expenseTitleUpdate.trim() ||
      !expenseValueUpdate.trim() ||
      !expenseEndDateUpdate.trim()
    ) {
      toast.error("Preencha todos os campos");
      return;
    }
    try {
      const update = await updateExpense();
      const containerNewTotalSpent =
        Number(containerTotalSpent) +
        Number(expenseValueUpdate) -
        Number(expenseValue);
      const containerNewLimit =
        Number(containerBalance) - Number(containerNewTotalSpent);
      setExpenses((prev) => prev.map((e) => (e.id === expenseId ? update : e)));
      setContainerTotalSpent(containerNewTotalSpent);
      setContainerLimit(containerNewLimit);

      setFormExpenseUpdateVisibility((prev) => !prev);
      toast.success("Despesa salva");
    } catch (err) {
      toast.error(err.message);
    }
  }

  //On Expense Card Click--------------------------------------------------------------------------------------------------------
  function onCardClick(id) {
    setFormExpenseUpdateVisibility((prev) => !prev);
    setExpenseId(id);
  }
  console.log("Expense id: ", expenseId);

  //Delete Expense-----------------------------------------------------------------------------------------
  async function deleteExpense() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/${id}/expense/${expenseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar");
      }
      setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
      setFormExpenseUpdateVisibility((prev => !prev))
      toast.success("Despesa removida")
    } catch (err) {
      toast.error(err.message);
    }
  }
  //Container Status-----------------------------------------------------------------------------------------
  const containerStats = (
    <>
      <div className="flex justify-between md:flex-col text-center">
        <p className=" text-slate-300/70">Gasto</p>
        <p className="text-xl md:text-2xl font-semibold">{`R$ ${containerTotalSpent}`}</p>
      </div>

      <div className="flex justify-between md:flex-col text-center">
        <p className=" text-slate-300/70">Disponível</p>
        <p className="text-xl md:text-2xl text-emerald-400 font-semibold">{`R$ ${containerBalance}`}</p>
      </div>

      <div className="flex justify-between md:flex-col text-center">
        <p className=" text-slate-300/70">Limite</p>
        <p className="text-xl md:text-2xl text-slate-300/90 font-semibold">{`R$ ${containerLimit}`}</p>
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
    <div className="min-h-screen mb-15 md:h-screen md:mb-0 max-w-5xl mx-auto flex flex-col p-3">
      <header className="flex flex-col md:flex-row justify-between pt-3 m-3 mt-5">
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
        <div className="flex flex-row-reverse md:flex-row justify-between items-center gap-8 mx-1">
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

      <main className="relative flex flex-col p-3 ">
        {/*Forms*/}

        {/*Update container*/}
        {formContainerVisibility && (
          <div className="relative inset-0 w-full lg:w-6xl flex items-center justify-center">
            <div className="absolute flex w-full mb-15 justify-center max-w-md">
              <FormContainer
                title="Editar Container"
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

        {/*Create expense*/}
        {formExpenseVisibility && (
          <div className="relative inset-0 w-full lg:w-6xl flex items-center justify-center">
            <div className="absolute flex w-full mb-15 justify-center max-w-md">
              <FormExpense
                onCancel={() => setFormExpenseVisibility((prev) => !prev)}
                onSubmit={handleCreateExpense}
                titleValue={expenseTitle}
                value={expenseValue}
                endDateValue={expenseEndDate}
                onTitleChange={(e) => setExpenseTitle(e.target.value)}
                onValueChange={(e) => setExpenseValue(e.target.value)}
                onEndDateChange={(e) => setExpenseEndDate(e.target.value)}
              />
            </div>
          </div>
        )}
        {/*Expenes update*/}
        {formExpenseUpdateVisibility && (
          <div className="relative inset-0 w-full lg:w-6xl flex items-center justify-center">
            <div className="absolute flex w-full mb-15 justify-center max-w-md">
              <FormExpense
                title="Editar despesa"
                onCancel={() => setFormExpenseUpdateVisibility((prev) => !prev)}
                onSubmit={handleUpdateExpense}
                onDelete={deleteExpense}
                titleValue={expenseTitleUpdate}
                value={expenseValueUpdate}
                endDateValue={expenseEndDateUpdate}
                onTitleChange={(e) => setExpenseTitleUpdate(e.target.value)}
                onValueChange={(e) => setExpenseValueUpdate(e.target.value)}
                onEndDateChange={(e) => setExpenseEndDateUpdate(e.target.value)}
                trashVisibility={true}
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
                <p>{containerPercent}</p>
              </div>
              <div className="rounded-2xl h-3 bg-gray-700">
                <div
                  className={`rounded-2xl h-3 ${color ? color.solid : "bg-none"}`}
                  style={{ width: `${containerPercent}%` }}
                ></div>
              </div>
            </div>
            {/*ContainerStats*/}
            <div className="flex flex-col gap-3 md:flex-row md:gap-10">
              {containerStats}
            </div>
          </div>
        </div>

        {/*Expenses-----------------------------------------------------------------------------------*/}
        <div>
          <Expenses
            onClick={() => setFormExpenseVisibility((prev) => !prev)}
            onCardClick={onCardClick}
            expenses={expenses}
            expensesVisibility={expensesVisibility}
          />
        </div>
      </main>
    </div>
  );
}
