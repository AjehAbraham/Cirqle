import useTitle from "../../components/UseTitle";
import "./css/chat_settings.css";
import { useNavigate } from "react-router-dom";
import ThemeManager from "../components/ThemeManager";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function ChatSettings(){
    useTitle("Chat settings");
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState(() => localStorage.getItem("Theme") || "System");
    const [openModal, setOpenModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState("");

    const handleModal = (tab) =>{ 
       setSelectedTab(tab);
       setOpenModal(true);
    }
    
    return(
      <>
      <ThemeManager isOpen={isOpen} onClose={() => setIsOpen(false)} selected={selectedTheme} onSelect={setSelectedTheme}/>
      <ChatModal isOpen={openModal} onClose={() => setOpenModal(false)} tab={selectedTab}/>
      <div className="main-container-for-chat-settings">
        <div className="header-container-for-chat-settings">
            <span className="material-symbols-outlined" onClick={() => navigate(-1)}>arrow_back</span>
            <h1>Chats</h1>
        </div>
        <div className="content-container-for-chat-settings">
            <div className="c-list-for-chat">
                <h3>Display</h3>
                <p onClick={() => setIsOpen(true)}><span className="material-symbols-outlined">contrast_square</span>Theme <b>{selectedTheme}</b></p>
                <p><span className="material-symbols-outlined">Wallpaper</span> Wallpaper <span className="material-symbols-outlined">arrow_forward_ios</span></p>
            </div>
            <div className="c-list-for-chat">
                <h3>Chat history</h3>
                <p onClick={() => handleModal("export-chat")}><span className="material-symbols-outlined">file_export</span> Export all chats</p>
                <p onClick={() => handleModal("clear-chat")}><span className="material-symbols-outlined">clear_all</span> Clear all chats</p>
            </div>
        </div>
      </div>
      </>
    );
}

function ChatModal({isOpen, onClose, tab}){
  if(!isOpen || (tab !== "export-chat" && tab !== "clear-chat")) return null;
  
  return createPortal(
   <div className="modal-overlay-for-chat-s" onClick={onClose}>
    <div className="container-contents-for-chat-s" onClick={e => e.stopPropagation()}>
     {tab === "export-chat" ? (
      <div className="sub-layout-for-chats">
       <h3>Export Chats</h3>
        <p>What method do you want to use to export your chat?</p>
         <p>Note: We won't be responsible for what happens to the exported chats/messages</p>
          <div className="button-group">
         <button>Advanced Encryption (preferred and best)</button>
         <button>Encrypted</button>
         <button>No Encryption (least preferred)</button>
  </div>
</div>
      ) : (
      <div className="sub-layout-for-chats"> 
        <h3>Clear all chats</h3>
        <p>Are you sure you want to clear all chats?</p>
        <p>Note: Action cannot be undone after successfully clearing all chats</p>
        <button onClick={onClose}>No, cancel</button>
        <button className="btn-danger">Yes, proceed</button>
      </div>
      )}
      <button className="btn-cancel" onClick={onClose}>Cancel</button>
    </div>
   </div>,
   document.body
  );
}