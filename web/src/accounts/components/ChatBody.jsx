
import {useNavigate, useLocation} from "react-router-dom";
import "../css/chat_body.css";
import app_logo from "../assets/app_logo.png";

function ChatBody(){
  return (
    <div className="container-container-wrapper">
      <div className="top-container-wrapper">
        <input type="search" placeholder="search contact,messages and groups" />
        <span className="material-symbols-outlined">recorder</span>
      </div>
      
      <div className="message-container">
        <div className="content-wrapper">
          <div className="image-case">
            <img src={app_logo} alt="logo" />
          </div>
          <div className="content">
            <div className="info">
              <p>+234 9061748136</p>
              <p>11:59AM</p>
            </div>
            <div className="message-message">
              <p>Hello ab, how are you doing today?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatBody;