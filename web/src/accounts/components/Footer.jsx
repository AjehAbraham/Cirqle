import "../css/footer.css";
import {useNavigate, useLocation} from "react-router-dom";

function Footer({ activeTab, setActiveTab }) {
  return (
    <div className="footer-container">
      <div className="footer-span-wrapper">
        <div className="home-wrapper" onClick={() => setActiveTab('home')}>
          <span className={`material-symbols-outlined ${activeTab === 'home' ? 'selected' : 'unselect'}`}>chat</span>
          <h1 className={`selectedText ${activeTab === 'home' ? 'selectedText' : 'unselectText'}`}>Chats</h1>
        </div>
        
        <div className="call-wrapper" onClick={() => setActiveTab('call')}>
          <span className={`material-symbols-outlined ${activeTab === 'call' ? 'selected' : 'unselect'}`}>phone</span>
          <h1 className={`selectedText ${activeTab === 'call' ? 'selectedText' : 'unselectText'}`}>Calls</h1>
        </div>
        
        <div className="settings-wrapper" onClick={() => setActiveTab('settings')}>
          <span className={`material-symbols-outlined ${activeTab === 'settings' ? 'selected' : 'unselect'}`}>settings</span>
          <h1 className={`selectedText ${activeTab === 'settings' ? 'selectedText' : 'unselectText'}`}>Settings</h1>
        </div>
        
        <div className="profile-wrapper" onClick={() => setActiveTab('profile')}>
          <span className={`material-symbols-outlined ${activeTab === 'profile' ? 'selected' : 'unselect'}`}>person_3</span>
          <h1 className={`selectedText ${activeTab === 'profile' ? 'selectedText' : 'unselectText'}`}>Me</h1>
        </div>
      </div>
    </div>
  );
}
export default Footer;