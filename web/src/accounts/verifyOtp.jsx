
import { useState, useEffect, useRef } from "react";
import app_logo from "../assets/app_logo.png";
import "./css/verify_otp.css";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyOtp(){
  const [otp, setOtp] = useState(["", "", ""]);
  const inputsRef = useRef([]);

  const location = useLocation();
  const { code, phone, country, flag } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  const handleKeyDown = (e, index) => {
    
    if (e.key === "Backspace" &&!otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1]?.focus();
    }
  }

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 5);
    if (!paste) return;

    const newOtp = paste.split("");
    while (newOtp.length < 5) newOtp.push("");
    setOtp(newOtp);

    
    const lastIndex = Math.min(paste.length - 1, 4);
    inputsRef.current[lastIndex]?.focus();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length === 5) {
      alert(`Verifying ${fullOtp} for ${code}${phone}`);
      
    }
  }

  return(
    <div className="otp-main-container">
      <div className="otp-logo">
        <img src={app_logo} alt="logo" />
      </div>

      <div className="wrapper-container">
        <h1>Verify phone number</h1>

        <form onSubmit={handleSubmit}>
          <p>
            Enter OTP sent to <img src={flag} alt="country" />
            <b>{code} {phone}</b>
            <span onClick={() => navigate("/login")}> Change</span>
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
                disabled={index > 0 &&!otp[index - 1]} // enable next only after prev filled
                autoComplete="one-time-code"
              />
            ))}
          </div>

          <button type="submit" disabled={otp.join("").length!== 5}>
            Verify
          </button>
        </form>

        <p>Having trouble receiving OTP? click <a href="/">here</a></p>
      </div>
    </div>
  );
}

export default VerifyOtp;