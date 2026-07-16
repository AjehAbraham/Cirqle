import useTitle from "../../components/UseTitle.jsx";
import {useNavigate} from "react-router-dom";
import "./css/chats.css";
import Footer from "../components/Footer.jsx";
import ChatBody from "../components/ChatBody.jsx";
import app_logo from "../../assets/app_logo.png";
import  {useState, useEffect} from "react";


function MainChats(){
   useTitle("Chat-Home");
 const[activeTab, setActiveTab] = useState("home");
  return(
    <>
      <div className="chats-page">
        <div className="header-container">
          <img src={app_logo} alt="Cirqle logo"/>
          <b>Cirqle</b>
        </div>
        <ChatBody />
     <Footer activeTab={activeTab} setActiveTab={setActiveTab} /> 
   </div>
    </>
    );
}
export default MainChats;