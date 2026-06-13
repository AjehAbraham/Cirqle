import {useState, useEffect, useRef} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import app_log from "../../assets/app_logo.png";
import "../css/view_message.css";
import MessageAction from "../components/message_action.jsx";


function ViewMessage(){
  const [isOpen, setIsOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest('.message-input')) {
      setIsPickerOpen(false);
    }
  };
  document.addEventListener('click', handleClickOutside);
  return () => document.removeEventListener('click', handleClickOutside);
}, []);

 const timerRef = useRef(null);
 const HOLD_TIME = 500;
  const start = (e) => {
    e.preventDefault();
    timerRef.current = setTimeout(() => setIsOpen(true), HOLD_TIME);
  }
  const cancel = () => clearTimeout(timerRef.current);
 const [option, setOption] = useState(false);
  {/*const handleOption = () => {
    
  }*/}
  return (
    <>
    <MessageAction isOpen={isOpen} onClose={() => setIsOpen(false)} />
<div className="message-main-container">
  <div className="header">
    <div className="top-header">
      <img src={app_log} alt="profile picture" />
      <p>+234 906 1748 136</p>
      <span className="material-symbols-outlined">call</span>
      <span className="material-symbols-outlined">video_call</span>
      <span className="material-symbols-outlined">more_horiz</span>
    </div>
    <p>Online</p>
  </div>
  <div className="message-body-wrapper">
    <div className="wrapper-y"  onMouseDown={start} onMouseUp={cancel} onMouseLeave={cancel} onTouchStart={start} onTouchEnd={cancel} onTouchMove={cancel} >
      <p>Hello buddy!</p>
      <p>10:05PM</p>
    </div>
    <div className="wrapper-i" onMouseDown={start} onMouseUp={cancel} onMouseLeave={cancel} onTouchStart={start} onTouchEnd={cancel} onTouchMove={cancel}>
      <p>Hi, i've been wanting to reach you in other to update you about the market condition but due to certain pressing issue i coud'nt,i just hope you'r ok</p>
      <p>11:59AM</p>
    </div>
  </div>
  <div className="input-container-wrapper">
    <div className="fields">
      <span className="material-symbols-outlined">add_reaction</span>
      <textarea placeholder="Type a message" />
      <span className="material-symbols-outlined" onClick={() => setIsPickerOpen(!isPickerOpen)}>attach_file</span>
    </div>
    <div className="action-field">
      <button><span className="material-symbols-outlined">send</span></button>
    </div>
  </div>
  <div className={`selection-wrapper ${isPickerOpen ? 'open' : ''}`}>
    <span className="material-symbols-outlined">close</span>
    <div className="wrapper">
      <span className="material-symbols-outlined">photo_library</span>
      <span className="material-symbols-outlined">add_a_photo</span>
      <span className="material-symbols-outlined">document_search</span>
      <span className="material-symbols-outlined">location_on</span>
    </div>
  </div>
</div>
</>
    );
  
  
}
export default ViewMessage;