import { useState } from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import { useThemeInit } from './accounts/components/ThemeManager';
import Welcome from "./home/Welcome";
import WelcomeScreen from './home/WelcomeScreen2';
import WelcomeScreen3 from './home/WelcomeScreen3';
import Terms from "./home/TermsConditions";
import Login from './accounts/auth/login';
import VerifyOtp from './accounts/auth/verifyOtp';

import ProtectedRoute from './accounts/auth/ProtectedRoute';
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
import Wallpaper from './accounts/settings/chat/wallaper';


import LinkDevice from './accounts/settings/account/LinkDevice';
import ChangePhone from './accounts/settings/account/ChangePhone';
import DeleteAccount from './accounts/settings/account/DeleteAccount';

import VerifyPhone from './accounts/settings/account/VerifyPhone';


function App() {
 useThemeInit();
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
       <Route path="/accounts/account_setup" element={<ProtectedRoute><FinishReg /></ProtectedRoute>} />
       <Route path="/accounts/message/chats" element={<ProtectedRoute><MainChats /></ProtectedRoute>} />
       <Route path="/accounts/message/:id/view" element={<ProtectedRoute><ViewMessage /></ProtectedRoute>} />
       
       <Route path="/accounts/contacts/view" element={<ProtectedRoute><AddContact /></ProtectedRoute>} />
       <Route path="/accounts/create-group" element={<ProtectedRoute><CreateGroup /></ProtectedRoute>} />
       
       <Route path="/accounts/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
       <Route path="/accounts/profile/view/:id/" element={<ProtectedRoute><ViewProfile /></ProtectedRoute>} />
       
       <Route path="/accounts/call/call-log" element={<ProtectedRoute><CallLog /></ProtectedRoute>} /> 
       
       <Route path="/accounts/settings/general_settings" element={<ProtectedRoute><GeneralSettings /></ProtectedRoute>} />
       <Route path='/accounts/settings/account_setting' element={<ProtectedRoute><AccountHome /></ProtectedRoute>} />
       <Route path='/accounts/settings/chat_settings' element={<ProtectedRoute><ChatSettings /></ProtectedRoute>} />
       <Route path="/accounts/settings/privacy_setting" element={<ProtectedRoute><PrivacySetting /></ProtectedRoute>} />
       <Route path="/accounts/settings/notification_setting" element={<ProtectedRoute><Notification /></ProtectedRoute>} />
       <Route path='/accounts/settings/about' element={<ProtectedRoute><About /></ProtectedRoute>} />
       <Route path='/accounts/settings/chat/wallpaper' element={<ProtectedRoute><Wallpaper /></ProtectedRoute>} />


       <Route path='/accounts/settings/account/link_device' element={<ProtectedRoute><LinkDevice /></ProtectedRoute>} />
       <Route path='accounts/settings/account/verify_number' element={<ProtectedRoute><VerifyPhone /></ProtectedRoute>} /> 
       <Route path='/accounts/settings/account/change_phone' element={<ProtectedRoute>< ChangePhone /></ProtectedRoute>} />
       <Route path='/accounts/settings/account/delete_my_account' element={<ProtectedRoute><DeleteAccount /></ProtectedRoute>} /> 
      </Routes>
      </BrowserRouter>
</>

  );
}

export default App;
