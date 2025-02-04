import React, { useEffect, useRef, useState } from "react";
import "./newPrompt.scss";
import attachment from "../../assets/attachment.png";
import arrow from "../../assets/arrow.png";
import UpLoad from "../upLoad/upLoad";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
export default function NewPrompt() {
  const [quest, setQuest] = useState("");
  const [answer, setAnswer] = useState("");

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {}
  });
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [quest, answer, img.dbData]);
  const add = async (text) => {
    setQuest(text);

    const result = await chat.sendMessageStream(
      Object.entries(img.aiData).length ? [img.aiData, text] : [text]
    );
    let accumulatedText = ""
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      accumulatedText += chunkText
    }
    setAnswer(accumulatedText);
    setImg({
      isLoading: false,
      error: "",
      dbData: {},
      aiData: {}
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    add(text);
    
  };
  return (
    <>
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}
      {quest && <div className="message user">{quest}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}

      <div className="endChat" ref={endRef}></div>

      <form className="newForm" onSubmit={handleSubmit}>
        <UpLoad setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask anything..." />
        <button>
          <img src={arrow} alt="" />
        </button>
      </form>
    </>
  );
}
