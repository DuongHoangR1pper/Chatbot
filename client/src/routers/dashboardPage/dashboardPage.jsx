import React from "react";
import "./dashboardPage.scss";
import a from "../../assets/logo.png";
import chat from "../../assets/chat.png";
import image from "../../assets/image.png";
import code from "../../assets/code.png";
import arrow from "../../assets/arrow.png";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
export default function DashboardPage() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (data) => {
      console.log("🟢 API Response:", data); // Log response để debug
      console.log("🔹 Chat ID:", data?.chatId); // Kiểm tra giá trị chatId
    
      if (data?.chatId) {
        queryClient.invalidateQueries({ queryKey: ["userChats"] });
        navigate(`/dashboard/chats/${data.chatId}`);
      } else {
        console.error("Invalid response format: Expected { chatId }, but got:", data);
      }
    },
    
    
  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text);
  };
  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src={a} alt="" />
          <h1>AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src={chat} alt="" />
            <span>Create a new chat</span>
          </div>
          <div className="option">
            <img src={image} alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src={code} alt="" />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything..." />
          <button>
            <img src={arrow} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
}
