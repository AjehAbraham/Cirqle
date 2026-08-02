import { useState, useEffect } from "react";
import useTitle from "../../components/UseTitle.jsx";
import {useNavigate} from "react-router-dom";
import "./css/chats.css";
import Footer from "../components/Footer.jsx";
import ChatBody from "../components/ChatBody.jsx";
import app_logo from "../../assets/app_logo.png";
import info_friends_animation from "../../assets/info_friends_animation.png";
import interaction_logo from "../../assets/interaction_logo.png";



function MainChats(){
   useTitle("Chat home");
 const[activeTab, setActiveTab] = useState("home");
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
    <div className="chat-container-for-cover">
      <div className="chats-page">
        <div className="header-container">
          <img src={app_logo} alt="Cirqle logo"/>
          <b>Cirqle</b>
        </div>
        <ChatBody />
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
export default MainChats;