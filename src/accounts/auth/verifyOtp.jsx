
import { useState, useEffect, useRef } from "react";
import app_logo from "../../assets/app_logo.png";
import "./css/verify_otp.css";
import { useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../components/UseTitle";

function VerifyOtp(){
  useTitle("Verify OTP");
  
  const location = useLocation();
  const { code, phone, country, flag, total } = location.state || {};
  const navigate = useNavigate();

  const otpLength = total === 1? 5 : total || 5;
  const [otp, setOtp] = useState(() => Array(otpLength).fill(""));
  const inputsRef = useRef([]);

  // Timer state: 59 seconds countdown
  const [seconds, setSeconds] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setOtp(Array(otpLength).fill(""));
    inputsRef.current = Array(otpLength).fill(null);
    setTimeout(() => inputsRef.current[0]?.focus(), 0);
  }, [otpLength]);

  // Countdown logic
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

  const restartTimer = () => {
    setSeconds(59);
    setCanResend(false);
    // TODO: call your resend OTP API here
    console.log("Resending OTP to", code, phone);
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
      setTimeout(() => inputsRef.current[0]?.focus(), 0);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length === otpLength) {
      alert(`Verifying ${fullOtp} for ${code}${phone}`);
        navigate("/accounts/account_setup");
    }
  }

  return(
<div className="wrapper-container-for-otp">
  <div className="otp-main-container">
    <div className="otp-logo">
      <img src={app_logo} alt="logo" />
    </div>
    <h1>Verify phone number</h1>

    <form onSubmit={handleSubmit}>
      <p>
        Enter the {otpLength}-digit code sent to<br />
        <img src={flag} alt="country" />
        <b>{code} {phone}</b><br />
        <span onClick={() => navigate("/login")}>Change</span>
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
  );
}

export default VerifyOtp;