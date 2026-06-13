import useTitle from "../../components/UseTitle.jsx";
import {useNavigate} from "react-router-dom";
import "../css/chats.css";
import Footer from "../components/Footer.jsx";
import ChatBody from "../components/ChatBody.jsx";
import app_logo from "../../assets/app_logo.png";

function MainChats(){
  return(
    <>
      <div className="chats-page">
        <div className="header-container">
          <img src={app_logo} alt="Cirqle logo"/>
          <b>Cirqle</b>
        </div>
        <ChatBody />
     <Footer /> 
   </div>
    </>
    );
}
export default MainChats;