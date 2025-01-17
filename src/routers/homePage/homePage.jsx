import React from "react";
import { Link } from "react-router-dom";
import "./homePage.scss"
import a from "../../assets/bot.png"
export default function HomePage(){
    return (
        <div className="homePage">
            <div className="left">
                <h1>Chat bot AI</h1>
                <Link to="/dashboard">Get started </Link>
            </div>
            <div className="right">
                <img src={a}/>
            </div>

        </div>
    )
}