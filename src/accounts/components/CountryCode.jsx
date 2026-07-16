import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./css/country_code.css";
import ng_flag from "../../assets/flags/ng_flag.WEBP";
import us_flag from "../../assets/flags/us_flag.WEBP";
import ke_flag from "../../assets/flags/ke_flag.WEBP";
import in_flag from "../../assets/flags/in_flag.WEBP";
import ca_flag from "../../assets/flags/ca_flag.WEBP";
import au_flag from "../../assets/flags/au_flag.WEBP";
import gh_flag from "../../assets/flags/gh_flag.WEBP";
import za_flag from "../../assets/flags/za_flag.WEBP";
import fr_flag from "../../assets/flags/fr_flag.PNG";
import gb_flag from "../../assets/flags/gb_flag.WEBP";



function CountryCodeSelector({isOpen, onClose, onSelect, currentCountry = "Nigeria"}){
   const countryCode = [
    {code: "NG", country: "Nigeria", cCode: "+234", flag: ng_flag},
    {code: "US", country: "United States of America", cCode: "+1", flag: us_flag},
    {code: "ZA", country: "South Africa", cCode: "+27", flag: za_flag},
    {code: "KE", country: "Kenya", cCode: "+254", flag: ke_flag},
    {code: "GB", country: "United Kingdom", cCode: "+44", flag: gb_flag},
    {code: "GH", country: "Ghana", cCode: "+233", flag: gh_flag},
    {code: "IN", country: "India", cCode: "+91", flag: in_flag},
    {code: "CA", country: "Canada", cCode: "+1", flag: ca_flag},
    {code: "FR", country: "France", cCode: "+33", flag: fr_flag},
    {code: "AU", country: "Australia", cCode: "+61", flag: au_flag}
   ];
   const [selectedCountry, setSelectedCountry] = useState(currentCountry);
   const [search, setSearch] = useState("");

   const filterCountry = countryCode.filter( c => 
    c.country.toLowerCase().includes(search.toLowerCase()) ||
    c.cCode.includes(search) ||
    c.code.toLowerCase().includes(search.toLowerCase())
   );
   

   const handleSelect = (countryObj) => {
    setSelectedCountry(countryObj.country);
    onSelect?.(countryObj);
    onClose();
   }

   useEffect(() => {
    if(isOpen){
        setSelectedCountry(currentCountry);
        setSearch("");
        document.body.style.overflow = "hidden";
    }else{
        document.body.style.overflow = "auto";
    }
   }, [isOpen, currentCountry]);

    if(!isOpen) return null;

   return createPortal(
   
   <div className="flag-modal">
    <div className="flag-container">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search country or code"/>
        <div className="flag-content">
         { 
           filterCountry.length > 0 ? (filterCountry.map((c) =>
            <p key={c.code} onClick={() => handleSelect(c)} style={{backgroundColor: selectedCountry === c.country ? "#00F5D4" : "none", 
                fontWeight: selectedCountry === c.country ? "bold" : "normal",
                color: selectedCountry === c.country ? "black" : "white"
            }}> 
            <img src={c.flag} alt={c.code} /> 
            <b>{c.cCode}</b>
           <b> {c.country}</b>
            {selectedCountry === c.country && (
                <span className="material-symbols-outlined">check</span>
            )}</p>
           )) : (
            <p>No search result found</p> 
             )}
        </div>
        <div className="selector-btn">
            <button onClick={onClose}>Close</button>
        </div>
    </div>
   </div>,
   document.body
   
   );
}
export default CountryCodeSelector;