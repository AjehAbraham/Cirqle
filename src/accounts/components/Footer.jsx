import "../css/footer.css";
import {useNavigate, useLocation} from "react-router-dom";

function Footer({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/accounts/message/chats");
    setActiveTab("home");
  }
  const navigateCall = () => {
    navigate("/accounts/call/call-log");
    setActiveTab("call");
  }
  const navigateProfile = () => {
    navigate("/accounts/profile");
    setActiveTab("profile");
  }
  const navigateSettings = () => {
    navigate("/accounts/settings/general_settings");
    setActiveTab("settings");
  }
  return (
    <div className="footer-container">
      <div className="footer-span-wrapper">
        <div className="home-wrapper" onClick={navigateHome}>
          <span className={`material-symbols-outlined ${activeTab === 'home' ? 'selected' : 'unselect'}`}>chat</span>
          <h1 className={`selectedText ${activeTab === 'home' ? 'selectedText' : 'unselectText'}`}>Chats</h1>
        </div>
        
        <div className="call-wrapper" onClick={navigateCall}>
          <span className={`material-symbols-outlined ${activeTab === 'call' ? 'selected' : 'unselect'}`}>phone</span>
          <h1 className={`selectedText ${activeTab === 'call' ? 'selectedText' : 'unselectText'}`}>Calls</h1>
        </div>
        
        <div className="settings-wrapper" onClick={navigateSettings}>
          <span className={`material-symbols-outlined ${activeTab === 'settings' ? 'selected' : 'unselect'}`}>settings</span>
          <h1 className={`selectedText ${activeTab === 'settings' ? 'selectedText' : 'unselectText'}`}>Settings</h1>
        </div>
        
        <div className="profile-wrapper" onClick={navigateProfile}>
          <span className={`material-symbols-outlined ${activeTab === 'profile' ? 'selected' : 'unselect'}`}>person_3</span>
          <h1 className={`selectedText ${activeTab === 'profile' ? 'selectedText' : 'unselectText'}`}>Me</h1>
        </div>
      </div>
    </div>
  );
}
export default Footer;