import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {createPortal} from "react-dom";
import "./css/view_profile.css";
import app_logo from "../../assets/app_logo.png";
import animated_logo from "../../assets/animated_logo.png";
import images from "../../assets/images.jpeg";
import useTitle from "../../components/UseTitle";
import AddContact from "../components/AddContact";


export default function ViewProfile(){
  const navigate = useNavigate();
  useTitle("View Profile");
  const [isOpen, setIsOpen] = useState(false);
  const[isOpenModal, setIsOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const handleEdit = () => {
    navigate("/accounts/contacts/view?tab=edit&id=727272ahahahahwh");
  }
  const openStared = () => {
    setSelected("star");
    setIsOpenModal(true);
  }
  const openClear = () => {
    setSelected("clear");
    setIsOpenModal(true);
  }
  const openDelete = () =>{
    setSelected("delete");
    setIsOpenModal(true);
  }
  const openBlock = () => {
    setSelected("block");
    setIsOpenModal(true);
  }
  const openReport = () => {
    setSelected("report");
    setIsOpenModal(true);
  }
  return (
        <>
          <MediaModal isOpen={isOpen}  onClose={() => setIsOpen(false)} />
          <FunctionalModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} selected={selected}/>
          <div className="profile-container-1">
        <div className="profile-header-container">
          <span className="material-symbols-outlined" onClick={() => navigate(-1) }>arrow_back</span>
          <img src={images} alt="profile avatar" />
          <p>Ajeh Abraham <span className="material-symbols-outlined" onClick={handleEdit}>edit</span></p>
          <p>+234 9061748246</p>
        </div>
        <div className="media-function">
          <p>Media,Docs,Links</p>
          <p onClick={() => setIsOpen(true)}>3  <span className="material-symbols-outlined">arrow_forward_ios</span></p>
        </div>
        <div className="media-scroll-container">
          <img src={app_logo} alt="media" />
          <img src={animated_logo} alt="media" />
          <img src={images} alt="media" />
        </div>
        <div className="lower-functional-container">
          <p onClick={openStared}>Stared Messages</p>
          <p onClick={openClear}>Clear Chat</p>
          <p onClick={openDelete}>Delete Chat</p>
          <div className="sub-functional">
            <p>Turn on Disapearing messaging</p>
            {/*<input type="checkbox" /> */}
            <label className="switch">
  <input type="checkbox" />
  <span className="slider"></span>
</label>
          </div>
        </div>
        <div className="bottom-functional-container">
          <p onClick={openBlock}>Block </p>
          <p onClick={openReport}>Report</p>
        </div>
      </div>
    </>
    );
}
function MediaModal({isOpen, onClose}){
  const [isTab, setIsTab] = useState("media");
  const mediaArry = [
    {id: "7272hshsu3", url: app_logo, date: new Date()},
   {id: "+37373uwuw", url: images, date: new Date("2026-4-03")},
    {id: "jshsu72727272", url: animated_logo, date: new Date("2026-05-01")}
    
    ];
    const docxArry = [
      {id: "hah722727", name: "Project.docx", url: "", date: new Date()},
    {id: "827272jwjwj", name: "AEE501", url: "", date: new Date()}
    ];
    const linksArry = [
      {id: "jsjs72727", url: "https:wwww.google.com", date: new Date("2023-01-16")},
      {id: "jsjsjwehu3", url: "www.facebook.com", date: new Date("2023-01-16")},
      {id: "jsjs82828282", url: "www.w3schools.com", date: new Date("2021-12-19")}
      
      ];
  const sortedMedia = [...mediaArry].sort( (a,b) => b.date - a.date);
  const sortedDocx = [...docxArry].sort( (a,b) => b.date - a.date);
  const sortedLink = [...linksArry].sort( (a,b) => b.date - a.date);
  
  const isMedia = () => {
    setIsTab("media");
  }
  const isDocx = () => {
    setIsTab("Docx");
  }
  const isLink = () => {
    setIsTab("Link");
  }
  {/*
  {sortedMedia.map((item, index) => {
  const current = item.date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const previous =
    index > 0
      ? sortedMedia[index - 1].date.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })
      : null;

  return (
    <div key={item.id}>
      {current !== previous && (
        <h3>{current}</h3>
      )}

      <img src={item.url} alt="" />
    </div>
  );
})}
*/}
 if(!isOpen) return null;
  return createPortal(
    <div className="media-modal-container">
    <div className="media-modal-header">
      <span className="material-symbols-outlined" onClick={onClose}>
        close
      </span>
      <p onClick={isMedia} style={{borderBottom: isTab === "media" ? "3px solid #00F5D4" : "none", color: isTab === "media" ? "var(--absText)" : "var(--text)"}}>Media</p>
      <p onClick={isDocx} style={{borderBottom: isTab === "Docx" ? "3px solid #00F5D4" : "none", color: isTab === "Docx" ? "var(--absText)" : "var(--text)"}}>Document</p>
      <p onClick={isLink} style={{borderBottom: isTab === "Link" ? "3px solid #00F5D4" : "none", color: isTab === "Link" ? "var(--absText)" : "var(--text)"}}>Links</p>
    </div>
    <div className="media-content-wrapper">
      {isTab === "media" && (
      <div className="media-string">
       {
         sortedMedia.length > 0 ?(
         sortedMedia.map((item) => (
         <img src={item.url} key={item.id} alt="media"/>
         )
         )
         ) :(
         <p>No media</p>
         )
       }
      </div>
      )}
      {isTab === "Docx" && (
      <div className="docx-string">
        {
          sortedDocx.length > 0 ? (
          sortedDocx.map( (item) => (
          <div className="doc-cage" key={item.id}>
            <p>{item.name}</p>
            <span className="material-symbols-outlined">download</span>
          </div>
          )
          )
          ): (
          <p>No Document</p>
          )
        }
      </div>
      )}
      {isTab === "Link" && (
      <div className="link-string" >
       {
         sortedLink.length > 0 ? (
         sortedLink.map( (item) => (
         <p key={item.id}>{item.url}</p>
         )
         )
         ):(
         <p>No links</p>
         )
       } 
      </div>
      )}
      
    </div>
    </div>,
    document.body
    );
}

function FunctionalModal({isOpen, onClose, selected}){
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [textarea, setTextArea] = useState("");
  const arry = ["Harmful or Dangerous message","Inappropriate content", "Violence or Hateful speech", "Others"];
  
  if(!isOpen) return null;
  
  return createPortal(
    <div className="content-container-for-function" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        
        {selected === "star" && (
          <div className="stared-message-container">
            <h2>Starred Messages</h2>
            <div className="msg-content-star">
              <p>Hello, i know what i'm trying to do</p>
              <span className="time">12:56AM</span>
            </div>
            <button className="modal-btn secondary" onClick={onClose}>Close</button>
          </div>
        )}

        {selected === "clear" && (
          <>
            <p>Are you sure you want to clear messages with <b>+234 9061748136</b>?</p>
            <button className="modal-btn primary">Yes, proceed</button>
            <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
          </>
        )}

        {selected === "delete" && (
          <>
            <p>Are you sure you want to delete all messages with <b>+234 9061748136</b>?</p>
            <button className="modal-btn danger">Yes, delete</button>
            <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
          </>
        )}

        {selected === "block" && (
          <>
            <p>Are you sure you want to block <b>+234 9061748136</b>?</p>
            <button className="modal-btn danger">Block</button>
           {/*} <button className="modal-btn danger">Block and Report</button> */}
            <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
          </>
        )}

        {selected === "report" && (
          <>
            <h1 style={{fontSize: "20px"}}>Report <b>+234 9061748136</b></h1>
            <div className="report-list">
              {/*<p>Harmful or Dangerous message</p>
              <p>Inappropriate content</p>
              <p>Violence or Hateful speech</p>
              <p>Others</p> */}
              {
                arry.length > 0 && (
                arry.map((list, index) => 
                <p key={index} className={selectedIndex === index ? "selected" : ""} onClick= { () => setSelectedIndex(index)}>{list}</p>
                )
                )
              }
              {
                selectedIndex === 3  && (
                <textarea placeholder="explain reason" rows="4" cols="5" maxlength="120" value={textarea} onChange={(e) => setTextArea(e.target.value)}/>
                )
              }
             
              <button className="btn-sub" disabled={selectedIndex === null || (selectedIndex === 3 && textarea.trim() === "")}>submit</button> 
              
            </div>
            <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}