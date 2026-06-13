import "../css/footer.css";
import {useNavigate, useLocation} from "react-router-dom";

function Footer(){
  return (
    <div className="footer-container">
      <div className="footer-span-wrapper">
        <div className="home-wrapper">
          <span className="material-symbols-outlined">chat</span>
          <h1>Chats</h1>
        </div>
        <div className="call-wrapper">
          <span className="material-symbols-outlined">phone</span>
          <h1>Calls</h1>
        </div>
        <div className="settings-wrapper">
          <span className="material-symbols-outlined">settings</span>
          <h1>Settings</h1>
        </div>
        <div className="profile-wrapper">
          <span className="material-symbols-outlined">person_3</span>
          <h1>Me</h1>
        </div>
      </div>
    </div>
  );
}
export default Footer;