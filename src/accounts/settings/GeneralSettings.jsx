import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {createPortal} from "react-dom";
import "./css/general_settings.css";
import Footer from "../components/Footer";
import useTitle from "../../components/UseTitle";
import ThemeManager from "../components/ThemeManager";
import app_logo from "../../assets/app_logo.png";
import info_friends_animation from "../../assets/info_friends_animation.PNG";
import interaction_logo from "../../assets/interaction_logo.png";


export default function GeneralSettings(){
  useTitle("General Settings");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("settings");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState( () => localStorage.getItem("Theme") || "System");
   const handleTheme = () => {
     setIsOpen(true);
   }
   const handleAccount = () => {
    navigate("/accounts/settings/account_setting");
   }
   const handlePrivacy = () => {
     navigate("/accounts/settings/privacy_setting");
   }
   const handleNotification = () => {
     navigate("/accounts/settings/notification_setting");
   }
   
   const arry = [
     {id: 1, title: "Account", desc: " Security, change number, linked devices", icon: "person", onClick: handleAccount},
     {id: 2, title: "Chats", desc: "Theme, wallpapers, chat history", icon: "chat", onClick: () => navigate("/accounts/settings/chat_settings")},
     {id: 3, title: "Privacy", desc: " Last seen, profile photo, online status, About, auto disappearing message", icon: "lock", onClick: handlePrivacy},
     {id: 4, title: "Notifications", desc: " Message, group, call tones", icon: "notifications", onClick: handleNotification},
    // {/*id: 5, title: " Storage and Data", desc: " Network usage, auto-download", icon: "storage", onClick: () => alert("Media storage")*/},
     {id: 6, title: "Appearance", desc: "App Theme", icon: "palette", onClick: handleTheme},
     {id: 7, title: "About", desc: "App info, Terms & Conditions, Privacy policy, Help & Support", icon: "help", onClick: () => navigate("/accounts/settings/about")}
     ];
     const [query, setQuery] = useState("");
    const filterList = arry.filter ( list =>
    list.title.toLowerCase().includes(query.toLowerCase()) || list.desc.toLowerCase().includes(query.toLowerCase())
      );


      const logos = [
        app_logo,
        info_friends_animation,
        interaction_logo
       ]
       const slides = [
        { img: app_logo, title: "Connect with friends" },
        { img: info_friends_animation, title: "Share moments" },
        { img:interaction_logo, title: "Join communities" },
      ];
        const [index, setIndex] = useState(0);
      
        useEffect(() => {
          const timer = setInterval(() => {
            setIndex(prev => (prev + 1) % slides.length);
          }, 4000); // change every 4s
          return () => clearInterval(timer);
        }, [slides.length]);

  return(
    <>
      <ThemeManager isOpen={isOpen} onClose={() => setIsOpen(false)} selectedTheme={selectedTheme} onSelect={setSelectedTheme}/>

<div className="flex-background-container" style={{display: "flex"}}>


<div className="settings-main-container">
  <h1>Settings</h1>
  <input type="text" placeholder="search settings" value={query} onChange={(e) => setQuery(e.target.value)}/>
  
  
  {
    filterList.length > 0 ?(
      filterList.map(items => (
      <div className="items-card-container" key={items.id} onClick={items.onClick}>
        <div className="sub-card-list">
          <span className="material-symbols-outlined">{items.icon}</span>
          <p>{items.title}</p>
          </div>
          <div className="lower-card-list">
            <p>{items.desc}</p>
            {items.title === "Appearance" && (
            <b>{selectedTheme}</b>
            )
            }
           <span className="material-symbols-outlined">arrow_forward_ios</span>
          </div>
        </div>
      ))
    ): (
    <div className="empty">
      <p>Search query not found</p>
      <span className="material-symbols-outlined">search_off</span>
    </div>
    )
  }
  <div className="empty2" />
       <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
</div>



<div className="side-animated-logo-container">
    <div className="logo-scroller">
      <div className="logo-track">
        {
          [...logos, ...logos].map((logo, i) => 
          <img src={logo} key={i} alt="logo" />
        )}
      </div>
    </div>

   
   <div className="home-slider">
      {slides.map((slide, i) => (
        <div key={i} className={i === index ? "slide active" : "slide"}>
          <img src={slide.img} alt={slide.title} />
          <h1>{slide.title}</h1>
        </div>
      ))}

      <div className="slider-dots">
        {slides.map((_, i) => (
          <span key={i} className={i === index ? "dot active" : "dot"} />
        ))}
      </div>
    </div>
   </div>

   </div>
       </>
    );
}