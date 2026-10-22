import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import "./css/my_profile.css";
import images from "../../assets/images.jpeg";
import Footer from "../components/Footer";
import useTitle from "../../components/UseTitle";
import app_logo from "../../assets/app_logo.png";
import info_friends_animation from "../../assets/info_friends_animation.PNG";
import interaction_logo from "../../assets/interaction_logo.png";
import api from "../../api/axios";
import Loader from "../components/Loader";

export default function MyProfile() {
  useTitle("MyProfile");
  const [activeTab, setActiveTab] = useState("profile");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [tempName, setTempName] = useState(name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [avatar, setAvatar] = useState();
  const [avatarFile, setAvatarFile] = useState(null);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();
  const nameInputRef = useRef(null);
  const [openLoader, setOpenLoader] = useState(false);
  const [loaderTitle, setLoaderTitle] = useState("");
  const [profile, setProfile] = useState([]);

  const modalRoot = document.getElementById('modal-root') || document.body;

   const fetchProfile = async () =>{
    setOpenLoader(true);
    setLoaderTitle("Loading...");
     const raw = localStorage.getItem("user");
     const user = JSON.parse(raw);
     try{
       const {data} = await api.post("/account/profile", {id: user.id});
       if(data.success) {
        setProfile(data.data);
        setName(data.data.Info.Name || `${data.data.User?.CountryCode} ${data.data.User?.Phone}`);
        setBio(data.data.Info.About || "Hey!, i'm available on Cirqle");
        setAvatar(data.data.Info.ImageUrl || images);
        setPhone(`${data.data.User.CountryCode} ${data.data.User.Phone}`);
       }
     }catch(error){
     const backendError = error.response?.data.error;
     const statusCode = backendError?.status || 500;
     const code = backendError?.code || "NO_CODE";
     const message = backendError?.message || "Errro occured";
     }finally{
      setOpenLoader(false);
      setLoaderTitle("");
     }
   }

  useEffect( () => {
  fetchProfile();
  }, []);

  useEffect(() => {
    if (isEditingName) nameInputRef.current?.focus();
  }, [isEditingName]);

  const handleSave = async (e) => {
    e.preventDefault();
    setOpenLoader(true);
    setLoaderTitle("Updating profile...");
    setIsDirty(false);
    try{
       const raw = localStorage.getItem("user");
       const user = JSON.parse(raw);
       const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
     
      if(avatarFile) formData.append("avatar", avatarFile); 
      const { data } = await api.post("/account/update/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if(data.success) {
        setBio(data.result.About);
        setName(data.result.Name || `${user.cCode} ${user.phone}`);
        setAvatar(data.result.ImageUrl);
        setAvatarFile(null);
        setIsDirty(true);
        alert("profile updated successfully");
      }
    }catch(error){
     const backendError = error.response?.data.error;
     const statusCode = backendError?.statusCode || 500;
     const code = backendError?.code || "NO_CODE";
     const message = backendError?.message || "Errro occured";
    }finally{
      setOpenLoader(false);
      setLoaderTitle("");
    }
   
  };

  const saveName = () => {
    if (tempName.trim().length > 0 && tempName.trim()!== name) {
      setName(tempName.trim());
      setIsDirty(true);
    }
    setIsEditingName(false);
  };

  const cancelNameEdit = () => {
    setTempName(name);
    setIsEditingName(false);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempAvatar(imageUrl);
      setAvatarFile(file);
    }
  };

  const confirmImage = () => {
    if (tempAvatar) {
      setAvatar(tempAvatar);
      setTempAvatar(null);
      setIsDirty(true);
    }
    setShowImageModal(false);
  };

  const cancelImage = () => {
    if (tempAvatar) URL.revokeObjectURL(tempAvatar);
    setTempAvatar(null);
    setShowImageModal(false);
    setAvatarFile(null);
  };

  const handleRemoveImage = () => {
    if (avatar!== images) {
      setAvatar(images);
      setIsDirty(true);
    }
    setTempAvatar(null);
    setShowImageModal(false);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
    setIsDirty(true);
  };
const logos = [
  app_logo,
  info_friends_animation,
  interaction_logo
 ]
 const slides = [
  { img: app_logo, title: "Connect with friends" },
  { img: info_friends_animation, title: "Share moments" },
  { img:interaction_logo, title: "Join communities" },
];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, [slides.length]);


  return (
    <>
    <Loader isOpen={openLoader} title={loaderTitle} />
    <div className="flex-background-container" style={{display: "flex"}}>
      <div className="profile-container-h">
        <div className="profile-header">
          <p>My Profile</p>
        </div>

        <div className="profile-layouts">
          <div className="avatar-wrapper" onClick={() => setShowImageModal(true)}>
            <img src={avatar} alt="Profile" />
            <span className="material-symbols-outlined camera-icon">camera_alt</span>
          </div>

          {!isEditingName? (
            <div className="name-display" onClick={() => {
              setTempName(name);
              setIsEditingName(true);
            }}>
              <p className="profile-name">{name}</p>
              <span className="material-symbols-outlined edit-name-icon">edit</span>
            </div>
          ) : (
            <div className="name-edit">
              <input
                ref={nameInputRef}
                type="text"
                value={tempName}
                onChange={e => setTempName(e.target.value)}
                maxLength={25}
                className="name-input"
              />
              <div className="name-actions">
                <span className="material-symbols-outlined" onClick={cancelNameEdit}>close</span>
                <span className="material-symbols-outlined" onClick={saveName}>check</span>
              </div>
              <p className="char-count">{tempName.length}/25</p>
            </div>
          )}

          <p className="profile-phone">{phone}</p>
        </div>

        <div className="profile-form">
          <form onSubmit={handleSave}>
            <label htmlFor="bio">About</label>
            <input
              id="bio"
              type="text"
              value={bio}
              onChange={handleBioChange}
              maxLength={139}
              placeholder="Set your status"
            />

            <label htmlFor="phone">Phone</label>
            <input id="phone" type="text" value={phone} readOnly />

            <button type="submit" className="edit-btn" disabled={!isDirty}>
              Save Changes
            </button>
          </form>
        </div>
         
      </div>
       <Footer activeTab={activeTab} setActiveTab={setActiveTab}/>

<div className="side-animated-logo-container">
    <div className="logo-scroller">
      <div className="logo-track">
        {
          [...logos, ...logos].map((logo, i) => 
          <img src={logo} key={i} alt="logo" />
        )}
      </div>
    </div>

   
   <div className="home-slider">
      {slides.map((slide, i) => (
        <div key={i} className={i === index ? "slide active" : "slide"}>
          <img src={slide.img} alt={slide.title} />
          <h1>{slide.title}</h1>
        </div>
      ))}

      <div className="slider-dots">
        {slides.map((_, i) => (
          <span key={i} className={i === index ? "dot active" : "dot"} />
        ))}
      </div>
    </div>
   </div>
</div>
      {showImageModal && createPortal(
        <ImagePickerModal
          onClose={cancelImage}
          onSelect={handleImageSelect}
          onConfirm={confirmImage}
          onRemove={handleRemoveImage}
          hasTemp={!!tempAvatar}
        />,
        modalRoot
      )}

    
    </>
  );
}

function ImagePickerModal({ onClose, onSelect, onConfirm, onRemove, hasTemp }) {
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal" onClick={e => e.stopPropagation()}>
        <h3>Profile photo</h3>
        {/* Removed the <img> preview here */}

        <div className="image-options">
          <label className="image-option-btn">
            <span className="material-symbols-outlined">photo_camera</span>
            Camera
            <input type="file" accept="image/*" capture="environment" onChange={onSelect} hidden />
          </label>

          <label className="image-option-btn">
            <span className="material-symbols-outlined">photo_library</span>
            Gallery
            <input type="file" accept="image/*" onChange={onSelect} hidden />
          </label>

          <button className="image-option-btn remove-btn" onClick={onRemove}>
            <span className="material-symbols-outlined">delete</span>
            Remove photo
          </button>
        </div>

        {hasTemp? (
          <div className="modal-actions">
            <button className="close-modal-btn" onClick={onClose}>Cancel</button>
            <button className="confirm-btn" onClick={onConfirm}>Use this photo</button>
          </div>
        ) : (
          <button className="close-modal-btn" onClick={onClose}>Close</button>
        )}
      </div>
    </div>
  );
}