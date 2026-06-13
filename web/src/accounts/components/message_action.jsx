import {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import "../css/message_action.css";


function MessageAction({isOpen, onClose, onSelect, option}){
  if(!isOpen) return null;
  return createPortal(
     <div className="actions-container-modal" onClick={onClose} >
     <div className="reaction-container">
       <span>❤️ </span>
       <span>😃</span>
       <span>😁</span>
       <span>😎</span>
       <span>🥰</span>
       <span>👍</span>
       <span> 😥</span>
       <span>🥵</span>
      <span> 🥹</span>
       <span>🙄</span>
       {/*<span className="material-symbols-outlined">add_box</span> */}
     </div>
       <div className="action-container">
         <h1><span className="material-symbols-outlined">reply</span>Reply</h1>
         <h1><span className="material-symbols-outlined">content_copy</span>Copy</h1>
         <h1><span className="material-symbols-outlined">forward</span> Forward</h1>
         <h1><span className="material-symbols-outlined">star</span>Star</h1>
         <h1><span className="material-symbols-outlined">keep</span>Pin</h1>
         <h1><span className="material-symbols-outlined">delete</span>Delete for me</h1>
         { option ?
         <h1><span className="material-symbols-outlined">delete_forever</span>Delete for everyone</h1> :  ""}
       </div>
     </div>,
     document.body
    );
}

export default MessageAction;