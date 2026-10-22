import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./css/add_contact.css";
import CountryCodeSelector from "./CountryCode";
import { createPortal } from "react-dom";
import useTitle from "../../components/UseTitle";
import api from "../../api/axios";
import Loader from "./Loader";


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
  useTitle("Manage contacts");
  
  const [isOpen, setIsOpen] = useState(false);
  const [params] = useSearchParams();
  const [openLoader, setOpenLoader] = useState(false);
  const [loaderTitle, setLoaderTitle] = useState("");
  const navigate = useNavigate();
  const tab = params.get('tab');
  const id = params.get('id');
  const isEditMode = tab === 'edit' && !!id;
  const [phoneBook, setPhoneBook] = useState([]);

  const fetch = async () =>{
    if(!isEditMode) return;
    setOpenLoader(true);
    setLoaderTitle("Loading...");
    try{
    const {data} = await api.post("/account/contact/get", {id: id});
    if(data.success) {
      setPhoneBook(data.data);
         const contact = Array.isArray(data.data)
       ? data.data.find(c => c._id === id)
        : data.data;

      if(contact){
        setInputs({
          firstName: contact.FirstName || "",
          lastName: contact.LastName || "",
          phone: formatPhone(contact.Phone, 'NG')
        });
        setSelectedCountry(countryList[contact.CountryCode] || countryList[contact.cCode] || country);
      }
    
    }
    }catch(error){
    const backendError = error.response?.data.error;
    const statusCode = backendError?.status || 500;
    const code = backendError?.code || "NO_CODE";
    const message = backendError?.message || "Unknown error occured";
    alert(backendError);
    }finally{
     setOpenLoader(false);
     setLoaderTitle("");
    }
  }
 
  useEffect( () => {
    fetch();
  }, [id]);

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
     setOpenLoader(true)
     setLoaderTitle(isEditMode ? "Editing contact..." : "Saving contact...");

    const cleanPhone = inputs.phone.replace(/\D/g, '');
    const payload = {
      route: isEditMode ? "edit" : "save",
      //id: isEditMode? id : Date.now().toString(),
      fullName: `${inputs.firstName.trim()} ${inputs.lastName.trim()}`.replace(/\s+/g, ' ').trim(),
      firstName: inputs.firstName.trim(),
      lastName: inputs.lastName.trim(),
      cCode: country.cCode.trim(),
      phone: cleanPhone.trim()
    };
    
    try {
      const {data} = await api.post("/account/contact/manage", payload);
      if(data.success){
      setStatus({isOpen: true, success: true, updated: isEditMode? 'updated' : 'created'});
      }else{
         setStatus({isOpen: true, success: false, updated: isEditMode? 'updated' : 'created'});
      }
    } catch {
      setStatus({isOpen: true, success: false, updated: isEditMode? 'updated' : 'created'});
    }finally{
      setOpenLoader(false);
      setLoaderTitle("");
    }
  };

  const handleCloseModal = () => {
    const wasSuccess = status.success;
    setStatus({isOpen: false, success: false, updated: 'created'});

    if (wasSuccess) {
      if (!isEditMode) {
        setInputs({firstName: "", lastName: "", phone: ""});
        setSelectedCountry({name: "Nigeria", code: "NG", cCode: "+234"});
      }
    } else {
      /*  if (window.history.length > 2) navigate(-1);
          else navigate('/accounts/message/chats');*/
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
      <Loader isOpen={openLoader} title={loaderTitle} />
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