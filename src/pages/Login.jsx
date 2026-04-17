import { useState } from "react";
import { Input } from "../components/Input";
import logo from "../assets/finnc_logo.png";
import { Submit } from "../components/Submit";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LeftPart } from "@/components/auth/LeftPart";
import { Mail, Lock } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    //API URL---------------------------------------------------------------------------------------------
    const apiUrl = "http://192.168.3.13:8081";

    const response = await fetch(`${apiUrl}/auth/login`, {
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

  return (
    <div className="w-full  min-h-screen flex  bg-linear-to-b text-neutral-100">
      <LeftPart />

      {/*Lado form*/}
      <div className="flex flex-col min-h-max w-full lg:w-7/8 bg-linear-to-br from-[#12182D] from-75% to-violet-950 to-100%">
        <nav className="relative flex flex-col sm:flex-row m-3 p-3 gap-4 sm:gap-8 items-center justify-end">
          <div className="w-full lg:hidden">
            <img
              className="flex w-35 h-22 absolute -top-6 -left-5"
              src={logo}
              alt="Logo"
            ></img>
          </div>
          <p className="text-sm md:text-base">
            Ainda não possui uma conta?
          </p>
          <Link
            className="text-sm md:text-base hover:text-violet-400 hover:border-violet-600 border-2 rounded-md p-2"
            to="/register"
          >
            Cadastre-se
          </Link>
        </nav>
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 items-center justify-center"
        >
          <div
            className="flex flex-col  justify-center items-center mb-50 p-6 sm:p-10 w-[85%] lg:w-auto
           bg-blue-950/10 backdrop-blur-md border-2 border-white/10 rounded-2xl shadow-xl "
          >
            <div className="flex flex-col text-center leading-2 mb-10">
              <h2 className="text-2xl lg:text-3xl text-center py-5">
                <strong className="text-violet-500">Bem-vindo</strong> de volta
              </h2>
              <p className="text-slate-300/70 text-sm md:text-base leading-0">
                Faça login para acessar sua conta
              </p>
            </div>
            <Input
              type="text"
              title="Email:"
              placeholder="Insira seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              Icon={Mail}
            />
            <div className="flex flex-col pb-5">
              <Input
                type={isChecked ? "text" : "password"}
                title="Senha:"
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                Icon={Lock}
              />
              <label className="flex gap-2 text-[13px] lg:text-base">
                <input
                  type="checkbox"
                  onChange={() => setIsChecked((prev) => !prev)}
                  className="text-start ml-3 cursor-point  accent-violet-500"
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
