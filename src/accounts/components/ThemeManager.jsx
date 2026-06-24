import {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import "./css/theme_manager.css";

export default function ThemeManager({isOpen, onClose}){
  const themes = ["Dark", "Light", "System"];
  
  const [selectedTheme, setSelectedTheme] = useState(() => {
    return localStorage.getItem("Theme") || "System";
  });

  const handleSelect = (theme) => {
    setSelectedTheme(theme);
    localStorage.setItem("Theme", theme);
    
    if(theme === "System"){
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme.toLowerCase());
    }
    
    onSelect?.(theme);
    onClose();
  };

  if(!isOpen) return null;
  
  return createPortal(
    <div className="theme-modal-container" onClick={onClose}>
      <div className="theme-container" onClick={(e) => e.stopPropagation()}>
        <h1>Theme Manager</h1>
        <div className="theme-selector">
          {themes.map((theme) => 
            <p 
              key={theme} 
              onClick={() => handleSelect(theme)}
              style={{
                backgroundColor: selectedTheme === theme ? "#00F5D4" : "var(--bg)", 
                color: selectedTheme === theme ? "black" : "var(--text)",
                cursor: "pointer"
              }}
            >
              {theme} 
              {selectedTheme === theme &&(
              <span className="material-symbols-outlined">check</span>)}
            </p>
          )}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}