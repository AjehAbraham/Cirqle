import {useState, useEffect} from "react";
import app_logo from "../assets/app_logo.png";
import {useNavigate} from "react-router-dom";
import "../css/terms_condition.css";
import useTitle from "../components/UseTitle";
import LanguageModal from "../components/LanguageSelector.jsx";
import Login from "../accounts/login.jsx";

function Terms(){
    useTitle("Terms & Conditions");
   const [isOpen, setIsOpen] = useState(false);
   const [language, setLanguage] = useState("English");
   const handleSelect = (lang) => {
    setLanguage(lang);
   }
   const navigate = useNavigate();
   const navigator = () => {
    navigate("/login");
   }
    return (
        <>

            <div className="language-selectors" onClick={() => setIsOpen(true)}>
                <span className="material-symbols-outlined"> language</span>
                {language}
                <span className="material-symbols-outlined"> keyboard_arrow_down</span>
            </div>
            <LanguageModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSelect={handleSelect} />
            <div className="terms-main-container">
          <div className="headers">
            <img src={app_logo} />
            <h1>Cirqle</h1>
            </div>
            <div className='container'>
                <div className="top-container">
                    </div>
                     <div className="terms-container">
                      <h1>Terms & Conditions</h1>
                      <h3>Please Accept our Terms and Conditions to continue</h3>
                        <p>By continuing to use Cirqle, you agree to the following terms:</p>
<p>Accptance of Terms</p>
<p>By tapping “Accept”, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions and our Privacy Policy.</p>
<p>User Accounts</p>
<p>You are responsible for maintaining the confidentiality of your account and all activities under it.</p>
<p>Acceptable Use</p>
<p>You agree not to use Cirqle for any illegal, harmful, or abusive activities, including harassment, spam, or impersonation.</p>
<p>Privacy & Data</p>
<p>We may collect basic usage data to improve app performance and user experience. Your personal data is handled according to our Privacy Policy.</p>
<p>Mesaging & Content</p>
<p>You are responsible for the content you send. We do not actively monitor private conversations but may act on reports of abuse.</p>
<p>Termination</p>
<p>We reserve the right to suspend or terminate accounts that violate these terms.</p>
<p>Changes to Terms</p>
<p>These terms may be updated from time to time. Continued use of the app means you accept the updated terms.</p>
                        </div>
                      <div className="functional-layout">
                        <button> Reject</button>
                        <button onClick={navigator}>Accept</button>
                        </div>
               </div> 
             </div>
        </>
    );
}
export default Terms;