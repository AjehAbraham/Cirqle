import { useState } from "react";
import "./css/wallpaper.css";
import { useNavigate } from "react-router";


export default function Wallpaper(){
    const navigate = useNavigate();

    return(
   <div className="main-container-for-wallper">
    <div className="header-container-for-wallpaper">
        <span className="material-symbols-outlined" onClick={() => navigate(-1)}>arrow_back</span>
        <h1>Chat wallpaper</h1>
    </div>
    <div className="content-container-for-wallpaper">
        <div className="image-gallary-caontainer">

        </div>
        <p>Choose from your gallary</p>
    </div>
   </div>

    );
}