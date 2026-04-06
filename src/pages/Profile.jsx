import { Message } from "@/components/Message";
import { ProfileField } from "@/components/profile/ProfileField";
import { FormProfile } from "@/forms/FormProfile";
import {
  User,
  Mail,
  LogOut,
  Camera,
  Lock,
  Settings,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function Profile() {
  //API URL---------------------------------------------------------------------------------------------
  const apiUrl = "http://192.168.3.13:8081";

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [changeUserName, setChangeUserName] = useState("");
  const [changeUserEmail, setChangeUserEmail] = useState("");
  const [changeUserPassword, setChangeUserPassword] = useState("");
  const [currentUserPassword, setCurrentUserPassword] = useState("");

  const [formChangeNameVisibility, setFormChangeNameVisibility] =
    useState(false);
  const [formChangeEmailVisibility, setFormChangeEmailVisibility] =
    useState(false);
  const [formChangePasswordVisibility, setFormChangePasswordVisibility] =
    useState(false);

  // 👇 imagem
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  //GetUser-----------------------------------------------------------------------------------------------
  useEffect(() => {
    async function getUserName() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await fetch(`${apiUrl}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("User not authenticated");
        }

        const data = await response.json();
        console.log(data);
        setUserName(data.name);
        setUserEmail(data.email);
        setUserImage(data.imgUrl);
      } catch (err) {
        console.log(err.message);
      }
    }

    getUserName();
  }, []);

  //Update UserName----------------------------------------------------------------------------------------
  async function updateUserName() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User not authenticated");
    }
    const response = await fetch(`${apiUrl}/me/name`, {
      method: "Put",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: changeUserName.trim() }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  }

  async function handleUpdateUserName(e) {
    e.preventDefault();

    const nameRegex = /^[A-Za-zÀ-ÿ\s]{4,}$/;

    if (!changeUserName.trim()) {
      toast.error("Preencha o campo");
      return;
    }

    if (!nameRegex.test(changeUserName.trim())) {
      toast.error("Nome deve ter pelo menos 4 letras e conter apenas letras");
      return;
    }

    try {
      const update = await updateUserName();
      setUserName(update.name);
      toast("Nome de usuário atualizado");
      setFormChangeNameVisibility((prev) => !prev);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  }

  //Update UserPhoto----------------------------------------------------------------------------------------
  async function updateUserPhoto(photo) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User not authenticated");
    }
    const response = await fetch(`${apiUrl}/me/photo`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ photo }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  }

  //Update UserEmail----------------------------------------------------------------------------------------
  async function updateUserEmail() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${apiUrl}/me/email`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: changeUserEmail.trim(),
        password: currentUserPassword.trim(),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  }

  async function handleUpdateUserEmail(e) {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!changeUserEmail.trim()) {
      toast.error("Preencha o campo");
      return;
    }

    if (!emailRegex.test(changeUserEmail.trim())) {
      toast.error("O novo email inserido é inválido");
      return;
    }

    try {
      const updatedUser = await updateUserEmail();
      setUserEmail(updatedUser.email);
      toast.success("Email do usuário atualizado");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  }

  //Update UserPassword----------------------------------------------------------------------------------------
  async function updateUserPassword() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${apiUrl}/me/password`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword: currentUserPassword.trim(),
        newPassword: changeUserPassword.trim(),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  }

  async function handleUpdateUserPassword(e) {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!currentUserPassword.trim()) {
      toast.error("Digite sua senha atual");
      return;
    }

    if (!changeUserPassword.trim()) {
      toast.error("Preencha o campo");
      return;
    }

    if (!passwordRegex.test(changeUserPassword.trim())) {
      toast.error("A nova senha inserida é inválida");
      return;
    }

    try {
      await updateUserPassword();

      toast.success("Senha atualizada com sucesso");

      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  }

  // 👇 selector
  function handleClick() {
    fileInputRef.current.click();
  }

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);

      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64 = reader.result;

        setUserImage(base64);

        try {
          await updateUserPhoto(base64);
          toast.success("Foto atualizada");
        } catch (err) {
          toast.error(err.message);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  // cleanMemore
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  //Logout---------------------------------------------------------------------------------------------
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="min-h-screen md:h-screen max-w-7xl mx-auto flex flex-col p-3 pb-20  ">
      <header className="flex flex-col pl-2 mb-3 mt-3 gap-2">
        <h1 className="font-semibold text-[#5D5CF8] text-3xl">Perfil</h1>
        <p className="text-gray-400/90">Gerencie suas informações pessoais</p>
      </header>

      <main className="flex flex-col flex-1 w-full gap-5">
        {/* CARD PERFIL */}
        <div
          className="relative flex flex-col xl:flex-row bg-zinc-50/5 border-2 border-zinc-50/10 rounded-2xl 
        justify-center items-center xl:justify-between py-5 xl:py-6 md:px-10 gap-6 w-full"
        >
          {/* Left */}
          <div className="flex flex-col xl:flex-row items-center gap-4 text-center xl:text-left">
            <div
              onClick={handleClick}
              className={`relative group flex ${
                image || userImage
                  ? ""
                  : "bg-linear-to-r from-[#3B1BB8] to-[#3246e1]"
              } rounded-full p-3 cursor-pointer`}
            >
              {image || userImage ? (
                <img
                  src={image || userImage}
                  className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full"
                />
              ) : (
                <User className="w-25 h-25 md:w-30 md:h-30" />
              )}

              <div className="absolute top-2 right-5 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-zinc-50/20 backdrop-blur-sm rounded-md p-1">
                <Camera className="text-gray-200 w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl md:text-3xl font-semibold">{userName}</h2>
              <p className="text-gray-400/90 text-sm md:text-base">
                {userEmail}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex gap-3 bg-gray-400/15 px-6 py-4 rounded-2xl items-center justify-center">
            <div className="flex p-3 bg-linear-to-r from-[#3B1BB8] to-[#3246e1] border-indigo-400 border rounded-full">
              <User />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm text-zinc-50/70">Membro desde</p>
              <p>Abril 2026</p>
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* FORMS */}
        {formChangeNameVisibility && (
          <div className="w-full fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <FormProfile
              title="Alterar nome"
              value={changeUserName}
              type="text"
              onChange={(e) => setChangeUserName(e.target.value)}
              onCancel={() => setFormChangeNameVisibility(false)}
              onSubmit={handleUpdateUserName}
            />
          </div>
        )}

        {formChangeEmailVisibility && (
          <div className="w-full fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <FormProfile
              title="Digite seu novo email"
              value={changeUserEmail}
              type="text"
              onCancel={() => setFormChangeEmailVisibility(false)}
              onChange={(e) => setChangeUserEmail(e.target.value)}
              onSubmit={handleUpdateUserEmail}
              hasPasswordConfirmation
              currentPasswordValue={currentUserPassword}
              onCurrentPassword={(e) => setCurrentUserPassword(e.target.value)}
            />
          </div>
        )}

        {formChangePasswordVisibility && (
          <div className="w-full fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <FormProfile
              value={changeUserPassword}
              type="password"
              title="Digite sua nova senha"
              onCancel={() => setFormChangePasswordVisibility(false)}
              onChange={(e) => setChangeUserPassword(e.target.value)}
              onSubmit={handleUpdateUserPassword}
              hasPasswordConfirmation
              currentPasswordValue={currentUserPassword}
              onCurrentPassword={(e) => setCurrentUserPassword(e.target.value)}
            />
          </div>
        )}

        {/* FORM DATA */}
        <div className="flex flex-col bg-zinc-50/5 border-2 border-zinc-50/10 rounded-2xl p-5 py-10 gap-5">
          <div className="flex flex-col gap-2 mb-5">
            <div className="flex font-semibold gap-3">
              <Settings />
              <h2>Informações da conta</h2>
            </div>
            <p className="text-zinc-50/70 text-sm">
              Mantenha seus dados atualizados para uma melhor experiência
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-10">
            <div className="flex flex-col gap-5 w-full xl:w-2/3">
              <ProfileField
                label="Nome"
                Icon={User}
                value={userName}
                SettingsMessage="Alterar nome"
                onClick={() => setFormChangeNameVisibility(true)}
              />
              <ProfileField
                label="Email"
                Icon={Mail}
                value={userEmail}
                SettingsMessage="Alterar email"
                onClick={() => setFormChangeEmailVisibility(true)}
              />
              <ProfileField
                label="Senha"
                Icon={Lock}
                value="********"
                type="password"
                SettingsMessage="Alterar senha"
                onClick={() => setFormChangePasswordVisibility(true)}
              />
            </div>

            <div className="flex flex-col w-full xl:w-1/3 bg-zinc-50/5 border-2 border-zinc-50/10 rounded-2xl p-6 gap-3">
              <ShieldCheck className="text-violet-600 w-12 h-12" />
              <p className="text-lg text-violet-400">
                Segurança em primeiro lugar
              </p>
              <p className="text-sm text-zinc-50/80">
                Seus dados são protegidos com criptografia e boas práticas
              </p>
              <a
                className="flex gap-2 text-indigo-400 hover:text-indigo-500"
                href="https://www.cloudflare.com/pt-br/learning/ssl/what-is-encryption/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Saiba mais <ArrowRight />
              </a>
            </div>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-auto border-2 border-red-400/20 text-red-400/90 p-3 rounded-2xl cursor-pointer hover:text-red-400 hover:border-red-400/40"
        >
          <p className="flex justify-center items-center gap-2">
            <LogOut /> Sair da conta
          </p>
        </button>
      </main>
    </div>
  );
}
