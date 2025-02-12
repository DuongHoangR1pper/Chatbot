import React from "react";
import "./chatList.scss";
import { Link } from "react-router-dom";
import a from "../../assets/logo.png";
import { useQuery } from "@tanstack/react-query";
export default function ChatList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });
  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new chat</Link>
      <Link to="/">Explore</Link>
      <Link to="/">Contact</Link>
      <hr />
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong!"
          : data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src={a} alt="" />
        <div className="texts">
          <span>Upgrade to AI</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
}
