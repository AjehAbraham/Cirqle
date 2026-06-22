import {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import "../css/contact_list.css";
import images from "../../assets/images.jpeg";
import {useNavigate} from "react-router-dom";

function ContactList({isOpen, onClose}){
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

  useEffect(() => {
    setSearch("");
  }, [isOpen]);

  const navigator = () => {
    navigate("/accounts/contacts/view?tab=new");
    onClose();
  }

  const groupNavigator = () => {
    navigate("/accounts/create-group");
    onClose();
  }

  if(!isOpen) return null;

  return createPortal(
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
            {filteredList.length > 0? (
              filteredList.map((list) => (
                <div className="cl_item" key={list.id}>
                  <div className="cl_row">
                    <img src={images} alt={list.name} />
                    <p className="cl_name">{list.name || list.tel}</p>
                  </div>
                  <p className="cl_bio">{list.bio}</p>
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
    </div>,
    document.body
  );
}
export default ContactList;