import {useState, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import "../css/chat_body.css";
import app_logo from "../../assets/app_logo.png";
import SortingList from "../message/sort_message.jsx";
import ContactList from "./ContactList.jsx";


function ChatBody(){
  const navigate = useNavigate();
  const[openContact, setOpenContact] = useState(false);
  const handleContact = () => {
    setOpenContact(true);
  }
  const viewMessage = () => {
    navigate("/accounts/message/view");
  }
  return (
    <>

    <div className="container-container-wrapper">
          <ContactList isOpen={openContact} onClose={() => setOpenContact(false)} />
      <div className="top-container-wrapper">
        <input type="search" placeholder="search contact,messages or groups" />
        <span className="material-symbols-outlined" onClick={handleContact}>add</span>
      </div>
      <SortingList />
      <div className="message-container">
        <div className="content-wrapper" onClick={viewMessage} >
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
    </>
  );
}
export default ChatBody;