import "./css/about.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import app_logo from "../../assets/app_logo.png";
import useTitle from "../../components/UseTitle";

export default function About(){
    useTitle("About");
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("menu"); 

    const openTab = (tab) => setActiveTab(tab);
    const backToMenu = () => setActiveTab("menu");

    return(
      <div className="main-container-for-about">
        {activeTab === "menu" && (
          <>
            <div className="header-for-about">
                <span className="material-symbols-outlined" onClick={() => navigate(-1)}>arrow_back</span>
                <h1>About</h1>
            </div>
            <div className="container-for-about-content">
                <div className="logo-header-for-about">
                    <img src={app_logo} alt="Cirqle logo" />
                    <h1>Cirqle</h1>
                    <h3>Version 1.0.0</h3>
                </div>
                <div className="content-list-for-about">
                    <p onClick={() => openTab("terms")}><span className="material-symbols-outlined">info</span>Terms & Conditions <span className="material-symbols-outlined">arrow_forward_ios</span></p>
                    <p onClick={() => openTab("privacy")}><span className="material-symbols-outlined">policy</span> Privacy Policy <span className="material-symbols-outlined">arrow_forward_ios</span></p>
                    <p onClick={() => openTab("appinfo")}><span className="material-symbols-outlined">apps</span> App Info <span className="material-symbols-outlined">arrow_forward_ios</span></p>
                    <p onClick={() => openTab("help")}><span className="material-symbols-outlined">help</span>Help & Support <span className="material-symbols-outlined">arrow_forward_ios</span></p>
                    <p onClick={() => openTab("licenses")}><span className="material-symbols-outlined">code</span>Open Source Licenses <span className="material-symbols-outlined">arrow_forward_ios</span></p>
                </div>
            </div>
          </>
        )}

        {/* 1. TERMS & CONDITIONS */}
        {activeTab === "terms" && (
          <div className="legal-container">
            <div className="header-for-about">
                <span className="material-symbols-outlined" onClick={backToMenu}>arrow_back</span>
                <h1>Terms & Conditions</h1>
            </div>
            <div className="legal-content">
              <p className="last-updated">Last Updated: July 30, 2026</p>
              <p><b>Welcome to Cirqle</b></p>
              <p>By using Cirqle, you agree to these Terms. Please read them carefully.</p>

              <h2>1. Acceptance of Terms</h2>
              <p>By creating an account or tapping "Accept", you confirm you are at least 13 years old and agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree, do not use Cirqle.</p>

              <h2>2. Your Account</h2>
              <ol>
                <li>You must provide accurate info and keep your password secure.</li>
                <li>You are responsible for all activity under your account.</li>
                <li>One person = one account. Do not impersonate others.</li>
                <li>We may disable accounts that are fake, spam, or violate these terms.</li>
              </ol>

              <h2>3. Acceptable Use</h2>
              <p>You agree NOT to use Cirqle to:</p>
              <ul>
                <li>Send spam, scams, malware, or phishing links</li>
                <li>Harass, bully, threaten, or doxx other users</li>
                <li>Share illegal, hateful, violent, or adult content involving minors</li>
                <li>Impersonate anyone or use bots to automate messaging</li>
                <li>Reverse engineer, hack, or disrupt our servers</li>
              </ul>
              <p>We reserve the right to remove content and ban accounts that break these rules.</p>

              <h2>4. Messaging & Content</h2>
              <ol>
                <li>You own the content you send. You give Cirqle a license to transmit, store, and display it to deliver the service.</li>
                <li>End-to-end encryption is not enabled in v1.0.0. Messages are stored securely on our servers.</li>
                <li>We do not read your private messages. We may review reported content to enforce these Terms.</li>
              </ol>

              <h2>5. Privacy & Data</h2>
              <p>We collect data to run and improve Cirqle. See our Privacy Policy for details on what we collect and how we use it.</p>

              <h2>6. Disappearing Messages</h2>
              <p>Auto-delete timers are a convenience feature. We cannot guarantee deleted messages are unrecoverable. Screenshots and forwarding are still possible.</p>

              <h2>7. Third-Party Services</h2>
              <p>Cirqle may use third-party services for notifications, analytics, and storage. Their terms also apply.</p>

              <h2>8. Termination</h2>
              <p>We may suspend or delete your account at any time if you violate these Terms. You can also delete your account anytime from Settings.</p>

              <h2>9. Changes to Terms</h2>
              <p>We may update these Terms. We will notify you in-app. Continued use = acceptance of new terms.</p>

              <h2>10. Disclaimer & Limitation of Liability</h2>
              <p>Cirqle is provided "as is". We are not liable for data loss, downtime, or damages. Use at your own risk.</p>
              
              <p><b>Contact:</b> support@cirqle.app</p>
            </div>
          </div>
        )}

        {/* 2. PRIVACY POLICY */}
        {activeTab === "privacy" && (
          <div className="legal-container">
            <div className="header-for-about">
                <span className="material-symbols-outlined" onClick={backToMenu}>arrow_back</span>
                <h1>Privacy Policy</h1>
            </div>
            <div className="legal-content">
              <p className="last-updated">Last Updated: July 30, 2026</p>
              <p>At Cirqle, your privacy matters.</p>

              <h2>1. Data We Collect</h2>
              <ol>
                <li><b>Account Data:</b> Phone number, name, profile photo, about</li>
                <li><b>Usage Data:</b> Last seen, online status, device info, app version, crash logs</li>
                <li><b>Messages:</b> Message content, media, timestamps. Stored to deliver messages.</li>
                <li><b>Contacts:</b> If you allow, we upload your contacts to help you find friends</li>
                <li><b>Settings:</b> Notification preferences, privacy settings, theme</li>
              </ol>

              <h2>2. How We Use Data</h2>
              <ol>
                <li>To provide messaging, calls, and notifications</li>
                <li>To improve app performance and fix bugs</li>
                <li>To enforce Terms and prevent spam/abuse</li>
                <li>To personalize features like suggested contacts</li>
              </ol>
              <p>We do NOT sell your personal data to advertisers.</p>

              <h2>3. Data Storage & Security</h2>
              <p>Data is stored on secure cloud servers. We use encryption in transit. v1.0.0 does not have end-to-end encryption yet. We will add it in a future update.</p>

              <h2>4. Data Sharing</h2>
              <p>We only share data with:</p>
              <ol>
                <li>Service providers: hosting, push notifications</li>
                <li>Law enforcement: if required by law or to prevent harm</li>
              </ol>

              <h2>5. Your Rights</h2>
              <p>You can: Access, correct, export, or delete your data.</p>
              <p>To delete: Settings Account Delete My Account. This deletes your profile, groups, and messages.</p>

              <h2>6. Children</h2>
              <p>Cirqle is not for children under 13.</p>

              <h2>7. Contact Us</h2>
              <p>For privacy requests: privacy@cirqle.app</p>
            </div>
          </div>
        )}

        {/* 3. APP INFO */}
        {activeTab === "appinfo" && (
          <div className="legal-container app-info">
            <div className="header-for-about">
                <span className="material-symbols-outlined" onClick={backToMenu}>arrow_back</span>
                <h1>App Info</h1>
            </div>
            <div className="legal-content">
              <div className="app-info-center">
                <img src={app_logo} alt="Cirqle logo" />
                <h1>Cirqle</h1>
                <p>Version 1.0.0</p>
                <p>Build: 100</p>
                <p>Fast. Simple. Secure Messaging.</p>
              </div>
              
              <p><b>Cirqle v1.0.0 - "First Release"</b></p>
              <p>Features: 1-on-1 Chat, Groups, Media Sharing, Voice Notes, Disappearing Messages, Themes</p>
              <p>© 2026 Cirqle Inc. All rights reserved.</p>

              <div className="links">
                <button onClick={() => openTab("terms")}>Terms & Conditions</button>
                <button onClick={() => openTab("privacy")}>Privacy Policy</button>
                <button onClick={() => openTab("licenses")}>Open Source Licenses</button>
              </div>
            </div>
          </div>
        )}

        {/* 4. HELP & SUPPORT */}
        {activeTab === "help" && (
          <div className="legal-container">
            <div className="header-for-about">
                <span className="material-symbols-outlined" onClick={backToMenu}>arrow_back</span>
                <h1>Help & Support</h1>
            </div>
            <div className="legal-content">
              <p><b>Need Help?</b></p>

              <h2>FAQ</h2>
              <ol>
                <li>
                  <p><b>How do I delete my account?</b></p>
                  <p>Settings Account Delete My Account</p>
                </li>
                <li>
                  <p><b>How do disappearing messages work?</b></p>
                  <p>Settings Privacy Auto Disappearing Messages. Choose 24h, 7d, etc.</p>
                </li>
                <li>
                  <p><b>How do I change notification sounds?</b></p>
                  <p>Settings  Notifications  Tap on Message/Call sound</p>
                </li>
                <li>
                  <p><b>Is my data safe?</b></p>
                  <p>Yes. We encrypt data in transit. See Privacy Policy for details.</p>
                </li>
              </ol>

              <h2>Contact Support</h2>
              <p>Stuck? Email us: support@cirqle.app</p>
              <p>Response time: Within 24 hours</p>

              <h2>Report a Problem</h2>
              <p>Settings Help Report a Bug</p>
              <p>Or email: abuse@cirqle.app for spam/harassment reports</p>
            </div>
          </div>
        )}

        {/* 5. OPEN SOURCE LICENSES */}
        {activeTab === "licenses" && (
          <div className="legal-container">
            <div className="header-for-about">
                <span className="material-symbols-outlined" onClick={backToMenu}>arrow_back</span>
                <h1>Open Source Licenses</h1>
            </div>
            <div className="legal-content">
              <p>Cirqle uses the following open source libraries:</p>
              <h2>React</h2>
              <p>MIT License</p>
              <h2>React Router</h2>
              <p>MIT License</p>
              <h2>Material Symbols</h2>
              <p>Apache License 2.0</p>
              <p className="last-updated">Full license texts available at their respective repositories.</p>
            </div>
          </div>
        )}

      </div>
    );
}