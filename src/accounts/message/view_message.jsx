import { useState, useRef, useEffect } from "react";
import MessageAction, {ForwardModal} from "../components/MessageAction";
import EmojiModal from "../components/EmojiModal";
import app_log from "../../assets/app_logo.png";
import "../css/view_message.css";
import useTitle from "../../components/UseTitle";

export default function Chat() {
  useTitle("message");
  
  const [messages, setMessages] = useState([
    {id: "1", text: "Hello buddy!", time: "10:58PM", sender: "them", status: "sent", type: "text", reaction: ""},
    {id: "2", text: "Just testing", time: "11:00PM", sender: "me", status: "sent", type: "text", reaction: ""}
  ]);

  const [input, setInput] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [forwardMsg, setForwardMsg] = useState(null);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [pin, setPinned] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const pressTimer = useRef(null);
  const fileInputRef = useRef(null);
  const fileTypeRef = useRef('image');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const start = (msg) => {
    pressTimer.current = setTimeout(() => {
      setSelectedMsg(msg);
      setIsOpen(true);
    }, 500);
  };
  const cancel = () => clearTimeout(pressTimer.current);

  function sendMessage(e, content, type = "text", caption = "") {
    if (e) e.preventDefault();
    if (type === "text" &&!input.trim() &&!caption) return;

    const statuses = ["sending", "sent", "delivered", "seen"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    const newMsg = {
      id: Date.now().toString(),
      text: type === "text"? input : content,
      caption: type === "image"? (caption || input) : "",
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      status: randomStatus,
      type: type,
      reaction: ""
    };

    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setReplyTo(null);
    setIsPickerOpen(false);
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const type = fileTypeRef.current;

    if (type === 'image') sendMessage(null, url, 'image', input);
    else if (type === 'video') sendMessage(null, url, 'video');
    else if (type === 'audio') sendMessage(null, url, 'audio');
    else if (type === 'document') sendMessage(null, url, 'file', file.name);

    e.target.value = '';
    setInput("");
  };

  const openFilePicker = (type) => {
    fileTypeRef.current = type;
    let accept = '';
    if (type === 'image') accept = 'image/*';
    if (type === 'video') accept = 'video/*';
    if (type === 'audio') accept = 'audio/*';
    if (type === 'document') accept = '.pdf,.doc,.docx,.txt,.zip';

    fileInputRef.current.accept = accept;
    fileInputRef.current.click();
    setIsPickerOpen(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/mp4')? 'audio/mp4' : 'audio/webm';
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(audioBlob);
        sendMessage(null, url, 'audio');
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone permission needed");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleEmojiSelect = (content) => {
    const isSticker = content.startsWith('/') || content.endsWith('.png') || content.endsWith('.gif');
    const type = isSticker? 'sticker' : 'emoji';
    sendMessage(null, content, type);
    setOpenEmoji(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' &&!e.shiftKey) {
      e.preventDefault();
      sendMessage(e, null, "text");
    }
  };

  const handleAction = (action) => {
    if (!selectedMsg) return;
    const msgId = selectedMsg.id;

    if(action.startsWith("react-")){
      const emoji = action.replace("react-", "");
      setMessages(prev => prev.map(m => m.id === msgId? {...m, reaction: m.reaction === emoji? null : emoji} : m));
    }

    if (action === 'delete-for-me') {
      setMessages(prev => prev.filter(m => m.id!== msgId));
    }

    if (action.startsWith("pin-")) {
      setPinned(msgId);
    }

    if (action.startsWith("reply-")) {
      setReplyTo(selectedMsg);
    }

    if (action.startsWith("forward-")) {
      setForwardMsg(selectedMsg);
      setShowForwardModal(true);
    }

    if (action === 'copy') {
      navigator.clipboard.writeText(selectedMsg.text || selectedMsg.caption || '');
    }

    setIsOpen(false);
    setSelectedMsg(null);
  };

  const pinnedMsg = messages.find(m => m.id === pin);
  const messageEndRef = useRef(null);
  useEffect(() => messageEndRef.current?.scrollIntoView({behavior: 'auto'}), [messages.length]);

  const getTickIcon = (status) => {
    if (status === "sending") return "progress_activity";
    if (status === "sent" || status === "delivered") return "check";
    return "done_all";
  };

  const hasInput = input.trim().length > 0;

  return (
    <>
      {showForwardModal && (
        <ForwardModal msg={forwardMsg} onClose={() => {setShowForwardModal(false); setForwardMsg(null)}} />
      )}

      {showUnavailable && (
        <div className="chat-unavailable-modal" onClick={() => setShowUnavailable(false)}>
          <div className="chat-unavailable-box" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined">info</span>
            <p>Feature not available yet</p>
          </div>
        </div>
      )}

      <div className="chat-main-container">
        <div className="chat-header">
          <div className="chat-top-header">
          <img src={app_log} alt="profile" />
          <div className="chat-user-info">
           <p>+234 906 1748 136</p>
            <p>Online</p>
            </div>
      <span className="material-symbols-outlined" onClick={() => setShowUnavailable(true)}>more_horiz</span>
       </div>
         {/* <div className="chat-top-header">
            <img src={app_log} alt="profile" />
            <p>+234 906 1748 136</p>
            <span className="material-symbols-outlined" onClick={() => setShowUnavailable(true)}>more_horiz</span>
          </div>
          <p>Online</p> */}
        </div>

        {pin && pinnedMsg && (
          <div className="chat-pin-box">
            <span className="material-symbols-outlined">keep</span>
            <p>{pinnedMsg.text || pinnedMsg.caption || 'Pinned message'}</p>
            <span className="material-symbols-outlined" onClick={() => setPinned("")}>close</span>
          </div>
        )}

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

        <div className="chat-message-body-wrapper">
          {messages.map(msg => (
            <div className="chat-message-container" key={msg.id}>
              <div
                className={msg.sender === "me"? "wrapper-i" : "wrapper-y"}
                onMouseDown={() => start(msg)}
                onMouseUp={cancel}
                onMouseLeave={cancel}
                onTouchStart={() => start(msg)}
                onTouchEnd={cancel}
                onTouchMove={cancel}
              >
                {msg.type === "text" && <p>{msg.text}</p>}
                {msg.type === "emoji" && <p style={{fontSize: '36px', lineHeight: 1}}>{msg.text}</p>}
                {msg.type === "sticker" && (
                  <img src={msg.text} alt="sticker" style={{width: '120px', height: '120px', borderRadius: '8px'}} />
                )}
                {msg.type === "image" && (
                  <>
                    <img src={msg.text} alt="img" className="chat-msg-media" />
                    {msg.caption && <p className="chat-msg-caption">{msg.caption}</p>}
                  </>
                )}
                {msg.type === "video" && (
                  <video src={msg.text} controls className="chat-msg-media" />
                )}
                {msg.type === "audio" && (
                  <div className="chat-msg-audio">
                    <span className="material-symbols-outlined">mic</span>
                    <audio src={msg.text} controls />
                  </div>
                )}
                {msg.type === "file" && (
                  <div className="chat-msg-file">
                    <span className="material-symbols-outlined">description</span>
                    <div>
                      <p>{msg.caption || 'Document'}</p>
                      <a href={msg.text} download>Download</a>
                    </div>
                  </div>
                )}
                <div className="chat-meta-info">
                  <p>{msg.time}</p>
                  {msg.sender === "me" && (
                    <span className="material-symbols-outlined">{getTickIcon(msg.status)}</span>
                  )}
                </div>
              </div>

              {msg.reaction && (
                <div className={`reaction-pill ${msg.sender}`}>
                  <span>{msg.reaction}</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        <div className="chat-input-container-wrapper">
          {replyTo && (
            <div className="chat-reply-container">
              <span className="material-symbols-outlined" onClick={() => setReplyTo(null)}>close</span>
              <p>{(replyTo.text || replyTo.caption || '').split(' ').slice(0, 20).join(' ')}</p>
            </div>
          )}

          <div className="chat-fields">
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

          <div className="chat-action-field">
            {hasInput? (
              <button type="button" onClick={(e) => sendMessage(e, null, "text")}>
                <span className="material-symbols-outlined">send</span>
              </button>
            ) : (
              <button
                type="button"
                className={isRecording? 'recording' : ''}
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
              >
                <span className="material-symbols-outlined">mic</span>
              </button>
            )}
          </div>
        </div>

        <div className={`chat-selection-wrapper ${isPickerOpen? 'open' : ''}`}>
          <span className="material-symbols-outlined" onClick={() => setIsPickerOpen(false)}>close</span>
          <div className="chat-attachment-grid">
            <p onClick={() => openFilePicker('image')}>
              <span className="material-symbols-outlined">photo_library</span>Photos
            </p>
            <p onClick={() => openFilePicker('video')}>
              <span className="material-symbols-outlined">videocam</span>Video
            </p>
            <p onClick={() => openFilePicker('audio')}>
              <span className="material-symbols-outlined">mic</span>Audio
            </p>
            <p onClick={() => openFilePicker('document')}>
              <span className="material-symbols-outlined">description</span>Document
            </p>
            <p onClick={() => setShowUnavailable(true)}>
              <span className="material-symbols-outlined">location_on</span>Location
            </p>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{display: 'none'}}
          onChange={handleFileSelect}
        />
      </div>
    </>
  );
}