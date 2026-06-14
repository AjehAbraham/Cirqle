
import {createPortal} from "react-dom";
import "../css/contact_list.css";


function ContactList({isOpen, onClose}){
  
  if(!isOpen) return null;
  return createPortal(
    <div className="contact-modal">
     <div className="modal-wrapper">
       <span className="material-symbols-outlined" onClick={onClose}>close</span>
       <h1>Contact List</h1>
       <div className="make-container">
         <p><span className="material-symbols-outlined">person_add</span>Add new contact</p>
         <p><span className="material-symbols-outlined">groups</span>Create new Group</p>
       </div> 
       <div className="List-container">
         <input type="text" placeholder="Type to search contact name or phone number" />
         <h1>All Sync Contacts</h1>
         <div className="my-list">
           <div className="list">
             <p>Ajeh Abraham</p>
             <p>Jesus loves you</p>
           </div>
         </div>
       </div>
     </div>
    </div>,
    document.body
    );
}
export default ContactList;