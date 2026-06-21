
import {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import "../css/language_selector.css";

function LanguageModal({isOpen, onClose, onSelect, currentLang = "English"}){
   const [selectedLanguage, setSelectedLanguage] = useState(currentLang);

  //if(!isOpen) return null;
  const languages = ["English", "French", "Spanish", "Arabic", "Russian", "Hausa", "Igbo", "Yoruba", "Polish", "German", "Hindi", "Swahili" ];
 
  const [search, setSearch] = useState("");
  const filterLanguage = languages.filter( lang =>
     lang.toLowerCase().includes(search.toLowerCase()));

  const picker = (lang) => {
   setSelectedLanguage(lang);
  }
 const handleSelected = () => {
   onSelect?.(selectedLanguage);
    //alert(`${selectedLanguage}`);
    onClose();
 }
 useEffect( () => {
  if(isOpen){
    setSearch("");
    document.body.style.overflow = "hidden";
  }else{
    document.body.style.overflow = "auto";
  }
 }, [isOpen, currentLang]);

 if(!isOpen) return null;

  return createPortal(
    
    <div className="selector-modal">
      <div className="modal-container">
        <input type="search" placeholder="Search language" onChange={(e) => setSearch(e.target.value)} value={search} />
       <div className="list-languages">
            {filterLanguage.length > 0 ? (filterLanguage.map((lang) => (
                <p key={lang} onClick={() => picker(lang)} style={{fontWeight: selectedLanguage === lang ? "bold" : "normal", 
                backgroundColor: selectedLanguage === lang ? "#00F5D4" : "black", 
                color: selectedLanguage === lang ? "black" : "white"}}>{lang} 
                 {selectedLanguage === lang && (
                  <span className="material-symbols-outlined">check </span>
                )} </p>
          )) ) : (<h3> No language search result found</h3>)}
       </div>
       <div className="btn-container">
        <button onClick={onClose}>Close</button>
        <button onClick={handleSelected}>Select</button>
       </div>
       </div>
    </div>,
    document.body
    
  );
}
export default LanguageModal;