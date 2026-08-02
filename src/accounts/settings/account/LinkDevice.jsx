import { useState } from "react";
import { createPortal } from "react-dom";
import "./css/link_device.css";
import { useNavigate } from "react-router";
import useTitle from "../../../components/UseTitle";
export default function LinkDevice(){
    useTitle("Link devices");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenLink, setIsOpenLink] = useState(false);
    const [selectedDevice, setSelected] = useState(null);
    const navigate = useNavigate();

    const arry = [
        {id: 1, name: "Iphone 11", desc: "Current", location: "Lagos, Nigeria", status: "Active now"},
        {id: 2, name: "Windows", desc: "This Device", location: "Abuja, Nigeria", status: "Today at 12:18AM"},
        {id: 3, name: "Tablet", desc:"", location: "Jos, Nigeria", status: "Today at 6:15PM"},
        {id: 4, name: "mac", desc: "", location: "Enugu, Nigeria", status: "1 hour ago"},
        {id: 5, name: "web", desc: "", location: "Lagos, Nigeria", status: "Just now"},
        {id: 6, name: "ipad", desc: "", location: "Lagos, Nigeria", status: "Just now"},
        {id: 7, name: "unknown", desc: "", location: "Lagos, Nigeria", status: "Just now"}
    ];

    const getDeviceIcon = (name) =>{
        const deviceName = name.toLowerCase();
        if(deviceName.includes("iphone") || deviceName.includes("android") || deviceName.includes("mobile")) return "mobile_2"; // fixed typo
        if(deviceName.includes("windows") || deviceName.includes("pc") || deviceName.includes("desktop")) return "laptop_windows";
        if(deviceName.includes("mac") || deviceName.includes("macbook")) return "laptop_mac";
        if(deviceName.includes("web") || deviceName.includes("browser") || deviceName.includes("chrome")) return "public";
        if(deviceName.includes("ipad") || deviceName.includes("tablet")) return "tablet_mac";
        return "device_unknown";
    }

    const handleSession = (device) =>{
        setSelected(device);
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
        setSelected(null);
    }

    return(
        <>
       
        <LinkSessionManager isOpen={isOpen} onClose={handleClose} device={selectedDevice}/>
        <LinkDeviceModal isOpen={isOpenLink} onClose={() => setIsOpenLink(false)} />
        
        <div className="main-container-for-link-device">
            <div className="header-for-link-device">
                <span className="material-symbols-outlined" onClick={() => navigate(-1)}>arrow_back</span>
                <h1>Link Device</h1>
            </div>
            <div className="container-for-link-device">
                <span className="material-symbols-outlined">mobile_2</span>
                <span className="material-symbols-outlined">more_horiz</span>
                <span className="material-symbols-outlined">laptop_windows</span>
            </div>
            <p>Use Cirqle on other device</p>
            <button onClick={() => setIsOpenLink(true)}>Link a Device</button>

            { arry.length > 0 ?(
            <div className="lower-content-for-link-device">
                <h1>All Sync Devices</h1>
                { arry.map((device) => (
                
                <div className="content-content-for-links" key={device.id} onClick={() => handleSession(device)}>
                    <div className="content-header-for-link">
                        <span className="material-symbols-outlined">{getDeviceIcon(device.name)}</span>
                        <h1>{device.name}</h1>
                        <p>{device.desc}</p>
                    </div>
                    <div className="lower-list-for-link">
                        <p>{device.location}</p>
                        <p>{device.status}</p>
                    </div>
                </div>
                ))}
                <p>Tap to logout device</p>
            </div> 
            ):(
                <p style={{marginTop: "10px"}}>No Linked Device</p>
            ) }
        </div>
        </>
    );
}

function LinkDeviceModal({isOpen, onClose}){
    if(!isOpen) return null;
    return createPortal(
       <div className="scan-modal-overlay">
        <div className="scan-Modal-content">
            <div className="scan-modal-header">
              <span className="material-symbols-outlined" onClick={onClose}>close</span>
              <h3>Scan to Link Device</h3>  
            </div>
            
           <span className="material-symbols-outlined" id="qr_code_span">qr_code</span>  
           <p>Scan Qr code on the other device your want to link</p>
        </div>
       </div>,
       document.body
    );
}

function LinkSessionManager({isOpen, onClose, device}){
    const getDeviceIcon = (name) =>{
        const deviceName = name.toLowerCase();
        if(deviceName.includes("iphone") || deviceName.includes("android") || deviceName.includes("mobile")) return "mobile_2"; // fixed typo
        if(deviceName.includes("windows") || deviceName.includes("pc") || deviceName.includes("desktop")) return "laptop_windows";
        if(deviceName.includes("mac") || deviceName.includes("macbook")) return "laptop_mac";
        if(deviceName.includes("web") || deviceName.includes("browser") || deviceName.includes("chrome")) return "public";
        if(deviceName.includes("ipad") || deviceName.includes("tablet")) return "tablet_mac";
        return "device_unknown";
    }
    
    if(!isOpen || !device) return null;
    
    return createPortal(
        <div className="link-modal-overlay">
            <div className="modal-content-for-link-devices">
                <div className="link-modal-header">
                <span className="material-symbols-outlined" onClick={onClose}>close</span>
                <h3>Manage Device</h3>
                </div>
                <div className="info-for-modal-link">
                    <span className="material-symbols-outlined" id="span-logo">{getDeviceIcon(device.name)}</span>
                    <p>{device.name}</p>
                    <p>Id: {device.id}</p> 
                    <p><span className="material-symbols-outlined">history</span>{device.location} {device.status}</p>
                   { device.desc != "" ? (<p><span className="material-symbols-outlined">captive_portal</span>{device.desc}</p>):("") }
                    <button onClick={() => console.log("Logout", device.id)}>Log out</button>
                </div>
            </div>
        </div>,
        document.body
    );
}