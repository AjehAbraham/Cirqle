import {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import useTitle from "../components/UseTitle.jsx";
import setup_logo from "../assets/setup_logo.png";
import {createPortal} from "react-dom";
import interaction_logo from "../assets/interaction_logo.png";
import LogoHeader from "../components/TinyLogo.jsx";
import "./css/setup_account.css";
import app_logo from "../assets/app_logo.png";


function FinishReg() {
  useTitle("Finish-Account-Setup");
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(setup_logo); 
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); 
    }
  };
const handleContinue = () => {
    navigate("/accounts/message/chats", {state: {to: "nil"}});
  }
  return (
    <>
      <Completed isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="setup-main-container">
       {/* <div className="min-logo">
          <img src={app_logo} />
          Cirqle
        </div> */}
        <h1 className="skip" onClick={handleContinue}>Skip</h1>
        <div className="account-content">

          {/* Circular upload */}
          <div className="avatar-upload">
            <label htmlFor="avatar-upload" >
            <img src={preview} alt="profile preview"/> </label>
          </div>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{display: 'none'}}
          />

          <h1>Setup Your Profile</h1>
          <form method="post">
            <label>Display Name</label><br />
            <input type="text" placeholder="your name (optional)"/><br />
            <label>Bio (optional)</label><br />
            <textarea placeholder="write about yourself"></textarea><br />
            <button type="button" onClick={() => setIsOpen(true)}>Finish</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default FinishReg;

function Completed({isOpen, onClose}){
  const navigate = useNavigate();
  const location = useLocation();

  const startConversation = () => {
    navigate("/accounts/message/chats", {state: {to: "start"}});
    onClose()
  }
  const handleContinue = () => {
    navigate("/accounts/message/chats", {state: {to: "nil"}});
    onClose();
  }
  if(!isOpen) return null;
  return createPortal(
    <div className="container-modal">
      <div className="content-message-container">
        <img src={interaction_logo} alt="congrats" />
        <h1>Welcome to Cirqle 🎉</h1>
        <p>Registration Completed</p>
        <button onClick={startConversation}>Start  messaging</button>
        <button onClick={handleContinue}>Go to Chats</button>
      </div>
    </div>,
    document.body
  );
}
export { Completed };