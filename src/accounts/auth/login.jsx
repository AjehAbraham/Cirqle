import { useState, useEffect} from "react";
import useTitle from "../../components/UseTitle";
import LanguageModal from "../../components/LanguageSelector";
import "./css/login.css";
import app_logo from "../../assets/app_logo.png";
import CountryCodeSelector from "../components/CountryCode";
import ng_flag from "../../assets/flags/ng_flag.WEBP";
import {useNavigate, useLocation} from "react-router-dom";
import api from "../../api/axios";
import Loader from "../components/Loader";
import StatusMessageModal from "../components/StatusMessage";
import authRedirect from "./auth";

function Login(){
    authRedirect();
    
    useTitle("Login");
    const navigate = useNavigate();
    const location = useLocation();
    const [openLoader, setOpenLoader] = useState(false);
    const [loaderTitle, setLoaderTitle] = useState(null);
    const [openStatus, setOpenStatus] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);
    const [color, SetColor] = useState(false);
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
      flag: ng_flag,
    });
   
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
   setPhone("");
   setIsValid(false);
  }, [selectedCountry.code]);

const countryConfig = {
  NG: { max: 11, strip: 1, format: [3,4,4], placeholder: "080 1234 5678" },
  KE: { max: 11, strip: 2, format: [3,3,3], placeholder: "071 234 567" },
  GH: { max: 11, strip: 2, format: [2,3,4], placeholder: "02 412 3456" },
  US: { max: 11, strip: 1, format: [3,3,4], placeholder: "234 567 8901" },
  CA: { max: 11, strip: 1, format: [3,3,4], placeholder: "416 555 1234" },
  IN: { max: 11, strip: 1, format: [5,5], placeholder: "98 7654 3210" },
  FR: { max: 11, strip: 2, format: [1,2,2,2,2], placeholder: "06 12 34 56 78" },
  AU: { max: 11, strip: 2, format: [4,3,3], placeholder: "0412 345 678" },
  ZA: { max: 11, strip: 2, format: [2,3,4], placeholder: "07 123 4567" },
  GB: { max: 11, strip: 2, format: [4,3,4], placeholder: "0712 345 6789" },
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
  setIsValid(digitsOnly.length >= requiredDigits);
}

const handleSubmit = async (e) => {
  e.preventDefault();
  if(openLoader) return;
  setLoaderTitle("Loading...");
  setOpenLoader(true);
  setApiResponse(null);

  let digitsOnly = phone.replace(/\s/g, "");
  if (digitsOnly.length === config.max && config.strip > 0) {
    digitsOnly = digitsOnly.slice(config.strip);
  }

  try {
    const response = await api.post("/login", {
      countryCode: selectedCountry.cCode, 
      Tel: digitsOnly, 
      Code: selectedCountry.code
    });

    if(response.data.success) {
       SetColor(false); 
       setApiResponse(response.data.message);
       navigate("/accounts/auth/verifyOtp", {state: {code: selectedCountry.cCode, phone: digitsOnly, country: selectedCountry.country,
         flag: selectedCountry.flag, total: response.data.data.len, session: response.data.data.session, cID: selectedCountry.code}});
    } else {
      SetColor(true);
      setApiResponse(response.data.error.message);
    }

  } catch(error){
    const backendError = error.response?.data?.error; 
    const msg = backendError?.message || "Unknown error";
    const code = backendError?.code || "NO_CODE";
    SetColor(true);
    setApiResponse(`${code}: ${msg}`); 
  } finally{
    setOpenLoader(false);
  }
}
    return(
      <>
      <Loader isOpen={openLoader} title={loaderTitle}/>
      <LanguageModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSelect={handleSelect} currentLang={language} />
        <CountryCodeSelector isOpen={openCountry} onClose={() => setOpenCountry(false)} onSelect={setSelectedCountry} currentCountry={selectedCountry.country} />
        <div className="lang-selector" onClick={() => setIsOpen(true)}>
          <span className="material-symbols-outlined">language</span>
          <span>{language}</span>
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </div>

        <div className="login-main-container">
          <div className="logo-container-for-login">
            <img src={app_logo} alt="Cirqle logo" />
          </div>
          
          <div className="content-main-container">
            <h1>Enter your phone number to login or create account</h1>
            
            <form method="post" onSubmit={handleSubmit} style={{width: '100%'}}>
              <div className="input-wrapper-for-login">
                <div className="input-containers-for-login" style={{borderColor: phone && !isValid ? "#ff4d4f" : "var(--border)"}}>
                  <div className="wrappers-for-login" onClick={() => setOpenCountry(true)}>
                    <img src={selectedCountry.flag} alt={selectedCountry.name} />
                    <p>{selectedCountry.cCode}</p>
                    <span className="material-symbols-outlined">keyboard_arrow_down</span>
                  </div>
                  <input 
                    type="tel" 
                    value={phone} 
                    inputMode="numeric" 
                    placeholder={config.placeholder}
                    onChange={handlePhoneChange}
                  />
                </div>
                { apiResponse && (
                  color ?
                  <p className="phone_error" style={{userSelect: "text", color: "red"}}>{apiResponse}</p> :
                  <p className="phone_error" style={{userSelect: "text", color: "var(--absText)"}}>{apiResponse}</p>
                )}
                {phone && !isValid && (
                  <p className="phone_error"> Enter at least {config.max - config.strip} digits</p>
                )}
              </div>
              
              <div className="terms-text">
                <p>By clicking continue you agree to the <a href="/terms_and_conditions" target="_blank">Terms & Conditions</a></p>
                <p>Privacy policy</p>
              </div>
              
              <button disabled={!isValid || openLoader}>Continue</button>
            </form>
            
            <p>Having trouble trying to sign-in? Click <a href="/home/support/help?tab=login&text=trouble" target="_blank">here</a></p>
          </div>
        </div>
      </>
    );
}

export default Login;