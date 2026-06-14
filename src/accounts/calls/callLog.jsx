import "../css/call_log.css";

function CallLog(){
  const goBack = () => {
    window.location.href
  }
  return(
    <div className="call-log-main-container">
      <span className="material-symbols-outlined">close</span>
      <h1>Call log is Available</h1>
    </div>
    
    );
  
  
}
export default CallLog()