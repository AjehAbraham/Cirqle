import { createPortal } from "react-dom";
import "./css/status_message.css";

export default function StatusMessageModal({isOpen, onClose, icon, message}){
    if(!isOpen) return null;
 return createPortal(
   <div className="main-container-overlay-for-status-message">
    <div className="modal-container-for-status-message">
         <span className="material-symbols-outlined">{icon === 0 ? "check_circle" : icon === 1 ? "error" : "gpp_bad"}</span>
        <p>{message === "" ? "success" : message}</p>
    </div>
   </div>
 );
}