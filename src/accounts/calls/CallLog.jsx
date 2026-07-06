import {useState} from "react";
import "../css/call_log.css";
import Footer from "../components/Footer";
import useTitle from "../../components/UseTitle";

export default function CallLog(){
  useTitle("Unavailable")
  const[activeTab, setActiveTab] = useState("call");
  return(
    <>
    <div className="call-log-main-container">
      <h1 style={{fontSize: "20px"}}>Call log features not Available yet</h1>
    </div>
    <Footer activeTab={activeTab} setActiveTab={setActiveTab}/>
    </>
    );
  
  
}