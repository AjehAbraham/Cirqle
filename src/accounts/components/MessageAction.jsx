import { useEffect } from "react";
import { createPortal } from "react-dom";
import "../css/message_action.css";

function MessageAction({ isOpen, onClose, onSelect, option, msg }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
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
        <h1 onClick={() => onSelect('reply')}>
          <span className="material-symbols-outlined">reply</span>Reply
        </h1>
        <h1 onClick={() => onSelect('copy')}>
          <span className="material-symbols-outlined">content_copy</span>Copy
        </h1>
        <h1 onClick={() => onSelect('forward')}>
          <span className="material-symbols-outlined">forward</span>Forward
        </h1>
        <h1 onClick={() => onSelect('star')}>
          <span className="material-symbols-outlined">star</span>Star
        </h1>
        <h1 onClick={() => onSelect('pin')}>
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
    </div>,
    document.body
  );
}

export default MessageAction;