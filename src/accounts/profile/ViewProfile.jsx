import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import "./css/view_profile.css";
import app_logo from "../../assets/app_logo.png";
import animated_logo from "../../assets/animated_logo.png";
import images from "../../assets/images.jpeg";
import useTitle from "../../components/UseTitle";

export default function ViewProfile(){
  const navigate = useNavigate();
  useTitle("View Profile");
  
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [disappearing, setDisappearing] = useState(false);

  const phone = "+234 9061748246";
  const contactId = "727272ahwh";

  const openAction = (type) => {
    setActionType(type);
    setIsActionOpen(true);
  };

  const handleEdit = () => navigate(`/accounts/contacts/view?tab=edit&id=${contactId}`);

  const mediaItems = [
    {id: "1", url: app_logo, date: new Date()},
    {id: "2", url: images, date: new Date("2026-04-03")},
    {id: "3", url: animated_logo, date: new Date("2026-05-01")}
  ];
  
  const docItems = [
    {id: "d1", name: "Project.docx", date: new Date()},
    {id: "d2", name: "AEE501.pdf", date: new Date("2026-03-10")}
  ];
  
  const linkItems = [
    {id: "l1", url: "https://www.google.com", date: new Date("2023-01-16")},
    {id: "l2", url: "https://www.facebook.com", date: new Date("2023-01-16")},
    {id: "l3", url: "https://www.w3schools.com", date: new Date("2021-12-19")}
  ];

  return (
    <>
      <MediaModal 
        isOpen={isMediaOpen}  
        onClose={() => setIsMediaOpen(false)} 
        media={mediaItems}
        docs={docItems}
        links={linkItems}
      />
      <ActionModal 
        isOpen={isActionOpen} 
        onClose={() => setIsActionOpen(false)} 
        type={actionType}
        phone={phone}
      />

      <div className="profile-container">
        <div className="profile-header">
          <button className="icon-btn" onClick={() => navigate(-1)} aria-label="Back">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <img src={images} alt="Ajeh Abraham avatar" className="avatar" />
          <div className="profile-name">
            <h1>Ajeh Abraham</h1>
            <button className="icon-btn" onClick={handleEdit} aria-label="Edit contact">
              <span className="material-symbols-outlined">edit</span>
            </button>
          </div>
          <p className="profile-phone">{phone}</p>
        </div>

        <div className="section media-section">
          <div className="section-header">
            <p>Media, Docs, Links</p>
            <button className="link-btn" onClick={() => setIsMediaOpen(true)}>
              {mediaItems.length} <span className="material-symbols-outlined">arrow_forward_ios</span>
            </button>
          </div>
          <div className="media-scroll">
            {mediaItems.slice(0,3).map(item => (
              <img key={item.id} src={item.url} alt="media" onClick={() => setIsMediaOpen(true)} />
            ))}
          </div>
        </div>

        <div className="section actions-section">
          <button className="row-btn" onClick={() => openAction("star")}>Starred Messages</button>
          <button className="row-btn danger" onClick={() => openAction("clear")}>Clear Chat</button>
          <button className="row-btn danger" onClick={() => openAction("delete")}>Delete Chat</button>
          <div className="row-toggle">
            <p>Turn on Disappearing Messages</p>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={disappearing} 
                onChange={() => setDisappearing(!disappearing)} 
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="section danger-section">
          <button className="row-btn danger" onClick={() => openAction("block")}>Block</button>
          <button className="row-btn danger" onClick={() => openAction("report")}>Report</button>
        </div>
      </div>
    </>
  );
}

function MediaModal({isOpen, onClose, media, docs, links}){
  const [tab, setTab] = useState("media");
  
  if(!isOpen) return null;

  const sortedMedia = [...media].sort((a,b) => b.date - a.date);
  const sortedDocs = [...docs].sort((a,b) => b.date - a.date);
  const sortedLinks = [...links].sort((a,b) => b.date - a.date);
  
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-full" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="tabs">
            <button className={tab === "media" ? "active" : ""} onClick={() => setTab("media")}>Media</button>
            <button className={tab === "docs" ? "active" : ""} onClick={() => setTab("docs")}>Documents</button>
            <button className={tab === "links" ? "active" : ""} onClick={() => setTab("links")}>Links</button>
          </div>
        </div>
        
        <div className="modal-body">
          {tab === "media" && (
            <div className="media-grid">
              {sortedMedia.length ? sortedMedia.map(item => (
                <img key={item.id} src={item.url} alt="media" />
              )) : <p className="empty">No media</p>}
            </div>
          )}

          {tab === "docs" && (
            <div className="docs-list">
              {sortedDocs.length ? sortedDocs.map(item => (
                <div className="doc-item" key={item.id}>
                  <span className="material-symbols-outlined">description</span>
                  <p>{item.name}</p>
                  <button className="icon-btn"><span className="material-symbols-outlined">download</span></button>
                </div>
              )) : <p className="empty">No documents</p>}
            </div>
          )}

          {tab === "links" && (
            <div className="links-list">
              {sortedLinks.length ? sortedLinks.map(item => (
                <a key={item.id} href={item.url} target="_blank" rel="noreferrer">{item.url}</a>
              )) : <p className="empty">No links</p>}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function ActionModal({isOpen, onClose, type, phone}){
  const [selectedReason, setSelectedReason] = useState(null);
  const [reasonText, setReasonText] = useState("");
  const reasons = ["Harmful or Dangerous message","Inappropriate content", "Violence or Hateful speech", "Others"];
  
  if(!isOpen) return null;
  
  const canSubmit = selectedReason !== null && !(selectedReason === 3 && reasonText.trim() === "");

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        
        {type === "star" && (
          <div className="starred-container">
            <h2>Starred Messages</h2>
            <div className="starred-msg">
              <p>Hello, i know what i'm trying to do</p>
              <span>12:56AM</span>
            </div>
            <button className="btn secondary" onClick={onClose}>Close</button>
          </div>
        )}

        {type === "clear" && (
          <>
            <p>Clear all messages with <b>{phone}</b>?</p>
            <button className="btn primary">Yes, Clear</button>
            <button className="btn secondary" onClick={onClose}>Cancel</button>
          </>
        )}

        {type === "delete" && (
          <>
            <p>Delete chat with <b>{phone}</b>? This cannot be undone.</p>
            <button className="btn danger">Delete</button>
            <button className="btn secondary" onClick={onClose}>Cancel</button>
          </>
        )}

        {type === "block" && (
          <>
            <p>Block <b>{phone}</b>?</p>
            <button className="btn danger">Block</button>
            <button className="btn secondary" onClick={onClose}>Cancel</button>
          </>
        )}

        {type === "report" && (
          <>
            <h2>Report {phone}</h2>
            <div className="report-options">
              {reasons.map((reason, index) => (
                <button 
                  key={index} 
                  className={`reason-btn ${selectedReason === index ? "selected" : ""}`}
                  onClick={() => setSelectedReason(index)}
                >
                  {reason}
                </button>
              ))}
              {selectedReason === 3 && (
                <textarea 
                  placeholder="Explain reason" 
                  rows="4" 
                  maxLength="120" 
                  value={reasonText} 
                  onChange={(e) => setReasonText(e.target.value)}
                />
              )}
              <button className="btn primary" disabled={!canSubmit}>Submit</button> 
            </div>
            <button className="btn secondary" onClick={onClose}>Cancel</button>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}