import {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import "../css/contact_list.css";
import images from "../../assets/images.jpeg";
import {useNavigate, useLocation} from "react-router-dom";

function ContactList({isOpen, onClose}){
  if(!isOpen) return null;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const Lists = [
    {id:"9282hahwhw", name: "Ajeh Abraham", tel: "+234 9061748136", bio: "Jesus loves you"},
    {id: "hshwh72727hs", name: "Serah Johnson", tel: "+1 7334 901 54", bio: "Available"},
    {id: "8272hqhwgw", name: " Mike Chan", tel: "+91 876 2626 887", bio: "No calls please!"},
    {id: "8282jahwhw", name: "Zainab Mohummed", tel: "+234 803 6295 994", bio: "DM, yes you"}
    ];
    const filteredList = Lists.filter(li =>
    li.name.toLowerCase().includes(search.toLowerCase()) || 
    li.tel.includes(search)
    );
   useEffect( () => {
     setSearch("");
   }, [isOpen]);
   const navigator = () => {
     navigate("/accounts/contacts/view?tab=new");
   }
   const groupNavigator = () => {
     navigate("/accounts/create-group");
   }
  return createPortal(
    <div className="contact-modal" onClick={onClose}>
      <div className="modal-wrapper" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="material-symbols-outlined close-btn" onClick={onClose}>close</span>
          <h1>Contact List</h1>
        </div>

        <div className="modal-content">
          <div className="make-container">
            <p className="action-item" onClick={navigator}>
              <span className="material-symbols-outlined">person_add</span>
              Add new contact
            </p>
            <p className="action-item">
              <span className="material-symbols-outlined" onClick={groupNavigator}>groups</span>
              Create new Group
            </p>
          </div>

          <div className="search-wrapper">
            <span className="material-symbols-outlined search-icon">search</span>
            <input 
              className="search-input"
              type="text" 
              placeholder="Search contacts..."
              id="contactSearch"value={search} onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <h2 className="section-title">All Sync Contacts</h2>

          <div className="my-list" id="contactList">
            {
              filteredList.length > 0 ? (
              filteredList.map((list) =>
              <div className="list" key={list.id}>
                <div className="list-layout">
                  <img src={images} />
                <p className="name">{list.name || list.tel}</p>
                </div>
                <p className="bio">{list.bio}</p>
                </div>
              )
              ): (
              <p style={{textAlign: "center"}}>No result found</p>
              )}
        
         {
         filteredList.length <= 0 &&(
          <div className="empty-state" id="emptyState" style={{display: 'block'}}>
            <span className="material-symbols-outlined">search_off</span>
            <p>No contacts found</p>
          </div> )}
        </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
export default ContactList;