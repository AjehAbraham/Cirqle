import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../css/add_contact.css";
import CountryCodeSelector from "./CountryCode";
import { createPortal } from "react-dom";
import useTitle from "../../components/UseTitle";
function StatusModal({ isOpen, onClose, success, updated }) {
  if (!isOpen) return null;

  const isUpdated = updated === 'updated';
  const title = isUpdated? "Contact Updated" : "Contact Saved";
  const message = success
   ? `${title} successfully`
    : `Failed to ${isUpdated? 'update' : 'save'} contact`;

  return createPortal(
    <div className="contact-status-modal" onClick={onClose}>
      <div className="status_container" onClick={e => e.stopPropagation()}>
        <span className="material-symbols-outlined" style={{color: success? '#00F5D4' : '#ff4d4d', fontSize: '48px'}}>
          {success? 'check_circle' : 'error'}
        </span>
        <p style={{fontWeight: 600, fontSize: '18px', margin: '12px 0 4px'}}>{title}</p>
        <p style={{color: 'var(--absText)', margin: '0 0 20px'}}>{message}</p>
        <div style={{display: 'flex', gap: '10px', width: '100%'}}>
          {success? (
            <button onClick={onClose} style={{flex: 1}}>Done</button>
          ) : (
            <>
              <button onClick={onClose} style={{flex: 1, background: 'var(--border)'}}>Close</button>
              <button onClick={onClose} style={{flex: 1}}>Retry</button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function AddContact() {
  useTitle("Manage-contact");
  
  const [isOpen, setIsOpen] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const tab = params.get('tab');
  const id = params.get('id');
  const isEditMode = tab === 'edit' &&!!id;
  const phoneBook = [
    { id: "5", cCode: "+234", firstName: "Smith", lastName: "Jabcob", phone: "9061748136" },
    { id: "10", cCode: "+234", firstName: "Janet", lastName: "", phone: "8036295994" },
    { id: "15", cCode: "+91", firstName: "Faith", lastName: "Suasan", phone: "787677398" }
  ];

  const countryList = {
    "+234": { name: "Nigeria", code: "NG", cCode: "+234" },
    "+91": { name: "India", code: "IN", cCode: "+91" }
  };

  const [country, setSelectedCountry] = useState({
    name: "Nigeria",
    code: "NG",
    cCode: "+234"
  });

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    phone: ""
  });

  const [status, setStatus] = useState({
    isOpen: false,
    success: false,
    updated: 'created'
  });

  const formatPhone = (value, code) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0,3)} ${digits.slice(3)}`;
    return `${digits.slice(0,3)} ${digits.slice(3,6)} ${digits.slice(6)}`;
  };

  useEffect(() => {
    if (isEditMode) {
      const contact = phoneBook.find(c => c.id === id);
      if (contact) {
        setInputs({
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: formatPhone(contact.phone, countryList[contact.cCode]?.code || 'NG')
        });
        setSelectedCountry(countryList[contact.cCode] || country);
      }
    }
  }, [isEditMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setInputs({...inputs, [name]: formatPhone(value, country.code) });
    } else {
      setInputs({...inputs, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanPhone = inputs.phone.replace(/\D/g, '');
    const payload = {
      id: isEditMode? id : Date.now().toString(),
      fullName: `${inputs.firstName} ${inputs.lastName}`.trim(),
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      cCode: country.cCode,
      phone: cleanPhone
    };
    console.log(payload);

    try {
// API CALLS
      setStatus({isOpen: true, success: true, updated: isEditMode? 'updated' : 'created'});
    } catch {
      setStatus({isOpen: true, success: false, updated: isEditMode? 'updated' : 'created'});
    }
  };

  const handleCloseModal = () => {
    const wasSuccess = status.success;
    setStatus({isOpen: false, success: false, updated: 'created'});

    if (wasSuccess) {

      if (window.history.length > 1) navigate(-1);
      else navigate('/accounts/message/chats');
    } else {
      if (!isEditMode) {
        setInputs({firstName: "", lastName: "", phone: ""});
        setSelectedCountry({name: "Nigeria", code: "NG", cCode: "+234"});
      }
    }
  };

  const handleClose = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate('/accounts/message/chats');
  };

  const phoneLength = inputs.phone.replace(/\D/g, '').length;
  const isSubmitDisabled =!country.cCode || phoneLength < 9 || phoneLength > 11;

  return (
    <>
      <CountryCodeSelector
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentCountry={country.name}
        onSelect={setSelectedCountry}
      />
      <StatusModal
        isOpen={status.isOpen}
        onClose={handleCloseModal}
        success={status.success}
        updated={status.updated}
      />
      <div className="add_list_modal">
        <div className="modal-top_menu">
          <span className="material-symbols-outlined" onClick={handleClose}>arrow_back</span>
          <p>{isEditMode? "Edit Contact" : "Add New Contact"}</p>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="input-main-list">
              <span className="material-symbols-outlined">person</span>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={inputs.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={inputs.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="input-main-list">
              <span className="material-symbols-outlined">call</span>
              <div className="sub-input" onClick={() => setIsOpen(true)}>
                <b>Country code</b>
                <p>{country.code} {country.cCode}</p>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="Phone"
                name="phone"
                value={inputs.phone}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" disabled={isSubmitDisabled}>
              {isEditMode? "Save Changes" : "Save Contact"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}