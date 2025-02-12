import React, { useEffect, useRef } from "react";
import "./ChatPage.scss";
import NewPrompt from "../../components/newPrompt/newPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
export default function ChatPage() {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();
    console.log(chatId);
    
  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });
  console.log(data);

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          
        {isPending
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.history?.map((message) => (
                <React.Fragment key={message._id || message.id}>  {/* ✅ Use unique key */}
                  {message.img && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height="300"
                      width="400"
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    />
                  )}
                  <div className={message.role === "user" ? "message user" : "message"}>
                    <Markdown>{message.parts[0].text}</Markdown>
                  </div>
                </React.Fragment>
              ))}

          {data && <NewPrompt data={data}/>}
          {/* <div ref={endRef} /> */}
        </div>
      </div>
    </div>
  );
}
