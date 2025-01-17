import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";

export default function DashboardLayout(){
    const {userId, isLoaded} = useAuth()
    const navigate = useNavigate()
    useEffect(() =>{
        if(isLoaded && !userId){
            navigate("/sign-in")
        }
    },[isLoaded, userId, navigate])
    if(!isLoaded) return "Loading..."
    return (
        <div className="dashboardLayout">
            <div className="menu">menu</div>
            <div className="content">
                <Outlet/>
            </div>
        </div> 
    )
}