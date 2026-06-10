import { useState } from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import Welcome from "./home/Welcome.jsx";
import WelcomeScreen from './home/WelcomeScreen2.jsx';
import WelcomeScreen3 from './home/WelcomeScreen3.jsx';
import Terms from "./home/Terms_conditions.jsx";
import Login from './accounts/login.jsx';
import VerifyOtp from './accounts/verifyOtp.jsx';
import FinishReg from "./accounts/setup_account.jsx";
import MainChats from "./accounts/message/chats.jsx";

function App() {
 
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/welcomeScreen" element={<WelcomeScreen />} />
      <Route path="/welcomeScreen3" element={<WelcomeScreen3 />} />
      <Route path="/terms_conditions" element={<Terms />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verifyOtp" element={<VerifyOtp />} />
      
       {/* AUTHENTICATED PATHS */}
       <Route path="/account_setup" element={<FinishReg />} />
       <Route path="/accounts/message/chats" element={<MainChats />} />
      </Routes>
      </BrowserRouter>
</>
  );
}

export default App;
