import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import "../css/create_group.css";
import images from "../../assets/images.jpeg";

const dummyContacts = [
  { id: "5", name: "Ajeh Abraham", phone: "+234 9061748136", avatar: images },
  { id: "10", name: "Janet Smith", phone: "+234 8036295994", avatar: images },
  { id: "15", name: "Faith Suasan", phone: "+91 787677398", avatar: images },
];

function StatusModal({ isOpen, onClose, success, updated }) {
  if (!isOpen) return null;

  const isUpdated = updated === 'updated';
  const title = isUpdated? "Contact Updated" : "Contact Saved";
  const message = success
   ? `${title} successfully`
    : `Failed to ${isUpdated? 'update' : 'save'} contact`;

  const modalRoot = document.getElementById('modal-root') || document.body;

  return createPortal(
    <div className="contact-status-modal" onClick={onClose}>
      <div className="status_container" onClick={e => e.stopPropagation()}>
        <span className={`material-symbols-outlined ${success? 'status_icon_success' : 'status_icon_error'}`}>
          {success? 'check_circle' : 'error'}
        </span>
        <p className="status_title">{title}</p>
        <p className="status_message">{message}</p>
        <div className="status_buttons">
          {success? (
            <button onClick={onClose}>Done</button>
          ) : (
            <>
              <button className="status_btn_close" onClick={onClose}>Close</button>
              <button onClick={onClose}>Retry</button>
            </>
          )}
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default function CreateGroup() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState([]);
  const [groupInfo, setGroupInfo] = useState({ name: "", icon: "" });
  const navigate = useNavigate();

  const toggleMember = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    console.log("Creating group:", { ...groupInfo, members: selected });
    navigate(-1);
  };

  const modalRoot = document.getElementById('modal-root') || document.body;

  return (
    <>
      <div className="group-container-main">
        <div className="group-header">
          <span className="material-symbols-outlined" onClick={() => navigate(-1)}>
            arrow_back
          </span>
          <p>Create Group</p>
        </div>

        <div className="selector-container">
          <input type="text" placeholder="Search contacts or phone number" />
          
          <div className="mylist-contact">
            {dummyContacts.map(contact => (
              <div key={contact.id} className="list-contact" onClick={() => toggleMember(contact.id)}>
                <div className="list-layout-contact">
                  <img src={contact.avatar} alt={contact.name} />
                  <p>{contact.name}</p>
                  <input 
                    type="checkbox" 
                    checked={selected.includes(contact.id)}
                    onChange={() => toggleMember(contact.id)}
                    onClick={e => e.stopPropagation()}
                  />
                </div>
                <p>{contact.phone}</p>
              </div>
            ))}
          </div>

          <button 
            disabled={selected.length === 0} 
            onClick={() => setStep(2)}
          >
            Next {selected.length > 0 && `(${selected.length})`}
          </button>
        </div>
      </div>

      {step === 2 && createPortal(
        <GroupInfoModal
          groupInfo={groupInfo}
          setGroupInfo={setGroupInfo}
          onClose={() => setStep(1)}
          onCreate={handleCreate}
        />,
        modalRoot
      )}
    </>
  );
}

function GroupInfoModal({ groupInfo, setGroupInfo, onClose, onCreate }) {
  return (
    <div className="group-modal-container" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <img src={images} alt="group icon" />
        <div className="top-header">
          <input 
            type="text" 
            placeholder="Group subject" 
            value={groupInfo.name}
            onChange={e => setGroupInfo({...groupInfo, name: e.target.value})}
            maxLength={25}
          />
          <span className="material-symbols-outlined">add_reaction</span>
        </div>
        <p className="char_count">{groupInfo.name.length}/25</p>
        <button disabled={!groupInfo.name.trim()} onClick={onCreate}>
          Create
        </button>
      </div>
    </div>
  );
}