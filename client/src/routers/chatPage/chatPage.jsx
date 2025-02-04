import React, { useEffect, useRef } from "react";
import "./ChatPage.scss"
import NewPrompt from "../../components/newPrompt/newPrompt";
export default function ChatPage(){
    // const endRef = useRef(null)
    // useEffect(() =>{
    //     endRef.current.scrollIntoView({behavior: "smooth"})
    // }, [])
    return(
        <div className="chatPage">
            <div className="wrapper">
                <div className="chat">
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <NewPrompt/>
                    {/* <div ref={endRef} /> */}
                </div>
            </div>
        </div>
    )
}