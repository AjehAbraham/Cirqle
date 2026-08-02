import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import "./css/delete_account.css";
import useTitle from "../../../components/UseTitle";
const COUNTRIES = [
  { name: "Nigeria", code: "+234", flag: "🇳🇬", example: "8061234567" },
  { name: "USA", code: "+1", flag: "🇺🇸", example: "2025550123" },
  { name: "Ghana", code: "+233", flag: "🇬🇭", example: "241234567" },
  { name: "South Africa", code: "+27", flag: "🇿🇦", example: "711234567" },
  { name: "Canada", code: "+1", flag: "🇨🇦", example: "4165550123" },
  { name: "Australia", code: "+61", flag: "🇦🇺", example: "412345678" },
  { name: "France", code: "+33", flag: "🇫🇷", example: "612345678" },
];

export default function DeleteAccount(){
    useTitle("Delete Account");
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState(COUNTRIES[0]);
    const [isOpen, setIsOpen] = useState(false);

    const actualNumber = "+2349061748136";

    const normalize = (num) => num.replace(/\D/g, "");
    const fullNumber = `${country.code}${normalize(phone)}`;

    const handleCountryChange = (e) => {
        const selected = COUNTRIES[e.target.selectedIndex];
        setCountry(selected);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(fullNumber === actualNumber){
            setIsOpen(true);
        } else {
            alert("Number does not match");
        }
    }

    return(
     <>
    <OtpModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      phoneNumber={fullNumber}
    />

     <div className="main-container-for-delete">
        <div className="header-for-delete">
            <span className="material-symbols-outlined" onClick={() => navigate(-1)}>arrow_back</span>
            <h1>Delete My Account</h1>
        </div>
        <div className="content-for-delete">
          <span className="material-symbols-outlined">delete</span>
          <h3>Deleting your account will:</h3>
          <ul>
            <li>Delete your account info and profile</li>
            <li>Remove you from all your groups</li>
            <li>Delete your message history</li>
            <li>You won't be able to recover your account</li>
          </ul>
          <h3>To continue, confirm your number</h3>
          <p>Test number: {actualNumber}</p>

          <form onSubmit={handleSubmit}>
            <div className="phone-input-wrapper">
                <select value={country.name} onChange={handleCountryChange}>
                    {COUNTRIES.map(c => (
                        <option key={c.name} value={c.name}>{c.flag} {c.name} {c.code}</option>
                    ))}
                </select>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder={country.example}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <button type="submit" disabled={!phone}>
              Delete My Account
            </button>
          </form>
        </div>
     </div>
     </>
    );
}

function OtpModal({ isOpen, onClose, phoneNumber }){
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [time, setTime] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const inputsRef = useRef([]);

    const isComplete = otp.every(digit => digit!== '');

    useEffect(() => {
        if(time <= 0) return;
        const interval = setInterval(() => setTime(prev => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [time]);

    useEffect(() => {
        if(isOpen){
            setOtp(['', '', '', '', '', '']);
            sendOtp();
            setTimeout(() => inputsRef.current[0]?.focus(), 100);
        }
    }, [isOpen]);

    if(!isOpen) return null;

    const sendOtp = async () => {
        setIsSending(true);
        try {
            console.log("OTP sent to", phoneNumber);
            setTime(60);
        } catch (err) {
            console.error("Failed to send OTP", err);
            alert("Failed to send OTP");
        } finally {
            setIsSending(false);
        }
    }

    const handleResend = () => {
        if(time > 0 || isSending) return;
        sendOtp();
    }

    const handleOtpChange = (value, index) => {
        if(!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if(value && index < 5) inputsRef.current[index + 1].focus();
        if(!value && index > 0) inputsRef.current[index - 1].focus();

        if(value && index === 5){
            setTimeout(() => handleVerify(newOtp.join('')), 100);
        }
    }

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text').slice(0,6);
        if(/^\d{6}$/.test(paste)){
            e.preventDefault();
            const pastedOtp = paste.split('');
            setOtp(pastedOtp);
            inputsRef.current[5].focus();
            setTimeout(() => handleVerify(paste), 100);
        }
    }

    const handleVerify = (code = otp.join('')) => {
        console.log("Verifying OTP:", code, "for", phoneNumber);
        onClose();
    }

    const formatTime = (s) => `0:${s < 10? `0${s}` : s}`;

    return createPortal(
        <div className="Modal-for-delete-overlay" onClick={onClose}>
            <div className="content-container-for-delete" onClick={(e) => e.stopPropagation()}>
             <div className="content-header-for-otp">
                <h3>Verify phone number</h3>
                <span className="material-symbols-outlined" onClick={onClose}>close</span>
             </div>
             <p>Code sent to <b>{phoneNumber}</b></p>

             <div className="otp-inputs" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                    <input
                        type="tel"
                        inputMode="numeric"
                        key={index}
                        maxLength={1}
                        value={digit}
                        ref={el => inputsRef.current[index] = el}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                    />
                ))}
             </div>

             <div className="resend-section">
                {time > 0? (
                    <p>Resend OTP in {formatTime(time)}</p>
                ) : (
                    <button onClick={handleResend} disabled={isSending} className="link-btn">
                        {isSending? "Sending..." : "Click to resend OTP"}
                    </button>
                )}
             </div>

             <button onClick={() => handleVerify()} disabled={!isComplete}>
                Verify
             </button>
            </div>
        </div>,
        document.body
    );
}