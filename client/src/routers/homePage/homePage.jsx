import React from "react";
import { Link } from "react-router-dom";
import "./homePage.scss"
import a from "../../assets/bot.png"
export default function HomePage(){
    const test = async ()=>{
        await fetch("http://localhost:3000/api/test",{
            credentials:"include"
        })
    }
    return (
        <div className="homePage">
            <div className="left">
                <h1>Chat bot AI</h1>
                <Link to="/dashboard">Get started </Link>
                <button onClick={test}>Test backend auth</button>
            </div>
            <div className="right">
                <img src={a}/>
            </div>

        </div>
    )
}