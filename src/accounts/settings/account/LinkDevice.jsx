import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./css/link_device.css";
import { useNavigate } from "react-router";
import api from "../../../api/axios";
import useTitle from "../../../components/UseTitle";
import Loader from "../../components/Loader";

export default function LinkDevice(){
    useTitle("Link devices");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenLink, setIsOpenLink] = useState(false);
    const [selectedDevice, setSelected] = useState(null);
    const [openLoader, setOpenLoader] = useState(false);
    const [loaderTitile, setLoaderTitle] = useState("");
    const [devices, setDevices] = useState([]);
    const navigate = useNavigate();

  
    const loadDevices = async () => {
        setOpenLoader(true);
        setLoaderTitle("loading devices...");
        try{
        const {data} = await api.post("/account/devices");
        if(data.success) setDevices(data.data);
        }catch(error){
           const backendError = error.response?.data.error;
           const statusCode = backendError?.status || 500;
           const code = backendError?.code || "NO_CODE";
           const message = backendError?.message || "Unknown error occured";
        }finally{
            setOpenLoader(false);
            setLoaderTitle("");
        }

    }
    useEffect( () => {
        loadDevices();
    }, []);

    const getDeviceIcon = (name) =>{
        const deviceName = name.toLowerCase();
        if(deviceName.includes("iphone") || deviceName.includes("android") || deviceName.includes("mobile")) return "mobile_2";
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
    function formatDate(dbDate){
     const date = new Date(dbDate);
     return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Africa/Lagos"
     });
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

            { devices.length > 0 ?(
            <div className="lower-content-for-link-device">
                <h1>All Sync Devices</h1>
                { devices.map((device) => (
                
                <div className="content-content-for-links" key={device._id} onClick={() => handleSession(device)}>
                    <div className="content-header-for-link">
                        <span className="material-symbols-outlined">{getDeviceIcon(device.DeviceName)}</span>
                        <h1>{device.DeviceName}</h1>
                        <p>Active</p>
                    </div>
                    <div className="lower-list-for-link">
                        <p><b>Last Active:</b> {formatDate(device.LastActive)}</p>
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
        if(deviceName.includes("iphone") || deviceName.includes("android") || deviceName.includes("mobile")) return "mobile_2";
        if(deviceName.includes("windows") || deviceName.includes("pc") || deviceName.includes("desktop")) return "laptop_windows";
        if(deviceName.includes("mac") || deviceName.includes("macbook")) return "laptop_mac";
        if(deviceName.includes("web") || deviceName.includes("browser") || deviceName.includes("chrome")) return "public";
        if(deviceName.includes("ipad") || deviceName.includes("tablet")) return "tablet_mac";
        return "device_unknown";
    }
    function formatDate(dbDate){
     const date = new Date(dbDate);
     return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Africa/Lagos"
     });
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
                    <span className="material-symbols-outlined" id="span-logo">{getDeviceIcon(device.DeviceName)}</span>
                    <p style={{textTransform: "capitalize"}}>{device.DeviceName}</p>
                    <p><span className="material-symbols-outlined">history</span><b>IP: </b>{device.IP || ""}; <b>Last Active: </b> {formatDate(device.LastActive)} </p>
                   { device.UserAgent?.browser != "" ? (<p style={{textTransform: "capitalize"}}>
                    <span className="material-symbols-outlined">captive_portal</span>{device.UserAgent?.browser}</p>):("") }
                    <button onClick={() => console.log("Logout", device._id)}>Log out</button>
                </div>
            </div>
        </div>,
        document.body
    );
}