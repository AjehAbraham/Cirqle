import {useState, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import "../css/emoji.css";
import app_logo from "../../assets/app_logo.png";

function EmojiModal({ isOpen, onClose, onSelect }) {
  const [activeTab, setActiveTab] = useState('emoji'); // 'emoji' | 'sticker' | 'gif'

  if (!isOpen) return null;

  return createPortal(
    <div className="emoji-modal-container" onClick={onClose}>
      <div className="emoji-modal-content" onClick={e => e.stopPropagation()}>
        
        {/* Close button */}
        <span 
          className="material-symbols-outlined close-btn" 
          onClick={onClose}
         id="closebtn">
          close
        </span>

        {/* Tab menu */}
        <div className="top-menu">
          <span 
            className={`material-symbols-outlined ${activeTab === 'emoji' ? 'active' : ''}`}
            onClick={() => setActiveTab('emoji')}
          >
            mood
          </span>
          <span 
            className={`material-symbols-outlined ${activeTab === 'sticker' ? 'active' : ''}`}
            onClick={() => setActiveTab('sticker')}
          >
            sticker
          </span>
          <span 
            className={`material-symbols-outlined ${activeTab === 'gif' ? 'active' : ''}`}
            onClick={() => setActiveTab('gif')}
          >
            gif
          </span>
        </div>

        {/* Tab content */}
        <div className="emoji-contents">
          {activeTab === 'emoji' && <ShowEmoji onSelect={onSelect} />}
          {activeTab === 'sticker' && <ShowSticker onSelect={onSelect} />}
          {activeTab === 'gif' && <ShowGif onSelect={onSelect} />}
        </div>

      </div>
    </div>,
    document.body
  );
}
function ShowEmoji({ onSelect }) {
  const emojis = ['😀', '😂', '❤️', '👍', '🔥'];
  
  return (
    <div className="container-for-emoji">
      {emojis.map(emoji => (
        <span key={emoji} onClick={() => onSelect(emoji)}>{emoji}</span>
      ))}
    </div>
  );
}

function ShowSticker({ onSelect }) {
  const stickers = ['/sticker.gif', '/sticker2.png'];
  return (
    <div className="container-for-sticker">
      {stickers.map(src => (
        <img key={src} src={src} onClick={() => onSelect(src)} alt="sticker" />
      ))}
    </div>
  );
}

function ShowGif({ onSelect }) {
  return <div className="container-for-gif">Giphy API here</div>;
}
export default EmojiModal;