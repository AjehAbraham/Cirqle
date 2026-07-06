import {useState, useRef} from "react";
import "./css/notification.css";
import {useNavigate} from "react-router-dom";
import {createPortal} from "react-dom";
import chat_tune_1 from "./Tunes/notification_sounds/chat_tune_1.mp3";
import chat_tune_2 from "./Tunes/notification_sounds/chat_tune_2.wav";
import call_tune_1 from "./Tunes/notification_sounds/call_tune_1.wav";
import call_tune_2 from "./Tunes/notification_sounds/call_tune_2.wav";
import notification_tune_1 from "./Tunes/notification_sounds/notification_tune_1.wav";
import notification_tune_2 from "./Tunes/notification_sounds/notification_tune_2.wav";
import notification_tune_3 from "./Tunes/notification_sounds/notification_tune_3.wav";

export default function Notification() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selected, setSelected] = useState({notify: 1, chat: 1, call: 1});

  const handleModal = (type) => {
    setModalType(type);
    setIsOpen(true);
  }

  const handleSelect = (type, id) => {
    setSelected(prev => ({...prev, [type]: id}));
  }

  const getLabel = (type) => {
    return `Tune ${selected[type]}`;
  }

  return(
    <>
      <TunesModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        select={modalType}
        selectedId={selected[modalType]}
        onSelect={(id) => handleSelect(modalType, id)}
      />
    <div className="notification-container-for-settinngs">
      <div className="notify-header">
        <span className="material-symbols-outlined" onClick={() => navigate(-1)}>arrow_back</span>
        <p>Notification setting</p>
      </div>
        <div className="n-for-container">
        <div className="notify-cage">
          <p>General Notification sound</p>
          <div className="n-list-lower">
            <p>Notification Tune</p>
            <label className="switch">
              <input type="checkbox" checked/>
              <span className="slider"></span>
            </label>
          </div>
          <div className="n-list-lower">
            <p>Chats notification Tune</p>
            <label className="switch">
              <input type="checkbox" checked/>
              <span className="slider"></span>
            </label>
          </div>
           <div className="n-list-lower">
            <p>Message notification Tune</p>
            <label className="switch">
              <input type="checkbox" checked/>
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
      <div className="s-for-container">
        <p>Notification sounds</p>
        <div className="sound-cage">
           <p>Notification sound</p>
           <p onClick={() => handleModal("notify")}>{getLabel("notify")} <span className="material-symbols-outlined">arrow_forward_ios</span></p>
         </div>
        <div className="sound-cage">
           <p>Chat sound</p>
           <p onClick={() => handleModal("chat")}>{getLabel("chat")} <span className="material-symbols-outlined">arrow_forward_ios</span></p>
         </div>
         <div className="sound-cage">
           <p>Call sound</p>
           <p onClick={() => handleModal("call")}>{getLabel("call")} <span className="material-symbols-outlined">arrow_forward_ios</span></p>
         </div>
     </div>
    </div>
    </>
    );
}

function TunesModal({isOpen, onClose, select, selectedId, onSelect}){
  const playerRef = useRef(null);

  const chatTunes = [
    {id: 1, name: "Tune 1", url: chat_tune_1},
    {id: 2, name: "Tune 2", url: chat_tune_2}
  ];
  const callTunes = [
    {id: 1, name: "Tune 1", url: call_tune_1},
    {id: 2, name: "Tune 2", url: call_tune_2}
  ];
  const notifyTunes = [
    {id: 1, name: "Tune 1", url: notification_tune_1},
    {id: 2, name: "Tune 2", url: notification_tune_2},
    {id: 3, name: "Tune 3", url: notification_tune_3}
  ];

  const getTunes = () => {
    if(select === "notify") return notifyTunes;
    if(select === "chat") return chatTunes;
    if(select === "call") return callTunes;
    return [];
  }

  const playSound = (url) => {
    if(playerRef.current) {
      playerRef.current.pause();
    }
    playerRef.current = new Audio(url);
    playerRef.current.play();
  }

  const handleSelect = (id, url) => {
    playSound(url);
    onSelect?.(id);
   // onClose();
  }

  if(!isOpen) return null;

  return createPortal(
    <div className="sound-modal-overlay">
      <div className="sounds-contents">
        <h3>{select === "notify"? "Notification" : select === "chat" ? "Chat" : "Call"} Tunes</h3>
       {/*<div className="s-list-"> */}
          {getTunes().map(list => (
            <p key={list.id} onClick={() => handleSelect(list.id, list.url)}>
              {list.name}
              {selectedId === list.id && <span className="material-symbols-outlined">check</span>}
            </p>
          ))}
        {/*</div>*/}
        <button onClick={onClose}>Close</button>
      </div> 
    </div>,
    document.body
  );
}