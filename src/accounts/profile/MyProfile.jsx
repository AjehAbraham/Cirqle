import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import "../css/my_profile.css";
import images from "../../assets/images.jpeg";
import Footer from "../components/Footer";

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [bio, setBio] = useState("Unavailable");
  const [phone] = useState("+234 9061748136");
  const [name, setName] = useState("Ajeh Abraham");
  const [tempName, setTempName] = useState(name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [avatar, setAvatar] = useState(images);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false); // track changes for button
  const navigate = useNavigate();
  const nameInputRef = useRef(null);

  const modalRoot = document.getElementById('modal-root') || document.body;

  useEffect(() => {
    if (isEditingName) nameInputRef.current?.focus();
  }, [isEditingName]);

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving profile:", { name, bio, phone, avatar });
    setIsDirty(false);
    // TODO: API call
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

  return (
    <>
      <div className="profile-container">
        <div className="profile-header">
          <span className="material-symbols-outlined" onClick={() => navigate(-1)}>
            arrow_back
          </span>
          <p>My Profile</p>
          <span className="material-symbols-outlined">edit</span>
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

      <Footer activeTab={activeTab} setActiveTab={setActiveTab}/>
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