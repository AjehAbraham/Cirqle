import { useState, useEffect, useRef } from "react";
import app_logo from "../../assets/app_logo.png";
import "./css/verify_otp.css";
import { useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../components/UseTitle";
import api from "../../api/axios";
import Loader from "../components/Loader";


function VerifyOtp(){
  useTitle("Verify OTP");
  const [openLoader, setOpenLoader] = useState(false);
  const [loaderTitle, setLoaderTitle] = useState(null);
  const location = useLocation();
  const { code, phone, country, flag, total, session: initialSession, cID: initialCID} = location.state || {};
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState(null);
  const [color, setColor] = useState(false);
  const intervalRef = useRef(null);

  const [currentSession, setCurrentSession] = useState(initialSession);
  const [currentCID, setCurrentCID] = useState(initialCID);

  useEffect(() => {
    if(!code ||!phone || phone.length < 7 ||!currentSession ||!currentCID) {
      navigate("/accounts/auth/login", {replace: true});
    }
  }, [code, phone, currentSession, currentCID, navigate]);

  const validateSession = async () => {
    try{
      const {data} = await api.post("/verifySession", {countryCode: code, Tel: phone, Code: currentCID, session: currentSession});
      if(data.success){
        setColor(true);
        //setApiResponse("");
      }else{
        setColor(false);
        setApiResponse(data.data.message);
        setTimeout(() =>{
          navigate("/accounts/auth/login", {replace: true});
        }, 4000);
      }
    }catch(error){
      setColor(false);
      setApiResponse(error.response?.data?.message || "Session check failed");
    }
  }

  const SESSION_INTERVAL = 5*60*1000;
  useEffect(() => {
    if(code && phone && currentSession && currentCID){
      validateSession();
      /*intervalRef.current = setInterval(() => {
        validateSession();
      }, SESSION_INTERVAL);*/
    }
    return () => clearInterval(intervalRef.current);
  }, [code, phone, currentCID, currentSession]);

  const otpLength = total === 1? 5 : total || 5;
  const [otp, setOtp] = useState(() => Array(otpLength).fill(""));
  const inputsRef = useRef([]);

  const [seconds, setSeconds] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setOtp(Array(otpLength).fill(""));
    inputsRef.current = Array(otpLength).fill(null);
    setTimeout(() => inputsRef.current[0]?.focus(), 0);
  }, [otpLength]);

  useEffect(() => {
    if (seconds > 0 &&!canResend) {
      
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setCanResend(true);
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [seconds, canResend]);

  const restartTimer = async () => {
    setOpenLoader(true);
    setLoaderTitle("Resending...");
    setOtp(null);
    try {
        const { data } = await api.post("/login", {
          countryCode: code,
          Tel: phone,
          Code: currentCID
        });

        if(data.success){
          setColor(true);
          setApiResponse(data.data.message);
          setSeconds(59);
          setCanResend(false);
          setCurrentSession(data.data.session);
        }else{
          setColor(false);
          setApiResponse(data.data.message);
        }
      }catch(error){
        setApiResponse("Failed to resend OTP");
        setColor(false);
      }finally{
        setOpenLoader(false);
      }
  }

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "").slice(-1);
    if (!value) return;
    setOtp(prev => {
      const newOtp = [...prev];
      newOtp[index] = value;
      return newOtp;
    });
    if (index < otpLength - 1) {
      setTimeout(() => inputsRef.current[index + 1]?.focus(), 0);
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      setOtp(Array(otpLength).fill(""));
      inputsRef.current[0]?.focus();
    }
  }

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, otpLength);
    if (!paste) return;
    const newOtp = Array(otpLength).fill("");
    paste.split("").forEach((char, i) => newOtp[i] = char);
    setOtp(newOtp);
    const lastIndex = Math.min(paste.length - 1, otpLength - 1);
    setTimeout(() => inputsRef.current[lastIndex]?.focus(), 0);
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoaderTitle("Verifying...");
  setOpenLoader(true);
  setApiResponse(null);

  const fullOtp = otp.join("");
  if (fullOtp.length!== otpLength) {
    setColor(false);
    setApiResponse(`Please enter ${otpLength} digits`);
    setOpenLoader(false);
    return;
  }

  try {
    const { data } = await api.post("/verify/otp", {
      countryCode: code, Tel: phone, otp: fullOtp, session: currentSession
    });

    if(data.success){
      const user = data.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      setColor(true);
      if(data.data.user?.abtCode === 0){
      navigate("/accounts/account_setup", { replace: true });
      }else if(data.data.user?.abtCode === 1){
       // navigate("/accounts/message/chats", { replace: true });
       const from = location.state?.from || "/accounts/message/chats";
       navigate(from, {replace: true});
      }
    } else {
      setColor(false);
      setApiResponse(data.data.message || "Error occured");
    }

  } catch(error){
    setColor(false);
    const msg = error.response?.data?.error?.message || "Verification failed";
    const code = error.response?.data?.error?.code || "UNKNOWN_CODE"; 
    setApiResponse(`${code}: ${msg}`);
  }finally{
     setOpenLoader(false);
  }
}

  return(
    <>
    <Loader isOpen={openLoader} title={loaderTitle}/>
    <div className="wrapper-container-for-otp">
      <div className="otp-main-container">
        <div className="otp-logo">
          <img src={app_logo} alt="logo" />
        </div>
        <h1>Verify phone number</h1>
        <form onSubmit={handleSubmit}>
          <p>
            Enter the {otpLength}-digit code sent to<br />
            <img src={flag} alt={country} /> {currentCID}
            <b>{code} {phone}</b><br />
            <span onClick={() => navigate("/accounts/auth/login")}>Change</span>
          </p>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputsRef.current[index] = el}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                autoComplete="one-time-code"
              />
            ))}
            </div>
            {apiResponse && (
              color? <p style={{color: "var(--absText)"}}>{apiResponse}</p>:
              <p style={{color: "red"}}>{apiResponse}</p>
            )}
          <div className="resend-container">
            {canResend? (
              <p className="resend-text">
                Didn't get the code? <b onClick={restartTimer}>Resend</b>
              </p>
            ) : (
              <p className="timer-text">
                Resend code in 00:{seconds.toString().padStart(2, '0')}
              </p>
            )}
          </div>
          <button type="submit" disabled={otp.join("").length!== otpLength}>
            Verify
          </button>
          <p>Having trouble receiving OTP? click <a href="/home/support/help?tab=otp&text=trouble">here</a></p>
        </form>
      </div>
    </div>
    </>
  );
}

export default VerifyOtp;