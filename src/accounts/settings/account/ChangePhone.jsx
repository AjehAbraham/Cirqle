import { useState } from "react";
import { useNavigate } from "react-router";
import { createPortal } from "react-dom";
import "./css/change_phone.css";
import useTitle from "../../../components/UseTitle";
export default function ChangePhone(){
  useTitle("Change phone");
    const navigate = useNavigate();
    return(
      <>
      <div className="main-container-for-phone">
        <div className="header-for-phone">
            <span className="material-symbols-outlined" onClick={() => navigate(-1)}>arrow_back</span>
            <h1>Change Number</h1>
        </div>
        <div className="container-content-for-phone">
             <span className="material-symbols-outlined">mobile_check</span>
             <span className="material-symbols-outlined">more_horiz</span>
              <span className="material-symbols-outlined">mobile_check</span>
               <h3>Changing your phone number will move all your account info,messages,group and settings to your new number</h3>
              <div className="phone-form-container">
                <div className="form">
                    <h4>Old phone number</h4>
                    <p><b>+234 9061 748 136</b></p>
                </div>
                 <div className="form">
                    <h4>New phone number</h4>
                    <p>+234 9061 748 136</p>
                </div>
                <button>Next</button>
              </div>
        </div>
      </div>
      
      </>

    );
}

function FormModal({isOpen, onClose}){

    return createPortal(
     <div className="phone-form-Modal-overlay">
       <div className="phone-container">
        <span className="material-symbols-outlined">close</span>
        <h3>Enter new phone number</h3>
        <input type="number" inputMode="numeric" maxLength={12} />
        <button>Next</button>
       </div>
     </div>

    );
}