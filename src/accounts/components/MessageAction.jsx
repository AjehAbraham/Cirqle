import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../css/message_action.css";
import app_logo from "../../assets/app_logo.png";

export default function MessageAction({ isOpen, onClose, onSelect, option, msg }) {
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [isOpen]);

  if (!isOpen ||!msg) return null;

  const isTextMsg = msg.type === 'text';

  return createPortal(
    <>
      <div className="actions-container-modal" onClick={onClose}>
        <div className="reaction-container" onClick={e => e.stopPropagation()}>
          <span onClick={() => onSelect('react-❤️')}>❤️</span>
          <span onClick={() => onSelect('react-😃')}>😃</span>
          <span onClick={() => onSelect('react-😁')}>😁</span>
          <span onClick={() => onSelect('react-😎')}>😎</span>
          <span onClick={() => onSelect('react-🥰')}>🥰</span>
          <span onClick={() => onSelect('react-👍')}>👍</span>
          <span onClick={() => onSelect('react-😥')}>😥</span>
          <span onClick={() => onSelect('react-🥵')}>🥵</span>
          <span onClick={() => onSelect('react-🥹')}>🥹</span>
          <span onClick={() => onSelect('react-🙄')}>🙄</span>
        </div>

        <div className="action-container" onClick={e => e.stopPropagation()}>
          <h1 onClick={() => onSelect(`reply-${msg.id}`)}>
            <span className="material-symbols-outlined">reply</span>Reply
          </h1>
          {isTextMsg && (
            <h1 onClick={() => setShowEdit(true)}>
              <span className="material-symbols-outlined">edit</span>Edit
            </h1>
          )}
          <h1 onClick={() => onSelect('copy')}>
            <span className="material-symbols-outlined">content_copy</span>Copy
          </h1>
          <h1 onClick={() => onSelect(`forward-${msg.id}`)}>
            <span className="material-symbols-outlined">forward</span>Forward
          </h1>
          <h1 onClick={() => onSelect(`star-${msg.id}`)}>
            <span className="material-symbols-outlined">star</span>Star
          </h1>
          <h1 onClick={() => onSelect(`pin-${msg.id}`)}>
            <span className="material-symbols-outlined">keep</span>Pin
          </h1>
          <h1 onClick={() => onSelect('delete-for-me')}>
            <span className="material-symbols-outlined">delete</span>Delete for me
          </h1>
          {option && (
            <h1 onClick={() => onSelect('delete-for-everyone')}>
              <span className="material-symbols-outlined">delete_forever</span>Delete for everyone
            </h1>
          )}
        </div>
      </div>

      {showEdit && (
        <EditModal
          msg={msg}
          onClose={() => setShowEdit(false)}
          onSave={(newText) => {
            onSelect(`edit-${msg.id}-${newText}`);
            setShowEdit(false);
            onClose();
          }}
        />
      )}
    </>,
    document.body
  );
}

function EditModal({ msg, onClose, onSave }) {
  const [text, setText] = useState(msg.text || '');

  return createPortal(
    <div className="edit-modal-backdrop" onClick={onClose}>
      <div className="edit-modal" onClick={e => e.stopPropagation()}>
        <h3>Edit Message</h3>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          maxLength={2000}
          autoFocus
        />
        <div className="edit-modal-btns">
          <button className="edit-cancel" onClick={onClose}>Cancel</button>
          <button
            className="edit-save"
            disabled={!text.trim() || text === msg.text}
            onClick={() => onSave(text)}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function ForwardModal({ msg, onClose }) {
  const [selectedChats, setSelectedChats] = useState([]);
  const [chats] = useState([
    { id: '1', name: 'Abraham', avatar: app_logo },
    { id: '2', name: 'Mama', avatar: app_logo },
    { id: '3', name: 'Work Group', avatar: app_logo }
  ]);

  const toggleChat = (id) => {
    setSelectedChats(prev =>
      prev.includes(id)? prev.filter(c => c!== id) : [...prev, id]
    );
  };

  const handleForward = async () => {
    await fetch('/api/forward', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originalMsgId: msg.id,
        content: msg.text,
        type: msg.type,
        to: selectedChats
      })
    });
    onClose();
    setSelectedChats([]);
  };

  if (!msg) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="forward-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Forward to...</h3>
          <button onClick={onClose}>Close</button>
        </div>

        <div className="forward-preview">
          {msg.type === 'text' && msg.text}
          {msg.type === 'emoji' && <span style={{fontSize: 36}}>{msg.text}</span>}
          {msg.type === 'sticker' && <img src={msg.text} alt="sticker" />}
          <span className="forward-label">Forwarded</span>
        </div>

        <div className="chat-list">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChats.includes(chat.id)? 'selected' : ''}`}
              onClick={() => toggleChat(chat.id)}
            >
              <img src={chat.avatar} alt={chat.name} />
              <span>{chat.name}</span>
              <input type="checkbox" checked={selectedChats.includes(chat.id)} readOnly />
            </div>
          ))}
        </div>

        <button
          className="forward-btn"
          disabled={selectedChats.length === 0}
          onClick={handleForward}
        >
          Forward {selectedChats.length > 0 && `(${selectedChats.length})`}
        </button>
      </div>
    </div>,
    document.body
  );
}