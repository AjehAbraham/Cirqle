import {useState, useRef} from "react";
import "./css/notification.css";
import {useNavigate} from "react-router-dom";
import {createPortal} from "react-dom";
import useTitle from "../../components/UseTitle";
import chat_tune_1 from "./Tunes/notification_sounds/chat_tune_1.mp3";
import chat_tune_2 from "./Tunes/notification_sounds/chat_tune_2.wav";
import call_tune_1 from "./Tunes/notification_sounds/call_tune_1.wav";
import call_tune_2 from "./Tunes/notification_sounds/call_tune_2.wav";
import notification_tune_1 from "./Tunes/notification_sounds/notification_tune_1.wav";
import notification_tune_2 from "./Tunes/notification_sounds/notification_tune_2.wav";
import notification_tune_3 from "./Tunes/notification_sounds/notification_tune_3.wav";

export default function Notification() {
  useTitle("Notification settings");

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const [toggles, setToggles] = useState({
    messageNotify: true,
    deliveryNotify: true,
    callNotify: true
  });

  const [selected, setSelected] = useState({notify: 1, chat: 1, call: 1});

  const handleModal = (type) => {
    setModalType(type);
    setIsOpen(true);
  }

  const handleToggle = (key) => {
    setToggles(prev => ({...prev, [key]:!prev[key]}));
  }

  const handleSelect = (type, id) => {
    setSelected(prev => ({...prev, [type]: id}));
  }

  const getLabel = (type) => {
    return `Tune ${selected[type]}`;
  }

  const handleSubmit = async () => {
    const payload = {
     ...toggles,
      sounds: {
        notifySoundId: selected.notify,
        chatSoundId: selected.chat,
        callSoundId: selected.call
      }
    };

    console.log("Submitting:", payload);

    try {
     
      alert("Settings saved");
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    }
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
        <p>Notifications</p>
      </div>
        <div className="n-for-container">
        <div className="notify-cage">
          <p>Notifications Settings</p>
          <div className="n-list-lower">
            <p>Message Notification</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={toggles.messageNotify}
                onChange={() => handleToggle("messageNotify")}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="n-list-lower">
            <p>Message Delivery Notification</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={toggles.deliveryNotify}
                onChange={() => handleToggle("deliveryNotify")}
              />
              <span className="slider"></span>
            </label>
          </div>
           <div className="n-list-lower">
            <p>Call Notification</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={toggles.callNotify}
                onChange={() => handleToggle("callNotify")}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="s-for-container">
        <p>Notification sound</p>
        <div className="sound-cage">
           <p>Message sound</p>
           <p onClick={() => handleModal("notify")}>{getLabel("notify")} <span className="material-symbols-outlined">arrow_forward_ios</span></p>
         </div>
        <div className="sound-cage">
           <p>Message Delivery sound</p>
           <p onClick={() => handleModal("chat")}>{getLabel("chat")} <span className="material-symbols-outlined">arrow_forward_ios</span></p>
         </div>
         <div className="sound-cage">
           <p>Call sound</p>
           <p onClick={() => handleModal("call")}>{getLabel("call")} <span className="material-symbols-outlined">arrow_forward_ios</span></p>
         </div>
     </div>
     <button onClick={handleSubmit}>Save changes</button>
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
  }

  if(!isOpen) return null;

  return createPortal(
    <div className="sound-modal-overlay" onClick={onClose}>
      <div className="sounds-contents" onClick={(e) => e.stopPropagation()}>
        <h3>{select === "notify"? "Notification" : select === "chat"? "Chat" : "Call"} Tunes</h3>
          {getTunes().map(list => (
            <p key={list.id} onClick={() => handleSelect(list.id, list.url)}>
              {list.name}
              {selectedId === list.id && <span className="material-symbols-outlined">check</span>}
            </p>
          ))}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}