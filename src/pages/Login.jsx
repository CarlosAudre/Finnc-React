import { useState } from "react";
import { Input } from "../components/Input";
import logo from "../assets/finnc_logo.png";
import { Submit } from "../components/Submit";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:8081/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); //Cria ou substitui uma chave chamada token no local storage e armazena o data.token
      toast.success("Login realizado com sucesso");
      console.log("Receba o token " + data.token);
      navigate("/");
    } else {
      toast.error("Credenciais inválidas");
    }
  }

  /*OBS: exemplo de como pedir o token para acessar os dados de uma pg
     fetch("http://localhost:8081/users", {
            headers: {
            Authorization: `Bearer ${token}`
  }
}) */

  return (
    <div className="w-full min-h-screen flex justify-around bg-linear-to-b text-neutral-100">
      {/*Lado imagem*/}
      <div className="hidden justify-center lg:flex flex-col text-center w-3/8 pb-50 bg-linear-to-br from-black to-blue-950">

        <div className=" flex flex-col gap-2 justify-center items-center">
          <img src={logo} alt="Logo" className="w-2/6" />
          <h1 className="text-4xl text-indigo-300 font-semibold ml-10">Finnc</h1>
        </div>

        <div className="mt-15">
          <h2 className=" text-3xl font-semibold ml-3">Domine suas finanças</h2>
          <p className="text-slate-300/70 mt-2 text-lg md:text-2xl ml-3">
            Simples, claro e eficiente
          </p>
        </div>
      </div>
      {/*Lado form*/}
      <div className="flex flex-col min-h-max w-full lg:w-7/8 bg-linear-to-tr from-sky-950 via-slate-700 to-slate-600">
        <nav className="flex flex-col sm:flex-row m-3 p-3 gap-4 sm:gap-8 items-center justify-end">
          <p className="text-sm md:text-base p-2">
            Ainda não possui uma conta?
          </p>
          <Link
            className="text-sm md:text-base hover:text-indigo-300 border-2 rounded-md p-2"
            to="/register"
          >
            Cadastre-se
          </Link>
        </nav>
        <div className=" flex flex-col text-center lg:hidden">
          <p className="text-sm text-slate-300/70 md:text-2xl ">
            Seja dominante de sí mesmo.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 items-center justify-center"
        >
          <div className="flex flex-col p-6 sm:p-10 w-[85%] lg:w-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl">
            <h1 className="lg:hidden text-center text-base text-indigo-400">
              Finnc
            </h1>
            <h2 className="text-2xl lg:text-3xl text-center py-5">Login</h2>
            <Input
              type="text"
              title="Email:"
              placeholder="Insira seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex flex-col pb-5">
              <Input
                type={isChecked ? "text" : "password"}
                title="Senha:"
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="flex gap-2 text-[13px] lg:text-base">
                <input
                  type="checkbox"
                  onChange={() => setIsChecked((prev) => !prev)}
                  className="text-start ml-3 cursor-pointer"
                />
                Mostrar senha
              </label>
            </div>
            <Submit title="Entrar" />
          </div>
        </form>
      </div>
    </div>
  );
}
