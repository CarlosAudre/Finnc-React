import { useState } from "react";
import { Input } from "../components/Input";
import logo from "../assets/finnc_logo.png";
import { Submit } from "../components/Submit";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { LeftPart } from "@/components/auth/LeftPart";
import { Mail, Lock, User } from "lucide-react";

export function Register() {
  const apiUrl = "http://192.168.3.13:8081";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); //impedir que recarregue a página

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      return toast.error("Preencha todos os campos");
    }

    const nameRegex = /^[A-Za-zÀ-ÿ\s]{4,}$/;
    if (!nameRegex.test(name.trim())) {
      return toast.error(
        "Nome deve ter pelo menos 4 letras e conter apenas letras",
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Email inválido");
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return toast.info(
        "Senha deve ter 8 caracteres, letra, número e especial",
      );
    }

    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (response.ok) {
      toast.success("Cadastro realizado com sucesso");
      navigate("/login");
    } else {
      const error = await response.json();
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-around bg-linear-to-b text-neutral-100">
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
          <p className="text-sm md:text-base mt-3">Já possui uma conta?</p>
          <Link
            className="text-sm md:text-base  hover:text-violet-400 hover:border-violet-600 border-2 rounded-md p-2"
            to="/login"
          >
            Fazer login
          </Link>
        </nav>
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 items-center justify-center"
        >
          <div
            className="flex flex-col justify-center items-center mb-38 p-6 sm:p-10 w-[85%] lg:w-auto
           bg-blue-950/10 backdrop-blur-md border-2 border-white/10 rounded-2xl shadow-xl "
          >
            <h2 className="text-base lg:text-3xl text-center py-5">
              Criar nova conta
            </h2>

            <Input
              type="text"
              title="Nome:"
              placeholder="Ex: José Almeida"
              value={name}
              onChange={(e) => setName(e.target.value)}
              Icon={User}
            />

            <Input
              type="text"
              title="Email:"
              placeholder="Ex: jose@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              Icon={Mail}
            />

            <div className="flex flex-col pb-5">
              <Input
                type={isChecked ? "text" : "password"}
                title="Senha:"
                placeholder="Ex: 325498jk@GEX"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                Icon={Lock}
              />
              <label className="flex gap-2">
                <input
                  type="checkbox"
                  onChange={() => setIsChecked((prev) => !prev)}
                  className="text-start ml-3 cursor-pointer"
                />
                Mostrar senha
              </label>
            </div>

            <Submit type="submit" title="Cadastrar-se" />
          </div>
        </form>
      </div>
    </div>
  );
}
