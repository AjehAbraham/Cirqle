import { useState } from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import Welcome from "./home/Welcome";
import WelcomeScreen from './home/WelcomeScreen2';
import WelcomeScreen3 from './home/WelcomeScreen3';
import Terms from "./home/TermsConditions";
import Login from './accounts/auth/login';
import VerifyOtp from './accounts/auth/verifyOtp';
import FinishReg from "./accounts/setup_account";

import MainChats from "./accounts/message/chats";
import ViewMessage from "./accounts/message/view_message";

import AddContact from "./accounts/components/AddContact";
import CreateGroup from "./accounts/components/CreateGroup";

import MyProfile from "./accounts/profile/MyProfile";
import ViewProfile from "./accounts/profile/ViewProfile";

import CallLog from "./accounts/calls/CallLog";

import GeneralSettings from "./accounts/settings/GeneralSettings";
import PrivacySetting from "./accounts/settings/PrivacySettings";
import Notification from "./accounts/settings/NotificationSettings";


function App() {
 {/*
 const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem("Theme") || "System");
const [showThemeModal, setShowThemeModal] = useState(false);

const handleTheme = () => setShowThemeModal(true);*/}
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/welcome" element={<WelcomeScreen />} />
      <Route path="/welcome2" element={<WelcomeScreen3 />} />
      <Route path="/terms_and_conditions" element={<Terms />} />

      
      <Route path="/accounts/auth/login" element={<Login />} />
      <Route path="/accounts/auth/verifyOtp" element={<VerifyOtp />} />
      
       {/* AUTHENTICATED ROUTES */}
       <Route path="/accounts/account_setup" element={<FinishReg />} />
       <Route path="/accounts/message/chats" element={<MainChats />} />
       <Route path="/accounts/message/:id/view" element={<ViewMessage />} />
       
       <Route path="/accounts/contacts/view" element={<AddContact />} />
       <Route path="/accounts/create-group" element={<CreateGroup />} />
       
       <Route path="/accounts/profile" element={<MyProfile />} />
       <Route path="/accounts/:id/view_profile" element={<ViewProfile />} />
       
       <Route path="/accounts/call/call-log" element={<CallLog />} /> 
       
       <Route path="/accounts/settings/general_settings" element={<GeneralSettings />} />
       <Route path="/accounts/settings/privacy_setting" element={<PrivacySetting />} />
       <Route path="/accounts/settings/notification_setting" element={<Notification />} />
       
      </Routes>
      </BrowserRouter>
</>

  );
}

export default App;
