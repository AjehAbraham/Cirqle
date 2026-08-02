
import { useState, useEffect } from "react";
import app_logo from "../../assets/app_logo.png";
import info_friends_animation from "../../assets/info_friends_animation.png";
import interaction_logo from "../../assets/interaction_logo.png";
import "./css/side_animation.css";

export default function Animation(){
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
      );
}