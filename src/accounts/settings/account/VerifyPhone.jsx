import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import useTitle from "../../../components/UseTitle";
import CountryCodeSelector from "../../components/CountryCode";
import ng_flag from "../../../assets/flags/ng_flag.WEBP";

import "./css/verify_phone.css";

export default function VerifyPhone(){
  useTitle("Verify Phone Number");
  const [tab, setTab] = useState("old-phone");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
        country: "Nigeria",
        cCode: "+234",
        code: "NG",
        flag: ng_flag
      });
  const navigate = useNavigate();
  return(
    <>
    <CountryCodeSelector isOpen={isOpen} onSelect={setSelectedCountry}  onClose={() => setIsOpen(false)} currentCountry="Nigeria" />
    <div className="main-container-for-verify">
      <div className="header-for-verify-phone">
          <span className="material-symbols-outlined" onClick={() => navigate(-1)}>arrow_back</span>
            <h1>Verify {tab === "old-phone" ? "Old Phone" : "New Phone"} </h1>
      </div>
      <div className="main-cotinaer-for-verify">
         {
         tab === "old-phone" ? (
            <div className="input-container-for-verify">
              <div className="cCode-selector" onClick={() => setIsOpen(true)}><img src={selectedCountry.flag}/> 
              {selectedCountry.cCode} {selectedCountry.country}</div> <input type="tel" inputMode="numeric" />
              </div>

         ):(
           <div className="input-container-for-verify">
            
              </div>
         )}
      <button>Procceed</button>
  </div>
    </div>
    </>
  )


}


function VerifyOtpModal({isOpen, onClose, selected}){
  const arry = [5];
  if(!isOpen) return null;
 return createPortal(
  <div className="modal-overlay-for-verify" onClick={onClose}>
    <div className="modal-content-for-verify" onClick={(e) => e.stopPropagation()}>
      <div className="header-for-modal-verify">
          <span className="material-symbols-outlined" onClick={onClose}>cancel</span>
            <h1>Verify {selected.type === "old-phone" ? "Old Phone number" : "New Phone number"} </h1>
        </div>
        <p>Enter Otp sent to <img src={selected.flag} />{selected.tel}</p>
        {arry.map((a,index) => (<input type="number" inputMode="numeric" maxLength={1} key={index}/>))}
         <p>Resend Otp</p>
        <button>Cancel</button>
    </div>
  </div>,
  document.body
 )
}