import { useState, useEffect} from "react";
import useTitle from "../components/UseTitle";
import LanguageModal from "../components/LanguageSelector";
import "./css/login.css";
import app_logo from "../assets/app_logo.png";
import CountryCodeSelector from "./components/CountryCode.jsx";
import ng_flag from "../assets/flags/ng_flag.WEBP";
import {useNavigate} from "react-router-dom";
//import VerifyOtp from "./verifyOtp.jsx";

function  Login(){
    useTitle("Login");
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [language, setLang] = useState("English");
    const handleSelect = (lang) => {
     setLang(lang);
    }
    const [openCountry, setOpenCountry] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({
      country: "Nigeria",
      cCode: "+234",
      code: "NG",
      flag: ng_flag
    });
   
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
   setPhone("");
   setIsValid(false);

  }, [selectedCountry.code]);

// Country config: max digits, how many leading digits to strip, format groups, placeholder
const countryConfig = {
  NG: { max: 11, strip: 1, format: [3,4,4], placeholder: "080 1234 5678" }, // Nigeria
  KE: { max: 11, strip: 2, format: [3,3,3], placeholder: "071 234 567" },   // Kenya 07123456789
  GH: { max: 11, strip: 2, format: [2,3,4], placeholder: "02 412 3456" },   // Ghana 02041234567
  US: { max: 11, strip: 1, format: [3,3,4], placeholder: "234 567 8901" },  // USA 12345678901
  CA: { max: 11, strip: 1, format: [3,3,4], placeholder: "416 555 1234" },  // Canada
  IN: { max: 11, strip: 1, format: [5,5], placeholder: "98 7654 3210" },    // India 09876543210
  FR: { max: 11, strip: 2, format: [1,2,2,2,2], placeholder: "06 12 34 56 78" }, // France 0033612345678
  AU: { max: 11, strip: 2, format: [4,3,3], placeholder: "0412 345 678" },  // Australia 04123456789
  ZA: { max: 11, strip: 2, format: [2,3,4], placeholder: "07 123 4567" },   // South Africa 0712345678
  GB: { max: 11, strip: 2, format: [4,3,4], placeholder: "0712 345 6789" }, // UK 07123456789
}

const config = countryConfig[selectedCountry.code] || { max: 11, strip: 0, format: [3,3,4], placeholder: "enter number" };

const formatPhone = (value) => {
  let digits = value.replace(/\D/g, "");
  digits = digits.slice(0, config.max);
  
  
  let result = "";
  let index = 0;
  config.format.forEach(len => {
    if (digits.length > index) {
      if (result) result += " ";
      result += digits.substr(index, len);
      index += len;
    }
  });
  return result;
}


const handlePhoneChange = (e) => {
  const formattedPhone = formatPhone(e.target.value);
  setPhone(formattedPhone);
   const digitsOnly = formattedPhone.replace(/\s/g, "");
   const requiredDigits = config.max - config.strip;
    setIsValid(digitsOnly.length >=  requiredDigits);

}

const handleSubmit = (e) => {
  e.preventDefault();
let digitsOnly = phone.replace(/\s/g, "");
if (digitsOnly.length === config.max && config.strip > 0) {
  digitsOnly = digitsOnly.slice(config.strip);
}
const fullNumber = selectedCountry.cCode + digitsOnly;
 alert(selectedCountry.code + " " + fullNumber);
 //const navigate = useNavigate();
 navigate("/verifyOtp", {state: {code: selectedCountry.cCode, phone: digitsOnly, country: selectedCountry, flag: selectedCountry.flag}});
}
    return(
      <>
      <LanguageModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSelect={handleSelect} currentLang={language} />
        <CountryCodeSelector isOpen={openCountry} onClose={() => setOpenCountry(false)} onSelect={setSelectedCountry} currentCountry={selectedCountry.country} />
        <div className="lang-selector" onClick={() => setIsOpen(true)}>
         <span className="material-symbols-outlined">language</span>
          {language}
         <span className="material-symbols-outlined"> keyboard_arrow_down</span>
        </div>
        <div className="login-main-container">
         <div className="logo-container">
          <img src={app_logo} alt="Cirqle logo" />
         </div>
        <div className="content-main-container">
          <h1>Login/Sign-up</h1>
          <h1>Enter your phone number to login or create account</h1>
          <form method="post" onSubmit={handleSubmit}>
          <div className="input-container" >
            <div className="wrapper" onClick={() => setOpenCountry(true)}>
            <img src={selectedCountry.flag} alt={selectedCountry.flag} />
            <p>{selectedCountry.cCode}</p>
            <span className="material-symbols-outlined"> keyboard_arrow_down</span>
            </div>
            <input type="tel" value={phone} inputMode="numeric" placeholder={config.placeholder}
             onChange={handlePhoneChange} style={{border: phone && !isValid ? "2px solid #ff4d4f" : "2px solid #aaaa"}}/>
          </div>
          {phone && !isValid && (
            <p className="phone_error">Enter {config.max - config.strip } digits</p>
          )}
          <p>By clicking continue you agree to the <a href="/">Terms & Conditions</a></p>
          <p>Privacy policy</p>
          <button disabled={!isValid}>Continue</button>
          </form>
        </div>
        <p>Having trouble trying to sign-in? Click <a href="/">here</a></p>
      </div>
      </>
    );

}

export default Login;