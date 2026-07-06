import {useState, useEffect} from "react";
import "./css/privacy_setting.css";
import useTitle from "../../components/UseTitle";
import {useNavigate} from "react-router-dom";
import {createPortal} from "react-dom";

const valueLabels = ["Everyone", "Contacts", "Only me"];
const timer = ["24 hours", "7 days", "1 month", "90 days", "Off"];

export default function PrivacySetting(){
  useTitle("Privacy settings");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [settings, setSettings] = useState({
    profile: 0,
    lSeen: 0,
    OStatus: 0,
    about: 0,
    disappearing: false,
    desc: 4
  });

  const openModal = (key) => {
    setSelected(key);
    setIsOpen(true);
  }

  const updateSettings = (key, value) => {
    setSettings(prev => ({...prev, [key]: value}));
  }

  const handleSubmit = () => {
    console.log("submitting", settings);
  }

  return(
    <>
      <PrivacyModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        select={selected}
        currentValue={settings[selected]?? 0}
        onSelect={updateSettings}
      />

      <div className="privacy-container">
        <div className="p-for-header">
          <span className="material-symbols-outlined" onClick={() => navigate(-1)}>arrow_back</span>
          <p>Privacy</p>
        </div>

        <div className="item-case-container">
          <div className="p-list">
            <p>Profile photo</p>
            <p onClick={() => openModal("profile")}>
              {valueLabels[settings.profile]}
              <span className="material-symbols-outlined">arrow_forward_ios</span>
            </p>
          </div>

          <div className="p-list">
            <p>Last Seen</p>
            <p onClick={() => openModal("lSeen")}>
              {valueLabels[settings.lSeen]}
              <span className="material-symbols-outlined">arrow_forward_ios</span>
            </p>
          </div>

          <div className="p-list">
            <p>Online Status</p>
            <p onClick={() => openModal("OStatus")}>
              {valueLabels[settings.OStatus]}
              <span className="material-symbols-outlined">arrow_forward_ios</span>
            </p>
          </div>

          <div className="p-list">
            <p>About</p>
            <p onClick={() => openModal("about")}>
              {valueLabels[settings.about]}
              <span className="material-symbols-outlined">arrow_forward_ios</span>
            </p>
          </div>

          <div className="p-list">
            <p>Auto Disappearing messages</p>
            <div className="selected-timer-container">
            {/*<label className="switch">
              <input
                type="checkbox"
                checked={settings.disappearing}
                onChange={(e) => updateSettings("disappearing", e.target.checked)}
              />
              <span className="slider"></span>
            </label> */}
            <p onClick={() => openModal("desc")}>
              {timer[settings.desc]}
              </p>
              <span className="material-symbols-outlined" style={{fontSize: "20px"}}>arrow_forward_ios</span>
              </div>
          </div>

          <p className="text2">Set auto disappearing messaging for all conversations</p>

          <div className="btn-case-for-p">
            <button className="btn" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
}

function PrivacyModal({isOpen, onClose, onSelect, select, currentValue = 0}){
  const labels = {
    profile: "Profile photo",
    lSeen: "Last Seen",
    OStatus: "Online Status",
    about: "About",
    desc: "Disappearing message Timer"
  }

  const handleSelect = (index) => {
    onSelect?.(select, index);
    onClose();
  }

  if(!isOpen) return null;

  return createPortal(
    <div className="privacy-modal">
      <div className="p-modal-content">
        <h3>{labels[select] || "Setting"}</h3>

        {select!== "desc"? (
          valueLabels.map((list, index) =>
            <p key={index} onClick={() => handleSelect(index)}>
              {list}
              {currentValue === index && <span className="material-symbols-outlined">check</span>}
            </p>
          )
        ) : (
          <div className="Timer">
            {timer.map((range, index) =>
              <p key={index} onClick={() => handleSelect(index)}>
                {range}
                {currentValue === index && <span className="material-symbols-outlined">check</span>}
              </p>
            )}
          </div>
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}