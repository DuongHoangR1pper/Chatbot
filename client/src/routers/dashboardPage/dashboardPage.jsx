import React from "react";
import "./dashboardPage.scss";
import a from "../../assets/logo.png";
import chat from "../../assets/chat.png";
import image from "../../assets/image.png";
import code from "../../assets/code.png";
import arrow from "../../assets/arrow.png";
import { useAuth } from "@clerk/clerk-react";
export default function DashboardPage() {
  const { userId } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    await fetch("http://localhost:3000/api/chats", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, text })
    });
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
