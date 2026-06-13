import { useState, useRef, useEffect } from "react";
import MessageAction from "../components/MessageAction";
import EmojiModal from "../components/EmojiModal";
import app_log from "../../assets/app_logo.png";
import "../css/view_message.css";

export default function Chat() {
  const [messages, setMessages] = useState([
    {id: "82ha8182hahah77", text: "Hello buddy!", time: "10:58PM", sender: "them", status: "sent", type: "text", reaction: ""},
    {id: "8182uqbggga019181", text: "Just testing this app", time: "11:00PM", sender: "me", status: "sent", type: "text", reaction: ""}
  ]);

  const [input, setInput] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);

  let pressTimer;

  const start = (msg) => {
    pressTimer = setTimeout(() => {
      setSelectedMsg(msg);
      setIsOpen(true);
    }, 500);
  };

  const cancel = () => clearTimeout(pressTimer);
  function sendMessage(e, content, type = "text") {
    if (e) e.preventDefault();
    if (type === "text" && !input.trim()) return;

    const statuses = ["sending", "sent", "delivered", "seen"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    const newMsg = {
      id: Date.now().toString(),
      text: type === "text" ? input : content,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      status: randomStatus,
      type: type,
      reaction: ""
    };

    setMessages(prev => [...prev, newMsg]);
    setInput("");
  }

  const handleEmojiSelect = (content) => {
    const isSticker = content.startsWith('/') || content.endsWith('.png') || content.endsWith('.gif');
    const type = isSticker ? 'sticker' : 'emoji';
    
    sendMessage(null, content, type); 
    setOpenEmoji(false); 
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e, null, "text");
    }
  };

  const handleAction = (action) => {
    if (!selectedMsg) return;
    if(action.startsWith("react-")){
      const emoji = action.replace("react-", "");
      setMessages(prev => prev.map(m => (m.id === selectedMsg.id ? {...m, reaction : m.reaction === emoji ? null : emoji} : m)));
    }
    if (action === 'delete-for-me') {
      setMessages(prev => prev.filter(m => m.id !== selectedMsg.id));
    }

    if (action === 'delete-for-everyone' && selectedMsg.sender === 'me') {
      setMessages(prev => prev.filter(m => m.id !== selectedMsg.id));
    }

    if (action === 'copy') {
      navigator.clipboard.writeText(selectedMsg.text);
    }

    setIsOpen(false);
    setSelectedMsg(null);
  };

  const getTickIcon = (status) => {
    if (status === "sending") return "progress_activity";
    if (status === "sent" || status === "delivered") return "check";
    return "done_all";
  };
  const messageEndRef = useRef(null);
  const scrollToBottom = () =>{
    messageEndRef.current?.scrollIntoView({behavviour: 'smooth'});
  }
  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);
  return (
    <>

      <div className="message-main-container">
        <div className="header">
          <div className="top-header">
            <img src={app_log} alt="profile picture" />
            <p>+234 906 1748 136</p>
            <span className="material-symbols-outlined">call</span>
            <span className="material-symbols-outlined">video_call</span>
            <span className="material-symbols-outlined">more_horiz</span>
          </div>
          <p>Online</p>
        </div>
              <MessageAction
        isOpen={isOpen}
        onClose={() => {setIsOpen(false); setSelectedMsg(null)}}
        onSelect={handleAction}
        option={selectedMsg?.sender === 'me'}
        msg={selectedMsg}
      />

      <EmojiModal 
        isOpen={openEmoji} 
        onClose={() => setOpenEmoji(false)} 
        onSelect={handleEmojiSelect}
      />
 <div className="message-body-wrapper">
  {messages.map(msg => (
  <div className="message-container">
      <div
        key={msg.id} className={msg.sender === "me" ? "wrapper-i" : "wrapper-y"}
        onMouseDown={() => start(msg)}
        onMouseUp={cancel}
        onMouseLeave={cancel}
        onTouchStart={() => start(msg)}
        onTouchEnd={cancel}
        onTouchMove={cancel}
      >
        {msg.type === "sticker" ? (
          <img src={msg.text} alt="sticker" style={{width: '120px', height: '120px'}} />
        ) : msg.type === "emoji" ? (
          <p style={{fontSize: '36px', lineHeight: 1}}>{msg.text}</p>
        ) : (
          <p>{msg.text}</p>
        )}
        
        <div className="meta-info">
          <p style={{fontSize: "13px"}}>{msg.time}</p>
          {msg.sender === "me" && (
            <span
              className="material-symbols-outlined"
              style={{color: msg.status === "seen" ? "#53bdeb" : "#667781", fontSize: "16px"}}
            >
              {getTickIcon(msg.status)}
            </span>
          )}
        </div>
        </div>
      {msg.reaction && (
        <div className={`reaction-pill ${msg.sender}`} style={{textAlign: msg.sender === "me" ? "right": "left", marginLeft: "5px", marginRight: "5px",marginTop: "-12px", fontSize: "15px"}}>
          <span>{msg.reaction}</span>
        </div>
      )}
   </div>
  ))}

  <div ref={messageEndRef} />
     </div>

        <div className="input-container-wrapper">
          <div className="fields">
            <span className="material-symbols-outlined" onClick={() => setOpenEmoji(true)}>add_reaction</span>
            <textarea
              placeholder="Type a message"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <span className="material-symbols-outlined" onClick={() => setIsPickerOpen(!isPickerOpen)}>attach_file</span>
          </div>
          <div className="action-field">
            <button type="button" onClick={(e) => sendMessage(e, null, "text")}>
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>

        <div className={`selection-wrapper ${isPickerOpen ? 'open' : ''}`}>
          <span className="material-symbols-outlined" onClick={() => setIsPickerOpen(false)}>close</span>
          <div className="wrapper">
            <span className="material-symbols-outlined">photo_library</span>
            <span className="material-symbols-outlined">add_a_photo</span>
            <span className="material-symbols-outlined">document_search</span>
            <span className="material-symbols-outlined">location_on</span>
          </div>
        </div>
        </div>
    </>
  );
}