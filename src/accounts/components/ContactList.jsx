import {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import "./css/contact_list.css";
import images from "../../assets/images.jpeg";
import {replace, useNavigate} from "react-router-dom";
import api from "../../api/axios";
import Loader from "./Loader";

function ContactList({isOpen, onClose}){
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null)
  const [list, setList] = useState([]);
  const [openLoader, setOpenLoader] = useState(false);
  const [loaderTitle, setLoaderTitle] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const myPhone = `${user.cCode}${user.phone}`;


  const toggleMenu = (id, e) =>{
    e.stopPropagation();
    setActiveMenuId(prev => prev === id ? null : id);
  }
  const handleEdit = (id, e) => {
    e.stopPropagation();
    setActiveMenuId(null);
    console.log("editing", id);
    navigate(`/accounts/contacts/view?tab=edit&id=${id}`, {replace: true}) 
  }
  const handleDelete = async (id, CountryCode, Phone, e) => {
    e.stopPropagation();
    setActiveMenuId(null);
    setOpenLoader(true);
    setLoaderTitle(`Deleting contact: ${CountryCode} ${Phone}`);
    try{
    const {data} = await api.post("/account/contact/delete", {id: id, cCode: CountryCode, phone: Phone});
    if(data.success) {
      alert("contact deleted");
      loadContact();
    }
     
    }catch(error){
     const backendError = error.response?.data?.error;
     const statusCode = backendError.statusCode || 500;
     const code = backendError.code || "NO_CODE";
     const message = backendError.message || "Unknown error occured";
    }finally{
      setOpenLoader(false);
      setLoaderTitle("");
    }
  }
  const handleImports = () =>{
    alert("Importing...");
  }
  
  
  const loadContact = async () =>{
    setOpenLoader(true);
    setLoaderTitle("Loading contacts...");
    try{
     const {data} = await api.post("/account/contact/load");
     if(data.success){
      setList(data.data);
     }
    }catch(error){
     const backendError = error.response?.data?.error;
     const code = backendError?.code || "NO_CODE"
     const message = backendError?.message || "Unknown error";
     const statusCode = backendError?.status || "500";
     alert(`${statusCode}:${code} - ${message}`);
    }finally{
     setLoaderTitle("");
     setOpenLoader(false);
    }
  }
  
  useEffect( () => {
     loadContact();
  }, []);

  const filteredList = list.filter(li =>
    li.Name.toLowerCase().includes(search.toLowerCase()) ||
    li.Phone.includes(search) || li.CountryCode.includes(search)
  ).sort((a, b) => a.Name.localeCompare(b.Name));

  useEffect(() => {
    setSearch("");
  }, [isOpen]);

  const navigator = () => {
    navigate("/accounts/contacts/view?tab=new", {replace: true});
  }

  const groupNavigator = () => {
    navigate("/accounts/create-group", {replace: true});
  }
const profileNavigator = (id) => {
  navigate(`/accounts/profile/view/${id}`, {replace: true});
}
  if(!isOpen) return null;

  return createPortal(
    <>
    <Loader isOpen={openLoader} title={loaderTitle} />
    <div className="cl_modal" onClick={onClose}>
      <div className="cl_wrapper" onClick={e => e.stopPropagation()}>
        <div className="cl_header">
          <span className="material-symbols-outlined cl_close" onClick={onClose}>close</span>
          <h1 className="cl_title">Contacts</h1>
        </div>

        <div className="cl_content">
          <div className="cl_actions">
            <div className="cl_action" onClick={navigator}>
              <span className="material-symbols-outlined">person_add</span>
              <span>Add new contact</span>
            </div>
              <div className="cl_action" onClick={handleImports}>
              <span className="material-symbols-outlined">import_contacts</span>
              <span>Import contacts</span>
            </div>
            <div className="cl_action" onClick={groupNavigator}>
              <span className="material-symbols-outlined">groups</span>
              <span>Create new Group</span>
            </div>
          </div>

          <div className="cl_searchbox">
            <span className="material-symbols-outlined cl_searchicon">search</span>
            <input
              className="cl_search"
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <h2 className="cl_section">All Sync Contacts</h2>

          <div className="cl_listwrap">
            {filteredList.length > 0 ? (
              filteredList.map((list) => (
                <div className="cl_item" key={list._id} style={{borderTop: "2px solid var(--bg"}}
                onClick={list.ContactUserID ? () => profileNavigator(list.ContactUserID || list._id) : undefined}>
                  <div className="cl_row">
                   {list.ContactUserID ? (
                    <img src={list.imageUrl || images} alt="profile image" />
                   ) : (
                   <div className="Empty-user" style={{borderRadius: "50%", border: "1px solid red", width: "44px", 
                   height: "44px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {(list.FirstName?.trim().charAt(0) || 
                    list.LastName?.trim().charAt(0) || 
                    list.Name?.trim().charAt(0) || "?"
                    ).toUpperCase()}
                  </div>
                   )}
                    <p className="cl_name">{list.Name || `${list.CountryCode}  ${list.Phone}`} 
                        { `${list.CountryCode}${list.Phone}` === myPhone ? " (You)" : ""}</p>
                  <div className="option-wrapper-for-contact" onClick={(e) => {e.stopPropagation()}}>
                      <span className="material-symbols-outlined" onClick={(e) => toggleMenu(list._id, e)}>more_horiz</span>
                     <div className={`manage-conatct-option ${activeMenuId === list._id ? "show" : ""}`}>
                      <p onClick={(e) => handleEdit(list._id, e)}>Edit</p>
                      <p onClick={(e) => handleDelete(list._id, list.CountryCode, list.Phone, e)}>Delete</p>
                      </div>
                    </div>
                  </div>
                  {/*<p className="cl_bio">{list.bio.length > 30 ? list.bio.slice(0, 30) + "..." : list.bio}</p>*/}
                </div>
              ))
            ) : (
              <div className="cl_empty">
                <span className="material-symbols-outlined">search_off</span>
                <p>No contacts found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div></>,
    document.body
  );
}
export default ContactList;