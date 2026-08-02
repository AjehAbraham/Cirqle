import {useState, useEffect} from "react";
import "./css/call_log.css";
import Footer from "../components/Footer";
import useTitle from "../../components/UseTitle";
import app_logo from "../../assets/app_logo.png";
import info_friends_animation from "../../assets/info_friends_animation.PNG";
import interaction_logo from "../../assets/interaction_logo.png";


export default function CallLog(){
  useTitle("Unavailable")
  const[activeTab, setActiveTab] = useState("call");
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
      }, 4000);
      return () => clearInterval(timer);
    }, [slides.length]);
  return(
    <>
    <div className="call-log-cover-container">
    <div className="call-log-main-container">
      <h1 style={{fontSize: "20px"}}>Call log features not Available yet</h1>
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
    <Footer activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
    </>
    );
  
  
}