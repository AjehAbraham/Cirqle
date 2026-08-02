import {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import "./css/emoji.css";

function EmojiModal({ isOpen, onClose, onSelect }) {
  const [activeTab, setActiveTab] = useState('emoji');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="emoji-modal-container" onClick={onClose}>
      <div className="emoji-modal-content" onClick={e => e.stopPropagation()}>
        <span
          className="material-symbols-outlined close-btn"
          onClick={onClose}
          id="closebtn"
        >
          close
        </span>
        <div className="top-menu">
          <span
            className={`material-symbols-outlined ${activeTab === 'emoji'? 'active' : ''}`}
            onClick={() => setActiveTab('emoji')}
          >
            mood
          </span>
          <span
            className={`material-symbols-outlined ${activeTab === 'sticker'? 'active' : ''}`}
            onClick={() => setActiveTab('sticker')}
          >
            sticker
          </span>
          <span
            className={`material-symbols-outlined ${activeTab === 'gif'? 'active' : ''}`}
            onClick={() => setActiveTab('gif')}
          >
            gif
          </span>
        </div>
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
  const emojis = [
    '😀','😃','😄','😁','😆','😅','😂','🤣','🥲','🥹','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑','🤠','😈','👿','👹','👺','🤡','💩','👻','💀','☠️','👽','👾','🤖','🎃','😺','😸','😹','😻','😼','😽','🙀','😿','😾'
  ];
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