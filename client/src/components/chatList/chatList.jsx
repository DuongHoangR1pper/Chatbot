import React from "react";
import "./chatList.scss"
import { Link } from "react-router-dom";
import a from "../../assets/logo.png";
export default function ChatList(){
    return (
        <div className="chatList">
            <span className="title">DASHBOARD</span>
            <Link to="/dashboard">Create a new chat</Link>
            <Link to="/">Explore</Link>
            <Link to="/">Contact</Link>
            <hr/>
            <div className="list">
                <Link to="/">My chat title</Link>
                <Link to="/">My chat title</Link>
                <Link to="/">My chat title</Link>
                <Link to="/">My chat title</Link>
                <Link to="/">My chat title</Link>
                <Link to="/">My chat title</Link>
                <Link to="/">My chat title</Link>
                <Link to="/">My chat title</Link>
                <Link to="/">My chat title</Link>
                <Link to="/">My chat title</Link>
                <Link to="/">My chat title</Link>

            </div>
            <hr/>
            <div className="upgrade">
                <img src={a} alt=""/>
                <div className="texts">
                    <span>Upgrade to AI</span>
                    <span>Get unlimited access to all features</span>
                </div>
            </div> 
        </div>
    )
}