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
import ViewMessage from "./accounts/message/ViewMessage";

import AddContact from "./accounts/components/AddContact";
import CreateGroup from "./accounts/components/CreateGroup";

import MyProfile from "./accounts/profile/MyProfile";
import ViewProfile from "./accounts/profile/ViewProfile";

import CallLog from "./accounts/calls/CallLog";

import GeneralSettings from "./accounts/settings/GeneralSettings";
import AccountHome from "./accounts/settings/account/home";
import ChatSettings from './accounts/settings/ChatSettings';
import PrivacySetting from "./accounts/settings/PrivacySettings";
import Notification from "./accounts/settings/NotificationSettings";
import About from './accounts/settings/About';



import LinkDevice from './accounts/settings/account/LinkDevice';
import ChangePhone from './accounts/settings/account/ChangePhone';
import DeleteAccount from './accounts/settings/account/DeleteAccount';

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
      <Route path="/home/welcome" element={<WelcomeScreen />} />
      <Route path="/home/welcome2" element={<WelcomeScreen3 />} />
      <Route path="/home/terms_and_conditions" element={<Terms />} />

      
      <Route path="/accounts/auth/login" element={<Login />} />
      <Route path="/accounts/auth/verifyOtp" element={<VerifyOtp />} />
      
       {/* AUTHENTICATED ROUTES */}
       <Route path="/accounts/account_setup" element={<FinishReg />} />
       <Route path="/accounts/message/chats" element={<MainChats />} />
       <Route path="/accounts/message/:id/view" element={<ViewMessage />} />
       
       <Route path="/accounts/contacts/view" element={<AddContact />} />
       <Route path="/accounts/create-group" element={<CreateGroup />} />
       
       <Route path="/accounts/profile" element={<MyProfile />} />
       <Route path="/accounts/profile/:id/view" element={<ViewProfile />} />
       
       <Route path="/accounts/call/call-log" element={<CallLog />} /> 
       
       <Route path="/accounts/settings/general_settings" element={<GeneralSettings />} />
       <Route path='/accounts/settings/account_setting' element={<AccountHome />} />
       <Route path='/accounts/settings/chat_settings' element={<ChatSettings />} />
       <Route path="/accounts/settings/privacy_setting" element={<PrivacySetting />} />
       <Route path="/accounts/settings/notification_setting" element={<Notification />} />
        <Route path='/accounts/settings/about' element={<About />} />

       <Route path='/accounts/settings/account/link_device' element={<LinkDevice />} />
       <Route path='/accounts/settings/account/change_phone' element={< ChangePhone />} />
       <Route path='/accounts/settings/account/delete_my_account' element={<DeleteAccount />} /> 
      </Routes>
      </BrowserRouter>
</>

  );
}

export default App;
