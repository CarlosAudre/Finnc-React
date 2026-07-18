import { Button } from "@/components/Button";
import { AiMessage } from "@/components/ficAi/AiMessage";
import { UserMessage } from "@/components/ficAi/UserMessage";
import { m } from "framer-motion";
import { Bot, Key, Plus, Send, Trash, User } from "lucide-react";
import { use, useEffect, useState } from "react";

export function FincAi() {
  const apiUrl = "http://192.168.3.13:8081";
  //const apiUrl = "http://3.238.206.37:8081";

  const [userName, setUserName] = useState("");

  const [userEmail, setUserEmail] = useState("");

  const [message, setMessage] = useState("");

  const chatKey = `finnc-ai-messages-${userEmail}`;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!userEmail) return;

    const saved = sessionStorage.getItem(chatKey);

    try {
      setMessages(saved ? JSON.parse(saved) : []);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
      sessionStorage.removeItem(chatKey);
      setMessages([]);
    }
  }, [userEmail]);

  useEffect(() => {
    async function getUserName() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
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
        setUserName(data.name);
        setUserEmail(data.email);
      } catch (err) {
        console.log(err.message);
      }
    }
    getUserName();
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      `finnc-ai-messages-${userEmail}`,
      JSON.stringify(messages),
    );
  }, [messages]);

  function clearChat() {
    setMessages([]);
    sessionStorage.removeItem(`finnc-ai-messages-${userEmail}`);
  }

  async function sendMessage() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User not authenticated");
    }
    const response = await fetch(`${apiUrl}/ai/send`, {
      method: "Post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) {
      throw new Error("Error to send message");
    }
    return response.json();
  }

  async function handleSendMessageSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    const userMessage = message;
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: userMessage,
      },
    ]);
    setMessage("");
    const response = await sendMessage();
    setMessages((prev) => [
      ...prev,
      {
        type: "ai",
        content: response.output,
      },
    ]);
  }

  return (
    <div className="w-auto min-h-screen mb-15 md:h-screen md:mb-0 flex flex-col md:p-3 ml-3">
      <header className="flex flex-col md:flex-row gap-5 mt-3 mb-5">
        <Bot className="w-13 h-13 text-violet-500" />
        <div>
          <div className="flex flex-col">
            <h1 className="text-3xl text-[#5D5CF8] font-semibold">Finnc IA</h1>
            <p className="text-slate-300/80 text-base">
              Seu assistente financeiro inteligente
            </p>
          </div>
        </div>
        <div className="ml-auto pr-5 pb-1">
          <Button title="Apagar conversa" onClick={clearChat} />
        </div>
      </header>

      <main className="flex-1 flex flex-col bg-indigo-900/15 p-5 m-5  rounded-2xl">
        <AiMessage message={`Olá ${userName}, Como posso te ajudar hoje?`} />

        <div className="flex flex-col p-3 gap-5">
          {messages.map((m, index) =>
            m.type === "user" ? (
              <UserMessage key={index} message={m.content} />
            ) : (
              <AiMessage key={index} message={m.content} />
            ),
          )}
        </div>
        <div className="flex-1 overflow-y-auto"></div>
        <form onSubmit={handleSendMessageSubmit} className="p-4 relative">
          <input
            type="text"
            placeholder="Digite uma mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-500/50  focus:outline-none  focus:ring-2 focus:ring-gray-500/60 rounded-2xl p-5  "
          />
          <button
            type="submit"
            className="absolute ml-3 right-10 top-1/2 -translate-y-1/2  text-white cursor-pointer bg-indigo-700 p-3 rounded-2xl"
          >
            <Send className="h-6 w-6" />
          </button>
        </form>
      </main>
    </div>
  );
}
