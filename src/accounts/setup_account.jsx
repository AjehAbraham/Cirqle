import {useEffect, useState, useMemo} from "react";
import {useNavigate, useLocation, replace} from "react-router-dom";
import useTitle from "../components/UseTitle.jsx";
import setup_logo from "../assets/setup_logo.png";
import {createPortal} from "react-dom";
import interaction_logo from "../assets/interaction_logo.png";
import LogoHeader from "../components/TinyLogo.jsx";
import "./css/setup_account.css";
import app_logo from "../assets/app_logo.png";
import api from "../api/axios.js";
import Loader from "./components/Loader.jsx";


function FinishReg() {
  useTitle("Finish-Account-Setup");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(setup_logo);
  const [file, setFile] = useState(null); // ADD THIS
  const [inputs, setInputs] = useState({name: "", bio: ""});
  const [loading, setLoading] = useState(false);
  const [loaderTitle, setLoaderTitle] = useState(null);
  const [completed, setCompleted] = useState(false);
 
  useEffect( () => {
  const abtStatus = localStorage.getItem("abtCode" || "0");
  if(abtStatus === "1") navigate("/accounts/message/chats", {replace: true});

}, [navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({...prev, [name]: value }));
  };

  const isEnabled = useMemo(() => {
    return inputs.name.trim()!== "" || inputs.bio.trim()!== "";
  }, [inputs]);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f); // STORE FILE
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleContinue = async () => {
    setLoaderTitle("Updating...");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", inputs.name);
      formData.append("bio", inputs.bio);
      if(file) formData.append("avatar", file); 

      const { data } = await api.post("/account/update/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
       if(!data.success) alert("Failed to complete request");
      console.log("saved:", data);
      setIsOpen(true);
      setCompleted(true);
      localStorage.setItem("abtCode", "1");
    } catch(err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <Completed isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Loader isOpen={loading} title={loaderTitle}/>
      <div className="setup-main-container">
        <h1 className="skip" onClick={handleContinue}>Skip</h1>
        <div className="account-content">
          <div className="avatar-upload">
            <label htmlFor="avatar-upload" >
              <img src={preview} alt="profile preview"/>
            </label>
          </div>
          <input id="avatar-upload" type="file" accept="image/*" onChange={handleFileChange} style={{display: 'none'}} />
          <h1>Setup Your Profile</h1>
          <form onSubmit={(e)=> e.preventDefault()}>
            <label>Display Name</label><br />
            <input type="text" name="name" value={inputs.name} placeholder="your name (optional)" onChange={handleChange}/><br />
            <label>Bio (optional)</label><br />
            <textarea value={inputs.bio} name="bio" placeholder="write about yourself" onChange={handleChange}></textarea><br />
            <button type="button" onClick={handleContinue} disabled={!isEnabled || loading}>
              {loading? "Saving..." : "Finish"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default FinishReg;

function Completed({isOpen, onClose}){
  const navigate = useNavigate();
  const location = useLocation();

  const startConversation = () => {
    navigate("/accounts/message/chats?tab=start&cm=true", {state: {to: "start"}});
    onClose()
  }
  const handleContinue = () => {
    navigate("/accounts/message/chats", {state: {to: "nil"}});
    onClose();
  }
  if(!isOpen) return null;
  return createPortal(
    <div className="container-modal">
      <div className="content-message-container">
        <img src={interaction_logo} alt="congrats" />
        <h1>Welcome to Cirqle 🎉</h1>
        <p>Registration Completed</p>
        <button onClick={startConversation}><span className="material-symbols-outlined">near_me</span> Start  messaging</button>
        <button onClick={handleContinue}><span className="material-symbols-outlined">chat</span>Go to Chats</button>
      </div>
    </div>,
    document.body
  );
}
export { Completed };