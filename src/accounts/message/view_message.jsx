import { useState, useRef, useEffect } from "react";
import MessageAction,  {ForwardModal} from "../components/MessageAction";
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
const [replyTo, setReplyTo] = useState(null);
const [forwardMsg, setForwardedMsg] = useState(null);
const [showForwardModal, setShowForwardModal] = useState(false);

const [pin, setPinned] = useState("");
const [star, setStared] = useState("");

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
    setReplyTo(null);
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
  const msgId = selectedMsg.id;

  if(action.startsWith("react-")){
    const emoji = action.replace("react-", "");
    setMessages(prev => prev.map(m => m.id === msgId ? {...m, reaction: m.reaction === emoji ? null : emoji} : m));
  }

  if (action === 'delete-for-me') {
    setMessages(prev => prev.filter(m => m.id !== msgId));
    sendToBackend({action: 'delete-for-me', msgId});
  }

  if (action === 'delete-for-everyone' && selectedMsg.sender === 'me') {
    // 15 min = 15*60*1000 ms
    const msgTime = new Date(`1970-01-01 ${selectedMsg.time}`);
    const now = new Date();
    const diffMs = now - msgTime;

    if (diffMs <= 15 * 60 * 1000) {
      setMessages(prev => prev.filter(m => m.id !== msgId));
      sendToBackend({action: 'delete-for-everyone', msgId});
    } else {
      alert("Can't delete for everyone after 15 minutes");
    }
  }

  if (action.startsWith("pin-")) {
    sendToBackend({action: 'pin', msgId});
    setPinned(msgId);
  }

  if (action.startsWith("star-")) {
    sendToBackend({action: 'star', msgId});
    setStared(msgId);
  }

  if (action.startsWith("reply-")) {
    setReplyTo(selectedMsg); 
  }

  if (action.startsWith("forward-")) {
    setForwarded(selectedMsg); 
    setShowForwardModal(true);
  }

  if (action === 'copy') {
    navigator.clipboard.writeText(selectedMsg.text);
  }

  setIsOpen(false);
  setSelectedMsg(null);
};
 const closeReply = () => {
   setReplyTo(null);
 }
const sendToBackend = async (data) => {
  await fetch('/api/message-action', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data) 
  });
}

  const getTickIcon = (status) => {
    if (status === "sending") return "progress_activity";
    if (status === "sent" || status === "delivered") return "check";
    return "done_all";
  };
  const messageEndRef = useRef(null);
  const scrollToBottom = () =>{
    messageEndRef.current?.scrollIntoView({behaviour: 'auto'});
  }
  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);
  return (
    <>
    { showForwardModal && (
  <ForwardModal 
    onClose={() => setForwarded(false)} 
    msg={forwardMsg} 
    setForwardedMsg={false}
  />
      )}
      
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
        <div className="pin-box"></div>
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
  <div className="message-container" key={msg.id}>
      <div
         className={msg.sender === "me" ? "wrapper-i" : "wrapper-y"}
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
          {
           replyTo && (
         <div className="reply-container">
           <span className="material-symbols-outlined" onClick={() => setReplyTo(null)}>close</span>
            <p>{replyTo.text.split(' ').slice(0, 20).join(' ')}</p>
          </div>
          )}
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
            <p><span className="material-symbols-outlined">photo_library</span>
            Photos</p>
            
           <p><span className="material-symbols-outlined">add_a_photo</span>
           Camera</p>
           <p><span className="material-symbols-outlined">document_search</span>Document</p>
           <p><span className="material-symbols-outlined">person</span>Contact</p>
           <p><span className="material-symbols-outlined">location_on</span>Location </p>
          </div>
        </div>
        </div>
    </>
  );
}