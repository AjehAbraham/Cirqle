import {useState} from "react";
import "../css/call_log.css";
import Footer from "../components/Footer";


export default function CallLog(){
  
  const[activeTab, setActiveTab] = useState("call");
  return(
    <>
    <div className="call-log-main-container">
      <h1 style={{fontSize: "20px"}}>Call log is Available</h1>
    </div>
    <Footer activeTab={activeTab} setActiveTab={setActiveTab}/>
    </>
    );
  
  
}